// Fix for rating updates when customers leave reviews
console.log('📊 Loading rating updates fix...');

// Function to calculate and update all rating statistics
function updateRatingsAndStats() {
  try {
    console.log('📊 Updating ratings and statistics...');

    // Get all reviews from the testimonials grid
    const testimonialsGrid = document.getElementById('allCustomerReviews');
    if (!testimonialsGrid) {
      console.warn('⚠️ Testimonials grid not found for rating calculation');
      return false;
    }

    // Get all dynamic reviews (customer submitted) with ratings
    const dynamicReviews = Array.from(testimonialsGrid.querySelectorAll('[data-dynamic-review="true"]'));
    console.log('📝 Found dynamic reviews:', dynamicReviews.length);

    // Extract ratings from dynamic reviews
    const dynamicRatings = [];
    dynamicReviews.forEach(reviewElement => {
      // Count the star ratings (⭐ characters)
      const starsText = reviewElement.querySelector('.text-yellow-400')?.textContent || '';
      const starCount = (starsText.match(/⭐/g) || []).length;
      if (starCount > 0 && starCount <= 5) {
        dynamicRatings.push(starCount);
      }
    });

    console.log('⭐ Dynamic ratings extracted:', dynamicRatings);

    // Count static reviews (assume they're all 5-star for now)
    const staticReviews = Array.from(testimonialsGrid.children).filter(child => 
      !child.hasAttribute('data-dynamic-review')
    );
    const staticReviewsCount = staticReviews.length;
    console.log('📊 Static reviews count:', staticReviewsCount);

    // Calculate totals
    const totalDynamicReviews = dynamicRatings.length;
    const totalStaticReviews = staticReviewsCount;
    const totalReviews = totalDynamicReviews + totalStaticReviews;

    // Calculate average rating
    let avgRating = 5.0; // Default
    if (totalReviews > 0) {
      const dynamicRatingSum = dynamicRatings.reduce((sum, rating) => sum + rating, 0);
      const staticRatingSum = totalStaticReviews * 5; // Assume static reviews are 5-star
      const totalRatingSum = dynamicRatingSum + staticRatingSum;
      avgRating = (totalRatingSum / totalReviews).toFixed(1);
    }

    console.log('📊 Calculated metrics:', {
      totalReviews,
      totalDynamicReviews,
      totalStaticReviews,
      avgRating
    });

    // Update rating elements
    const ratingElements = [
      { id: 'customerRating1', value: avgRating },
      { id: 'averageRating1', value: avgRating },
      { id: 'mainRating', value: `${avgRating}/5` }
    ];

    ratingElements.forEach(({ id, value }) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = value;
        console.log(`✅ Updated ${id} to: ${value}`);
      } else {
        console.warn(`⚠️ Rating element ${id} not found`);
      }
    });

    // Update happy customers count
    const happyCustomersElement = document.getElementById('happyCustomersCount');
    if (happyCustomersElement) {
      happyCustomersElement.textContent = totalReviews.toString();
      console.log(`✅ Updated happy customers count to: ${totalReviews}`);
    } else {
      console.warn('⚠️ Happy customers element not found');
    }

    // Calculate and update customer satisfaction (4+ star reviews)
    const satisfiedDynamicReviews = dynamicRatings.filter(rating => rating >= 4).length;
    const satisfiedStaticReviews = totalStaticReviews; // Assume all static are satisfied
    const totalSatisfiedReviews = satisfiedDynamicReviews + satisfiedStaticReviews;
    const satisfactionPercentage = totalReviews > 0 ? 
      Math.round((totalSatisfiedReviews / totalReviews) * 100) : 98;

    const customerSatisfactionElement = document.getElementById('customerSatisfactionPercent');
    if (customerSatisfactionElement) {
      customerSatisfactionElement.textContent = `${satisfactionPercentage}%`;
      console.log(`✅ Updated customer satisfaction to: ${satisfactionPercentage}%`);
    } else {
      console.warn('⚠️ Customer satisfaction element not found');
    }

    console.log('✅ Rating updates completed successfully');
    return true;

  } catch (error) {
    console.error('❌ Error updating ratings and stats:', error);
    return false;
  }
}

// Enhanced version of the addReviewToTestimonials function that updates ratings
function enhanceAddReviewToTestimonials() {
  // Store the original function if it exists
  const originalAddReview = window.addReviewToTestimonials;

  // Create enhanced version
  window.addReviewToTestimonials = function(review) {
    try {
      console.log('📝 Enhanced addReviewToTestimonials called with rating update');

      // Call the original function
      let result = true;
      if (typeof originalAddReview === 'function') {
        result = originalAddReview(review);
      }

      // Update ratings after adding the review
      setTimeout(() => {
        updateRatingsAndStats();
        
        // Show updated stats notification
        if (window.toastManager) {
          window.toastManager.info(`Ratings updated! New average: ${document.getElementById('averageRating1')?.textContent || 'N/A'}/5`, { duration: 3000 });
        }
      }, 500); // Small delay to ensure DOM is updated

      return result;
    } catch (error) {
      console.error('❌ Error in enhanced addReviewToTestimonials:', error);
      return false;
    }
  };

  console.log('✅ Enhanced addReviewToTestimonials with rating updates');
}

// Function to monitor for new reviews and update ratings automatically
function setupRatingUpdateMonitoring() {
  const testimonialsGrid = document.getElementById('allCustomerReviews');
  if (!testimonialsGrid) {
    console.warn('⚠️ Cannot setup monitoring - testimonials grid not found');
    return;
  }

  // Use MutationObserver to watch for new reviews being added
  const observer = new MutationObserver((mutations) => {
    let shouldUpdate = false;
    
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        // Check if any added nodes are review elements
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && node.hasAttribute && node.hasAttribute('data-dynamic-review')) {
            console.log('🔍 New review detected, triggering rating update');
            shouldUpdate = true;
          }
        });
      }
    });

    if (shouldUpdate) {
      // Delay update to ensure all DOM changes are complete
      setTimeout(updateRatingsAndStats, 100);
    }
  });

  observer.observe(testimonialsGrid, {
    childList: true,
    subtree: true
  });

  console.log('✅ Rating update monitoring setup complete');
}

// Make functions globally available
window.updateRatingsAndStats = updateRatingsAndStats;

// Initialize when DOM is ready
function initializeRatingUpdates() {
  console.log('🚀 Initializing rating updates system...');
  
  // Enhance the addReviewToTestimonials function
  enhanceAddReviewToTestimonials();
  
  // Setup monitoring for automatic updates
  setupRatingUpdateMonitoring();
  
  // Initial rating calculation
  setTimeout(updateRatingsAndStats, 1000);
  
  console.log('✅ Rating updates system initialized');
}

// Initialize immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeRatingUpdates);
} else {
  initializeRatingUpdates();
}

// Also initialize after a delay to ensure all other scripts have loaded
setTimeout(initializeRatingUpdates, 2000);

console.log('🛡️ Rating updates fix loaded and protected');
