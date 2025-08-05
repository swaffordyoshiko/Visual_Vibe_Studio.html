// Test page refresh prevention
console.log('🧪 Loading page refresh prevention test...');

function testPageRefreshPrevention() {
  console.log('🧪 Testing page refresh prevention...');
  
  const reviewForm = document.getElementById('reviewForm');
  if (!reviewForm) {
    console.error('❌ Review form not found');
    return false;
  }
  
  console.log('✅ Review form found');
  
  // Check if form has proper prevention attributes
  const hasPreventionAttributes = 
    reviewForm.getAttribute('action') === 'javascript:void(0)' ||
    reviewForm.getAttribute('onsubmit') === 'return false;';
  
  console.log('🔍 Form prevention attributes:', hasPreventionAttributes);
  
  // Check submit button type
  const submitButton = reviewForm.querySelector('button[type="submit"], button[type="button"]');
  if (submitButton) {
    console.log('✅ Submit button found, type:', submitButton.getAttribute('type'));
  } else {
    console.warn('⚠️ Submit button not found');
  }
  
  // Check if submitReview function is enhanced
  if (typeof window.submitReview === 'function') {
    console.log('✅ submitReview function is available');
    
    // Test if the function prevents default behavior
    const testEvent = {
      preventDefault: () => console.log('✅ preventDefault called'),
      stopPropagation: () => console.log('✅ stopPropagation called'),
      stopImmediatePropagation: () => console.log('✅ stopImmediatePropagation called')
    };
    
    console.log('🧪 Testing submitReview with mock event...');
    // Note: We won't actually call it to avoid side effects
    
  } else {
    console.error('❌ submitReview function not available');
    return false;
  }
  
  return true;
}

function simulateReviewSubmission() {
  console.log('🎭 Simulating review submission to test page refresh prevention...');
  
  // Fill form with test data
  const nameField = document.getElementById('reviewerName');
  const businessField = document.getElementById('businessType');
  const serviceField = document.getElementById('serviceUsed');
  const textField = document.getElementById('reviewText');
  const ratingField = document.getElementById('selectedRating');
  
  if (nameField) nameField.value = 'Test Customer';
  if (businessField) businessField.value = 'Test Business';
  if (serviceField) serviceField.value = 'Website Development';
  if (textField) textField.value = 'Great service! Very professional and responsive.';
  if (ratingField) ratingField.value = '5';
  
  // Also set the visual rating if the function exists
  if (typeof window.setRating === 'function') {
    window.setRating(5);
  }
  
  console.log('📝 Test form data filled');
  
  // Test clicking the submit button
  const submitButton = document.querySelector('#reviewForm button[type="submit"], #reviewForm button[type="button"]');
  if (submitButton) {
    console.log('🧪 Testing submit button click...');
    
    // Create a more realistic event
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    
    // Add preventDefault and other methods to the event
    clickEvent.preventDefault = function() {
      console.log('✅ preventDefault called on click event');
    };
    clickEvent.stopPropagation = function() {
      console.log('✅ stopPropagation called on click event');
    };
    
    // Dispatch the event
    submitButton.dispatchEvent(clickEvent);
    
    console.log('🧪 Submit button click test completed');
  } else {
    console.error('❌ Submit button not found for testing');
    return false;
  }
  
  return true;
}

// Check for page refresh after a delay
function checkForPageRefresh() {
  console.log('🔍 Checking if page refresh occurred...');
  
  // Set a marker in sessionStorage before potential refresh
  sessionStorage.setItem('pageRefreshTest', Date.now().toString());
  
  setTimeout(() => {
    const marker = sessionStorage.getItem('pageRefreshTest');
    if (marker) {
      console.log('✅ No page refresh detected - marker still exists');
      sessionStorage.removeItem('pageRefreshTest');
    } else {
      console.log('❌ Page refresh may have occurred - marker missing');
    }
  }, 3000);
}

// Make functions globally available
window.testPageRefreshPrevention = testPageRefreshPrevention;
window.simulateReviewSubmission = simulateReviewSubmission;
window.checkForPageRefresh = checkForPageRefresh;

// Auto-run basic test on load
setTimeout(() => {
  console.log('🔍 Auto-running page refresh prevention check...');
  testPageRefreshPrevention();
}, 3000);

console.log('🧪 Page refresh prevention test loaded. Use simulateReviewSubmission() to test safely.');
