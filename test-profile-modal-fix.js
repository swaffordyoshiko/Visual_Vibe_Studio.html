// Test profile modal fix and validate error resolution
console.log('🧪 Loading profile modal fix validation...');

function testProfileModalElementsExist() {
  console.log('🔍 Testing profile modal elements...');
  
  // Open the modal first
  if (typeof window.openProfileModal === 'function') {
    window.openProfileModal();
    
    // Wait for modal to be created, then test elements
    setTimeout(() => {
      const requiredElements = [
        'profileFullName',
        'profileEmail', 
        'profilePhone',
        'profileCompany',
        'profileLocation',
        'emailNotifications',
        'smsNotifications', 
        'marketingEmails',
        'profileInitials'
      ];
      
      let allFound = true;
      const missingElements = [];
      
      requiredElements.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element) {
          console.log(`✅ Found element: ${elementId}`);
        } else {
          console.log(`❌ Missing element: ${elementId}`);
          allFound = false;
          missingElements.push(elementId);
        }
      });
      
      if (allFound) {
        console.log('✅ All profile modal elements found');
        
        // Test loading profile data safely
        if (typeof window.loadProfileData === 'function') {
          try {
            window.loadProfileData();
            console.log('✅ Profile data loading test successful');
          } catch (error) {
            console.error('❌ Profile data loading test failed:', error);
          }
        }
      } else {
        console.error('❌ Missing elements:', missingElements);
      }
      
      // Close modal after test
      setTimeout(() => {
        if (typeof window.closeProfileModal === 'function') {
          window.closeProfileModal();
        }
      }, 2000);
      
      return allFound;
      
    }, 500);
  } else {
    console.error('❌ openProfileModal function not available');
    return false;
  }
}

function validateProfileModalFix() {
  console.log('🔧 Validating profile modal fix...');
  
  // Check if functions exist
  const functionsExist = {
    openProfileModal: typeof window.openProfileModal === 'function',
    closeProfileModal: typeof window.closeProfileModal === 'function',
    handleProfileUpdate: typeof window.handleProfileUpdate === 'function'
  };
  
  console.log('📋 Function availability check:', functionsExist);
  
  const allFunctionsExist = Object.values(functionsExist).every(exists => exists);
  
  if (allFunctionsExist) {
    console.log('✅ All profile modal functions are available');
    
    // Test elements exist
    testProfileModalElementsExist();
    
  } else {
    console.error('❌ Some profile modal functions are missing');
    return false;
  }
  
  return allFunctionsExist;
}

// Create a safer loadProfileData function for testing
function createSafeLoadProfileData() {
  window.safeLoadProfileData = function() {
    console.log('🔒 Safe loading profile data...');
    
    try {
      const savedProfile = JSON.parse(localStorage.getItem('visualVibeProfile') || '{}');
      console.log('📊 Retrieved profile:', savedProfile);
      
      // Get all elements first
      const elements = {
        fullName: document.getElementById('profileFullName'),
        email: document.getElementById('profileEmail'),
        phone: document.getElementById('profilePhone'),
        company: document.getElementById('profileCompany'),
        location: document.getElementById('profileLocation'),
        emailNotif: document.getElementById('emailNotifications'),
        smsNotif: document.getElementById('smsNotifications'),
        marketing: document.getElementById('marketingEmails'),
        initials: document.getElementById('profileInitials')
      };
      
      // Check which elements exist
      const existingElements = {};
      const missingElements = [];
      
      Object.entries(elements).forEach(([key, element]) => {
        if (element) {
          existingElements[key] = element;
          console.log(`✅ Element ${key} exists`);
        } else {
          missingElements.push(key);
          console.log(`❌ Element ${key} missing`);
        }
      });
      
      if (missingElements.length > 0) {
        console.warn('⚠️ Some elements are missing:', missingElements);
        console.log('Will retry in 1 second...');
        
        setTimeout(() => {
          window.safeLoadProfileData();
        }, 1000);
        
        return false;
      }
      
      // Safely populate existing elements
      if (existingElements.fullName && savedProfile.fullName) {
        existingElements.fullName.value = savedProfile.fullName;
      }
      
      if (existingElements.email && savedProfile.email) {
        existingElements.email.value = savedProfile.email;
      }
      
      if (existingElements.phone && savedProfile.phone) {
        existingElements.phone.value = savedProfile.phone;
      }
      
      if (existingElements.company && savedProfile.company) {
        existingElements.company.value = savedProfile.company;
      }
      
      if (existingElements.location && savedProfile.location) {
        existingElements.location.value = savedProfile.location;
      }
      
      // Set checkboxes safely
      if (existingElements.emailNotif) {
        existingElements.emailNotif.checked = savedProfile.emailNotifications !== false;
      }
      
      if (existingElements.smsNotif) {
        existingElements.smsNotif.checked = savedProfile.smsNotifications === true;
      }
      
      if (existingElements.marketing) {
        existingElements.marketing.checked = savedProfile.marketingEmails !== false;
      }
      
      // Update initials safely
      if (existingElements.initials) {
        const fullName = savedProfile.fullName;
        if (fullName && fullName.trim()) {
          const names = fullName.trim().split(' ').filter(name => name.length > 0);
          let initials = 'VS';
          
          if (names.length >= 2) {
            initials = (names[0][0] + names[names.length - 1][0]).toUpperCase();
          } else if (names.length === 1 && names[0].length >= 1) {
            initials = names[0].substring(0, Math.min(2, names[0].length)).toUpperCase();
          }
          
          existingElements.initials.textContent = initials;
        }
      }
      
      console.log('✅ Safe profile data loading completed');
      return true;
      
    } catch (error) {
      console.error('❌ Error in safe profile data loading:', error);
      return false;
    }
  };
}

// Initialize validation
function initializeProfileModalValidation() {
  console.log('🚀 Initializing profile modal validation...');
  
  // Create safe loading function
  createSafeLoadProfileData();
  
  // Run validation after a delay
  setTimeout(() => {
    validateProfileModalFix();
  }, 2000);
}

// Make test functions globally available
window.testProfileModalElementsExist = testProfileModalElementsExist;
window.validateProfileModalFix = validateProfileModalFix;

// Auto-run validation
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeProfileModalValidation);
} else {
  initializeProfileModalValidation();
}

console.log('🧪 Profile modal fix validation loaded');
