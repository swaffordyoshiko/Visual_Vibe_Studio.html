// Ultra-immediate handleEmailClick fix - executes before anything else
(function() {
  'use strict';
  
  // Log that we're starting
  console.log('🚨 ULTRA-IMMEDIATE handleEmailClick fix starting...');
  
  // Define the function immediately - no delays, no checks
  window.handleEmailClick = function(event, emailAddress) {
    console.log('📧 handleEmailClick executed with email:', emailAddress);
    
    // Prevent default immediately
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }
    
    // Get email or use default
    const email = emailAddress || 'support@visualvibestudio.store';
    
    // Simple, direct action - just open mailto
    try {
      window.location.href = 'mailto:' + email;
      console.log('✅ Mailto opened for:', email);
    } catch (error) {
      console.error('❌ Mailto failed, trying alert:', error);
      alert('Please email us at: ' + email);
    }
  };
  
  // Also assign it globally without window prefix
  try {
    handleEmailClick = window.handleEmailClick;
  } catch (e) {
    // In strict mode this might fail, ignore
  }
  
  // Log success immediately
  console.log('✅ handleEmailClick function created instantly');
  console.log('  Type:', typeof window.handleEmailClick);
  
  // Aggressive backup - set interval to keep checking and fixing
  let backupInterval = setInterval(function() {
    if (typeof window.handleEmailClick !== 'function') {
      console.warn('🔧 handleEmailClick missing - recreating...');
      window.handleEmailClick = function(event, emailAddress) {
        if (event && event.preventDefault) event.preventDefault();
        const email = emailAddress || 'support@visualvibestudio.store';
        window.location.href = 'mailto:' + email;
      };
    }
  }, 100);
  
  // Stop the backup after 10 seconds
  setTimeout(function() {
    clearInterval(backupInterval);
    console.log('🛑 Backup interval stopped - handleEmailClick should be stable');
  }, 10000);
  
})();

// Additional protection - override window.onerror to catch and fix the specific error
(function() {
  const originalOnError = window.onerror;
  
  window.onerror = function(message, source, lineno, colno, error) {
    // Check if this is our specific error
    if (message && message.includes('handleEmailClick is not defined')) {
      console.error('🚨 Caught handleEmailClick error at line', lineno, '- fixing immediately');
      
      // Create function immediately
      window.handleEmailClick = function(event, emailAddress) {
        console.log('🚨 Emergency handleEmailClick from error handler');
        if (event && event.preventDefault) event.preventDefault();
        const email = emailAddress || 'support@visualvibestudio.store';
        window.location.href = 'mailto:' + email;
      };
      
      console.log('✅ Emergency fix applied from error handler');
      
      // Prevent the error from showing in console
      return true;
    }
    
    // Call original error handler if it exists
    if (originalOnError) {
      return originalOnError.apply(this, arguments);
    }
    
    return false;
  };
})();

// Patch document.getElementById to fix buttons when they're accessed
(function() {
  const originalGetElementById = document.getElementById;
  
  document.getElementById = function(id) {
    const element = originalGetElementById.call(this, id);
    
    // If this is the problematic button, fix its onclick
    if (element && id === 'mainSendEmailBtn') {
      console.log('🎯 Found mainSendEmailBtn - ensuring onclick works');
      
      // Remove problematic onclick and add safe one
      element.removeAttribute('onclick');
      element.onclick = function(event) {
        console.log('📧 Safe onclick for mainSendEmailBtn');
        if (event) event.preventDefault();
        window.location.href = 'mailto:support@visualvibestudio.store';
      };
      
      console.log('✅ Fixed mainSendEmailBtn onclick');
    }
    
    return element;
  };
})();

// Global emergency function that can be called directly
window.emailSupport = function() {
  console.log('📧 emailSupport called as backup');
  window.location.href = 'mailto:support@visualvibestudio.store';
};

// Super aggressive: find and fix all email buttons right now
setTimeout(function() {
  console.log('🔍 Looking for email buttons to fix...');
  
  // Find all elements with handleEmailClick in onclick
  const allElements = document.querySelectorAll('*');
  let fixedCount = 0;
  
  allElements.forEach(function(element) {
    const onclickAttr = element.getAttribute('onclick');
    if (onclickAttr && onclickAttr.includes('handleEmailClick')) {
      console.log('🔧 Fixing element with onclick:', onclickAttr);
      
      // Extract email from onclick if possible
      const emailMatch = onclickAttr.match(/['\"]([^'\"]*@[^'\"]*)['\""]/);
      const email = emailMatch ? emailMatch[1] : 'support@visualvibestudio.store';
      
      // Replace with safe onclick
      element.onclick = function(event) {
        console.log('📧 Fixed onclick for element, email:', email);
        if (event) event.preventDefault();
        window.location.href = 'mailto:' + email;
      };
      
      fixedCount++;
    }
  });
  
  console.log('✅ Fixed', fixedCount, 'email elements');
}, 100);

// Test function
window.testUltraEmailFix = function() {
  console.log('🧪 Testing ultra email fix...');
  console.log('  handleEmailClick type:', typeof window.handleEmailClick);
  console.log('  emailSupport type:', typeof window.emailSupport);
  
  if (typeof window.handleEmailClick === 'function') {
    try {
      window.handleEmailClick({preventDefault: function(){}}, 'test@example.com');
      console.log('✅ Test successful');
      return true;
    } catch (error) {
      console.error('❌ Test failed:', error);
      return false;
    }
  } else {
    console.error('❌ handleEmailClick not available');
    return false;
  }
};

console.log('🚨 Ultra-immediate handleEmailClick fix ACTIVE');
