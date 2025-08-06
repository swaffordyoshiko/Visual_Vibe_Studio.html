// Fix handleEmailClick function reference error
console.log('📧 Loading handleEmailClick fix...');

function fixHandleEmailClick() {
  console.log('🔧 Fixing handleEmailClick function...');
  
  // Check if handleEmailClick already exists
  if (typeof window.handleEmailClick === 'function') {
    console.log('✅ handleEmailClick already exists');
    return;
  }
  
  // Create a robust handleEmailClick function
  window.handleEmailClick = function(event, emailAddress) {
    console.log('📧 handleEmailClick called with:', emailAddress);
    
    try {
      // Prevent default action initially
      event.preventDefault();
      
      // Check if we're on a mobile device
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // On mobile, directly open mailto
        console.log('📱 Mobile device detected - opening mailto directly');
        window.location.href = `mailto:${emailAddress}`;
      } else {
        // On desktop, show options modal
        console.log('💻 Desktop detected - showing email options');
        showEmailOptionsModal(emailAddress);
      }
      
    } catch (error) {
      console.error('❌ Error in handleEmailClick:', error);
      // Fallback: just open mailto
      window.location.href = `mailto:${emailAddress}`;
    }
  };
  
  console.log('✅ handleEmailClick function created');
}

function showEmailOptionsModal(emailAddress) {
  console.log('📧 Showing email options modal for:', emailAddress);
  
  try {
    // Remove existing modal if it exists
    const existingModal = document.getElementById('emailOptionsModal');
    if (existingModal) {
      existingModal.remove();
    }
    
    // Create email options modal
    const modal = document.createElement('div');
    modal.id = 'emailOptionsModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4';
    
    modal.innerHTML = `
      <div class="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl transform scale-95 opacity-0 transition-all duration-300">
        <div class="text-center mb-6">
          <div class="text-4xl mb-3">📧</div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Contact Us</h3>
          <p class="text-gray-600">Choose how you'd like to get in touch:</p>
        </div>
        
        <div class="space-y-3">
          <button onclick="openMailto('${emailAddress}')" class="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
            <span>📮</span>
            <span>Open Email App</span>
          </button>
          
          <button onclick="copyEmailAddress('${emailAddress}')" class="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-4 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
            <span>📋</span>
            <span>Copy Email Address</span>
          </button>
          
          <button onclick="showContactForm()" class="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
            <span>📝</span>
            <span>Use Contact Form</span>
          </button>
          
          <button onclick="closeEmailOptionsModal()" class="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors">
            Cancel
          </button>
        </div>
        
        <div class="mt-4 text-center">
          <p class="text-xs text-gray-500">Email: ${emailAddress}</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
      const content = modal.querySelector('div');
      if (content) {
        content.style.transform = 'scale(1)';
        content.style.opacity = '1';
      }
    }, 10);
    
    // Click outside to close
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeEmailOptionsModal();
      }
    });
    
    console.log('✅ Email options modal created');
    
  } catch (error) {
    console.error('❌ Error creating email options modal:', error);
    // Fallback: just open mailto
    window.location.href = `mailto:${emailAddress}`;
  }
}

function openMailto(emailAddress) {
  console.log('📮 Opening mailto for:', emailAddress);
  closeEmailOptionsModal();
  window.location.href = `mailto:${emailAddress}`;
}

function copyEmailAddress(emailAddress) {
  console.log('📋 Copying email address:', emailAddress);
  
  try {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(emailAddress).then(() => {
        showEmailFeedback('Email address copied to clipboard!', 'success');
        closeEmailOptionsModal();
      }).catch(() => {
        fallbackCopyEmail(emailAddress);
      });
    } else {
      fallbackCopyEmail(emailAddress);
    }
  } catch (error) {
    console.error('❌ Error copying email:', error);
    fallbackCopyEmail(emailAddress);
  }
}

function fallbackCopyEmail(emailAddress) {
  console.log('📋 Using fallback copy method');
  
  try {
    // Create temporary input element
    const tempInput = document.createElement('input');
    tempInput.value = emailAddress;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices
    
    const successful = document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    if (successful) {
      showEmailFeedback('Email address copied to clipboard!', 'success');
    } else {
      showEmailFeedback(`Please copy manually: ${emailAddress}`, 'info');
    }
    
    closeEmailOptionsModal();
    
  } catch (error) {
    console.error('❌ Fallback copy failed:', error);
    showEmailFeedback(`Please copy manually: ${emailAddress}`, 'info');
    closeEmailOptionsModal();
  }
}

function showContactForm() {
  console.log('📝 Showing contact form');
  closeEmailOptionsModal();
  
  setTimeout(() => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: look for any contact form
      const forms = document.querySelectorAll('form');
      for (let form of forms) {
        if (form.querySelector('input[name="email"]') || form.querySelector('textarea')) {
          form.scrollIntoView({ behavior: 'smooth' });
          break;
        }
      }
    }
  }, 300);
}

function closeEmailOptionsModal() {
  const modal = document.getElementById('emailOptionsModal');
  if (modal) {
    const content = modal.querySelector('div');
    if (content) {
      content.style.transform = 'scale(0.95)';
      content.style.opacity = '0';
    }
    
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}

function showEmailFeedback(message, type = 'info') {
  console.log(`📧 Email feedback (${type}):`, message);
  
  try {
    // Use existing toast manager if available
    if (window.toastManager) {
      window.toastManager[type](message, { duration: 3000 });
      return;
    }
    
    // Create simple feedback notification
    const feedback = document.createElement('div');
    feedback.className = 'fixed top-4 right-4 z-[10000] transform transition-all duration-300';
    feedback.style.transform = 'translateX(100%)';
    
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    
    feedback.innerHTML = `
      <div class="${bgColor} text-white px-4 py-3 rounded-lg shadow-lg max-w-sm">
        <div class="flex items-center space-x-2">
          <span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
          <span class="text-sm font-medium">${message}</span>
        </div>
      </div>
    `;
    
    document.body.appendChild(feedback);
    
    // Animate in
    setTimeout(() => {
      feedback.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove
    setTimeout(() => {
      feedback.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (feedback.parentNode) {
          feedback.remove();
        }
      }, 300);
    }, 3000);
    
  } catch (error) {
    console.error('❌ Error showing email feedback:', error);
    alert(message);
  }
}

// Make functions globally available
window.showEmailOptionsModal = showEmailOptionsModal;
window.openMailto = openMailto;
window.copyEmailAddress = copyEmailAddress;
window.showContactForm = showContactForm;
window.closeEmailOptionsModal = closeEmailOptionsModal;

// Initialize the fix
function initializeHandleEmailClickFix() {
  console.log('🚀 Initializing handleEmailClick fix...');
  
  fixHandleEmailClick();
  
  // Verify the function is available
  setTimeout(() => {
    console.log('🔍 VERIFICATION:');
    console.log('  handleEmailClick exists:', typeof window.handleEmailClick === 'function');
    console.log('  showEmailOptionsModal exists:', typeof window.showEmailOptionsModal === 'function');
    
    if (typeof window.handleEmailClick === 'function') {
      console.log('✅ handleEmailClick is properly available');
    } else {
      console.error('❌ handleEmailClick still not available');
    }
  }, 1000);
  
  console.log('✅ handleEmailClick fix initialized');
}

// Test function
window.testHandleEmailClick = function() {
  console.log('🧪 Testing handleEmailClick...');
  
  if (typeof window.handleEmailClick === 'function') {
    console.log('✅ Function exists - testing with mock event');
    
    // Create mock event
    const mockEvent = {
      preventDefault: () => console.log('preventDefault called')
    };
    
    try {
      window.handleEmailClick(mockEvent, 'test@example.com');
      console.log('✅ Test completed successfully');
      return true;
    } catch (error) {
      console.error('❌ Test failed:', error);
      return false;
    }
  } else {
    console.error('❌ Function not available for testing');
    return false;
  }
};

// Emergency fix function
window.emergencyEmailClickFix = function() {
  console.log('🚨 Emergency handleEmailClick fix...');
  
  window.handleEmailClick = function(event, emailAddress) {
    console.log('🚨 Emergency handleEmailClick called');
    try {
      event.preventDefault();
      window.location.href = `mailto:${emailAddress}`;
    } catch (error) {
      console.error('Emergency fix error:', error);
    }
  };
  
  console.log('✅ Emergency fix applied');
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeHandleEmailClickFix);
} else {
  initializeHandleEmailClickFix();
}

// Also initialize immediately
initializeHandleEmailClickFix();

console.log('📧 handleEmailClick fix loaded');
