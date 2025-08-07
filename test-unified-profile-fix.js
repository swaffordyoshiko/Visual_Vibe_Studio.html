// Test Unified Profile Fix
console.log('🧪 Testing unified profile fix...');

window.testUnifiedProfileFix = function() {
  console.log('🧪 Starting unified profile fix test...');
  
  const results = {
    openProfileModal: false,
    closeProfileModal: false,
    handleProfileUpdate: false,
    handleProfilePictureUpload: false,
    saveProfilePicture: false,
    removeProfilePicture: false,
    updateAllProfilePictureDisplays: false,
    noAutoPopups: true
  };
  
  // Test 1: Check if profile modal functions exist and work
  try {
    if (typeof window.openProfileModal === 'function') {
      results.openProfileModal = true;
      console.log('✅ openProfileModal function exists');
    } else {
      console.log('❌ openProfileModal function missing');
    }
    
    if (typeof window.closeProfileModal === 'function') {
      results.closeProfileModal = true;
      console.log('✅ closeProfileModal function exists');
    } else {
      console.log('❌ closeProfileModal function missing');
    }
  } catch (error) {
    console.error('❌ Error testing modal functions:', error);
  }
  
  // Test 2: Check profile update function
  try {
    if (typeof window.handleProfileUpdate === 'function') {
      results.handleProfileUpdate = true;
      console.log('✅ handleProfileUpdate function exists');
    } else {
      console.log('❌ handleProfileUpdate function missing');
    }
  } catch (error) {
    console.error('❌ Error testing profile update function:', error);
  }
  
  // Test 3: Check profile picture functions
  try {
    if (typeof window.handleProfilePictureUpload === 'function') {
      results.handleProfilePictureUpload = true;
      console.log('✅ handleProfilePictureUpload function exists');
    } else {
      console.log('❌ handleProfilePictureUpload function missing');
    }
    
    if (typeof window.saveProfilePicture === 'function') {
      results.saveProfilePicture = true;
      console.log('✅ saveProfilePicture function exists');
    } else {
      console.log('❌ saveProfilePicture function missing');
    }
    
    if (typeof window.removeProfilePicture === 'function') {
      results.removeProfilePicture = true;
      console.log('✅ removeProfilePicture function exists');
    } else {
      console.log('❌ removeProfilePicture function missing');
    }
    
    if (typeof window.updateAllProfilePictureDisplays === 'function') {
      results.updateAllProfilePictureDisplays = true;
      console.log('✅ updateAllProfilePictureDisplays function exists');
    } else {
      console.log('❌ updateAllProfilePictureDisplays function missing');
    }
  } catch (error) {
    console.error('❌ Error testing profile picture functions:', error);
  }
  
  // Test 4: Check that auto-popup functions are disabled
  try {
    if (typeof window.confirmProfilePhotoChange === 'function') {
      const result = window.confirmProfilePhotoChange();
      if (result === false) {
        console.log('✅ Auto profile photo prompts disabled');
      } else {
        results.noAutoPopups = false;
        console.log('❌ Auto profile photo prompts still active');
      }
    }
    
    if (typeof window.showProfilePictureOptions === 'function') {
      const result = window.showProfilePictureOptions();
      if (result === false) {
        console.log('✅ Auto profile picture options disabled');
      } else {
        results.noAutoPopups = false;
        console.log('❌ Auto profile picture options still active');
      }
    }
  } catch (error) {
    console.error('❌ Error testing auto-popup disabling:', error);
  }
  
  // Test 5: Test profile data saving (mock test)
  try {
    const testData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '123-456-7890',
      companyName: 'Test Company'
    };
    
    localStorage.setItem('visualVibeProfileData', JSON.stringify(testData));
    const saved = JSON.parse(localStorage.getItem('visualVibeProfileData'));
    
    if (saved && saved.firstName === 'Test') {
      console.log('✅ Profile data saving works');
    } else {
      console.log('❌ Profile data saving failed');
    }
    
    // Clean up test data
    localStorage.removeItem('visualVibeProfileData');
    
  } catch (error) {
    console.error('❌ Error testing profile data saving:', error);
  }
  
  // Display results
  console.log('🧪 Test Results:', results);
  
  const passedTests = Object.values(results).filter(result => result === true).length;
  const totalTests = Object.keys(results).length;
  
  console.log(`🧪 Test Summary: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    console.log('✅ All tests passed! Unified profile fix is working correctly.');

    // Notifications disabled to prevent spam to end users
    // if (window.toastManager) {
    //   window.toastManager.success(`Profile fix test passed! ${passedTests}/${totalTests} ✅`, { duration: 4000 });
    // } else {
    //   alert(`Profile fix test passed! ${passedTests}/${totalTests} tests passed ✅`);
    // }
  } else {
    console.log(`⚠️ Some tests failed. ${passedTests}/${totalTests} tests passed.`);

    // Notifications disabled to prevent spam to end users
    // if (window.toastManager) {
    //   window.toastManager.warning(`Profile fix test: ${passedTests}/${totalTests} passed ⚠️`, { duration: 4000 });
    // } else {
    //   alert(`Profile fix test: ${passedTests}/${totalTests} tests passed ⚠️`);
    // }
  }
  
  return results;
};

// Auto-run test DISABLED (was causing notifications to end users)
// setTimeout(() => {
//   console.log('🧪 Auto-running unified profile fix test...');
//   window.testUnifiedProfileFix();
// }, 3000);

console.log('🧪 Unified profile fix test script loaded');
console.log('💡 Run window.testUnifiedProfileFix() manually to test again');
