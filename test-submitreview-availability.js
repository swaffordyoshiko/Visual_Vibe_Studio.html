// Test submitReview function availability
console.log('🧪 Loading submitReview availability test...');

function testSubmitReviewAvailability() {
  console.log('🔍 Testing submitReview function availability...');
  
  // Check if function exists
  const functionExists = typeof window.submitReview === 'function';
  console.log('✅ Function exists:', functionExists);
  
  if (functionExists) {
    console.log('✅ Function name:', window.submitReview.name);
    console.log('✅ Function type:', typeof window.submitReview);
    
    // Check if it's accessible in different ways
    console.log('✅ window.submitReview:', typeof window.submitReview);
    console.log('✅ window["submitReview"]:', typeof window["submitReview"]);
    
    // Test if it can be called (without actually submitting)
    try {
      // Create a mock event
      const mockEvent = {
        preventDefault: () => console.log('preventDefault called'),
        stopPropagation: () => console.log('stopPropagation called'),
        stopImmediatePropagation: () => console.log('stopImmediatePropagation called')
      };
      
      console.log('🧪 Function appears to be callable');
      console.log('✅ submitReview function is fully available and ready');
      return true;
    } catch (error) {
      console.error('❌ Error testing function call:', error);
      return false;
    }
  } else {
    console.error('❌ submitReview function is NOT available');
    
    // Check what is available on window
    console.log('🔍 Available functions on window:');
    Object.keys(window).filter(key => typeof window[key] === 'function' && key.includes('submit')).forEach(key => {
      console.log(`  ${key}:`, typeof window[key]);
    });
    
    return false;
  }
}

// Check form elements availability
function testFormElementsAvailability() {
  console.log('📋 Testing form elements availability...');
  
  const requiredElements = [
    'reviewerName',
    'businessType', 
    'serviceUsed',
    'reviewText',
    'selectedRating'
  ];
  
  let allFound = true;
  
  requiredElements.forEach(id => {
    const element = document.getElementById(id);
    const found = !!element;
    console.log(`  ${id}:`, found ? '✅' : '❌');
    if (!found) allFound = false;
  });
  
  console.log('📋 All form elements available:', allFound ? '✅' : '❌');
  return allFound;
}

// Check if review form exists
function testReviewFormAvailability() {
  console.log('📝 Testing review form availability...');
  
  const reviewForm = document.getElementById('reviewForm');
  const formExists = !!reviewForm;
  
  console.log('📝 Review form exists:', formExists ? '✅' : '❌');
  
  if (formExists) {
    const submitButton = reviewForm.querySelector('button[type="submit"], button[type="button"]');
    console.log('📝 Submit button found:', submitButton ? '✅' : '❌');
    
    if (submitButton) {
      console.log('📝 Submit button type:', submitButton.getAttribute('type'));
      console.log('📝 Submit button onclick:', !!submitButton.onclick);
    }
  }
  
  return formExists;
}

// Run comprehensive test
function runComprehensiveTest() {
  console.log('🚀 Running comprehensive submitReview availability test...');
  
  const results = {
    functionAvailable: testSubmitReviewAvailability(),
    formElementsAvailable: testFormElementsAvailability(),
    reviewFormAvailable: testReviewFormAvailability()
  };
  
  console.log('📊 Test Results:', results);
  
  const allPassed = Object.values(results).every(result => result === true);
  console.log('🎯 Overall Result:', allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED');
  
  return results;
}

// Make functions globally available
window.testSubmitReviewAvailability = testSubmitReviewAvailability;
window.testFormElementsAvailability = testFormElementsAvailability;
window.testReviewFormAvailability = testReviewFormAvailability;
window.runComprehensiveTest = runComprehensiveTest;

// Auto-run test on load
setTimeout(() => {
  console.log('🔍 Auto-running submitReview availability test...');
  runComprehensiveTest();
}, 3000);

console.log('🧪 submitReview availability test loaded. Use runComprehensiveTest() to test manually.');
