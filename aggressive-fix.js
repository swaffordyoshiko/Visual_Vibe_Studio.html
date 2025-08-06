// Aggressive immediate fix - execute before anything else
(function() {
  'use strict';
  
  // Define handleEmailClick immediately - no conditions, no checks
  window.handleEmailClick = function(event, emailAddress) {
    if (event && event.preventDefault) event.preventDefault();
    window.location.href = 'mailto:' + (emailAddress || 'support@visualvibestudio.store');
  };
  
  // Also define it without window prefix for global scope
  try {
    handleEmailClick = window.handleEmailClick;
  } catch (e) {
    // Ignore if in strict mode
  }
  
  console.log('AGGRESSIVE FIX: handleEmailClick defined immediately');
  
})();

// Override document.createElement to catch script loading and define function
(function() {
  const originalCreateElement = document.createElement;
  
  document.createElement = function(tagName) {
    const element = originalCreateElement.call(this, tagName);
    
    if (tagName.toLowerCase() === 'script') {
      // Ensure handleEmailClick is defined before any script loads
      if (typeof window.handleEmailClick !== 'function') {
        window.handleEmailClick = function(event, emailAddress) {
          if (event && event.preventDefault) event.preventDefault();
          window.location.href = 'mailto:' + (emailAddress || 'support@visualvibestudio.store');
        };
      }
    }
    
    return element;
  };
})();

// Override addEventListener to catch when the problematic element is added
(function() {
  const originalAddEventListener = Element.prototype.addEventListener;
  
  Element.prototype.addEventListener = function(type, listener, options) {
    // Ensure handleEmailClick exists before any event listener is added
    if (typeof window.handleEmailClick !== 'function') {
      window.handleEmailClick = function(event, emailAddress) {
        if (event && event.preventDefault) event.preventDefault();
        window.location.href = 'mailto:' + (emailAddress || 'support@visualvibestudio.store');
      };
    }
    
    return originalAddEventListener.call(this, type, listener, options);
  };
})();

// Emergency: Define on window object with multiple methods
Object.defineProperty(window, 'handleEmailClick', {
  value: function(event, emailAddress) {
    if (event && event.preventDefault) event.preventDefault();
    window.location.href = 'mailto:' + (emailAddress || 'support@visualvibestudio.store');
  },
  writable: true,
  enumerable: true,
  configurable: true
});

console.log('EMERGENCY: handleEmailClick defined with Object.defineProperty');
