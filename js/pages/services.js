/* ============================================================
   APPLE TECH — Services Page Interactions
   Diagnostic wizard, booking form simulation
   ============================================================ */

document.addEventListener('appReady', initServicesPage);

function initServicesPage() {
  const page = document.querySelector('[data-page="services"]');
  if (!page) return;

  initDiagnosticWizard();
  initBookingForm();
}

function initDiagnosticWizard() {
  // Alpine.js handles the wizard state; this adds GSAP transitions
  const wizard = document.querySelector('.wizard');
  if (!wizard) return;

  // Animate active panel transitions
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.target.classList.contains('active')) {
        gsap.fromTo(mutation.target,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
        );
      }
    });
  });

  wizard.querySelectorAll('.wizard-panel').forEach(panel => {
    observer.observe(panel, { attributes: true, attributeFilter: ['class'] });
  });
}

function initBookingForm() {
  const form = document.querySelector('#booking-form');
  if (!form) return;

  form.addEventListener('htmx:beforeSend', (e) => {
    e.preventDefault();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>Booking Confirmed ✓</span>';
    btn.style.background = '#25D366';
    btn.style.color = '#fff';

    if (typeof showToast === 'function') {
      showToast('Your repair booking has been confirmed! We\'ll contact you shortly.');
    }

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.style.color = '';
      form.reset();
    }, 3000);
  });
}
