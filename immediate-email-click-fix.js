// Immediate handleEmailClick fix - applies instantly
console.log('🚨 Immediate handleEmailClick fix loading...');

// Apply fix immediately in IIFE
(function() {
  'use strict';
  
  console.log('���� Applying immediate handleEmailClick fix...');
  
  // Create the handleEmailClick function immediately
  window.handleEmailClick = function(event, emailAddress) {
    console.log('📧 handleEmailClick called with:', emailAddress);
    
    try {
      // Prevent default link behavior
      if (event && event.preventDefault) {
        event.preventDefault();
      }
      
      // Simple and reliable email handling
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Mobile: direct mailto
        console.log('📱 Mobile - opening mailto directly');
        window.open(`mailto:${emailAddress}`, '_self');
      } else {
        // Desktop: show simple options
        console.log('💻 Desktop - showing options');
        showSimpleEmailOptions(emailAddress);
      }
      
    } catch (error) {
      console.error('❌ Error in handleEmailClick:', error);
      // Ultimate fallback
      try {
        window.location.href = `mailto:${emailAddress}`;
      } catch (e) {
        alert(`Please email us at: ${emailAddress}`);
      }
    }
  };
  
  function showSimpleEmailOptions(emailAddress) {
    // Simple confirm dialog for now, can be enhanced later
    const userChoice = confirm(`Contact us at ${emailAddress}?\n\nOK = Open email app\nCancel = Copy email address`);
    
    if (userChoice) {
      // Open email app
      window.location.href = `mailto:${emailAddress}`;
    } else {
      // Copy email address
      copyEmailToClipboard(emailAddress);
    }
  }
  
  function copyEmailToClipboard(emailAddress) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(emailAddress).then(() => {
          alert(`Email address copied: ${emailAddress}`);
        }).catch(() => {
          fallbackCopy(emailAddress);
        });
      } else {
        fallbackCopy(emailAddress);
      }
    } catch (error) {
      fallbackCopy(emailAddress);
    }
  }
  
  function fallbackCopy(emailAddress) {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = emailAddress;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        alert(`Email address copied: ${emailAddress}`);
      } else {
        alert(`Please copy manually: ${emailAddress}`);
      }
    } catch (error) {
      alert(`Please copy manually: ${emailAddress}`);
    }
  }
  
  // Also make it available without window prefix for maximum compatibility
  if (typeof handleEmailClick === 'undefined') {
    window.handleEmailClick = window.handleEmailClick;
  }
  
  console.log('✅ handleEmailClick function created and available globally');
  console.log('  - window.handleEmailClick:', typeof window.handleEmailClick);
  console.log('  - global handleEmailClick:', typeof handleEmailClick);
  
})();

// Additional safety: Override any attempts to call undefined handleEmailClick
(function() {
  // Monitor for calls to undefined handleEmailClick
  const originalError = window.onerror;
  
  window.onerror = function(message, source, lineno, colno, error) {
    if (message && message.includes('handleEmailClick is not defined')) {
      console.error('🚨 Caught handleEmailClick error - applying emergency fix');
      
      // Emergency fix: create minimal function
      if (typeof window.handleEmailClick !== 'function') {
        window.handleEmailClick = function(event, emailAddress) {
          console.log('🚨 Emergency handleEmailClick executed');
          if (event && event.preventDefault) event.preventDefault();
          window.location.href = `mailto:${emailAddress || 'support@visualvibestudio.store'}`;
        };
      }
      
      // Try to prevent the error from showing
      return true;
    }
    
    // Call original error handler
    if (originalError) {
      return originalError.apply(this, arguments);
    }
    
    return false;
  };
})();

// Immediate verification and backup
setTimeout(() => {
  if (typeof window.handleEmailClick !== 'function') {
    console.error('🚨 handleEmailClick still not available after 100ms - creating emergency backup');
    
    window.handleEmailClick = function(event, emailAddress) {
      console.log('🚨 Emergency backup handleEmailClick');
      try {
        if (event && event.preventDefault) event.preventDefault();
        const email = emailAddress || 'support@visualvibestudio.store';
        window.location.href = `mailto:${email}`;
      } catch (error) {
        alert(`Please email us at: ${emailAddress || 'support@visualvibestudio.store'}`);
      }
    };
  }
  
  console.log('✅ Final verification - handleEmailClick available:', typeof window.handleEmailClick === 'function');
}, 100);

// Test function
window.testEmailClickFix = function() {
  console.log('🧪 Testing handleEmailClick fix...');
  
  if (typeof window.handleEmailClick === 'function') {
    console.log('✅ handleEmailClick function exists');
    
    // Test with mock event
    try {
      const mockEvent = { preventDefault: () => console.log('preventDefault called') };
      window.handleEmailClick(mockEvent, 'test@example.com');
      console.log('✅ Function call successful');
      return true;
    } catch (error) {
      console.error('❌ Function call failed:', error);
      return false;
    }
  } else {
    console.error('❌ handleEmailClick function not found');
    return false;
  }
};

// Emergency activation function
window.activateEmailClickFix = function() {
  console.log('🚨 Activating emergency email click fix...');
  
  window.handleEmailClick = function(event, emailAddress) {
    console.log('🚨 Emergency handleEmailClick activated');
    if (event && event.preventDefault) event.preventDefault();
    const email = emailAddress || 'support@visualvibestudio.store';
    
    try {
      window.location.href = `mailto:${email}`;
    } catch (error) {
      alert(`Please contact us at: ${email}`);
    }
  };
  
  console.log('✅ Emergency fix activated');
};

console.log('🚨 Immediate handleEmailClick fix applied and active');
