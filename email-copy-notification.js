// Dedicated Email Copy Notification System
console.log('📧 Email copy notification system loading...');

// Create dedicated notification system for email copy
function initEmailCopyNotifications() {
  console.log('📧 Initializing email copy notifications...');
  
  // Remove any existing email notification containers
  const existingContainers = document.querySelectorAll('#email-notification-container');
  existingContainers.forEach(container => container.remove());
  
  // Create new notification container specifically for email copy
  const container = document.createElement('div');
  container.id = 'email-notification-container';
  container.style.cssText = `
    position: fixed !important;
    top: 90px !important;
    right: 20px !important;
    z-index: 999999 !important;
    pointer-events: none !important;
    max-width: 400px !important;
    width: auto !important;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Inter', sans-serif !important;
  `;
  document.body.appendChild(container);
  
  // Email copy notification function
  function showEmailCopyNotification(message, type = 'success', duration = 4000) {
    console.log('📧 Showing email copy notification:', message, type);
    
    const notification = document.createElement('div');
    
    // Modern notification styles
    const styles = {
      success: { 
        bg: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', 
        icon: '✅',
        shadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
      },
      error: { 
        bg: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', 
        icon: '❌',
        shadow: '0 10px 30px rgba(239, 68, 68, 0.3)'
      },
      info: { 
        bg: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', 
        icon: 'ℹ️',
        shadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
      }
    };
    
    const style = styles[type] || styles.success;
    
    notification.style.cssText = `
      background: ${style.bg} !important;
      color: white !important;
      padding: 16px 20px !important;
      border-radius: 12px !important;
      margin: 0 0 12px 0 !important;
      box-shadow: ${style.shadow} !important;
      transform: translateX(420px) scale(0.8) !important;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
      pointer-events: auto !important;
      font-size: 14px !important;
      line-height: 1.5 !important;
      word-wrap: break-word !important;
      position: relative !important;
      display: block !important;
      min-width: 320px !important;
      max-width: 380px !important;
      backdrop-filter: blur(10px) !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
    `;
    
    notification.innerHTML = `
      <div style="display: flex !important; align-items: center !important; gap: 12px !important;">
        <span style="font-size: 18px !important; flex-shrink: 0 !important;">${style.icon}</span>
        <div style="flex: 1 !important;">
          <div style="font-weight: 600 !important; font-size: 15px !important; margin-bottom: 2px !important;">Email Copied!</div>
          <div style="font-size: 13px !important; opacity: 0.9 !important;">${message}</div>
        </div>
        <button onclick="this.parentElement.parentElement.style.transform='translateX(420px) scale(0.8)'; setTimeout(() => this.parentElement.parentElement.remove(), 400);" 
                style="background: rgba(255, 255, 255, 0.2) !important; border: none !important; color: white !important; font-size: 18px !important; cursor: pointer !important; padding: 4px 8px !important; border-radius: 6px !important; line-height: 1 !important; margin-left: 8px !important; flex-shrink: 0 !important; transition: background 0.2s !important;"
                onmouseover="this.style.background='rgba(255, 255, 255, 0.3)'"
                onmouseout="this.style.background='rgba(255, 255, 255, 0.2)'">&times;</button>
      </div>
    `;
    
    container.appendChild(notification);

    // Animate in with bounce effect
    requestAnimationFrame(() => {
      setTimeout(() => {
        notification.style.transform = 'translateX(0) scale(1) !important';
      }, 10);
    });

    // Auto remove
    if (duration > 0) {
      setTimeout(() => {
        notification.style.transform = 'translateX(420px) scale(0.8) !important';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.remove();
          }
        }, 400);
      }, duration);
    }
    
    return notification;
  }
  
  // Override window.toastManager for email copy notifications
  if (!window.originalToastManager) {
    window.originalToastManager = window.toastManager;
  }
  
  // Create enhanced toast manager with email copy specialization
  window.toastManager = {
    success: (message, options = {}) => {
      console.log('📧 Toast manager success called:', message);
      // Check if this is an email copy notification
      if (message && (message.includes('email') || message.includes('Email') || message.includes('clipboard') || message.includes('copied'))) {
        return showEmailCopyNotification(message, 'success', options.duration || 4000);
      }
      // Fall back to original if available
      if (window.originalToastManager && window.originalToastManager.success) {
        return window.originalToastManager.success(message, options);
      }
      // Final fallback
      return showEmailCopyNotification(message, 'success', options.duration || 4000);
    },
    error: (message, options = {}) => {
      return showEmailCopyNotification(message, 'error', options.duration || 6000);
    },
    info: (message, options = {}) => {
      return showEmailCopyNotification(message, 'info', options.duration || 4000);
    },
    show: (message, type = 'success', options = {}) => {
      return showEmailCopyNotification(message, type, options.duration || 4000);
    }
  };
  
  // Also create global function for immediate use
  window.showEmailCopySuccess = (message) => {
    return showEmailCopyNotification(message || 'Email address copied to clipboard!', 'success', 4000);
  };
  
  console.log('✅ Email copy notification system initialized!');
}

// Initialize immediately if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEmailCopyNotifications);
} else {
  initEmailCopyNotifications();
}

// Also run after a delay to ensure it loads after other scripts
setTimeout(initEmailCopyNotifications, 100);

console.log('📧 Email copy notification system loaded');
