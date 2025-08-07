// FORCE DESKTOP CLASSES + MOBILE DESKTOP MIRROR - Complete solution
console.log('🚀 FORCE DESKTOP CLASSES + CSS MIRROR: Starting complete solution...');

// Load force desktop classes script immediately on mobile
if (window.innerWidth <= 767) {
  console.log('📱 Loading force desktop classes script...');
  document.write('<script src="force-desktop-classes.js"><\/script>');
  console.log('✅ Force desktop classes script loaded');
}

// MOBILE DESKTOP MIRROR CSS INJECTION - Force mobile to mirror desktop layout
console.log('🚀 MOBILE DESKTOP MIRROR CSS: Injecting comprehensive CSS...');

// Inject comprehensive CSS to force mobile to mirror desktop
(function() {
  console.log('📱 Injecting mobile desktop mirror CSS...');

  const mobileMirrorCSS = document.createElement('style');
  mobileMirrorCSS.id = 'mobile-desktop-mirror-css';
  mobileMirrorCSS.innerHTML = `
/* MOBILE DESKTOP MIRROR - Force mobile to mirror desktop layout */
@media screen and (max-width: 767px) {

  /* HIDE all mobile elements */
  #mobileMenuBtn,
  button[onclick*="toggleMobileMenu"],
  .md\\:hidden button {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    position: absolute !important;
    left: -99999px !important;
    width: 0 !important;
    height: 0 !important;
    pointer-events: none !important;
  }

  #mobileMenu,
  .md\\:hidden.absolute {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    position: absolute !important;
    left: -99999px !important;
    pointer-events: none !important;
  }

  #mobileSignedOutState,
  #mobileSignedInState {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    position: absolute !important;
    left: -99999px !important;
    pointer-events: none !important;
  }

  /* FORCE show desktop navigation */
  nav.hidden,
  nav.md\\:flex,
  .hidden.md\\:flex,
  nav[class*="hidden"][class*="md:flex"] {
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
    position: relative !important;
    flex-wrap: wrap !important;
    justify-content: center !important;
    align-items: center !important;
    gap: 0.75rem !important;
    padding: 0.5rem !important;
  }

  nav.hidden a,
  nav.md\\:flex a,
  .hidden.md\\:flex a,
  nav[class*="hidden"] a {
    display: inline-flex !important;
    visibility: visible !important;
    opacity: 1 !important;
    font-size: 14px !important;
    padding: 0.5rem 0.75rem !important;
    white-space: nowrap !important;
    color: rgb(55, 65, 81) !important;
    text-decoration: none !important;
    border-radius: 0.375rem !important;
    transition: all 0.2s !important;
  }

  nav.hidden a:hover,
  nav.md\\:flex a:hover,
  .hidden.md\\:flex a:hover {
    color: rgb(79, 70, 229) !important;
    background-color: rgba(79, 70, 229, 0.1) !important;
  }

  /* FORCE show desktop auth states */
  #signedOutState,
  #signedInState {
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
    position: relative !important;
    flex-direction: row !important;
    gap: 0.5rem !important;
    align-items: center !important;
  }

  /* FIX logo sizing */
  img[alt*="Visual Vibe Studio Logo"],
  img[alt*="Logo"] {
    height: 2rem !important;
    width: 2rem !important;
    max-height: 2rem !important;
    max-width: 2rem !important;
    object-fit: contain !important;
  }

  /* FIX header layout */
  header .max-w-7xl {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    flex-wrap: wrap !important;
    gap: 1rem !important;
    width: 100% !important;
    padding: 0 1rem !important;
  }

  /* FIX title sizing */
  h1.text-lg {
    font-size: 1.25rem !important;
    line-height: 1.75rem !important;
    font-weight: 700 !important;
  }

  /* SHOW all hidden desktop elements */
  .hidden.md\\:block {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
  }

  .hidden.md\\:flex {
    display: flex !important;
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

  /* FORCE desktop grid layouts */
  .grid.grid-cols-1.md\\:grid-cols-2 {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 1rem !important;
  }

  .grid.grid-cols-1.md\\:grid-cols-3,
  .grid.grid-cols-1.lg\\:grid-cols-3 {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 0.75rem !important;
  }

  .grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3 {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 0.75rem !important;
  }

  /* Larger mobile screens get more columns */
  @media screen and (min-width: 375px) and (max-width: 767px) {
    .grid.grid-cols-1.md\\:grid-cols-3,
    .grid.grid-cols-1.lg\\:grid-cols-3,
    .grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3 {
      grid-template-columns: repeat(3, 1fr) !important;
      gap: 0.5rem !important;
    }
  }

  /* FORCE horizontal flex layouts */
  .flex.flex-col.sm\\:flex-row,
  .flex.flex-col.md\\:flex-row {
    flex-direction: row !important;
    flex-wrap: wrap !important;
    gap: 0.75rem !important;
    justify-content: center !important;
    align-items: center !important;
  }

  /* DESKTOP text sizing */
  .text-3xl.sm\\:text-4xl.md\\:text-5xl.lg\\:text-6xl {
    font-size: 2rem !important;
    line-height: 2.25rem !important;
  }

  .text-lg.sm\\:text-xl.md\\:text-2xl {
    font-size: 1.125rem !important;
    line-height: 1.75rem !important;
  }

  /* DESKTOP section spacing */
  section {
    padding: 3rem 1rem !important;
  }

  .py-12 {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }

  .py-16 {
    padding-top: 4rem !important;
    padding-bottom: 4rem !important;
  }

  /* DESKTOP button styling */
  button {
    padding: 0.75rem 1.5rem !important;
    font-size: 14px !important;
    border-radius: 0.5rem !important;
    white-space: nowrap !important;
    font-weight: 500 !important;
  }

  /* PREVENT overflow */
  html, body {
    overflow-x: hidden !important;
    max-width: 100vw !important;
  }

  /* HIDE md:hidden elements */
  .md\\:hidden {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    position: absolute !important;
    left: -99999px !important;
    pointer-events: none !important;
  }
}

/* Larger mobile adjustments */
@media screen and (min-width: 375px) and (max-width: 767px) {
  nav.hidden a,
  nav.md\\:flex a,
  .hidden.md\\:flex a {
    font-size: 15px !important;
    padding: 0.5rem 1rem !important;
  }

  h1.text-lg {
    font-size: 1.5rem !important;
    line-height: 2rem !important;
  }

  .text-3xl.sm\\:text-4xl.md\\:text-5xl.lg\\:text-6xl {
    font-size: 2.5rem !important;
    line-height: 2.75rem !important;
  }
}

/* Large mobile adjustments */
@media screen and (min-width: 425px) and (max-width: 767px) {
  nav.hidden a,
  nav.md\\:flex a,
  .hidden.md\\:flex a {
    font-size: 16px !important;
    padding: 0.75rem 1.25rem !important;
  }

  h1.text-lg {
    font-size: 1.75rem !important;
    line-height: 2.25rem !important;
  }

  .text-3xl.sm\\:text-4xl.md\\:text-5xl.lg\\:text-6xl {
    font-size: 3rem !important;
    line-height: 3.25rem !important;
  }

  section {
    padding: 4rem 1.5rem !important;
  }
}
  `;

  // Inject CSS immediately
  document.head.appendChild(mobileMirrorCSS);
  console.log('✅ Mobile desktop mirror CSS injected');

})();

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
        }
      }
    });
    
    resizeObserver.observe(document.body);
    
    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
      setTimeout(() => {
        stabilizeLayout();
        emergencyLayoutReset();
      }, 500);
    });
    
    console.log('✅ Mobile glitch fixes applied successfully!');
  }
  
})();

console.log('🔧 Mobile glitch fix script loaded!');
