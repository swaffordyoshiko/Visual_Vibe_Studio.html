// DEFINITIVE UNIFIED ORDERS & REVIEWS - Single form with delete functionality
console.log('🎯 Loading definitive unified Orders & Reviews interface...');

(function() {
  'use strict';
  
  // Absolute prevention of multiple initializations
  if (window.unifiedOrdersReviewsFinal) {
    console.log('✅ Unified Orders & Reviews already loaded');
    return;
  }
  window.unifiedOrdersReviewsFinal = true;
  
  // Clear ALL previous implementations
  console.log('🧹 Clearing all previous showOrderHistory implementations...');
  
  // Store any toast manager for notifications
  const toastManager = window.toastManager;
  
  // DEFINITIVE showOrderHistory - This is THE ONLY implementation
  window.showOrderHistory = function() {
    console.log('📋 [DEFINITIVE] Opening unified Orders & Reviews...');
    
    try {
      const modal = document.getElementById('orderHistoryModal');
      const content = document.getElementById('orderHistoryContent');
      
      if (!modal || !content) {
        console.error('❌ Modal elements not found');
        showNotification('Modal not available. Please refresh the page.', 'error');
        return;
      }
      
      // Always clear content first to prevent dual forms
      content.innerHTML = '';
      
      // Show modal
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Check authentication
      if (!window.currentUser) {
        showSignInPrompt(content);
        return;
      }
      
      // Show loading
      showLoadingState(content);
      
      // Load unified data after short delay to prevent race conditions
      setTimeout(() => loadUnifiedOrdersAndReviews(content), 200);
      
    } catch (error) {
      console.error('❌ Error in unified showOrderHistory:', error);
      showNotification('Error loading data. Please try again.', 'error');
    }
  };
  
  function showSignInPrompt(content) {
    content.innerHTML = `
      <div class="text-center py-12">
        <div class="text-gray-400 text-8xl mb-6">🔐</div>
        <h3 class="text-2xl font-bold text-gray-800 mb-4">Access Required</h3>
        <p class="text-gray-600 mb-6 max-w-md mx-auto">
          Please sign in to view and manage your orders and reviews.
        </p>
        <button onclick="closeOrderHistory(); openSignInModal();" 
                class="bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-lg transform hover:scale-105">
          Sign In
        </button>
      </div>
    `;
  }
  
  function showLoadingState(content) {
    content.innerHTML = `
      <div class="text-center py-12">
        <div class="relative mb-6">
          <div class="animate-spin w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-4 h-4 bg-indigo-600 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p class="text-gray-600 text-lg">Loading your orders and reviews...</p>
      </div>
    `;
  }
  
  function loadUnifiedOrdersAndReviews(content) {
    try {
      console.log('📊 Loading unified orders and reviews data...');
      
      // Get data from all possible storage locations
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      
      // Check legacy storage format too
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const legacyUser = users.find(u => u.email === window.currentUser.email);
      
      // Combine all data sources
      let orders = [...(userData.orders || [])];
      let reviews = [...(userData.reviews || [])];
      
      if (legacyUser) {
        if (legacyUser.orders) orders.push(...legacyUser.orders);
        if (legacyUser.reviews) reviews.push(...legacyUser.reviews);
      }
      
      // Remove duplicates and add unique IDs
      orders = removeDuplicatesAndAddIds(orders, 'order');
      reviews = removeDuplicatesAndAddIds(reviews, 'review');
      
      // Generate the unified interface
      content.innerHTML = generateUnifiedInterface(orders, reviews);
      
      console.log(`✅ Loaded ${orders.length} orders and ${reviews.length} reviews`);
      
    } catch (error) {
      console.error('❌ Error loading data:', error);
      content.innerHTML = `
        <div class="text-center py-12">
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
  
  function removeDuplicatesAndAddIds(items, type) {
    const seen = new Set();
    return items.map((item, index) => {
      // Ensure each item has a unique ID
      if (!item.id) {
        item.id = `${type}_${Date.now()}_${index}`;
      }
      
      // Create unique identifier for deduplication
      const identifier = item.id || item.orderNumber || JSON.stringify(item);
      
      if (seen.has(identifier)) {
        return null; // Mark for removal
      }
      seen.add(identifier);
      return item;
    }).filter(Boolean); // Remove nulls
  }
  
  function generateUnifiedInterface(orders, reviews) {
    const totalItems = orders.length + reviews.length;
    
    if (totalItems === 0) {
      return generateEmptyState();
    }
    
    return `
      <div class="space-y-8">
        <!-- Header with counts -->
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
          <h3 class="text-2xl font-bold text-gray-800 mb-4">Your Orders & Reviews</h3>
          <div class="grid grid-cols-2 gap-6">
            <div class="text-center bg-white rounded-lg p-4 shadow-sm">
              <div class="text-3xl font-bold text-indigo-600">${orders.length}</div>
              <div class="text-gray-600 font-medium">Orders</div>
            </div>
            <div class="text-center bg-white rounded-lg p-4 shadow-sm">
              <div class="text-3xl font-bold text-yellow-600">${reviews.length}</div>
              <div class="text-gray-600 font-medium">Reviews</div>
            </div>
          </div>
        </div>

        <!-- Orders Section -->
        ${orders.length > 0 ? generateOrdersSection(orders) : ''}
        
        <!-- Reviews Section -->
        ${reviews.length > 0 ? generateReviewsSection(reviews) : ''}

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
          <button onclick="closeOrderHistory(); document.getElementById('services')?.scrollIntoView({behavior: 'smooth'});" 
                  class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
            New Project
          </button>
          <button onclick="closeOrderHistory(); openContactModal?.();" 
                  class="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    `;
  }
  
  function generateEmptyState() {
    return `
      <div class="text-center py-16">
        <div class="text-8xl mb-8">🎨</div>
        <h3 class="text-3xl font-bold text-gray-800 mb-4">Welcome to Visual Vibe Studio!</h3>
        <p class="text-gray-600 mb-8 max-w-lg mx-auto text-lg leading-relaxed">
          You haven't placed any orders or left any reviews yet. Let's start creating something amazing together!
        </p>
        <div class="space-y-4">
          <button onclick="closeOrderHistory(); document.getElementById('services')?.scrollIntoView({behavior: 'smooth'});" 
                  class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg transform hover:scale-105">
            Explore Our Services
          </button>
          <div class="text-gray-400">or</div>
          <button onclick="closeOrderHistory(); openContactModal?.();" 
                  class="text-indigo-600 hover:text-indigo-800 font-medium underline text-lg">
            Get a Custom Quote
          </button>
        </div>
      </div>
    `;
  }
  
  function generateOrdersSection(orders) {
    return `
      <div class="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div class="bg-indigo-50 p-6 border-b">
          <h4 class="text-xl font-bold text-gray-800 flex items-center">
            <span class="text-2xl mr-3">📦</span>
            Your Orders
            <span class="ml-3 bg-indigo-200 text-indigo-800 text-sm px-3 py-1 rounded-full">${orders.length}</span>
          </h4>
          <p class="text-gray-600 mt-2">Manage your project orders and track their progress</p>
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
        <div class="flex justify-between items-start mb-4">
          <div class="flex-1">
            <h5 class="text-lg font-semibold text-gray-800 mb-1">
              ${order.businessName || order.service || 'Design Project'}
            </h5>
            <p class="text-sm text-gray-500 mb-2">
              Order #${order.orderNumber || order.id} • ${formatDate(order.date || order.timestamp)}
            </p>
            <div class="flex items-center gap-4">
              <span class="px-3 py-1 rounded-full text-sm font-medium border ${statusClass}">
                ${status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
              <span class="text-lg font-bold text-indigo-600">
                $${order.total || order.amount || 'Quote Required'}
              </span>
            </div>
          </div>
          <button onclick="deleteOrder('${order.id}')" 
                  class="ml-4 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 px-4 py-2 rounded-lg transition-colors border border-red-200 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            Delete
          </button>
        </div>
        ${order.services ? `
          <div class="text-sm text-gray-600">
            <strong>Services:</strong> ${Array.isArray(order.services) ? order.services.join(', ') : order.services}
          </div>
        ` : ''}
      </div>
    `;
  }
  
  function generateReviewsSection(reviews) {
    return `
      <div class="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div class="bg-yellow-50 p-6 border-b">
          <h4 class="text-xl font-bold text-gray-800 flex items-center">
            <span class="text-2xl mr-3">⭐</span>
            Your Reviews
            <span class="ml-3 bg-yellow-200 text-yellow-800 text-sm px-3 py-1 rounded-full">${reviews.length}</span>
          </h4>
          <p class="text-gray-600 mt-2">Your feedback helps us improve our services</p>
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
            <div class="flex items-center gap-3 mb-3">
              <span class="text-2xl text-yellow-500">${stars}</span>
              <span class="text-sm text-gray-500">${formatDate(review.date || review.timestamp)}</span>
            </div>
            <blockquote class="text-gray-700 italic text-lg leading-relaxed mb-2">
              "${review.text || review.comment || 'Great service!'}"
            </blockquote>
            ${review.service ? `
              <p class="text-sm text-gray-500">For: ${review.service}</p>
            ` : ''}
          </div>
          <button onclick="deleteReview('${review.id}')" 
                  class="ml-4 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 px-4 py-2 rounded-lg transition-colors border border-red-200 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            Delete
          </button>
        </div>
      </div>
    `;
  }
  
  // Delete Functions
  window.deleteOrder = function(orderId) {
    if (!confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      return;
    }
    
    try {
      console.log(`🗑️ Deleting order ${orderId}...`);
      
      // Remove from all storage locations
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      
      if (userData.orders) {
        userData.orders = userData.orders.filter(order => order.id !== orderId);
        localStorage.setItem(userKey, JSON.stringify(userData));
      }
      
      // Also clean legacy storage
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.email === window.currentUser.email);
      if (userIndex !== -1 && users[userIndex].orders) {
        users[userIndex].orders = users[userIndex].orders.filter(order => order.id !== orderId);
        localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      }
      
      // Remove from UI with animation
      const orderElement = document.getElementById(`order-${orderId}`);
      if (orderElement) {
        orderElement.style.transition = 'all 0.3s ease';
        orderElement.style.opacity = '0';
        orderElement.style.transform = 'translateX(-100%)';
        setTimeout(() => {
          orderElement.remove();
          showNotification('Order deleted successfully', 'success');
        }, 300);
      }
      
      console.log('✅ Order deleted successfully');
      
    } catch (error) {
      console.error('❌ Error deleting order:', error);
      showNotification('Error deleting order. Please try again.', 'error');
    }
  };
  
  window.deleteReview = function(reviewId) {
    if (!confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      return;
    }
    
    try {
      console.log(`🗑️ Deleting review ${reviewId}...`);
      
      // Remove from all storage locations
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      
      if (userData.reviews) {
        userData.reviews = userData.reviews.filter(review => review.id !== reviewId);
        localStorage.setItem(userKey, JSON.stringify(userData));
      }
      
      // Also clean legacy storage
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.email === window.currentUser.email);
      if (userIndex !== -1 && users[userIndex].reviews) {
        users[userIndex].reviews = users[userIndex].reviews.filter(review => review.id !== reviewId);
        localStorage.setItem('visualVibeUsers', JSON.stringify(users));
      }
      
      // Remove from UI with animation
      const reviewElement = document.getElementById(`review-${reviewId}`);
      if (reviewElement) {
        reviewElement.style.transition = 'all 0.3s ease';
        reviewElement.style.opacity = '0';
        reviewElement.style.transform = 'translateX(-100%)';
        setTimeout(() => {
          reviewElement.remove();
          showNotification('Review deleted successfully', 'success');
        }, 300);
      }
      
      console.log('✅ Review deleted successfully');
      
    } catch (error) {
      console.error('❌ Error deleting review:', error);
      showNotification('Error deleting review. Please try again.', 'error');
    }
  };
  
  // Helper Functions
  function formatDate(dateInput) {
    if (!dateInput) return 'Date not available';
    
    try {
      let date;
      if (typeof dateInput === 'string') {
        date = new Date(dateInput);
      } else if (typeof dateInput === 'number') {
        date = new Date(dateInput);
      } else {
        date = dateInput;
      }
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  }
  
  function showNotification(message, type = 'info') {
    if (toastManager && toastManager.show) {
      toastManager.show(message, { type, duration: 3000 });
    } else if (toastManager && toastManager[type]) {
      toastManager[type](message, { duration: 3000 });
    } else {
      // Fallback notification
      const notification = document.createElement('div');
      notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white transition-all ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 'bg-blue-500'
      }`;
      notification.textContent = message;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }
  }
  
  // Ensure closeOrderHistory exists and works properly
  window.closeOrderHistory = function() {
    console.log('📋 [DEFINITIVE] Closing Orders & Reviews...');
    const modal = document.getElementById('orderHistoryModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  };
  
  console.log('✅ Definitive unified Orders & Reviews interface loaded successfully');
  
})();
