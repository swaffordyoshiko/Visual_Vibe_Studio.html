// Fix for addReviewToTestimonials function to ensure reviews show up
console.log('📝 Loading addReviewToTestimonials fix...');

function createAddReviewToTestimonials() {
  return function addReviewToTestimonials(review) {
    try {
      console.log('✨ Adding review to testimonials section:', review);

      // Find the testimonials grid container
      const testimonialsGrid = document.getElementById('allCustomerReviews');

      if (!testimonialsGrid) {
        console.error('❌ Testimonials grid (#allCustomerReviews) not found');
        if (window.toastManager) {
          window.toastManager.warning('Review submitted but display section not found. Please refresh to see your review.');
        }
        return false;
      }

      console.log('✅ Found testimonials grid, current children count:', testimonialsGrid.children.length);

      // Create review element that matches the existing style
      const reviewElement = document.createElement('div');
      reviewElement.className = 'bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all duration-300';
      reviewElement.setAttribute('data-dynamic-review', 'true');
      reviewElement.setAttribute('data-review-date', new Date().toISOString());

      // Generate stars based on rating
      const generateStars = (rating) => {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
          if (i <= rating) {
            stars += '⭐';
          } else {
            stars += '☆';
          }
        }
        return stars;
      };

      // Generate initials for avatar
      const getInitials = (name) => {
        return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().substring(0, 2);
      };

      // Generate a random color for the avatar
      const avatarColors = [
        'from-red-400 to-orange-500',
        'from-blue-400 to-purple-500',
        'from-green-400 to-blue-500',
        'from-purple-400 to-pink-500',
        'from-yellow-400 to-orange-500',
        'from-indigo-400 to-purple-500',
        'from-pink-400 to-red-500',
        'from-teal-400 to-blue-500'
      ];
      const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

      // Create the review HTML
      reviewElement.innerHTML = `
        <div class="flex items-center mb-4">
          <div class="bg-gradient-to-br ${randomColor} w-10 h-10 rounded-full flex items-center justify-center mr-3">
            <span class="text-white font-bold">${getInitials(review.name)}</span>
          </div>
          <div>
            <h4 class="font-semibold text-white text-sm">${review.name}</h4>
            <p class="text-purple-200 text-xs">${review.businessType || 'Business Owner'}</p>
          </div>
        </div>
        <div class="text-yellow-400 mb-3 text-lg">
          ${generateStars(review.rating)}
        </div>
        <p class="text-purple-100 text-sm leading-relaxed mb-4">
          "${review.text}"
        </p>
        <div class="flex justify-between items-center text-xs text-purple-300">
          <span>Service: ${review.service || 'General'}</span>
          <span>${new Date().toLocaleDateString()}</span>
        </div>
      `;

      // Add some animation
      reviewElement.style.opacity = '0';
      reviewElement.style.transform = 'translateY(20px)';

      // Insert the new review at the beginning of the grid
      testimonialsGrid.insertBefore(reviewElement, testimonialsGrid.firstChild);

      // Animate the new review in
      setTimeout(() => {
        reviewElement.style.transition = 'all 0.5s ease-out';
        reviewElement.style.opacity = '1';
        reviewElement.style.transform = 'translateY(0)';
      }, 10);

      // Add a highlight effect
      setTimeout(() => {
        reviewElement.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.3)';
        setTimeout(() => {
          reviewElement.style.boxShadow = '';
        }, 2000);
      }, 500);

      // Scroll to show the new review
      setTimeout(() => {
        const testimonialsSection = testimonialsGrid.closest('section');
        if (testimonialsSection) {
          testimonialsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        } else {
          testimonialsGrid.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 600);

      // Update the toggle button to show "Hide Recent Reviews"
      const buttonText = document.getElementById('viewAllCustomerReviewsText');
      if (buttonText) {
        buttonText.textContent = 'Hide Recent Reviews';
        window.showingAllCustomerReviews = true;
      }

      console.log('✅ Review added to testimonials display successfully!');
      console.log('📊 Total reviews now:', testimonialsGrid.children.length);

      // Show success notification
      if (window.toastManager) {
        window.toastManager.success(`Thank you ${review.name}! Your ${review.rating}-star review is now visible in the testimonials section.`, { duration: 5000 });
      }

      return true;

    } catch (error) {
      console.error('❌ Error adding review to testimonials:', error);
      if (window.toastManager) {
        window.toastManager.error('Error displaying review in testimonials section. Your review was saved.');
      } else {
        alert('Error displaying review. Your review was saved.');
      }
      return false;
    }
  };
}

// Create the function
const addReviewToTestimonialsFunction = createAddReviewToTestimonials();

// Define it in multiple ways to ensure availability
window.addReviewToTestimonials = addReviewToTestimonialsFunction;
window['addReviewToTestimonials'] = addReviewToTestimonialsFunction;

// Use Object.defineProperty for extra robustness
try {
  Object.defineProperty(window, 'addReviewToTestimonials', {
    value: addReviewToTestimonialsFunction,
    writable: true,
    configurable: true,
    enumerable: true
  });
} catch (e) {
  console.warn('Could not use defineProperty for addReviewToTestimonials:', e);
}

// Verify function is working
console.log('✅ addReviewToTestimonials function type:', typeof window.addReviewToTestimonials);

// Test accessibility
try {
  if (typeof window.addReviewToTestimonials === 'function') {
    console.log('✅ addReviewToTestimonials is properly accessible');
  } else {
    throw new Error('Function not accessible after definition');
  }
} catch (error) {
  console.error('❌ CRITICAL: addReviewToTestimonials is not accessible:', error);
}

// Set up a safety net - redefine the function periodically
let testimonialsaSafetyAttempts = 0;
const testimonialsSafetyInterval = setInterval(() => {
  if (typeof window.addReviewToTestimonials !== 'function') {
    console.warn('⚠️ addReviewToTestimonials missing, redefining...');
    window.addReviewToTestimonials = addReviewToTestimonialsFunction;
  }
  
  testimonialsaSafetyAttempts++;
  if (testimonialsaSafetyAttempts >= 10) { // Run for 5 seconds
    clearInterval(testimonialsSafetyInterval);
    console.log('🛡️ Safety net for addReviewToTestimonials completed');
  }
}, 500);

console.log('🛡️ addReviewToTestimonials function fix loaded and protected');
