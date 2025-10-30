const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('site-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}

const form = document.querySelector('.cta-form');
if (form) {
  form.addEventListener('submit', () => {
    alert('Thanks! We\'ll be in touch soon.');
  });
}

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (nav && nav.classList.contains('open')) nav.classList.remove('open');
    }
  });
});

// Scroll-triggered animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });

document.querySelectorAll('#optimization, .reveal, .flow-card, .flow-chip').forEach(el => {
  observer.observe(el);
});


