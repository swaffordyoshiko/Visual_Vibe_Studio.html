// UNIFIED MY ORDERS SOLUTION - Prevents dual forms on refresh
console.log('🔧 Loading unified My Orders solution...');

(function() {
  'use strict';
  
  // Prevent multiple initializations
  if (window.myOrdersUnified) {
    console.log('⚠️ My Orders already unified, skipping...');
    return;
  }
  window.myOrdersUnified = true;
  
  // Clear any existing conflicting implementations
  if (window.showOrderHistory && window.showOrderHistory.toString().includes('UNIFIED')) {
    return; // Already our implementation
  }
  
  console.log('🧹 Cleaning up conflicting My Orders implementations...');
  
  // Single source of truth for showOrderHistory
  window.showOrderHistory = function() {
    console.log('📋 [UNIFIED] Opening My Orders...');
    
    try {
      // Get modal elements (from existing HTML)
      const modal = document.getElementById('orderHistoryModal');
      const content = document.getElementById('orderHistoryContent');
      
      if (!modal || !content) {
        console.error('❌ Order history modal elements not found');
        return;
      }
      
      // Show modal
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      
      // Check authentication
      if (!window.currentUser) {
        content.innerHTML = `
          <div class="text-center py-8">
            <div class="text-gray-400 text-6xl mb-4">📋</div>
            <p class="text-gray-500 mb-4">Please sign in to view your orders and receipts.</p>
            <button onclick="closeOrderHistory(); openSignInModal();" 
                    class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Sign In
            </button>
          </div>
        `;
        return;
      }
      
      // Show loading state
      content.innerHTML = `
        <div class="text-center py-8">
          <div class="animate-spin w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto mb-4"></div>
          <p class="text-gray-500">Loading your orders...</p>
        </div>
      `;
      
      // Load user's orders and data
      setTimeout(() => loadOrderContent(), 100);
      
    } catch (error) {
      console.error('❌ Error in unified showOrderHistory:', error);
      if (window.toastManager && window.toastManager.error) {
        window.toastManager.error('Error loading orders', { duration: 3000 });
      }
    }
  };
  
  function loadOrderContent() {
    const content = document.getElementById('orderHistoryContent');
    if (!content || !window.currentUser) return;
    
    console.log('📦 Loading order content for:', window.currentUser.name);
    
    // Get user data from localStorage
    const userKey = `user_${window.currentUser.email}`;
    const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
    const reviews = userData.reviews || [];
    const orders = userData.orders || [];
    const inquiries = userData.inquiries || [];
    
    // Generate unified content
    content.innerHTML = generateOrderContent(reviews, orders, inquiries);
  }
  
  function generateOrderContent(reviews, orders, inquiries) {
    const totalItems = reviews.length + orders.length + inquiries.length;
    
    if (totalItems === 0) {
      return `
        <div class="text-center py-12">
          <div class="text-6xl mb-4">🎨</div>
          <h3 class="text-xl font-semibold text-gray-700 mb-3">Ready to Start Your First Project?</h3>
          <p class="text-gray-500 mb-6 max-w-md mx-auto">
            No orders yet! Let's create something amazing together. Our professional design services are ready to bring your vision to life.
          </p>
          <div class="space-y-3">
            <button onclick="closeOrderHistory(); scrollToSection('services')" 
                    class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors block mx-auto">
              Browse Services
            </button>
            <button onclick="closeOrderHistory(); openContactModal()" 
                    class="text-indigo-600 hover:text-indigo-800 font-medium">
              Contact Us
            </button>
          </div>
        </div>
      `;
    }
    
    let html = `
      <div class="space-y-6">
        <!-- Summary Stats -->
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div class="text-center bg-gray-50 rounded-lg p-4">
            <div class="text-2xl font-bold text-indigo-600">${orders.length}</div>
            <div class="text-sm text-gray-500">Orders</div>
          </div>
          <div class="text-center bg-gray-50 rounded-lg p-4">
            <div class="text-2xl font-bold text-green-600">${reviews.length}</div>
            <div class="text-sm text-gray-500">Reviews</div>
          </div>
          <div class="text-center bg-gray-50 rounded-lg p-4">
            <div class="text-2xl font-bold text-purple-600">${inquiries.length}</div>
            <div class="text-sm text-gray-500">Inquiries</div>
          </div>
        </div>
    `;
    
    // Add orders section
    if (orders.length > 0) {
      html += `
        <div class="bg-white border rounded-lg p-4">
          <h4 class="font-semibold text-gray-800 mb-3 flex items-center">
            <span class="text-lg mr-2">📦</span> Recent Orders
          </h4>
          <div class="space-y-3">
      `;
      
      orders.slice(0, 5).forEach(order => {
        html += `
          <div class="border-l-4 border-indigo-400 pl-4 py-2 bg-indigo-50">
            <div class="font-medium text-gray-800">${order.service || 'Design Service'}</div>
            <div class="text-sm text-gray-600">${order.date || 'Date not available'}</div>
            <div class="text-sm text-indigo-600 font-medium">$${order.amount || 'TBD'}</div>
          </div>
        `;
      });
      
      html += `
          </div>
        </div>
      `;
    }
    
    // Add reviews section
    if (reviews.length > 0) {
      html += `
        <div class="bg-white border rounded-lg p-4">
          <h4 class="font-semibold text-gray-800 mb-3 flex items-center">
            <span class="text-lg mr-2">⭐</span> Your Reviews
          </h4>
          <div class="space-y-3">
      `;
      
      reviews.slice(0, 3).forEach(review => {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        html += `
          <div class="border-l-4 border-yellow-400 pl-4 py-2 bg-yellow-50">
            <div class="text-yellow-600 mb-1">${stars}</div>
            <div class="text-sm text-gray-700">"${review.text}"</div>
            <div class="text-xs text-gray-500 mt-1">${review.date}</div>
          </div>
        `;
      });
      
      html += `
          </div>
        </div>
      `;
    }
    
    // Add inquiries section  
    if (inquiries.length > 0) {
      html += `
        <div class="bg-white border rounded-lg p-4">
          <h4 class="font-semibold text-gray-800 mb-3 flex items-center">
            <span class="text-lg mr-2">💬</span> Recent Inquiries
          </h4>
          <div class="space-y-3">
      `;
      
      inquiries.slice(0, 3).forEach(inquiry => {
        html += `
          <div class="border-l-4 border-green-400 pl-4 py-2 bg-green-50">
            <div class="font-medium text-gray-800">${inquiry.subject || 'General Inquiry'}</div>
            <div class="text-sm text-gray-600">${inquiry.message.substring(0, 100)}${inquiry.message.length > 100 ? '...' : ''}</div>
            <div class="text-xs text-gray-500 mt-1">${inquiry.date}</div>
          </div>
        `;
      });
      
      html += `
          </div>
        </div>
      `;
    }
    
    html += `
        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-3 pt-4 border-t">
          <button onclick="closeOrderHistory(); scrollToSection('services')" 
                  class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            New Order
          </button>
          <button onclick="closeOrderHistory(); openContactModal()" 
                  class="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    `;
    
    return html;
  }
  
  // Ensure closeOrderHistory function exists
  if (!window.closeOrderHistory) {
    window.closeOrderHistory = function() {
      const modal = document.getElementById('orderHistoryModal');
      if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    };
  }
  
  console.log('✅ Unified My Orders solution loaded successfully');
  
})();
