// Fix page refresh issue on review submission
console.log('🔄 Loading page refresh prevention fix...');

// Aggressive form submission prevention
function preventFormSubmission() {
  console.log('🛑 Setting up form submission prevention...');
  
  // Find the review form
  const reviewForm = document.getElementById('reviewForm');
  if (!reviewForm) {
    console.warn('⚠️ Review form not found');
    return;
  }
  
  console.log('✅ Review form found, setting up prevention...');
  
  // Remove any existing action attribute that might cause submission
  reviewForm.removeAttribute('action');
  reviewForm.removeAttribute('method');
  
  // Set attributes to prevent submission
  reviewForm.setAttribute('onsubmit', 'return false;');
  reviewForm.setAttribute('action', 'javascript:void(0);');
  
  // Override form submission at multiple levels
  reviewForm.onsubmit = function(e) {
    console.log('🛑 Form onsubmit intercepted and prevented');
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
    
    // Call the review submission function instead
    if (typeof window.submitReview === 'function') {
      console.log('🔄 Calling submitReview function...');
      return window.submitReview(e);
    } else {
      console.error('❌ submitReview function not available');
      return false;
    }
  };
  
  // Add event listener with high priority
  reviewForm.addEventListener('submit', function(e) {
    console.log('🛑 Submit event listener fired - preventing default');
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    
    // Call the review submission function
    if (typeof window.submitReview === 'function') {
      console.log('🔄 Calling submitReview from event listener...');
      window.submitReview(e);
    } else {
      console.error('❌ submitReview function not available');
    }
    
    return false;
  }, { capture: true, passive: false });
  
  // Override the submit method itself
  const originalSubmit = reviewForm.submit;
  reviewForm.submit = function() {
    console.log('🛑 Form.submit() method intercepted and prevented');
    
    // Call the review submission function instead
    if (typeof window.submitReview === 'function') {
      console.log('🔄 Calling submitReview from submit method...');
      window.submitReview();
    } else {
      console.error('❌ submitReview function not available');
    }
    
    return false;
  };
  
  // Find and modify the submit button
  const submitButton = reviewForm.querySelector('button[type="submit"]');
  if (submitButton) {
    console.log('✅ Submit button found, modifying...');
    
    // Change button type to prevent form submission
    submitButton.setAttribute('type', 'button');
    
    // Remove any existing onclick handlers and add our own
    submitButton.onclick = function(e) {
      console.log('🔄 Submit button clicked - calling submitReview');
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      
      if (typeof window.submitReview === 'function') {
        window.submitReview(e);
      } else {
        console.error('❌ submitReview function not available');
      }
      
      return false;
    };
    
    // Also add event listener as backup
    submitButton.addEventListener('click', function(e) {
      console.log('🔄 Submit button event listener - calling submitReview');
      e.preventDefault();
      e.stopPropagation();
      
      if (typeof window.submitReview === 'function') {
        window.submitReview(e);
      }
      
      return false;
    }, { capture: true });
    
    console.log('✅ Submit button configured to prevent page refresh');
  } else {
    console.warn('⚠️ Submit button not found');
  }
  
  console.log('✅ Form submission prevention setup complete');
}

// Enhance the submitReview function to ensure ratings update after submission
function enhanceSubmitReview() {
  console.log('🔧 Enhancing submitReview function...');
  
  const originalSubmitReview = window.submitReview;
  
  if (typeof originalSubmitReview === 'function') {
    window.submitReview = function(event) {
      console.log('📝 Enhanced submitReview called');
      
      // Prevent any default behavior
      if (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      }
      
      // Call the original function
      let result;
      try {
        result = originalSubmitReview.call(this, event);
        console.log('✅ Original submitReview completed');
        
        // Trigger rating updates after successful submission
        setTimeout(() => {
          console.log('🔄 Triggering rating update after review submission...');
          if (typeof window.executeUnifiedRatingUpdate === 'function') {
            window.executeUnifiedRatingUpdate();
          } else if (typeof window.executeRatingUpdate === 'function') {
            window.executeRatingUpdate();
          } else if (typeof window.directRatingUpdate === 'function') {
            window.directRatingUpdate();
          }
        }, 500);
        
        // Additional safety update
        setTimeout(() => {
          console.log('🔄 Safety rating update...');
          if (typeof window.executeUnifiedRatingUpdate === 'function') {
            window.executeUnifiedRatingUpdate();
          }
        }, 2000);
        
      } catch (error) {
        console.error('❌ Error in enhanced submitReview:', error);
        result = false;
      }
      
      return result;
    };
    
    console.log('✅ submitReview function enhanced');
  } else {
    console.warn('⚠️ Original submitReview function not found');
  }
}

// Prevent any navigation or page reload
function preventPageNavigation() {
  console.log('🛡️ Setting up page navigation prevention...');
  
  // Prevent beforeunload during review submission
  let isSubmittingReview = false;
  
  // Override window methods that could cause navigation
  const originalReload = window.location.reload;
  window.location.reload = function() {
    if (isSubmittingReview) {
      console.log('🛑 Page reload prevented during review submission');
      return false;
    }
    return originalReload.call(this);
  };
  
  // Monitor for review submission state
  const originalSubmitReview = window.submitReview;
  if (typeof originalSubmitReview === 'function') {
    window.submitReview = function(event) {
      isSubmittingReview = true;
      console.log('📝 Review submission started - navigation blocked');
      
      const result = originalSubmitReview.call(this, event);
      
      // Re-enable navigation after 5 seconds
      setTimeout(() => {
        isSubmittingReview = false;
        console.log('✅ Review submission complete - navigation re-enabled');
      }, 5000);
      
      return result;
    };
  }
  
  console.log('✅ Page navigation prevention setup complete');
}

// Initialize all fixes
function initializePageRefreshFix() {
  console.log('🚀 Initializing page refresh fix...');
  
  // Wait for DOM to be ready
  setTimeout(() => {
    preventFormSubmission();
    enhanceSubmitReview();
    preventPageNavigation();
    
    console.log('✅ Page refresh fix initialization complete');
  }, 1000);
}

// Run immediately and on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePageRefreshFix);
} else {
  initializePageRefreshFix();
}

// Also run with delays to ensure everything is loaded
setTimeout(initializePageRefreshFix, 2000);
setTimeout(initializePageRefreshFix, 5000);

console.log('🔄 Page refresh prevention loaded - reviews should no longer cause page refresh');
