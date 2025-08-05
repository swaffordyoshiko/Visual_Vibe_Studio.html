// Fix for rating functions undefined errors
console.log('⭐ Loading rating functions fix...');

// Initialize rating state
window.selectedRating = 0;

// Define robust setRating function
function createSetRating() {
  return function setRating(rating) {
    try {
      console.log('🌟 Setting rating to:', rating);

      // Use both local and window variables for reliability
      const ratingValue = parseInt(rating);
      window.selectedRating = ratingValue;

      // Update hidden input field
      const hiddenInput = document.getElementById('selectedRating');
      if (hiddenInput) {
        hiddenInput.value = ratingValue;
        console.log('✅ Hidden input updated to:', hiddenInput.value);
      } else {
        console.warn('⚠️ Hidden input field not found, creating one...');
        // Create hidden input if it doesn't exist
        const newInput = document.createElement('input');
        newInput.type = 'hidden';
        newInput.id = 'selectedRating';
        newInput.name = 'rating';
        newInput.value = ratingValue;
        document.body.appendChild(newInput);
      }

      // Update star display
      if (typeof window.highlightStars === 'function') {
        window.highlightStars(ratingValue);
      } else {
        // Fallback star highlighting
        const stars = document.querySelectorAll('.star-rating');
        stars.forEach((star, index) => {
          const starRating = parseInt(star.getAttribute('data-rating'));
          if (starRating <= ratingValue) {
            star.style.color = '#ffd700'; // Gold for selected
            star.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.8)';
          } else {
            star.style.color = '#ffffff'; // White for unselected
            star.style.textShadow = '2px 2px 4px rgba(255,255,255,0.8)';
          }
        });
      }

      // Provide user feedback
      const message = `You selected ${rating} star${rating > 1 ? 's' : ''}!`;
      console.log(`⭐ ${message}`);
      
      // Show toast notification if available
      if (window.toastManager) {
        window.toastManager.success(message, { duration: 2000 });
      }

      return true;
    } catch (error) {
      console.error('Error in setRating:', error);
      if (window.toastManager) {
        window.toastManager.error('Rating selection failed. Please try again.');
      } else {
        alert('Rating selection failed. Please try again.');
      }
      return false;
    }
  };
}

// Define robust highlightStars function
function createHighlightStars() {
  return function highlightStars(rating) {
    try {
      console.log('✨ Highlighting stars up to rating:', rating);
      
      const stars = document.querySelectorAll('.star-rating');
      stars.forEach((star, index) => {
        const starRating = parseInt(star.getAttribute('data-rating'));
        if (starRating <= rating) {
          star.style.color = '#ffd700'; // Gold for selected
          star.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.8)';
          star.style.transform = 'scale(1.1)';
        } else {
          star.style.color = '#ffffff'; // White for unselected
          star.style.textShadow = '2px 2px 4px rgba(255,255,255,0.8)';
          star.style.transform = 'scale(1)';
        }
      });
      
      return true;
    } catch (error) {
      console.error('Error in highlightStars:', error);
      return false;
    }
  };
}

// Create and assign the functions
const setRatingFunction = createSetRating();
const highlightStarsFunction = createHighlightStars();

// Define them in multiple ways to ensure availability
window.setRating = setRatingFunction;
window.highlightStars = highlightStarsFunction;
window['setRating'] = setRatingFunction;
window['highlightStars'] = highlightStarsFunction;

// Use Object.defineProperty for extra robustness
try {
  Object.defineProperty(window, 'setRating', {
    value: setRatingFunction,
    writable: true,
    configurable: true,
    enumerable: true
  });
  
  Object.defineProperty(window, 'highlightStars', {
    value: highlightStarsFunction,
    writable: true,
    configurable: true,
    enumerable: true
  });
} catch (e) {
  console.warn('Could not use defineProperty for rating functions:', e);
}

// Verify functions are working
console.log('✅ Rating functions defined:');
console.log('  setRating type:', typeof window.setRating);
console.log('  highlightStars type:', typeof window.highlightStars);

// Test accessibility
try {
  if (typeof window.setRating === 'function' && typeof window.highlightStars === 'function') {
    console.log('✅ Rating functions are properly accessible');
  } else {
    throw new Error('Functions not accessible after definition');
  }
} catch (error) {
  console.error('❌ CRITICAL: Rating functions are not accessible:', error);
}

// Set up a safety net - redefine functions periodically
let ratingSafetyAttempts = 0;
const ratingSafetyInterval = setInterval(() => {
  let redefined = false;

  if (typeof window.setRating !== 'function') {
    console.warn('⚠️ setRating missing, redefining...');
    window.setRating = setRatingFunction;
    redefined = true;
  }

  if (typeof window.highlightStars !== 'function') {
    console.warn('⚠️ highlightStars missing, redefining...');
    window.highlightStars = highlightStarsFunction;
    redefined = true;
  }

  if (redefined) {
    console.log('🔄 Rating functions redefined');
  }

  ratingSafetyAttempts++;
  if (ratingSafetyAttempts >= 10) { // Run for 5 seconds
    clearInterval(ratingSafetyInterval);
    console.log('🛡️ Safety net for rating functions completed');
  }
}, 500);

// Set up hover effects for stars
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    const stars = document.querySelectorAll('.star-rating');
    stars.forEach(star => {
      // Add hover effect
      star.addEventListener('mouseenter', function() {
        const rating = parseInt(this.getAttribute('data-rating'));
        highlightStarsFunction(rating);
      });
      
      // Reset on mouse leave (show current selection)
      star.addEventListener('mouseleave', function() {
        if (window.selectedRating) {
          highlightStarsFunction(window.selectedRating);
        } else {
          // Reset all stars
          stars.forEach(s => {
            s.style.color = '#ffffff';
            s.style.textShadow = '2px 2px 4px rgba(255,255,255,0.8)';
            s.style.transform = 'scale(1)';
          });
        }
      });
    });
    
    console.log('✅ Star hover effects initialized');
  }, 100);
});

console.log('🛡️ Rating functions fix loaded and protected');
