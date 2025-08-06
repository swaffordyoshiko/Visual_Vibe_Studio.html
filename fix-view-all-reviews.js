// Fix "View All Reviews" Button - Ensure All Reviews are Displayed
console.log('🔧 Loading View All Reviews fix...');

(function() {
  'use strict';
  
  // Enhanced function to force display all reviews
  function forceDisplayAllReviews() {
    console.log('🔥 Force displaying ALL reviews...');
    
    try {
      // Get all reviews from localStorage
      const storedReviews = JSON.parse(localStorage.getItem('visualVibeReviews') || '[]');
      console.log(`📋 Found ${storedReviews.length} stored reviews`);
      
      // Filter approved reviews
      const approvedReviews = storedReviews.filter(review => review.approved !== false);
      console.log(`✅ ${approvedReviews.length} approved reviews to display`);
      
      // Get the main reviews container
      const mainGrid = document.getElementById('allCustomerReviews');
      if (!mainGrid) {
        console.error('❌ Main reviews container not found');
        return;
      }
      
      // Remove existing dynamic reviews first
      const existingDynamic = mainGrid.querySelectorAll('[data-dynamic-review]');
      existingDynamic.forEach(review => review.remove());
      console.log(`🧹 Removed ${existingDynamic.length} existing dynamic reviews`);
      
      // Count static reviews
      const staticReviews = mainGrid.querySelectorAll('.bg-white\\/10:not([data-dynamic-review])');
      console.log(`📊 Found ${staticReviews.length} static reviews`);
      
      // Add all dynamic reviews
      if (approvedReviews.length > 0) {
        approvedReviews.forEach((review, index) => {
          const reviewElement = createEnhancedReviewElement(review);
          mainGrid.appendChild(reviewElement);
          console.log(`➕ Added review ${index + 1}: ${review.name}`);
        });
      }
      
      // Update button text
      const buttonText = document.getElementById('viewAllCustomerReviewsText');
      if (buttonText) {
        buttonText.textContent = 'Hide Recent Reviews';
        window.showingAllCustomerReviews = true;
      }
      
      // Update review stats
      updateReviewCounts();
      
      console.log(`🎉 Successfully displayed ${approvedReviews.length} dynamic reviews + ${staticReviews.length} static reviews`);
      
    } catch (error) {
      console.error('❌ Error in forceDisplayAllReviews:', error);
    }
  }
  
  // Create enhanced review element that matches the existing style
  function createEnhancedReviewElement(review) {
    const reviewDiv = document.createElement('div');
    reviewDiv.setAttribute('data-dynamic-review', 'true');
    reviewDiv.className = 'bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all duration-300';
    
    const stars = '⭐'.repeat(review.rating);
    const initials = review.name.charAt(0).toUpperCase();
    
    // Generate random gradient colors for consistency
    const gradients = [
      'from-red-400 to-orange-500',
      'from-green-400 to-teal-500', 
      'from-pink-400 to-purple-500',
      'from-blue-400 to-indigo-500',
      'from-indigo-400 to-blue-500',
      'from-yellow-400 to-red-500',
      'from-purple-400 to-pink-500'
    ];
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    
    // Service badge colors
    const serviceColors = [
      'bg-blue-600', 'bg-purple-600', 'bg-orange-600', 'bg-red-600',
      'bg-teal-600', 'bg-green-600', 'bg-indigo-600'
    ];
    const randomServiceColor = serviceColors[Math.floor(Math.random() * serviceColors.length)];
    
    reviewDiv.innerHTML = `
      <div class="flex items-center mb-4">
        <div class="bg-gradient-to-br ${randomGradient} w-10 h-10 rounded-full flex items-center justify-center mr-3">
          <span class="text-white font-bold">${initials}</span>
        </div>
        <div>
          <h4 class="font-semibold text-white text-sm">${escapeHtml(review.name)}</h4>
          <p class="text-purple-200 text-xs">${escapeHtml(review.businessType || 'Customer')}</p>
        </div>
      </div>
      <div class="mb-3">
        <div class="text-yellow-400 text-sm">${stars}</div>
        <div class="${randomServiceColor} text-white px-2 py-1 rounded-full text-xs inline-block mt-1">${escapeHtml(review.service)}</div>
      </div>
      <p class="text-purple-100 leading-relaxed mb-3 text-sm">
        "${escapeHtml(review.text)}"
      </p>
      <div class="text-green-400 font-semibold text-xs">
        ✨ Verified Customer
      </div>
    `;
    
    return reviewDiv;
  }
  
  // Enhanced toggle function that actually shows ALL reviews
  function enhancedToggleAllReviews(event) {
    console.log('🔄 Enhanced toggle all reviews triggered...');
    
    if (event) {
      event.preventDefault();
    }
    
    try {
      const buttonText = document.getElementById('viewAllCustomerReviewsText');
      const mainGrid = document.getElementById('allCustomerReviews');
      
      if (!buttonText || !mainGrid) {
        console.error('❌ Button or main grid not found');
        return;
      }
      
      if (window.showingAllCustomerReviews) {
        // Hide dynamic reviews
        const dynamicReviews = mainGrid.querySelectorAll('[data-dynamic-review]');
        dynamicReviews.forEach(review => {
          review.style.display = 'none';
        });
        buttonText.textContent = 'View All Reviews';
        window.showingAllCustomerReviews = false;
        console.log('📱 Hidden dynamic reviews, showing only static ones');
        
      } else {
        // Show ALL reviews
        forceDisplayAllReviews();
        console.log('📞 Displaying ALL reviews');
      }
      
    } catch (error) {
      console.error('❌ Error in enhanced toggle:', error);
    }
  }
  
  // Update review counts and stats
  function updateReviewCounts() {
    try {
      const storedReviews = JSON.parse(localStorage.getItem('visualVibeReviews') || '[]');
      const approvedReviews = storedReviews.filter(review => review.approved !== false);
      
      const mainGrid = document.getElementById('allCustomerReviews');
      const staticCount = mainGrid ? mainGrid.querySelectorAll('.bg-white\\/10:not([data-dynamic-review])').length : 5;
      const totalCount = staticCount + approvedReviews.length;
      
      // Update total reviews display
      const totalReviewsElement = document.getElementById('totalReviews');
      if (totalReviewsElement) {
        totalReviewsElement.textContent = totalCount;
        console.log(`📊 Updated total reviews count to: ${totalCount}`);
      }
      
      // Update any other review count displays
      const reviewCountElements = document.querySelectorAll('[data-review-count]');
      reviewCountElements.forEach(el => {
        el.textContent = totalCount;
      });
      
    } catch (error) {
      console.error('❌ Error updating review counts:', error);
    }
  }
  
  // HTML escape function for security
  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  // Initialize the enhanced system
  function initializeEnhancedReviews() {
    console.log('🚀 Initializing enhanced review system...');
    
    // Override existing toggle function
    window.toggleAllCustomerReviews = enhancedToggleAllReviews;
    window.forceDisplayAllReviews = forceDisplayAllReviews;
    window.updateReviewCounts = updateReviewCounts;
    
    // Make sure we start with the correct state
    window.showingAllCustomerReviews = false;
    
    // Update counts on load
    updateReviewCounts();
    
    console.log('✅ Enhanced review system initialized');
    
    // Debug: Show what reviews we have
    setTimeout(() => {
      const storedReviews = JSON.parse(localStorage.getItem('visualVibeReviews') || '[]');
      console.log('🔍 Debug - Available reviews:', storedReviews);
      console.log('🔍 Debug - Approved reviews:', storedReviews.filter(r => r.approved !== false));
    }, 1000);
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEnhancedReviews);
  } else {
    initializeEnhancedReviews();
  }
  
  // Also initialize after delay to override any conflicting scripts
  setTimeout(initializeEnhancedReviews, 2000);
  
})();

console.log('🔧 View All Reviews fix loaded and ready!');
