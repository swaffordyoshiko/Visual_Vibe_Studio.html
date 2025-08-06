// Immediate toastManager reference fix
console.log('🚨 Loading immediate toastManager fix...');

// Fix the toastManager reference error IMMEDIATELY
(function() {
  'use strict';
  
  console.log('🔧 Applying immediate toastManager fix...');
  
  // Ensure toastManager is available globally and as window.toastManager
  if (typeof window.toastManager !== 'undefined' && typeof toastManager === 'undefined') {
    // If window.toastManager exists but toastManager doesn't, create global reference
    window.toastManager = window.toastManager;
  }
  
  // If neither exists, create a minimal working version immediately
  if (typeof toastManager === 'undefined') {
    window.toastManager = {
      success: function(message, options = {}) {
        console.log('✅ Toast Success:', message);
        showQuickToast(message, 'success', options);
      },
      error: function(message, options = {}) {
        console.log('❌ Toast Error:', message);
        showQuickToast(message, 'error', options);
      },
      info: function(message, options = {}) {
        console.log('ℹ️ Toast Info:', message);
        showQuickToast(message, 'info', options);
      },
      warning: function(message, options = {}) {
        console.log('⚠️ Toast Warning:', message);
        showQuickToast(message, 'warning', options);
      }
    };
    
    // Make it available globally without window prefix
    window.toastManager = window.toastManager;
  }
  
  function showQuickToast(message, type, options) {
    try {
      // Quick and simple toast notification
      const toast = document.createElement('div');
      toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : type === 'warning' ? '#F59E0B' : '#3B82F6'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        max-width: 400px;
        font-family: Arial, sans-serif;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
      `;
      
      // Format message for display (handle \n)
      const displayMessage = message.replace(/\\n/g, '\n').replace(/\n/g, '<br>');
      toast.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 8px;">
          <span style="font-size: 16px;">
            ${type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️'}
          </span>
          <div style="flex: 1;">${displayMessage}</div>
          <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; cursor: pointer; font-size: 18px; padding: 0; margin-left: 8px;">×</button>
        </div>
      `;
      
      document.body.appendChild(toast);
      
      // Animate in
      setTimeout(() => {
        toast.style.transform = 'translateX(0)';
      }, 10);
      
      // Auto remove
      const duration = options.duration || (type === 'success' ? 5000 : type === 'error' ? 7000 : 4000);
      setTimeout(() => {
        if (toast.parentNode) {
          toast.style.transform = 'translateX(100%)';
          setTimeout(() => {
            if (toast.parentNode) {
              toast.remove();
            }
          }, 300);
        }
      }, duration);
      
    } catch (error) {
      console.error('Failed to show toast, using alert:', error);
      alert(message.replace(/\\n/g, '\n'));
    }
  }
  
  console.log('✅ Immediate toastManager fix applied');
  console.log('  - window.toastManager available:', !!window.toastManager);
  console.log('  - global toastManager available:', typeof toastManager !== 'undefined');
  
})();

// Also patch the setTimeout function to catch the specific problematic call
(function() {
  console.log('🎯 Patching setTimeout for toastManager fix...');
  
  const originalSetTimeout = window.setTimeout;
  
  window.setTimeout = function(callback, delay) {
    if (typeof callback === 'function') {
      const callbackString = callback.toString();
      
      // Check if this is the problematic success message callback
      if (callbackString.includes('window.toastManager ? toastManager.success') && 
          callbackString.includes('Order submitted successfully')) {
        
        console.log('🔧 Intercepted problematic toastManager call - fixing...');
        
        // Create a safe replacement callback
        const safeCallback = function() {
          try {
            // Extract variables that should be in scope
            let businessName = 'Customer';
            let selectedServices = ['Custom Service'];
            let totalAmount = '100.00';
            let depositAmount = '50.00';
            
            // Try to get actual values from global scope or DOM
            try {
              if (typeof window.businessName !== 'undefined') businessName = window.businessName;
              if (typeof window.selectedServices !== 'undefined') selectedServices = window.selectedServices;
              if (typeof window.totalAmount !== 'undefined') totalAmount = window.totalAmount;
              if (typeof window.depositAmount !== 'undefined') depositAmount = window.depositAmount;
              
              // Fallback: try to get from form
              const businessInput = document.getElementById('businessName');
              if (businessInput && businessInput.value) {
                businessName = businessInput.value;
              }
              
              const serviceCheckboxes = document.querySelectorAll('input[name="services"]:checked');
              if (serviceCheckboxes.length > 0) {
                selectedServices = Array.from(serviceCheckboxes).map(cb => cb.value);
              }
            } catch (e) {
              console.warn('Could not extract all variables, using defaults');
            }
            
            const message = `Order submitted successfully!\n\nBusiness: ${businessName}\nServices: ${selectedServices.join(', ')}\nTotal: $${totalAmount}\nDeposit: $${depositAmount}\n\nPlease complete payment via Venmo @Yoshiko-Swafford and include your business name in the payment note. We will contact you within 24 hours after payment.`;
            
            // Use the safe toastManager
            if (window.toastManager && window.toastManager.success) {
              window.toastManager.success(message, { duration: 6000 });
            } else {
              alert(message);
            }
            
            console.log('✅ Order success message displayed safely');
            
          } catch (error) {
            console.error('❌ Error in safe callback:', error);
            alert('Order submitted successfully! Please check your email for payment instructions.');
          }
        };
        
        return originalSetTimeout.call(this, safeCallback, delay);
      }
    }
    
    // For all other setTimeout calls, use original
    return originalSetTimeout.call(this, callback, delay);
  };
  
  console.log('✅ setTimeout patched successfully');
})();

// Test the fix
window.testImmediateToastFix = function() {
  console.log('🧪 Testing immediate toast fix...');
  
  if (window.toastManager) {
    window.toastManager.success('Test message: toastManager is working!', { duration: 3000 });
    console.log('✅ Test passed - toastManager is functional');
    return true;
  } else {
    console.error('❌ Test failed - toastManager not available');
    return false;
  }
};

// Emergency function to fix right now
window.emergencyToastFix = function() {
  console.log('🚨 Emergency toast fix activation...');
  
  // Force create toastManager if it doesn't exist
  window.toastManager = window.toastManager || {
    success: (msg, opts) => { console.log('Success:', msg); alert(msg); },
    error: (msg, opts) => { console.log('Error:', msg); alert(msg); },
    info: (msg, opts) => { console.log('Info:', msg); alert(msg); },
    warning: (msg, opts) => { console.log('Warning:', msg); alert(msg); }
  };
  
  // Make sure it's available globally
  window.toastManager = window.toastManager;
  
  console.log('✅ Emergency fix complete');
};

// Apply emergency fix immediately
window.emergencyToastFix();

console.log('🚨 Immediate toastManager fix loaded and applied');
