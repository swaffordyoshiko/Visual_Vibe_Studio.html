// Fix Venmo payment note instruction text
console.log('💳 Loading Venmo payment note fix...');

function fixVenmoPaymentNoteText() {
  console.log('🔧 Fixing Venmo payment note text...');
  
  // Override any functions that might show "Yoshiko Swafford" in payment notes
  // and replace with proper business name handling
  
  // Fix any hardcoded instances in payment instructions
  const originalSetTimeout = window.setTimeout;
  window.setTimeout = function(callback, delay) {
    if (typeof callback === 'function') {
      const originalCallback = callback;
      callback = function() {
        try {
          return originalCallback.apply(this, arguments);
        } catch (error) {
          // If the callback contains payment instruction text, fix it
          const callbackStr = originalCallback.toString();
          if (callbackStr.includes('Include') && callbackStr.includes('Yoshiko Swafford') && callbackStr.includes('payment note')) {
            console.log('🔧 Intercepted and fixing payment note text');
            
            // Create fixed version
            const fixedCallback = function() {
              // Get the business name from form or use default
              const businessName = getBusinessNameForPayment();
              
              // Show corrected success message
              if (window.toastManager) {
                window.toastManager.success(
                  `Order submitted successfully!\n\nBusiness: ${businessName}\nServices: ${getSelectedServices().join(', ')}\nTotal: $${getTotalAmount()}\nDeposit: $${getDepositAmount()}\n\nPlease complete payment via Venmo @Yoshiko-Swafford and include "${businessName}" in the payment note. We will contact you within 24 hours after payment.`,
                  { duration: 8000 }
                );
              }
            };
            
            return fixedCallback.apply(this, arguments);
          }
          
          throw error;
        }
      };
    }
    
    return originalSetTimeout.call(this, callback, delay);
  };
  
  // Fix payment container HTML generation
  interceptPaymentContainerHTML();
  
  // Fix any existing payment note instructions
  fixExistingPaymentInstructions();
  
  console.log('✅ Venmo payment note text fix applied');
}

function interceptPaymentContainerHTML() {
  console.log('🏗️ Intercepting payment container HTML generation...');
  
  // Override document.getElementById to intercept container updates
  const originalGetElementById = document.getElementById;
  document.getElementById = function(id) {
    const element = originalGetElementById.call(this, id);
    
    if (id === 'paypal-button-container' && element) {
      // Monitor innerHTML changes
      const originalInnerHTMLSetter = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML').set;
      
      Object.defineProperty(element, 'innerHTML', {
        set: function(value) {
          if (typeof value === 'string' && value.includes('payment note')) {
            // Fix any instances where "Yoshiko Swafford" appears in payment note instructions
            value = value.replace(
              /Include\s+"Yoshiko\s+Swafford"\s+in\s+the?\s+payment\s+note/gi,
              'Include "Business Name" in the payment note'
            );
            
            // Also fix variations
            value = value.replace(
              /Include\s+"Yoshiko\s+Swafford"\s+in\s+note/gi,
              'Include "Business Name" in note'
            );
            
            // Fix any other variations
            value = value.replace(
              /Include\s+Yoshiko\s+Swafford\s+in\s+the?\s+payment\s+note/gi,
              'Include "Business Name" in the payment note'
            );
            
            console.log('✅ Fixed payment note instruction text in container HTML');
          }
          
          return originalInnerHTMLSetter.call(this, value);
        },
        get: function() {
          return originalInnerHTMLSetter.call(this);
        }
      });
    }
    
    return element;
  };
}

