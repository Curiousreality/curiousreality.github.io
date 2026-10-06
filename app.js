async function boot(){
  const header=document.querySelector('.site-header');
  const menuToggle=document.querySelector('.menu-toggle');
  const primaryNav=document.querySelector('#primary-nav');
  if(header&&menuToggle&&primaryNav){
    const closeMenu=()=>{header.classList.remove('nav-open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open navigation')};
    menuToggle.addEventListener('click',()=>{const open=!header.classList.contains('nav-open');header.classList.toggle('nav-open',open);menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
    primaryNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
    document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu()});
    window.addEventListener('resize',()=>{if(window.innerWidth>760)closeMenu()},{passive:true});
  }
  const search=document.querySelector('[data-video-search]');const results=document.querySelector('[data-video-results]');
  if(search&&results){try{const r=await fetch('/data.json',{cache:'no-store'});const data=await r.json();const all=data.videos||[];const render=v=>`<article class="video-card ${v.type==='short'?'is-short':'is-long'}"><a href="/${escapeHtml(v.slug)}/" class="thumb"><img src="${escapeHtml(v.thumbnail)}" data-fallback="${escapeHtml(v.thumbnail_fallback||'')}" onerror="if(this.dataset.fallback){this.onerror=null;this.src=this.dataset.fallback}" alt="${escapeHtml(v.title)} thumbnail" loading="lazy"><span class="type-pill">${escapeHtml((v.type||'long').toUpperCase())}</span><span class="play-dot">▶</span></a><div class="video-card-body"><div class="eyebrow">${escapeHtml(v.display_date||v.published||'Curious Reality')}</div><h3><a href="/${escapeHtml(v.slug)}/">${escapeHtml(v.title)}</a></h3><p>${escapeHtml(v.summary||'')}</p></div></article>`;const update=()=>{const q=search.value.trim().toLowerCase();const filtered=!q?all:all.filter(v=>[v.title,v.summary,...(v.tags||[]),...(v.keywords||[])].join(' ').toLowerCase().includes(q));results.innerHTML=filtered.length?filtered.map(render).join(''):`<div class="empty-state"><h3>No matching question yet.</h3><p>Try a broader phrase.</p></div>`};search.addEventListener('input',update)}catch{}}
}
function escapeHtml(v=''){return String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;')}
boot();
