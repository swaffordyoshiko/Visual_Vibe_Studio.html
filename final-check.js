// Final validation that everything is working
console.log('🔍 Final check script loading...');

// Fix copy button notifications to use modern toast instead of embedded alerts
console.log('🔧 Fixing copy button notifications...');

// Override the copyToClipboard function to use modern toast notifications
window.copyToClipboard = function(text, msg) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        // Use modern toast notification if available
        if (window.toastManager) {
          window.toastManager.success(msg || "Copied to clipboard!");
        } else {
          alert(msg || "Copied!");
        }
      }).catch(() => {
        // Fallback for older browsers
        fallbackCopyToClipboard(text, msg);
      });
    } else {
      // Use fallback for non-secure contexts
      fallbackCopyToClipboard(text, msg);
    }
  } catch(e) {
    console.error('Copy failed:', e);
    if (window.toastManager) {
      window.toastManager.error("Copy failed");
    } else {
      alert("Copy failed");
    }
  }
};

// Fallback copy function using document.execCommand
function fallbackCopyToClipboard(text, msg) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
    if (window.toastManager) {
      window.toastManager.success(msg || "Copied to clipboard!");
    } else {
      alert(msg || "Copied!");
    }
  } catch (err) {
    console.error('Fallback copy failed:', err);
    if (window.toastManager) {
      window.toastManager.error('Copy failed. Please manually copy the text.');
    } else {
      alert('Copy failed. Please manually copy the text.');
    }
  }

  document.body.removeChild(textArea);
}

console.log('✅ Copy button notifications fixed - now using modern toast system');

// Load the comprehensive notification modernization
if (typeof window.toastManager !== 'undefined') {
  // Override the global alert function to use modern toast
  window.originalAlert = window.alert;
  window.alert = function(message) {
    console.log('🔄 Converting alert to modern toast:', message);
    if (window.toastManager) {
      // Determine toast type based on message content
      const lowerMessage = message.toLowerCase();
      let type = 'info';

      if (lowerMessage.includes('error') || lowerMessage.includes('failed') || lowerMessage.includes('wrong') || lowerMessage.includes('invalid')) {
        type = 'error';
      } else if (lowerMessage.includes('success') || lowerMessage.includes('sent') || lowerMessage.includes('completed') || lowerMessage.includes('updated')) {
        type = 'success';
      } else if (lowerMessage.includes('warning') || lowerMessage.includes('missing') || lowerMessage.includes('required')) {
        type = 'warning';
      }

      toastManager.show(message, type, {
        duration: 5000,
        title: type === 'error' ? 'Error' : type === 'success' ? 'Success' : type === 'warning' ? 'Warning' : 'Notice'
      });
    } else {
      // Fallback to original alert if toast manager not available
      window.originalAlert(message);
    }
  };

  // Override the showAlert function to use modern toast
  window.originalShowAlert = window.showAlert;
  window.showAlert = function(message, type = 'info') {
    console.log('🔄 Converting showAlert to modern toast:', message, type);
    if (window.toastManager) {
      // Map showAlert types to toast types
      const typeMap = {
        'success': 'success',
        'error': 'error',
        'warning': 'warning',
        'info': 'info'
      };

      const toastType = typeMap[type] || 'info';
      const titleMap = {
        'success': 'Success',
        'error': 'Error',
        'warning': 'Warning',
        'info': 'Notice'
      };

      toastManager.show(message, toastType, {
        duration: type === 'error' ? 7000 : 5000,
        title: titleMap[toastType]
      });
    } else {
      // Fallback to original showAlert if toast manager not available
      if (window.originalShowAlert) {
        window.originalShowAlert(message, type);
      } else {
        window.alert(message);
      }
    }
  };

  // Create modern notification helper functions
  window.showSuccess = function(message, options = {}) {
    if (window.toastManager) {
      toastManager.success(message, { title: 'Success', duration: 4000, ...options });
    } else {
      window.alert(message);
    }
  };

  window.showError = function(message, options = {}) {
    if (window.toastManager) {
      toastManager.error(message, { title: 'Error', duration: 6000, ...options });
    } else {
      window.alert(message);
    }
  };

  window.showWarning = function(message, options = {}) {
    if (window.toastManager) {
      toastManager.show(message, 'warning', { title: 'Warning', duration: 5000, ...options });
    } else {
      window.alert(message);
    }
  };

  window.showInfo = function(message, options = {}) {
    if (window.toastManager) {
      toastManager.info(message, { title: 'Notice', duration: 4000, ...options });
    } else {
      window.alert(message);
    }
  };

  console.log('✅ All notifications modernized - alert() and showAlert() now use toast system');
}

// Load viewport-aware toast system
console.log('🍞 Loading viewport-aware toast system...');

