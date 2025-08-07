// ULTIMATE MOBILE MIRROR FIX - Force mobile to exactly mirror desktop
console.log('🚀 ULTIMATE MOBILE MIRROR: Starting comprehensive fix...');

(function ultimateMobileMirrorFix() {
  
  function createUltimateMirrorStyles() {
    // Remove any existing mobile mirror styles
    const existingStyles = document.querySelectorAll('#aggressive-mobile-mirror, #mobile-mirror-styles, #ultimate-mobile-mirror');
    existingStyles.forEach(style => style.remove());
    
    // Create ultimate mirror CSS
    const ultimateStyles = document.createElement('style');
    ultimateStyles.id = 'ultimate-mobile-mirror';
    ultimateStyles.innerHTML = `
      /* ULTIMATE MOBILE MIRROR - Force exact desktop layout */
      
      @media (max-width: 767px) {
        
        /* CRITICAL: Override all mobile styles */
        * {
          box-sizing: border-box !important;
        }
        
        /* NAVIGATION: Complete desktop mirror */
        #mobileMenuBtn {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
        
        #mobileMenu {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
        
        /* Force all desktop navigation to show */
        nav.hidden,
        nav.md\\:flex,
        .hidden.md\\:flex,
        .md\\:flex {
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          width: auto !important;
          height: auto !important;
          overflow: visible !important;
          clip: unset !important;
          clip-path: unset !important;
          transform: none !important;
          flex-wrap: wrap !important;
          justify-content: center !important;
          gap: 0.5rem !important;
          padding: 0.5rem !important;
        }
        
        nav.hidden.md\\:flex a,
        nav.md\\:flex a {
          font-size: 14px !important;
          padding: 0.5rem 0.75rem !important;
          white-space: nowrap !important;
          display: inline-flex !important;
          align-items: center !important;
          color: inherit !important;
          text-decoration: none !important;
        }
        
        /* AUTHENTICATION: Force desktop states */
        #signedOutState {
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          flex-direction: row !important;
          gap: 0.5rem !important;
          align-items: center !important;
        }
        
        #signedInState {
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 0.5rem !important;
        }
        
        /* Hide all mobile auth states */
        #mobileSignedOutState,
        #mobileSignedInState {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }
        
        /* HEADER: Desktop layout */
        header {
          padding: 1rem !important;
        }
        
        header .max-w-7xl {
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          flex-wrap: wrap !important;
          gap: 1rem !important;
          width: 100% !important;
        }
        
        /* GRIDS: Force desktop multi-column layouts */
        .grid.grid-cols-1.md\\:grid-cols-2 {
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 1rem !important;
        }
        
        .grid.grid-cols-1.md\\:grid-cols-3 {
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 0.75rem !important;
        }
        
        .grid.grid-cols-1.lg\\:grid-cols-3 {
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 0.75rem !important;
        }
        
        .grid.grid-cols-1.sm\\:grid-cols-2 {
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 1rem !important;
        }
        
        .grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3 {
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 0.75rem !important;
        }
        
        /* For larger mobile screens (375px+) */
        @media (min-width: 375px) and (max-width: 767px) {
          .grid.grid-cols-1.md\\:grid-cols-3,
          .grid.grid-cols-1.lg\\:grid-cols-3,
          .grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3 {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 0.5rem !important;
          }
        }
        
        /* FLEX LAYOUTS: Force horizontal like desktop */
        .flex.flex-col.md\\:flex-row,
        .flex.flex-col.sm\\:flex-row {
          flex-direction: row !important;
          flex-wrap: wrap !important;
          gap: 0.75rem !important;
          justify-content: center !important;
          align-items: center !important;
        }
        
        /* SHOW ALL HIDDEN DESKTOP ELEMENTS */
        .hidden.md\\:block {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
        
        .hidden.md\\:inline {
          display: inline !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
        
        .hidden.md\\:inline-block {
          display: inline-block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
        
        .hidden.md\\:grid {
          display: grid !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
        
        .hidden.lg\\:block {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
        
        .hidden.lg\\:flex {
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
        
        /* FORMS: Desktop layout */
        form .grid.grid-cols-1.md\\:grid-cols-2 {
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 0.75rem !important;
        }
        
        form .grid.grid-cols-1.md\\:grid-cols-3 {
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 0.75rem !important;
        }
        
        /* INPUT STYLING: Desktop-like */
        input[type="text"],
        input[type="email"],
        input[type="tel"],
        input[type="url"],
        input[type="password"],
        select,
        textarea {
          font-size: 16px !important;
          padding: 0.75rem !important;
          border-radius: 6px !important;
          width: 100% !important;
          border: 1px solid #d1d5db !important;
        }
        
        /* TYPOGRAPHY: Desktop sizes */
        .text-xs { font-size: 0.75rem !important; }
        .text-sm { font-size: 0.875rem !important; }
        .text-base { font-size: 1rem !important; }
        .text-lg { font-size: 1.125rem !important; }
        .text-xl { font-size: 1.25rem !important; }
        .text-2xl { font-size: 1.5rem !important; }
        .text-3xl { font-size: 1.875rem !important; }
        .text-4xl { font-size: 2.25rem !important; }
        .text-5xl { font-size: 2.5rem !important; }
        .text-6xl { font-size: 3rem !important; }
        
        /* HERO SECTION: Desktop layout */
        .hero-section {
          padding: 3rem 1rem !important;
          text-align: center !important;
        }
        
        .hero-section .text-5xl,
        .hero-section .text-6xl {
          font-size: 2.5rem !important;
          line-height: 1.1 !important;
          margin-bottom: 1rem !important;
        }
        
        .hero-section .text-xl,
        .hero-section .text-lg {
          font-size: 1.125rem !important;
          line-height: 1.4 !important;
          margin-bottom: 2rem !important;
        }
        
        /* Hero buttons horizontal */
        .hero-section .flex.flex-col.sm\\:flex-row,
        .hero-section .space-y-4.sm\\:space-y-0.sm\\:space-x-4 {
          flex-direction: row !important;
          justify-content: center !important;
          gap: 1rem !important;
          margin-top: 2rem !important;
        }
        
        .hero-section .flex.flex-col.sm\\:flex-row > *,
        .hero-section .space-y-4.sm\\:space-y-0.sm\\:space-x-4 > * {
          width: auto !important;
          min-width: 140px !important;
        }
        
        /* SECTIONS: Desktop spacing */
        section {
          padding: 3rem 1rem !important;
        }
        
        .py-16 {
          padding-top: 3rem !important;
          padding-bottom: 3rem !important;
        }
        
        .py-20 {
          padding-top: 4rem !important;
          padding-bottom: 4rem !important;
        }
        
        /* Section headings */
        section h2.text-3xl,
        section h2.text-4xl {
          font-size: 2rem !important;
          line-height: 1.2 !important;
          margin-bottom: 1.5rem !important;
        }
        
        section h3.text-2xl {
          font-size: 1.5rem !important;
          line-height: 1.3 !important;
        }
        
        /* BUTTONS: Desktop styling */
        button,
        .btn,
        a.btn {
          padding: 0.75rem 1.5rem !important;
          font-size: 14px !important;
          border-radius: 6px !important;
          white-space: nowrap !important;
          min-height: auto !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          text-decoration: none !important;
        }
        
        /* CARDS: Desktop appearance */
        .bg-white.rounded-lg,
        .bg-white.rounded-xl,
        .card,
        .service-card {
          padding: 1.25rem !important;
          margin-bottom: 1rem !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
          border-radius: 0.5rem !important;
        }
        
        /* CONTACT SECTION: Desktop layout */
        .contact-methods {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: wrap !important;
          gap: 1rem !important;
          justify-content: center !important;
        }
        
        .contact-methods > * {
          flex: 0 1 calc(50% - 0.5rem) !important;
          min-width: 200px !important;
        }
        
        @media (min-width: 375px) and (max-width: 767px) {
          .contact-methods > * {
            flex: 0 1 calc(33.333% - 0.667rem) !important;
          }
        }
        
        /* TESTIMONIALS: Desktop grid */
        .testimonial-container,
        #allCustomerReviews .grid {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 1rem !important;
        }
        
        @media (min-width: 375px) and (max-width: 767px) {
          .testimonial-container,
          #allCustomerReviews .grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 0.75rem !important;
          }
        }
        
        /* FOOTER: Desktop layout */
        footer {
          padding: 2rem 1rem !important;
        }
        
        footer .grid {
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 1rem !important;
        }
        
        /* MODALS: Desktop sizing */
        .modal,
        .fixed.inset-0 {
          padding: 1rem !important;
        }
        
        .modal > div,
        .fixed.inset-0 > div {
          max-width: 500px !important;
          margin: auto !important;
          max-height: 80vh !important;
          overflow-y: auto !important;
        }
        
        /* CONTAINERS: Responsive containers */
        .container,
        .max-w-7xl,
        .max-w-6xl,
        .max-w-5xl,
        .max-w-4xl,
        .max-w-3xl,
        .max-w-2xl {
          width: 100% !important;
          padding-left: 1rem !important;
          padding-right: 1rem !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }
        
        /* PREVENT OVERFLOW */
        html, body {
          overflow-x: hidden !important;
        }
        
        /* LARGER MOBILE SCREENS (375px+) */
        @media (min-width: 375px) and (max-width: 767px) {
          nav.hidden.md\\:flex a,
          nav.md\\:flex a {
            font-size: 15px !important;
            padding: 0.5rem 1rem !important;
          }
          
          .hero-section .text-5xl,
          .hero-section .text-6xl {
            font-size: 3rem !important;
          }
          
          .container,
          .max-w-7xl,
          .max-w-6xl {
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
          }
        }
        
        /* LARGE MOBILE SCREENS (425px+) */
        @media (min-width: 425px) and (max-width: 767px) {
          nav.hidden.md\\:flex a,
          nav.md\\:flex a {
            font-size: 16px !important;
            padding: 0.75rem 1.25rem !important;
          }
          
          #signedOutState button {
            font-size: 14px !important;
            padding: 0.75rem 1rem !important;
          }
          
          .hero-section {
            padding: 4rem 2rem !important;
          }
          
          .hero-section .text-5xl,
          .hero-section .text-6xl {
            font-size: 3.5rem !important;
          }
          
          section {
            padding: 4rem 2rem !important;
          }
          
          .py-16 {
            padding-top: 4rem !important;
            padding-bottom: 4rem !important;
          }
          
          .py-20 {
            padding-top: 5rem !important;
            padding-bottom: 5rem !important;
          }
        }
      }
    `;
    
    document.head.appendChild(ultimateStyles);
    console.log('✅ Ultimate mobile mirror styles applied');
  }
  
  function applyUltimateDOMFixes() {
    console.log('🔧 Applying ultimate DOM fixes...');
    
    // Force hide mobile elements completely
    const mobileElements = [
      '#mobileMenuBtn',
      '#mobileMenu',
      '#mobileSignedOutState',
      '#mobileSignedInState'
    ];
    
    mobileElements.forEach(selector => {
      const element = document.querySelector(selector);
      if (element) {
        element.style.display = 'none';
        element.style.visibility = 'hidden';
        element.style.opacity = '0';
        element.style.pointerEvents = 'none';
        element.setAttribute('aria-hidden', 'true');
        // Physically remove from DOM to prevent any interference
        if (selector.includes('Btn')) {
          element.remove();
        }
      }
    });
    
    // Force show desktop navigation
    const desktopNavs = document.querySelectorAll('nav.hidden, nav.md\\:flex, .hidden.md\\:flex');
    desktopNavs.forEach(nav => {
      nav.classList.remove('hidden');
      nav.style.display = 'flex';
      nav.style.visibility = 'visible';
      nav.style.opacity = '1';
      nav.style.position = 'relative';
      nav.style.width = 'auto';
      nav.style.height = 'auto';
      nav.style.overflow = 'visible';
      nav.style.clipPath = 'unset';
      nav.style.clip = 'unset';
      nav.style.transform = 'none';
      nav.removeAttribute('aria-hidden');
    });
    
    // Force show desktop auth states
    const authStates = [
      { id: 'signedOutState', display: 'flex' },
      { id: 'signedInState', display: 'flex' }
    ];
    
    authStates.forEach(({ id, display }) => {
      const element = document.getElementById(id);
      if (element) {
        element.style.display = display;
        element.style.visibility = 'visible';
        element.style.opacity = '1';
        element.removeAttribute('aria-hidden');
      }
    });
    
    // Force grid layouts to be multi-column
    const grids = document.querySelectorAll('.grid');
    grids.forEach(grid => {
      if (grid.classList.contains('grid-cols-1')) {
        let columns = 1;
        
        if (grid.classList.contains('md:grid-cols-2') || grid.classList.contains('lg:grid-cols-2') || grid.classList.contains('sm:grid-cols-2')) {
          columns = 2;
        }
        
        if (grid.classList.contains('md:grid-cols-3') || grid.classList.contains('lg:grid-cols-3')) {
          columns = window.innerWidth >= 375 ? 3 : 2;
        }
        
        if (columns > 1) {
          grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
          grid.style.gap = columns === 3 ? '0.75rem' : '1rem';
        }
      }
    });
    
    // Force flex layouts to be horizontal
    const flexLayouts = document.querySelectorAll('.flex.flex-col.md\\:flex-row, .flex.flex-col.sm\\:flex-row');
    flexLayouts.forEach(flex => {
      flex.style.flexDirection = 'row';
      flex.style.flexWrap = 'wrap';
      flex.style.gap = '0.75rem';
      flex.style.justifyContent = 'center';
      flex.style.alignItems = 'center';
    });
    
    // Show all hidden desktop elements
    const hiddenDesktopSelectors = [
      '.hidden.md\\:block',
      '.hidden.md\\:flex',
      '.hidden.md\\:grid',
      '.hidden.md\\:inline',
      '.hidden.md\\:inline-block',
      '.hidden.lg\\:block',
      '.hidden.lg\\:flex'
    ];
    
    hiddenDesktopSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.classList.remove('hidden');
        
        const displayType = selector.includes('flex') ? 'flex' :
                          selector.includes('grid') ? 'grid' :
                          selector.includes('inline-block') ? 'inline-block' :
                          selector.includes('inline') ? 'inline' : 'block';
        
        el.style.display = displayType;
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        el.removeAttribute('aria-hidden');
      });
    });
    
    // Fix body overflow
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    
    console.log('✅ Ultimate DOM fixes applied');
  }
  
  function initUltimateMobileMirror() {
    // Only apply on mobile devices
    if (window.innerWidth > 767) {
      console.log('⚠️ Not mobile, skipping ultimate mirror');
      return;
    }
    
    console.log('📱 Applying ultimate mobile mirror...');
    
    // Apply CSS styles first
    createUltimateMirrorStyles();
    
    // Apply DOM fixes after a brief delay to ensure styles are loaded
    setTimeout(() => {
      applyUltimateDOMFixes();
    }, 100);
    
    // Re-apply DOM fixes after page is fully loaded
    setTimeout(() => {
      applyUltimateDOMFixes();
    }, 1000);
  }
  
  // Initialize immediately
  initUltimateMobileMirror();
  
  // Re-initialize on resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (window.innerWidth <= 767) {
        initUltimateMobileMirror();
      }
    }, 100);
  });
  
  // Monitor for dynamic content changes
  const observer = new MutationObserver((mutations) => {
    if (window.innerWidth <= 767) {
      let shouldReapply = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' || 
            (mutation.type === 'attributes' && 
             (mutation.attributeName === 'class' || mutation.attributeName === 'style'))) {
          shouldReapply = true;
        }
      });
      
      if (shouldReapply) {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          applyUltimateDOMFixes();
        }, 500);
      }
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style', 'aria-hidden']
  });
  
  // Periodic maintenance to ensure mirror stays active
  setInterval(() => {
    if (window.innerWidth <= 767) {
      applyUltimateDOMFixes();
    }
  }, 5000);
  
  // Make refresh function globally available
  window.refreshUltimateMobileMirror = initUltimateMobileMirror;
  
  // Override any functions that might break the mirror
  const originalUpdateAuthUI = window.updateAuthUI;
  if (originalUpdateAuthUI) {
    window.updateAuthUI = function(...args) {
      const result = originalUpdateAuthUI.apply(this, args);
      if (window.innerWidth <= 767) {
        setTimeout(applyUltimateDOMFixes, 100);
      }
      return result;
    };
  }
  
  console.log('🚀 ULTIMATE MOBILE MIRROR: Fully loaded and monitoring');
  
})();
