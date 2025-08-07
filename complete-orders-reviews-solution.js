// COMPLETE DEFINITIVE ORDERS & REVIEWS SOLUTION
console.log('🎯 Loading complete definitive Orders & Reviews solution...');

(function() {
  'use strict';
  
  // Absolute prevention of multiple initializations
  if (window.completeOrdersReviewsSolution) {
    console.log('✅ Complete solution already loaded');
    return;
  }
  window.completeOrdersReviewsSolution = true;
  
  // Clear all conflicting flags
  window.dualOrdersFixed = false;
  window.unifiedOrdersReviewsFinal = false;
  window.myOrdersUnified = false;
  
  console.log('🧹 Clearing ALL conflicting implementations...');
  
  // DEFINITIVE showOrderHistory - This overrides EVERYTHING
  window.showOrderHistory = function() {
    console.log('📋 [COMPLETE SOLUTION] Opening Orders & Reviews...');
    
    try {
      const modal = document.getElementById('orderHistoryModal');
      const content = document.getElementById('orderHistoryContent');
      
      if (!modal || !content) {
        console.error('❌ Modal elements not found');
        alert('Modal not available. Please refresh the page.');
        return;
      }
      
      // ALWAYS clear content first to prevent any dual display
      content.innerHTML = '';
      
      // Show modal properly
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Check authentication
      if (!window.currentUser) {
        showSignInPrompt(content);
        return;
      }
      
      // Show loading state
      showLoadingState(content);
      
      // Load data after delay to ensure proper rendering
      setTimeout(() => {
        loadCompleteOrdersAndReviews(content);
      }, 150);
      
    } catch (error) {
      console.error('❌ Error in complete solution:', error);
      alert('Error loading data. Please try again.');
    }
  };
  
  function showSignInPrompt(content) {
    content.innerHTML = `
      <div class="text-center py-16">
        <div class="text-gray-400 text-8xl mb-6">🔐</div>
        <h3 class="text-2xl font-bold text-gray-800 mb-4">Sign In Required</h3>
        <p class="text-gray-600 mb-8 max-w-md mx-auto text-lg">
          Please sign in to view and manage your orders and reviews.
        </p>
        <button onclick="closeOrderHistory(); openSignInModal();" 
                class="bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-lg">
          Sign In to Continue
        </button>
      </div>
    `;
  }
  
  function showLoadingState(content) {
    content.innerHTML = `
      <div class="text-center py-16">
        <div class="relative mb-6">
          <div class="animate-spin w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto"></div>
        </div>
        <p class="text-gray-600 text-lg">Loading your orders and reviews...</p>
      </div>
    `;
  }
  
  function loadCompleteOrdersAndReviews(content) {
    try {
      console.log('📊 Loading complete orders and reviews data...');
      
      // Get data from ALL possible storage locations
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      
      // Legacy storage check
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const legacyUser = users.find(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
      
      // Combine all data sources
      let orders = [...(userData.orders || [])];
      let reviews = [...(userData.reviews || [])];
      
      if (legacyUser) {
        if (legacyUser.orders) orders.push(...legacyUser.orders);
        if (legacyUser.reviews) reviews.push(...legacyUser.reviews);
      }
      
      // Ensure unique IDs and remove duplicates
      orders = ensureUniqueItems(orders, 'order');
      reviews = ensureUniqueItems(reviews, 'review');
      
      console.log(`📊 Found ${orders.length} orders and ${reviews.length} reviews`);
      
      // Generate complete interface
      content.innerHTML = generateCompleteInterface(orders, reviews);
      
    } catch (error) {
      console.error('❌ Error loading complete data:', error);
      content.innerHTML = `
        <div class="text-center py-16">
          <div class="text-red-400 text-6xl mb-4">⚠️</div>
          <h3 class="text-xl font-bold text-gray-800 mb-4">Error Loading Data</h3>
          <p class="text-gray-600 mb-6">We couldn't load your orders and reviews.</p>
          <button onclick="location.reload()" 
                  class="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700">
            Refresh Page
          </button>
        </div>
      `;
    }
  }
  
  function ensureUniqueItems(items, type) {
    const seen = new Set();
    return items.map((item, index) => {
      // Ensure unique ID
      if (!item.id) {
        item.id = `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      }
      
      // Check for duplicates
      const identifier = item.id;
      if (seen.has(identifier)) {
        return null;
      }
      seen.add(identifier);
      return item;
    }).filter(Boolean);
  }
  
  function generateCompleteInterface(orders, reviews) {
    const totalItems = orders.length + reviews.length;
    
    if (totalItems === 0) {
      return generateEmptyState();
    }
    
    return `
      <div class="space-y-8">
        <!-- Header with totals -->
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
          <h3 class="text-2xl font-bold text-gray-800 mb-6">Your Complete Activity</h3>
          <div class="grid grid-cols-2 gap-6">
            <div class="text-center bg-white rounded-lg p-6 shadow-sm border">
              <div class="text-4xl font-bold text-indigo-600 mb-2">${orders.length}</div>
              <div class="text-gray-700 font-semibold">Orders</div>
              <div class="text-gray-500 text-sm mt-1">Project orders placed</div>
            </div>
            <div class="text-center bg-white rounded-lg p-6 shadow-sm border">
              <div class="text-4xl font-bold text-yellow-600 mb-2">${reviews.length}</div>
              <div class="text-gray-700 font-semibold">Reviews</div>
              <div class="text-gray-500 text-sm mt-1">Feedback submitted</div>
            </div>
          </div>
        </div>

        <!-- Orders Section -->
        ${orders.length > 0 ? generateOrdersSection(orders) : ''}
        
        <!-- Reviews Section -->
        ${reviews.length > 0 ? generateReviewsSection(reviews) : ''}

        <!-- Quick Actions -->
        <div class="bg-gray-50 rounded-xl p-6 border">
          <h4 class="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h4>
          <div class="flex flex-wrap gap-4">
            <button onclick="closeOrderHistory(); scrollToServices();" 
                    class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
              <span>🎨</span> New Project
            </button>
            <button onclick="closeOrderHistory(); openContactModal?.();" 
                    class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
              <span>💬</span> Contact Support
            </button>
            <button onclick="addNewReview()" 
                    class="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2">
              <span>⭐</span> Add Review
            </button>
          </div>
        </div>
      </div>
    `;
  }
  
  function generateEmptyState() {
    return `
      <div class="text-center py-20">
        <div class="text-8xl mb-8">🎨</div>
        <h3 class="text-3xl font-bold text-gray-800 mb-6">Welcome to Visual Vibe Studio!</h3>
        <p class="text-gray-600 mb-10 max-w-lg mx-auto text-lg leading-relaxed">
          You haven't placed any orders or left any reviews yet. Let's start creating something amazing together!
        </p>
        <div class="space-y-6">
          <button onclick="closeOrderHistory(); scrollToServices();" 
                  class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg text-lg font-semibold">
            Explore Our Services
          </button>
          <div class="text-gray-400 text-lg">or</div>
          <button onclick="closeOrderHistory(); openContactModal?.();" 
                  class="text-indigo-600 hover:text-indigo-800 font-semibold underline text-lg">
            Get a Custom Quote
          </button>
        </div>
      </div>
    `;
  }
  
  function generateOrdersSection(orders) {
    return `
      <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
        <div class="bg-indigo-50 p-6 border-b border-indigo-100">
          <h4 class="text-xl font-bold text-gray-800 flex items-center">
            <span class="text-2xl mr-3">📦</span>
            Your Orders
            <span class="ml-3 bg-indigo-200 text-indigo-800 text-sm px-3 py-1 rounded-full font-semibold">${orders.length}</span>
          </h4>
          <p class="text-gray-600 mt-2">Manage and track your project orders</p>
        </div>
        <div class="divide-y divide-gray-100">
          ${orders.map(order => generateOrderItem(order)).join('')}
        </div>
      </div>
    `;
  }
  
  function generateOrderItem(order) {
    const statusColors = {
      completed: 'bg-green-100 text-green-700 border-green-200',
      'in-progress': 'bg-blue-100 text-blue-700 border-blue-200',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      cancelled: 'bg-red-100 text-red-700 border-red-200'
    };
    
    const status = order.status || 'pending';
    const statusClass = statusColors[status] || statusColors.pending;
    
    return `
      <div class="p-6 hover:bg-gray-50 transition-colors" id="order-${order.id}">
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <h5 class="text-lg font-semibold text-gray-800 mb-2">
              ${order.businessName || order.service || 'Design Project'}
            </h5>
            <div class="flex items-center gap-4 mb-3">
              <span class="text-sm text-gray-500">
                Order #${order.orderNumber || order.id}
              </span>
              <span class="text-sm text-gray-500">
                ${formatDate(order.date || order.timestamp)}
              </span>
            </div>
            <div class="flex items-center gap-4 mb-3">
              <span class="px-3 py-1 rounded-full text-sm font-medium border ${statusClass}">
                ${status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
              <span class="text-lg font-bold text-indigo-600">
                $${order.total || order.amount || 'Quote Required'}
              </span>
            </div>
            ${order.services ? `
              <div class="text-sm text-gray-600">
                <strong>Services:</strong> ${Array.isArray(order.services) ? order.services.join(', ') : order.services}
              </div>
            ` : ''}
          </div>
          <button onclick="actuallyDeleteOrder('${order.id}')" 
                  class="ml-4 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 px-4 py-2 rounded-lg transition-colors border border-red-200 flex items-center gap-2 font-medium">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            Delete Order
          </button>
        </div>
      </div>
    `;
  }
  
  function generateReviewsSection(reviews) {
    return `
      <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
        <div class="bg-yellow-50 p-6 border-b border-yellow-100">
          <h4 class="text-xl font-bold text-gray-800 flex items-center">
            <span class="text-2xl mr-3">⭐</span>
            Your Reviews
            <span class="ml-3 bg-yellow-200 text-yellow-800 text-sm px-3 py-1 rounded-full font-semibold">${reviews.length}</span>
          </h4>
          <p class="text-gray-600 mt-2">Your feedback and testimonials</p>
        </div>
        <div class="divide-y divide-gray-100">
          ${reviews.map(review => generateReviewItem(review)).join('')}
        </div>
      </div>
    `;
  }
  
  function generateReviewItem(review) {
    const rating = review.rating || 5;
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    
    return `
      <div class="p-6 hover:bg-gray-50 transition-colors" id="review-${review.id}">
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <div class="flex items-center gap-4 mb-3">
              <span class="text-2xl text-yellow-500">${stars}</span>
              <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                ${formatDate(review.date || review.timestamp)}
              </span>
            </div>
            <blockquote class="text-gray-700 text-lg leading-relaxed mb-3 italic">
              "${review.text || review.comment || 'Great service!'}"
            </blockquote>
            ${review.service ? `
              <p class="text-sm text-gray-500 bg-blue-50 px-3 py-1 rounded inline-block">
                <strong>Service:</strong> ${review.service}
              </p>
            ` : ''}
          </div>
          <button onclick="actuallyDeleteReview('${review.id}')" 
                  class="ml-4 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 px-4 py-2 rounded-lg transition-colors border border-red-200 flex items-center gap-2 font-medium">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            Delete Review
          </button>
        </div>
      </div>
    `;
  }
  
  // WORKING Delete Functions
  window.actuallyDeleteOrder = function(orderId) {
    if (!confirm('⚠️ Are you sure you want to permanently delete this order?\n\nThis action cannot be undone.')) {
      return;
    }
    
    try {
      console.log(`🗑️ ACTUALLY deleting order ${orderId}...`);
      
      let deleted = false;
      
      // Remove from user-specific storage
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      
      if (userData.orders) {
        const originalLength = userData.orders.length;
        userData.orders = userData.orders.filter(order => order.id !== orderId);
        if (userData.orders.length < originalLength) {
          localStorage.setItem(userKey, JSON.stringify(userData));
          deleted = true;
          console.log('✅ Deleted from user storage');
        }
      }
      
      // Remove from legacy storage
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
      if (userIndex !== -1 && users[userIndex].orders) {
        const originalLength = users[userIndex].orders.length;
        users[userIndex].orders = users[userIndex].orders.filter(order => order.id !== orderId);
        if (users[userIndex].orders.length < originalLength) {
          localStorage.setItem('visualVibeUsers', JSON.stringify(users));
          deleted = true;
          console.log('✅ Deleted from legacy storage');
        }
      }
      
      if (deleted) {
        // Remove from UI with animation
        const orderElement = document.getElementById(`order-${orderId}`);
        if (orderElement) {
          orderElement.style.transition = 'all 0.5s ease';
          orderElement.style.opacity = '0';
          orderElement.style.transform = 'translateX(-100%)';
          orderElement.style.backgroundColor = '#fee2e2';
          setTimeout(() => {
            orderElement.remove();
            showSuccessMessage('Order permanently deleted', 'success');
          }, 500);
        }
        console.log('✅ Order ACTUALLY deleted successfully');
      } else {
        console.warn('⚠️ Order not found in storage');
        showSuccessMessage('Order not found', 'warning');
      }
      
    } catch (error) {
      console.error('❌ Error ACTUALLY deleting order:', error);
      showSuccessMessage('Error deleting order. Please try again.', 'error');
    }
  };
  
  window.actuallyDeleteReview = function(reviewId) {
    if (!confirm('⚠️ Are you sure you want to permanently delete this review?\n\nThis action cannot be undone.')) {
      return;
    }
    
    try {
      console.log(`🗑️ ACTUALLY deleting review ${reviewId}...`);
      
      let deleted = false;
      
      // Remove from user-specific storage
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      
      if (userData.reviews) {
        const originalLength = userData.reviews.length;
        userData.reviews = userData.reviews.filter(review => review.id !== reviewId);
        if (userData.reviews.length < originalLength) {
          localStorage.setItem(userKey, JSON.stringify(userData));
          deleted = true;
          console.log('✅ Deleted from user storage');
        }
      }
      
      // Remove from legacy storage
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
      if (userIndex !== -1 && users[userIndex].reviews) {
        const originalLength = users[userIndex].reviews.length;
        users[userIndex].reviews = users[userIndex].reviews.filter(review => review.id !== reviewId);
        if (users[userIndex].reviews.length < originalLength) {
          localStorage.setItem('visualVibeUsers', JSON.stringify(users));
          deleted = true;
          console.log('✅ Deleted from legacy storage');
        }
      }
      
      if (deleted) {
        // Remove from UI with animation
        const reviewElement = document.getElementById(`review-${reviewId}`);
        if (reviewElement) {
          reviewElement.style.transition = 'all 0.5s ease';
          reviewElement.style.opacity = '0';
          reviewElement.style.transform = 'translateX(-100%)';
          reviewElement.style.backgroundColor = '#fee2e2';
          setTimeout(() => {
            reviewElement.remove();
            showSuccessMessage('Review permanently deleted', 'success');
          }, 500);
        }
        console.log('✅ Review ACTUALLY deleted successfully');
      } else {
        console.warn('⚠️ Review not found in storage');
        showSuccessMessage('Review not found', 'warning');
      }
      
    } catch (error) {
      console.error('❌ Error ACTUALLY deleting review:', error);
      showSuccessMessage('Error deleting review. Please try again.', 'error');
    }
  };
  
  // Helper Functions
  function formatDate(dateInput) {
    if (!dateInput) return 'Date not available';
    
    try {
      const date = new Date(dateInput);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  }
  
  function showSuccessMessage(message, type = 'info') {
    // Create notification
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white transition-all transform translate-x-full ${
      type === 'success' ? 'bg-green-500' : 
      type === 'error' ? 'bg-red-500' : 
      type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
    }`;
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-lg">
          ${type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️'}
        </span>
        <span class="font-medium">${message}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }
  
  // Helper functions for UI actions
  window.scrollToServices = function() {
    const servicesElement = document.getElementById('services');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback - try other common IDs
      const alternativeElements = ['order', 'pricing', 'contact'];
      for (const id of alternativeElements) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          break;
        }
      }
    }
  };
  
  window.addNewReview = function() {
    // This would open a review modal - placeholder for now
    alert('Add Review functionality would open here. This can be implemented based on your review form.');
  };
  
  // Ensure close function works properly
  window.closeOrderHistory = function() {
    console.log('📋 [COMPLETE SOLUTION] Closing Orders & Reviews...');
    const modal = document.getElementById('orderHistoryModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  };
  
  console.log('✅ Complete definitive Orders & Reviews solution loaded successfully');
  console.log('🛡️ All conflicts eliminated - this is the ONLY implementation');
  
})();