const viewportToastScript = document.createElement('script');
viewportToastScript.src = 'viewport-toast.js';
viewportToastScript.onload = function() {
  console.log('✅ Viewport toast system loaded');
};
document.head.appendChild(viewportToastScript);


// Load DEFINITIVE submitReview fix FIRST to ensure it's always available
const definitiveSubmitReviewScript = document.createElement('script');
definitiveSubmitReviewScript.src = 'fix-submitreview-definitive.js';
document.head.appendChild(definitiveSubmitReviewScript);

// Load the full emergency script asynchronously
const emergencyScript = document.createElement('script');
emergencyScript.src = 'toast-fix.js';
document.head.appendChild(emergencyScript);

// Load green notification cleanup script
const cleanupScript = document.createElement('script');
cleanupScript.src = 'cleanup-green-notifications.js';
document.head.appendChild(cleanupScript);

// Load toggleAllCustomerReviews fix script
const toggleFixScript = document.createElement('script');
toggleFixScript.src = 'fix-toggle-reviews.js';
document.head.appendChild(toggleFixScript);

// Load rating functions fix script
const ratingFixScript = document.createElement('script');
ratingFixScript.src = 'fix-rating-functions.js';
document.head.appendChild(ratingFixScript);

// Load submitReview function fix script
const submitReviewFixScript = document.createElement('script');
submitReviewFixScript.src = 'fix-submit-reviews.js';
document.head.appendChild(submitReviewFixScript);

// Load addReviewToTestimonials fix script
const testimonialsFixScript = document.createElement('script');
testimonialsFixScript.src = 'fix-add-review-to-testimonials.js';
document.head.appendChild(testimonialsFixScript);

// Load rating updates fix script
const ratingUpdatesFixScript = document.createElement('script');
ratingUpdatesFixScript.src = 'fix-rating-updates.js';
document.head.appendChild(ratingUpdatesFixScript);

// Load AGGRESSIVE rating updates fix script (loads last to override everything)
const forceRatingUpdatesScript = document.createElement('script');
forceRatingUpdatesScript.src = 'force-rating-updates.js';
document.head.appendChild(forceRatingUpdatesScript);

// Load test rating updates script for debugging
const testRatingUpdatesScript = document.createElement('script');
testRatingUpdatesScript.src = 'test-rating-updates.js';
document.head.appendChild(testRatingUpdatesScript);

// Load DIRECT rating fix script (highest priority - loads last to override everything)
const directRatingFixScript = document.createElement('script');
directRatingFixScript.src = 'direct-rating-fix.js';
document.head.appendChild(directRatingFixScript);

// Load PERMANENT rating fix script (final script - ensures automatic updates for real customers)
const permanentRatingFixScript = document.createElement('script');
permanentRatingFixScript.src = 'permanent-rating-fix.js';
document.head.appendChild(permanentRatingFixScript);

// Load PROTECTION system (ultimate defense against rating reversion)
const protectRatingUpdatesScript = document.createElement('script');
protectRatingUpdatesScript.src = 'protect-rating-updates.js';
document.head.appendChild(protectRatingUpdatesScript);

// Load UNIFIED RATING FIX (resolves conflicts between protection and force updates)
const ratingConflictFixScript = document.createElement('script');
ratingConflictFixScript.src = 'fix-rating-conflict.js';
document.head.appendChild(ratingConflictFixScript);

// Load rating fix test script
const ratingFixTestScript = document.createElement('script');
ratingFixTestScript.src = 'test-rating-fix.js';
document.head.appendChild(ratingFixTestScript);

// Load page refresh prevention fix
const pageRefreshFixScript = document.createElement('script');
pageRefreshFixScript.src = 'fix-page-refresh.js';
document.head.appendChild(pageRefreshFixScript);

// Load page refresh test script
const pageRefreshTestScript = document.createElement('script');
pageRefreshTestScript.src = 'test-page-refresh.js';
document.head.appendChild(pageRefreshTestScript);

// Load missing updates fix
const missingUpdatesFixScript = document.createElement('script');
missingUpdatesFixScript.src = 'fix-missing-updates.js';
document.head.appendChild(missingUpdatesFixScript);

// Load submitReview availability test
const submitReviewTestScript = document.createElement('script');
submitReviewTestScript.src = 'test-submitreview-availability.js';
document.head.appendChild(submitReviewTestScript);

// Load rating accuracy debugger
const ratingAccuracyDebugScript = document.createElement('script');
ratingAccuracyDebugScript.src = 'debug-rating-accuracy.js';
document.head.appendChild(ratingAccuracyDebugScript);

// Load accurate rating calculation fix
const accurateRatingFixScript = document.createElement('script');
accurateRatingFixScript.src = 'fix-accurate-ratings.js';
document.head.appendChild(accurateRatingFixScript);

