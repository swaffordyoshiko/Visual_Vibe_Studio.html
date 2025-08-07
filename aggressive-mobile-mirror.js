// AGGRESSIVE MOBILE MIRROR - Force desktop layout on mobile
console.log('🚀 AGGRESSIVE MOBILE MIRROR: Starting...');

(function aggressiveMobileMirror() {
  
  function forceMobileToDesktop() {
    console.log('📱 Forcing mobile to mirror desktop...');
    
    // Only run on mobile
    if (window.innerWidth > 767) {
      console.log('⚠️ Not mobile, skipping');
      return;
    }
    
    // Create style element with aggressive CSS
    const aggressiveStyles = document.createElement('style');
    aggressiveStyles.id = 'aggressive-mobile-mirror';
    aggressiveStyles.innerHTML = `
      /* AGGRESSIVE MOBILE MIRROR - Force desktop layout */
      
      @media (max-width: 767px) {
        
        /* HIDE MOBILE NAVIGATION */
        #mobileMenuBtn {
          display: none !important;
          visibility: hidden !important;
        }
        
        /* HIDE MOBILE MENU */
        #mobileMenu {
          display: none !important;
          visibility: hidden !important;
        }
        
        /* FORCE DESKTOP NAVIGATION TO SHOW */
        nav.hidden,
        nav.md\\:flex,
        .hidden.md\\:flex {
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
        }
        
        /* NAVIGATION LAYOUT */
        nav.hidden.md\\:flex,
        nav.md\\:flex {
          flex-wrap: wrap !important;
          justify-content: center !important;
          gap: 0.5rem !important;
          padding: 0.5rem !important;
          background: transparent !important;
        }
        
        nav.hidden.md\\:flex a,
        nav.md\\:flex a {
          font-size: 14px !important;
          padding: 0.4rem 0.6rem !important;
          white-space: nowrap !important;
          display: inline-block !important;
          color: inherit !important;
        }
        
        /* FORCE DESKTOP AUTH STATES */
        #signedOutState {
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          flex-direction: row !important;
          gap: 0.5rem !important;
        }
        
        #signedInState {
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 0.5rem !important;
        }
        
        /* HIDE MOBILE AUTH STATES */
        #mobileSignedOutState,
        #mobileSignedInState {
          display: none !important;
          visibility: hidden !important;
        }
        
        /* DESKTOP GRID LAYOUTS */
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
        
        /* LARGER SCREENS GET 3 COLUMNS */
        @media (min-width: 375px) and (max-width: 767px) {
          .grid.grid-cols-1.md\\:grid-cols-3,
          .grid.grid-cols-1.lg\\:grid-cols-3 {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 0.5rem !important;
          }
        }
        
        /* HORIZONTAL FLEX LAYOUTS */
        .flex.flex-col.md\\:flex-row,
        .flex.flex-col.sm\\:flex-row {
          flex-direction: row !important;
          flex-wrap: wrap !important;
          gap: 0.75rem !important;
          justify-content: center !important;
        }
        
        /* SHOW ALL HIDDEN DESKTOP ELEMENTS */
        .hidden.md\\:block {
          display: block !important;
          visibility: visible !important;
        }
        
        .hidden.md\\:inline {
          display: inline !important;
          visibility: visible !important;
        }
        
        .hidden.md\\:inline-block {
          display: inline-block !important;
          visibility: visible !important;
        }
        
        .hidden.md\\:grid {
          display: grid !important;
          visibility: visible !important;
        }
        
        /* HEADER LAYOUT */
        header .max-w-7xl {
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          flex-wrap: wrap !important;
          gap: 0.5rem !important;
        }
        
        /* FORM LAYOUTS */
        form .grid.grid-cols-1.md\\:grid-cols-2 {
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 0.75rem !important;
        }
        
        /* DESKTOP TEXT SIZES */
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
        
        /* LARGER SCREENS GET BIGGER TEXT */
        @media (min-width: 425px) and (max-width: 767px) {
          .text-5xl, .text-6xl { font-size: 3.5rem !important; }
        }
        
        /* DESKTOP SPACING */
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
        
        /* HERO SECTION */
        .hero-section {
          padding: 3rem 1rem !important;
          text-align: center !important;
        }
        
        .hero-section .text-5xl,
        .hero-section .text-6xl {
          font-size: 2.5rem !important;
          line-height: 1.1 !important;
        }
        
        /* HERO BUTTONS HORIZONTAL */
        .hero-section .flex.flex-col.sm\\:flex-row {
          flex-direction: row !important;
          justify-content: center !important;
          gap: 1rem !important;
        }
        
        /* BUTTONS DESKTOP STYLE */
        button, .btn, a.btn {
          padding: 0.75rem 1.5rem !important;
          font-size: 14px !important;
          border-radius: 6px !important;
          white-space: nowrap !important;
        }
        
        /* CONTAINERS */
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
        
        /* CARDS DESKTOP STYLE */
        .bg-white.rounded-lg,
        .bg-white.rounded-xl,
        .card,
        .service-card {
          padding: 1.25rem !important;
          margin-bottom: 1rem !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
        }
        
        /* TESTIMONIALS */
        .testimonial-container {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 1rem !important;
        }
        
        /* CONTACT METHODS */
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
        
        /* FOOTER */
        footer {
          padding: 2rem 1rem !important;
        }
        
        footer .grid {
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 1rem !important;
        }
        
        /* MODALS DESKTOP STYLE */
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
        
        /* FORCE VISIBLE ANY POTENTIALLY HIDDEN ELEMENTS */
        [style*="display: none"],
        [style*="visibility: hidden"] {
          display: block !important;
          visibility: visible !important;
        }
        
        .sr-only:not(.focus\\:not-sr-only) {
          position: static !important;
          width: auto !important;
          height: auto !important;
          padding: 0 !important;
          margin: 0 !important;
          overflow: visible !important;
          clip: auto !important;
          white-space: normal !important;
        }
      }
    `;
    
    // Remove any existing aggressive styles
    const existing = document.getElementById('aggressive-mobile-mirror');
    if (existing) existing.remove();
    
    // Add the aggressive styles
    document.head.appendChild(aggressiveStyles);
    console.log('✅ Aggressive mobile mirror styles added');
    
    // JavaScript DOM manipulation for forced desktop layout
    setTimeout(() => {
      aggressiveJSFixes();
    }, 100);
  }
  
  function aggressiveJSFixes() {
    console.log('🔧 Applying aggressive JavaScript fixes...');
    
    // Force hide mobile elements
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
      mobileMenuBtn.style.display = 'none';
      mobileMenuBtn.style.visibility = 'hidden';
      mobileMenuBtn.remove();
    }
    
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
      mobileMenu.style.display = 'none';
      mobileMenu.style.visibility = 'hidden';
    }
    
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
    });
    
    // Force show desktop auth states
    const signedOutState = document.getElementById('signedOutState');
    if (signedOutState) {
      signedOutState.style.display = 'flex';
      signedOutState.style.visibility = 'visible';
      signedOutState.style.opacity = '1';
    }
    
    const signedInState = document.getElementById('signedInState');
    if (signedInState) {
      signedInState.style.display = 'flex';
      signedInState.style.visibility = 'visible';
      signedInState.style.opacity = '1';
    }
    
    // Hide mobile auth states
    const mobileSignedOutState = document.getElementById('mobileSignedOutState');
    if (mobileSignedOutState) {
      mobileSignedOutState.style.display = 'none';
      mobileSignedOutState.style.visibility = 'hidden';
    }
    
    const mobileSignedInState = document.getElementById('mobileSignedInState');
    if (mobileSignedInState) {
      mobileSignedInState.style.display = 'none';
      mobileSignedInState.style.visibility = 'hidden';
    }
    
    // Force grid layouts to be multi-column
    const grids = document.querySelectorAll('.grid');
    grids.forEach(grid => {
      if (grid.classList.contains('grid-cols-1')) {
        if (grid.classList.contains('md:grid-cols-2') || grid.classList.contains('lg:grid-cols-2')) {
          grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
          grid.style.gap = '1rem';
        }
        if (grid.classList.contains('md:grid-cols-3') || grid.classList.contains('lg:grid-cols-3')) {
          const columns = window.innerWidth >= 375 ? 3 : 2;
          grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
          grid.style.gap = '0.75rem';
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
    });
    
    // Show all hidden desktop elements
    const hiddenDesktopElements = document.querySelectorAll('.hidden.md\\:block, .hidden.md\\:flex, .hidden.md\\:grid, .hidden.md\\:inline, .hidden.md\\:inline-block');
    hiddenDesktopElements.forEach(el => {
      el.classList.remove('hidden');
      const computedDisplay = el.classList.contains('md:flex') ? 'flex' :
                            el.classList.contains('md:grid') ? 'grid' :
                            el.classList.contains('md:inline') ? 'inline' :
                            el.classList.contains('md:inline-block') ? 'inline-block' : 'block';
      el.style.display = computedDisplay;
      el.style.visibility = 'visible';
      el.style.opacity = '1';
    });
    
    // Force body layout adjustments
    document.body.style.overflowX = 'hidden';
    
    console.log('✅ Aggressive JavaScript fixes applied');
  }
  
  // Initialize immediately
  forceMobileToDesktop();
  
  // Re-apply on resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (window.innerWidth <= 767) {
        forceMobileToDesktop();
      }
    }, 100);
  });
  
  // Re-apply periodically to catch dynamic content
  setInterval(() => {
    if (window.innerWidth <= 767) {
      aggressiveJSFixes();
    }
  }, 3000);
  
  // Re-apply on DOM changes
  const observer = new MutationObserver(() => {
    if (window.innerWidth <= 767) {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(aggressiveJSFixes, 500);
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style']
  });
  
  // Make refresh function globally available
  window.refreshAggressiveMobileMirror = forceMobileToDesktop;
  
  console.log('🚀 AGGRESSIVE MOBILE MIRROR: Loaded and active');
  
})();
