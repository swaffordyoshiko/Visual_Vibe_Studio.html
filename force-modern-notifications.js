// Aggressive notification override - forces all notifications to use modern toast
console.log('🚀 Force modern notifications loading...');

// Function to override all notification functions
function forceModernNotifications() {
  if (!window.toastManager) {
    console.log('⏳ Toast manager not ready, retrying...');
    setTimeout(forceModernNotifications, 100);
    return;
  }

  console.log('✅ Toast manager ready, forcing modern notifications...');

  // Store original functions
  window.originalAlert = window.originalAlert || window.alert;
  window.originalShowAlert = window.originalShowAlert || window.showAlert;

  // FORCE OVERRIDE alert function
  window.alert = function(message) {
    console.log('🔄 FORCE Converting alert to toast:', message);
    if (window.toastManager && message) {
      // Determine toast type based on message content
      const lowerMessage = message.toLowerCase();
      let type = 'info';
      
      if (lowerMessage.includes('error') || lowerMessage.includes('failed') || lowerMessage.includes('wrong') || lowerMessage.includes('invalid') || lowerMessage.includes('not available') || lowerMessage.includes('not found') || lowerMessage.includes('unavailable') || lowerMessage.includes('missing')) {
        type = 'error';
      } else if (lowerMessage.includes('success') || lowerMessage.includes('sent') || lowerMessage.includes('completed') || lowerMessage.includes('updated') || lowerMessage.includes('received') || lowerMessage.includes('copied') || lowerMessage.includes('submitted')) {
        type = 'success';  
      } else if (lowerMessage.includes('warning') || lowerMessage.includes('please') || lowerMessage.includes('refresh') || lowerMessage.includes('try again') || lowerMessage.includes('required') || lowerMessage.includes('loading')) {
        type = 'warning';
      }
      
      toastManager.show(message, type, {
        duration: type === 'error' ? 8000 : type === 'success' ? 4000 : 6000,
        title: type === 'error' ? 'Error' : type === 'success' ? 'Success' : type === 'warning' ? 'Notice' : 'Information'
      });
    } else {
      // Fallback to original alert
      window.originalAlert(message);
    }
  };

  // FORCE OVERRIDE showAlert function  
  window.showAlert = function(message, type = 'info') {
    console.log('🔄 FORCE Converting showAlert to toast:', message, type);
    if (window.toastManager && message) {
      const typeMap = {
        'success': 'success',
        'error': 'error', 
        'warning': 'warning',
        'info': 'info'
      };
      
      const toastType = typeMap[type] || 'info';
      const titleMap = {
        'success': 'Success',
        'error': 'Error',
        'warning': 'Warning', 
        'info': 'Notice'
      };
      
      toastManager.show(message, toastType, {
        duration: type === 'error' ? 8000 : type === 'success' ? 4000 : 6000,
        title: titleMap[toastType]
      });
    } else {
      // Fallback
      if (window.originalShowAlert) {
        window.originalShowAlert(message, type);
      } else {
        window.alert(message);
      }
    }
  };

  // Make sure these overrides are permanent
  Object.defineProperty(window, 'alert', {
    value: window.alert,
    writable: false,
    configurable: false
  });

  Object.defineProperty(window, 'showAlert', {
    value: window.showAlert,
    writable: false,
    configurable: false
  });

  console.log('✅ FORCED modern notifications - alert() and showAlert() locked to toast system');
}

// Start immediately
forceModernNotifications();

// Also run after DOM is fully loaded to catch any late definitions
document.addEventListener('DOMContentLoaded', forceModernNotifications);

// Run again after everything is loaded to be absolutely sure
window.addEventListener('load', forceModernNotifications);

// Monitor for any attempts to redefine these functions
let alertOverrideCount = 0;
let showAlertOverrideCount = 0;

setInterval(() => {
  if (window.toastManager) {
    // Check if alert was redefined
    if (window.alert.toString().indexOf('toastManager') === -1) {
      alertOverrideCount++;
      console.log(`🔧 Re-forcing alert override (attempt ${alertOverrideCount})`);
      forceModernNotifications();
    }
    
    // Check if showAlert was redefined  
    if (window.showAlert.toString().indexOf('toastManager') === -1) {
      showAlertOverrideCount++;
      console.log(`🔧 Re-forcing showAlert override (attempt ${showAlertOverrideCount})`);
      forceModernNotifications();
    }
  }
}, 1000);

console.log('✅ Aggressive notification override initialized');
