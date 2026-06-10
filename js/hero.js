/* ============================================================
   APPLE TECH — Hero Section Animations
   GSAP timeline for hero text, CTAs, scroll indicator
   ============================================================ */

document.addEventListener('appReady', initHero);

function initHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const tl = gsap.timeline({ delay: 0.2 });

  // Label fade in
  tl.to('.hero-label', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
  })

  // Title words stagger reveal
  .fromTo('.hero-title .word-inner', {
    y: '110%',
    rotateX: -20,
  }, {
    y: '0%',
    rotateX: 0,
    duration: 1,
    stagger: 0.08,
    ease: 'power4.out',
  }, '-=0.4')

  // Subtitle
  .fromTo('.hero-subtitle', {
    opacity: 0,
    y: 30,
  }, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
  }, '-=0.5')

  // CTA buttons
  .fromTo('.hero-cta .cta-primary, .hero-cta .cta-secondary', {
    opacity: 0,
    y: 20,
    scale: 0.95,
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.6,
    stagger: 0.12,
    ease: 'power3.out',
  }, '-=0.4')

  // Scroll indicator
  .to('.hero-scroll', {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
  }, '-=0.2');

  // Parallax on scroll for hero content
  gsap.to('.hero-content', {
    y: -100,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    }
  });
}