function fixExistingPaymentInstructions() {
  console.log('🔍 Fixing existing payment instructions...');
  
  try {
    // Find and fix any existing payment instructions on the page
    const paymentContainer = document.getElementById('paypal-button-container');
    if (paymentContainer && paymentContainer.innerHTML) {
      let html = paymentContainer.innerHTML;
      
      // Replace any instances of "Yoshiko Swafford" in payment note instructions
      const originalHTML = html;
      
      html = html.replace(
        /Include\s+"Yoshiko\s+Swafford"\s+in\s+the?\s+payment\s+note/gi,
        'Include "Business Name" in the payment note'
      );
      
      html = html.replace(
        /Include\s+"Yoshiko\s+Swafford"\s+in\s+note/gi,
        'Include "Business Name" in note'
      );
      
      html = html.replace(
        /Include\s+Yoshiko\s+Swafford\s+in\s+the?\s+payment\s+note/gi,
        'Include "Business Name" in the payment note'
      );
      
      if (html !== originalHTML) {
        paymentContainer.innerHTML = html;
        console.log('✅ Updated existing payment instructions');
      }
    }
    
    // Also check for any other elements that might contain this text
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
      if (element.textContent && element.textContent.includes('Include') && 
          element.textContent.includes('Yoshiko Swafford') && 
          element.textContent.includes('payment note')) {
        
        let text = element.textContent;
        text = text.replace(
          /Include\s+"Yoshiko\s+Swafford"\s+in\s+the?\s+payment\s+note/gi,
          'Include "Business Name" in the payment note'
        );
        
        text = text.replace(
          /Include\s+Yoshiko\s+Swafford\s+in\s+the?\s+payment\s+note/gi,
          'Include "Business Name" in the payment note'
        );
        
        if (text !== element.textContent) {
          element.textContent = text;
          console.log('✅ Fixed payment note text in element:', element.tagName);
        }
      }
    });
    
  } catch (error) {
    console.error('❌ Error fixing existing payment instructions:', error);
  }
}

function getBusinessNameForPayment() {
  try {
    // Try to get business name from form
    const form = document.querySelector('form');
    if (form) {
      const formData = new FormData(form);
      const businessName = formData.get('businessName');
      if (businessName && businessName.trim() && businessName.trim() !== 'Yoshiko Swafford') {
        return businessName.trim();
      }
    }
    
    // Try to get from input field
    const businessNameInput = document.getElementById('businessName') || 
                             document.querySelector('input[name="businessName"]');
    if (businessNameInput && businessNameInput.value && 
        businessNameInput.value.trim() !== 'Yoshiko Swafford') {
      return businessNameInput.value.trim();
    }
    
    // Default to "Business Name" instead of actual name
    return 'Business Name';
    
  } catch (error) {
    console.error('❌ Error getting business name:', error);
    return 'Business Name';
  }
}

function getSelectedServices() {
  try {
    const checkboxes = document.querySelectorAll('input[name="services"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
  } catch (error) {
    return ['Services'];
  }
}

function getTotalAmount() {
  try {
    return window.totalOrderAmount || '100.00';
  } catch (error) {
    return '100.00';
  }
}

function getDepositAmount() {
  try {
    return window.depositAmount || '50.00';
  } catch (error) {
    return '50.00';
  }
}

// Also create a direct replacement function
window.fixVenmoPaymentNote = function() {
  console.log('🔧 Manual Venmo payment note fix...');
  
  fixExistingPaymentInstructions();
  
  // Also fix any alert or toast messages that might be showing
  const originalAlert = window.alert;
  window.alert = function(message) {
    if (typeof message === 'string') {
      message = message.replace(
        /Include\s+"Yoshiko\s+Swafford"\s+in\s+the?\s+payment\s+note/gi,
        'Include "Business Name" in the payment note'
      );
      
      message = message.replace(
        /Include\s+Yoshiko\s+Swafford\s+in\s+the?\s+payment\s+note/gi,
        'Include "Business Name" in the payment note'
      );
    }
    
    return originalAlert.call(this, message);
  };
  
  console.log('✅ Manual fix applied');
};

// Initialize the fix
function initializeVenmoPaymentNoteFix() {
  console.log('🚀 Initializing Venmo payment note fix...');
  
  fixVenmoPaymentNoteText();
  
  // Set up periodic checking for any new content
  setInterval(() => {
    fixExistingPaymentInstructions();
  }, 5000);
  
  console.log('✅ Venmo payment note fix initialized');
}

// Test function
window.testVenmoPaymentNoteFix = function() {
  console.log('🧪 Testing Venmo payment note fix...');
  
  // Create test element with problematic text
  const testElement = document.createElement('div');
  testElement.innerHTML = 'Include "Yoshiko Swafford" in the payment note';
  document.body.appendChild(testElement);
  
  console.log('Before fix:', testElement.textContent);
  
  // Apply fix
  fixExistingPaymentInstructions();
  
  console.log('After fix:', testElement.textContent);
  
  // Clean up
  testElement.remove();
};

// Initialize when DOM is ready
function initialize() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeVenmoPaymentNoteFix);
  } else {
    initializeVenmoPaymentNoteFix();
  }
}

// Initialize with delay to ensure other scripts load first
setTimeout(initialize, 4000);

console.log('💳 Venmo payment note fix loaded');
