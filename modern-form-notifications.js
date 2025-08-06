// Modern Form Notifications Enhancement
// Adds real-time toast notifications throughout the form for better UX

console.log('🎯 Loading modern form notifications...');

document.addEventListener('DOMContentLoaded', function() {
  
  // Enhanced form interaction feedback
  function initializeFormNotifications() {
    console.log('🔧 Initializing form notifications...');
    
    // Add real-time feedback for all form fields
    const formFields = document.querySelectorAll('#orderForm input, #orderForm select');
    
    if (formFields.length === 0) {
      console.log('⏰ Form not ready yet, retrying...');
      setTimeout(initializeFormNotifications, 500);
      return;
    }
    
    formFields.forEach(field => {
      // Add focus feedback
      field.addEventListener('focus', function() {
        if (window.toastManager) {
          const fieldName = getFieldDisplayName(this);
          window.toastManager.info(`✏️ Editing ${fieldName}...`);
        }
      });
      
      // Add completion feedback
      field.addEventListener('blur', function() {
        if (this.value.trim()) {
          handleFieldCompletion(this);
        }
      });
      
      // Add input validation feedback for email
      if (field.type === 'email') {
        field.addEventListener('input', function() {
          handleEmailValidation(this);
        });
      }
      
      // Add service selection feedback
      if (field.name === 'services') {
        field.addEventListener('change', function() {
          handleServiceSelection(this);
        });
      }
      
      // Add visual feedback for text inputs
      if (field.type === 'text' || field.type === 'email' || field.type === 'tel') {
        field.addEventListener('input', function() {
          if (this.value.length >= 2) {
            this.style.borderColor = '#10b981';
            this.style.boxShadow = '0 0 5px rgba(16, 185, 129, 0.3)';
          } else {
            this.style.borderColor = '#e5e7eb';
            this.style.boxShadow = 'none';
          }
        });
      }
    });
    
    // Add form completion progress tracking
    const updateProgress = () => {
      const requiredFields = document.querySelectorAll('#orderForm [required]');
      const completedFields = Array.from(requiredFields).filter(field => {
        if (field.type === 'email') {
          return field.value.includes('@') && field.value.includes('.');
        }
        if (field.name === 'services') {
          return field.selectedOptions.length > 0;
        }
        return field.value.trim() !== '';
      });
      
      const progress = Math.round((completedFields.length / requiredFields.length) * 100);
      handleProgressUpdate(progress, completedFields.length, requiredFields.length);
    };
    
    // Check progress on any field change
    formFields.forEach(field => {
      field.addEventListener('change', updateProgress);
      field.addEventListener('blur', updateProgress);
    });
    
    // Enhanced submit button feedback
    const submitBtn = document.getElementById('submitOrderBtn');
    if (submitBtn) {
      submitBtn.addEventListener('click', function() {
        if (window.toastManager) {
          window.toastManager.info('🚀 Processing your order...');
        }
        // Add loading animation
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 150);
      });
    }
    
    // Enhanced copy button feedback
    const copyButtons = document.querySelectorAll('button[onclick*="copyToClipboard"]');
    copyButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        if (window.toastManager) {
          setTimeout(() => {
            window.toastManager.success('Ready to send your logo! 🚀');
          }, 500);
        }
      });
    });
    
    console.log('✅ Form notifications initialized!');
  }
  
  function getFieldDisplayName(field) {
    const fieldNames = {
      'firstName': 'first name',
      'lastName': 'last name', 
      'businessName': 'business name',
      'industry': 'industry',
      'email': 'email address',
      'phone': 'phone number',
      'dueDate': 'completion date',
      'services': 'services'
    };
    return fieldNames[field.name] || field.getAttribute('placeholder') || field.name;
  }
  
  function handleFieldCompletion(field) {
    const fieldType = field.name;
    let message = '✅ Field completed!';
    let isValid = true;
    
    switch(fieldType) {
      case 'firstName': 
        message = '✅ First name saved!'; 
        break;
      case 'lastName': 
        message = '✅ Last name saved!'; 
        break;
      case 'businessName': 
        message = '🏢 Business name saved!'; 
        break;
      case 'industry': 
        message = '🏭 Industry saved!'; 
        break;
      case 'email': 
        if (field.value.includes('@') && field.value.includes('.')) {
          message = '📧 Valid email saved!';
          field.style.borderColor = '#10b981';
        } else {
          message = '⚠️ Please enter a valid email';
          field.style.borderColor = '#ef4444';
          isValid = false;
        }
        break;
      case 'phone': 
        message = '📱 Phone number saved!'; 
        break;
      case 'dueDate': 
        message = '📅 Completion date set!'; 
        break;
    }
    
    if (window.toastManager) {
      if (isValid) {
        window.toastManager.success(message);
        field.style.borderColor = '#10b981';
        field.style.boxShadow = '0 0 5px rgba(16, 185, 129, 0.3)';
      } else {
        window.toastManager.error(message);
      }
    }
  }
  
  function handleEmailValidation(field) {
    if (field.value.length > 0) {
      if (field.value.includes('@') && field.value.includes('.')) {
        field.style.borderColor = '#10b981';
        field.style.boxShadow = '0 0 5px rgba(16, 185, 129, 0.3)';
      } else if (field.value.includes('@')) {
        field.style.borderColor = '#f59e0b';
        field.style.boxShadow = '0 0 5px rgba(245, 158, 11, 0.3)';
      } else {
        field.style.borderColor = '#ef4444';
        field.style.boxShadow = '0 0 5px rgba(239, 68, 68, 0.3)';
      }
    } else {
      field.style.borderColor = '#e5e7eb';
      field.style.boxShadow = 'none';
    }
  }
  
  function handleServiceSelection(field) {
    const selectedCount = field.selectedOptions.length;
    if (selectedCount > 0) {
      let totalPrice = 0;
      Array.from(field.selectedOptions).forEach(option => {
        totalPrice += parseInt(option.getAttribute('data-price')) || 0;
      });
      
      if (window.toastManager) {
        window.toastManager.success(`🎨 ${selectedCount} service(s) selected! Estimated total: $${totalPrice}`);
      }
      field.style.borderColor = '#10b981';
      field.style.boxShadow = '0 0 5px rgba(16, 185, 129, 0.3)';
    } else {
      field.style.borderColor = '#e5e7eb';
      field.style.boxShadow = 'none';
    }
  }
  
  function handleProgressUpdate(progress, completed, total) {
    if (progress === 100) {
      if (window.toastManager) {
        window.toastManager.success('🎉 Form completed! Ready to submit your order!');
      }
      // Add visual indicator to submit button
      const submitBtn = document.getElementById('submitOrderBtn');
      if (submitBtn) {
        submitBtn.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.5)';
        submitBtn.style.animation = 'pulse 2s infinite';
        
        // Add CSS animation if not exists
        if (!document.getElementById('pulse-animation')) {
          const style = document.createElement('style');
          style.id = 'pulse-animation';
          style.textContent = `
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.05); }
              100% { transform: scale(1); }
            }
          `;
          document.head.appendChild(style);
        }
      }
    } else if (progress >= 75) {
      if (window.toastManager) {
        window.toastManager.info(`📝 Almost done! ${completed}/${total} fields complete (${progress}%)`);
      }
    } else if (progress >= 50) {
      if (window.toastManager) {
        window.toastManager.info(`📝 Great progress! ${completed}/${total} fields complete (${progress}%)`);
      }
    } else if (progress >= 25 && completed > 1) {
      if (window.toastManager) {
        window.toastManager.info(`📝 Good start! ${completed}/${total} fields complete (${progress}%)`);
      }
    }
  }
  
  // Initialize with delay to ensure DOM is ready
  setTimeout(initializeFormNotifications, 100);
});

console.log('✅ Modern form notifications script loaded!');
