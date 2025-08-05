// DEFINITIVE submitReview function fix - ensures the function is always available
console.log('🔧 Loading DEFINITIVE submitReview fix...');

// Create the core submitReview function
function createDefinitiveSubmitReview() {
  return function submitReview(event) {
    console.log('🚀 DEFINITIVE submitReview execution started');
    
    try {
      // Prevent any default behavior
      if (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      }

      // Get form values
      const nameElement = document.getElementById('reviewerName');
      const businessElement = document.getElementById('businessType');
      const serviceElement = document.getElementById('serviceUsed');
      const textElement = document.getElementById('reviewText');
      const ratingElement = document.getElementById('selectedRating');

      if (!nameElement || !businessElement || !serviceElement || !textElement || !ratingElement) {
        console.error('❌ Required form elements not found');
        alert('Review form elements not found. Please refresh the page and try again.');
        return false;
      }

      const name = nameElement.value.trim();
      const businessType = businessElement.value.trim();
      const service = serviceElement.value;
      const text = textElement.value.trim();
      const rating = parseInt(ratingElement.value) || window.selectedRating || 0;

      console.log('📝 Form data collected:', { name, businessType, service, text, rating });

      // Validation
      if (!name) {
        alert('Please enter your name.');
        nameElement.focus();
        return false;
      }

      if (!rating || rating === 0) {
        alert('Please select a star rating.');
        return false;
      }

      if (!service) {
        alert('Please select a service.');
        serviceElement.focus();
        return false;
      }

      if (!text) {
        alert('Please write a review.');
        textElement.focus();
        return false;
      }

      // Create review object
      const review = {
        name,
        businessType,
        service,
        text,
        rating,
        timestamp: new Date().toISOString(),
        id: Date.now()
      };

      console.log('✅ Review object created:', review);

      // Save to localStorage
      try {
        const existingReviews = JSON.parse(localStorage.getItem('visualVibeReviews') || '[]');
        existingReviews.unshift(review);
        localStorage.setItem('visualVibeReviews', JSON.stringify(existingReviews));
        console.log('✅ Review saved to localStorage');
      } catch (error) {
        console.error('❌ Error saving review to localStorage:', error);
      }

      // Add to testimonials
      if (typeof window.addReviewToTestimonials === 'function') {
        console.log('📝 Adding review to testimonials...');
        window.addReviewToTestimonials(review);
      } else {
        console.warn('⚠️ addReviewToTestimonials function not available, adding manually...');
        
        // Manual testimonials addition
        const testimonialsGrid = document.getElementById('allCustomerReviews');
        if (testimonialsGrid) {
          const reviewElement = document.createElement('div');
          reviewElement.className = 'bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 new-review';
          reviewElement.setAttribute('data-dynamic-review', 'true');
          
          const stars = '⭐'.repeat(rating);
          reviewElement.innerHTML = `
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                ${name.charAt(0).toUpperCase()}
              </div>
              <div class="ml-4">
                <h4 class="font-semibold text-white">${name}</h4>
                <p class="text-purple-200 text-sm">${businessType}</p>
              </div>
            </div>
            <div class="text-yellow-400 text-lg mb-3">${stars}</div>
            <p class="text-purple-100 leading-relaxed">"${text}"</p>
            <div class="mt-4 text-sm text-purple-300">
              Service: ${service}
            </div>
          `;
          
          testimonialsGrid.insertBefore(reviewElement, testimonialsGrid.firstChild);
          console.log('✅ Review manually added to testimonials');
        }
      }

      // Clear form
      nameElement.value = '';
      businessElement.value = '';
      serviceElement.value = '';
      textElement.value = '';
      ratingElement.value = '';
      
      // Reset rating display
      if (typeof window.setRating === 'function') {
        window.setRating(0);
      }
      window.selectedRating = 0;

      // Success message
      if (window.toastManager) {
        window.toastManager.success('Thank you for your review!', { duration: 4000 });
      } else {
        alert('Thank you for your review!');
      }

      // Trigger rating updates
      setTimeout(() => {
        console.log('🔄 Triggering rating updates...');
        
        // Try multiple update functions in order of preference
        if (typeof window.executeUnifiedRatingUpdate === 'function') {
          window.executeUnifiedRatingUpdate();
        } else if (typeof window.executeRatingUpdate === 'function') {
          window.executeRatingUpdate();
        } else if (typeof window.directRatingUpdate === 'function') {
          window.directRatingUpdate();
        } else if (typeof window.permanentRatingUpdate === 'function') {
          window.permanentRatingUpdate();
        } else {
          console.log('📊 Manual rating update...');
          // Manual update as fallback
          const testimonialsGrid = document.getElementById('allCustomerReviews');
          if (testimonialsGrid) {
            const totalReviews = testimonialsGrid.children.length;
            const happyCustomersElement = document.getElementById('happyCustomersCount');
            if (happyCustomersElement) {
              happyCustomersElement.textContent = totalReviews.toString();
            }
          }
        }
      }, 500);

      console.log('✅ DEFINITIVE submitReview completed successfully');
      return true;

    } catch (error) {
      console.error('❌ Error in DEFINITIVE submitReview:', error);
      alert('Error submitting review. Please try again.');
      return false;
    }
  };
}

// Create the definitive function
const definitiveSubmitReview = createDefinitiveSubmitReview();

// Define it globally with maximum compatibility
function installDefinitiveSubmitReview() {
  console.log('📦 Installing definitive submitReview function...');
  
  // Method 1: Direct assignment
  window.submitReview = definitiveSubmitReview;
  
  // Method 2: Bracket notation
  window['submitReview'] = definitiveSubmitReview;
  
  // Method 3: Object.defineProperty for protection
  try {
    Object.defineProperty(window, 'submitReview', {
      value: definitiveSubmitReview,
      writable: true,
      configurable: true,
      enumerable: true
    });
  } catch (error) {
    console.warn('⚠️ Could not use defineProperty, using direct assignment');
  }
  
  // Method 4: Global scope assignment
  if (typeof global !== 'undefined') {
    global.submitReview = definitiveSubmitReview;
  }
  
  console.log('✅ Definitive submitReview installed');
}

// Install immediately
installDefinitiveSubmitReview();

// Continuous protection - reinstall if someone overwrites it
let protectionCount = 0;
const maxProtections = 60; // Protect for 1 minute

const protectionInterval = setInterval(() => {
  if (typeof window.submitReview !== 'function') {
    console.warn('🛡️ submitReview function missing, reinstalling...');
    installDefinitiveSubmitReview();
  }
  
  protectionCount++;
  if (protectionCount >= maxProtections) {
    clearInterval(protectionInterval);
    console.log('🛡️ Protection period ended');
  }
}, 1000);

// Verification
setTimeout(() => {
  console.log('🔍 VERIFICATION:');
  console.log('  typeof window.submitReview:', typeof window.submitReview);
  console.log('  Function name:', window.submitReview?.name);
  
  if (typeof window.submitReview === 'function') {
    console.log('✅ DEFINITIVE submitReview is properly available');
  } else {
    console.error('❌ DEFINITIVE submitReview installation failed');
  }
}, 500);

// Make test function available
window.testDefinitiveSubmitReview = function() {
  console.log('🧪 Testing definitive submitReview...');
  console.log('Function available:', typeof window.submitReview === 'function');
  console.log('Function details:', window.submitReview.toString().substring(0, 100) + '...');
  return typeof window.submitReview === 'function';
};

console.log('🔧 DEFINITIVE submitReview fix loaded and protected');
