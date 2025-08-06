// Unified Profile Save System - Guaranteed First-Click Save
console.log('🎯 Loading unified profile save system...');

(function() {
  'use strict';
  
  // Flag to prevent multiple initializations
  let unifiedSystemInitialized = false;
  
  // Debug mode
  const DEBUG = true;
  
  function debugLog(message, data = null) {
    if (DEBUG) {
      console.log(`🔹 [UNIFIED PROFILE] ${message}`, data || '');
    }
  }
  
  function initializeUnifiedProfileSystem() {
    if (unifiedSystemInitialized) {
      debugLog('System already initialized, skipping...');
      return;
    }
    
    unifiedSystemInitialized = true;
    debugLog('🚀 Initializing unified profile save system...');
    
    // Clear all existing profile conflicts
    clearProfileConflicts();
    
    // Set up the unified system
    setupUnifiedProfileFunctions();
    
    // Ensure form handlers are properly attached
    attachFormHandlers();
    
    debugLog('✅ Unified profile system fully initialized');
  }
  
  function clearProfileConflicts() {
    debugLog('🧹 Clearing all profile conflicts...');
    
    try {
      // Remove any existing profile intervals
      if (window.profileIntervals) {
        window.profileIntervals.forEach(interval => clearInterval(interval));
        window.profileIntervals = [];
      }
      
      // Clear any existing auto-save timers
      if (window.autoSaveTimer) {
        clearTimeout(window.autoSaveTimer);
        window.autoSaveTimer = null;
      }
      
      // Remove conflicting global flags
      delete window.isComprehensiveSystemActive;
      delete window.profileSystemInitialized;
      delete window.bulletproofSystemActive;
      
      debugLog('✅ All profile conflicts cleared');
      
    } catch (error) {
      debugLog('❌ Error clearing conflicts:', error);
    }
  }
  
  function setupUnifiedProfileFunctions() {
    debugLog('🔧 Setting up unified profile functions...');
    
    // UNIFIED OPEN PROFILE MODAL
    window.openProfileModal = function() {
      debugLog('👤 Opening profile modal (unified)...');
      
      try {
        const modal = document.getElementById('profileModal');
        if (!modal) {
          debugLog('❌ Profile modal not found');
          alert('Profile editor not available. Please refresh the page.');
          return;
        }
        
        if (!window.currentUser) {
          debugLog('❌ No current user');
          alert('Please sign in to edit your profile.');
          return;
        }
        
        // Load user data and populate form
        loadAndPopulateUserData();
        
        // Show modal
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Ensure form handlers are attached
        setTimeout(attachFormHandlers, 100);
        
        debugLog('✅ Profile modal opened successfully');
        
      } catch (error) {
        debugLog('❌ Error opening modal:', error);
        alert('Error opening profile editor. Please try again.');
      }
    };
    
    // UNIFIED CLOSE PROFILE MODAL
    window.closeProfileModal = function() {
      debugLog('❌ Closing profile modal (unified)...');
      
      try {
        const modal = document.getElementById('profileModal');
        if (modal) {
          modal.classList.add('hidden');
          modal.style.display = 'none';
        }
        
        document.body.style.overflow = '';
        
        // Reset form if needed
        const form = document.getElementById('profileForm');
        if (form) {
          // Don't reset - preserve user data in case they want to reopen
          debugLog('Form preserved for potential reopen');
        }
        
        debugLog('✅ Profile modal closed');
        
      } catch (error) {
        debugLog('❌ Error closing modal:', error);
      }
    };
    
    // UNIFIED PROFILE UPDATE - GUARANTEED SAVE
    window.handleProfileUpdate = function(event) {
      debugLog('💾 Handling profile update (unified)...');
      
      // Prevent any default behavior
      if (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      }
      
      try {
        // Show immediate feedback
        const submitBtn = document.querySelector('#profileForm button[type="submit"], button[form="profileForm"]');
        const originalText = submitBtn ? submitBtn.textContent : '';
        
        if (submitBtn) {
          submitBtn.textContent = 'Saving...';
          submitBtn.disabled = true;
          debugLog('Save button disabled with loading text');
        }
        
        // Validate user session
        if (!window.currentUser) {
          restoreButton(submitBtn, originalText);
          alert('Please sign in to update your profile.');
          return false;
        }
        
        // Gather form data
        const profileData = gatherProfileFormData();
        debugLog('Profile data gathered:', profileData);
        
        // Validate data
        const validation = validateProfileData(profileData);
        if (!validation.valid) {
          restoreButton(submitBtn, originalText);
          alert(validation.message);
          return false;
        }
        
        // SAVE IMMEDIATELY - NO DELAYS
        const saveResult = saveProfileDataImmediately(profileData);
        
        if (saveResult.success) {
          // Show success message
          if (window.toastManager) {
            window.toastManager.success('✅ Profile saved successfully!', { duration: 3000 });
          } else {
            alert('✅ Profile saved successfully!');
          }
          
          // Update UI displays
          updateProfileDisplays(profileData);
          
          // Close modal after short delay
          setTimeout(() => {
            window.closeProfileModal();
          }, 1500);
          
          debugLog('✅ Profile save completed successfully');
          
        } else {
          // Show error message
          if (window.toastManager) {
            window.toastManager.error(`❌ ${saveResult.message}`, { duration: 5000 });
          } else {
            alert(`❌ ${saveResult.message}`);
          }
          
          debugLog('❌ Profile save failed:', saveResult.message);
        }
        
        // Restore button
        restoreButton(submitBtn, originalText);
        
      } catch (error) {
        debugLog('❌ Critical error in profile update:', error);
        
        // Restore button
        const submitBtn = document.querySelector('#profileForm button[type="submit"], button[form="profileForm"]');
        restoreButton(submitBtn, 'Save Changes');
        
        if (window.toastManager) {
          window.toastManager.error('❌ An error occurred while saving. Please try again.', { duration: 5000 });
        } else {
          alert('❌ An error occurred while saving. Please try again.');
        }
      }
      
      return false;
    };
    
    debugLog('✅ Unified profile functions set up');
  }
  
  function loadAndPopulateUserData() {
    debugLog('📋 Loading and populating user data...');
    
    try {
      // Get user data from multiple sources
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.id === window.currentUser.id);
      const userData = users[userIndex];
      
      if (!userData) {
        debugLog('❌ User data not found');
        alert('User data not found. Please sign in again.');
        return;
      }
      
      // Also check for saved profile data
      const savedProfile = JSON.parse(localStorage.getItem('visualVibeProfileData') || '{}');
      
      // Merge user data with saved profile data
      const completeData = { ...userData, ...savedProfile };
      
      debugLog('Complete user data to populate:', completeData);
      
      // Populate form fields
      setFieldValue('profileFirstName', completeData.firstName || '');
      setFieldValue('profileLastName', completeData.lastName || '');
      setFieldValue('profileCompanyName', completeData.companyName || '');
      setFieldValue('profilePhone', completeData.phone || '');
      setFieldValue('profileEmail', completeData.email || '');
      
      debugLog('✅ User data loaded and populated');
      
    } catch (error) {
      debugLog('❌ Error loading user data:', error);
    }
  }
  
  function gatherProfileFormData() {
    debugLog('📊 Gathering profile form data...');
    
    const data = {
      firstName: getFieldValue('profileFirstName'),
      lastName: getFieldValue('profileLastName'),
      companyName: getFieldValue('profileCompanyName'),
      phone: getFieldValue('profilePhone'),
      email: getFieldValue('profileEmail'),
      lastUpdated: new Date().toISOString()
    };
    
    // Create full name
    data.name = `${data.firstName} ${data.lastName}`.trim();
    
    debugLog('Form data gathered:', data);
    return data;
  }
  
  function validateProfileData(data) {
    debugLog('✅ Validating profile data...');
    
    // Check required fields
    if (!data.firstName || !data.firstName.trim()) {
      return { valid: false, message: 'First Name is required.' };
    }
    
    if (!data.lastName || !data.lastName.trim()) {
      return { valid: false, message: 'Last Name is required.' };
    }
    
    if (!data.email || !data.email.trim()) {
      return { valid: false, message: 'Email is required.' };
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { valid: false, message: 'Please enter a valid email address.' };
    }
    
    debugLog('✅ Validation passed');
    return { valid: true, message: 'Valid' };
  }
  
  function saveProfileDataImmediately(profileData) {
    debugLog('💾 Saving profile data immediately...');
    
    try {
      // 1. Get current users array
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.id === window.currentUser.id);
      
      if (userIndex === -1) {
        return { success: false, message: 'User not found. Please sign in again.' };
      }
      
      // 2. Check email uniqueness (if email changed)
      const currentUser = users[userIndex];
      if (profileData.email.toLowerCase() !== currentUser.email.toLowerCase()) {
        const emailExists = users.some((u, index) => 
          index !== userIndex && u.email.toLowerCase() === profileData.email.toLowerCase()
        );
        
        if (emailExists) {
          return { success: false, message: 'This email address is already in use by another account.' };
        }
      }
      
      // 3. Update user in users array
      users[userIndex] = {
        ...currentUser,
        ...profileData,
        id: currentUser.id, // Preserve original ID
        updatedAt: new Date().toISOString()
      };
      
      // 4. Save users array
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      debugLog('✅ Users array updated');
      
      // 5. Save dedicated profile data
      localStorage.setItem('visualVibeProfileData', JSON.stringify(profileData));
      debugLog('✅ Profile data saved');
      
      // 6. Update current user session
      window.currentUser = {
        id: users[userIndex].id,
        name: users[userIndex].name,
        email: users[userIndex].email,
        lastActivity: new Date().toISOString()
      };
      
      // 7. Save current session
      localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));
      debugLog('✅ Current user session updated');
      
      // 8. Create backup
      localStorage.setItem('visualVibeProfileBackup', JSON.stringify({
        ...profileData,
        backupTimestamp: new Date().toISOString()
      }));
      debugLog('✅ Profile backup created');
      
      debugLog('🎉 Profile save completed successfully');
      return { success: true, message: 'Profile saved successfully' };
      
    } catch (error) {
      debugLog('❌ Error saving profile data:', error);
      return { success: false, message: 'Failed to save profile data. Please try again.' };
    }
  }
  
  function updateProfileDisplays(profileData) {
    debugLog('🎨 Updating profile displays...');
    
    try {
      // Update auth UI if function exists
      if (typeof window.updateAuthUI === 'function') {
        window.updateAuthUI();
        debugLog('✅ Auth UI updated');
      }
      
      // Update any name displays
      const nameElements = document.querySelectorAll('.user-name, [data-user-name]');
      nameElements.forEach(el => {
        el.textContent = profileData.name;
      });
      
      debugLog('✅ Profile displays updated');
      
    } catch (error) {
      debugLog('❌ Error updating displays:', error);
    }
  }
  
  function attachFormHandlers() {
    debugLog('🔗 Attaching form handlers...');
    
    try {
      const form = document.getElementById('profileForm');
      if (!form) {
        debugLog('❌ Profile form not found');
        return;
      }
      
      // Remove ALL existing event listeners by cloning
      const newForm = form.cloneNode(true);
      form.parentNode.replaceChild(newForm, form);
      
      // Get reference to new form
      const cleanForm = document.getElementById('profileForm');
      
      // Attach our unified handler
      cleanForm.addEventListener('submit', window.handleProfileUpdate);
      cleanForm.onsubmit = window.handleProfileUpdate;
      
      // Also handle submit button specifically
      const submitBtn = document.querySelector('#profileForm button[type="submit"], button[form="profileForm"]');
      if (submitBtn) {
        submitBtn.onclick = function(e) {
          e.preventDefault();
          debugLog('Submit button clicked - triggering save');
          window.handleProfileUpdate(e);
        };
      }
      
      debugLog('✅ Form handlers attached to clean form');
      
    } catch (error) {
      debugLog('❌ Error attaching form handlers:', error);
    }
  }
  
  // Helper functions
  function getFieldValue(fieldId) {
    const field = document.getElementById(fieldId);
    return field ? field.value.trim() : '';
  }
  
  function setFieldValue(fieldId, value) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.value = value || '';
    }
  }
  
  function restoreButton(button, originalText) {
    if (button) {
      button.textContent = originalText || 'Save Changes';
      button.disabled = false;
    }
  }
  
  // Test function
  window.testUnifiedProfile = function() {
    debugLog('🧪 Testing unified profile system...');
    
    const tests = [
      { name: 'openProfileModal exists', test: () => typeof window.openProfileModal === 'function' },
      { name: 'closeProfileModal exists', test: () => typeof window.closeProfileModal === 'function' },
      { name: 'handleProfileUpdate exists', test: () => typeof window.handleProfileUpdate === 'function' },
      { name: 'Profile modal exists', test: () => !!document.getElementById('profileModal') },
      { name: 'Profile form exists', test: () => !!document.getElementById('profileForm') }
    ];
    
    const results = tests.map(test => {
      const passed = test.test();
      debugLog(`${passed ? '✅' : '❌'} ${test.name}`);
      return passed;
    });
    
    const passedCount = results.filter(r => r).length;
    debugLog(`🧪 Test Results: ${passedCount}/${tests.length} tests passed`);
    
    if (window.currentUser && passedCount === tests.length) {
      debugLog('🧪 Opening modal for visual test...');
      window.openProfileModal();
    }
  };
  
  // Initialize immediately
  initializeUnifiedProfileSystem();
  
  // Also initialize after page loads to override any conflicting scripts
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeUnifiedProfileSystem);
  }
  
  // Initialize with delays to ensure we override any other scripts
  setTimeout(initializeUnifiedProfileSystem, 500);
  setTimeout(initializeUnifiedProfileSystem, 2000);
  setTimeout(initializeUnifiedProfileSystem, 5000);
  
  // Make system available globally
  window.initializeUnifiedProfileSystem = initializeUnifiedProfileSystem;
  
})();

console.log('🎯 Unified Profile Save System loaded - Guaranteed first-click save!');
