/**
 * Guadalupe Sistemas – Landing Page Script
 * ==========================================
 * Features:
 *   1. Mobile menu toggle
 *   2. Navbar scroll effect
 *   3. Active nav-link on scroll
 *   4. Smooth scroll with navbar offset
 *   5. Form → WhatsApp redirect
 *   6. Intersection Observer fade-up animations
 *   7. FAQ accordion
 *   8. Multi-step form navigation
 *   9. Testimonial carousel with auto-rotate
 *  10. Counter animation (numbers section)
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     1. MOBILE MENU TOGGLE
     ========================================================== */
  const menuToggle = document.querySelector('.mobile-menu-btn');
  const navLinks   = document.querySelector('.nav-links');
  const navbar     = document.querySelector('.navbar');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navbar.classList.toggle('menu-open');

      // Swap hamburger ↔ close icon
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navbar.classList.remove('menu-open');

        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  /* ==========================================================
     2. NAVBAR SCROLL EFFECT
     ========================================================== */
  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // run once on load

  /* ==========================================================
     3. ACTIVE NAV LINK ON SCROLL
     ========================================================== */
  const sections = document.querySelectorAll('section[id]');

  function highlightNavLink() {
    const scrollPos = window.scrollY + 120; // offset for fixed navbar

    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        // Remove active from all nav links
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        // Add active to matching link
        const activeLink = document.querySelector(`.nav-links a[href*="${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink, { passive: true });
  highlightNavLink();

  /* ==========================================================
     4. SMOOTH SCROLL (with fixed-navbar offset)
     ========================================================== */
  const NAVBAR_OFFSET = 80;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  /* ==========================================================
     5. FORM → WHATSAPP
     ========================================================== */
  const WHATSAPP_PHONE = '5537998323232';

  /**
   * Builds a WhatsApp URL from the form data and opens it.
   * Used by both the simple form and the multi-step form.
   */
  function sendToWhatsApp(formEl) {
    const solucaoRadio = formEl.querySelector('input[name="solucao"]:checked');
    const solucao = solucaoRadio ? solucaoRadio.value : 'Não informado';

    const objetivoEl = formEl.querySelector('[name="objetivo"]');
    const objetivo = objetivoEl ? objetivoEl.value.trim() : '';

    const nomeEl = formEl.querySelector('[name="contato_nome"]');
    const nome = nomeEl ? nomeEl.value.trim() : '';

    let message = `*Olá, Equipe Guadalupe Sistemas!* 👋%0A%0A`;
    message += `Gostaria de conversar sobre como vocês podem ajudar o meu negócio.%0A%0A`;
    message += `*Meu nome:* ${nome || 'Não informado'}%0A`;
    message += `*Solução que imagino precisar:* ${solucao}%0A`;
    if (objetivo) {
      message += `*O que está dificultando minha operação hoje:* ${objetivo}%0A%0A`;
    }
    message += `Aguardarei o retorno de vocês para entendermos o melhor caminho. Obrigado!`;

    const phone = '5537998323232';
    const waUrl = `https://wa.me/${phone}?text=${message}`;
    window.open(waUrl, '_blank');
  }

  // Bind simple (non-multi-step) contact forms
  const simpleForm = document.querySelector('form:not(.multi-step-form)');
  if (simpleForm) {
    simpleForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sendToWhatsApp(simpleForm);
    });
  }

  /* ==========================================================
     6. INTERSECTION OBSERVER – Fade-Up / Reveal Animations
     ========================================================== */

  // Selectors that should receive the reveal treatment
  const REVEAL_SELECTORS = [
    '.challenge-card',
    '.service-card',
    '.glass-card',
    '.step-item',
    '.case-card',
    '.tech-pillar',
    '.number-circle',
    '.blog-card',
    '.section-header',
    '.about-content',
    '.faq-container',
    '.form-wrapper',
    '.testimonial-content',
    '.diagnostico-item',
    '.audience-card',
    '.challenges-group-title'
  ];

  // Add .reveal class to matching elements that don't already have it
  REVEAL_SELECTORS.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
      }
    });
  });

  /**
   * Stagger animations for children inside grid/flex containers.
   * Applies incremental transitionDelay to siblings.
   */
  function applyStagger(parent) {
    const children = parent.children;
    for (let i = 0; i < children.length; i++) {
      children[i].style.transitionDelay = `${i * 0.1}s`;
    }
  }

  // Apply stagger to known grid containers
  document.querySelectorAll(
    '.services-grid, .challenges-grid, .challenges-grid-3, .challenges-grid-2, .cases-grid, .tech-pillars, .blog-grid, .diagnostico-deliverables, .audience-grid'
  ).forEach(applyStagger);

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: immediately show everything
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
  }

  /* ==========================================================
     7. FAQ ACCORDION
     ========================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other FAQ items first (accordion behaviour)
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherAnswer = other.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Toggle current item
      item.classList.toggle('active', !isActive);

      const answer = item.querySelector('.faq-answer');
      if (answer) {
        if (!isActive) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
          answer.style.maxHeight = null;
        }
      }
    });
  });

  /* ==========================================================
     8. MULTI-STEP FORM
     ========================================================== */
  const multiStepForm    = document.querySelector('.multi-step-form');
  const formSteps        = document.querySelectorAll('.form-step');
  const stepIndicators   = document.querySelectorAll('.step-indicator');
  const nextButtons      = document.querySelectorAll('.form-next');
  const prevButtons      = document.querySelectorAll('.form-prev');
  let   currentStep      = 1;

  /**
   * Show/hide form steps and update step indicators.
   */
  function goToStep(step) {
    // Clamp to valid range
    const totalSteps = formSteps.length || 3;
    step = Math.max(1, Math.min(step, totalSteps));

    // Update step panels
    formSteps.forEach(panel => {
      const panelStep = parseInt(panel.dataset.step, 10);
      panel.classList.toggle('active', panelStep === step);
    });

    // Update step indicators
    stepIndicators.forEach(ind => {
      const indStep = parseInt(ind.dataset.step, 10);
      ind.classList.remove('active', 'completed');

      if (indStep === step) {
        ind.classList.add('active');
      } else if (indStep < step) {
        ind.classList.add('completed');
      }
    });

    // Update step lines (connecting lines between indicators)
    const stepLines = document.querySelectorAll('.form-steps-indicator .step-line');
    stepLines.forEach((line, i) => {
      line.classList.toggle('active', i < step - 1);
    });

    currentStep = step;
  }

  /**
   * Validate required fields in the current step before advancing.
   * Returns true if valid.
   */
  function validateStep(step) {
    const activePanel = document.querySelector(`.form-step[data-step="${step}"]`);
    if (!activePanel) return true;

    // Check required inputs, textareas, and at least one checked radio group
    const requiredInputs = activePanel.querySelectorAll('input[required], textarea[required], select[required]');
    let valid = true;

    requiredInputs.forEach(input => {
      if (!input.value.trim()) {
        valid = false;
        input.classList.add('input-error');
        // Remove error class on next input
        input.addEventListener('input', () => input.classList.remove('input-error'), { once: true });
      }
    });

    // Check radio groups: if there's a radio with [required], at least one in its group must be checked
    const radioGroups = new Set();
    activePanel.querySelectorAll('input[type="radio"][required]').forEach(r => radioGroups.add(r.name));

    radioGroups.forEach(name => {
      const checked = activePanel.querySelector(`input[name="${name}"]:checked`);
      if (!checked) {
        valid = false;
        // Highlight radio group container
        const container = activePanel.querySelector(`input[name="${name}"]`)?.closest('.radio-group, .form-group');
        if (container) {
          container.classList.add('input-error');
          // Remove after any radio in the group is selected
          activePanel.querySelectorAll(`input[name="${name}"]`).forEach(r => {
            r.addEventListener('change', () => container.classList.remove('input-error'), { once: true });
          });
        }
      }
    });

    return valid;
  }

  // Next buttons
  nextButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        goToStep(currentStep + 1);
      }
    });
  });

  // Previous buttons
  prevButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      goToStep(currentStep - 1);
    });
  });

  // Multi-step form submission (final step)
  if (multiStepForm) {
    multiStepForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateStep(currentStep)) {
        sendToWhatsApp(multiStepForm);
      }
    });
  }

  /* ==========================================================
     9. TESTIMONIAL NAVIGATION / CAROUSEL
     ========================================================== */
  const testimonialNavItems = document.querySelectorAll('.testimonial-nav-item');
  const testimonialSlides   = document.querySelectorAll('.testimonial-slide');
  let   currentTestimonial  = 0;
  let   testimonialInterval = null;
  const TESTIMONIAL_DELAY   = 6000; // 6 seconds

  /**
   * Show the slide at the given index and update indicators.
   */
  function showTestimonial(index) {
    const total = testimonialSlides.length;
    if (total === 0) return;

    // Wrap index
    index = ((index % total) + total) % total;
    currentTestimonial = index;

    testimonialSlides.forEach(slide => {
      const slideIdx = parseInt(slide.dataset.index, 10);
      slide.classList.toggle('active', slideIdx === index);
    });

    testimonialNavItems.forEach(nav => {
      const navIdx = parseInt(nav.dataset.index, 10);
      nav.classList.toggle('active', navIdx === index);
    });
  }

  function startTestimonialAutoRotate() {
    if (testimonialSlides.length <= 1) return;
    testimonialInterval = setInterval(() => {
      showTestimonial(currentTestimonial + 1);
    }, TESTIMONIAL_DELAY);
  }

  function stopTestimonialAutoRotate() {
    clearInterval(testimonialInterval);
  }

  // Bind click on nav indicators
  testimonialNavItems.forEach(nav => {
    nav.addEventListener('click', () => {
      const idx = parseInt(nav.dataset.index, 10);
      showTestimonial(idx);
      // Reset auto-rotate timer on manual interaction
      stopTestimonialAutoRotate();
      startTestimonialAutoRotate();
    });
  });

  // Pause auto-rotate on hover over testimonial area
  const testimonialContainer = document.querySelector('.testimonials-wrapper');
  if (testimonialContainer) {
    testimonialContainer.addEventListener('mouseenter', stopTestimonialAutoRotate);
    testimonialContainer.addEventListener('mouseleave', startTestimonialAutoRotate);
  }

  // Initialise testimonials
  if (testimonialSlides.length > 0) {
    showTestimonial(0);
    startTestimonialAutoRotate();
  }

  /* ==========================================================
     10. COUNTER ANIMATION (Numbers Section)
     ========================================================== */
  const counterElements = document.querySelectorAll('.counter-value');
  let   countersAnimated = false;

  /**
   * Animate a single counter from 0 to its data-target value.
   */
  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10) || 0;
    const suffix   = el.dataset.suffix || '';
    const duration = 2000; // ms
    const startTime = performance.now();

    function update(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out quad for smooth deceleration
      const eased = 1 - (1 - progress) * (1 - progress);

      const current = Math.round(eased * target);
      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  /**
   * Trigger counter animations when the numbers section enters the viewport.
   */
  if (counterElements.length > 0 && 'IntersectionObserver' in window) {
    const numbersSection = document.querySelector('.numbers-section');
    if (numbersSection) {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !countersAnimated) {
            countersAnimated = true;
            counterElements.forEach(el => animateCounter(el));
            counterObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.3
      });

      counterObserver.observe(numbersSection);
    }
  } else if (counterElements.length > 0) {
    // Fallback: animate immediately
    counterElements.forEach(el => animateCounter(el));
  }

}); // end DOMContentLoaded
