import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = path.join(ROOT, 'content');
const PUBLIC = path.join(ROOT, 'public');
const ARTICLES = path.join(CONTENT, 'articles');

const site = JSON.parse(fs.readFileSync(path.join(CONTENT, 'site.json'), 'utf8'));
const data = JSON.parse(fs.readFileSync(path.join(CONTENT, 'videos.json'), 'utf8'));
// Accept both the canonical multi-video format and a single-video object.
// This lets a creator paste one 3-field entry directly while still supporting
// an array for multiple videos.
const videos = Array.isArray(data)
  ? data
  : Array.isArray(data.videos)
    ? data.videos
    : (data && typeof data === 'object' && data.youtube_url ? [data] : []);

fs.rmSync(PUBLIC, { recursive: true, force: true });
fs.mkdirSync(PUBLIC, { recursive: true });
copyDir(path.join(ROOT, 'assets'), path.join(PUBLIC, 'assets'));
fs.copyFileSync(path.join(ROOT, 'src', 'copy-protection.js'), path.join(PUBLIC, 'copy-protection.js'));
fs.copyFileSync(path.join(ROOT, 'googlebe37ea7846b044c6.html'), path.join(PUBLIC, 'googlebe37ea7846b044c6.html'));

function esc(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function slugify(value = '') {
  return String(value)
    .toLowerCase()
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100) || 'untitled';
}

function getYoutubeId(url = '') {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1).split('/')[0];
    if (u.hostname.includes('youtube.com')) {
      if (u.searchParams.get('v')) return u.searchParams.get('v');
      const p = u.pathname.split('/').filter(Boolean);
      const idx = p.findIndex(x => ['shorts', 'embed', 'live'].includes(x));
      if (idx >= 0 && p[idx + 1]) return p[idx + 1];
    }
  } catch {}
  return '';
}

function inferType(v, youtubeUrl = '') {
  const raw = String(v.type || v.format || v.content_type || '').trim().toLowerCase();
  if (['short','shorts'].includes(raw)) return 'short';
  if (['long','longform','long-form','documentary'].includes(raw)) return 'long';
  try {
    const u = new URL(youtubeUrl);
    if (u.hostname.includes('youtube.com') && u.pathname.split('/').includes('shorts')) return 'short';
  } catch {}
  // A standard /watch?v=... URL does not reliably expose Shorts status.
  return 'long';
}

function isPlaceholderVideo(v) {
  const hay = `${v.title || ''} ${v.slug || ''} ${v.youtube_url || ''}`.toLowerCase();
  return /your (short|long)? ?video title|permanent-url-slug|your video title|video_id|example\.com|xxxxxxxx/.test(hay);
}

function formatDate(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric' }).format(d);
}

async function fetchYouTubeMetadata(youtubeUrl) {
  const endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(youtubeUrl)}&format=json`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(endpoint, {
      headers: { 'User-Agent': 'CuriousRealitySiteBuilder/1.0' },
      signal: controller.signal
    });
    if (!response.ok) return null;
    const meta = await response.json();
    return {
      title: typeof meta.title === 'string' ? meta.title.trim() : '',
      author_name: typeof meta.author_name === 'string' ? meta.author_name.trim() : '',
      thumbnail_url: typeof meta.thumbnail_url === 'string' ? meta.thumbnail_url : ''
    };
  } catch (error) {
    console.warn(`Could not fetch YouTube metadata for ${youtubeUrl}: ${error?.name === 'AbortError' ? 'request timed out' : error?.message || error}`);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function articlePathFor(video) {
  return path.join(ARTICLES, `${video.youtube_id}.md`);
}

function ensureArticleFile(video) {
  fs.mkdirSync(ARTICLES, { recursive: true });
  const file = articlePathFor(video);
  if (!fs.existsSync(file)) {
    const template = `# The Question\n\n<!-- Write the main question or setup here. -->\n\n## What is actually happening?\n\n<!-- Explain the underlying reality in clear language. -->\n\n## The deeper explanation\n\n<!-- Add the detailed research and explanation here. -->\n\n## What the evidence shows\n\n<!-- Add evidence, context, comparisons, or important findings here. -->\n\n## Why it matters\n\n<!-- Explain why the viewer should care. -->\n\n## Sources\n\n<!-- Add sources as Markdown links, one per line: - [Source name](https://example.com) -->\n`;
    fs.writeFileSync(file, template, 'utf8');
  }
  return file;
}