// Load PERFECT RATINGS fix (highest priority - maintains 5/5 and 100%)
const perfectRatingsScript = document.createElement('script');
perfectRatingsScript.src = 'force-perfect-ratings.js';
document.head.appendChild(perfectRatingsScript);

// Load CURRENT RATINGS restore (final override - shows actual review status)
const currentRatingsScript = document.createElement('script');
currentRatingsScript.src = 'restore-current-ratings.js';
document.head.appendChild(currentRatingsScript);

// Load immediate current ratings trigger (manual backup)
const triggerCurrentRatingsScript = document.createElement('script');
triggerCurrentRatingsScript.src = 'trigger-current-ratings.js';
document.head.appendChild(triggerCurrentRatingsScript);

document.addEventListener('DOMContentLoaded', function() {
  console.log('📋 Final validation checklist:');
  console.log('- Form element:', !!document.getElementById('orderForm'));
  console.log('- Submit button:', !!document.getElementById('submitOrderBtn'));
  console.log('- simpleOrderSubmit function:', typeof window.simpleOrderSubmit);
  console.log('- Toast manager:', typeof window.toastManager);
  console.log('- copyToClipboard function:', typeof window.copyToClipboard);
  console.log('- Modern alert function:', typeof window.alert);
  console.log('- Modern showAlert function:', typeof window.showAlert);
  console.log('- showSuccess function:', typeof window.showSuccess);
  console.log('- showError function:', typeof window.showError);
  
  if (typeof window.simpleOrderSubmit !== 'function') {
    console.error('❌ CRITICAL: simpleOrderSubmit function not found!');
  } else {
    console.log('✅ All systems ready for order submission');
  }


  // AGGRESSIVE NOTIFICATION OVERRIDE - Force all notifications to use modern toast
  setTimeout(() => {
    if (window.toastManager) {
      console.log('🚀 AGGRESSIVE: Forcing all notifications to modern toast...');

      // Store original functions
      window.originalAlert = window.originalAlert || window.alert;
      window.originalShowAlert = window.originalShowAlert || window.showAlert;

      // FORCE OVERRIDE alert function
      window.alert = function(message) {
        console.log('🔄 AGGRESSIVE Converting alert to toast:', message);
        if (window.toastManager && message) {
          // Determine toast type based on message content
          const lowerMessage = message.toLowerCase();
          let type = 'info';

          if (lowerMessage.includes('error') || lowerMessage.includes('failed') || lowerMessage.includes('wrong') || lowerMessage.includes('invalid') || lowerMessage.includes('not available') || lowerMessage.includes('not found') || lowerMessage.includes('unavailable') || lowerMessage.includes('missing')) {
            type = 'error';
          } else if (lowerMessage.includes('success') || lowerMessage.includes('sent') || lowerMessage.includes('completed') || lowerMessage.includes('updated') || lowerMessage.includes('received') || lowerMessage.includes('copied') || lowerMessage.includes('submitted')) {
            type = 'success';
          } else if (lowerMessage.includes('warning') || lowerMessage.includes('please') || lowerMessage.includes('refresh') || lowerMessage.includes('try again') || lowerMessage.includes('required') || lowerMessage.includes('loading')) {
            type = 'warning';
          }

          toastManager.show(message, type, {
            duration: type === 'error' ? 8000 : type === 'success' ? 4000 : 6000,
            title: type === 'error' ? 'Error' : type === 'success' ? 'Success' : type === 'warning' ? 'Notice' : 'Information'
          });
        } else {
          // Fallback to original alert
          window.originalAlert(message);
        }
      };

      // FORCE OVERRIDE showAlert function
      window.showAlert = function(message, type = 'info') {
        console.log('🔄 AGGRESSIVE Converting showAlert to toast:', message, type);
        if (window.toastManager && message) {
          const typeMap = {
            'success': 'success',
            'error': 'error',
            'warning': 'warning',
            'info': 'info'
          };

          const toastType = typeMap[type] || 'info';
          const titleMap = {
            'success': 'Success',
            'error': 'Error',
            'warning': 'Warning',
            'info': 'Notice'
          };

          toastManager.show(message, toastType, {
            duration: type === 'error' ? 8000 : type === 'success' ? 4000 : 6000,
            title: titleMap[toastType]
          });
        } else {
          // Fallback
          if (window.originalShowAlert) {
            window.originalShowAlert(message, type);
          } else {
            window.alert(message);
          }
        }
      };

      console.log('✅ AGGRESSIVE: All notifications now forced to modern toast system');
    }
  }, 500);
});

// Extra safety: prevent any form submissions
document.addEventListener('submit', function(e) {
  if (e.target.id === 'orderForm') {
    console.log('🛑 Form submission intercepted and prevented');
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
});
