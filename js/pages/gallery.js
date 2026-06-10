/* ============================================================
   APPLE TECH — Gallery Page Interactions
   Filtering, lightbox, parallax hover
   ============================================================ */

document.addEventListener('appReady', initGalleryPage);

function initGalleryPage() {
  const page = document.querySelector('[data-page="gallery"]');
  if (!page) return;

  initGalleryFilters();
  initLightbox();
  initGalleryParallax();
}

function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      items.forEach(item => {
        const categories = item.dataset.category;
        const show = filter === 'all' || categories.includes(filter);

        gsap.to(item, {
          opacity: show ? 1 : 0.15,
          scale: show ? 1 : 0.95,
          duration: 0.5,
          ease: 'power2.out',
          pointerEvents: show ? 'auto' : 'none',
        });
      });
    });
  });
}

function initLightbox() {
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');
  if (!lightbox || !lightboxImg) return;

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';

      gsap.fromTo(lightboxImg,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
    });
  });

  function closeLightbox() {
    gsap.to(lightboxImg, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
}

function initGalleryParallax() {
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const img = item.querySelector('img');
      if (img) {
        gsap.to(img, {
          x: x * 10,
          y: y * 10,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    });
    item.addEventListener('mouseleave', () => {
      const img = item.querySelector('img');
      if (img) {
        gsap.to(img, { x: 0, y: 0, duration: 0.6, ease: 'power2.out' });
      }
    });
  });
}
