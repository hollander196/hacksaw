/* ===========================
   main.js – Site Interactivity
   =========================== */
(function () {
  'use strict';

  // ---- Navbar scroll behaviour ----
  const navbar = document.getElementById('navbar');
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveNav();
    toggleScrollTop();
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---- Mobile nav toggle ----
  const toggleBtn = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');
  toggleBtn.addEventListener('click', function () {
    navMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', navMenu.classList.contains('open'));
  });

  // Close mobile menu on link click
  navMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // ---- Active nav link on scroll ----
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach(function (sec) {
      const top    = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      const link   = navMenu.querySelector('a[href="#' + sec.id + '"]');
      if (link) {
        link.classList.toggle('active', scrollY >= top && scrollY < bottom);
      }
    });
  }

  // ---- Scroll-to-top button ----
  const scrollTopBtn = document.getElementById('scrollTop');
  function toggleScrollTop() {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }
  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- Animate skill bars when in view ----
  const skillBars = document.querySelectorAll('.skill-bar');
  function animateSkillBars() {
    skillBars.forEach(function (bar) {
      const rect = bar.closest('.skill-item').getBoundingClientRect();
      if (rect.top < window.innerHeight - 60 && !bar.classList.contains('animated')) {
        bar.style.width = bar.dataset.width;
        bar.classList.add('animated');
      }
    });
  }
  window.addEventListener('scroll', animateSkillBars, { passive: true });
  animateSkillBars(); // run once on load (in case already in view)

  // ---- Intersection Observer fade-in animation ----
  const fadeEls = document.querySelectorAll(
    '.research-card, .pub-item, .project-card, .timeline-item, .highlight-item'
  );
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  // ---- Contact form demo ----
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('.btn-submit');
      btn.textContent = 'Message Sent ✓';
      btn.disabled = true;
      btn.style.background = '#27ae60';
      setTimeout(function () {
        form.reset();
        btn.textContent = 'Send Message';
        btn.disabled = false;
        btn.style.background = '';
      }, 3000);
    });
  }

  // ---- Initial call ----
  onScroll();
})();
