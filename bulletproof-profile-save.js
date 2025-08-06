// Bulletproof Profile Save System - No More Lost Data!
console.log('🛡️ Loading bulletproof profile save system...');

(function() {
  'use strict';
  
  // Debug mode - set to false in production
  const DEBUG_MODE = true;
  
  function debugLog(message, data = null) {
    if (DEBUG_MODE) {
      console.log(`🔍 [PROFILE DEBUG] ${message}`, data || '');
    }
  }
  
  // Storage keys for redundancy
  const STORAGE_KEYS = {
    profile: 'visualVibeProfileData',
    users: 'visualVibeUsers',
    session: 'visualVibeUser',
    backup: 'profileBackup'
  };
  
  // Bulletproof data gathering
  function gatherProfileData() {
    debugLog('Gathering profile data from form...');
    
    const data = {};
    
    // Get all possible profile fields
    const fields = [
      { id: 'profileFullName', key: 'fullName' },
      { id: 'profileEmail', key: 'email' },
      { id: 'profilePhone', key: 'phone' },
      { id: 'profileCompany', key: 'company' },
      { id: 'profileLocation', key: 'location' },
      { id: 'profileFirstName', key: 'firstName' },
      { id: 'profileLastName', key: 'lastName' },
      { id: 'profileCompanyName', key: 'companyName' }
    ];
    
    fields.forEach(field => {
      const element = document.getElementById(field.id);
      if (element) {
        data[field.key] = element.value.trim();
        debugLog(`Found field ${field.id}:`, data[field.key]);
      } else {
        debugLog(`Field ${field.id} not found`);
      }
    });
    
    // Get checkboxes
    const checkboxes = [
      { id: 'emailNotifications', key: 'emailNotifications' },
      { id: 'smsNotifications', key: 'smsNotifications' },
      { id: 'marketingEmails', key: 'marketingEmails' }
    ];
    
    checkboxes.forEach(checkbox => {
      const element = document.getElementById(checkbox.id);
      if (element) {
        data[checkbox.key] = element.checked;
        debugLog(`Found checkbox ${checkbox.id}:`, data[checkbox.key]);
      } else {
        debugLog(`Checkbox ${checkbox.id} not found`);
      }
    });
    
    // Add metadata
    data.lastUpdated = new Date().toISOString();
    data.version = '2.0';
    
    debugLog('Complete profile data gathered:', data);
    return data;
  }
  
  // Bulletproof validation
  function validateProfileData(data) {
    debugLog('Validating profile data...');
    
    const errors = [];
    
    // Check required fields
    if (!data.fullName && !data.firstName) {
      errors.push('Name is required');
    }
    
    if (!data.email) {
      errors.push('Email is required');
    } else if (!isValidEmail(data.email)) {
      errors.push('Valid email is required');
    }
    
    if (errors.length > 0) {
      debugLog('Validation errors:', errors);
      alert('Please fix these errors:\n��� ' + errors.join('\n• '));
      return false;
    }
    
    debugLog('Validation passed ✅');
    return true;
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Bulletproof save with multiple redundancy
  function saveProfileDataBulletproof(data) {
    debugLog('Starting bulletproof save process...');

    let saveSuccess = false;
    const saveResults = {};

    try {
      // 1. Save to main profile storage
      try {
        localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(data));
        saveResults.profileStorage = true;
        debugLog('✅ Saved to profile storage');
      } catch (e) {
        saveResults.profileStorage = false;
        debugLog('❌ Failed to save to profile storage:', e);
      }

      // 1.5. Also save profile picture if it exists
      try {
        const savedPicture = localStorage.getItem('visualVibeProfilePicture');
        if (savedPicture) {
          data.profilePicture = savedPicture;
          debugLog('✅ Profile picture included in save data');
        }
      } catch (e) {
        debugLog('❌ Failed to include profile picture:', e);
      }
      
      // 2. Save backup copy
      try {
        localStorage.setItem(STORAGE_KEYS.backup, JSON.stringify(data));
        saveResults.backup = true;
        debugLog('✅ Saved backup copy');
      } catch (e) {
        saveResults.backup = false;
        debugLog('❌ Failed to save backup:', e);
      }
      
      // 3. Update current user if logged in
      if (window.currentUser && window.currentUser.id) {
        try {
          const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '[]');
          const userIndex = users.findIndex(u => u.id === window.currentUser.id);
          
          if (userIndex !== -1) {
            // Update existing user
            users[userIndex] = {
              ...users[userIndex],
              ...data,
              name: data.fullName || `${data.firstName} ${data.lastName}`,
              updatedAt: new Date().toISOString()
            };
            
            localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
            saveResults.userStorage = true;
            debugLog('✅ Updated user in users array');
            
            // Update current session
            window.currentUser = {
              ...window.currentUser,
              name: data.fullName || `${data.firstName} ${data.lastName}`,
              email: data.email
            };
            
            localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(window.currentUser));
            saveResults.session = true;
            debugLog('✅ Updated current session');
            
          } else {
            saveResults.userStorage = false;
            debugLog('❌ User not found in users array');
          }
        } catch (e) {
          saveResults.userStorage = false;
          debugLog('❌ Failed to update user storage:', e);
        }
      }
      
      // 4. Save to additional fallback keys
      const fallbackKeys = ['userProfile', 'profileData', 'customerProfile'];
      fallbackKeys.forEach(key => {
        try {
          localStorage.setItem(key, JSON.stringify(data));
          debugLog(`✅ Saved to fallback key: ${key}`);
        } catch (e) {
          debugLog(`❌ Failed to save to ${key}:`, e);
        }
      });
      
      // Check if at least one save method worked
      saveSuccess = saveResults.profileStorage || saveResults.backup || saveResults.userStorage;
      
      debugLog('Save results:', saveResults);
      debugLog('Overall save success:', saveSuccess);
      
      return saveSuccess;
      
    } catch (error) {
      debugLog('❌ Critical error in save process:', error);
      return false;
    }
  }

  // Update all profile displays (pictures and names)
  function updateAllProfileDisplays(profileData) {
    debugLog('Updating all profile displays...');

    try {
      // Update profile pictures
      updateProfilePictureDisplays();

      // Update profile initials
      if (profileData.fullName || profileData.firstName) {
        const fullName = profileData.fullName || `${profileData.firstName} ${profileData.lastName}`;
        updateProfileInitials(fullName);
      }

      // Update profile name displays
      updateProfileNameDisplays(profileData);

      debugLog('✅ All profile displays updated');

    } catch (error) {
      debugLog('❌ Error updating profile displays:', error);
    }
  }

  // Update profile picture displays everywhere
  function updateProfilePictureDisplays() {
    debugLog('Updating profile picture displays...');

    try {
      const savedPicture = localStorage.getItem('visualVibeProfilePicture');

      if (savedPicture) {
        debugLog('✅ Found saved profile picture, updating displays');

        // Update main profile button in header
        const profileButton = document.querySelector('button[onclick*="openProfileModal"]');
        if (profileButton) {
          // Replace SVG with image
          profileButton.innerHTML = `
            <div class="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
              <img src="${savedPicture}" alt="Profile" class="w-full h-full object-cover">
            </div>
          `;
          debugLog('✅ Updated main profile button with picture');
        }

        // Update any other profile picture containers
        const profileImages = document.querySelectorAll('.profile-picture, [data-profile-picture]');
        profileImages.forEach(img => {
          if (img.tagName === 'IMG') {
            img.src = savedPicture;
          } else {
            img.style.backgroundImage = `url(${savedPicture})`;
            img.style.backgroundSize = 'cover';
            img.style.backgroundPosition = 'center';
          }
        });

        // Update profile icons in any modals or other areas
        const profileIcons = document.querySelectorAll('.w-8.h-8.rounded-full, .w-10.h-10.rounded-full');
        profileIcons.forEach(icon => {
          if (icon.querySelector('svg')) {
            icon.innerHTML = `<img src="${savedPicture}" alt="Profile" class="w-full h-full object-cover rounded-full">`;
          }
        });

        debugLog('✅ Updated all profile picture displays');

      } else {
        debugLog('No saved profile picture found');

        // Restore to initials if no picture
        const profileButton = document.querySelector('button[onclick*="openProfileModal"]');
        if (profileButton && window.currentUser) {
          const initials = getInitials(window.currentUser.name);
          profileButton.innerHTML = `
            <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              ${initials}
            </div>
          `;
          debugLog('✅ Restored profile button to initials');
        }
      }

    } catch (error) {
      debugLog('❌ Error updating profile pictures:', error);
    }
  }

  // Update profile initials
  function updateProfileInitials(fullName) {
    if (!fullName) return;

    const initials = getInitials(fullName);
    debugLog(`Updating profile initials to: ${initials}`);

    // Update all initial displays
    const initialElements = document.querySelectorAll('#profileInitials, .profile-initials, [data-profile-initials]');
    initialElements.forEach(el => {
      el.textContent = initials;
    });

    debugLog(`✅ Updated ${initialElements.length} initial display(s)`);
  }

  // Get initials from name
  function getInitials(name) {
    if (!name) return 'U';

    return name.split(' ')
      .filter(n => n.length > 0)
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  // Update profile name displays
  function updateProfileNameDisplays(profileData) {
    debugLog('Updating profile name displays...');

    const displayName = profileData.fullName || `${profileData.firstName} ${profileData.lastName}` || 'User';

    // Update any name display elements
    const nameElements = document.querySelectorAll('#userName, .user-name, [data-user-name]');
    nameElements.forEach(el => {
      el.textContent = displayName;
    });

    debugLog(`✅ Updated ${nameElements.length} name display(s) to: ${displayName}`);
  }

  // Display profile picture in the edit modal
  function displayProfilePictureInModal() {
    debugLog('Displaying profile picture in modal...');

    try {
      const savedPicture = localStorage.getItem('visualVibeProfilePicture');
      const profileDisplay = document.getElementById('profilePictureDisplay');
      const profileInitials = document.getElementById('profileInitials');

      if (savedPicture && profileDisplay) {
        // Show the saved profile picture
        profileDisplay.style.backgroundImage = `url(${savedPicture})`;
        profileDisplay.style.backgroundSize = 'cover';
        profileDisplay.style.backgroundPosition = 'center';
        profileDisplay.innerHTML = ''; // Remove initials

        // IMPORTANT: Make sure it's NOT clickable
        profileDisplay.onclick = null;
        profileDisplay.removeAttribute('onclick');
        profileDisplay.style.cursor = 'default';

        debugLog('✅ Profile picture displayed in modal (not clickable)');

      } else if (profileInitials && window.currentUser) {
        // Show initials if no picture
        const initials = getInitials(window.currentUser.name);
        profileInitials.textContent = initials;

        // IMPORTANT: Make sure initials are NOT clickable
        if (profileDisplay) {
          profileDisplay.onclick = null;
          profileDisplay.removeAttribute('onclick');
          profileDisplay.style.cursor = 'default';
        }

        debugLog('✅ Profile initials displayed in modal (not clickable)');
      }

    } catch (error) {
      debugLog('❌ Error displaying profile picture in modal:', error);
    }
  }

  // Disable ALL automatic profile picture prompts
  function disableAllAutoPrompts() {
    debugLog('🚫 Disabling all automatic profile picture prompts...');

    try {
      // Override any existing auto-prompt functions
      window.confirmProfilePhotoChange = function() {
        debugLog('🚫 Auto profile photo prompt disabled');
        return false;
      };

      window.showProfilePictureOptions = function() {
        debugLog('🚫 Auto profile picture options disabled');
        return false;
      };

      // Remove any existing auto-prompt modals
      const autoModals = document.querySelectorAll('#profilePhotoConfirmationModal, #profilePictureOptionsModal');
      autoModals.forEach(modal => {
        if (modal) {
          modal.remove();
          debugLog('✅ Removed auto-prompt modal');
        }
      });

      // Disable any automatic click handlers on profile pictures
      const profileElements = document.querySelectorAll('.profile-picture, [data-profile-picture], .w-20.h-20.rounded-full');
      profileElements.forEach(element => {
        // Remove all click event listeners
        element.onclick = null;
        element.removeAttribute('onclick');

        // Clone to remove all event listeners
        const newElement = element.cloneNode(true);
        if (element.parentNode) {
          element.parentNode.replaceChild(newElement, element);
        }
      });

      debugLog('✅ All automatic profile picture prompts disabled');

    } catch (error) {
      debugLog('❌ Error disabling auto prompts:', error);
    }
  }

  // Load profile data with fallback chain
  function loadProfileDataBulletproof() {
    debugLog('Loading profile data with fallback chain...');
    
    let profileData = {};
    
    // Try multiple sources in order of preference
    const sources = [
      STORAGE_KEYS.profile,
      STORAGE_KEYS.backup,
      'userProfile',
      'profileData',
      'customerProfile'
    ];
    
    for (const source of sources) {
      try {
        const data = localStorage.getItem(source);
        if (data) {
          const parsed = JSON.parse(data);
          profileData = { ...profileData, ...parsed };
          debugLog(`✅ Loaded data from ${source}`);
        }
      } catch (e) {
        debugLog(`❌ Failed to load from ${source}:`, e);
      }
    }
    
    // Also get user data if available
    if (window.currentUser && window.currentUser.id) {
      try {
        const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '[]');
        const userData = users.find(u => u.id === window.currentUser.id);
        if (userData) {
          profileData = { ...profileData, ...userData };
          debugLog('✅ Merged with current user data');
        }
      } catch (e) {
        debugLog('❌ Failed to load user data:', e);
      }
    }
    
    debugLog('Final loaded profile data:', profileData);
    return profileData;
  }
  
  // Populate form with bulletproof field matching
  function populateFormBulletproof(data) {
    debugLog('Populating form with data...');
    
    if (!data || Object.keys(data).length === 0) {
      debugLog('No data to populate');
      return;
    }
    
    // Text fields mapping
    const fieldMappings = [
      { ids: ['profileFullName'], keys: ['fullName', 'name'] },
      { ids: ['profileEmail'], keys: ['email'] },
      { ids: ['profilePhone'], keys: ['phone'] },
      { ids: ['profileCompany'], keys: ['company', 'companyName'] },
      { ids: ['profileLocation'], keys: ['location'] },
      { ids: ['profileFirstName'], keys: ['firstName'] },
      { ids: ['profileLastName'], keys: ['lastName'] },
      { ids: ['profileCompanyName'], keys: ['companyName', 'company'] }
    ];
    
    fieldMappings.forEach(mapping => {
      const element = mapping.ids.map(id => document.getElementById(id)).find(el => el);
      if (element) {
        const value = mapping.keys.map(key => data[key]).find(val => val);
        if (value) {
          element.value = value;
          debugLog(`✅ Populated ${element.id} with "${value}"`);
        }
      }
    });
    
    // Checkbox fields
    const checkboxMappings = [
      { id: 'emailNotifications', key: 'emailNotifications' },
      { id: 'smsNotifications', key: 'smsNotifications' },
      { id: 'marketingEmails', key: 'marketingEmails' }
    ];
    
    checkboxMappings.forEach(mapping => {
      const element = document.getElementById(mapping.id);
      if (element && data.hasOwnProperty(mapping.key)) {
        element.checked = !!data[mapping.key];
        debugLog(`✅ Set ${mapping.id} to ${element.checked}`);
      }
    });
  }
  
  // Bulletproof form handler
  function bulletproofFormHandler(event) {
    debugLog('🚀 Bulletproof form handler triggered');
    
    if (event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
    
    try {
      // Show immediate feedback
      const submitBtn = document.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.textContent = 'Saving...';
        submitBtn.disabled = true;
      }
      
      // Gather data
      const profileData = gatherProfileData();
      
      // Validate data
      if (!validateProfileData(profileData)) {
        // Reset button
        if (submitBtn) {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
        return false;
      }
      
      // Save data
      const saveSuccess = saveProfileDataBulletproof(profileData);
      
      if (saveSuccess) {
        // Success feedback
        if (window.toastManager) {
          window.toastManager.success('✅ Profile saved successfully! All your information has been saved.', { duration: 4000 });
        } else {
          alert('✅ Profile saved successfully! All your information has been saved.');
        }
        
        debugLog('✅ Profile save completed successfully');

        // Update profile displays immediately
        updateAllProfileDisplays(profileData);

        // Close modal after delay
        setTimeout(() => {
          if (window.closeProfileModal) {
            window.closeProfileModal();
          }
        }, 1500);
        
      } else {
        // Error feedback
        if (window.toastManager) {
          window.toastManager.error('❌ Failed to save profile. Please try again.', { duration: 5000 });
        } else {
          alert('❌ Failed to save profile. Please try again.');
        }
        
        debugLog('❌ Profile save failed');
      }
      
      // Reset button
      if (submitBtn) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
      
    } catch (error) {
      debugLog('❌ Critical error in form handler:', error);
      alert('❌ An error occurred while saving. Please try again.');
      
      // Reset button
      const submitBtn = document.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.textContent = 'Save Changes';
        submitBtn.disabled = false;
      }
    }
    
    return false;
  }
  
  // Enhanced modal opener
  function bulletproofOpenModal() {
    debugLog('Opening profile modal with bulletproof system...');
    
    try {
      const modal = document.getElementById('profileModal');
      if (!modal) {
        debugLog('❌ Profile modal not found');
        alert('Profile editor not available. Please refresh the page.');
        return;
      }
      
      // Show modal
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Load and populate data
      const profileData = loadProfileDataBulletproof();
      populateFormBulletproof(profileData);

      // Display existing profile picture in modal
      displayProfilePictureInModal();

      // Set up form handler with force override
      const form = document.getElementById('profileForm');
      if (form) {
        // Remove ALL existing listeners
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);
        
        // Add our bulletproof handler
        newForm.addEventListener('submit', bulletproofFormHandler);
        newForm.onsubmit = bulletproofFormHandler;
        
        debugLog('✅ Form handler attached to cloned form');
      }
      
      debugLog('✅ Profile modal opened successfully');
      
    } catch (error) {
      debugLog('❌ Error opening modal:', error);
      alert('Error opening profile editor. Please refresh and try again.');
    }
  }
  
  // Initialize bulletproof system
  function initializeBulletproofSystem() {
    debugLog('🚀 Initializing bulletproof profile system...');

    // Disable ALL automatic profile picture prompts
    disableAllAutoPrompts();

    // Override existing functions with bulletproof versions
    window.openProfileModal = bulletproofOpenModal;
    window.handleProfileUpdate = bulletproofFormHandler;
    
    // Make utility functions available
    window.gatherProfileData = gatherProfileData;
    window.saveProfileDataBulletproof = saveProfileDataBulletproof;
    window.loadProfileDataBulletproof = loadProfileDataBulletproof;
    window.updateAllProfileDisplays = updateAllProfileDisplays;
    window.updateProfilePictureDisplays = updateProfilePictureDisplays;
    window.displayProfilePictureInModal = displayProfilePictureInModal;

    // Enhanced profile picture change function for modal
    window.changeProfilePictureManually = function() {
      debugLog('📸 Manual profile picture change from modal...');

      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.style.display = 'none';

      fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
            const imageData = e.target.result;

            // Save immediately (no confirmation needed in modal)
            localStorage.setItem('visualVibeProfilePicture', imageData);

            // Update modal display
            displayProfilePictureInModal();

            // Update all other displays
            updateProfilePictureDisplays();

            // Show success feedback
            if (window.toastManager) {
              window.toastManager.success('Profile picture updated!', { duration: 2000 });
            }

            debugLog('✅ Profile picture updated from modal');
          };
          reader.readAsDataURL(file);
        }

        document.body.removeChild(fileInput);
      });

      document.body.appendChild(fileInput);
      fileInput.click();
    };

    // Load and display profile picture immediately if user is logged in
    setTimeout(() => {
      if (window.currentUser) {
        updateProfilePictureDisplays();
        debugLog('✅ Profile picture loaded on page load');
      }
    }, 1000);

    debugLog('✅ Bulletproof system initialized and ready');
  }
  
  // Initialize immediately and on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeBulletproofSystem);
  } else {
    initializeBulletproofSystem();
  }
  
  // Also initialize after delay to override any conflicting scripts
  setTimeout(initializeBulletproofSystem, 1000);
  setTimeout(initializeBulletproofSystem, 3000);
  
})();

console.log('🛡️ Bulletproof profile save system loaded and ready!');
