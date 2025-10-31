const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('site-nav');
const prefersReducedMotion = window.matchMedia
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
  let timeoutId;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (message) {
      message.hidden = false;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        message.hidden = true;
      }, 4000);
    }
    form.reset();
  });
}

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

const revealTargets = document.querySelectorAll(
  '.feature-card, .security-grid article, .price-card, .testimonial, .cta-form'
);

if (!prefersReducedMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('in-view'));
}
