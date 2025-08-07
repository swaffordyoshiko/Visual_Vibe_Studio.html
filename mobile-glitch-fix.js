// NUCLEAR MOBILE DESKTOP FIX + Mobile Glitch Fix
console.log('🚀 NUCLEAR MOBILE DESKTOP + glitch fixes...');

// INLINE NUCLEAR MOBILE DESKTOP FIX - Run immediately
if (window.innerWidth <= 767) {
  console.log('📱 Applying NUCLEAR mobile desktop fix...');

  // NUCLEAR CSS - Inject immediately with highest priority
  const nuclearCSS = document.createElement('style');
  nuclearCSS.id = 'nuclear-mobile-desktop-inline';
  nuclearCSS.innerHTML = `
    @media screen and (max-width: 767px) {
      /* REMOVE mobile menu button completely */
      #mobileMenuBtn,
      button[onclick*="toggleMobileMenu"] {
        display: none !important;
        visibility: hidden !important;
        position: absolute !important;
        left: -9999px !important;
        width: 0 !important;
        height: 0 !important;
      }

      /* HIDE mobile menu */
      #mobileMenu {
        display: none !important;
        visibility: hidden !important;
        position: absolute !important;
        left: -9999px !important;
      }

      /* FORCE show desktop navigation */
      nav.hidden,
      nav.md\\:flex,
      .hidden.md\\:flex,
      header nav {
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: relative !important;
        flex-wrap: wrap !important;
        justify-content: center !important;
        gap: 0.5rem !important;
        padding: 0.5rem !important;
      }

      nav.hidden a,
      nav.md\\:flex a,
      .hidden.md\\:flex a,
      header nav a {
        display: inline-flex !important;
        visibility: visible !important;
        font-size: 14px !important;
        padding: 0.5rem 0.75rem !important;
        white-space: nowrap !important;
      }

      /* FORCE show desktop auth states */
      #signedOutState,
      #signedInState {
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        flex-direction: row !important;
        gap: 0.5rem !important;
      }

      /* HIDE mobile auth states */
      #mobileSignedOutState,
      #mobileSignedInState {
        display: none !important;
        visibility: hidden !important;
        position: absolute !important;
        left: -9999px !important;
      }

      /* FORCE desktop grids */
      .grid.grid-cols-1.md\\:grid-cols-2 {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 1rem !important;
      }

      .grid.grid-cols-1.md\\:grid-cols-3,
      .grid.grid-cols-1.lg\\:grid-cols-3 {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 0.75rem !important;
      }

      @media screen and (min-width: 375px) and (max-width: 767px) {
        .grid.grid-cols-1.md\\:grid-cols-3,
        .grid.grid-cols-1.lg\\:grid-cols-3 {
          grid-template-columns: repeat(3, 1fr) !important;
          gap: 0.5rem !important;
        }
      }

      /* SHOW hidden desktop elements */
      .hidden.md\\:block { display: block !important; visibility: visible !important; }
      .hidden.md\\:flex { display: flex !important; visibility: visible !important; }
      .hidden.md\\:grid { display: grid !important; visibility: visible !important; }
      .hidden.lg\\:block { display: block !important; visibility: visible !important; }
      .hidden.lg\\:flex { display: flex !important; visibility: visible !important; }

      /* FORCE horizontal layouts */
      .flex.flex-col.md\\:flex-row,
      .flex.flex-col.sm\\:flex-row {
        flex-direction: row !important;
        flex-wrap: wrap !important;
        gap: 0.75rem !important;
        justify-content: center !important;
      }

      /* HEADER layout */
      header .max-w-7xl {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        flex-wrap: wrap !important;
        gap: 0.5rem !important;
      }

      /* PREVENT overflow */
      html, body { overflow-x: hidden !important; }
    }
  `;

  // Inject CSS immediately
  (document.head || document.documentElement).appendChild(nuclearCSS);

  // NUCLEAR DOM FIXES - Apply immediately
  function applyNuclearFixes() {
    try {
      // Remove mobile menu button completely
      const mobileBtn = document.getElementById('mobileMenuBtn');
      if (mobileBtn && mobileBtn.parentNode) {
        mobileBtn.parentNode.removeChild(mobileBtn);
      }

      // Hide mobile menu
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu) {
        mobileMenu.style.display = 'none';
        mobileMenu.style.visibility = 'hidden';
        mobileMenu.style.position = 'absolute';
        mobileMenu.style.left = '-9999px';
      }

      // Force show desktop navigation
      const desktopNavs = document.querySelectorAll('nav.hidden, nav.md\\:flex, .hidden.md\\:flex, header nav');
      desktopNavs.forEach(nav => {
        nav.classList.remove('hidden');
        nav.style.display = 'flex';
        nav.style.visibility = 'visible';
        nav.style.opacity = '1';
      });

      // Force show desktop auth states
      const signedOut = document.getElementById('signedOutState');
      const signedIn = document.getElementById('signedInState');
      if (signedOut) {
        signedOut.style.display = 'flex';
        signedOut.style.visibility = 'visible';
        signedOut.style.opacity = '1';
      }
      if (signedIn) {
        signedIn.style.display = 'flex';
        signedIn.style.visibility = 'visible';
        signedIn.style.opacity = '1';
      }

      // Hide mobile auth states
      const mobileSignedOut = document.getElementById('mobileSignedOutState');
      const mobileSignedIn = document.getElementById('mobileSignedInState');
      if (mobileSignedOut) {
        mobileSignedOut.style.display = 'none';
        mobileSignedOut.style.visibility = 'hidden';
      }
      if (mobileSignedIn) {
        mobileSignedIn.style.display = 'none';
        mobileSignedIn.style.visibility = 'hidden';
      }

      // Show hidden desktop elements
      const hiddenElements = document.querySelectorAll('.hidden.md\\:block, .hidden.md\\:flex, .hidden.md\\:grid, .hidden.lg\\:block, .hidden.lg\\:flex');
      hiddenElements.forEach(el => {
        el.classList.remove('hidden');
        const classes = el.className;
        const display = classes.includes('flex') ? 'flex' : classes.includes('grid') ? 'grid' : 'block';
        el.style.display = display;
        el.style.visibility = 'visible';
        el.style.opacity = '1';
      });

      console.log('✅ Nuclear DOM fixes applied');
    } catch (error) {
      console.error('❌ Nuclear DOM fix error:', error);
    }
  }

  // Apply fixes immediately and repeatedly
  applyNuclearFixes();
  setTimeout(applyNuclearFixes, 100);
  setTimeout(applyNuclearFixes, 500);
  setTimeout(applyNuclearFixes, 1000);

  // Apply on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyNuclearFixes);
  }

  // Apply on window load
  window.addEventListener('load', applyNuclearFixes);

  // Apply periodically
  setInterval(applyNuclearFixes, 3000);

  // Make globally available
  window.applyNuclearMobileFix = applyNuclearFixes;

  console.log('✅ Nuclear mobile desktop fix loaded and active');
}

