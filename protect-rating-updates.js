// PROTECTION system for rating updates - prevents reversion and maintains persistence
console.log('🛡️ Loading rating update PROTECTION system...');

// Store the correct rating values
let protectedRatings = {
  happyCustomersCount: null,
  customerRating1: null,
  averageRating1: null,
  customerSatisfactionPercent: null
};

// Function to calculate and store the correct ratings
function calculateAndStoreCorrectRatings() {
  try {
    const testimonialsGrid = document.getElementById('allCustomerReviews');
    if (!testimonialsGrid) {
      console.warn('⚠️ Cannot calculate ratings - testimonials grid not found');
      return false;
    }

    const allReviews = Array.from(testimonialsGrid.children);
    const totalReviews = allReviews.length;
    
    let totalRatingSum = 0;
    let satisfiedCount = 0;
    
    allReviews.forEach((review) => {
      let rating = 5; // Default for static reviews
      
      const starsElement = review.querySelector('.text-yellow-400, [class*="star"], [class*="rating"]');
      if (starsElement) {
        const starsText = starsElement.textContent || starsElement.innerHTML;
        const starMatches = starsText.match(/⭐/g);
        if (starMatches && starMatches.length > 0) {
          rating = starMatches.length;
        }
      }
      
      totalRatingSum += rating;
      if (rating >= 4) satisfiedCount++;
    });
    
    const avgRating = totalReviews > 0 ? (totalRatingSum / totalReviews).toFixed(1) : '5.0';
    const satisfactionPercent = totalReviews > 0 ? Math.round((satisfiedCount / totalReviews) * 100) : 98;
    
    // Store the correct values
    protectedRatings = {
      happyCustomersCount: totalReviews.toString(),
      customerRating1: avgRating,
      averageRating1: avgRating,
      customerSatisfactionPercent: satisfactionPercent + '%'
    };
    
    console.log('🛡️ Stored protected ratings:', protectedRatings);
    return true;
    
  } catch (error) {
    console.error('❌ Error calculating protected ratings:', error);
    return false;
  }
}

// Function to enforce the protected ratings
function enforceProtectedRatings() {
  try {
    let enforced = false;
    
    Object.entries(protectedRatings).forEach(([id, correctValue]) => {
      if (correctValue === null) return;
      
      const element = document.getElementById(id);
      if (element) {
        const currentValue = element.textContent;
        
        // If the current value doesn't match our protected value, enforce it
        if (currentValue !== correctValue) {
          console.log(`🛡️ ENFORCING ${id}: "${currentValue}" → "${correctValue}"`);
          
          element.textContent = correctValue;
          element.setAttribute('data-protected', 'true');
          element.setAttribute('data-protected-value', correctValue);
          element.setAttribute('data-updated', 'true');
          element.setAttribute('data-value', correctValue);
          
          // Add visual indicator that it's protected
          element.style.transition = 'all 0.3s ease';
          element.style.backgroundColor = '#10B981';
          element.style.color = 'white';
          element.style.padding = '2px 6px';
          element.style.borderRadius = '4px';
          element.style.border = '2px solid #059669';
          
          setTimeout(() => {
            element.style.backgroundColor = '';
            element.style.color = '';
            element.style.padding = '';
            element.style.borderRadius = '';
            element.style.border = '';
          }, 2000);
          
          enforced = true;
        }
      }
    });
    
    if (enforced) {
      console.log('🛡️ Protected ratings enforced');
      
      if (window.toastManager) {
        window.toastManager.success('Ratings protected and restored!', { duration: 3000 });
      }
    }
    
    return enforced;
    
  } catch (error) {
    console.error('❌ Error enforcing protected ratings:', error);
    return false;
  }
}

