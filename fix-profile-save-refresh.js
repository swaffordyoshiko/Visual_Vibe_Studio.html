// Fix profile modal Save Changes button page refresh issue
console.log('🔄 Loading profile save refresh fix...');

function preventProfileFormRefresh() {
  console.log('🛑 Setting up form refresh prevention...');
  
  // Wait for modal to exist, then fix form
  const checkForModal = setInterval(() => {
    const modal = document.getElementById('profileModal');
    const form = document.getElementById('profileForm');
    
    if (modal && form) {
      clearInterval(checkForModal);
      
      console.log('✅ Profile modal and form found, applying refresh fix...');
      
      // Override form submission completely
      form.onsubmit = function(e) {
        console.log('🛑 Form submit intercepted - preventing page refresh');
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        // Call save function instead
        saveProfileDataDirectly();
        return false;
      };
      
      // Also override any submit buttons
      const submitButtons = form.querySelectorAll('button[type="submit"], input[type="submit"]');
      submitButtons.forEach(button => {
        button.onclick = function(e) {
          console.log('🛑 Submit button click intercepted');
          e.preventDefault();
          e.stopPropagation();
          saveProfileDataDirectly();
          return false;
        };
      });
      
      // Find Save Changes button by ID and text content
      const saveBtn = document.getElementById('saveProfileBtn') || 
                     form.querySelector('button:contains("Save Changes")') ||
                     form.querySelector('button[onclick*="save"]') ||
                     Array.from(form.querySelectorAll('button')).find(btn => 
                       btn.textContent.includes('Save') || btn.textContent.includes('💾')
                     );
      
      if (saveBtn) {
        console.log('✅ Found Save Changes button, fixing...');
        
        // Remove all existing handlers
        saveBtn.onclick = null;
        saveBtn.removeAttribute('onclick');
        
        // Add new safe handler
        saveBtn.addEventListener('click', function(e) {
          console.log('💾 Save Changes button clicked (safe handler)');
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          
          saveProfileDataDirectly();
          return false;
        });
        
        // Change button type to prevent form submission
        saveBtn.setAttribute('type', 'button');
        
        console.log('✅ Save Changes button fixed - no more page refresh');
      } else {
        console.warn('⚠️ Save Changes button not found');
      }
    }
  }, 500);
  
  // Stop checking after 10 seconds
  setTimeout(() => {
    clearInterval(checkForModal);
  }, 10000);
}

