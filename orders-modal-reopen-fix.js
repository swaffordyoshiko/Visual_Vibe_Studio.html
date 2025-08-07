// MY ORDERS MODAL REOPEN FIX - Allows multiple opens without page reload
console.log('🔄 Loading My Orders reopen fix...');

(function() {
  'use strict';
  
  // Prevent multiple loads
  if (window.ordersModalReopenFix) {
    return;
  }
  window.ordersModalReopenFix = true;
  
  console.log('🛠️ Fixing My Orders modal reopen functionality...');
  
  // Track modal state
  let modalState = {
    isOpen: false,
    isLoading: false,
    canOpen: true
  };
  
  // Ensure orders modal exists and is properly configured
  function ensureOrdersModalExists() {
    let modal = document.getElementById('orderHistoryModal');
    
    if (!modal) {
      console.log('⚠️ Orders modal not found, creating it...');
      createOrdersModal();
      modal = document.getElementById('orderHistoryModal');
    }
    
    // Reset modal state
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      modalState.isOpen = false;
    }
    
    return modal;
  }
  
  function createOrdersModal() {
    const modal = document.createElement('div');
    modal.id = 'orderHistoryModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden p-2 sm:p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-xl p-3 sm:p-6 lg:p-8 max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl">
        <div class="flex justify-between items-center mb-3 sm:mb-4 lg:mb-6">
          <h3 class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800">My Orders & Receipts</h3>
          <button onclick="closeOrderHistory()" class="text-gray-500 hover:text-gray-700 p-2 -m-2 touch-manipulation">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div id="orderHistoryContent" class="space-y-4">
          <div class="text-center py-8 text-gray-500">
            <p>Loading your orders...</p>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    console.log('✅ Orders modal created successfully');
  }
  
  // FIXED showOrderHistory function that works multiple times
  window.showOrderHistory = function() {
    console.log('📋 Opening My Orders (attempt)...');
    
    // Prevent multiple rapid clicks
    if (modalState.isLoading) {
      console.log('⚠️ Already loading, please wait...');
      return;
    }
    
    // Check if already open
    if (modalState.isOpen) {
      console.log('⚠️ Modal already open');
      return;
    }
    
    modalState.isLoading = true;
    
    try {
      // Ensure modal exists and is ready
      const modal = ensureOrdersModalExists();
      const content = document.getElementById('orderHistoryContent');
      
      if (!modal || !content) {
        console.error('❌ Modal or content not found');
        modalState.isLoading = false;
        alert('Orders modal not available. Please refresh the page.');
        return;
      }
      
      // Reset content
      content.innerHTML = '';
      
      // Show modal
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      modalState.isOpen = true;
      
      console.log('✅ Modal opened successfully');
      
      // Check authentication
      if (!window.currentUser) {
        content.innerHTML = `
          <div class="text-center py-16">
            <div class="text-6xl mb-6">🔐</div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Sign In Required</h3>
            <p class="text-gray-600 mb-8">Please sign in to view your orders and reviews.</p>
            <button onclick="closeOrderHistory(); openSignInModal();" 
                    class="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700">
              Sign In
            </button>
          </div>
        `;
        modalState.isLoading = false;
        return;
      }
      
      // Show loading state
      content.innerHTML = `
        <div class="text-center py-12">
          <div class="animate-spin w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto mb-4"></div>
          <p class="text-gray-600">Loading your orders and reviews...</p>
        </div>
      `;
      
      // Load data after short delay
      setTimeout(() => {
        loadOrdersAndReviews();
        modalState.isLoading = false;
      }, 300);
      
    } catch (error) {
      console.error('❌ Error opening orders modal:', error);
      modalState.isLoading = false;
      modalState.isOpen = false;
      alert('Error opening orders. Please try again.');
    }
  };
  
  function loadOrdersAndReviews() {
    const content = document.getElementById('orderHistoryContent');
    if (!content || !window.currentUser) return;
    
    try {
      console.log('📊 Loading orders and reviews data...');
      
      // Get data from all storage locations
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const legacyUser = users.find(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
      
      // Combine all data sources
      let allOrders = [];
      let allReviews = [];
      
      if (userData.orders) allOrders.push(...userData.orders);
      if (userData.reviews) allReviews.push(...userData.reviews);
      if (legacyUser) {
        if (legacyUser.orders) allOrders.push(...legacyUser.orders);
        if (legacyUser.reviews) allReviews.push(...legacyUser.reviews);
      }
      
      // Remove duplicates and ensure IDs
      const orders = deduplicateItems(allOrders, 'order');
      const reviews = deduplicateItems(allReviews, 'review');
      
      console.log(`📊 Found ${orders.length} orders and ${reviews.length} reviews`);
      
      if (orders.length === 0 && reviews.length === 0) {
        content.innerHTML = generateEmptyState();
        return;
      }
      
      // Generate content with both orders and reviews
      content.innerHTML = generateOrdersAndReviewsContent(orders, reviews);
      
    } catch (error) {
      console.error('❌ Error loading orders data:', error);
      content.innerHTML = `
        <div class="text-center py-12">
          <div class="text-red-400 text-4xl mb-4">⚠️</div>
          <p class="text-gray-600 mb-4">Error loading your data</p>
          <button onclick="showOrderHistory()" 
                  class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Try Again
          </button>
        </div>
      `;
    }
  }
  
  function deduplicateItems(items, type) {
    const seen = new Set();
    return items.map((item, index) => {
      if (!item.id) {
        item.id = `${type}_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}`;
      }
      
      const key = item.id;
      if (seen.has(key)) {
        return null;
      }
      seen.add(key);
      return item;
    }).filter(Boolean);
  }
  
  function generateEmptyState() {
    return `
      <div class="text-center py-16">
        <div class="text-6xl mb-8">🎨</div>
        <h3 class="text-2xl font-bold text-gray-800 mb-4">No Orders or Reviews Yet</h3>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">
          Start your first project with us or leave a review about our services!
        </p>
        <div class="space-y-4">
          <button onclick="closeOrderHistory(); document.getElementById('services')?.scrollIntoView({behavior: 'smooth'});" 
                  class="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 block mx-auto">
            Browse Services
          </button>
          <button onclick="closeOrderHistory(); document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});" 
                  class="text-indigo-600 hover:text-indigo-800 font-medium">
            Contact Us
          </button>
        </div>
      </div>
    `;
  }
  
  function generateOrdersAndReviewsContent(orders, reviews) {
    let html = `
      <div class="space-y-8">
        <!-- Summary Header -->
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
          <h3 class="text-2xl font-bold text-gray-800 mb-6">Your Activity Summary</h3>
          <div class="grid grid-cols-2 gap-6">
            <div class="bg-white rounded-lg p-6 text-center shadow-sm">
              <div class="text-4xl font-bold text-indigo-600 mb-2">${orders.length}</div>
              <div class="text-gray-700 font-semibold">Orders</div>
              <div class="text-gray-500 text-sm">Project orders</div>
            </div>
            <div class="bg-white rounded-lg p-6 text-center shadow-sm">
              <div class="text-4xl font-bold text-yellow-600 mb-2">${reviews.length}</div>
              <div class="text-gray-700 font-semibold">Reviews</div>
              <div class="text-gray-500 text-sm">Your feedback</div>
            </div>
          </div>
        </div>
    `;
    
    // Orders Section
    if (orders.length > 0) {
      html += generateOrdersSection(orders);
    }
    
    // Reviews Section
    if (reviews.length > 0) {
      html += generateReviewsSection(reviews);
    }
    
    html += `
        <!-- Action Buttons -->
        <div class="bg-gray-50 rounded-xl p-6 border">
          <h4 class="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h4>
          <div class="flex flex-wrap gap-4">
            <button onclick="closeOrderHistory(); document.getElementById('services')?.scrollIntoView({behavior: 'smooth'});" 
                    class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
              New Project
            </button>
            <button onclick="closeOrderHistory(); document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});" 
                    class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    `;
    
    return html;
  }
  
  function generateOrdersSection(orders) {
    return `
      <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
        <div class="bg-indigo-50 p-6 border-b border-indigo-100">
          <h4 class="text-xl font-bold text-gray-800 flex items-center">
            📦 Your Orders (${orders.length})
          </h4>
          <p class="text-gray-600 mt-2">Track and manage your project orders</p>
        </div>
        <div class="divide-y divide-gray-100">
          ${orders.map(order => generateOrderItem(order)).join('')}
        </div>
      </div>
    `;
  }
  
  function generateOrderItem(order) {
    const orderId = order.id || `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return `
      <div class="p-6 hover:bg-gray-50 transition-colors" id="order-${orderId}">
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <h5 class="text-lg font-semibold text-gray-800 mb-2">
              ${order.businessName || order.service || 'Design Project'}
            </h5>
            <div class="grid grid-cols-2 gap-4 mb-3 text-sm text-gray-600">
              <div>
                <span class="font-medium">Order #:</span> ${order.orderNumber || orderId.substr(-6)}
              </div>
              <div>
                <span class="font-medium">Date:</span> ${formatDate(order.date || order.timestamp)}
              </div>
              <div>
                <span class="font-medium">Status:</span> 
                <span class="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700">
                  ${(order.status || 'pending').toUpperCase()}
                </span>
              </div>
              <div>
                <span class="font-medium">Total:</span> 
                <span class="text-lg font-bold text-indigo-600">$${order.total || order.amount || 'TBD'}</span>
              </div>
            </div>
          </div>
          <button onclick="deleteOrderWithConfirm('${orderId}')" 
                  class="ml-6 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 px-4 py-2 rounded-lg transition-colors border border-red-200 flex items-center gap-2 font-medium">
            🗑️ Delete
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
            ⭐ Your Reviews (${reviews.length})
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
    const reviewId = review.id || `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const rating = review.rating || 5;
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    
    return `
      <div class="p-6 hover:bg-gray-50 transition-colors" id="review-${reviewId}">
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <div class="flex items-center gap-4 mb-3">
              <span class="text-2xl text-yellow-500">${stars}</span>
              <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                ${formatDate(review.date || review.timestamp)}
              </span>
            </div>
            <blockquote class="text-gray-700 text-lg leading-relaxed mb-3 italic">
              "${review.text || review.comment || 'Great service!'}"
            </blockquote>
            ${review.service ? `
              <div class="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded inline-block">
                <span class="font-medium">Service:</span> ${review.service}
              </div>
            ` : ''}
          </div>
          <button onclick="deleteReviewWithConfirm('${reviewId}')" 
                  class="ml-6 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 px-4 py-2 rounded-lg transition-colors border border-red-200 flex items-center gap-2 font-medium">
            🗑️ Delete
          </button>
        </div>
      </div>
    `;
  }
  
  // Delete functions with confirmation
  window.deleteOrderWithConfirm = function(orderId) {
    if (!confirm('⚠️ Are you sure you want to delete this order?\n\nThis action cannot be undone.')) {
      return;
    }
    
    console.log(`🗑️ Deleting order: ${orderId}`);
    
    try {
      // Remove from storage
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      if (userData.orders) {
        userData.orders = userData.orders.filter(order => order.id !== orderId);
        localStorage.setItem(userKey, JSON.stringify(userData));
      }
      
      // Remove from UI
      const orderElement = document.getElementById(`order-${orderId}`);
      if (orderElement) {
        orderElement.style.transition = 'all 0.5s ease';
        orderElement.style.opacity = '0';
        orderElement.style.transform = 'translateX(-100%)';
        setTimeout(() => {
          orderElement.remove();
          showNotification('Order deleted successfully', 'success');
        }, 500);
      }
      
    } catch (error) {
      console.error('❌ Error deleting order:', error);
      showNotification('Error deleting order', 'error');
    }
  };
  
  window.deleteReviewWithConfirm = function(reviewId) {
    if (!confirm('⚠️ Are you sure you want to delete this review?\n\nThis action cannot be undone.')) {
      return;
    }
    
    console.log(`🗑️ Deleting review: ${reviewId}`);
    
    try {
      // Remove from storage
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      if (userData.reviews) {
        userData.reviews = userData.reviews.filter(review => review.id !== reviewId);
        localStorage.setItem(userKey, JSON.stringify(userData));
      }
      
      // Remove from UI
      const reviewElement = document.getElementById(`review-${reviewId}`);
      if (reviewElement) {
        reviewElement.style.transition = 'all 0.5s ease';
        reviewElement.style.opacity = '0';
        reviewElement.style.transform = 'translateX(-100%)';
        setTimeout(() => {
          reviewElement.remove();
          showNotification('Review deleted successfully', 'success');
        }, 500);
      }
      
    } catch (error) {
      console.error('❌ Error deleting review:', error);
      showNotification('Error deleting review', 'error');
    }
  };
  
  // FIXED closeOrderHistory function that properly resets state
  window.closeOrderHistory = function() {
    console.log('📋 Closing My Orders modal...');
    
    try {
      const modal = document.getElementById('orderHistoryModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
      
      // Reset modal state
      modalState.isOpen = false;
      modalState.isLoading = false;
      modalState.canOpen = true;
      
      console.log('✅ Modal closed and state reset');
      
    } catch (error) {
      console.error('��� Error closing modal:', error);
      // Force reset state even on error
      modalState.isOpen = false;
      modalState.isLoading = false;
      modalState.canOpen = true;
    }
  };
  
  // Helper functions
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
  
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white transition-all transform translate-x-full`;
    notification.style.backgroundColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
  
  // Initialize
  setTimeout(() => {
    ensureOrdersModalExists();
    console.log('✅ Orders modal reopen fix initialized');
  }, 100);
  
  console.log('✅ My Orders reopen fix applied successfully');
  console.log('🔄 Modal can now be opened multiple times without reload');
  
})();
