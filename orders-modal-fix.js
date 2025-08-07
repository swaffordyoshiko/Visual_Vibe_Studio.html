// MY ORDERS MODAL FIX - Ensures modal elements exist and work properly
console.log('📋 Loading My Orders modal fix...');

(function() {
  'use strict';
  
  // Prevent multiple loads
  if (window.ordersModalFix) {
    return;
  }
  window.ordersModalFix = true;
  
  console.log('🛠️ Applying My Orders modal fix...');
  
  // Ensure order history modal exists
  function ensureOrderHistoryModal() {
    let modal = document.getElementById('orderHistoryModal');
    if (!modal) {
      console.log('⚠️ Order history modal not found, creating it...');
      
      modal = document.createElement('div');
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
      console.log('✅ Order history modal created successfully');
    }
    return modal;
  }
  
  // Fixed showOrderHistory function
  window.showOrderHistory = function() {
    console.log('📋 Opening My Orders with both orders AND reviews...');
    
    // Ensure modal exists
    const modal = ensureOrderHistoryModal();
    const content = document.getElementById('orderHistoryContent');
    
    if (!content) {
      alert('Orders content not available. Please refresh the page.');
      return;
    }
    
    // Show modal
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Clear content first
    content.innerHTML = '';
    
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
      return;
    }
    
    // Get data from ALL storage locations
    const userKey = `user_${window.currentUser.email}`;
    const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
    const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    const legacyUser = users.find(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
    
    // Combine and deduplicate data
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
    
    console.log(`📊 Displaying ${orders.length} orders and ${reviews.length} reviews`);
    
    if (orders.length === 0 && reviews.length === 0) {
      content.innerHTML = `
        <div class="text-center py-16">
          <div class="text-6xl mb-8">🎨</div>
          <h3 class="text-2xl font-bold text-gray-800 mb-4">No Orders or Reviews Yet</h3>
          <p class="text-gray-600 mb-8 max-w-md mx-auto">
            Start your first project with us or leave a review about our services!
          </p>
          <button onclick="closeOrderHistory();" 
                  class="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700">
            Browse Services
          </button>
        </div>
      `;
      return;
    }
    
    // Generate unified display with BOTH orders AND reviews
    let html = `
      <div class="space-y-8">
        <!-- Summary Header -->
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
          <h3 class="text-2xl font-bold text-gray-800 mb-6">Your Complete Activity</h3>
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
    
    // ORDERS SECTION
    if (orders.length > 0) {
      html += `
        <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
          <div class="bg-indigo-50 p-6 border-b border-indigo-100">
            <h4 class="text-xl font-bold text-gray-800 flex items-center">
              📦 Your Orders (${orders.length})
            </h4>
            <p class="text-gray-600 mt-2">Track and manage your project orders</p>
          </div>
          <div class="divide-y divide-gray-100">
      `;
      
      orders.forEach(order => {
        const orderId = order.id || `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        html += `
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
                    <span class="px-2 py-1 rounded text-xs ${getStatusClass(order.status)}">
                      ${(order.status || 'pending').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span class="font-medium">Total:</span> 
                    <span class="text-lg font-bold text-indigo-600">$${order.total || order.amount || 'TBD'}</span>
                  </div>
                </div>
              </div>
              <button onclick="actuallyDeleteOrder('${orderId}')" 
                      class="ml-6 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 px-4 py-2 rounded-lg transition-colors border border-red-200 flex items-center gap-2 font-medium">
                🗑️ Delete
              </button>
            </div>
          </div>
        `;
      });
      
      html += `
          </div>
        </div>
      `;
    }
    
    // REVIEWS SECTION
    if (reviews.length > 0) {
      html += `
        <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
          <div class="bg-yellow-50 p-6 border-b border-yellow-100">
            <h4 class="text-xl font-bold text-gray-800 flex items-center">
              ⭐ Your Reviews (${reviews.length})
            </h4>
            <p class="text-gray-600 mt-2">Your feedback and testimonials</p>
          </div>
          <div class="divide-y divide-gray-100">
      `;
      
      reviews.forEach(review => {
        const reviewId = review.id || `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const rating = review.rating || 5;
        const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
        
        html += `
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
              <button onclick="actuallyDeleteReview('${reviewId}')" 
                      class="ml-6 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 px-4 py-2 rounded-lg transition-colors border border-red-200 flex items-center gap-2 font-medium">
                🗑️ Delete
              </button>
            </div>
          </div>
        `;
      });
      
      html += `
          </div>
        </div>
      `;
    }
    
    html += `
      </div>
    `;
    
    content.innerHTML = html;
  };
  
  // Helper functions
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
  
  function getStatusClass(status) {
    const statusMap = {
      completed: 'bg-green-100 text-green-700',
      'in-progress': 'bg-blue-100 text-blue-700',
      pending: 'bg-yellow-100 text-yellow-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return statusMap[status] || statusMap.pending;
  }
  
  // Working delete functions
  window.actuallyDeleteOrder = function(orderId) {
    if (!confirm('⚠️ Are you sure you want to permanently delete this order?\n\nThis action cannot be undone.')) {
      return;
    }
    
    console.log(`🗑️ ACTUALLY deleting order: ${orderId}`);
    
    try {
      let deletedCount = 0;
      
      // Remove from user storage
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      if (userData.orders) {
        const beforeLength = userData.orders.length;
        userData.orders = userData.orders.filter(order => order.id !== orderId);
        if (userData.orders.length < beforeLength) {
          localStorage.setItem(userKey, JSON.stringify(userData));
          deletedCount++;
        }
      }
      
      // Remove from legacy storage
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
      if (userIndex !== -1 && users[userIndex].orders) {
        const beforeLength = users[userIndex].orders.length;
        users[userIndex].orders = users[userIndex].orders.filter(order => order.id !== orderId);
        if (users[userIndex].orders.length < beforeLength) {
          localStorage.setItem('visualVibeUsers', JSON.stringify(users));
          deletedCount++;
        }
      }
      
      // Remove from UI immediately
      const orderElement = document.getElementById(`order-${orderId}`);
      if (orderElement) {
        orderElement.style.transition = 'all 0.5s ease';
        orderElement.style.opacity = '0';
        orderElement.style.backgroundColor = '#fee2e2';
        orderElement.style.transform = 'translateX(-100%)';
        
        setTimeout(() => {
          orderElement.remove();
        }, 500);
      }
      
      if (deletedCount > 0) {
        showNotification('✅ Order permanently deleted!');
        console.log('✅ Order ACTUALLY deleted from storage');
      } else {
        showNotification('⚠️ Order not found in storage');
      }
      
    } catch (error) {
      console.error('❌ Error deleting order:', error);
      showNotification('❌ Error deleting order. Please try again.');
    }
  };
  
  window.actuallyDeleteReview = function(reviewId) {
    if (!confirm('⚠️ Are you sure you want to permanently delete this review?\n\nThis action cannot be undone.')) {
      return;
    }
    
    console.log(`🗑️ ACTUALLY deleting review: ${reviewId}`);
    
    try {
      let deletedCount = 0;
      
      // Remove from user storage
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      if (userData.reviews) {
        const beforeLength = userData.reviews.length;
        userData.reviews = userData.reviews.filter(review => review.id !== reviewId);
        if (userData.reviews.length < beforeLength) {
          localStorage.setItem(userKey, JSON.stringify(userData));
          deletedCount++;
        }
      }
      
      // Remove from legacy storage
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.email === window.currentUser.email || u.id === window.currentUser.id);
      if (userIndex !== -1 && users[userIndex].reviews) {
        const beforeLength = users[userIndex].reviews.length;
        users[userIndex].reviews = users[userIndex].reviews.filter(review => review.id !== reviewId);
        if (users[userIndex].reviews.length < beforeLength) {
          localStorage.setItem('visualVibeUsers', JSON.stringify(users));
          deletedCount++;
        }
      }
      
      // Remove from UI immediately
      const reviewElement = document.getElementById(`review-${reviewId}`);
      if (reviewElement) {
        reviewElement.style.transition = 'all 0.5s ease';
        reviewElement.style.opacity = '0';
        reviewElement.style.backgroundColor = '#fee2e2';
        reviewElement.style.transform = 'translateX(-100%)';
        
        setTimeout(() => {
          reviewElement.remove();
        }, 500);
      }
      
      if (deletedCount > 0) {
        showNotification('✅ Review permanently deleted!');
        console.log('✅ Review ACTUALLY deleted from storage');
      } else {
        showNotification('⚠️ Review not found in storage');
      }
      
    } catch (error) {
      console.error('❌ Error deleting review:', error);
      showNotification('❌ Error deleting review. Please try again.');
    }
  };
  
  // Close orders modal
  window.closeOrderHistory = function() {
    const modal = document.getElementById('orderHistoryModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  };
  
  // Simple notification system
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white transition-all transform translate-x-full';
    notification.style.backgroundColor = message.includes('✅') ? '#10b981' : message.includes('⚠️') ? '#f59e0b' : '#ef4444';
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
  
  // Initialize on load
  setTimeout(() => {
    ensureOrderHistoryModal();
  }, 100);
  
  console.log('✅ My Orders modal fix applied successfully');
  console.log('📋 Modal and content elements ensured');
  console.log('🗑️ Working delete functions restored');
  
})();
