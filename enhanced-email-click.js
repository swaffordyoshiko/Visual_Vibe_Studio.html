// Enhanced email click handler with visual feedback
console.log('📧 Loading enhanced email click handler...');

// Override the existing handleEmailClick with enhanced version
window.handleEmailClick = function(event, emailAddress) {
  console.log('📧 Enhanced email button clicked');
  
  if (event && event.preventDefault) {
    event.preventDefault();
  }
  
  const email = emailAddress || 'support@visualvibestudio.store';
  
  try {
    // Show visual feedback before opening email
    showEmailFeedback(`Opening email client for ${email}...`);
    
    // Attempt to open email client
    window.location.href = 'mailto:' + email;
    
    // Show success feedback after a short delay
    setTimeout(() => {
      showEmailFeedback(`Email client should now be open for ${email}`, 'success');
    }, 1000);
    
    console.log('✅ Email client opened for:', email);
    
  } catch (error) {
    console.error('❌ Error opening email:', error);
    showEmailFeedback(`Error opening email client. Please email us manually at: ${email}`, 'error');
  }
};

function showEmailFeedback(message, type = 'info') {
  console.log('📧 Feedback:', message);
  
  try {
    // Try to use existing toast manager
    if (window.toastManager) {
      const toastType = type === 'success' ? 'success' : type === 'error' ? 'error' : 'info';
      window.toastManager[toastType](message, { duration: 4000 });
      return;
    }
    
    // Fallback: create visual notification
    createVisualNotification(message, type);
    
  } catch (error) {
    console.error('❌ Error showing feedback:', error);
    // Ultimate fallback
    alert(message);
  }
}

function createVisualNotification(message, type = 'info') {
  // Remove any existing notifications
  const existing = document.querySelectorAll('.email-notification');
  existing.forEach(el => el.remove());
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'email-notification';
  
  // Style based on type
  const colors = {
    info: { bg: '#3B82F6', icon: '📧' },
    success: { bg: '#10B981', icon: '✅' },
    error: { bg: '#EF4444', icon: '❌' }
  };
  
  const style = colors[type] || colors.info;
  
  notification.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 18px;">${style.icon}</span>
      <span>${message}</span>
      <button onclick="this.closest('.email-notification').remove()" style="background: none; border: none; color: white; cursor: pointer; margin-left: 8px; font-size: 16px;">×</button>
    </div>
  `;
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${style.bg};
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
    line-height: 1.4;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 10);
  
  // Auto-remove after delay
  const duration = type === 'error' ? 6000 : 4000;
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }
  }, duration);
}

// Test function
window.testEnhancedEmail = function() {
  console.log('🧪 Testing enhanced email functionality...');
  
  // Simulate click with mock event
  const mockEvent = { preventDefault: () => console.log('preventDefault called') };
  window.handleEmailClick(mockEvent, 'test@example.com');
  
  console.log('✅ Test completed');
};

console.log('✅ Enhanced email click handler loaded');
console.log('  - Visual feedback enabled');
console.log('  - Error handling improved');
console.log('  - Test function: testEnhancedEmail()');
