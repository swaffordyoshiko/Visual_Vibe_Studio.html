// PERMANENT rating fix - automatically detects and updates ratings for real customer reviews
console.log('🔧 Loading PERMANENT rating fix...');

// Store the working update function
let workingRatingUpdate = null;

// Function to establish the working rating update mechanism
function establishWorkingRatingUpdate() {
  workingRatingUpdate = function() {
    console.log('⚡ WORKING rating update executing...');
    
    try {
      const testimonialsGrid = document.getElementById('allCustomerReviews');
      if (!testimonialsGrid) {
        console.warn('⚠️ Testimonials grid not found');
        return false;
      }

      const allReviews = Array.from(testimonialsGrid.children);
      const totalReviews = allReviews.length;
      
      let totalRatingSum = 0;
      let satisfiedCount = 0;
      
      allReviews.forEach((review, index) => {
        let rating = 5; // Default for static reviews
        
        const starsElement = review.querySelector('.text-yellow-400, [class*="star"], [class*="rating"]');
        if (starsElement) {
          const starsText = starsElement.textContent || starsElement.innerHTML;
          const starMatches = starsText.match(/⭐/g);
          if (starMatches && starMatches.length > 0) {
            rating = starMatches.length;
            console.log(`📝 Review ${index + 1}: ${rating} stars (dynamic)`);
          }
        }
        
        totalRatingSum += rating;
        if (rating >= 4) satisfiedCount++;
      });
      
      const avgRating = totalReviews > 0 ? (totalRatingSum / totalReviews).toFixed(1) : '5.0';
      const satisfactionPercent = totalReviews > 0 ? Math.round((satisfiedCount / totalReviews) * 100) : 98;
      
      // Update all elements
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
          
          console.log(`✅ UPDATED ${id}: "${value}"`);
          successCount++;
        }
      });
      
      if (successCount > 0) {
        console.log(`🎉 Successfully updated ${successCount} rating elements`);
        if (window.toastManager) {
          window.toastManager.success(`Ratings updated! ${avgRating}/5 stars from ${totalReviews} customers`, { duration: 4000 });
        }
        return true;
      }
      
      return false;
      
    } catch (error) {
      console.error('❌ Error in working rating update:', error);
      return false;
    }
  };
  
  console.log('✅ Working rating update established');
  return workingRatingUpdate;
}

// Function to hook into form submissions
function hookIntoFormSubmissions() {
  console.log('🔗 Hooking into form submissions...');
  
  // Find the review form
  const reviewForm = document.querySelector('form[id*="review"], form[action*="review"], form:has(input[name="rating"], select[name="services"])');
  
  if (reviewForm) {
    console.log('✅ Found review form, adding submission listener');
    
    reviewForm.addEventListener('submit', function(event) {
      console.log('📝 REAL REVIEW FORM SUBMITTED - triggering rating update');
      
      // Delay the rating update to ensure the review gets added to DOM first
      setTimeout(() => {
        if (workingRatingUpdate) {
          console.log('🔄 Executing rating update after form submission...');
          workingRatingUpdate();
        }
      }, 1000);
      
      // Additional safety update
      setTimeout(() => {
        if (workingRatingUpdate) {
          console.log('🔄 Safety rating update after form submission...');
          workingRatingUpdate();
        }
      }, 3000);
    });
  } else {
    console.warn('⚠️ Could not find review form for hooking');
  }
  
  // Also hook into any button clicks that might submit reviews
  const submitButtons = document.querySelectorAll('button[onclick*="submitReview"], button[onclick*="submit"], button[type="submit"]');
  submitButtons.forEach(button => {
    if (button.textContent.toLowerCase().includes('review') || button.textContent.toLowerCase().includes('submit')) {
      console.log('✅ Adding click listener to submit button:', button.textContent);
      
      button.addEventListener('click', function() {
        console.log('📝 SUBMIT BUTTON CLICKED - triggering rating update');
        
        setTimeout(() => {
          if (workingRatingUpdate) {
            console.log('🔄 Executing rating update after button click...');
            workingRatingUpdate();
          }
        }, 1500);
        
        setTimeout(() => {
          if (workingRatingUpdate) {
            console.log('🔄 Safety rating update after button click...');
            workingRatingUpdate();
          }
        }, 4000);
      });
    }
  });
}

