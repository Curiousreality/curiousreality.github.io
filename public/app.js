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

  const bindImageFallback=(img)=>{
    if(!img||img.dataset.fallbackBound)return;
    const fallback=img.dataset.fallback;
    if(!fallback)return;
    img.dataset.fallbackBound='true';
    img.addEventListener('error',()=>{
      if(img.dataset.fallbackUsed)return;
      img.dataset.fallbackUsed='true';
      img.src=fallback;
    },{once:true});
  };
  document.querySelectorAll('img[data-fallback]').forEach(bindImageFallback);

  const loadYouTubePlayer=(button)=>{
    if(!button||button.dataset.youtubeLoaded)return;
    const id=button.dataset.youtubeEmbed;
    if(!id)return;
    button.dataset.youtubeLoaded='true';
    const title=button.dataset.youtubeTitle||'Curious Reality video';
    const iframe=document.createElement('iframe');
    iframe.className='player-iframe';
    iframe.src=`https://www.youtube.com/embed/${encodeURIComponent(id)}?rel=0&autoplay=1`;
    iframe.title=title;
    iframe.loading='eager';
    iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen=true;
    button.replaceWith(iframe);
  };
  document.querySelectorAll('[data-youtube-embed]').forEach(button=>{
    button.addEventListener('click',()=>loadYouTubePlayer(button));
  });

  const filterRoot=document.querySelector('.video-filters');
  const grid=document.querySelector('#video-grid');
  const filterButtons=filterRoot?[...filterRoot.querySelectorAll('[data-video-filter]')]:[];

  if(filterRoot&&grid&&filterButtons.length){
    const applyFilter=(value,updateHash=true)=>{
      const filter=value==='short'||value==='long'?value:'all';
      grid.querySelectorAll('.video-card').forEach(card=>{
        const type=card.classList.contains('is-short')?'short':'long';
        card.hidden=filter!=='all'&&type!==filter;
      });
      filterButtons.forEach(btn=>{
        const active=btn.dataset.videoFilter===filter;
        btn.classList.toggle('is-active',active);
        btn.setAttribute('aria-pressed',String(active));
      });
      if(updateHash){
        const next=filter==='all'?location.pathname:`${location.pathname}#${filter}`;
        history.replaceState(null,'',next);
      }
    };
    filterButtons.forEach(btn=>btn.addEventListener('click',()=>applyFilter(btn.dataset.videoFilter)));
    applyFilter(location.hash.slice(1),false);
  }

  const search=document.querySelector('[data-video-search]');
  const results=document.querySelector('[data-video-results]');
  if(search&&results){
    try{
      const r=await fetch('/data.json',{cache:'no-store'});
      const data=await r.json();
      const all=data.videos||[];
      const render=v=>`<article class="video-card ${v.type==='short'?'is-short':'is-long'}"><a href="/${escapeHtml(v.slug)}/" class="thumb ${v.type==='short'?'is-short':'is-long'}"><img src="${escapeHtml(v.thumbnail)}" data-fallback="${escapeHtml(v.thumbnail_fallback||'')}" alt="${escapeHtml(v.title)} thumbnail" loading="lazy" decoding="async"><span class="type-pill">${escapeHtml((v.type||'long').toUpperCase())}</span><span class="play-dot">▶</span></a><div class="video-card-body"><div class="eyebrow">${escapeHtml(v.type==='short'?'SHORT':'LONG-FORM')}${v.display_date?` · ${escapeHtml(v.display_date)}`:''}</div><h3><a href="/${escapeHtml(v.slug)}/">${escapeHtml(v.title)}</a></h3><p>${escapeHtml(v.summary||'')}</p></div></article>`;
      const update=()=>{
        const q=search.value.trim().toLowerCase();
        const filtered=!q?all:all.filter(v=>[v.title,v.summary,...(v.tags||[]),...(v.keywords||[])].join(' ').toLowerCase().includes(q));
        results.innerHTML=filtered.length?filtered.map(render).join(''):`<div class="empty-state"><h3>No matching question yet.</h3><p>Try a broader phrase.</p></div>`;
        results.querySelectorAll('img[data-fallback]').forEach(bindImageFallback);
      };
      search.addEventListener('input',update);
    }catch{}
  }
}
function escapeHtml(v=''){return String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'","&#39;")}
boot();
