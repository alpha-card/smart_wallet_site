const root = document.documentElement;
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('site-nav');
const themeToggle = document.getElementById('theme-toggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const THEME_STORAGE_KEY = 'smartwallet-theme';
const supportsMatchMedia = typeof window.matchMedia === 'function';
const prefersReducedMotion = supportsMatchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)')
  : { matches: false };
const colorSchemeMedia = supportsMatchMedia
  ? window.matchMedia('(prefers-color-scheme: dark)')
  : null;

const updateThemeToggle = (theme) => {
  if (!themeToggle) return;
  const isDark = theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  const label = themeToggle.querySelector('.theme-toggle__label');
  if (label) {
    label.textContent = isDark ? 'Dark mode' : 'Light mode';
  }
};

const applyTheme = (theme, { persist = false } = {}) => {
  const nextTheme = theme === 'dark' ? 'dark' : 'light';
  root.setAttribute('data-theme', nextTheme);
  updateThemeToggle(nextTheme);
  if (themeMeta) {
    themeMeta.setAttribute('content', nextTheme === 'dark' ? '#050915' : '#f5f7fb');
  }
  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (error) {
      /* noop */
    }
  }
};

let storedTheme = null;
try {
  storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
} catch (error) {
  storedTheme = null;
}

if (storedTheme !== 'light' && storedTheme !== 'dark') {
  storedTheme = null;
}

let hasExplicitTheme = typeof storedTheme === 'string';
const initialTheme =
  storedTheme || (colorSchemeMedia && colorSchemeMedia.matches ? 'dark' : 'light');

applyTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    hasExplicitTheme = true;
    applyTheme(nextTheme, { persist: true });
  });
}

if (colorSchemeMedia) {
  const handleSchemeChange = (event) => {
    if (hasExplicitTheme) return;
    applyTheme(event.matches ? 'dark' : 'light');
  };

  if (typeof colorSchemeMedia.addEventListener === 'function') {
    colorSchemeMedia.addEventListener('change', handleSchemeChange);
  } else if (typeof colorSchemeMedia.addListener === 'function') {
    colorSchemeMedia.addListener(handleSchemeChange);
  }
}

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
  if (themeToggle && themeToggle.contains(event.target)) return;
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
