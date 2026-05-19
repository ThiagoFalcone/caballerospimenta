// ── WhatsApp — troque pelo número real (DDI+DDD+número, sem espaços ou traços)
const WA_NUMBER = '5511999999999';
document.querySelectorAll('[data-wa]').forEach(el => {
  const msg = el.getAttribute('data-wa') || '';
  el.href = 'https://wa.me/' + WA_NUMBER + (msg ? '?text=' + encodeURIComponent(msg) : '');
});

// ── Tema claro/escuro
const themeBtn = document.getElementById('theme-toggle');
if (localStorage.getItem('caballeros-theme') === 'light') document.body.classList.add('light');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('caballeros-theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

gsap.registerPlugin(ScrollTrigger);

// ── Navegação por âncora
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const targetTop = target.getBoundingClientRect().top + window.scrollY - 68;
    const distance = Math.abs(targetTop - window.scrollY);
    window.scrollTo({ top: targetTop, behavior: distance > window.innerHeight ? 'auto' : 'smooth' });
  });
});

// ── Navbar scroll behavior
const navEl = document.getElementById('nav');
const navBrand = document.getElementById('nav-brand');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navEl.classList.toggle('scrolled', y > 20);
  navBrand.classList.toggle('visible', y > window.innerHeight * 0.6);
}, { passive: true });

// ── Hero entrance
const htl = gsap.timeline({ delay: 0.25 });
htl
  .from('#h-ey',      { opacity:0, y:20,  duration:.6,  ease:'power2.out' })
  .from('#h-brand',   { opacity:0, y:36,  duration:1,   ease:'power3.out' }, '-=.25')
  .from('#h-rule',    { opacity:0, x:-35, duration:.5,  ease:'power2.out' }, '-=.4')
  .from('#h-tagline', { opacity:0, x:-35, duration:.6,  ease:'power2.out' }, '-=.35')
  .from('#h-actions', { opacity:0, x:-35, duration:.55, ease:'power2.out' }, '-=.3')
  .from('#h-stats',   { opacity:0, x:-35, duration:.5,  ease:'power2.out' }, '-=.25')
  .from('#shint',     { opacity:0,         duration:.6 }, '-=.2')
  .from('#h-badge',   { opacity:0, x:45, duration:.85,  ease:'power2.out' }, 0.4)
  .from('#h-bottle',  { opacity:0, x:45, duration:1.1,  ease:'power2.out' }, 0.6);

// ── Hero parallax
gsap.to('#h-brand',   { y:-70,  scrollTrigger:{ trigger:'.hero', start:'top top', end:'bottom top', scrub:1.5 } });
gsap.to('#h-tagline', { y:-40,  scrollTrigger:{ trigger:'.hero', start:'top top', end:'bottom top', scrub:1.5 } });
gsap.to('#h-bottle',  { y:-120, scrollTrigger:{ trigger:'.hero', start:'top top', end:'bottom top', scrub:1.5 } });
gsap.to('#h-badge',   { y:-50,  scrollTrigger:{ trigger:'.hero', start:'top top', end:'bottom top', scrub:1.5 } });

// ── Story chapters auto-play
const chs = ['#ch1','#ch2','#ch3','#ch4','#ch5'];
gsap.set(chs, { opacity:0, y:50 });
gsap.set('#shf', { scaleX:0, transformOrigin:'left' });

const storyTl = gsap.timeline({ paused: true });
storyTl
  .to('#ch1', { opacity:1, y:0, duration:.6, ease:'power2.out' })
  .to('#ch1', { opacity:0, y:-30, duration:.5, ease:'power2.in' }, '+=2.5')
  .to('#ch2', { opacity:1, y:0, duration:.6, ease:'power2.out' })
  .to('#ch2', { opacity:0, y:-30, duration:.5, ease:'power2.in' }, '+=2.5')
  .addLabel('ch3start')
  .to('#ch3', { opacity:1, y:0, duration:.6, ease:'power2.out' })
  .to('#shf', { scaleX:1, duration:1.1, ease:'power2.out' }, 'ch3start+=0.7')
  .to('#ch3', { opacity:0, y:-30, duration:.5, ease:'power2.in' }, 'ch3start+=3')
  .to('#ch4', { opacity:1, y:0, duration:.6, ease:'power2.out' })
  .to('#ch4', { opacity:0, y:-30, duration:.5, ease:'power2.in' }, '+=2.5')
  .to('#ch5', { opacity:1, y:0, duration:.6, ease:'power2.out' });

let storyStarted = false;
const storyIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !storyStarted) {
      storyStarted = true;
      storyTl.play();
    }
  });
}, { threshold: 0.2 });
storyIO.observe(document.getElementById('story'));

// ── Story carousel auto-play
(function(){
  const slides = document.querySelectorAll('.sc-slide');
  const dots   = document.querySelectorAll('.sc-dot');
  const glow   = document.getElementById('sc-glow');
  const glowColors = [
    'radial-gradient(ellipse,rgba(196,30,58,.15) 0%,transparent 60%)',
    'radial-gradient(ellipse,rgba(168,196,144,.12) 0%,transparent 60%)',
    'radial-gradient(ellipse,rgba(200,168,75,.13) 0%,transparent 60%)'
  ];
  let current = 0;
  let timer;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    if (glow) glow.style.background = glowColors[current];
  }

  function start() { timer = setInterval(() => goTo(current + 1), 3500); }
  function stop()  { clearInterval(timer); }

  const carouselIO = new IntersectionObserver(entries => {
    entries.forEach(e => e.isIntersecting ? start() : stop());
  }, { threshold: 0.3 });
  carouselIO.observe(document.getElementById('sc'));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { stop(); goTo(i); start(); });
  });
})();

// ── Product cards entrance
gsap.utils.toArray('.pcard').forEach((card, i) => {
  gsap.to(card, {
    opacity:1, y:0, duration:.8, ease:'power2.out',
    delay: i * 0.1,
    scrollTrigger:{ trigger:card, start:'top 88%', toggleActions:'play none none none' }
  });
});

// ── About section
gsap.from('.sobre-deco', {
  x: 100,
  scrollTrigger:{ trigger:'.sobre', start:'top bottom', end:'bottom top', scrub:2 }
});

gsap.utils.toArray('.pillar').forEach((p, i) => {
  gsap.to(p, {
    opacity:1, y:0, duration:.7, ease:'power2.out',
    delay: i * 0.1,
    scrollTrigger:{ trigger:p, start:'top 88%' }
  });
});
