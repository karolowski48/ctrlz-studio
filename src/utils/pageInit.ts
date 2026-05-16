// pageInit.ts — shared initialization for all subpages
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// ── Performance: reduce reflow from ScrollTrigger ──────
ScrollTrigger.config({
  // Batch DOM reads — prevents layout thrashing
  limitCallbacks: true,
  // Only refresh on real resize, not every scroll
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
});
// Use requestAnimationFrame for scroll callbacks
gsap.ticker.lagSmoothing(500, 33);

export function initPage() {
  // Cursor — skip on touch
  const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const cursor = document.getElementById('cursor')!;
  const ring   = document.getElementById('cursor-ring')!;
  let mx=0,my=0,rx=0,ry=0;
  if (!isTouchDevice) {
    window.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; gsap.set(cursor,{x:mx,y:my}); });
    gsap.ticker.add(() => { rx+=(mx-rx)*.12; ry+=(my-ry)*.12; gsap.set(ring,{x:rx,y:ry}); });
  } else {
    cursor.style.display = 'none';
    ring.style.display   = 'none';
  }

  // Nav scroll
  const nav = document.getElementById('nav')!;
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60), {passive:true});

  // STT
  const stt = document.getElementById('stt')!;
  window.addEventListener('scroll', () => stt.classList.toggle('visible', window.scrollY > 300), {passive:true});
  stt.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // Hamburger
  const hamBtn  = document.getElementById('ham-btn')!;
  const hamClose= document.getElementById('ham-close')!;
  const mobMenu = document.getElementById('mobile-menu')!;

  function closeMob() {
    hamBtn.classList.remove('open');
    mobMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
  hamBtn.addEventListener('click', () => {
    hamBtn.classList.add('open');
    mobMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    gsap.fromTo('.mobile-menu a:not(.mob-contact-icon), .mobile-menu .btn-primary',
      {opacity:0,y:20}, {opacity:1,y:0,duration:.4,ease:'power3.out',stagger:.05,delay:.05});
    gsap.fromTo('.mob-contact-row', {opacity:0,y:12}, {opacity:1,y:0,duration:.4,ease:'power3.out',delay:.42});
  });
  hamClose.addEventListener('click', closeMob);
  mobMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMob));

  // Scroll reveals
  document.querySelectorAll<HTMLElement>('.js-reveal').forEach(el => {
    const d = parseFloat(el.dataset.delay||'0');
    gsap.fromTo(el, {opacity:0,y:28}, {opacity:1,y:0,duration:.8,ease:'power3.out',delay:d,
      scrollTrigger:{trigger:el,start:'top 88%',toggleActions:'play none none none'}});
  });
  document.querySelectorAll<HTMLElement>('.js-scale').forEach(el => {
    const d = parseFloat(el.dataset.delay||'0');
    gsap.fromTo(el, {opacity:0,scale:.93}, {opacity:1,scale:1,duration:.85,ease:'power3.out',delay:d,
      scrollTrigger:{trigger:el,start:'top 90%',toggleActions:'play none none none'}});
  });

  return gsap;
}
