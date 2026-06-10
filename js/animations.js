/* ============================================================
   APPLE TECH — Reusable GSAP Scroll Animations
   ScrollTrigger reveals, stagger, counters, text splits
   ============================================================ */

// Wait for app to be ready
document.addEventListener('appReady', initAnimations);

function initAnimations() {
  revealOnScroll();
  staggerCards();
  counterUp();
  textReveal();
  parallaxSections();
  glowDividers();
}

// ---- Reveal Elements on Scroll ----
function revealOnScroll() {
  // Fade up
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    });
  });

  // Scale reveal
  gsap.utils.toArray('.reveal-scale').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    });
  });

  // Reveal from left
  gsap.utils.toArray('.reveal-left').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    });
  });

  // Reveal from right
  gsap.utils.toArray('.reveal-right').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    });
  });
}

// ---- Stagger Cards ----
function staggerCards() {
  gsap.utils.toArray('.cards-grid, .stats-grid').forEach(grid => {
    const cards = grid.children;
    gsap.fromTo(cards,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    );
  });
}

// ---- Counter Up Animation ----
function counterUp() {
  gsap.utils.toArray('.stat-number').forEach(el => {
    const target = parseInt(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function () {
            el.textContent = prefix + Math.floor(this.targets()[0].val).toLocaleString() + suffix;
          }
        });
      },
      once: true,
    });
  });
}

// ---- Text Reveal (split chars) ----
function textReveal() {
  gsap.utils.toArray('.text-reveal').forEach(el => {
    const text = el.textContent;
    el.innerHTML = '';
    [...text].forEach(char => {
      const span = document.createElement('span');
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(100%)';
      span.textContent = char === ' ' ? '\u00A0' : char;
      el.appendChild(span);
    });

    gsap.to(el.children, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.02,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    });
  });
}

// ---- Parallax Sections ----
function parallaxSections() {
  gsap.utils.toArray('[data-parallax-speed]').forEach(el => {
    const speed = parseFloat(el.dataset.parallaxSpeed) || 0.2;
    gsap.to(el, {
      y: () => -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el.closest('.section') || el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });
  });
}

// ---- Glow Dividers ----
function glowDividers() {
  gsap.utils.toArray('.glow-divider').forEach(el => {
    gsap.fromTo(el,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      }
    );
  });
}
