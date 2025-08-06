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
