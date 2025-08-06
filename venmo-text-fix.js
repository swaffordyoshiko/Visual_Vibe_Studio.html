// Dynamic fix for Venmo payment note text in index.html
console.log('💳 Loading Venmo text fix for index.html...');

function fixVenmoTextInHTML() {
  console.log('🔧 Applying Venmo text fix...');
  
  // Override the success message function to use correct text
  const originalSetTimeout = window.setTimeout;
  window.setTimeout = function(callback, delay) {
    if (typeof callback === 'function') {
      const callbackStr = callback.toString();
      
      // Check if this is the order success message
      if (callbackStr.includes('Order submitted successfully') && 
          callbackStr.includes('include your business name in the payment note')) {
        
        console.log('🎯 Found target callback - creating fixed version');
        
        // Create a new callback with fixed text
        const fixedCallback = function() {
          const businessName = getBusinessName();
          const selectedServices = getSelectedServices();
          const totalAmount = getTotalAmount();
          const depositAmount = getDepositAmount();
          
          const successMessage = `Order submitted successfully!\n\nBusiness: ${businessName}\nServices: ${selectedServices.join(', ')}\nTotal: $${totalAmount}\nDeposit: $${depositAmount}\n\nPlease complete payment via Venmo @Yoshiko-Swafford and include "Business Name" in the payment note. We will contact you within 24 hours after payment.`;
          
          if (window.toastManager) {
            window.toastManager.success(successMessage, { duration: 8000 });
          } else {
            alert(successMessage);
          }
        };
        
        return originalSetTimeout.call(this, fixedCallback, delay);
      }
    }
    
    return originalSetTimeout.call(this, callback, delay);
  };
  
  // Also fix the payment container HTML generation
  const originalGetElementById = document.getElementById;
  document.getElementById = function(id) {
    const element = originalGetElementById.call(this, id);
    
    if (id === 'paypal-button-container' && element) {
      // Override innerHTML setter to fix text
      const descriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
      const originalSetter = descriptor.set;
      
      Object.defineProperty(element, 'innerHTML', {
        set: function(value) {
          if (typeof value === 'string' && value.includes('payment note')) {
            // Replace any instances of "your business name" with "Business Name"
            value = value.replace(
              /include your business name in the payment note/gi,
              'include "Business Name" in the payment note'
            );
            
            console.log('✅ Fixed payment container text');
          }
          
          return originalSetter.call(this, value);
        },
        get: descriptor.get
      });
    }
    
    return element;
  };
  
  console.log('✅ Venmo text fix applied');
}

function getBusinessName() {
  try {
    // Try to get from form
    const form = document.querySelector('form');
    if (form) {
      const formData = new FormData(form);
      const businessName = formData.get('businessName');
      if (businessName && businessName.trim()) {
        return businessName.trim();
      }
    }
    
    // Try to get from input
    const input = document.getElementById('businessName') || 
                 document.querySelector('input[name="businessName"]');
    if (input && input.value && input.value.trim()) {
      return input.value.trim();
    }
    
    return 'Customer';
  } catch (error) {
    return 'Customer';
  }
}

function getSelectedServices() {
  try {
    const checkboxes = document.querySelectorAll('input[name="services"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
  } catch (error) {
    return ['Custom Service'];
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

// Initialize the fix
function initializeVenmoTextFix() {
  console.log('🚀 Initializing Venmo text fix...');
  
  fixVenmoTextInHTML();
  
  // Also check for any existing text that needs fixing
  setTimeout(() => {
    const container = document.getElementById('paypal-button-container');
    if (container && container.innerHTML && container.innerHTML.includes('your business name in the payment note')) {
      let html = container.innerHTML;
      html = html.replace(
        /include your business name in the payment note/gi,
        'include "Business Name" in the payment note'
      );
      container.innerHTML = html;
      console.log('✅ Fixed existing container text');
    }
  }, 2000);
  
  console.log('✅ Venmo text fix initialized');
}

// Manual fix function
window.fixVenmoPaymentText = function() {
  console.log('🔧 Manual Venmo payment text fix...');
  
  // Fix any visible text
  const allElements = document.querySelectorAll('*');
  allElements.forEach(element => {
    if (element.textContent && element.textContent.includes('include your business name in the payment note')) {
      const oldText = element.textContent;
      const newText = oldText.replace(
        /include your business name in the payment note/gi,
        'include "Business Name" in the payment note'
      );
      
      if (newText !== oldText) {
        // Update text content
        if (element.children.length === 0) {
          element.textContent = newText;
        } else {
          // For elements with children, update innerHTML carefully
          let html = element.innerHTML;
          html = html.replace(
            /include your business name in the payment note/gi,
            'include "Business Name" in the payment note'
          );
          element.innerHTML = html;
        }
        
        console.log('✅ Fixed text in element:', element.tagName);
      }
    }
  });
  
  console.log('✅ Manual fix completed');
};

// Test function
window.testVenmoTextFix = function() {
  console.log('🧪 Testing Venmo text fix...');
  
  // Create test element
  const testDiv = document.createElement('div');
  testDiv.innerHTML = 'Please include your business name in the payment note when sending payment.';
  document.body.appendChild(testDiv);
  
  console.log('Before fix:', testDiv.textContent);
  
  // Apply fix
  window.fixVenmoPaymentText();
  
  console.log('After fix:', testDiv.textContent);
  
  // Clean up
  testDiv.remove();
  
  return testDiv.textContent.includes('"Business Name"');
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeVenmoTextFix);
} else {
  initializeVenmoTextFix();
}

// Also initialize with delay to ensure it runs after other scripts
setTimeout(initializeVenmoTextFix, 5000);

console.log('💳 Venmo text fix for index.html loaded');
