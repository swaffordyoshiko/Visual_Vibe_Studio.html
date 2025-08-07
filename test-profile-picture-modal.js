// Test Profile Picture in Edit Profile Modal
console.log('🧪 Testing profile picture in edit profile modal...');

window.testProfilePictureInModal = function() {
  console.log('🧪 Starting profile picture modal test...');
  
  const results = {
    modalOpens: false,
    profilePictureSectionExists: false,
    uploadButtonExists: false,
    initialsButtonExists: false,
    fileInputExists: false,
    uploadHandlerExists: false,
    saveHandlerExists: false,
    removeHandlerExists: false
  };
  
  try {
    // Test 1: Check if modal can be opened
    if (typeof window.openProfileModal === 'function') {
      console.log('✅ openProfileModal function exists');
      
      // Try opening modal
      window.openProfileModal();
      
      // Check if modal is visible after a delay
      setTimeout(() => {
        const modal = document.getElementById('profileModal');
        if (modal && !modal.classList.contains('hidden')) {
          results.modalOpens = true;
          console.log('✅ Profile modal opens successfully');
          
          // Test 2: Check if profile picture section exists
          setTimeout(() => {
            const pictureSection = document.getElementById('profilePictureSection');
            if (pictureSection) {
              results.profilePictureSectionExists = true;
              console.log('✅ Profile picture section exists in modal');
              
              // Test 3: Check upload button
              const uploadBtn = document.getElementById('uploadPictureBtn');
              if (uploadBtn) {
                results.uploadButtonExists = true;
                console.log('✅ Upload picture button exists');
              } else {
                console.log('❌ Upload picture button missing');
              }
              
              // Test 4: Check initials button
              const initialsBtn = document.getElementById('useInitialsBtn');
              if (initialsBtn) {
                results.initialsButtonExists = true;
                console.log('✅ Use initials button exists');
              } else {
                console.log('❌ Use initials button missing');
              }
              
              // Test 5: Check file input
              const fileInput = document.getElementById('profilePictureUpload');
              if (fileInput) {
                results.fileInputExists = true;
                console.log('✅ File input exists');
              } else {
                console.log('❌ File input missing');
              }
              
            } else {
              console.log('❌ Profile picture section missing from modal');
            }
            
            // Test 6: Check handlers
            if (typeof window.handleProfilePictureUpload === 'function') {
              results.uploadHandlerExists = true;
              console.log('✅ Upload handler function exists');
            } else {
              console.log('❌ Upload handler function missing');
            }
            
            if (typeof window.confirmProfilePictureSave === 'function') {
              results.saveHandlerExists = true;
              console.log('✅ Save handler function exists');
            } else {
              console.log('❌ Save handler function missing');
            }
            
            if (typeof window.removeProfilePicture === 'function') {
              results.removeHandlerExists = true;
              console.log('✅ Remove handler function exists');
            } else {
              console.log('❌ Remove handler function missing');
            }
            
            // Display final results
            displayTestResults(results);
            
            // Close modal after test
            setTimeout(() => {
              if (typeof window.closeProfileModal === 'function') {
                window.closeProfileModal();
              }
            }, 2000);
            
          }, 500); // Wait for profile picture section to be added
          
        } else {
          console.log('❌ Profile modal failed to open');
          displayTestResults(results);
        }
      }, 200); // Wait for modal to open
      
    } else {
      console.log('❌ openProfileModal function missing');
      displayTestResults(results);
    }
    
  } catch (error) {
    console.error('❌ Error during profile picture modal test:', error);
    displayTestResults(results);
  }
};

function displayTestResults(results) {
  console.log('🧪 Profile Picture Modal Test Results:', results);
  
  const passedTests = Object.values(results).filter(result => result === true).length;
  const totalTests = Object.keys(results).length;
  
  console.log(`🧪 Test Summary: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    console.log('✅ All profile picture modal tests passed!');
    
    // Notifications disabled to prevent spam to end users
    // if (window.toastManager) {
    //   window.toastManager.success(`Profile picture modal test passed! ${passedTests}/${totalTests} ✅`, { duration: 4000 });
    // } else {
    //   alert(`Profile picture modal test passed! ${passedTests}/${totalTests} tests passed ✅`);
    // }
  } else if (passedTests >= totalTests * 0.7) {
    console.log(`⚠️ Most profile picture modal tests passed. ${passedTests}/${totalTests} tests passed.`);
    
    // Notifications disabled to prevent spam to end users
    // if (window.toastManager) {
    //   window.toastManager.warning(`Profile picture modal test: ${passedTests}/${totalTests} passed ⚠️`, { duration: 4000 });
    // } else {
    //   alert(`Profile picture modal test: ${passedTests}/${totalTests} tests passed ⚠️`);
    // }
  } else {
    console.log(`❌ Many profile picture modal tests failed. ${passedTests}/${totalTests} tests passed.`);
    
    if (window.toastManager) {
      window.toastManager.error(`Profile picture modal test: ${passedTests}/${totalTests} passed ❌`, { duration: 4000 });
    } else {
      alert(`Profile picture modal test: ${passedTests}/${totalTests} tests passed ❌`);
    }
  }
  
  return results;
}

// Auto-run test after a delay
setTimeout(() => {
  console.log('🧪 Auto-running profile picture modal test...');
  window.testProfilePictureInModal();
}, 4000);

console.log('🧪 Profile picture modal test script loaded');
console.log('💡 Run window.testProfilePictureInModal() manually to test again');
