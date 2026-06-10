/* ============================================================
   APPLE TECH — Contact Page Interactions
   Form submission, input animations
   ============================================================ */

document.addEventListener('appReady', initContactPage);

function initContactPage() {
  const page = document.querySelector('[data-page="contact"]');
  if (!page) return;

  initContactForm();
  initInputAnimations();
}

function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    // Animate button
    gsap.to(btn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
    });

    btn.innerHTML = '<span>Message Sent ✓</span>';
    btn.style.background = '#25D366';
    btn.style.color = '#fff';

    if (typeof showToast === 'function') {
      showToast('Your message has been sent! We\'ll get back to you within 24 hours.');
    }

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.style.color = '';
      form.reset();
      // Reset floating labels
      form.querySelectorAll('.form-input').forEach(input => {
        input.dispatchEvent(new Event('blur'));
      });
    }, 3000);
  });
}

function initInputAnimations() {
  document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', () => {
      gsap.to(input.closest('.form-group'), {
        y: -2,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    input.addEventListener('blur', () => {
      gsap.to(input.closest('.form-group'), {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  });
}
