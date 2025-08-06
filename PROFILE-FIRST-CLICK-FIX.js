// PROFILE FIRST-CLICK SAVE FIX - Load this to fix the profile save issue
console.log('🎯 PROFILE FIRST-CLICK SAVE FIX - Loading...');

(function() {
  'use strict';
  
  // Disable ALL conflicting profile systems immediately
  console.log('🚫 Disabling all conflicting profile systems...');
  
  // Clear any existing intervals and timers
  if (window.profileIntervals) {
    window.profileIntervals.forEach(interval => clearInterval(interval));
    window.profileIntervals = [];
  }
  
  if (window.autoSaveTimer) {
    clearTimeout(window.autoSaveTimer);
    window.autoSaveTimer = null;
  }
  
  // Set flags to prevent other systems from initializing
  window.unifiedProfileSystemActive = true;
  window.isComprehensiveSystemActive = false;
  window.profileSystemInitialized = false;
  window.bulletproofSystemActive = false;
  
  // Define the DEFINITIVE profile save system
  function createDefinitiveProfileSystem() {
    console.log('🎯 Creating definitive profile save system...');
    
    // DEFINITIVE OPEN PROFILE MODAL
    window.openProfileModal = function() {
      console.log('👤 [DEFINITIVE] Opening profile modal...');
      
      try {
        const modal = document.getElementById('profileModal');
        if (!modal) {
          alert('Profile editor not available. Please refresh the page.');
          return;
        }
        
        if (!window.currentUser) {
          alert('Please sign in to edit your profile.');
          return;
        }
        
        // Load user data
        loadUserDataDefinitive();
        
        // Show modal
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Attach form handler after modal is shown
        setTimeout(attachDefinitiveFormHandler, 200);
        
        console.log('✅ [DEFINITIVE] Profile modal opened');
        
      } catch (error) {
        console.error('❌ Error opening profile modal:', error);
        alert('Error opening profile editor. Please try again.');
      }
    };
    
    // DEFINITIVE CLOSE PROFILE MODAL  
    window.closeProfileModal = function() {
      console.log('❌ [DEFINITIVE] Closing profile modal...');
      
      const modal = document.getElementById('profileModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
      }
      document.body.style.overflow = '';
    };
    
    // DEFINITIVE PROFILE UPDATE - GUARANTEED FIRST-CLICK SAVE
    window.handleProfileUpdate = function(event) {
      console.log('💾 [DEFINITIVE] Processing profile save - FIRST CLICK GUARANTEED...');
      
      // Prevent all default behaviors
      if (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      }
      
      try {
        // Get save button and show loading state
        const saveBtn = document.querySelector('#profileForm button[type="submit"], button[form="profileForm"]');
        const originalBtnText = saveBtn ? saveBtn.textContent : '';
        
        if (saveBtn) {
          saveBtn.textContent = 'Saving...';
          saveBtn.disabled = true;
          console.log('💾 Save button set to loading state');
        }
        
        // Validate user session
        if (!window.currentUser) {
          restoreSaveButton(saveBtn, originalBtnText);
          alert('Please sign in to update your profile.');
          return false;
        }
        
        // Gather form data
        const formData = gatherFormDataDefinitive();
        console.log('📊 Form data gathered:', formData);
        
        // Validate form data
        const validation = validateFormDataDefinitive(formData);
        if (!validation.isValid) {
          restoreSaveButton(saveBtn, originalBtnText);
          alert(validation.error);
          return false;
        }
        
        // SAVE IMMEDIATELY WITH BULLETPROOF METHOD
        const saveResult = saveProfileDefinitive(formData);
        
        if (saveResult.success) {
          console.log('🎉 Profile saved successfully on first click!');
          
          // Show success message
          if (window.toastManager) {
            window.toastManager.success('✅ Profile saved successfully!', { duration: 3000 });
          } else {
            alert('✅ Profile saved successfully!');
          }
          
          // Update UI elements
          updateUIAfterSave(formData);
          
          // Close modal after delay
          setTimeout(() => {
            window.closeProfileModal();
            restoreSaveButton(saveBtn, originalBtnText);
          }, 2000);
          
        } else {
          console.error('❌ Profile save failed:', saveResult.error);
          
          // Show error message
          if (window.toastManager) {
            window.toastManager.error(`❌ ${saveResult.error}`, { duration: 5000 });
          } else {
            alert(`❌ ${saveResult.error}`);
          }
          
          restoreSaveButton(saveBtn, originalBtnText);
        }
        
      } catch (error) {
        console.error('❌ Critical error in definitive profile save:', error);
        
        const saveBtn = document.querySelector('#profileForm button[type="submit"], button[form="profileForm"]');
        restoreSaveButton(saveBtn, 'Save Changes');
        
        if (window.toastManager) {
          window.toastManager.error('❌ An error occurred. Please try again.', { duration: 5000 });
        } else {
          alert('❌ An error occurred. Please try again.');
        }
      }
      
      return false;
    };
  }
  
  function loadUserDataDefinitive() {
    console.log('📋 [DEFINITIVE] Loading user data...');
    
    try {
      // Get user from storage
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.id === window.currentUser.id);
      const userData = users[userIndex];
      
      if (!userData) {
        alert('User data not found. Please sign in again.');
        return;
      }
      
      // Get any saved profile data
      const savedProfile = JSON.parse(localStorage.getItem('visualVibeProfileData') || '{}');
      
      // Merge data
      const completeData = { ...userData, ...savedProfile };
      
      // Populate form
      setValue('profileFirstName', completeData.firstName || '');
      setValue('profileLastName', completeData.lastName || '');
      setValue('profileCompanyName', completeData.companyName || '');
      setValue('profilePhone', completeData.phone || '');
      setValue('profileEmail', completeData.email || '');
      
      console.log('✅ [DEFINITIVE] User data loaded and form populated');
      
    } catch (error) {
      console.error('❌ Error loading user data:', error);
    }
  }
  
  function attachDefinitiveFormHandler() {
    console.log('🔗 [DEFINITIVE] Attaching definitive form handler...');
    
    try {
      const form = document.getElementById('profileForm');
      if (!form) {
        console.error('❌ Profile form not found');
        return;
      }
      
      // Remove ALL existing event listeners by cloning the form
      const newForm = form.cloneNode(true);
      form.parentNode.replaceChild(newForm, form);
      
      // Get the clean form reference
      const cleanForm = document.getElementById('profileForm');
      
      // Attach our definitive handler
      cleanForm.addEventListener('submit', window.handleProfileUpdate);
      cleanForm.onsubmit = window.handleProfileUpdate;
      
      // Also handle save button click directly
      const saveBtn = cleanForm.querySelector('button[type="submit"]') || 
                      document.querySelector('button[form="profileForm"]');
      
      if (saveBtn) {
        saveBtn.onclick = function(e) {
          e.preventDefault();
          console.log('💾 Save button clicked - triggering definitive save');
          window.handleProfileUpdate(e);
        };
      }
      
      console.log('✅ [DEFINITIVE] Form handler attached successfully');
      
    } catch (error) {
      console.error('❌ Error attaching form handler:', error);
    }
  }
  
  function gatherFormDataDefinitive() {
    console.log('📊 [DEFINITIVE] Gathering form data...');
    
    const data = {
      firstName: getValue('profileFirstName'),
      lastName: getValue('profileLastName'),
      companyName: getValue('profileCompanyName'),
      phone: getValue('profilePhone'),
      email: getValue('profileEmail'),
      lastUpdated: new Date().toISOString()
    };
    
    // Create full name
    data.name = `${data.firstName} ${data.lastName}`.trim();
    
    return data;
  }
  
  function validateFormDataDefinitive(data) {
    console.log('✅ [DEFINITIVE] Validating form data...');
    
    if (!data.firstName?.trim()) {
      return { isValid: false, error: 'First Name is required.' };
    }
    
    if (!data.lastName?.trim()) {
      return { isValid: false, error: 'Last Name is required.' };
    }
    
    if (!data.email?.trim()) {
      return { isValid: false, error: 'Email is required.' };
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { isValid: false, error: 'Please enter a valid email address.' };
    }
    
    return { isValid: true };
  }
  
  function saveProfileDefinitive(profileData) {
    console.log('💾 [DEFINITIVE] Saving profile with bulletproof method...');
    
    try {
      // 1. Get users array
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.id === window.currentUser.id);
      
      if (userIndex === -1) {
        return { success: false, error: 'User not found. Please sign in again.' };
      }
      
      // 2. Check email uniqueness if email changed
      const currentUser = users[userIndex];
      if (profileData.email.toLowerCase() !== currentUser.email.toLowerCase()) {
        const emailExists = users.some((u, index) => 
          index !== userIndex && u.email.toLowerCase() === profileData.email.toLowerCase()
        );
        
        if (emailExists) {
          return { success: false, error: 'This email address is already in use.' };
        }
      }
      
      // 3. Update user in users array
      users[userIndex] = {
        ...currentUser,
        ...profileData,
        id: currentUser.id, // Preserve ID
        updatedAt: new Date().toISOString()
      };
      
      // 4. Save all data with multiple redundancy
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      localStorage.setItem('visualVibeProfileData', JSON.stringify(profileData));
      localStorage.setItem('visualVibeProfileBackup', JSON.stringify({
        ...profileData,
        backupTime: new Date().toISOString()
      }));
      
      // 5. Update current user session
      window.currentUser = {
        id: users[userIndex].id,
        name: users[userIndex].name,
        email: users[userIndex].email,
        lastActivity: new Date().toISOString()
      };
      localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));
      
      console.log('🎉 [DEFINITIVE] Profile saved successfully with all redundancy');
      return { success: true };
      
    } catch (error) {
      console.error('❌ Error in definitive save:', error);
      return { success: false, error: 'Failed to save profile. Please try again.' };
    }
  }
  
  function updateUIAfterSave(profileData) {
    console.log('🎨 [DEFINITIVE] Updating UI after save...');
    
    try {
      // Update auth UI if available
      if (typeof window.updateAuthUI === 'function') {
        window.updateAuthUI();
      }
      
      console.log('✅ [DEFINITIVE] UI updated after save');
      
    } catch (error) {
      console.error('❌ Error updating UI:', error);
    }
  }
  
  // Helper functions
  function getValue(fieldId) {
    const field = document.getElementById(fieldId);
    return field ? field.value.trim() : '';
  }
  
  function setValue(fieldId, value) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.value = value || '';
    }
  }
  
  function restoreSaveButton(button, originalText) {
    if (button) {
      button.textContent = originalText || 'Save Changes';
      button.disabled = false;
    }
  }
  
  // Test function
  window.testDefinitiveProfile = function() {
    console.log('🧪 Testing definitive profile system...');
    
    const tests = [
      { name: 'openProfileModal function', test: () => typeof window.openProfileModal === 'function' },
      { name: 'closeProfileModal function', test: () => typeof window.closeProfileModal === 'function' },
      { name: 'handleProfileUpdate function', test: () => typeof window.handleProfileUpdate === 'function' },
      { name: 'Profile modal element', test: () => !!document.getElementById('profileModal') },
      { name: 'Profile form element', test: () => !!document.getElementById('profileForm') }
    ];
    
    tests.forEach(test => {
      const passed = test.test();
      console.log(`${passed ? '✅' : '❌'} ${test.name}: ${passed}`);
    });
    
    if (window.currentUser) {
      console.log('🧪 Opening profile modal for visual test...');
      window.openProfileModal();
    }
  };
  
  // Initialize the definitive system
  console.log('🎯 Initializing definitive profile system...');
  createDefinitiveProfileSystem();
  
  // Initialize on DOM ready if needed
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createDefinitiveProfileSystem);
  }
  
  // Initialize with delays to override any conflicting scripts
  setTimeout(createDefinitiveProfileSystem, 500);
  setTimeout(createDefinitiveProfileSystem, 2000);
  setTimeout(createDefinitiveProfileSystem, 5000);
  
  console.log('🎯 DEFINITIVE Profile First-Click Save Fix loaded and active!');
  console.log('💡 To test: Use window.testDefinitiveProfile() or just open the profile modal and try saving');
  
})();
