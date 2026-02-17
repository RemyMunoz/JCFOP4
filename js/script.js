/* ============================================
   Jersey City FOP Lodge #4 - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // Mobile Navigation Toggle
  const navbarToggle = document.querySelector('.navbar__toggle');
  const navbarNav = document.querySelector('.navbar__nav');
  const navbarBackdrop = document.querySelector('.navbar__backdrop');

  if (navbarToggle && navbarNav) {
    navbarToggle.addEventListener('click', function() {
      const isActive = navbarNav.classList.toggle('active');
      navbarToggle.classList.toggle('active', isActive);
      if (navbarBackdrop) navbarBackdrop.classList.toggle('active', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close menu when clicking backdrop
    if (navbarBackdrop) {
      navbarBackdrop.addEventListener('click', function() {
        navbarNav.classList.remove('active');
        navbarToggle.classList.remove('active');
        navbarBackdrop.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Close menu when clicking a link
    const navLinks = navbarNav.querySelectorAll('.navbar__link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 992) {
          navbarNav.classList.remove('active');
          navbarToggle.classList.remove('active');
          if (navbarBackdrop) navbarBackdrop.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  // Add active class to current nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
      } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
      }
    });
  }

  // Animate elements on scroll (Intersection Observer)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card, .news-card, .board-card, .product-card, .quick-link').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });

  // Year auto-update for footer
  const yearElement = document.querySelector('.footer__year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Mobile menu dropdown for nested navigation
  const dropdownToggles = document.querySelectorAll('.navbar__link--dropdown');
  dropdownToggles.forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        const parent = this.closest('.navbar__dropdown');
        const menu = parent ? parent.querySelector('.navbar__dropdown-menu') : null;
        if (menu) {
          const isOpen = menu.style.display === 'block';
          menu.style.display = isOpen ? 'none' : 'block';
          this.setAttribute('aria-expanded', !isOpen);
        }
      }
    });

    // Set initial aria attribute
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-haspopup', 'true');
  });

  // Form validation (for any future forms)
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      let isValid = true;
      const required = form.querySelectorAll('[required]');

      required.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#e74c3c';
        } else {
          field.style.borderColor = '';
        }
      });

      if (!isValid) {
        e.preventDefault();
        alert('Please fill in all required fields.');
      }
    });
  });

  // Add hover effect to cards
  const cards = document.querySelectorAll('.card, .news-card, .board-card, .product-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
    });
  });

  console.log('JCFOP4 Website Loaded Successfully');
});
