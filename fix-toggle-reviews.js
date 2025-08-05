// Fix for toggleAllCustomerReviews undefined error
console.log('🔧 Loading toggleAllCustomerReviews fix...');

// Define a robust version of toggleAllCustomerReviews
function createToggleAllCustomerReviews() {
  return function toggleAllCustomerReviews(event) {
    console.log('🔧 toggleAllCustomerReviews called');

    try {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      const buttonText = document.getElementById('viewAllCustomerReviewsText');
      const reviewsContainer = document.getElementById('allCustomerReviews');

      if (buttonText) {
        if (buttonText.textContent.includes('View All')) {
          buttonText.textContent = 'Hide Recent Reviews';
          console.log('Switching to show all reviews mode');

          // Show all reviews if container exists
          if (reviewsContainer) {
            reviewsContainer.style.display = 'block';
          }

          // Try to load more reviews if function is available
          if (typeof window.forceDisplayAllReviews === 'function') {
            window.forceDisplayAllReviews();
          } else if (typeof window.displayReviews === 'function') {
            window.displayReviews();
          }

        } else {
          buttonText.textContent = 'View All Reviews';
          console.log('Switching to hide reviews mode');

          // Hide extra reviews if container exists
          if (reviewsContainer) {
            const reviews = reviewsContainer.querySelectorAll('.review-item');
            reviews.forEach((review, index) => {
              if (index >= 6) { // Show only first 6 reviews
                review.style.display = 'none';
              }
            });
          }
        }
      } else {
        console.warn('viewAllCustomerReviewsText element not found');
      }

      return false;
    } catch (error) {
      console.error('Error in toggleAllCustomerReviews:', error);
      if (window.toastManager) {
        window.toastManager.error('Review toggle temporarily unavailable. Please try again in a moment.');
      } else {
        alert('Review toggle temporarily unavailable. Please try again in a moment.');
      }
      return false;
    }
  };
}

// Create and assign the function immediately
const toggleFunction = createToggleAllCustomerReviews();

// Define it in multiple ways to ensure it's always available
window.toggleAllCustomerReviews = toggleFunction;
window['toggleAllCustomerReviews'] = toggleFunction;

// Use Object.defineProperty for extra robustness
try {
  Object.defineProperty(window, 'toggleAllCustomerReviews', {
    value: toggleFunction,
    writable: true,
    configurable: true,
    enumerable: true
  });
} catch (e) {
  console.warn('Could not use defineProperty for toggleAllCustomerReviews:', e);
}

// Verify it's working
console.log('✅ toggleAllCustomerReviews function type:', typeof window.toggleAllCustomerReviews);

// Test accessibility
try {
  if (typeof window.toggleAllCustomerReviews === 'function') {
    console.log('✅ toggleAllCustomerReviews is properly accessible');
  } else {
    throw new Error('Function not accessible after definition');
  }
} catch (error) {
  console.error('❌ CRITICAL: toggleAllCustomerReviews is not accessible:', error);
}

// Set up a safety net - redefine the function periodically
let toggleSafetyAttempts = 0;
const toggleSafetyInterval = setInterval(() => {
  if (typeof window.toggleAllCustomerReviews !== 'function') {
    console.warn('⚠️ toggleAllCustomerReviews missing, redefining...');
    window.toggleAllCustomerReviews = toggleFunction;
  }

  toggleSafetyAttempts++;
  if (toggleSafetyAttempts >= 10) { // Run for 5 seconds
    clearInterval(toggleSafetyInterval);
    console.log('🛡️ Safety net for toggleAllCustomerReviews completed');
  }
}, 500);

console.log('🛡️ toggleAllCustomerReviews fix loaded and protected');
