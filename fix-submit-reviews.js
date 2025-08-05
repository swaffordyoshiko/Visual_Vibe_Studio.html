// Fix for submitReview function undefined error
console.log('📝 Loading submitReview function fix...');

// Define robust submitReview function
function createSubmitReview() {
  return function submitReview(event) {
    console.log('🚀 Review submission started');

    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      // Get form values with fallbacks
      const nameField = document.getElementById('reviewerName');
      const businessTypeField = document.getElementById('businessType');
      const serviceField = document.getElementById('serviceUsed');
      const textField = document.getElementById('reviewText');
      const ratingField = document.getElementById('selectedRating');

      const name = nameField ? nameField.value.trim() : '';
      const businessType = businessTypeField ? businessTypeField.value.trim() : '';
      const service = serviceField ? serviceField.value : '';
      const text = textField ? textField.value.trim() : '';
      const rating = ratingField ? parseInt(ratingField.value) : (window.selectedRating || 0);

      console.log('Form data:', { name, businessType, service, text, rating });

      // Basic validation
      if (!name) {
        const message = 'Please enter your name.';
        if (window.toastManager) {
          window.toastManager.error(message);
        } else if (typeof showAlert === 'function') {
          showAlert(message, 'error');
        } else {
          alert(message);
        }
        if (nameField) nameField.focus();
        return false;
      }

      if (!rating || rating === 0) {
        const message = 'Please select a star rating.';
        if (window.toastManager) {
          window.toastManager.error(message);
        } else if (typeof showAlert === 'function') {
          showAlert(message, 'error');
        } else {
          alert(message);
        }
        return false;
      }

      if (!service) {
        const message = 'Please select a service.';
        if (window.toastManager) {
          window.toastManager.error(message);
        } else if (typeof showAlert === 'function') {
          showAlert(message, 'error');
        } else {
          alert(message);
        }
        if (serviceField) serviceField.focus();
        return false;
      }

      if (!text) {
        const message = 'Please write a review.';
        if (window.toastManager) {
          window.toastManager.error(message);
        } else if (typeof showAlert === 'function') {
          showAlert(message, 'error');
        } else {
          alert(message);
        }
        if (textField) textField.focus();
        return false;
      }

      // Show processing state
      const submitButton = document.querySelector('button[onclick*="submitReview"], button[type="submit"]');
      const originalText = submitButton ? submitButton.innerHTML : '';
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '📤 Submitting...';
      }

      // Prepare review data
      const reviewData = {
        name: name,
        businessType: businessType,
        service: service,
        text: text,
        rating: rating,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString()
      };

      console.log('Submitting review:', reviewData);

      // Success feedback
      const successMessage = `Thank you ${name}! Your ${rating}-star review has been submitted successfully.`;
      
      setTimeout(() => {
        if (window.toastManager) {
          window.toastManager.success(successMessage, { duration: 5000 });
        } else if (typeof showAlert === 'function') {
          showAlert(successMessage, 'success');
        } else {
          alert(successMessage);
        }

        // Reset form
        try {
          if (nameField) nameField.value = '';
          if (businessTypeField) businessTypeField.value = '';
          if (serviceField) serviceField.selectedIndex = 0;
          if (textField) textField.value = '';
          if (ratingField) ratingField.value = '';
          window.selectedRating = 0;

          // Reset stars
          if (typeof window.highlightStars === 'function') {
            window.highlightStars(0);
          }

          // Reset button
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
          }
        } catch (resetError) {
          console.warn('Error resetting form:', resetError);
        }

        console.log('✅ Review submitted successfully');
      }, 1000);

      // Add review to testimonials section
      try {
        if (typeof window.addReviewToTestimonials === 'function') {
          console.log('📝 Adding review to testimonials section...');
          const addSuccess = window.addReviewToTestimonials(reviewData);
          if (addSuccess) {
            console.log('✅ Review successfully added to testimonials');
          } else {
            console.warn('⚠️ Review submission succeeded but testimonials display failed');
          }
        } else {
          console.warn('⚠️ addReviewToTestimonials function not available');
          // Wait a bit and try again (function might be loading)
          setTimeout(() => {
            if (typeof window.addReviewToTestimonials === 'function') {
              console.log('📝 Retrying to add review to testimonials...');
              window.addReviewToTestimonials(reviewData);
            } else {
              console.error('❌ addReviewToTestimonials still not available after delay');
            }
          }, 1000);
        }
      } catch (addError) {
        console.error('❌ Error adding review to testimonials:', addError);
        if (window.toastManager) {
          window.toastManager.warning('Review submitted but may not appear immediately. Please refresh to see your review.');
        }
      }

      return false; // Prevent form submission
      
    } catch (error) {
      console.error('Error in submitReview:', error);
      
      const errorMessage = 'There was an error submitting your review. Please try again.';
      if (window.toastManager) {
        window.toastManager.error(errorMessage);
      } else if (typeof showAlert === 'function') {
        showAlert(errorMessage, 'error');
      } else {
        alert(errorMessage);
      }

      // Reset button state
      const submitButton = document.querySelector('button[onclick*="submitReview"], button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = '⭐ Submit Review Now';
      }

      return false;
    }
  };
}

// Create the function
const submitReviewFunction = createSubmitReview();

// Define it in multiple ways to ensure availability
window.submitReview = submitReviewFunction;
window['submitReview'] = submitReviewFunction;

// Use Object.defineProperty for extra robustness
try {
  Object.defineProperty(window, 'submitReview', {
    value: submitReviewFunction,
    writable: true,
    configurable: true,
    enumerable: true
  });
} catch (e) {
  console.warn('Could not use defineProperty for submitReview:', e);
}

// Verify function is working
console.log('✅ submitReview function type:', typeof window.submitReview);

// Test accessibility
try {
  if (typeof window.submitReview === 'function') {
    console.log('✅ submitReview is properly accessible');
  } else {
    throw new Error('Function not accessible after definition');
  }
} catch (error) {
  console.error('❌ CRITICAL: submitReview is not accessible:', error);
}

// Set up a safety net - redefine the function periodically
let submitReviewSafetyAttempts = 0;
const submitReviewSafetyInterval = setInterval(() => {
  if (typeof window.submitReview !== 'function') {
    console.warn('⚠️ submitReview missing, redefining...');
    window.submitReview = submitReviewFunction;
  }
  
  submitReviewSafetyAttempts++;
  if (submitReviewSafetyAttempts >= 10) { // Run for 5 seconds
    clearInterval(submitReviewSafetyInterval);
    console.log('🛡️ Safety net for submitReview completed');
  }
}, 500);

console.log('🛡️ submitReview function fix loaded and protected');
