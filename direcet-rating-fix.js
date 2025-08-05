// DIRECT rating fix - immediate and aggressive approach
console.log('🎯 Loading DIRECT rating fix...');

// Direct DOM monitoring and immediate updates
function setupDirectRatingMonitoring() {
  console.log('🔍 Setting up direct rating monitoring...');
  
  const testimonialsGrid = document.getElementById('allCustomerReviews');
  if (!testimonialsGrid) {
    console.error('❌ Cannot find allCustomerReviews grid');
    return;
  }

  // Function to immediately count and update ratings
  function immediateRatingUpdate() {
    console.log('⚡ IMMEDIATE rating update triggered');
    
    try {
      // Count all review elements in the grid
      const allReviews = Array.from(testimonialsGrid.children);
      const totalReviews = allReviews.length;
      
      console.log(`📊 Found ${totalReviews} total reviews in grid`);
      
      // Calculate ratings from actual review content
      let totalRatingSum = 0;
      let dynamicReviewCount = 0;
      let satisfiedCount = 0;
      
      allReviews.forEach((review, index) => {
        let rating = 5; // Default for static reviews
        
        // Try to extract rating from dynamic reviews
        const starsElement = review.querySelector('.text-yellow-400, [class*="star"], [class*="rating"]');
        if (starsElement) {
          const starsText = starsElement.textContent || starsElement.innerHTML;
          const starMatches = starsText.match(/⭐/g);
          if (starMatches && starMatches.length > 0) {
            rating = starMatches.length;
            dynamicReviewCount++;
            console.log(`📝 Review ${index + 1}: ${rating} stars (dynamic)`);
          } else {
            console.log(`📄 Review ${index + 1}: 5 stars (static)`);
          }
        } else {
          console.log(`📄 Review ${index + 1}: 5 stars (static, no stars element)`);
        }
        
        totalRatingSum += rating;
        if (rating >= 4) satisfiedCount++;
      });
      
      // Calculate metrics
      const avgRating = totalReviews > 0 ? (totalRatingSum / totalReviews).toFixed(1) : '5.0';
      const satisfactionPercent = totalReviews > 0 ? Math.round((satisfiedCount / totalReviews) * 100) : 98;
      
      console.log('📊 CALCULATED METRICS:', {
        totalReviews,
        dynamicReviewCount,
        totalRatingSum,
        avgRating,
        satisfiedCount,
        satisfactionPercent: satisfactionPercent + '%'
      });
      
      // DIRECTLY update all rating elements
      const updates = [
        { id: 'happyCustomersCount', value: totalReviews.toString() },
        { id: 'customerRating1', value: avgRating },
        { id: 'averageRating1', value: avgRating },
        { id: 'customerSatisfactionPercent', value: satisfactionPercent + '%' }
      ];
      
      let successCount = 0;
      updates.forEach(({ id, value }) => {
        const element = document.getElementById(id);
        if (element) {
          const oldValue = element.textContent;
          element.textContent = value;
          element.setAttribute('data-updated', 'true');
          element.setAttribute('data-value', value);
          
          // Visual feedback
          element.style.transition = 'all 0.5s ease';
          element.style.backgroundColor = '#22C55E';
          element.style.color = 'white';
          element.style.padding = '2px 6px';
          element.style.borderRadius = '4px';
          
          setTimeout(() => {
            element.style.backgroundColor = '';
            element.style.color = '';
            element.style.padding = '';
            element.style.borderRadius = '';
          }, 1500);
          
          console.log(`✅ UPDATED ${id}: "${oldValue}" → "${value}"`);
          successCount++;
        } else {
          console.error(`❌ Element ${id} NOT FOUND`);
        }
      });
      
      if (successCount > 0) {
        console.log(`🎉 Successfully updated ${successCount}/${updates.length} rating elements`);
        
        // Show success notification
        if (window.toastManager) {
          window.toastManager.success(`Ratings updated! ${avgRating}/5 stars from ${totalReviews} customers`, { duration: 4000 });
        }
        
        return true;
      } else {
        console.error('❌ Failed to update any rating elements');
        return false;
      }
      
    } catch (error) {
      console.error('❌ Error in immediate rating update:', error);
      return false;
    }
  }
  
  // Set up MutationObserver for immediate detection
  const observer = new MutationObserver((mutations) => {
    let shouldUpdate = false;
    
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            console.log('🔍 New element added to testimonials grid');
            shouldUpdate = true;
          }
        });
      }
    });
    
    if (shouldUpdate) {
      console.log('🚨 Change detected in testimonials grid - triggering immediate update');
      setTimeout(immediateRatingUpdate, 100);
    }
  });
  
  observer.observe(testimonialsGrid, {
    childList: true,
    subtree: false
  });
  
  console.log('✅ Direct monitoring setup complete');
  
  // Return the update function for manual calling
  return immediateRatingUpdate;
}

