// Comprehensive Profile Complete - All fields with one-click save
console.log('🔧 Loading comprehensive profile complete system...');

(function() {
  'use strict';
  
  let isComprehensiveSystemActive = false;
  
  function initializeComprehensiveProfileSystem() {
    if (isComprehensiveSystemActive) return;
    isComprehensiveSystemActive = true;
    
    console.log('🚀 Initializing comprehensive profile system...');
    
    // Clear conflicts and setup complete system
    clearAllProfileConflicts();
    setupCompleteProfileSystem();
    
    console.log('✅ Comprehensive profile system active');
  }
  
  function clearAllProfileConflicts() {
    console.log('🧹 Clearing all profile conflicts...');
    
    // Remove any existing profile handlers
    if (window.handleProfileUpdate) delete window.handleProfileUpdate;
    if (window.openProfileModal) delete window.openProfileModal;
    if (window.closeProfileModal) delete window.closeProfileModal;
    
    // Clear intervals
    const existingIntervals = window.profileIntervals || [];
    existingIntervals.forEach(interval => clearInterval(interval));
    window.profileIntervals = [];
    
    console.log('✅ All profile conflicts cleared');
  }
  
  function setupCompleteProfileSystem() {
    console.log('📝 Setting up complete profile system...');
    
    // COMPREHENSIVE OPEN PROFILE MODAL
    window.openProfileModal = function() {
      console.log('👤 Opening comprehensive profile modal...');
      
      try {
        const modal = document.getElementById('profileModal');
        if (!modal) {
          console.error('❌ Profile modal not found');
          return;
        }
        
        // Show modal
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        
        // Enhance form with all fields
        setTimeout(() => {
          enhanceProfileFormWithAllFields();
          loadAllUserDataIntoForm();
          setupComprehensiveFormHandler();
        }, 100);
        
        console.log('✅ Comprehensive profile modal opened');
        
      } catch (error) {
        console.error('❌ Error opening profile modal:', error);
      }
    };
    
    // COMPREHENSIVE PROFILE UPDATE - SAVES EVERYTHING
    window.handleProfileUpdate = function(event) {
      console.log('💾 Handling comprehensive profile update...');
      
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      try {
        // Collect ALL profile data
        const profileData = {
          // Basic Information
          firstName: getFieldValue('profileFirstName'),
          lastName: getFieldValue('profileLastName'),
          email: getFieldValue('profileEmail'),
          phone: getFieldValue('profilePhone'),
          companyName: getFieldValue('profileCompanyName'),
          
          // Additional Fields
          location: getFieldValue('profileLocation'),
          
          // Preferences
          emailNotifications: getCheckboxValue('emailNotifications'),
          smsNotifications: getCheckboxValue('smsNotifications'),
          marketingEmails: getCheckboxValue('marketingEmails'),
          designUpdates: getCheckboxValue('designUpdates'),
          projectReminders: getCheckboxValue('projectReminders'),
          
          // Metadata
          lastUpdated: new Date().toISOString(),
          profileVersion: '2.0'
        };
        
        // Create full name
        profileData.fullName = `${profileData.firstName} ${profileData.lastName}`.trim();
        
        console.log('📊 COMPREHENSIVE profile data to save:', profileData);
        
        // Validate required fields
        if (!profileData.firstName || !profileData.lastName || !profileData.email) {
          showError('Please fill in all required fields (First Name, Last Name, Email)');
          return false;
        }
        
        // Email validation
        if (!isValidEmail(profileData.email)) {
          showError('Please enter a valid email address');
          return false;
        }
        
        // SAVE EVERYTHING IN ONE OPERATION
        const saveSuccess = saveCompleteProfileData(profileData);
        
        if (saveSuccess) {
          showSuccess('✅ All profile information saved successfully! 🎉');
          
          // Close modal after delay
          setTimeout(() => {
            window.closeProfileModal();
          }, 2000);
        } else {
          showError('Failed to save profile data. Please try again.');
        }
        
        return false;
        
      } catch (error) {
        console.error('❌ Error updating comprehensive profile:', error);
        showError('An error occurred while saving your profile');
        return false;
      }
    };
    
    // CLEAN CLOSE MODAL
    window.closeProfileModal = function() {
      console.log('📝 Closing comprehensive profile modal...');
      
      const modal = document.getElementById('profileModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    };
  }
  
  function enhanceProfileFormWithAllFields() {
    console.log('🔧 Enhancing profile form with all fields...');
    
    const form = document.getElementById('profileForm');
    if (!form) {
      console.error('❌ Profile form not found');
      return;
    }
    
    // Check if already enhanced
    if (form.querySelector('.enhanced-fields')) {
      console.log('✅ Form already enhanced');
      return;
    }
    
    // Add Location field after Company Name
    const companyField = document.getElementById('profileCompanyName');
    if (companyField && companyField.parentElement) {
      const locationField = document.createElement('div');
      locationField.className = 'enhanced-fields';
      locationField.innerHTML = `
        <!-- Location -->
        <div class="mt-4">
          <label for="profileLocation" class="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            id="profileLocation"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="City, State/Country (optional)"
          />
        </div>
      `;
      
      companyField.parentElement.insertAdjacentElement('afterend', locationField);
    }
    
    // Add Preferences section after email
    const emailField = document.getElementById('profileEmail');
    if (emailField && emailField.parentElement) {
      const preferencesSection = document.createElement('div');
      preferencesSection.className = 'enhanced-fields mt-6 pt-6 border-t border-gray-200';
      preferencesSection.innerHTML = `
        <!-- Preferences Section -->
        <div>
          <h4 class="text-lg font-semibold text-gray-800 mb-4">Communication Preferences</h4>
          
          <div class="space-y-3">
            <div class="flex items-center">
              <input type="checkbox" id="emailNotifications" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
              <label for="emailNotifications" class="ml-3 text-sm text-gray-700">Email notifications for order updates</label>
            </div>
            
            <div class="flex items-center">
              <input type="checkbox" id="smsNotifications" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
              <label for="smsNotifications" class="ml-3 text-sm text-gray-700">SMS notifications for urgent updates</label>
            </div>
            
            <div class="flex items-center">
              <input type="checkbox" id="marketingEmails" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
              <label for="marketingEmails" class="ml-3 text-sm text-gray-700">Marketing emails and special offers</label>
            </div>
            
            <div class="flex items-center">
              <input type="checkbox" id="designUpdates" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
              <label for="designUpdates" class="ml-3 text-sm text-gray-700">Design trend updates and tips</label>
            </div>
            
            <div class="flex items-center">
              <input type="checkbox" id="projectReminders" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
              <label for="projectReminders" class="ml-3 text-sm text-gray-700">Project deadline reminders</label>
            </div>
          </div>
        </div>
      `;
      
      emailField.parentElement.insertAdjacentElement('afterend', preferencesSection);
    }
    
    console.log('✅ Profile form enhanced with all fields');
  }
  
  function loadAllUserDataIntoForm() {
    console.log('📋 Loading all user data into comprehensive form...');
    
    try {
      // Get saved profile data
      const savedProfile = JSON.parse(localStorage.getItem('visualVibeProfileData') || '{}');
      
      // Get current user data
      const currentUser = window.currentUser || {};
      
      // Combine data
      const userData = { ...currentUser, ...savedProfile };
      
      console.log('👤 Complete user data to load:', userData);
      
      // Populate basic fields
      setFieldValue('profileFirstName', userData.firstName || currentUser.name?.split(' ')[0] || '');
      setFieldValue('profileLastName', userData.lastName || currentUser.name?.split(' ').slice(1).join(' ') || '');
      setFieldValue('profileEmail', userData.email || '');
      setFieldValue('profilePhone', userData.phone || '');
      setFieldValue('profileCompanyName', userData.companyName || userData.company || '');
      
      // Populate additional fields
      setFieldValue('profileLocation', userData.location || '');
      
      // Populate preferences
      setCheckboxValue('emailNotifications', userData.emailNotifications);
      setCheckboxValue('smsNotifications', userData.smsNotifications);
      setCheckboxValue('marketingEmails', userData.marketingEmails);
      setCheckboxValue('designUpdates', userData.designUpdates);
      setCheckboxValue('projectReminders', userData.projectReminders);
      
      console.log('✅ All user data loaded into form');
      
    } catch (error) {
      console.error('❌ Error loading complete user data:', error);
    }
  }
  
  function setupComprehensiveFormHandler() {
    console.log('🔧 Setting up comprehensive form handler...');
    
    const form = document.getElementById('profileForm');
    if (!form) {
      console.error('❌ Profile form not found');
      return;
    }
    
    // Remove all existing listeners
    form.onsubmit = null;
    const clonedForm = form.cloneNode(true);
    form.parentNode.replaceChild(clonedForm, form);
    
    // Get the new form reference
    const newForm = document.getElementById('profileForm');
    
    // Add our comprehensive handler
    newForm.addEventListener('submit', window.handleProfileUpdate);
    
    // Also handle the submit button specifically
    const submitBtn = document.querySelector('button[form="profileForm"]');
    if (submitBtn) {
      submitBtn.onclick = null;
      submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('💾 Save button clicked - saving ALL profile data...');
        window.handleProfileUpdate();
      });
    }
    
    console.log('✅ Comprehensive form handler set up');
  }
  
  function saveCompleteProfileData(profileData) {
    console.log('💾 Saving COMPLETE profile data...');
    
    try {
      // Save to multiple storage locations for redundancy
      
      // 1. Save to dedicated profile storage
      localStorage.setItem('visualVibeProfileData', JSON.stringify(profileData));
      console.log('✅ Saved to visualVibeProfileData');
      
      // 2. Save to comprehensive profile storage
      localStorage.setItem('visualVibeCompleteProfile', JSON.stringify(profileData));
      console.log('✅ Saved to visualVibeCompleteProfile');
      
      // 3. Update current user object
      if (window.currentUser) {
        const updatedUser = {
          ...window.currentUser,
          ...profileData,
          id: window.currentUser.id // Preserve original ID
        };
        
        window.currentUser = updatedUser;
        localStorage.setItem('visualVibeUser', JSON.stringify(updatedUser));
        console.log('✅ Updated currentUser with complete data');
        
        // 4. Update in users array
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        const userIndex = users.findIndex(u => u.id === window.currentUser.id);
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...updatedUser };
          localStorage.setItem('visualVibeUsers', JSON.stringify(users));
          console.log('✅ Updated users array with complete data');
        }
      }
      
      // 5. Save backup copy with timestamp
      const backup = {
        ...profileData,
        backupTimestamp: new Date().toISOString()
      };
      localStorage.setItem('visualVibeProfileBackup', JSON.stringify(backup));
      console.log('✅ Created profile backup');
      
      console.log('🎉 COMPLETE profile data saved successfully to all locations');
      return true;
      
    } catch (error) {
      console.error('❌ Error saving complete profile data:', error);
      return false;
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
  
  function getCheckboxValue(fieldId) {
    const field = document.getElementById(fieldId);
    return field ? field.checked : false;
  }
  
  function setCheckboxValue(fieldId, value) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.checked = Boolean(value);
    }
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function showSuccess(message) {
    console.log('✅', message);
    if (window.toastManager) {
      window.toastManager.success(message, { duration: 4000 });
    } else {
      alert(message);
    }
  }
  
  function showError(message) {
    console.log('❌', message);
    if (window.toastManager) {
      window.toastManager.error(message, { duration: 5000 });
    } else {
      alert(message);
    }
  }
  
  // Test function
  window.testComprehensiveProfile = function() {
    console.log('🧪 Testing comprehensive profile system...');
    
    const tests = [
      {
        name: 'openProfileModal function exists',
        test: () => typeof window.openProfileModal === 'function'
      },
      {
        name: 'handleProfileUpdate function exists',
        test: () => typeof window.handleProfileUpdate === 'function'
      },
      {
        name: 'Profile form exists',
        test: () => !!document.getElementById('profileForm')
      },
      {
        name: 'Location field added',
        test: () => !!document.getElementById('profileLocation')
      },
      {
        name: 'Preference checkboxes added',
        test: () => !!document.getElementById('emailNotifications')
      }
    ];
    
    console.log('🧪 Running comprehensive profile tests...');
    
    const results = tests.map(test => {
      const passed = test.test();
      console.log(`${passed ? '✅' : '❌'} ${test.name}: ${passed}`);
      return { name: test.name, passed };
    });
    
    const passedCount = results.filter(r => r.passed).length;
    console.log(`🧪 Test Results: ${passedCount}/${tests.length} tests passed`);
    
    if (window.currentUser) {
      console.log('🧪 Opening modal for visual test...');
      window.openProfileModal();
    }
    
    return results;
  };
  
  // Initialize with highest priority
  initializeComprehensiveProfileSystem();
  
  // Also initialize with delays to override any conflicting scripts
  setTimeout(initializeComprehensiveProfileSystem, 1000);
  setTimeout(initializeComprehensiveProfileSystem, 3000);
  
})();

console.log('🔧 Comprehensive profile complete system loaded - saves all fields in one click');
