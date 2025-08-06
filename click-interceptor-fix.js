// Click interceptor fix for handleEmailClick error
// This intercepts clicks before they reach the problematic onclick handler

console.log('🛡️ Click interceptor fix loading...');

// Define the function immediately
window.handleEmailClick = window.handleEmailClick || function(event, emailAddress) {
  console.log('📧 handleEmailClick called via interceptor');
  if (event && event.preventDefault) event.preventDefault();
  const email = emailAddress || 'support@visualvibestudio.store';
  window.location.href = 'mailto:' + email;
};

// Intercept clicks on the document to catch email button clicks
document.addEventListener('click', function(event) {
  const target = event.target;
  
  // Check if this is the problematic email button
  if (target && (
    target.id === 'mainSendEmailBtn' ||
    (target.onclick && target.onclick.toString().includes('handleEmailClick')) ||
    (target.getAttribute && target.getAttribute('onclick') && target.getAttribute('onclick').includes('handleEmailClick'))
  )) {
    
    console.log('🎯 Intercepted click on email button');
    
    // Prevent the original onclick from executing
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    
    // Execute safe email action
    console.log('📧 Opening email via interceptor');
    window.location.href = 'mailto:support@visualvibestudio.store';
    
    return false;
  }
}, true); // Use capture phase to intercept before onclick

// Also intercept clicks on parent elements in case the click bubbles
document.addEventListener('click', function(event) {
  const target = event.target;
  
  // Check if we clicked inside an email button
  const emailButton = target.closest ? target.closest('[onclick*="handleEmailClick"]') : null;
  
  if (emailButton) {
    console.log('🎯 Intercepted bubbled click on email button');
    
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    
    console.log('📧 Opening email via bubble interceptor');
    window.location.href = 'mailto:support@visualvibestudio.store';
    
    return false;
  }
}, true);

// Backup: try to fix the button when found
function findAndFixEmailButton() {
  console.log('🔍 Looking for email button to fix...');
  
  const selectors = [
    '#mainSendEmailBtn',
    'button[onclick*="handleEmailClick"]',
    'a[onclick*="handleEmailClick"]'
  ];
  
  for (const selector of selectors) {
    try {
      const elements = document.querySelectorAll(selector);
      
      elements.forEach((element, index) => {
        console.log(`🔧 Fixing element ${index + 1} found by: ${selector}`);
        
        // Store original onclick for reference
        const originalOnclick = element.getAttribute('onclick');
        
        // Remove problematic onclick
        element.removeAttribute('onclick');
        element.onclick = null;
        
        // Add safe click handler
        element.addEventListener('click', function(event) {
          console.log('📧 Safe click handler executed');
          event.preventDefault();
          window.location.href = 'mailto:support@visualvibestudio.store';
        });
        
        console.log('✅ Element fixed, original onclick was:', originalOnclick);
      });
      
    } catch (error) {
      console.error(`❌ Error with selector ${selector}:`, error);
    }
  }
}

// Try to fix immediately
findAndFixEmailButton();

// Try again when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', findAndFixEmailButton);
} else {
  setTimeout(findAndFixEmailButton, 100);
}

// Keep trying periodically for the first few seconds
let attempts = 0;
const maxAttempts = 20;
const fixInterval = setInterval(() => {
  attempts++;
  findAndFixEmailButton();
  
  if (attempts >= maxAttempts) {
    clearInterval(fixInterval);
    console.log('🛑 Stopped periodic fix attempts');
  }
}, 250);

// Test function
window.testClickInterceptor = function() {
  console.log('🧪 Testing click interceptor...');
  
  const button = document.getElementById('mainSendEmailBtn') || 
                 document.querySelector('button[onclick*="handleEmailClick"]');
  
  if (button) {
    console.log('✅ Found email button, simulating click...');
    button.click();
  } else {
    console.warn('⚠️ Email button not found for testing');
  }
};

console.log('🛡️ Click interceptor fix active');
