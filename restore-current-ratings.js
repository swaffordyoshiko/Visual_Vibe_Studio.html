// Restore current review status - disable perfect ratings system
console.log('🔄 Restoring current customer review status...');

function disablePerfectRatings() {
  console.log('🛑 Disabling perfect ratings system...');
  
  // Stop the perfect ratings monitoring
  if (window.setPerfectRatings) {
    window.setPerfectRatings = function() {
      console.log('🚫 Perfect ratings disabled - showing current status instead');
      return false;
    };
  }
  
  // Remove perfect rating attributes
  const ratingElements = [
    'customerRating1',
    'averageRating1', 
    'customerSatisfactionPercent',
    'happyCustomersCount'
  ];
  
  ratingElements.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.removeAttribute('data-perfect');
      element.removeAttribute('data-perfect-value');
      console.log(`🔄 Removed perfect rating attributes from ${id}`);
    }
  });
  
  console.log('✅ Perfect ratings system disabled');
}

function restoreAccurateCalculations() {
  console.log('🎯 Restoring accurate rating calculations...');
  
  // Restore the accurate rating calculation function
  window.calculateCurrentRatings = function() {
    console.log('📊 Calculating current review status...');
    
    try {
      const testimonialsGrid = document.getElementById('allCustomerReviews');
      if (!testimonialsGrid) {
        console.warn('⚠️ Testimonials grid not found');
        return null;
      }
      
      const allReviews = Array.from(testimonialsGrid.children);
      console.log(`📝 Processing ${allReviews.length} reviews`);
      
      let totalRatingSum = 0;
      let validReviewCount = 0;
      let satisfiedCount = 0;
      
      allReviews.forEach((review, index) => {
        // Skip empty elements
        if (!review.textContent.trim()) {
          return;
        }
        
        let rating = 5; // Default for static reviews
        
        // Look for dynamic star ratings first
        const yellowStars = review.querySelector('.text-yellow-400, .text-yellow-500');
        if (yellowStars) {
          const starsText = yellowStars.textContent || yellowStars.innerHTML;
          const starMatches = starsText.match(/⭐/g);
          if (starMatches && starMatches.length > 0) {
            rating = starMatches.length;
            console.log(`⭐ Review ${index + 1}: ${rating} stars (dynamic)`);
          }
        } else {
          console.log(`📄 Review ${index + 1}: ${rating} stars (static)`);
        }
        
        totalRatingSum += rating;
        validReviewCount++;
        
        if (rating >= 4) {
          satisfiedCount++;
        }
      });
      
      const avgRating = validReviewCount > 0 ? (totalRatingSum / validReviewCount).toFixed(1) : '5.0';
      const satisfactionPercent = validReviewCount > 0 ? Math.round((satisfiedCount / validReviewCount) * 100) : 100;
      
      const result = {
        totalReviews: validReviewCount,
        avgRating: parseFloat(avgRating),
        avgRatingString: avgRating,
        satisfaction: satisfactionPercent
      };
      
      console.log('📊 Current status calculated:', result);
      return result;
      
    } catch (error) {
      console.error('❌ Error calculating current ratings:', error);
      return null;
    }
  };
  
  console.log('✅ Accurate calculations restored');
}

function updateCurrentRatings() {
  console.log('🔄 Updating to current review status...');
  
  const current = window.calculateCurrentRatings();
  if (!current) {
    console.error('❌ Could not calculate current ratings');
    return false;
  }
  
  const updates = [
    { id: 'happyCustomersCount', value: current.totalReviews.toString(), description: 'Happy Customers' },
    { id: 'customerRating1', value: current.avgRatingString, description: 'Customer Rating' },
    { id: 'averageRating1', value: current.avgRatingString, description: 'Average Rating' },
    { id: 'customerSatisfactionPercent', value: current.satisfaction + '%', description: 'Customer Satisfaction' }
  ];
  
  updates.forEach(({ id, value, description }) => {
    const element = document.getElementById(id);
    if (element) {
      const oldValue = element.textContent;
      element.textContent = value;
      element.setAttribute('data-current', 'true');
      element.setAttribute('data-current-value', value);
      
      // Blue highlighting for current status
      element.style.transition = 'all 0.5s ease';
      element.style.backgroundColor = '#3B82F6';
      element.style.color = 'white';
      element.style.padding = '2px 6px';
      element.style.borderRadius = '4px';
      
      setTimeout(() => {
        element.style.backgroundColor = '';
        element.style.color = '';
        element.style.padding = '';
        element.style.borderRadius = '';
      }, 2000);
      
      console.log(`📊 Updated ${description}: "${oldValue}" → "${value}"`);
    }
  });
  
  // Show current status message
  if (window.toastManager) {
    window.toastManager.info(`Current status: ${current.avgRatingString}/5 stars from ${current.totalReviews} reviews (${current.satisfaction}% satisfaction)`, { 
      duration: 5000 
    });
  }
  
  return true;
}

function restoreRatingFunctions() {
  console.log('🔧 Restoring rating update functions...');
  
  // Restore unified rating update
  window.executeUnifiedRatingUpdate = function() {
    console.log('🔄 Unified rating update - showing current status');
    return updateCurrentRatings();
  };
  
  // Restore force rating update
  window.executeRatingUpdate = function() {
    console.log('🔄 Force rating update - showing current status');
    return updateCurrentRatings();
  };
  
  // Restore accurate rating update
  window.updateWithAccurateRatings = function() {
    console.log('🔄 Accurate rating update - showing current status');
    return updateCurrentRatings();
  };
  
  console.log('✅ Rating functions restored to show current status');
}

function initializeCurrentRatingsSystem() {
  console.log('🚀 Initializing current ratings system...');
  
  setTimeout(() => {
    // Disable perfect ratings
    disablePerfectRatings();
    
    // Restore accurate calculations
    restoreAccurateCalculations();
    
    // Restore rating functions
    restoreRatingFunctions();
    
    // Update to current status
    updateCurrentRatings();
    
    console.log('✅ Current ratings system fully restored');
  }, 1000);
}

// Make functions globally available
window.updateCurrentRatings = updateCurrentRatings;
window.calculateCurrentRatings = restoreAccurateCalculations().calculateCurrentRatings;
window.disablePerfectRatings = disablePerfectRatings;

// Test function
window.testCurrentRatings = function() {
  console.log('🧪 Testing current ratings system...');
  const current = window.calculateCurrentRatings();
  if (current) {
    console.log('📊 Current ratings:', current);
    updateCurrentRatings();
    return true;
  }
  return false;
};

// Initialize immediately
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCurrentRatingsSystem);
} else {
  initializeCurrentRatingsSystem();
}

setTimeout(initializeCurrentRatingsSystem, 1500);

console.log('🔄 Current ratings restore system loaded - will show actual review status');
