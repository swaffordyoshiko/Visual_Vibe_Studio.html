// Responsive JavaScript Enhancements
// Handles dynamic responsive adjustments for optimal viewing on all devices

console.log('📱 Loading responsive enhancements...');

(function() {
  'use strict';
  
  // Device detection and viewport handling
  function initializeResponsiveFeatures() {
    
    // Fix viewport issues on mobile devices
    function fixViewport() {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover');
      }
    }
    
    // Handle iOS Safari viewport issues
    function handleIOSViewport() {
      if (navigator.userAgent.match(/iPhone|iPad|iPod/)) {
        const updateViewport = () => {
          document.documentElement.style.setProperty('--viewport-height', window.innerHeight + 'px');
        };
        
        updateViewport();
        window.addEventListener('resize', updateViewport);
        window.addEventListener('orientationchange', () => {
          setTimeout(updateViewport, 500);
        });
      }
    }
    
    // Dynamic grid adjustments based on screen size
    function handleDynamicGrids() {
      const grids = document.querySelectorAll('.grid');
      
      function adjustGrids() {
        const screenWidth = window.innerWidth;
        
        grids.forEach(grid => {
          if (screenWidth < 640) {
            // Mobile: force single column
            grid.style.gridTemplateColumns = '1fr';
            grid.style.gap = '1rem';
          } else if (screenWidth < 768) {
            // Small tablet: max 2 columns
            const originalCols = grid.className.match(/grid-cols-(\d+)/);
            if (originalCols && parseInt(originalCols[1]) > 2) {
              grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            }
          } else if (screenWidth < 1024) {
            // Tablet: max 3 columns
            const originalCols = grid.className.match(/grid-cols-(\d+)/);
            if (originalCols && parseInt(originalCols[1]) > 3) {
              grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            }
          }
        });
      }
      
      adjustGrids();
      window.addEventListener('resize', adjustGrids);
    }
    
    // Handle form responsiveness
    function handleFormResponsiveness() {
      const form = document.getElementById('orderForm');
      if (!form) return;
      
      function adjustForm() {
        const screenWidth = window.innerWidth;
        
        if (screenWidth < 768) {
          // Mobile: stack all form elements
          const formGrids = form.querySelectorAll('.grid');
          formGrids.forEach(grid => {
            grid.style.gridTemplateColumns = '1fr';
            grid.style.gap = '1rem';
          });
          
          // Adjust input sizes
          const inputs = form.querySelectorAll('input, select, textarea');
          inputs.forEach(input => {
            input.style.fontSize = '16px'; // Prevent zoom on iOS
            input.style.padding = '1rem';
          });
          
          // Adjust form padding
          form.style.padding = '1rem';
        }
      }
      
      adjustForm();
      window.addEventListener('resize', adjustForm);
    }
    
    // Handle modal and popup responsiveness
    function handleModalResponsiveness() {
      const modals = document.querySelectorAll('.modal, .chat-window');
      
      function adjustModals() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        
        modals.forEach(modal => {
          if (screenWidth < 768) {
            // Mobile: full width modals
            modal.style.width = 'calc(100vw - 2rem)';
            modal.style.maxWidth = 'calc(100vw - 2rem)';
            modal.style.margin = '1rem';
            modal.style.maxHeight = 'calc(100vh - 4rem)';
          } else if (screenWidth < 1024) {
            // Tablet: constrained modals
            modal.style.width = 'calc(100vw - 4rem)';
            modal.style.maxWidth = '600px';
          }
        });
      }
      
      adjustModals();
      window.addEventListener('resize', adjustModals);
    }
    
    // Handle text size adjustments
    function handleTextResponsiveness() {
      function adjustTextSizes() {
        const screenWidth = window.innerWidth;
        
        // Adjust hero text sizes
        const heroTitle = document.querySelector('.hero-section h1, .hero-section .text-6xl');
        const heroSubtitle = document.querySelector('.hero-section p');
        
        if (heroTitle) {
          if (screenWidth < 640) {
            heroTitle.style.fontSize = '2rem';
            heroTitle.style.lineHeight = '1.2';
          } else if (screenWidth < 768) {
            heroTitle.style.fontSize = '2.5rem';
          } else if (screenWidth < 1024) {
            heroTitle.style.fontSize = '3rem';
          }
        }
        
        if (heroSubtitle && screenWidth < 768) {
          heroSubtitle.style.fontSize = '1rem';
          heroSubtitle.style.lineHeight = '1.5';
        }
      }
      
      adjustTextSizes();
      window.addEventListener('resize', adjustTextSizes);
    }
    
    // Handle button responsiveness
    function handleButtonResponsiveness() {
      function adjustButtons() {
        const screenWidth = window.innerWidth;
        const buttons = document.querySelectorAll('button, .btn');
        
        buttons.forEach(button => {
          // Ensure minimum touch target size
          button.style.minHeight = '44px';
          button.style.minWidth = '44px';
          
          if (screenWidth < 768) {
            // Mobile: full width buttons in hero section
            if (button.closest('.hero-section')) {
              button.style.width = '100%';
              button.style.marginBottom = '0.5rem';
            }
          }
        });
      }
      
      adjustButtons();
      window.addEventListener('resize', adjustButtons);
    }
    
    // Handle image responsiveness
    function handleImageResponsiveness() {
      const images = document.querySelectorAll('img');
      
      images.forEach(img => {
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        img.loading = 'lazy'; // Add lazy loading
      });
    }
    
    // Handle scroll behavior on mobile
    function handleMobileScroll() {
      if ('scrollBehavior' in document.documentElement.style) {
        document.documentElement.style.scrollBehavior = 'smooth';
      }
      
      // Fix iOS scroll issues
      if (navigator.userAgent.match(/iPhone|iPad|iPod/)) {
        document.body.style.webkitOverflowScrolling = 'touch';
      }
    }
    
    // Handle orientation changes
    function handleOrientationChange() {
      window.addEventListener('orientationchange', function() {
        setTimeout(() => {
          // Trigger resize event to adjust layouts
          window.dispatchEvent(new Event('resize'));
        }, 100);
      });
    }
    
    // Handle touch device optimizations
    function handleTouchOptimizations() {
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
        
        // Add touch-friendly hover alternatives
        const hoverElements = document.querySelectorAll('.hover\\:scale-105, .hover\\:shadow-lg');
        hoverElements.forEach(element => {
          element.style.transition = 'all 0.2s ease';
        });
      }
    }
    
    // Performance optimization for mobile
    function optimizeForMobile() {
      const screenWidth = window.innerWidth;
      
      if (screenWidth < 768) {
        // Reduce animations on mobile for better performance
        const style = document.createElement('style');
        style.innerHTML = `
          @media (max-width: 767px) {
            * {
              animation-duration: 0.3s !important;
              transition-duration: 0.2s !important;
            }
          }
        `;
        document.head.appendChild(style);
      }
    }
    
    // Initialize all responsive features
    fixViewport();
    handleIOSViewport();
    handleDynamicGrids();
    handleFormResponsiveness();
    handleModalResponsiveness();
    handleTextResponsiveness();
    handleButtonResponsiveness();
    handleImageResponsiveness();
    handleMobileScroll();
    handleOrientationChange();
    handleTouchOptimizations();
    optimizeForMobile();
    
    // Add CSS custom properties for JavaScript access
    const root = document.documentElement;
    root.style.setProperty('--screen-width', window.innerWidth + 'px');
    root.style.setProperty('--screen-height', window.innerHeight + 'px');
    
    window.addEventListener('resize', () => {
      root.style.setProperty('--screen-width', window.innerWidth + 'px');
      root.style.setProperty('--screen-height', window.innerHeight + 'px');
    });
    
    console.log('✅ Responsive enhancements initialized!');
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeResponsiveFeatures);
  } else {
    initializeResponsiveFeatures();
  }
  
})();

console.log('📱 Responsive enhancements script loaded!');
