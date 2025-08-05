// Emergency toast system fix - loads regardless of other scripts
console.log('🚨 Emergency toast fix loading...');

// Wait for DOM to be ready
function initEmergencyToast() {
  console.log('🚨 Initializing emergency toast system...');
  
  // Remove any existing toast containers
  const existingContainers = document.querySelectorAll('#simple-toast-container, .toast-container');
  existingContainers.forEach(container => container.remove());
  
  // Create new toast container
  const container = document.createElement('div');
  container.id = 'emergency-toast-container';
  container.style.cssText = `
    position: fixed !important;
    top: 80px !important;
    right: 0px !important;
    z-index: 999999 !important;
    pointer-events: none !important;
    max-width: 350px !important;
    width: 350px !important;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
  `;
  document.body.appendChild(container);
  
  // Toast creation function
  function createToast(message, type = 'info', duration = 5000) {
    console.log('🚨 Creating emergency toast:', message, type);
    
    const toast = document.createElement('div');
    
    // Colors for different types
    const colors = {
      success: { bg: '#10B981', icon: '✓' },
      error: { bg: '#EF4444', icon: '✕' },
      warning: { bg: '#F59E0B', icon: '⚠' },
      info: { bg: '#3B82F6', icon: 'ℹ' }
    };
    
    const color = colors[type] || colors.info;
    
    toast.style.cssText = `
      background: ${color.bg} !important;
      color: white !important;
      padding: 12px 16px !important;
      border-radius: 8px !important;
      margin: 0 20px 8px 20px !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
      transform: translateX(350px) !important;
      transition: transform 0.3s ease-in-out !important;
      pointer-events: auto !important;
      font-size: 14px !important;
      line-height: 1.4 !important;
      word-wrap: break-word !important;
      position: relative !important;
      width: calc(100% - 40px) !important;
      max-width: 310px !important;
      display: block !important;
    `;
    
    toast.innerHTML = `
      <div style="display: flex !important; align-items: center !important; gap: 10px !important;">
        <span style="font-weight: bold !important; font-size: 16px !important; flex-shrink: 0 !important;">${color.icon}</span>
        <span style="flex: 1 !important;">${message}</span>
        <button onclick="this.parentElement.parentElement.style.transform='translateX(100%)'; setTimeout(() => this.parentElement.parentElement.remove(), 300);" 
                style="background: none !important; border: none !important; color: white !important; font-size: 20px !important; cursor: pointer !important; padding: 0 !important; line-height: 1 !important; margin-left: 8px !important; flex-shrink: 0 !important;">&times;</button>
      </div>
    `;
    
    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0) !important';
    }, 10);

    // Auto remove
    if (duration > 0) {
      setTimeout(() => {
        toast.style.transform = 'translateX(350px) !important';
        setTimeout(() => {
          if (toast.parentNode) {
            toast.remove();
          }
        }, 300);
      }, duration);
    }
    
    return toast;
  }
  
  // Create emergency toast manager
  const emergencyToastManager = {
    show: createToast,
    success: (msg, dur) => createToast(msg, 'success', dur || 4000),
    error: (msg, dur) => createToast(msg, 'error', dur || 8000),
    warning: (msg, dur) => createToast(msg, 'warning', dur || 6000),
    info: (msg, dur) => createToast(msg, 'info', dur || 5000)
  };
  
  // Force override alert and showAlert
  window.originalAlert = window.originalAlert || window.alert;
  window.originalShowAlert = window.originalShowAlert || window.showAlert;
  
  window.alert = function(message) {
    console.log('🚨 Emergency alert override:', message);
    if (message) {
      const lowerMsg = message.toLowerCase();
      let type = 'info';
      
      if (lowerMsg.includes('error') || lowerMsg.includes('failed') || lowerMsg.includes('wrong') || lowerMsg.includes('invalid') || lowerMsg.includes('not available') || lowerMsg.includes('not found') || lowerMsg.includes('unavailable') || lowerMsg.includes('missing')) {
        type = 'error';
      } else if (lowerMsg.includes('success') || lowerMsg.includes('sent') || lowerMsg.includes('completed') || lowerMsg.includes('updated') || lowerMsg.includes('received') || lowerMsg.includes('copied') || lowerMsg.includes('submitted')) {
        type = 'success';  
      } else if (lowerMsg.includes('warning') || lowerMsg.includes('please') || lowerMsg.includes('refresh') || lowerMsg.includes('try again') || lowerMsg.includes('required')) {
        type = 'warning';
      }
      
      createToast(message, type);
    }
  };
  
  window.showAlert = function(message, type = 'info') {
    console.log('🚨 Emergency showAlert override:', message, type);
    if (message) {
      const typeMap = {
        'success': 'success',
        'error': 'error',
        'warning': 'warning',
        'info': 'info'
      };
      createToast(message, typeMap[type] || 'info');
    }
  };
  
  // Set global references
  window.toastManager = emergencyToastManager;
  window.emergencyToastManager = emergencyToastManager;
  
  console.log('✅ Emergency toast system initialized!');
  
}

// Initialize immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEmergencyToast);
} else {
  initEmergencyToast();
}

// Also run after a delay to ensure it overrides everything
setTimeout(initEmergencyToast, 100);
setTimeout(initEmergencyToast, 500);
setTimeout(initEmergencyToast, 1000);

console.log('🚨 Emergency toast fix loaded');