function parseArticleMarkdown(markdown = '') {
  const clean = markdown.replace(/<!--[\s\S]*?-->/g, '').replace(/\r/g, '');
  const lines = clean.split('\n');
  const blocks = [];
  let paragraph = [];
  let list = [];
  const flushParagraph = () => {
    if (paragraph.length) {
      const text = paragraph.join(' ').trim();
      if (text) blocks.push({ type: 'p', text });
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list.length) { blocks.push({ type: 'ul', items: list }); list = []; }
  };
  for (const line of lines) {
    const t = line.trim();
    if (!t) { flushParagraph(); flushList(); continue; }
    if (/^##\s+/.test(t)) { flushParagraph(); flushList(); blocks.push({ type:'h2', text:t.replace(/^##\s+/, '') }); continue; }
    if (/^#\s+/.test(t)) { flushParagraph(); flushList(); blocks.push({ type:'h1', text:t.replace(/^#\s+/, '') }); continue; }
    if (/^[-*]\s+/.test(t)) { flushParagraph(); list.push(t.replace(/^[-*]\s+/, '')); continue; }
    flushList(); paragraph.push(t);
  }
  flushParagraph(); flushList();
  return blocks;
}

function renderInlineMarkdown(text = '') {
  return esc(text).replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

function renderArticle(video) {
  const file = ensureArticleFile(video);
  let markdown = '';
  try { markdown = fs.readFileSync(file, 'utf8'); } catch {}
  const blocks = parseArticleMarkdown(markdown);
  const html = blocks.map(block => {
    if (block.type === 'h1') return `<h2>${renderInlineMarkdown(block.text)}</h2>`;
    if (block.type === 'h2') return `<section class="article-section"><h2>${renderInlineMarkdown(block.text)}</h2>`;
    if (block.type === 'ul') return `<ul>${block.items.map(item => `<li>${renderInlineMarkdown(item)}</li>`).join('')}</ul>`;
    return `<p>${renderInlineMarkdown(block.text)}</p>`;
  });
  // Close section wrappers generated for headings except the first/last via CSS-neutral markup.
  let out = '';
  let open = false;
  for (const block of blocks) {
    if (block.type === 'h2') {
      if (open) out += '</section>';
      out += `<section class="article-section"><h2>${renderInlineMarkdown(block.text)}</h2>`;
      open = true;
    } else if (block.type === 'h1') {
      out += `<h2>${renderInlineMarkdown(block.text)}</h2>`;
    } else if (block.type === 'ul') {
      out += `<ul>${block.items.map(item => `<li>${renderInlineMarkdown(item)}</li>`).join('')}</ul>`;
    } else {
      out += `<p>${renderInlineMarkdown(block.text)}</p>`;
    }
  }
  if (open) out += '</section>';
  if (!out.trim()) out = `<div class="article-coming"><p class="kicker">THE EXPLANATION</p><h2>The deeper explanation is coming.</h2><p>The research behind this video will be added here.</p></div>`;
  return out;
}

async function resolveVideo(v) {
  const out = { ...v };
  out.youtube_id = v.youtube_id || getYoutubeId(v.youtube_url || v.youtube || '');
  out.youtube_url = v.youtube_url || (out.youtube_id ? `https://www.youtube.com/watch?v=${out.youtube_id}` : '');
  out.status = String(v.status || 'draft').trim().toLowerCase();
  out.type = inferType(v, out.youtube_url);

  const allowedStatus = new Set(['draft', 'published', 'archived']);
  if (!allowedStatus.has(out.status)) {
    throw new Error(`Invalid status for ${out.youtube_url || 'video'}: ${out.status}. Use draft, published, or archived.`);
  }
  if (!out.youtube_id) {
    throw new Error(`Invalid YouTube URL: ${out.youtube_url || '(missing)'}`);
  }

  const meta = await fetchYouTubeMetadata(out.youtube_url);
  const fallbackTitle = `Curious Reality - ${out.type === 'short' ? 'Short' : 'Video'}`;
  out.title = meta?.title || v.title || fallbackTitle;
  out.author_name = meta?.author_name || '';
  out.slug = slugify(v.slug || (meta?.title ? meta.title : `curious-reality-${out.type}-${out.youtube_id}`));
  out.published = v.published || v.publish_date || '';
  out.language = v.language || 'en';
  out.tags = Array.isArray(v.tags) ? v.tags : [];
  out.keywords = Array.isArray(v.keywords) ? v.keywords : [];
  out.sources = Array.isArray(v.sources) ? v.sources : [];
  out.sections = Array.isArray(v.sections) ? v.sections : [];
  out.summary = v.summary || v.description || '';
  out.thumbnail = v.thumbnail || meta?.thumbnail_url || (out.youtube_id ? `https://i.ytimg.com/vi/${out.youtube_id}/maxresdefault.jpg` : `${site.website.baseUrl}/assets/banner.webp`);
  out.thumbnail_fallback = out.youtube_id ? `https://i.ytimg.com/vi/${out.youtube_id}/hqdefault.jpg` : `${site.website.baseUrl}/assets/banner.webp`;
  out.display_date = formatDate(out.published);
  return out;
}

const all = [];
for (const video of videos) {
  if (!video || typeof video !== 'object') continue;
  if (isPlaceholderVideo(video)) continue;
  all.push(await resolveVideo(video));
}
const published = all.filter(v => v.status === 'published');

const icon = {
  home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 10.7 12 3.7l8.5 7"/><path d="M5.5 9.8v10.1h13V9.8M9.2 19.9v-6.1h5.6v6.1"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 7 9 5-9 5V7Z"/></svg>',
  compass: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.8"/><path d="m14.9 9.1-2.2 4.1-3.6 1.7 2.2-4.1 3.6-1.7Z"/></svg>',
  info: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.8"/><path d="M12 10.5v5M12 7.4h.01"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.2" y="6" width="17.6" height="12" rx="3.2"/><path d="m10 9.2 5.2 2.8-5.2 2.8V9.2Z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>',
  external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 5h6v6M19 5l-9 9"/><path d="M18 13v5.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5H13"/></svg>'
};

function nav(active = '') {
  return `<header class="site-header"><div class="nav-wrap"><a class="brand" href="/" aria-label="Curious Reality home"><img src="/assets/logo.webp" width="40" height="40" alt="Curious Reality logo"><span>CURIOUS <b>REALITY</b></span></a><nav id="primary-nav" aria-label="Primary"><a class="${active === 'home' ? 'active' : ''}" href="/">${icon.home}<span>Home</span></a><a class="${active === 'videos' ? 'active' : ''}" href="/videos/">${icon.play}<span>Videos</span></a><a class="${active === 'explore' ? 'active' : ''}" href="/explore/">${icon.compass}<span>Explore</span></a><a class="${active === 'about' ? 'active' : ''}" href="/about/">${icon.info}<span>About</span></a><a class="mobile-channel" href="${site.youtube}" target="_blank" rel="noopener">${icon.youtube}<span>Visit YouTube</span>${icon.external}</a></nav><a class="channel-link" href="${site.youtube}" target="_blank" rel="noopener">${icon.youtube}<span>YouTube</span>${icon.external}</a><button class="menu-toggle" type="button" aria-controls="primary-nav" aria-expanded="false" aria-label="Open navigation"><span></span><span></span></button></div></header>`;
}

function baseHtml({ title, description, canonical, body, jsonLd = [], active = '' }) {
  const ld = jsonLd.map(x => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join('');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${esc(canonical)}"><meta name="theme-color" content="#08090c"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="icon" href="/assets/logo.webp"><meta property="og:type" content="website"><meta property="og:site_name" content="Curious Reality"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:image" content="${site.website.baseUrl}/assets/banner.webp"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${site.website.baseUrl}/assets/banner.webp"><link rel="stylesheet" href="/styles.css">${ld}</head><body>${nav(active)}<a class="skip-link" href="#main-content">Skip to content</a><main id="main-content">${body}</main><footer class="footer"><div><strong>CURIOUS REALITY</strong><span>Stay Curious. Look Deeper. Understand Reality.</span></div><div><a href="${site.youtube}" target="_blank" rel="noopener">YouTube</a><a href="/about/">About</a></div></footer><script src="/app.js" defer></script><script src="/copy-protection.js" defer></script></body></html>`;
}

function renderVideoCard(v) {
  const ratioClass = v.type === 'short' ? ' is-short' : ' is-long';
  return `<article class="video-card${ratioClass}"><a class="thumb${ratioClass}" href="/${esc(v.slug)}/" aria-label="Open ${esc(v.title)}"><img src="${esc(v.thumbnail)}" data-fallback="${esc(v.thumbnail_fallback || '')}" alt="${esc(v.title)}" loading="lazy" decoding="async"><span class="type-pill">${esc(v.type.toUpperCase())}</span><span class="play-dot">${icon.play}</span></a><div class="video-card-body"><p class="eyebrow">${esc(v.type === 'short' ? 'SHORT' : 'LONG-FORM')}${v.display_date ? ` Â· ${esc(v.display_date)}` : ''}</p><h3><a href="/${esc(v.slug)}/">${esc(v.title)}</a></h3>${v.summary ? `<p>${esc(v.summary)}</p>` : ''}</div></article>`;
}

function renderSection(section) {
  const heading = section.heading ? `<h2>${esc(section.heading)}</h2>` : '';
  const paras = Array.isArray(section.paragraphs) ? section.paragraphs.map(p => `<p>${esc(p)}</p>`).join('') : '';
  const bullets = Array.isArray(section.bullets) && section.bullets.length ? `<ul>${section.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>` : '';
  return `<section class="article-section">${heading}${paras}${bullets}</section>`;
}

const org = {
  '@context': 'https://schema.org', '@type': 'Organization', name: site.name,
  url: site.website.baseUrl, logo: `${site.website.baseUrl}/assets/logo.webp`, sameAs: [site.youtube],
  email: site.contact?.email ? `mailto:${site.contact.email}` : undefined
};
Object.keys(org).forEach(k => org[k] === undefined && delete org[k]);
const websiteLd = {
  '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: site.website.baseUrl,
  description: site.description
};

const homeBody = `<section class="hero">
<div class="hero-grid" aria-hidden="true"></div>
<div class="hero-visual" aria-hidden="true"><img src="/assets/hero-scene.webp" width="1916" height="821" fetchpriority="high" decoding="async" alt=""><div class="hero-visual-fade"></div></div>
<div class="hero-inner"><div class="hero-copy"><h1>Discover what you never thought to <em>question.</em></h1><p class="hero-description">${esc(site.description)}</p><div class="hero-actions"><a class="btn btn-primary" href="/videos/">${icon.play}<span>Explore videos</span>${icon.arrow}</a><a class="btn btn-ghost" href="${site.youtube}" target="_blank" rel="noopener">${icon.youtube}<span>Visit YouTube</span>${icon.external}</a></div></div></div></section>
<section class="intro section"><div><p class="kicker">THE IDEA</p><h2>Questions are the beginning.</h2></div><div class="intro-copy"><p class="lead">Curious Reality follows questions, not categories. We investigate the familiar, the strange and the overlooked-then explain what is actually happening.</p><div class="intro-rule"></div><p class="micro-copy">Science. Technology. Human behaviour. Space. Engineering. Everyday reality. One rule: if it makes you wonder, it is worth looking deeper.</p></div></section>
<section class="section principles"><div class="section-head"><div><p class="kicker">THE METHOD</p><h2>Look. Question. Understand.</h2></div><span class="section-number">02 / 03</span></div><div class="principle-grid"><article class="principle-card"><span>01</span><div><h3>Start with curiosity.</h3><p>We begin with the question people rarely stop to ask.</p></div></article><article class="principle-card"><span>02</span><div><h3>Go underneath.</h3><p>Research, evidence and context reveal what is really happening.</p></div></article><article class="principle-card"><span>03</span><div><h3>Make it understandable.</h3><p>Complex ideas become clear without flattening what makes them interesting.</p></div></article></div></section>
<section class="section archive-preview"><div class="section-head"><div><p class="kicker">LATEST</p><h2>Recent discoveries</h2></div><a class="text-link" href="/videos/">View archive ${icon.arrow}</a></div><div class="video-grid">${published.length ? published.slice(0, 6).map(renderVideoCard).join('') : `<div class="empty-state archive-empty"><div class="empty-orbit"><span>CR</span></div><div><p class="eyebrow">NEW DISCOVERIES</p><h3>New discoveries are on the way.</h3><p>The Curious Reality archive is just getting started. Come back soon for questions worth understanding.</p></div></div>`}</div></section>
<section class="manifesto section"><div class="manifesto-mark">CR</div><p class="kicker">THE RULE</p><h2>Don't just give the answer.<br><em>Make the viewer see the world differently.</em></h2><p class="manifesto-sub">Stay curious. Look deeper. Understand reality.</p></section>`;
fs.writeFileSync(path.join(PUBLIC, 'index.html'), baseHtml({ title: 'Curious Reality - Questions Worth Understanding', description: site.description, canonical: site.website.baseUrl + '/', body: homeBody, jsonLd: [org, websiteLd], active: 'home' }));

const videoIndexBody = `<section class="page-hero"><p class="kicker">THE ARCHIVE</p><h1>Videos</h1><p>Every published question, explanation, and discovery from Curious Reality.</p></section><section class="section"><div class="video-filters" role="group" aria-label="Filter videos"><button type="button" class="filter-tab is-active" data-video-filter="all" aria-pressed="true">All</button><button type="button" class="filter-tab" data-video-filter="long" aria-pressed="false">Long</button><button type="button" class="filter-tab" data-video-filter="short" aria-pressed="false">Shorts</button></div><div class="video-grid" id="video-grid">${published.length ? published.map(renderVideoCard).join('') : `<div class="empty-state"><h3>The archive is growing.</h3><p>New discoveries are on the way.</p></div>`}</div></section>`;
fs.mkdirSync(path.join(PUBLIC, 'videos'), { recursive: true });
fs.writeFileSync(path.join(PUBLIC, 'videos', 'index.html'), baseHtml({ title: 'Videos - Curious Reality', description: 'Explore every published Curious Reality video and the questions behind them.', canonical: site.website.baseUrl + '/videos/', body: videoIndexBody, jsonLd: [org, websiteLd], active: 'videos' }));

const exploreBody = `<section class="page-hero"><p class="kicker">EXPLORE</p><h1>Follow the question.</h1><p>Search the archive by idea, phrase, or subject.</p></section><section class="section"><div class="search-box"><label for="site-search">Search Curious Reality</label><input id="site-search" data-video-search type="search" placeholder="Try: electricity, memory, internetâ€¦" autocomplete="off"></div><div class="video-grid" data-video-results>${published.length ? published.map(renderVideoCard).join('') : `<div class="empty-state"><h3>New discoveries are on the way.</h3><p>The archive will grow with every question we investigate.</p></div>`}</div></section>`;
fs.mkdirSync(path.join(PUBLIC, 'explore'), { recursive: true });
fs.writeFileSync(path.join(PUBLIC, 'explore', 'index.html'), baseHtml({ title: 'Explore - Curious Reality', description: 'Search and explore the Curious Reality knowledge archive.', canonical: site.website.baseUrl + '/explore/', body: exploreBody, jsonLd: [org, websiteLd], active: 'explore' }));

const aboutBody = `<section class="page-hero"><p class="kicker">ABOUT THE BRAND</p><h1>Curiosity is the identity.</h1><p>${esc(site.description)}</p></section><section class="section prose"><h2>Why Curious Reality exists</h2><p>There are countless things people see, use, hear, believe, and experience every day without stopping to ask what is actually happening underneath.</p><p>Curious Reality exists to investigate those questions and turn curiosity into understanding.</p><h2>What the brand is becoming</h2><p>A durable knowledge media brand: fast videos, deep explainers, a searchable website, structured knowledge, and an archive that grows with every question we investigate.</p><h2>Mission</h2><p>Make difficult, strange, hidden, or overlooked ideas understandable-and make people curious enough to look deeper.</p><div class="contact-panel"><p class="kicker">CONTACT</p><h2>Have a question or collaboration in mind?</h2><a class="contact-email" href="mailto:${esc(site.contact?.email || '')}">${esc(site.contact?.email || '')}</a></div></section>`;
fs.mkdirSync(path.join(PUBLIC, 'about'), { recursive: true });
fs.writeFileSync(path.join(PUBLIC, 'about', 'index.html'), baseHtml({ title: 'About - Curious Reality', description: 'The mission, philosophy, and long-term direction of Curious Reality.', canonical: site.website.baseUrl + '/about/', body: aboutBody, jsonLd: [org, websiteLd], active: 'about' }));

for (const v of published) {
  if (!v.youtube_id) continue;
  const watchUrl = `${site.website.baseUrl}/${v.slug}/`;
  const article = renderArticle(v);
  const sources = v.sources.length ? `<section class="article-section sources"><h2>Sources</h2><ol>${v.sources.map(s => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title || s.url)}</a></li>`).join('')}</ol></section>` : '';
  const tags = v.tags.length ? `<div class="tag-row">${v.tags.map(t => `<span>#${esc(t)}</span>`).join('')}</div>` : '';
  const videoJson = {
    '@context':'https://schema.org','@type':'VideoObject',name:v.title,description:v.summary || site.description,
    thumbnailUrl:[v.thumbnail],uploadDate:v.published || undefined,duration:v.duration || undefined,
    embedUrl:`https://www.youtube.com/embed/${v.youtube_id}`,contentUrl:v.youtube_url,url:watchUrl,
    publisher:{'@type':'Organization',name:site.name,url:site.website.baseUrl,logo:{'@type':'ImageObject',url:`${site.website.baseUrl}/assets/logo.webp`}},
    isFamilyFriendly:true
  };
  Object.keys(videoJson).forEach(k => videoJson[k] === undefined && delete videoJson[k]);
  const breadcrumb = {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
    {'@type':'ListItem',position:1,name:'Home',item:site.website.baseUrl+'/'},
    {'@type':'ListItem',position:2,name:'Videos',item:site.website.baseUrl+'/videos/'},
    {'@type':'ListItem',position:3,name:v.title,item:watchUrl}
  ]};
  const body = `<section class="watch-hero"><div class="watch-copy"><p class="kicker">${esc(v.type.toUpperCase())}${v.display_date ? ` / ${esc(v.display_date)}` : ''}</p><h1>${esc(v.title)}</h1><p>${esc(v.question || v.summary || '')}</p>${tags}</div></section><section class="watch-layout"><article class="watch-main"><div class="player-wrap${v.type === 'short' ? ' short-player' : ' long-player'}"><button class="player-poster" type="button" data-youtube-embed="${esc(v.youtube_id)}" data-youtube-title="${esc(v.title)}" aria-label="Play ${esc(v.title)}"><img src="${esc(v.thumbnail)}" data-fallback="${esc(v.thumbnail_fallback || '')}" alt="" loading="eager" decoding="async"><span class="big-play">${icon.play}</span></button></div><div class="prose article-body">${v.summary ? `<div class="article-lead"><p>${esc(v.summary)}</p></div>` : ''}${article}${sources}</div></article><aside class="watch-side"><div class="side-card"><p class="kicker">VIDEO</p><h3>${esc(v.type === 'long' ? 'Long-form explanation' : 'Curious Reality Short')}</h3><a class="btn btn-primary full" href="${esc(v.youtube_url)}" target="_blank" rel="noopener">${icon.youtube}<span>Watch on YouTube</span>${icon.external}</a><a class="btn btn-ghost full" href="/videos/">${icon.arrow}<span>Back to archive</span></a></div></aside></section>`;
  const dir = path.join(PUBLIC, v.slug); fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), baseHtml({ title: `${v.title} - Curious Reality`, description: v.meta_description || v.summary || site.description, canonical: watchUrl, body, jsonLd: [org, videoJson, breadcrumb] }));
}

