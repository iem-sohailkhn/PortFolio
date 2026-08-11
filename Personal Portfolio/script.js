// ============================================================
// script.js — Muhammad Sohail portfolio
// Handles: mobile nav toggle, active-link tracking on scroll,
// navbar shadow on scroll, fade-in reveal on scroll,
// back-to-top button, and the frontend-only contact form.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollEffects();
  initFadeIn();
  initBackToTop();
  initContactForm();
});

/* ---------- Mobile nav toggle ---------- */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');

  if (!toggle || !navList) return;

  toggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the menu whenever a link is tapped (mobile UX expectation)
  navList.querySelectorAll('.tab-link').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Navbar shadow + active section highlighting ---------- */
function initScrollEffects() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('main section[id]');
  const links = document.querySelectorAll('.tab-link');

  const onScroll = () => {
    // Shadow once the page has scrolled past the hero top
    navbar.classList.toggle('scrolled', window.scrollY > 12);

    // Figure out which section is currently in view
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    links.forEach(link => {
      const isActive = link.getAttribute('href') === `#${currentId}`;
      link.classList.toggle('active-link', isActive);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- Fade-in reveal on scroll ---------- */
function initFadeIn() {
  const targets = document.querySelectorAll('.fade-in, .section__title, .skill-card, .project-card, .cert-card, .git-log__entry');
  targets.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => observer.observe(el));
}

/* ---------- Back to top button ---------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
}

/* ---------- Contact form (frontend-only) ----------
   No backend is connected yet. This validates the fields and
   shows a confirmation message. To make it actually send email,
   wire the fetch() call below up to a service such as Formspree,
   EmailJS, or your own backend endpoint — see README.md.
------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      status.style.color = '#DC2626';
      status.textContent = 'Please fill in every field before sending.';
      return;
    }

    // Placeholder success flow — replace with a real request once
    // a form backend/email service is connected (see README.md).
    status.style.color = '#16A34A';
    status.textContent = 'Message ready to send — connect a form backend to deliver it (see README.md).';
    form.reset();
  });
}
