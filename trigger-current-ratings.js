// Immediate trigger for current ratings - simple manual calculation
console.log('⚡ Loading immediate current ratings trigger...');

function calculateAndShowCurrentRatings() {
  console.log('📊 Manually calculating current ratings...');
  
  try {
    const testimonialsGrid = document.getElementById('allCustomerReviews');
    if (!testimonialsGrid) {
      console.warn('⚠️ Testimonials grid not found');
      return false;
    }
    
    const allReviews = Array.from(testimonialsGrid.children);
    console.log(`📝 Found ${allReviews.length} reviews to analyze`);
    
    let totalRatingSum = 0;
    let validReviewCount = 0;
    let satisfiedCount = 0;
    
    allReviews.forEach((review, index) => {
      // Skip empty elements
      if (!review.textContent.trim()) {
        return;
      }
      
      let rating = 5; // Default for static reviews
      
      // Look for dynamic star ratings
      const yellowStars = review.querySelector('.text-yellow-400, .text-yellow-500');
      if (yellowStars) {
        const starsText = yellowStars.textContent || yellowStars.innerHTML;
        const starMatches = starsText.match(/⭐/g);
        if (starMatches && starMatches.length > 0) {
          rating = starMatches.length;
          console.log(`⭐ Review ${index + 1}: ${rating} stars (dynamic)`);
        } else {
          console.log(`📄 Review ${index + 1}: ${rating} stars (static)`);
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
    
    console.log('📊 Calculated metrics:', {
      totalReviews: validReviewCount,
      avgRating,
      satisfaction: satisfactionPercent
    });
    
    // Update the elements directly
    const updates = [
      { id: 'happyCustomersCount', value: validReviewCount.toString() },
      { id: 'customerRating1', value: avgRating },
      { id: 'averageRating1', value: avgRating },
      { id: 'customerSatisfactionPercent', value: satisfactionPercent + '%' }
    ];
    
    updates.forEach(({ id, value }) => {
      const element = document.getElementById(id);
      if (element) {
        const oldValue = element.textContent;
        element.textContent = value;
        
        // Green highlighting for successful update
        element.style.transition = 'all 0.5s ease';
        element.style.backgroundColor = '#10B981';
        element.style.color = 'white';
        element.style.padding = '2px 6px';
        element.style.borderRadius = '4px';
        
        setTimeout(() => {
          element.style.backgroundColor = '';
          element.style.color = '';
          element.style.padding = '';
          element.style.borderRadius = '';
        }, 2000);
        
        console.log(`✅ Updated ${id}: "${oldValue}" → "${value}"`);
      }
    });
    
    // Show success message
    if (window.toastManager) {
      window.toastManager.success(`Current ratings updated: ${avgRating}/5 from ${validReviewCount} reviews (${satisfactionPercent}% satisfaction)`, { 
        duration: 4000 
      });
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ Error calculating current ratings:', error);
    return false;
  }
}

// Make function globally available
window.calculateAndShowCurrentRatings = calculateAndShowCurrentRatings;

// Run immediately
setTimeout(() => {
  console.log('⚡ Auto-triggering current ratings calculation...');
  calculateAndShowCurrentRatings();
}, 2000);

// Also run when DOM changes
setTimeout(() => {
  const testimonialsGrid = document.getElementById('allCustomerReviews');
  if (testimonialsGrid) {
    const observer = new MutationObserver(() => {
      console.log('📝 Reviews changed, updating current ratings...');
      setTimeout(calculateAndShowCurrentRatings, 500);
    });
    
    observer.observe(testimonialsGrid, {
      childList: true,
      subtree: true
    });
    
    console.log('👁️ Monitoring testimonials for changes');
  }
}, 3000);

console.log('⚡ Immediate current ratings trigger loaded');
