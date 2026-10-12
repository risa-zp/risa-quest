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
  rail.innerHTML = `<span class="journey-caption">YOUR JOURNEY</span>
    <div class="journey-track"><svg class="journey-road" viewBox="0 0 150 600" preserveAspectRatio="none" aria-hidden="true"><path class="journey-base" d="M28 12 C8 52 48 80 28 120 S8 188 28 228 S48 296 28 336 S8 404 28 444 S48 512 28 552 L28 588"/><path class="journey-done" d="M28 12 C8 52 48 80 28 120 S8 188 28 228 S48 296 28 336 S8 404 28 444 S48 512 28 552 L28 588"/></svg>
    ${ids.map((id,i)=>`<a class="journey-stop" href="#${id}" aria-label="${String(i+1).padStart(2,'0')} ${titles[i]}へ移動"><i aria-hidden="true"></i><span><small>${String(i+1).padStart(2,'0')}</small>${titles[i]}</span></a>`).join('')}
    <span class="journey-traveler" aria-hidden="true"><svg viewBox="0 0 48 64" class="journey-person"><ellipse cx="25" cy="60" rx="12" ry="2" fill="#203d2b" opacity=".12"/><g class="journey-leg leg-back"><path d="M24 39 L31 49 L27 58 L22 57 L25 49 L19 43" fill="#bda981" stroke="#594e3c" stroke-width="1.5"/><path d="M22 55 L28 57 L27 61 L19 60 Q17 57 22 55" fill="#69543d"/></g><g class="journey-leg leg-front"><path d="M21 39 L20 48 L14 55 L18 58 L26 49 L28 40" fill="#cbb893" stroke="#594e3c" stroke-width="1.5"/><path d="M13 53 L19 57 L17 61 L10 58 Q9 55 13 53" fill="#69543d"/></g><path d="M20 19 Q32 18 33 29 L34 43 Q25 48 12 42 L17 28Z" fill="#55745b" stroke="#304b38" stroke-width="1.5"/><path d="M29 26 L34 33 L39 35" fill="none" stroke="#c6ac85" stroke-width="5" stroke-linecap="round"/><path d="M18 19 L29 20 L31 24 L18 25" fill="#304b38"/><path d="M22 6 Q34 4 35 13 L33 19 L25 21 L20 15Z" fill="#e6c8a2" stroke="#70543a"/><path d="M19 17 Q14 9 21 4 Q32 -1 36 8 L32 12 L27 9 L26 18 L21 20Z" fill="#594434" stroke="#3d352d"/><path d="M33 13 L36 14 L33 16" fill="#e6c8a2"/><circle cx="32" cy="12" r=".8" fill="#302d28"/><path d="M15 24 Q22 20 24 28 L24 38 Q17 42 11 37 L12 29Z" fill="#c5a36c" stroke="#755c38" stroke-width="1.5"/><path d="M12 27 L23 28 L22 32 L12 32Z" fill="#ddbd83" stroke="#755c38"/><rect x="17" y="30" width="3" height="4" rx="1" fill="#927349"/></svg><span class="journey-you">現在地</span></span></div><span class="journey-end">NEXT ADVENTURE</span>`;
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
    const positions = [0,...anchors,maxScroll];
    const values = [0,...fractions,1];
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