// Mobile Glitch Fix - Immediate JavaScript Solutions
console.log('🔧 Loading mobile glitch fixes...');

(function() {
  'use strict';
  
  // Immediate mobile detection and fixes
  const isMobile = window.innerWidth <= 767;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  
  if (isMobile) {
    console.log('📱 Applying mobile glitch fixes...');
    
    // Fix 1: Disable problematic animations immediately
    function disableProblematicAnimations() {
      const style = document.createElement('style');
      style.innerHTML = `
        @media (max-width: 767px) {
          *, *::before, *::after {
            animation-duration: 0s !important;
            transition-duration: 0.1s !important;
            transform: none !important;
          }
          .hero-section * {
            animation: none !important;
            transform: none !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Fix 2: Force immediate layout stabilization
    function stabilizeLayout() {
      document.body.style.overflowX = 'hidden';
      document.documentElement.style.overflowX = 'hidden';
      
      // Remove floating elements that cause glitches
      const floatingElements = document.querySelectorAll('.floating-shapes, .floating-icon, .geometric-shape');
      floatingElements.forEach(el => {
        el.style.display = 'none';
      });
      
      // Simplify grid layouts
      const grids = document.querySelectorAll('.grid');
      grids.forEach(grid => {
        grid.style.display = 'flex';
        grid.style.flexDirection = 'column';
        grid.style.gap = '1rem';
      });
    }
    
    // Fix 3: Handle viewport issues
    function fixViewport() {
      // Update viewport meta tag
      let viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
      }
      
      // Fix iOS viewport issues
      if (isIOS) {
        const updateViewportHeight = () => {
          document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
        };
        updateViewportHeight();
        window.addEventListener('resize', updateViewportHeight);
        window.addEventListener('orientationchange', () => {
          setTimeout(updateViewportHeight, 100);
        });
      }
    }
    
    // Fix 4: Prevent scroll issues
    function preventScrollIssues() {
      // Disable elastic scrolling on iOS
      if (isIOS) {
        document.body.addEventListener('touchmove', function(e) {
          if (e.target === document.body) {
            e.preventDefault();
          }
        }, { passive: false });
      }
      
      // Fix Android scroll bounce
      if (isAndroid) {
        document.body.style.webkitOverflowScrolling = 'touch';
      }
    }
    
    // Fix 5: Handle touch events properly
    function fixTouchEvents() {
      // Remove hover effects on touch devices
      const hoverElements = document.querySelectorAll('[class*="hover:"]');
      hoverElements.forEach(el => {
        el.style.transition = 'none';
      });
      
      // Improve button tap response
      const buttons = document.querySelectorAll('button, a');
      buttons.forEach(btn => {
        btn.style.webkitTapHighlightColor = 'transparent';
        btn.style.touchAction = 'manipulation';
      });
    }
    
    // Fix 6: Optimize performance for mobile
    function optimizePerformance() {
      // Disable will-change on problematic elements
      const elements = document.querySelectorAll('*');
      elements.forEach(el => {
        if (getComputedStyle(el).willChange !== 'auto') {
          el.style.willChange = 'auto';
        }
      });
      
      // Reduce composite layers
      const transformElements = document.querySelectorAll('[style*="transform"]');
      transformElements.forEach(el => {
        if (!el.closest('.toast-container')) {
          el.style.transform = 'none';
        }
      });
    }
    
    // Fix 7: Handle modal and overlay issues
    function fixModalsAndOverlays() {
      const modals = document.querySelectorAll('.modal, .chat-window');
      modals.forEach(modal => {
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.width = 'calc(100vw - 2rem)';
        modal.style.maxWidth = 'calc(100vw - 2rem)';
        modal.style.maxHeight = '80vh';
        modal.style.overflowY = 'auto';
      });
    }
    
    // Fix 8: Handle form input issues
    function fixFormInputs() {
      const inputs = document.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        input.style.fontSize = '16px'; // Prevent iOS zoom
        input.style.webkitAppearance = 'none';
        input.style.borderRadius = '8px';
        
        // Handle focus events to prevent viewport jumping
        input.addEventListener('focus', function() {
          if (isIOS) {
            setTimeout(() => {
              this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
          }
        });
      });
    }
    
    // Fix 9: Emergency layout reset if needed
    function emergencyLayoutReset() {
      if (document.body.scrollWidth > window.innerWidth) {
        console.log('🚨 Emergency layout reset triggered');
        
        // Force all elements to fit within viewport
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
          if (el.scrollWidth > window.innerWidth) {
            el.style.maxWidth = '100%';
            el.style.overflow = 'hidden';
          }
        });
        
        // Reset problematic containers
        const containers = document.querySelectorAll('.container, .max-w-7xl, .max-w-6xl, .max-w-5xl, .max-w-4xl');
        containers.forEach(container => {
          container.style.width = '100%';
          container.style.maxWidth = '100%';
          container.style.paddingLeft = '1rem';
          container.style.paddingRight = '1rem';
        });
      }
    }
    
    // Apply all fixes immediately
    disableProblematicAnimations();
    stabilizeLayout();
    fixViewport();
    preventScrollIssues();
    fixTouchEvents();
    optimizePerformance();
    fixModalsAndOverlays();
    fixFormInputs();
    
    // Apply emergency reset after DOM is fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', emergencyLayoutReset);
    } else {
      emergencyLayoutReset();
    }
    
    // Monitor for layout issues and fix them
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.target === document.body) {
          if (document.body.scrollWidth > window.innerWidth) {
            emergencyLayoutReset();
          }
