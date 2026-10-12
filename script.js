'use strict';
(() => {
 const root=document.documentElement, reduced=matchMedia('(prefers-reduced-motion: reduce)'), motion=document.querySelector('.motion-toggle');
 let preference=null; try{preference=localStorage.getItem('risa-quest-motion');}catch(_){}
 let paused=preference==='paused'||(preference!=='playing'&&reduced.matches);
 function applyMotion(){root.classList.toggle('motion-paused',paused);if(motion){motion.setAttribute('aria-pressed',String(paused));motion.setAttribute('aria-label',paused?'アニメーションを再開する':'アニメーションを停止する');motion.innerHTML=`<span aria-hidden="true">${paused?'▷':'Ⅱ'}</span><span class="motion-label">${paused?'動きを再開':'動きを止める'}</span>`;}if(paused||reduced.matches)document.querySelectorAll('.is-pending').forEach(el=>{el.classList.remove('is-pending');el.classList.add('is-visible');});}
 applyMotion();motion?.addEventListener('click',()=>{paused=!paused;preference=paused?'paused':'playing';try{localStorage.setItem('risa-quest-motion',preference);}catch(_){}applyMotion();});reduced.addEventListener('change',()=>{if(preference===null)paused=reduced.matches;applyMotion();});
 const menu=document.querySelector('.menu-toggle'), mobileNav=document.querySelector('#mobile-nav');
 function closeMenu(){if(!menu||!mobileNav)return;menu.setAttribute('aria-expanded','false');mobileNav.hidden=true;}
 menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));mobileNav.hidden=!open;});mobileNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});matchMedia('(min-width:761px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
 const reveals=document.querySelectorAll('.reveal');
 if('IntersectionObserver' in window&&!paused&&!reduced.matches){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('is-pending');e.target.classList.add('is-visible');io.unobserve(e.target);}}),{threshold:.03,rootMargin:'0px 0px -25px 0px'});reveals.forEach(el=>{if(el.getBoundingClientRect().top>innerHeight){el.classList.add('is-pending');io.observe(el);}else el.classList.add('is-visible');});document.addEventListener('focusin',e=>{const el=e.target.closest('.is-pending');if(el){el.classList.remove('is-pending');el.classList.add('is-visible');}});addEventListener('beforeprint',()=>reveals.forEach(el=>el.classList.remove('is-pending')));}
 function revealHash(){let target;try{target=document.getElementById(decodeURIComponent(location.hash.slice(1)));}catch(_){return;}if(target)[target,...target.querySelectorAll('.is-pending')].forEach(el=>{el.classList.remove('is-pending');el.classList.add('is-visible');});}
 addEventListener('hashchange',revealHash);revealHash();
 const navLinks=document.querySelectorAll('.desktop-nav a');
 if('IntersectionObserver' in window){const scene=document.querySelector('.world-scene');if(scene)new IntersectionObserver(entries=>entries.forEach(e=>root.classList.toggle('scene-offscreen',!e.isIntersecting))).observe(scene);const ci=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)navLinks.forEach(a=>{if(a.hash==='#'+e.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}),{rootMargin:'-10% 0px -65% 0px',threshold:0});document.querySelectorAll('main>.chapter').forEach(el=>ci.observe(el));}
 const back=document.querySelector('.back-map');let scheduled=false;function update(){back?.classList.toggle('visible',scrollY>650);scheduled=false;}addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update);}},{passive:true});update();
})();