// Function to override any attempts to change the ratings
function protectRatingElements() {
  try {
    console.log('🛡️ Setting up element protection...');
    
    Object.keys(protectedRatings).forEach(id => {
      const element = document.getElementById(id);
      if (!element) return;
      
      // Store original textContent setter
      const originalTextContentSetter = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent').set;
      
      // Override textContent setter for this specific element
      Object.defineProperty(element, 'textContent', {
        set: function(value) {
          // If someone tries to set it to a different value than our protected one
          if (protectedRatings[id] && value !== protectedRatings[id]) {
            console.log(`🛡️ BLOCKING attempt to change ${id} from "${protectedRatings[id]}" to "${value}"`);
            
            // Set it to our protected value instead
            originalTextContentSetter.call(this, protectedRatings[id]);
            
            // Visual feedback
            this.style.transition = 'all 0.3s ease';
            this.style.backgroundColor = '#EF4444';
            this.style.color = 'white';
            this.style.padding = '2px 6px';
            this.style.borderRadius = '4px';
            
            setTimeout(() => {
              this.style.backgroundColor = '#10B981';
              setTimeout(() => {
                this.style.backgroundColor = '';
                this.style.color = '';
                this.style.padding = '';
                this.style.borderRadius = '';
              }, 1000);
            }, 500);
            
            return;
          }
          
          // Allow the change if it matches our protected value
          originalTextContentSetter.call(this, value);
        },
        get: function() {
          return this.nodeValue || protectedRatings[id] || '';
        },
        configurable: true
      });
      
      console.log(`🛡️ Element ${id} is now protected`);
    });
    
  } catch (error) {
    console.error('❌ Error setting up element protection:', error);
  }
}

// Continuous monitoring and enforcement
function setupContinuousProtection() {
  console.log('👁️ Setting up continuous protection monitoring...');
  
  // Check and enforce every 2 seconds
  setInterval(() => {
    enforceProtectedRatings();
  }, 2000);
  
  // Aggressive checking every 500ms for the first minute
  let aggressiveCount = 0;
  const aggressiveInterval = setInterval(() => {
    enforceProtectedRatings();
    aggressiveCount++;
    
    if (aggressiveCount >= 120) { // 1 minute
      clearInterval(aggressiveInterval);
      console.log('🛡️ Aggressive protection period ended');
    }
  }, 500);
  
  // Set up MutationObserver to watch for DOM changes
  const observer = new MutationObserver((mutations) => {
    let shouldEnforce = false;
    
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' || mutation.type === 'characterData') {
        // Check if any of our protected elements were modified
        const target = mutation.target;
        if (target && target.id && protectedRatings[target.id]) {
          console.log('🔍 Detected change to protected element:', target.id);
          shouldEnforce = true;
        }
      }
    });
    
    if (shouldEnforce) {
      setTimeout(enforceProtectedRatings, 100);
    }
  });
  
  // Observe all rating elements
  Object.keys(protectedRatings).forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      observer.observe(element, {
        childList: true,
        characterData: true,
        subtree: true
      });
    }
  });
  
  console.log('✅ Continuous protection monitoring active');
}

// Hook into review submission to update protected values
function hookIntoReviewSubmissions() {
  console.log('🔗 Hooking into review submissions for protection updates...');
  
  // Override addReviewToTestimonials
  const originalAddReview = window.addReviewToTestimonials;
  window.addReviewToTestimonials = function(...args) {
    console.log('📝 Review being added - updating protected ratings...');
    
    let result;
    if (typeof originalAddReview === 'function') {
      result = originalAddReview.apply(this, args);
    }
    
    // Recalculate and update protected ratings
    setTimeout(() => {
      if (calculateAndStoreCorrectRatings()) {
        enforceProtectedRatings();
        console.log('🛡️ Protected ratings updated after review addition');
      }
    }, 1000);
    
    return result;
  };
  
  console.log('✅ Review submission hooks installed');
}

// Initialize the protection system
function initializeProtectionSystem() {
  console.log('🚀 Initializing rating protection system...');
  
  // Calculate initial protected ratings
  setTimeout(() => {
    if (calculateAndStoreCorrectRatings()) {
      // Enforce the correct ratings
      enforceProtectedRatings();
      
      // Set up element protection
      protectRatingElements();
      
      // Set up continuous monitoring
      setupContinuousProtection();
      
      // Hook into review submissions
      hookIntoReviewSubmissions();
      
      console.log('✅ Rating protection system fully active');
    }
  }, 2000);
}

// Make functions globally available for testing
window.enforceProtectedRatings = enforceProtectedRatings;
window.calculateAndStoreCorrectRatings = calculateAndStoreCorrectRatings;
window.protectedRatings = protectedRatings;

// Initialize the protection system
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeProtectionSystem);
} else {
  initializeProtectionSystem();
}

// Multiple initialization attempts
setTimeout(initializeProtectionSystem, 1000);
setTimeout(initializeProtectionSystem, 3000);
setTimeout(initializeProtectionSystem, 5000);

console.log('🛡️ Rating protection system loaded - ratings will be permanently protected from reversion');