// Function to monitor DOM changes for new reviews
function setupPermanentDOMMonitoring() {
  console.log('👁️ Setting up permanent DOM monitoring...');
  
  const testimonialsGrid = document.getElementById('allCustomerReviews');
  if (!testimonialsGrid) {
    console.warn('⚠️ Cannot setup DOM monitoring - grid not found');
    return;
  }
  
  let lastReviewCount = testimonialsGrid.children.length;
  console.log('📊 Initial review count:', lastReviewCount);
  
  // Set up MutationObserver
  const observer = new MutationObserver((mutations) => {
    let reviewAdded = false;
    
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && node.tagName === 'DIV') {
            console.log('🔍 New review element detected in DOM');
            reviewAdded = true;
          }
        });
      }
    });
    
    if (reviewAdded) {
      console.log('🚨 NEW REVIEW DETECTED - triggering automatic rating update');
      setTimeout(() => {
        if (workingRatingUpdate) {
          workingRatingUpdate();
        }
      }, 500);
    }
  });
  
  observer.observe(testimonialsGrid, {
    childList: true,
    subtree: true
  });
  
  // Also set up periodic checking
  setInterval(() => {
    const currentReviewCount = testimonialsGrid.children.length;
    if (currentReviewCount !== lastReviewCount) {
      console.log(`📊 Review count changed: ${lastReviewCount} → ${currentReviewCount}`);
      lastReviewCount = currentReviewCount;
      
      if (workingRatingUpdate) {
        console.log('🔄 Triggering rating update due to count change...');
        workingRatingUpdate();
      }
    }
  }, 2000); // Check every 2 seconds
  
  console.log('✅ Permanent DOM monitoring setup complete');
}

// Function to override ALL possible review submission functions
function overrideAllReviewFunctions() {
  console.log('🔄 Overriding all review submission functions...');
  
  // Override submitReview
  const originalSubmitReview = window.submitReview;
  window.submitReview = function(...args) {
    console.log('📝 INTERCEPTED submitReview - will trigger rating update');
    
    let result;
    if (typeof originalSubmitReview === 'function') {
      result = originalSubmitReview.apply(this, args);
    }
    
    // Trigger rating update
    setTimeout(() => {
      if (workingRatingUpdate) {
        console.log('🔄 Rating update after submitReview...');
        workingRatingUpdate();
      }
    }, 1000);
    
    return result;
  };
  
  // Override addReviewToTestimonials
  const originalAddReview = window.addReviewToTestimonials;
  window.addReviewToTestimonials = function(...args) {
    console.log('📝 INTERCEPTED addReviewToTestimonials - will trigger rating update');
    
    let result;
    if (typeof originalAddReview === 'function') {
      result = originalAddReview.apply(this, args);
    }
    
    // Trigger rating update
    setTimeout(() => {
      if (workingRatingUpdate) {
        console.log('🔄 Rating update after addReviewToTestimonials...');
        workingRatingUpdate();
      }
    }, 500);
    
    return result;
  };
  
  console.log('✅ All review functions overridden');
}

// Initialize the permanent fix
function initializePermanentRatingFix() {
  console.log('🚀 Initializing PERMANENT rating fix...');
  
  // Establish the working rating update function
  establishWorkingRatingUpdate();
  
  // Hook into form submissions
  setTimeout(hookIntoFormSubmissions, 1000);
  
  // Setup DOM monitoring
  setTimeout(setupPermanentDOMMonitoring, 1500);
  
  // Override all review functions
  setTimeout(overrideAllReviewFunctions, 2000);
  
  // Make the working function globally available
  window.permanentRatingUpdate = workingRatingUpdate;
  
  console.log('✅ PERMANENT rating fix initialized - ratings will now update automatically');
}

// Initialize immediately and with delays
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePermanentRatingFix);
} else {
  initializePermanentRatingFix();
}

setTimeout(initializePermanentRatingFix, 1000);
setTimeout(initializePermanentRatingFix, 3000);
setTimeout(initializePermanentRatingFix, 5000);

console.log('🔧 PERMANENT rating fix loaded - real customer reviews will now automatically update ratings');
