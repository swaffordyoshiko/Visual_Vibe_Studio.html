// Aggressive rating updates fix - force ratings to update when reviews are added
console.log('🚀 Loading FORCE rating updates fix...');

// Global variables to track ratings
let currentReviewCount = 0;
let currentRatingSum = 0;

// Function to aggressively scan and calculate ratings from DOM
function forceCalculateRatings() {
  try {
    console.log('💪 FORCE calculating ratings from DOM...');

    const testimonialsGrid = document.getElementById('allCustomerReviews');
    if (!testimonialsGrid) {
      console.warn('⚠️ No testimonials grid found');
      return { totalReviews: 8, avgRating: '5.0', satisfaction: 98 }; // Default values
    }

    // Get all review elements (both static and dynamic)
    const allReviewElements = Array.from(testimonialsGrid.children);
    console.log('📊 Total review elements found:', allReviewElements.length);

    let totalRatingSum = 0;
    let totalReviews = 0;
    let satisfiedReviews = 0;

    allReviewElements.forEach((reviewElement, index) => {
      let rating = 5; // Default rating for static reviews
      let hasDynamicRating = false;

      // Try to extract rating from dynamic reviews (look for stars)
      const starsContainer = reviewElement.querySelector('.text-yellow-400');
      if (starsContainer) {
        const starsText = starsContainer.textContent || '';
        const starCount = (starsText.match(/⭐/g) || []).length;
        if (starCount > 0 && starCount <= 5) {
          rating = starCount;
          hasDynamicRating = true;
          console.log(`📝 Dynamic review ${index + 1}: ${starCount} stars`);
        }
      }

      // If no dynamic rating found, assume it's a static 5-star review
      if (!hasDynamicRating) {
        console.log(`📄 Static review ${index + 1}: 5 stars (assumed)`);
      }

      totalRatingSum += rating;
      totalReviews++;

      // Count satisfied customers (4+ stars)
      if (rating >= 4) {
        satisfiedReviews++;
      }
    });

    // Calculate metrics
    const avgRating = totalReviews > 0 ? (totalRatingSum / totalReviews).toFixed(1) : '5.0';
    const satisfactionPercentage = totalReviews > 0 ? Math.round((satisfiedReviews / totalReviews) * 100) : 98;

    console.log('📊 CALCULATED METRICS:', {
      totalReviews,
      totalRatingSum,
      avgRating,
      satisfiedReviews,
      satisfactionPercentage: satisfactionPercentage + '%'
    });

    return {
      totalReviews,
      avgRating,
      satisfaction: satisfactionPercentage
    };

  } catch (error) {
    console.error('❌ Error in force calculate ratings:', error);
    return { totalReviews: 8, avgRating: '5.0', satisfaction: 98 };
  }
}

// Function to aggressively update all rating elements in DOM
function forceUpdateRatingElements(metrics) {
  try {
    console.log('💪 FORCE updating rating elements:', metrics);

    // List of all possible rating element IDs
    const ratingElementUpdates = [
      { id: 'customerRating1', value: metrics.avgRating },
      { id: 'averageRating1', value: metrics.avgRating },
      { id: 'mainRating', value: `${metrics.avgRating}/5` },
      { id: 'happyCustomersCount', value: metrics.totalReviews.toString() },
      { id: 'customerSatisfactionPercent', value: `${metrics.satisfaction}%` }
    ];

    let updatedCount = 0;

    ratingElementUpdates.forEach(({ id, value }) => {
      const element = document.getElementById(id);
      if (element) {
        const oldValue = element.textContent;
        element.textContent = value;
        element.setAttribute('data-updated', 'true');
        element.setAttribute('data-value', value);
        console.log(`✅ UPDATED ${id}: ${oldValue} → ${value}`);
        updatedCount++;

        // Add visual feedback for the update
        element.style.transition = 'all 0.3s ease';
        element.style.color = '#22C55E'; // Green to show update
        setTimeout(() => {
          element.style.color = ''; // Reset color
        }, 1000);
      } else {
        console.warn(`⚠️ Element ${id} not found in DOM`);
      }
    });

    console.log(`✅ Successfully updated ${updatedCount} rating elements`);
    return updatedCount > 0;

  } catch (error) {
    console.error('❌ Error updating rating elements:', error);
    return false;
  }
}

