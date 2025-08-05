// Fix missing updates for happy customers count and review display
console.log('🔧 Loading missing updates fix...');

// Fix 1: Ensure happy customers count updates properly
function fixHappyCustomersUpdate() {
  console.log('👥 Fixing happy customers count update...');
  
  // Override the unified rating update to ensure happy customers count is included
  const originalUnifiedUpdate = window.executeUnifiedRatingUpdate;
  
  if (typeof originalUnifiedUpdate === 'function') {
    window.executeUnifiedRatingUpdate = function() {
      console.log('🔄 Enhanced unified rating update with happy customers fix');
      
      // Call original function
      const result = originalUnifiedUpdate();
      
      // Additional check for happy customers count
      setTimeout(() => {
        const happyCustomersElement = document.getElementById('happyCustomersCount');
        if (happyCustomersElement) {
          const testimonialsGrid = document.getElementById('allCustomerReviews');
          if (testimonialsGrid) {
            const totalReviews = testimonialsGrid.children.length;
            const currentValue = happyCustomersElement.textContent;
            
            if (currentValue !== totalReviews.toString()) {
              console.log(`👥 Updating happy customers: ${currentValue} → ${totalReviews}`);
              happyCustomersElement.textContent = totalReviews.toString();
              
              // Visual feedback
              happyCustomersElement.style.transition = 'all 0.5s ease';
              happyCustomersElement.style.backgroundColor = '#10B981';
              happyCustomersElement.style.color = 'white';
              happyCustomersElement.style.padding = '2px 6px';
              happyCustomersElement.style.borderRadius = '4px';
              
              setTimeout(() => {
                happyCustomersElement.style.backgroundColor = '';
                happyCustomersElement.style.color = '';
                happyCustomersElement.style.padding = '';
                happyCustomersElement.style.borderRadius = '';
              }, 2000);
            }
          }
        }
      }, 100);
      
      return result;
    };
    
    console.log('✅ Happy customers update fixed');
  } else {
    console.warn('⚠️ executeUnifiedRatingUpdate not found');
  }
}

// Fix 2: Ensure addReviewToTestimonials works properly
function fixAddReviewToTestimonials() {
  console.log('📝 Fixing addReviewToTestimonials function...');
  
  // Store original function
  const originalAddReview = window.addReviewToTestimonials;
  
  window.addReviewToTestimonials = function(review) {
    console.log('📝 Enhanced addReviewToTestimonials called with:', review);
    
    try {
      // Find the testimonials grid using the correct ID
      const testimonialsGrid = document.getElementById('allCustomerReviews');
      
      if (!testimonialsGrid) {
        console.error('❌ Testimonials grid (#allCustomerReviews) not found');
        return false;
      }
      
      console.log('✅ Found testimonials grid with', testimonialsGrid.children.length, 'existing reviews');
      
      // Create the review element
      const reviewElement = document.createElement('div');
      reviewElement.className = 'bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 new-review';
      reviewElement.setAttribute('data-dynamic-review', 'true');
      reviewElement.style.animation = 'fadeInScale 0.6s ease-out';
      
      // Create star display
      const stars = '⭐'.repeat(review.rating);
      
      // Create review HTML
      reviewElement.innerHTML = `
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            ${review.name.charAt(0).toUpperCase()}
          </div>
          <div class="ml-4">
            <h4 class="font-semibold text-white">${review.name}</h4>
            <p class="text-purple-200 text-sm">${review.businessType}</p>
          </div>
        </div>
        <div class="text-yellow-400 text-lg mb-3">${stars}</div>
        <p class="text-purple-100 leading-relaxed">"${review.text}"</p>
        <div class="mt-4 text-sm text-purple-300">
          Service: ${review.service}
        </div>
      `;
      
      // Add to the beginning of the grid
      testimonialsGrid.insertBefore(reviewElement, testimonialsGrid.firstChild);
      
      console.log('✅ Review added to testimonials grid');
      
      // Show success message
      if (window.toastManager) {
        window.toastManager.success('Review added to testimonials!', { duration: 3000 });
      }
      
      // Trigger rating updates
      setTimeout(() => {
        console.log('🔄 Triggering rating update after adding review...');
        if (typeof window.executeUnifiedRatingUpdate === 'function') {
          window.executeUnifiedRatingUpdate();
        }
      }, 500);
      
      return true;
      
    } catch (error) {
      console.error('❌ Error in enhanced addReviewToTestimonials:', error);
      
      // Fall back to original function if available
      if (typeof originalAddReview === 'function') {
        console.log('🔄 Falling back to original addReviewToTestimonials...');
        return originalAddReview(review);
      }
      
      return false;
    }
  };
  
  console.log('✅ addReviewToTestimonials function enhanced');
}

