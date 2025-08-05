// Viewport-aware modern toast notification system
console.log('🍞 Loading viewport-aware toast system...');

// Function to get current viewport position
function getViewportPosition() {
  return {
    scrollTop: window.pageYOffset || document.documentElement.scrollTop,
    scrollLeft: window.pageXOffset || document.documentElement.scrollLeft,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight
  };
}

// Create modern toast that appears in current viewport
function createViewportToast(message, type = 'info', duration = 5000) {
  console.log('🍞 Creating viewport toast:', message, type);
  
  const viewport = getViewportPosition();
  
  // Remove existing toasts
  const existingToasts = document.querySelectorAll('.viewport-toast');
  existingToasts.forEach(toast => toast.remove());
  
  // Create toast container if it doesn't exist
  let container = document.getElementById('viewport-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'viewport-toast-container';
    document.body.appendChild(container);
  }
  
  // Position container in current viewport
  container.style.cssText = `
    position: absolute !important;
    top: ${viewport.scrollTop + 80}px !important;
    right: 20px !important;
    z-index: 999999999 !important;
    pointer-events: none !important;
    width: 350px !important;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
  `;
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'viewport-toast';
  
  // Define colors and icons
  const styles = {
    success: { bg: '#22C55E', icon: '✓' },
    error: { bg: '#EF4444', icon: '✕' },
    warning: { bg: '#F59E0B', icon: '⚠' },
    info: { bg: '#3B82F6', icon: 'ℹ' }
  };
  
  const style = styles[type] || styles.info;
  
  toast.style.cssText = `
    background: ${style.bg} !important;
    color: white !important;
    padding: 16px 20px !important;
    border-radius: 8px !important;
    margin-bottom: 10px !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;
    transform: translateX(100%) !important;
    transition: transform 0.3s ease-in-out !important;
    pointer-events: auto !important;
    font-size: 14px !important;
    line-height: 1.4 !important;
    word-wrap: break-word !important;
    position: relative !important;
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
  `;
  
  // Add content
  toast.innerHTML = `
    <span style="font-size: 18px; font-weight: bold; flex-shrink: 0;">${style.icon}</span>
    <span style="flex: 1;">${message}</span>
    <button onclick="this.parentElement.style.transform='translateX(100%)'; setTimeout(() => this.parentElement.remove(), 300);" 
            style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0; line-height: 1; flex-shrink: 0;">&times;</button>
  `;
  
  // Add to container
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

// Override alert and showAlert with viewport-aware toasts
window.originalAlert = window.originalAlert || window.alert;
window.originalShowAlert = window.originalShowAlert || window.showAlert;

window.alert = function(message) {
  console.log('🍞 Viewport alert override:', message);
  if (message) {
    // Determine type from message content
    const lowerMsg = message.toLowerCase();
    let type = 'info';
    
    if (lowerMsg.includes('error') || lowerMsg.includes('failed') || lowerMsg.includes('wrong') || lowerMsg.includes('invalid') || lowerMsg.includes('not available') || lowerMsg.includes('not found') || lowerMsg.includes('unavailable') || lowerMsg.includes('missing')) {
      type = 'error';
    } else if (lowerMsg.includes('success') || lowerMsg.includes('sent') || lowerMsg.includes('completed') || lowerMsg.includes('updated') || lowerMsg.includes('received') || lowerMsg.includes('copied') || lowerMsg.includes('submitted')) {
      type = 'success';  
    } else if (lowerMsg.includes('warning') || lowerMsg.includes('please') || lowerMsg.includes('refresh') || lowerMsg.includes('try again') || lowerMsg.includes('required')) {
      type = 'warning';
    }
    
    createViewportToast(message, type);
  }
};

window.showAlert = function(message, type = 'info') {
  console.log('🍞 Viewport showAlert override:', message, type);
  if (message) {
    createViewportToast(message, type);
  }
};

// Create viewport-aware toast manager
window.toastManager = {
  show: createViewportToast,
  success: (msg, dur) => createViewportToast(msg, 'success', dur || 4000),
  error: (msg, dur) => createViewportToast(msg, 'error', dur || 8000),
  warning: (msg, dur) => createViewportToast(msg, 'warning', dur || 6000),
  info: (msg, dur) => createViewportToast(msg, 'info', dur || 5000)
};

// Make functions globally available
window.createViewportToast = createViewportToast;

console.log('✅ Viewport-aware toast system loaded!');
