// Fix toastManager reference error
console.log('🔧 Loading toastManager error fix...');

function fixToastManagerError() {
  console.log('🚀 Fixing toastManager reference error...');
  
  // Ensure toastManager is properly available globally
  if (window.toastManager && !window.toastManager) {
    window.toastManager = window.toastManager;
  }
  
  // Create a safe toastManager wrapper if it doesn't exist
  if (!window.toastManager) {
    console.log('📝 Creating fallback toastManager...');
    
    window.toastManager = {
      success: function(message, options = {}) {
        console.log('✅ SUCCESS:', message);
        showSafeAlert(message, 'success', options);
      },
      
      error: function(message, options = {}) {
        console.log('�� ERROR:', message);
        showSafeAlert(message, 'error', options);
      },
      
      info: function(message, options = {}) {
        console.log('ℹ️ INFO:', message);
        showSafeAlert(message, 'info', options);
      },
      
      warning: function(message, options = {}) {
        console.log('⚠️ WARNING:', message);
        showSafeAlert(message, 'warning', options);
      }
    };
    
    console.log('✅ Fallback toastManager created');
  }
  
  // Also ensure it's available without window prefix
  if (typeof toastManager === 'undefined') {
    window.toastManager = window.toastManager;
  }
}

function showSafeAlert(message, type = 'info', options = {}) {
  try {
    // Try to create a modern toast notification
    createToastNotification(message, type, options);
  } catch (error) {
    console.warn('Failed to create toast, falling back to alert:', error);
    // Fallback to regular alert
    alert(message);
  }
}

function createToastNotification(message, type = 'info', options = {}) {
  // Remove existing toasts to prevent stacking
  const existingToasts = document.querySelectorAll('.toast-notification');
  existingToasts.forEach(toast => toast.remove());
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast-notification fixed top-4 right-4 z-[9999] max-w-sm w-full transform transition-all duration-300 ease-in-out';
  
  // Get colors based on type
  const colors = getToastColors(type);
  
  toast.innerHTML = `
    <div class="bg-white border-l-4 ${colors.border} rounded-lg shadow-lg p-4">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <span class="text-xl">${colors.icon}</span>
        </div>
        <div class="ml-3 flex-1">
          <p class="text-sm font-medium ${colors.text}">
            ${escapeHtml(message)}
          </p>
        </div>
        <div class="ml-4 flex-shrink-0">
          <button onclick="this.closest('.toast-notification').remove()" class="text-gray-400 hover:text-gray-600 transition-colors">
            <span class="sr-only">Close</span>
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Add to page
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
    toast.style.opacity = '1';
  }, 10);
  
  // Auto remove after duration
  const duration = options.duration || getDurationByType(type);
  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.transform = 'translateX(100%)';
      toast.style.opacity = '0';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
        }
      }, 300);
    }
  }, duration);
}

function getToastColors(type) {
  switch (type) {
    case 'success':
      return {
        border: 'border-green-500',
        text: 'text-green-800',
        icon: '✅'
      };
    case 'error':
      return {
        border: 'border-red-500',
        text: 'text-red-800',
        icon: '❌'
      };
    case 'warning':
      return {
        border: 'border-yellow-500',
        text: 'text-yellow-800',
        icon: '⚠️'
      };
    case 'info':
    default:
      return {
        border: 'border-blue-500',
        text: 'text-blue-800',
        icon: 'ℹ️'
      };
  }
}

function getDurationByType(type) {
  switch (type) {
    case 'success':
      return 4000;
    case 'error':
      return 6000;
    case 'warning':
      return 5000;
    case 'info':
    default:
      return 3000;
  }
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Override any problematic success message calls
function fixSuccessMessageCalls() {
  console.log('🔧 Fixing success message calls...');
  
  // Override setTimeout to catch and fix the problematic call
  const originalSetTimeout = window.setTimeout;
  window.setTimeout = function(callback, delay) {
    if (typeof callback === 'function') {
      const callbackStr = callback.toString();
      
      // Check if this is the problematic success message
      if (callbackStr.includes('window.toastManager ? toastManager.success') && 
          callbackStr.includes('Order submitted successfully')) {
        
        console.log('🎯 Found problematic success message call - fixing...');
        
        // Create a safe version of the callback
        const safeCallback = function() {
          try {
            // Get the variables (they should be in scope)
            const businessName = typeof window.businessName !== 'undefined' ? window.businessName : 
                                 (document.getElementById('businessName') ? document.getElementById('businessName').value : 'Customer');
            const selectedServices = typeof window.selectedServices !== 'undefined' ? window.selectedServices : ['Custom Service'];
            const totalAmount = typeof window.totalAmount !== 'undefined' ? window.totalAmount : '100.00';
            const depositAmount = typeof window.depositAmount !== 'undefined' ? window.depositAmount : '50.00';
            
            const message = `Order submitted successfully!\n\nBusiness: ${businessName}\nServices: ${selectedServices.join(', ')}\nTotal: $${totalAmount}\nDeposit: $${depositAmount}\n\nPlease complete payment via Venmo @Yoshiko-Swafford and include your business name in the payment note. We will contact you within 24 hours after payment.`;
            
            // Use the safe toastManager
            if (window.toastManager) {
              window.toastManager.success(message, { duration: 6000 });
            } else {
              alert(message);
            }
            
            console.log('✅ Success message displayed safely');
            
          } catch (error) {
            console.error('❌ Error in safe callback:', error);
            alert('Order submitted successfully! Please check your payment instructions.');
          }
        };
        
        return originalSetTimeout.call(this, safeCallback, delay);
      }
    }
    
    return originalSetTimeout.call(this, callback, delay);
  };
  
  console.log('✅ Success message calls fixed');
}

// Initialize the fix
function initializeToastManagerFix() {
  console.log('🚀 Initializing toastManager fix...');
  
  // Fix the toastManager reference
  fixToastManagerError();
  
  // Fix problematic success message calls
  fixSuccessMessageCalls();
  
  // Verify everything is working
  setTimeout(() => {
    console.log('🔍 VERIFICATION:');
    console.log('  window.toastManager exists:', !!window.toastManager);
    console.log('  toastManager (global) exists:', typeof toastManager !== 'undefined');
    console.log('  toastManager.success available:', !!(window.toastManager && window.toastManager.success));
    
    if (window.toastManager && window.toastManager.success) {
      console.log('✅ toastManager is properly available');
    } else {
      console.error('❌ toastManager still not available');
    }
  }, 1000);
  
  console.log('✅ toastManager fix initialized');
}

// Test function
window.testToastManager = function() {
  console.log('🧪 Testing toastManager...');
  
  if (window.toastManager) {
    window.toastManager.success('Test success message!', { duration: 2000 });
    
    setTimeout(() => {
      window.toastManager.error('Test error message!', { duration: 2000 });
    }, 500);
    
    setTimeout(() => {
      window.toastManager.info('Test info message!', { duration: 2000 });
    }, 1000);
    
    setTimeout(() => {
      window.toastManager.warning('Test warning message!', { duration: 2000 });
    }, 1500);
    
    console.log('✅ Toast test completed');
  } else {
    console.error('❌ toastManager not available for testing');
  }
};

// Emergency fix for immediate use
window.fixToastManagerNow = function() {
  console.log('🚨 Emergency toastManager fix...');
  fixToastManagerError();
  console.log('✅ Emergency fix applied');
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeToastManagerFix);
} else {
  initializeToastManagerFix();
}

// Also initialize immediately
initializeToastManagerFix();

console.log('🔧 toastManager error fix loaded');
