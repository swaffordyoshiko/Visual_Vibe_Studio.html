// Real-time Mobile Glitch Monitor and Auto-Fix
console.log('📊 Starting mobile glitch monitor...');

(function() {
  'use strict';
  
  const isMobile = window.innerWidth <= 767;
  
  if (isMobile) {
    
    // Monitor for horizontal scroll issues
    function monitorHorizontalScroll() {
      const checkInterval = setInterval(() => {
        if (document.body.scrollWidth > window.innerWidth + 5) {
          console.log('🚨 Horizontal scroll detected, fixing...');
          
          // Find and fix overflowing elements
          const allElements = document.querySelectorAll('*');
          allElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.width > window.innerWidth) {
              el.style.maxWidth = '100%';
              el.style.overflow = 'hidden';
              console.log('🔧 Fixed overflow on:', el.tagName);
            }
          });
        }
      }, 2000);
      
      // Clear interval after 30 seconds
      setTimeout(() => clearInterval(checkInterval), 30000);
    }
    
    // Monitor for layout shifts
    function monitorLayoutShifts() {
      if ('LayoutShift' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.value > 0.1) {
              console.log('🚨 Layout shift detected:', entry.value);
              // Apply emergency stabilization
              document.body.style.minHeight = '100vh';
              document.documentElement.style.height = '100%';
            }
          }
        });
        
        observer.observe({ entryTypes: ['layout-shift'] });
      }
    }
    
    // Monitor for animation glitches
    function monitorAnimations() {
      const animatedElements = document.querySelectorAll('[style*="animation"], [style*="transform"]');
      animatedElements.forEach(el => {
        if (!el.closest('.toast-container')) {
          el.style.animation = 'none';
          el.style.transform = 'none';
        }
      });
    }
    
    // Emergency viewport reset
    function emergencyViewportReset() {
      if (window.innerWidth !== document.documentElement.clientWidth) {
        console.log('🚨 Viewport mismatch detected, resetting...');
        
        // Force viewport reset
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
          viewport.remove();
          const newViewport = document.createElement('meta');
          newViewport.name = 'viewport';
          newViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
          document.head.appendChild(newViewport);
        }
        
        // Force page refresh if needed
        setTimeout(() => {
          if (document.body.scrollWidth > window.innerWidth + 10) {
            window.location.reload();
          }
        }, 1000);
      }
    }
    
    // Monitor for problematic CSS
    function monitorProblematicCSS() {
      const style = document.createElement('style');
      style.innerHTML = `
        @media (max-width: 767px) {
          /* Emergency CSS overrides */
          * {
            max-width: 100% !important;
            overflow-x: hidden !important;
          }
          
          .hero-section,
          .hero-section * {
            animation: none !important;
            transform: none !important;
          }
          
          .floating-shapes,
          .floating-icon,
          .geometric-shape {
            display: none !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Real-time performance monitoring
    function monitorPerformance() {
      let frameCount = 0;
      let lastTime = performance.now();
      
      function checkFPS() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
          const fps = frameCount;
          frameCount = 0;
          lastTime = currentTime;
          
          if (fps < 20) {
            console.log('🚨 Low FPS detected:', fps, 'applying performance fixes...');
            
            // Disable all animations
            const style = document.createElement('style');
            style.innerHTML = `
              @media (max-width: 767px) {
                *, *::before, *::after {
                  animation: none !important;
                  transition: none !important;
                  transform: none !important;
                }
              }
            `;
            document.head.appendChild(style);
          }
        }
        
        requestAnimationFrame(checkFPS);
      }
      
      requestAnimationFrame(checkFPS);
    }
    
    // Orientation change handler
    function handleOrientationChange() {
      window.addEventListener('orientationchange', () => {
        console.log('📱 Orientation change detected');
        
        setTimeout(() => {
          // Re-apply all fixes
          monitorHorizontalScroll();
          monitorAnimations();
          emergencyViewportReset();
          
          // Force layout recalculation
          document.body.style.display = 'none';
          document.body.offsetHeight; // Trigger reflow
          document.body.style.display = '';
        }, 500);
      });
    }
    
    // Touch event optimization
    function optimizeTouchEvents() {
      // Prevent accidental zooming
      document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      }, { passive: false });
      
      // Prevent elastic scrolling issues
      document.addEventListener('touchmove', function(e) {
        if (e.target === document.body || e.target === document.documentElement) {
          e.preventDefault();
        }
      }, { passive: false });
    }
    
    // Initialize all monitors
    function initializeMonitors() {
      console.log('🔍 Initializing mobile monitors...');
      
      monitorHorizontalScroll();
      monitorLayoutShifts();
      monitorAnimations();
      monitorProblematicCSS();
      monitorPerformance();
      handleOrientationChange();
      optimizeTouchEvents();
      
      // Run emergency check after page load
      setTimeout(emergencyViewportReset, 2000);
      
      console.log('✅ Mobile monitors active!');
    }
    
    // Start monitoring when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeMonitors);
    } else {
      initializeMonitors();
    }
    
    // Emergency global error handler
    window.addEventListener('error', function(e) {
      if (e.message && e.message.includes('viewport') || e.message.includes('scroll')) {
        console.log('🚨 Viewport error detected, applying emergency fix...');
        emergencyViewportReset();
      }
    });
    
  }
  
})();

console.log('📊 Mobile monitor script loaded!');
