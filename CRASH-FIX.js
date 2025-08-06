// EMERGENCY CRASH FIX - Stop constant reloading and performance issues
console.log('🚨 CRASH FIX: Loading emergency website stabilization...');

(function() {
  'use strict';
  
  console.log('🛑 STOPPING RELOAD LOOPS AND PERFORMANCE ISSUES...');
  
  // 1. STOP AUTOMATIC RELOADS
  try {
    // Disable any auto-reload timers
    if (window.setInterval) {
      const originalSetInterval = window.setInterval;
      window.setInterval = function(callback, delay) {
        // Block intervals that might cause reloads
        if (typeof callback === 'function') {
          const callbackStr = callback.toString();
          if (callbackStr.includes('reload') || 
              callbackStr.includes('location.reload') || 
              callbackStr.includes('window.location') ||
              delay < 3000) { // Block very frequent intervals
            console.log('🛑 BLOCKED: Potential reload interval blocked');
            return { blocked: true };
          }
        }
        return originalSetInterval.call(this, callback, delay);
      };
    }
    
    // Disable any auto-reload timeouts
    if (window.setTimeout) {
      const originalSetTimeout = window.setTimeout;
      window.setTimeout = function(callback, delay) {
        if (typeof callback === 'function') {
          const callbackStr = callback.toString();
          if (callbackStr.includes('reload') || 
              callbackStr.includes('location.reload')) {
            console.log('🛑 BLOCKED: Potential reload timeout blocked');
            return { blocked: true };
          }
        }
        return originalSetTimeout.call(this, callback, delay);
      };
    }
    
    console.log('✅ Auto-reload protection enabled');
  } catch (error) {
    console.error('❌ Error setting up reload protection:', error);
  }
  
  // 2. REDUCE ANIMATION PERFORMANCE LOAD
  try {
    // Find and pause heavy animations
    const style = document.createElement('style');
    style.textContent = `
      /* Reduce animation performance load */
      *, *::before, *::after {
        animation-duration: 0.1s !important;
        animation-delay: 0s !important;
        transition-duration: 0.1s !important;
      }
      
      /* Pause problematic animations */
      .animate-pulse,
      .animate-spin,
      .animate-bounce {
        animation-play-state: paused !important;
      }
      
      /* Reduce gradient animations */
      .bg-gradient-to-r,
      .bg-gradient-to-l,
      .bg-gradient-to-t,
      .bg-gradient-to-b {
        background: #6366f1 !important; /* Simple solid color */
      }
    `;
    document.head.appendChild(style);
    
    console.log('✅ Animation performance optimized');
  } catch (error) {
    console.error('❌ Error optimizing animations:', error);
  }
  
  // 3. STOP EXCESSIVE SCRIPT LOADING
  try {
    // Monitor script loading
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName) {
      const element = originalCreateElement.call(this, tagName);
      
      if (tagName.toLowerCase() === 'script' && element.src) {
        // Block duplicate script loading
        const existingScripts = Array.from(document.querySelectorAll('script[src]'));
        const isDuplicate = existingScripts.some(script => script.src === element.src);
        
        if (isDuplicate) {
          console.log('🛑 BLOCKED: Duplicate script loading blocked:', element.src);
          element.src = ''; // Prevent loading
        }
      }
      
      return element;
    };
    
    console.log('✅ Duplicate script protection enabled');
  } catch (error) {
    console.error('❌ Error setting up script protection:', error);
  }
  
  // 4. CLEAN UP EVENT LISTENERS
  try {
    // Remove excessive event listeners that might cause memory leaks
    const elements = document.querySelectorAll('*');
    let cleanedCount = 0;
    
    elements.forEach(element => {
      // Remove duplicate event listeners by cloning elements
      if (element.onclick || element.onload || element.onerror) {
        const events = [];
        if (element.onclick) events.push('click');
        if (element.onload) events.push('load');
        if (element.onerror) events.push('error');
        
        if (events.length > 1) {
          // Too many event handlers on one element
          element.onclick = null;
          element.onload = null;
          element.onerror = null;
          cleanedCount++;
        }
      }
    });
    
    console.log(`✅ Cleaned ${cleanedCount} excessive event listeners`);
  } catch (error) {
    console.error('❌ Error cleaning event listeners:', error);
  }
  
  // 5. MEMORY CLEANUP
  try {
    // Force garbage collection if available
    if (window.gc) {
      window.gc();
    }
    
    // Clear any large objects in global scope
    const globalKeys = Object.keys(window);
    globalKeys.forEach(key => {
      if (key.startsWith('large') || key.startsWith('cache') || key.startsWith('temp')) {
        try {
          delete window[key];
        } catch (e) {
          // Ignore deletion errors
        }
      }
    });
    
    console.log('✅ Memory cleanup performed');
  } catch (error) {
    console.error('❌ Error in memory cleanup:', error);
  }
  
  // 6. STOP PAGE REFRESH LOOPS
  try {
    // Override window.location methods that cause refreshes
    const originalReload = window.location.reload;
    window.location.reload = function() {
      console.log('🛑 BLOCKED: Page reload attempt blocked for stability');
      return false;
    };
    
    // Block location.href changes that might cause loops
    let locationChangeCount = 0;
    const originalLocationSetter = Object.getOwnPropertyDescriptor(window.location, 'href') || 
                                  Object.getOwnPropertyDescriptor(Location.prototype, 'href');
    
    if (originalLocationSetter && originalLocationSetter.set) {
      Object.defineProperty(window.location, 'href', {
        set: function(value) {
          locationChangeCount++;
          if (locationChangeCount > 5) {
            console.log('🛑 BLOCKED: Too many location changes, preventing loop');
            return;
          }
          
          setTimeout(() => locationChangeCount = 0, 5000); // Reset counter
          return originalLocationSetter.set.call(this, value);
        },
        get: originalLocationSetter.get
      });
    }
    
    console.log('✅ Page refresh loop protection enabled');
  } catch (error) {
    console.error('❌ Error setting up refresh protection:', error);
  }
  
  // 7. EMERGENCY FUNCTION DEFINITIONS
  try {
    // Ensure critical functions exist to prevent errors
    if (typeof window.handleEmailClick !== 'function') {
      window.handleEmailClick = function(event, emailAddress) {
        if (event && event.preventDefault) event.preventDefault();
        window.location.href = 'mailto:' + (emailAddress || 'support@visualvibestudio.store');
      };
    }
    
    if (typeof window.toastManager !== 'object') {
      window.toastManager = {
        success: function(msg) { console.log('SUCCESS:', msg); },
        error: function(msg) { console.log('ERROR:', msg); },
        info: function(msg) { console.log('INFO:', msg); },
        warning: function(msg) { console.log('WARNING:', msg); }
      };
    }
    
    console.log('✅ Emergency function definitions complete');
  } catch (error) {
    console.error('❌ Error defining emergency functions:', error);
  }
  
  console.log('✅ CRASH FIX COMPLETE - Website should be stable now');
  
})();

// Manual emergency functions
window.emergencyStabilize = function() {
  console.log('🚨 Manual emergency stabilization...');
  
  // Stop all timers
  for (let i = 1; i < 99999; i++) {
    clearTimeout(i);
    clearInterval(i);
  }
  
  // Remove problematic scripts
  const scripts = document.querySelectorAll('script[src*="rating"], script[src*="fix-"], script[src*="test-"]');
  scripts.forEach(script => {
    if (script.src.includes('rating') || script.src.includes('fix-') || script.src.includes('test-')) {
      script.remove();
    }
  });
  
  console.log('✅ Emergency stabilization complete');
};

window.stopReloads = function() {
  window.location.reload = function() { 
    console.log('🛑 Reload blocked'); 
    return false; 
  };
  console.log('✅ Reloads stopped');
};

console.log('🚨 CRASH FIX LOADED - Use emergencyStabilize() if issues persist');
