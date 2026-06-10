/* ============================================================
   APPLE TECH — About Page Animations
   Timeline, milestones, team cards
   ============================================================ */

document.addEventListener('appReady', initAboutPage);

function initAboutPage() {
  const page = document.querySelector('[data-page="about"]');
  if (!page) return;

  initTimelineAnimations();
  initTeamCards();
}

function initTimelineAnimations() {
  const items = document.querySelectorAll('.timeline-item');

  items.forEach((item, i) => {
    const content = item.querySelector('.timeline-content');
    const isEven = i % 2 === 1;

    gsap.fromTo(content,
      {
        opacity: 0,
        x: isEven ? 60 : -60,
        scale: 0.95,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    );

    // Animate the dot
    gsap.fromTo(item,
      { '--dot-scale': 0 },
      {
        '--dot-scale': 1,
        duration: 0.4,
        ease: 'back.out(3)',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // Animate timeline line
  const timeline = document.querySelector('.timeline');
  if (timeline) {
    gsap.fromTo(timeline,
      { '--line-progress': '0%' },
      {
        '--line-progress': '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: timeline,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1,
        }
      }
    );
  }
}

function initTeamCards() {
  const cards = document.querySelectorAll('.team-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        duration: 0.4,
        ease: 'power2.out',
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    });
  });
}