// Main function to recalculate and update everything
function executeRatingUpdate() {
  console.log('🚀 Executing complete rating update...');
  
  const metrics = forceCalculateRatings();
  const success = forceUpdateRatingElements(metrics);
  
  if (success) {
    console.log('🎉 Rating update completed successfully!');
    
    // Show user notification
    if (window.toastManager) {
      window.toastManager.success(`Ratings updated! New average: ${metrics.avgRating}/5 stars from ${metrics.totalReviews} reviews`, { duration: 4000 });
    }
  } else {
    console.error('❌ Rating update failed');
  }
  
  return success;
}

// Override the addReviewToTestimonials function to trigger rating updates
function interceptTestimonialsFunction() {
  console.log('🔧 Intercepting addReviewToTestimonials function...');
  
  // Store original function
  const originalAddReview = window.addReviewToTestimonials;
  
  // Create wrapper function
  window.addReviewToTestimonials = function(review) {
    console.log('📝 INTERCEPTED addReviewToTestimonials with rating update trigger');
    
    let result = false;
    
    // Call original function if it exists
    if (typeof originalAddReview === 'function') {
      try {
        result = originalAddReview(review);
        console.log('✅ Original addReviewToTestimonials completed');
      } catch (error) {
        console.error('❌ Error in original addReviewToTestimonials:', error);
      }
    }
    
    // FORCE rating update after review is added
    setTimeout(() => {
      console.log('🔄 Triggering FORCED rating update after review addition...');
      executeRatingUpdate();
    }, 200); // Small delay to ensure DOM is updated
    
    // Also trigger another update after a longer delay for safety
    setTimeout(() => {
      console.log('🔄 Safety FORCED rating update...');
      executeRatingUpdate();
    }, 1000);
    
    return result;
  };
  
  console.log('✅ addReviewToTestimonials intercepted successfully');
}

// Set up periodic rating updates to catch any missed updates
function setupPeriodicUpdates() {
  console.log('⏰ Setting up periodic rating updates...');
  
  let updateCount = 0;
  const maxUpdates = 20; // Run for 2 minutes
  
  const interval = setInterval(() => {
    const testimonialsGrid = document.getElementById('allCustomerReviews');
    if (testimonialsGrid) {
      const currentReviews = testimonialsGrid.children.length;
      
      // Only update if review count changed
      if (currentReviews !== currentReviewCount) {
        console.log(`📊 Review count changed: ${currentReviewCount} → ${currentReviews}`);
        currentReviewCount = currentReviews;
        executeRatingUpdate();
      }
    }
    
    updateCount++;
    if (updateCount >= maxUpdates) {
      clearInterval(interval);
      console.log('⏰ Periodic updates completed');
    }
  }, 6000); // Every 6 seconds
  
  console.log('✅ Periodic updates setup complete');
}

// Initialize everything
function initializeForceRatingUpdates() {
  console.log('🚀 Initializing FORCE rating updates system...');
  
  // Intercept the testimonials function
  interceptTestimonialsFunction();
  
  // Do initial rating calculation
  setTimeout(() => {
    console.log('🔄 Initial rating calculation...');
    executeRatingUpdate();
  }, 1000);
  
  // Setup periodic monitoring
  setupPeriodicUpdates();
  
  // Make rating update function globally available
  window.executeRatingUpdate = executeRatingUpdate;
  window.forceCalculateRatings = forceCalculateRatings;
  
  console.log('✅ FORCE rating updates system initialized');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeForceRatingUpdates);
} else {
  initializeForceRatingUpdates();
}

// Also initialize after delays to ensure all scripts are loaded
setTimeout(initializeForceRatingUpdates, 2000);
setTimeout(initializeForceRatingUpdates, 5000);

console.log('🛡️ FORCE rating updates loaded and ready to override everything!');