function saveProfileDataDirectly() {
  console.log('💾 Saving profile data directly...');
  
  try {
    // Get form elements
    const fullName = document.getElementById('profileFullName')?.value || '';
    const email = document.getElementById('profileEmail')?.value || '';
    const phone = document.getElementById('profilePhone')?.value || '';
    const company = document.getElementById('profileCompany')?.value || '';
    const location = document.getElementById('profileLocation')?.value || '';
    const emailNotifications = document.getElementById('emailNotifications')?.checked || false;
    const smsNotifications = document.getElementById('smsNotifications')?.checked || false;
    const marketingEmails = document.getElementById('marketingEmails')?.checked || false;
    
    // Create profile data object
    const profileData = {
      fullName,
      email,
      phone,
      company,
      location,
      emailNotifications,
      smsNotifications,
      marketingEmails,
      lastUpdated: new Date().toISOString()
    };
    
    console.log('📊 Profile data to save:', profileData);
    
    // Save to localStorage
    localStorage.setItem('visualVibeProfile', JSON.stringify(profileData));
    
    // Update initials
    updateInitials(fullName);
    
    // Show success message
    if (window.toastManager) {
      window.toastManager.success('✅ Profile saved successfully!', { duration: 3000 });
    } else {
      // Create temporary success notification
      const notification = document.createElement('div');
      notification.innerHTML = '✅ Profile saved successfully!';
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10B981;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 9999;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      `;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
    
    // Close modal after successful save
    setTimeout(() => {
      closeProfileModalSafely();
    }, 1000);
    
    console.log('✅ Profile saved successfully without page refresh');
    
  } catch (error) {
    console.error('❌ Error saving profile:', error);
    
    if (window.toastManager) {
      window.toastManager.error('❌ Error saving profile. Please try again.', { duration: 3000 });
    } else {
      alert('Error saving profile. Please try again.');
    }
  }
}

function updateInitials(fullName) {
  try {
    const initialsEl = document.getElementById('profileInitials');
    if (initialsEl && fullName && fullName.trim()) {
      const names = fullName.trim().split(' ').filter(name => name.length > 0);
      let initials = 'VS';
      
      if (names.length >= 2) {
        initials = (names[0][0] + names[names.length - 1][0]).toUpperCase();
      } else if (names.length === 1 && names[0].length >= 1) {
        initials = names[0].substring(0, Math.min(2, names[0].length)).toUpperCase();
      }
      
      initialsEl.textContent = initials;
      console.log(`✅ Updated initials to: ${initials}`);
    }
  } catch (error) {
    console.error('❌ Error updating initials:', error);
  }
}

function closeProfileModalSafely() {
  console.log('🚪 Closing profile modal safely...');
  
  try {
    const modal = document.getElementById('profileModal');
    if (modal) {
      modal.style.transition = 'all 0.3s ease';
      modal.style.opacity = '0';
      modal.style.transform = 'scale(0.9)';
      
      setTimeout(() => {
        if (modal.parentNode) {
          modal.remove();
        }
        // Restore body scroll
        document.body.style.overflow = '';
        console.log('✅ Profile modal closed safely');
      }, 300);
    }
  } catch (error) {
    console.error('❌ Error closing modal:', error);
  }
}

// Override openProfileModal to apply fix immediately
function enhanceOpenProfileModal() {
  const originalOpenProfileModal = window.openProfileModal;
  
  window.openProfileModal = function() {
    console.log('👤 Enhanced openProfileModal with refresh prevention...');
    
    // Call original function
    if (typeof originalOpenProfileModal === 'function') {
      originalOpenProfileModal();
    }
    
    // Apply refresh prevention after modal opens
    setTimeout(() => {
      preventProfileFormRefresh();
    }, 100);
    
    // Backup application
    setTimeout(() => {
      preventProfileFormRefresh();
    }, 500);
  };
}

// Initialize the fix
function initializeProfileSaveRefreshFix() {
  console.log('🚀 Initializing profile save refresh fix...');
  
  // Enhance the openProfileModal function
  enhanceOpenProfileModal();
  
  // Also apply fix to any existing modal
  preventProfileFormRefresh();
  
  // Make functions globally available
  window.saveProfileDataDirectly = saveProfileDataDirectly;
  window.preventProfileFormRefresh = preventProfileFormRefresh;
  
  console.log('✅ Profile save refresh fix initialized');
}

// Test function
window.testProfileSaveRefreshFix = function() {
  console.log('🧪 Testing profile save refresh fix...');
  
  const modal = document.getElementById('profileModal');
  const form = document.getElementById('profileForm');
  
  console.log('Modal exists:', !!modal);
  console.log('Form exists:', !!form);
  
  if (form) {
    console.log('Form onsubmit:', form.onsubmit);
    console.log('Form action:', form.action);
    console.log('Form method:', form.method);
  }
  
  const saveBtn = document.getElementById('saveProfileBtn');
  console.log('Save button exists:', !!saveBtn);
  if (saveBtn) {
    console.log('Save button type:', saveBtn.getAttribute('type'));
    console.log('Save button onclick:', saveBtn.onclick);
  }
};

// Initialize immediately
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeProfileSaveRefreshFix);
} else {
  initializeProfileSaveRefreshFix();
}

setTimeout(initializeProfileSaveRefreshFix, 1000);

console.log('🔄 Profile save refresh fix loaded - no more page refresh on save');