const manifest = { generated_at: new Date().toISOString(), videos: published.map(v => ({slug:v.slug,title:v.title,type:v.type,published:v.published,youtube_id:v.youtube_id,youtube_url:v.youtube_url,summary:v.summary,tags:v.tags,keywords:v.keywords,thumbnail:v.thumbnail,thumbnail_fallback:v.thumbnail_fallback,display_date:v.display_date})) };
fs.writeFileSync(path.join(PUBLIC, 'data.json'), JSON.stringify(manifest, null, 2));

const robots = `User-agent: *\nAllow: /\nSitemap: ${site.website.baseUrl}/sitemap.xml\n`;
fs.writeFileSync(path.join(PUBLIC, 'robots.txt'), robots);

const urls = ['/', '/videos/', '/explore/', '/about/', ...published.map(v => `/${v.slug}/`)];
const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u => `<url><loc>${site.website.baseUrl}${u}</loc></url>`).join('')}</urlset>`;
fs.writeFileSync(path.join(PUBLIC, 'sitemap.xml'), xml);

fs.writeFileSync(path.join(PUBLIC, '404.html'), baseHtml({ title: 'Page not found - Curious Reality', description: 'The requested Curious Reality page could not be found.', canonical: site.website.baseUrl + '/404.html', body: `<section class="page-hero center"><p class="kicker">404</p><h1>That question isn't here.</h1><p>Return to Curious Reality and explore another one.</p><a class="btn btn-primary" href="/">${icon.arrow}<span>Go home</span></a></section>`, jsonLd:[org], active:'' }));

// Copy root CSS/JS after static generation so they remain source-of-truth files.
for (const f of ['styles.css','app.js']) fs.copyFileSync(path.join(ROOT, f), path.join(PUBLIC, f));

function copyDir(src, dst) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name), d = path.join(dst, entry.name);
    if (entry.isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
  }
}

console.log(`Built ${published.length} published video page(s).`);