/* Scroll journey: an accessible map of the six portfolio chapters. */
(() => {
  const ids = ['about','works','skills','strengths','future','next'];
  const titles = ['自己紹介','制作物','学習・技術','強み','目指す未来','次の挑戦'];
  const chapters = ids.map(id => document.getElementById(id));
  if (chapters.some(section => !section) || !document.querySelector('.map-hero')) return;
  document.body.classList.add('has-journey');
  const rail = document.createElement('nav');
  rail.className = 'scroll-journey';
  rail.setAttribute('aria-label', '冒険の道：現在地とセクション移動');
  rail.innerHTML = `<span class="journey-caption">MY ADVENTURE</span>
    <div class="journey-track"><svg class="journey-road" viewBox="0 0 150 600" preserveAspectRatio="none" aria-hidden="true"><path class="journey-base" d="M28 12 C8 52 48 80 28 120 S8 188 28 228 S48 296 28 336 S8 404 28 444 S48 512 28 552 L28 588"/><path class="journey-done" d="M28 12 C8 52 48 80 28 120 S8 188 28 228 S48 296 28 336 S8 404 28 444 S48 512 28 552 L28 588"/></svg>
    ${ids.map((id,i)=>`<a class="journey-stop" href="#${id}" aria-label="${String(i+1).padStart(2,'0')} ${titles[i]}へ移動"><i aria-hidden="true"></i><span><small>${String(i+1).padStart(2,'0')}</small>${titles[i]}</span></a>`).join('')}
    <span class="journey-traveler" aria-hidden="true"><svg viewBox="0 0 24 32" class="journey-person" shape-rendering="crispEdges"><path fill="#233c32" opacity=".15" d="M4 30h17v2H4z"/><g class="journey-leg leg-back"><path fill="#30343b" d="M13 23h5v6h-2v2h-5v-3h2z"/><path fill="#94714b" d="M12 28h5v2h-5z"/></g><g class="journey-leg leg-front"><path fill="#30343b" d="M7 23h5v5h-2v3H4v-3h3z"/><path fill="#b18a56" d="M5 28h5v2H5z"/></g><path fill="#263c32" d="M8 13h9v2h2v7h-2v3H5v-5h1v-5h2z"/><path fill="#5c8660" d="M9 15h7v3h2v5H7v-5h2z"/><path fill="#90ac73" d="M10 15h5v2h-5z"/><path fill="#3c302e" d="M8 2h9v2h3v8h-2v3H8v-2H5V5h3z"/><path fill="#79513a" d="M8 4h9v2h2v3h-6v3H7V6h1z"/><path fill="#efc48b" d="M13 8h6v3h2v2h-3v2h-6v-3h-1V9h1z"/><path fill="#322e32" d="M17 9h2v2h-2z"/><path fill="#d29b64" d="M14 13h4v2h-4z"/><path fill="#c7a25a" d="M9 2h7v2H9z"/><path fill="#735237" d="M4 15h7v2h2v8H3v-8h1z"/><path fill="#c39958" d="M4 18h7v6H4z"/><path fill="#e4c681" d="M4 16h7v3H4z"/><path fill="#775435" d="M7 18h2v3H7z"/><path fill="#efc48b" d="M18 18h2v4h-3v-2h1z"/></svg><span class="journey-you">現在地</span></span></div><span class="journey-end">NEXT ADVENTURE</span>`;
  document.body.append(rail);
  const path = rail.querySelector('.journey-base');
  const completed = rail.querySelector('.journey-done');
  const track = rail.querySelector('.journey-track');
  const traveler = rail.querySelector('.journey-traveler');
  const stops = [...rail.querySelectorAll('.journey-stop')];
  const fractions = ids.map((_,i) => .08 + i * .168);
  const length = path.getTotalLength();
  completed.style.strokeDasharray = String(length);
  let anchors = [], maxScroll = 1, queued = false, timer, previousY = scrollY;
  const point = fraction => path.getPointAtLength(length * fraction);
  function measure() {
    const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 90;
    maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    anchors = chapters.map(section => Math.max(1, Math.min(maxScroll - 1, section.getBoundingClientRect().top + scrollY - offset)));
    stops.forEach((stop,i) => { const p = point(fractions[i]); stop.style.top = `${p.y / 600 * 100}%`; stop.style.setProperty('--dot-x',`${p.x / 150 * track.clientWidth}px`); });
    render();
  }
  function render() {
    queued = false;
    const y = Math.max(0, scrollY);
    const visible = y >= anchors[0] - 2;
    rail.classList.toggle('journey-visible', visible);
    rail.inert = !visible;
    rail.setAttribute('aria-hidden', String(!visible));
    const positions = [...anchors,maxScroll];
    const values = [...fractions,1];
    let index = 0;
    while(index < positions.length - 2 && y >= positions[index+1]) index++;
    const ratio = Math.max(0,Math.min(1,(y-positions[index])/Math.max(1,positions[index+1]-positions[index])));
    const progress = values[index] + (values[index+1]-values[index])*ratio;
    const p = point(progress);
    traveler.style.left = `${p.x / 150 * track.clientWidth}px`;
    traveler.style.top = `${p.y / 600 * 100}%`;
    completed.style.strokeDashoffset = String(length * (1-progress));
    let current = -1;
    anchors.forEach((anchor,i)=> {if(y >= anchor-2)current=i;});
    stops.forEach((stop,i)=> {stop.classList.toggle('visited',i<current);if(i===current)stop.setAttribute('aria-current','location');else stop.removeAttribute('aria-current');});
    rail.classList.toggle('journey-arrived', y >= maxScroll-2);
    rail.querySelector('.journey-end').textContent = y >= maxScroll-2 ? 'GOAL REACHED' : 'NEXT ADVENTURE';
  }
  addEventListener('scroll',()=> {
    traveler.classList.toggle('walking-back',scrollY < previousY);previousY=scrollY;
    rail.classList.add('is-walking');clearTimeout(timer);timer=setTimeout(()=>rail.classList.remove('is-walking'),140);
    if(!queued){queued=true;requestAnimationFrame(render);}
  },{passive:true});
  addEventListener('resize',measure);
  addEventListener('load',measure);
  if('ResizeObserver' in window)new ResizeObserver(measure).observe(document.querySelector('main'));
  document.fonts?.ready.then(measure);
  measure();
})();
