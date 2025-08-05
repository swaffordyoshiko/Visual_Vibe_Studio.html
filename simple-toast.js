// Simple, robust toast notification system
console.log('🍞 Loading simple toast system...');

// Create toast container
function createToastContainer() {
  if (document.getElementById('simple-toast-container')) {
    return document.getElementById('simple-toast-container');
  }
  
  const container = document.createElement('div');
  container.id = 'simple-toast-container';
  container.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 99999;
    pointer-events: none;
    max-width: 400px;
  `;
  document.body.appendChild(container);
  return container;
}

// Show toast notification
function showToast(message, type = 'info', duration = 5000) {
  console.log('🍞 Showing toast:', message, type);
  
  const container = createToastContainer();
  
  // Create toast element
  const toast = document.createElement('div');
  toast.style.cssText = `
    background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : type === 'warning' ? '#F59E0B' : '#3B82F6'};
    color: white;
    padding: 16px 20px;
    border-radius: 8px;
    margin-bottom: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    pointer-events: auto;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 14px;
    line-height: 1.4;
    word-wrap: break-word;
    position: relative;
  `;
  
  // Add icon and message
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠' : 'ℹ';
  toast.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-weight: bold; font-size: 16px;">${icon}</span>
      <span>${message}</span>
      <button onclick="this.parentElement.parentElement.remove()" style="
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        line-height: 1;
      ">&times;</button>
    </div>
  `;
  
  container.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 10);
  
  // Auto remove
  if (duration > 0) {
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
        }
      }, 300);
    }, duration);
  }
  
  return toast;
}

// Create simple toast manager object
window.simpleToastManager = {
  show: showToast,
  success: (message, duration) => showToast(message, 'success', duration),
  error: (message, duration) => showToast(message, 'error', duration || 7000),
  warning: (message, duration) => showToast(message, 'warning', duration),
  info: (message, duration) => showToast(message, 'info', duration)
};

// Immediately override alert and showAlert functions
console.log('🍞 Overriding alert functions...');

// Store originals
window.originalAlert = window.originalAlert || window.alert;
window.originalShowAlert = window.originalShowAlert || window.showAlert;

// Override alert
window.alert = function(message) {
  console.log('🍞 Alert override:', message);
  if (message) {
    // Determine type from message
    const lowerMsg = message.toLowerCase();
    let type = 'info';
    
    if (lowerMsg.includes('error') || lowerMsg.includes('failed') || lowerMsg.includes('wrong') || lowerMsg.includes('invalid') || lowerMsg.includes('not available') || lowerMsg.includes('not found') || lowerMsg.includes('unavailable') || lowerMsg.includes('missing')) {
      type = 'error';
    } else if (lowerMsg.includes('success') || lowerMsg.includes('sent') || lowerMsg.includes('completed') || lowerMsg.includes('updated') || lowerMsg.includes('received') || lowerMsg.includes('copied') || lowerMsg.includes('submitted')) {
      type = 'success';  
    } else if (lowerMsg.includes('warning') || lowerMsg.includes('please') || lowerMsg.includes('refresh') || lowerMsg.includes('try again') || lowerMsg.includes('required')) {
      type = 'warning';
    }
    
    showToast(message, type, type === 'error' ? 8000 : 5000);
  }
};

// Override showAlert  
window.showAlert = function(message, type = 'info') {
  console.log('🍞 ShowAlert override:', message, type);
  if (message) {
    const typeMap = {
      'success': 'success',
      'error': 'error',
      'warning': 'warning',
      'info': 'info'
    };
    showToast(message, typeMap[type] || 'info', type === 'error' ? 8000 : 5000);
  }
};

// Also set as toastManager for compatibility
window.toastManager = window.simpleToastManager;

console.log('✅ Simple toast system loaded and ready!');
console.log('Available: window.simpleToastManager, window.toastManager, alert(), showAlert()');