// Enhanced submit review function that triggers immediate updates
function enhanceSubmitReviewWithDirectUpdates() {
  console.log('🔧 Enhancing submitReview with direct updates...');
  
  const originalSubmitReview = window.submitReview;
  
  window.submitReview = function(event) {
    console.log('📝 ENHANCED submitReview called');
    
    let result = false;
    
    // Call original function
    if (typeof originalSubmitReview === 'function') {
      try {
        result = originalSubmitReview(event);
      } catch (error) {
        console.error('❌ Error in original submitReview:', error);
      }
    }
    
    // Force immediate rating update after review submission
    setTimeout(() => {
      console.log('🔄 Forcing rating update after review submission...');
      if (window.directRatingUpdate) {
        window.directRatingUpdate();
      }
    }, 500);
    
    // Additional safety update
    setTimeout(() => {
      console.log('🔄 Safety rating update...');
      if (window.directRatingUpdate) {
        window.directRatingUpdate();
      }
    }, 2000);
    
    return result;
  };
  
  console.log('✅ submitReview enhanced with direct updates');
}

// Enhanced addReviewToTestimonials function
function enhanceAddReviewWithDirectUpdates() {
  console.log('🔧 Enhancing addReviewToTestimonials with direct updates...');
  
  const originalAddReview = window.addReviewToTestimonials;
  
  window.addReviewToTestimonials = function(review) {
    console.log('📝 ENHANCED addReviewToTestimonials called');
    
    let result = false;
    
    // Call original function
    if (typeof originalAddReview === 'function') {
      try {
        result = originalAddReview(review);
      } catch (error) {
        console.error('❌ Error in original addReviewToTestimonials:', error);
      }
    }
    
    // IMMEDIATELY update ratings after adding review
    setTimeout(() => {
      console.log('🔄 Immediate rating update after adding review...');
      if (window.directRatingUpdate) {
        window.directRatingUpdate();
      }
    }, 200);
    
    return result;
  };
  
  console.log('✅ addReviewToTestimonials enhanced with direct updates');
}

// Initialize the direct rating system
function initializeDirectRatingSystem() {
  console.log('🚀 Initializing DIRECT rating system...');
  
  // Setup monitoring and get the update function
  const updateFunction = setupDirectRatingMonitoring();
  if (updateFunction) {
    window.directRatingUpdate = updateFunction;
    console.log('✅ Direct rating update function available globally');
  }
  
  // Enhance existing functions
  enhanceSubmitReviewWithDirectUpdates();
  enhanceAddReviewWithDirectUpdates();
  
  // Initial rating update
  setTimeout(() => {
    console.log('🔄 Initial direct rating update...');
    if (window.directRatingUpdate) {
      window.directRatingUpdate();
    }
  }, 1000);
  
  console.log('✅ Direct rating system initialized');
}

// Initialize immediately and with delays
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeDirectRatingSystem);
} else {
  initializeDirectRatingSystem();
}

// Multiple initialization attempts to ensure it works
setTimeout(initializeDirectRatingSystem, 1000);
setTimeout(initializeDirectRatingSystem, 3000);
setTimeout(initializeDirectRatingSystem, 5000);

// Make direct update function globally available for testing
window.testDirectRatingUpdate = function() {
  console.log('🧪 Manual direct rating update test...');
  if (window.directRatingUpdate) {
    return window.directRatingUpdate();
  } else {
    console.error('❌ Direct rating update function not available');
    return false;
  }
};

console.log('🎯 DIRECT rating fix loaded - use testDirectRatingUpdate() to test manually');