// Fix 3: Ensure submitReview properly calls addReviewToTestimonials
function fixSubmitReviewFlow() {
  console.log('🔗 Fixing submitReview flow...');
  
  const originalSubmitReview = window.submitReview;
  
  if (typeof originalSubmitReview === 'function') {
    window.submitReview = function(event) {
      console.log('📝 Enhanced submitReview flow started');
      
      // Prevent default behavior
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      // Call original function
      let result;
      try {
        result = originalSubmitReview.call(this, event);
        console.log('✅ Original submitReview completed with result:', result);
        
        // Additional verification that review was added
        setTimeout(() => {
          const testimonialsGrid = document.getElementById('allCustomerReviews');
          if (testimonialsGrid) {
            const newReviews = testimonialsGrid.querySelectorAll('.new-review');
            console.log('📊 Found', newReviews.length, 'new reviews in grid');
            
            // Trigger rating update if we have new reviews
            if (newReviews.length > 0) {
              console.log('🔄 New reviews detected, triggering rating update...');
              if (typeof window.executeUnifiedRatingUpdate === 'function') {
                window.executeUnifiedRatingUpdate();
              }
            }
          }
        }, 1000);
        
      } catch (error) {
        console.error('❌ Error in enhanced submitReview:', error);
        result = false;
      }
      
      return result;
    };
    
    console.log('✅ submitReview flow enhanced');
  } else {
    console.warn('⚠️ Original submitReview function not found');
  }
}

// Manual test function
function testMissingUpdatesFix() {
  console.log('🧪 Testing missing updates fix...');
  
  // Test 1: Check happy customers element
  const happyCustomersElement = document.getElementById('happyCustomersCount');
  if (happyCustomersElement) {
    console.log('✅ Happy customers element found:', happyCustomersElement.textContent);
  } else {
    console.error('❌ Happy customers element not found');
  }
  
  // Test 2: Check testimonials grid
  const testimonialsGrid = document.getElementById('allCustomerReviews');
  if (testimonialsGrid) {
    console.log('✅ Testimonials grid found with', testimonialsGrid.children.length, 'reviews');
  } else {
    console.error('❌ Testimonials grid not found');
  }
  
  // Test 3: Check functions
  console.log('Functions available:');
  console.log('  addReviewToTestimonials:', typeof window.addReviewToTestimonials);
  console.log('  executeUnifiedRatingUpdate:', typeof window.executeUnifiedRatingUpdate);
  console.log('  submitReview:', typeof window.submitReview);
  
  return true;
}

// Initialize the fixes
function initializeMissingUpdatesFix() {
  console.log('🚀 Initializing missing updates fix...');
  
  setTimeout(() => {
    fixHappyCustomersUpdate();
    fixAddReviewToTestimonials();
    fixSubmitReviewFlow();
    
    console.log('✅ Missing updates fix initialization complete');
  }, 1000);
}

// Make test function globally available
window.testMissingUpdatesFix = testMissingUpdatesFix;

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMissingUpdatesFix);
} else {
  initializeMissingUpdatesFix();
}

setTimeout(initializeMissingUpdatesFix, 2000);

console.log('🔧 Missing updates fix loaded - happy customers count and review display should now work');
