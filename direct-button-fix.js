// Direct button fix for handleEmailClick error
// This script fixes the specific button causing the error

console.log('🎯 Direct button fix loading...');

// Immediate function definition
window.handleEmailClick = window.handleEmailClick || function(event, emailAddress) {
  if (event && event.preventDefault) event.preventDefault();
  const email = emailAddress || 'support@visualvibestudio.store';
  window.location.href = 'mailto:' + email;
};

// Function to fix the specific problematic button
function fixMainEmailButton() {
  console.log('🔧 Attempting to fix main email button...');
  
  try {
    // Method 1: Find by ID
    let button = document.getElementById('mainSendEmailBtn');
    
    if (!button) {
      // Method 2: Find by onclick content
      const allButtons = document.querySelectorAll('button[onclick*="handleEmailClick"]');
      if (allButtons.length > 0) {
        button = allButtons[0];
        console.log('📍 Found button by onclick attribute');
      }
    }
    
    if (!button) {
      // Method 3: Find by text content
      const allButtons = document.querySelectorAll('button');
      for (let btn of allButtons) {
        if (btn.textContent.includes('Send Email') || btn.textContent.includes('Email')) {
          button = btn;
          console.log('📍 Found button by text content');
          break;
        }
      }
    }
    
    if (button) {
      console.log('✅ Found the problematic button, fixing...');
      
      // Remove the problematic onclick attribute
      button.removeAttribute('onclick');
      
      // Add a safe event listener
      button.addEventListener('click', function(event) {
        console.log('📧 Safe email button clicked');
        event.preventDefault();
        
        // Simple mailto action
        window.location.href = 'mailto:support@visualvibestudio.store';
      });
      
      console.log('✅ Button fixed successfully');
      return true;
      
    } else {
      console.warn('⚠️ Could not find the problematic button');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Error fixing button:', error);
    return false;
  }
}

// Function to scan and fix all email buttons
function fixAllEmailButtons() {
  console.log('🔍 Scanning for all email buttons...');
  
  try {
    // Find all elements with handleEmailClick in onclick
    const allElements = document.querySelectorAll('*[onclick*="handleEmailClick"]');
    
    console.log(`📍 Found ${allElements.length} elements with handleEmailClick`);
    
    allElements.forEach(function(element, index) {
      try {
        console.log(`🔧 Fixing element ${index + 1}:`, element.tagName);
        
        // Extract email from onclick if possible
        const onclickAttr = element.getAttribute('onclick');
        const emailMatch = onclickAttr.match(/['"]([^'"]*@[^'"]*)['"]/) || ['', 'support@visualvibestudio.store'];
        const email = emailMatch[1];
        
        // Remove onclick attribute
        element.removeAttribute('onclick');
        
        // Add safe click handler
        element.addEventListener('click', function(event) {
          console.log('📧 Safe click handler executed for:', email);
          event.preventDefault();
          window.location.href = 'mailto:' + email;
        });
        
        console.log(`✅ Fixed element ${index + 1} for email:`, email);
        
      } catch (error) {
        console.error(`❌ Error fixing element ${index + 1}:`, error);
      }
    });
    
    return allElements.length;
    
  } catch (error) {
    console.error('❌ Error scanning for email buttons:', error);
    return 0;
  }
}

// Aggressive fix attempts
function attemptFix() {
  console.log('🚀 Starting aggressive fix attempts...');
  
  let attempts = 0;
  const maxAttempts = 10;
  
  const fixAttempt = setInterval(function() {
    attempts++;
    console.log(`🔄 Fix attempt ${attempts}/${maxAttempts}`);
    
    // Try to fix the main button
    const mainFixed = fixMainEmailButton();
    
    // Try to fix all email buttons
    const allFixed = fixAllEmailButtons();
    
    if (mainFixed || allFixed > 0) {
      console.log('✅ Fix successful, stopping attempts');
      clearInterval(fixAttempt);
    }
    
    if (attempts >= maxAttempts) {
      console.warn('⚠️ Max fix attempts reached');
      clearInterval(fixAttempt);
    }
  }, 200);
}

// Start fixing immediately
attemptFix();

// Also try when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', attemptFix);
}

// Override error handling to catch and fix this specific error
const originalError = window.onerror;
window.onerror = function(message, source, lineno, colno, error) {
  if (message && message.includes('handleEmailClick is not defined')) {
    console.error('🚨 Caught handleEmailClick error - attempting immediate fix');
    
    // Create function if missing
    if (typeof window.handleEmailClick !== 'function') {
      window.handleEmailClick = function(event, emailAddress) {
        if (event && event.preventDefault) event.preventDefault();
        const email = emailAddress || 'support@visualvibestudio.store';
        window.location.href = 'mailto:' + email;
      };
    }
    
    // Try to fix buttons
    setTimeout(attemptFix, 10);
    
    // Prevent error from showing
    return true;
  }
  
  if (originalError) {
    return originalError.apply(this, arguments);
  }
  
  return false;
};

// Manual fix function
window.manualEmailFix = function() {
  console.log('🔧 Manual email fix triggered');
  
  // Ensure function exists
  window.handleEmailClick = function(event, emailAddress) {
    if (event && event.preventDefault) event.preventDefault();
    const email = emailAddress || 'support@visualvibestudio.store';
    window.location.href = 'mailto:' + email;
  };
  
  // Fix buttons
  const mainFixed = fixMainEmailButton();
  const allFixed = fixAllEmailButtons();
  
  console.log('✅ Manual fix complete:', { mainFixed, allFixed });
};

console.log('🎯 Direct button fix loaded and active');
