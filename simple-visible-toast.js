// Ultra-simple, guaranteed visible toast system
console.log('🍞 Loading ultra-simple visible toast system...');

// Create a very simple toast function that's guaranteed to be visible
function showSimpleToast(message, type = 'info') {
  console.log('🍞 Showing simple toast:', message, type);
  
  // Remove any existing toasts first
  const existingToasts = document.querySelectorAll('.simple-toast');
  existingToasts.forEach(toast => toast.remove());
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'simple-toast';
  
  // Define colors
  const colors = {
    success: '#22C55E',
    error: '#EF4444', 
    warning: '#F59E0B',
    info: '#3B82F6'
  };
  
  const icons = {
    success: '✓',
    error: '✕', 
    warning: '⚠',
    info: 'ℹ'
  };
  
  // Set very simple, visible styles
  toast.style.cssText = `
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: ${colors[type] || colors.info};
    color: white;
    padding: 20px 30px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
    z-index: 9999999;
    font-family: Arial, sans-serif;
    text-align: center;
    min-width: 300px;
    max-width: 500px;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
  
  // Add content
  toast.innerHTML = `${icons[type] || icons.info} ${message}`;
  
  // Add to page
  document.body.appendChild(toast);
  
  // Fade in
  setTimeout(() => {
    toast.style.opacity = '1';
  }, 10);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 300);
  }, 5000);
  
  return toast;
}

// Override alert and showAlert immediately
window.originalAlert = window.originalAlert || window.alert;
window.originalShowAlert = window.originalShowAlert || window.showAlert;

window.alert = function(message) {
  console.log('🍞 Simple alert override:', message);
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
    
    showSimpleToast(message, type);
  }
};

window.showAlert = function(message, type = 'info') {
  console.log('🍞 Simple showAlert override:', message, type);
  if (message) {
    showSimpleToast(message, type);
  }
};

// Create simple toast manager for compatibility
window.toastManager = {
  show: showSimpleToast,
  success: (msg) => showSimpleToast(msg, 'success'),
  error: (msg) => showSimpleToast(msg, 'error'),
  warning: (msg) => showSimpleToast(msg, 'warning'),
  info: (msg) => showSimpleToast(msg, 'info')
};

// Make it available globally
window.showSimpleToast = showSimpleToast;

console.log('✅ Ultra-simple visible toast system loaded!');

// Test it immediately
setTimeout(() => {
  showSimpleToast('Simple toast system is working! You should see this notification.', 'success');
}, 1000);
