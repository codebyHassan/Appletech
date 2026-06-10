/* ============================================================
   APPLE TECH — Core JavaScript
   Lenis, Cursor, Nav, Preloader, Particles, Transitions
   ============================================================ */

// ---- Lenis Smooth Scroll ----
let lenis;
function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 2,
  });

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

// ---- Custom Cursor (disabled — using simple browser cursor) ----
function initCursor() {
  // Cursor animation removed. Using simple black & white browser cursor.
  return;
}

// ---- Magnetic Buttons ----
function initMagnetic() {
  const magnetics = document.querySelectorAll('.magnetic');
  magnetics.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });
}

// ---- Navigation ----
function initNav() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const mobile = document.querySelector('.nav-mobile');
  if (!nav) return;

  let lastScroll = 0;
  const threshold = 100;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    if (currentScroll > threshold && currentScroll > lastScroll) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }

    lastScroll = currentScroll;
  });

  // Mobile toggle
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      mobile.classList.toggle('open');
      document.body.style.overflow = mobile.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    mobile.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active link highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ---- Page Transitions ----
function initPageTransitions() {
  const overlay = document.querySelector('.page-transition');
  if (!overlay) return;

  // Fade in on load
  gsap.fromTo(overlay,
    { opacity: 1 },
    { opacity: 0, duration: 0.8, ease: 'power2.inOut', delay: 0.1 }
  );

  // Fade out on link click
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('tel') || href.startsWith('mailto') || href.startsWith('whatsapp')) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          window.location.href = href;
        }
      });
    });
  });
}

// ---- Ambient Particles ----
function initParticles() {
  const container = document.querySelector('.particles');
  if (!container) return;

  const count = window.innerWidth < 768 ? 25 : 50;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.width = (Math.random() * 2 + 1) + 'px';
    particle.style.height = particle.style.width;
    particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
    particle.style.animationDelay = (Math.random() * 10) + 's';
    particle.style.opacity = Math.random() * 0.3 + 0.05;
    container.appendChild(particle);
  }
}

// ---- Preloader ----
function initPreloader() {
  return new Promise((resolve) => {
    const preloader = document.querySelector('.preloader');
    if (!preloader) { resolve(); return; }

    const chars = preloader.querySelectorAll('.preloader-text .char');
    const line = preloader.querySelector('.preloader-line');
    const sub = preloader.querySelector('.preloader-sub');

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(preloader, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            preloader.classList.add('hidden');
            preloader.style.display = 'none';
            resolve();
          }
        });
      }
    });

    tl.to(chars, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.04,
      ease: 'power3.out',
      delay: 0.3
    })
    .to(line, {
      width: '120px',
      duration: 0.8,
      ease: 'power2.inOut'
    }, '-=0.2')
    .to(sub, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.4')
    .to({}, { duration: 0.6 }); // Hold
  });
}

// ---- Toast Notification ----
function showToast(message, duration = 3000) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

// ---- Parallax Mouse Effect ----
let mouseParallaxX = 0;
let mouseParallaxY = 0;
function initMouseParallax() {
  document.addEventListener('mousemove', (e) => {
    mouseParallaxX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseParallaxY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  const elements = document.querySelectorAll('[data-parallax-mouse]');
  function animateParallax() {
    elements.forEach(el => {
      const speed = parseFloat(el.dataset.parallaxMouse) || 20;
      const x = mouseParallaxX * speed;
      const y = mouseParallaxY * speed;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    requestAnimationFrame(animateParallax);
  }
  if (elements.length > 0) animateParallax();
}

// ---- Initialize Everything ----
async function initApp() {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // Start preloader
  await initPreloader();

  // Initialize all systems
  initLenis();
  initCursor();
  initMagnetic();
  initNav();
  initPageTransitions();
  initParticles();
  initMouseParallax();

  // Dispatch custom event for page-specific scripts
  document.dispatchEvent(new CustomEvent('appReady'));
}

// Start
document.addEventListener('DOMContentLoaded', initApp);
