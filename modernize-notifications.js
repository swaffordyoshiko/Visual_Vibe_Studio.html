// Comprehensive notification modernization script
// Replaces all embedded alerts and showAlert calls with modern toast notifications
console.log('🔧 Modernizing all notifications on the webpage...');

// Override the global alert function to use modern toast
window.originalAlert = window.alert;
window.alert = function(message) {
  console.log('🔄 Converting alert to modern toast:', message);
  if (window.toastManager) {
    // Determine toast type based on message content
    const lowerMessage = message.toLowerCase();
    let type = 'info';
    
    if (lowerMessage.includes('error') || lowerMessage.includes('failed') || lowerMessage.includes('wrong') || lowerMessage.includes('invalid')) {
      type = 'error';
    } else if (lowerMessage.includes('success') || lowerMessage.includes('sent') || lowerMessage.includes('completed') || lowerMessage.includes('updated')) {
      type = 'success';
    } else if (lowerMessage.includes('warning') || lowerMessage.includes('missing') || lowerMessage.includes('required')) {
      type = 'warning';
    }
    
    toastManager.show(message, type, {
      duration: 5000,
      title: type === 'error' ? 'Error' : type === 'success' ? 'Success' : type === 'warning' ? 'Warning' : 'Notice'
    });
  } else {
    // Fallback to original alert if toast manager not available
    window.originalAlert(message);
  }
};

// Override the showAlert function to use modern toast
window.originalShowAlert = window.showAlert;
window.showAlert = function(message, type = 'info') {
  console.log('🔄 Converting showAlert to modern toast:', message, type);
  if (window.toastManager) {
    // Map showAlert types to toast types
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
      duration: type === 'error' ? 7000 : 5000,
      title: titleMap[toastType]
    });
  } else {
    // Fallback to original showAlert if toast manager not available
    if (window.originalShowAlert) {
      window.originalShowAlert(message, type);
    } else {
      window.alert(message);
    }
  }
};

// Create modern notification helper functions
window.showSuccess = function(message, options = {}) {
  if (window.toastManager) {
    toastManager.success(message, { title: 'Success', duration: 4000, ...options });
  } else {
    window.alert(message);
  }
};

window.showError = function(message, options = {}) {
  if (window.toastManager) {
    toastManager.error(message, { title: 'Error', duration: 6000, ...options });
  } else {
    window.alert(message);
  }
};

window.showWarning = function(message, options = {}) {
  if (window.toastManager) {
    toastManager.show(message, 'warning', { title: 'Warning', duration: 5000, ...options });
  } else {
    window.alert(message);
  }
};

window.showInfo = function(message, options = {}) {
  if (window.toastManager) {
    toastManager.info(message, { title: 'Notice', duration: 4000, ...options });
  } else {
    window.alert(message);
  }
};

// Wait for DOM to be ready, then replace any remaining hardcoded alerts
document.addEventListener('DOMContentLoaded', function() {
  console.log('🔍 Checking for hardcoded alert calls in DOM...');
  
  // Find and replace onclick attributes that use alert()
  const elementsWithOnclick = document.querySelectorAll('[onclick*="alert("]');
  elementsWithOnclick.forEach(element => {
    const onclick = element.getAttribute('onclick');
    if (onclick && onclick.includes('alert(')) {
      console.log('🔄 Found hardcoded alert in onclick, modernizing:', onclick);
      
      // Replace alert() calls with showError(), showSuccess(), etc. based on context
      let newOnclick = onclick.replace(/alert\s*\(\s*['"`]([^'"`]*?)['"`]\s*\)/g, (match, message) => {
        if (message.toLowerCase().includes('error') || message.toLowerCase().includes('failed')) {
          return `showError('${message}')`;
        } else if (message.toLowerCase().includes('success') || message.toLowerCase().includes('sent')) {
          return `showSuccess('${message}')`;
        } else {
          return `showInfo('${message}')`;
        }
      });
      
      element.setAttribute('onclick', newOnclick);
    }
  });
  
  console.log(`✅ Modernized ${elementsWithOnclick.length} hardcoded alert calls`);
});

// Enhanced error handling with modern notifications
window.addEventListener('error', function(e) {
  if (e.error && e.error.message && window.toastManager) {
    // Don't show notifications for every JS error, only critical ones
    const criticalErrors = ['network', 'fetch', 'connection', 'service', 'api'];
    const errorMessage = e.error.message.toLowerCase();
    
    if (criticalErrors.some(keyword => errorMessage.includes(keyword))) {
      toastManager.error('A network or service error occurred. Please check your connection and try again.', {
        title: 'Connection Error',
        duration: 8000
      });
    }
  }
});

console.log('✅ All notifications modernized - using toast notification system');
console.log('Available functions: showSuccess(), showError(), showWarning(), showInfo()');
