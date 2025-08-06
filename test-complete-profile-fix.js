// Test Complete Profile Fix
console.log('🧪 Loading profile fix test...');

window.testCompleteProfileFix = function() {
  console.log('🧪 Testing complete profile fix...');
  
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
      name: 'closeProfileModal function exists',
      test: () => typeof window.closeProfileModal === 'function'
    },
    {
      name: 'Profile modal exists in DOM',
      test: () => !!document.getElementById('profileModal')
    },
    {
      name: 'Profile form exists in DOM',
      test: () => !!document.getElementById('profileForm')
    },
    {
      name: 'Required form fields exist',
      test: () => {
        const fields = ['profileFirstName', 'profileLastName', 'profileEmail'];
        return fields.every(id => document.getElementById(id));
      }
    }
  ];
  
  console.log('🧪 Running profile fix tests...');
  
  const results = tests.map(test => {
    const passed = test.test();
    console.log(`${passed ? '✅' : '❌'} ${test.name}: ${passed}`);
    return { name: test.name, passed };
  });
  
  const passedCount = results.filter(r => r.passed).length;
  const totalCount = results.length;
  
  console.log(`🧪 Test Results: ${passedCount}/${totalCount} tests passed`);
  
  if (passedCount === totalCount) {
    console.log('✅ All tests passed! Profile fix should be working correctly.');
    
    // Test opening the modal
    if (window.currentUser) {
      console.log('🧪 Testing modal opening...');
      window.openProfileModal();
    } else {
      console.log('⚠️ No current user - cannot test modal opening');
    }
  } else {
    console.log('❌ Some tests failed. Profile fix may not work correctly.');
  }
  
  return results;
};

// Run test automatically after a delay
setTimeout(() => {
  console.log('🧪 Auto-running profile fix test...');
  window.testCompleteProfileFix();
}, 5000);

console.log('🧪 Profile fix test loaded - run testCompleteProfileFix() to test');
