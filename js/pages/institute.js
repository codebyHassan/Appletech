/* ============================================================
   APPLE TECH — Institute Page Interactions
   Roadmap expansion, enrollment wizard
   ============================================================ */

document.addEventListener('appReady', initInstitutePage);

function initInstitutePage() {
  const page = document.querySelector('[data-page="institute"]');
  if (!page) return;

  initRoadmapAnimations();
  initEnrollmentForm();
}

function initRoadmapAnimations() {
  const nodes = document.querySelectorAll('.roadmap-node');
  nodes.forEach((node, i) => {
    gsap.fromTo(node,
      { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: node,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
  });
}

function initEnrollmentForm() {
  const form = document.querySelector('#enrollment-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>Enrollment Submitted ✓</span>';
    btn.style.background = '#25D366';
    btn.style.color = '#fff';

    if (typeof showToast === 'function') {
      showToast('Your enrollment request has been submitted! Check your email for next steps.');
    }

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.style.color = '';
      form.reset();
    }, 3000);
  });
}
