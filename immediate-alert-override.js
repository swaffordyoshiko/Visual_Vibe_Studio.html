// Immediate alert override - loads right after toast manager to catch all alerts
console.log('🚀 Immediate alert override loading...');

// Wait for toast manager to be available
const checkToastManager = () => {
  if (window.toastManager) {
    console.log('✅ Toast manager found, overriding alert functions...');
    
    // Store original functions
    window.originalAlert = window.alert;
    window.originalShowAlert = window.showAlert;
    
    // Override global alert function
    window.alert = function(message) {
      console.log('🔄 Converting alert to toast:', message);
      if (window.toastManager && message) {
        // Determine toast type based on message content
        const lowerMessage = message.toLowerCase();
        let type = 'info';
        
        if (lowerMessage.includes('error') || lowerMessage.includes('failed') || lowerMessage.includes('wrong') || lowerMessage.includes('invalid') || lowerMessage.includes('not available') || lowerMessage.includes('not found')) {
          type = 'error';
        } else if (lowerMessage.includes('success') || lowerMessage.includes('sent') || lowerMessage.includes('completed') || lowerMessage.includes('updated') || lowerMessage.includes('received')) {
          type = 'success';  
        } else if (lowerMessage.includes('warning') || lowerMessage.includes('missing') || lowerMessage.includes('required') || lowerMessage.includes('please')) {
          type = 'warning';
        }
        
        toastManager.show(message, type, {
          duration: type === 'error' ? 7000 : 5000,
          title: type === 'error' ? 'Error' : type === 'success' ? 'Success' : type === 'warning' ? 'Notice' : 'Information'
        });
      } else {
        // Fallback to original alert if toast manager not available
        window.originalAlert(message);
      }
    };
    
    // Override showAlert function
    window.showAlert = function(message, type = 'info') {
      console.log('🔄 Converting showAlert to toast:', message, type);
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
          duration: type === 'error' ? 7000 : 5000,
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
    
    console.log('✅ Alert functions successfully overridden with modern toasts');
  } else {
    // Toast manager not ready yet, try again
    setTimeout(checkToastManager, 10);
  }
};

// Start checking immediately
checkToastManager();
