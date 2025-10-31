const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('site-nav');
const prefersReducedMotion =
  typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : { matches: false };

const setNavState = (isOpen) => {
  if (!nav || !navToggle) return;
  nav.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('nav-open', isOpen);
};

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = !nav.classList.contains('open');
    setNavState(isOpen);
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav && nav.classList.contains('open')) {
    setNavState(false);
  }
});

document.addEventListener('click', (event) => {
  if (!nav || !navToggle || !nav.classList.contains('open')) return;
  if (nav.contains(event.target) || navToggle.contains(event.target)) return;
  setNavState(false);
});

const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}

const form = document.querySelector('.cta-form');
if (form) {
  const message = form.querySelector('.form-success');
  let messageTimeout;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (message) {
      message.hidden = false;
      message.classList.add('visible');
      clearTimeout(messageTimeout);
      messageTimeout = setTimeout(() => {
        message.hidden = true;
        message.classList.remove('visible');
      }, 4000);
    }
    form.reset();
  });
}

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const id = anchor.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;

    if (!prefersReducedMotion.matches) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (nav && nav.classList.contains('open')) {
      setNavState(false);
    }
  });
});

// Scroll-triggered animations
const revealTargets = document.querySelectorAll(
  '.reveal, .feature-card, .journey-steps li, .metrics-cards article, .price-card, .testimonial'
);

if (!prefersReducedMotion.matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );

  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('in-view'));
}
