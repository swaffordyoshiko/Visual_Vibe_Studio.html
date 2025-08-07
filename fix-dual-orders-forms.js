// EMERGENCY FIX: Dual My Orders Forms Issue
console.log('🛠️ Loading emergency fix for dual My Orders forms...');

(function() {
  'use strict';
  
  // Flag to prevent multiple initializations
  if (window.dualOrdersFixed) {
    console.log('✅ Dual orders already fixed, skipping...');
    return;
  }
  
  window.dualOrdersFixed = true;
  console.log('🔧 Applying dual My Orders forms fix...');
  
  // Store original function if it exists
  const originalShowOrderHistory = window.showOrderHistory;
  
  // Override with unified implementation
  window.showOrderHistory = function() {
    console.log('📋 [EMERGENCY FIX] Opening unified My Orders...');
    
    try {
      // Clear any existing duplicate content first
      clearDuplicateOrderContent();
      
      const modal = document.getElementById('orderHistoryModal');
      const content = document.getElementById('orderHistoryContent');
      
      if (!modal || !content) {
        console.error('❌ Order modal elements not found');
        // Fallback to original function if available
        if (originalShowOrderHistory && typeof originalShowOrderHistory === 'function') {
          return originalShowOrderHistory();
        }
        return;
      }
      
      // Ensure modal is properly shown
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Clear any previous content to prevent duplication
      content.innerHTML = '';
      
      // Check authentication state
      if (!window.currentUser) {
        showSignInPrompt(content);
        return;
      }
      
      // Show loading state
      showLoadingState(content);
      
      // Load data after a short delay to prevent race conditions
      setTimeout(() => {
        loadUnifiedOrderData(content);
      }, 150);
      
    } catch (error) {
      console.error('❌ Error in emergency order fix:', error);
      // Try fallback to original function
      if (originalShowOrderHistory && typeof originalShowOrderHistory === 'function') {
        try {
          originalShowOrderHistory();
        } catch (fallbackError) {
          console.error('❌ Fallback also failed:', fallbackError);
          alert('Error loading orders. Please refresh the page.');
        }
      } else {
        alert('Error loading orders. Please refresh the page.');
      }
    }
  };
  
  function clearDuplicateOrderContent() {
    // Remove any duplicate modals or content
    const existingModals = document.querySelectorAll('[id="orderHistoryModal"]');
    if (existingModals.length > 1) {
      console.log('🧹 Removing duplicate order modals...');
      for (let i = 1; i < existingModals.length; i++) {
        existingModals[i].remove();
      }
    }
    
    // Clear any cached content that might cause conflicts
    const content = document.getElementById('orderHistoryContent');
    if (content && content.children.length > 1) {
      console.log('🧹 Clearing duplicate content...');
      content.innerHTML = '';
    }
  }
  
  function showSignInPrompt(content) {
    content.innerHTML = `
      <div class="text-center py-8">
        <div class="text-gray-400 text-6xl mb-4">🔐</div>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">Sign In Required</h3>
        <p class="text-gray-500 mb-4">Please sign in to view your orders and receipts.</p>
        <button onclick="closeOrderHistory(); openSignInModal();" 
                class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all">
          Sign In
        </button>
      </div>
    `;
  }
  
  function showLoadingState(content) {
    content.innerHTML = `
      <div class="text-center py-8">
        <div class="relative">
          <div class="animate-spin w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto mb-4"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-3 h-3 bg-indigo-600 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p class="text-gray-500">Loading your activity...</p>
      </div>
    `;
  }
  
  function loadUnifiedOrderData(content) {
    try {
      console.log('📊 Loading unified order data for:', window.currentUser?.name);
      
      // Get data from multiple storage locations
      const userKey = `user_${window.currentUser.email}`;
      const userData = JSON.parse(localStorage.getItem(userKey) || '{}');
      
      // Also check legacy storage
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const legacyUser = users.find(u => u.email === window.currentUser.email);
      
      // Combine data from all sources
      const reviews = [...(userData.reviews || []), ...(legacyUser?.reviews || [])];
      const orders = [...(userData.orders || []), ...(legacyUser?.orders || [])];
      const inquiries = [...(userData.inquiries || []), ...(legacyUser?.inquiries || [])];
      
      // Remove duplicates based on ID or content
      const uniqueReviews = removeDuplicates(reviews, 'id');
      const uniqueOrders = removeDuplicates(orders, 'orderNumber');
      const uniqueInquiries = removeDuplicates(inquiries, 'id');
      
      const totalItems = uniqueReviews.length + uniqueOrders.length + uniqueInquiries.length;
      
      if (totalItems === 0) {
        content.innerHTML = generateEmptyState();
      } else {
        content.innerHTML = generateUnifiedContent(uniqueOrders, uniqueReviews, uniqueInquiries);
      }
      
      console.log('✅ Unified order data loaded successfully');
      
    } catch (error) {
      console.error('❌ Error loading unified data:', error);
      content.innerHTML = `
        <div class="text-center py-8">
          <div class="text-red-400 text-4xl mb-4">⚠️</div>
          <p class="text-gray-500 mb-4">Error loading your data</p>
          <button onclick="location.reload()" 
                  class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
            Refresh Page
          </button>
        </div>
      `;
    }
  }
  
  function removeDuplicates(array, key) {
    const seen = new Set();
    return array.filter(item => {
      const identifier = item[key] || JSON.stringify(item);
      if (seen.has(identifier)) {
        return false;
      }
      seen.add(identifier);
      return true;
    });
  }
  
  function generateEmptyState() {
    return `
      <div class="text-center py-12">
        <div class="text-6xl mb-6">🎨</div>
        <h3 class="text-2xl font-bold text-gray-800 mb-3">Welcome to Visual Vibe Studio!</h3>
        <p class="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          Ready to bring your vision to life? Start your first project with our professional design services.
        </p>
        <div class="space-y-4">
          <button onclick="closeOrderHistory(); document.getElementById('services')?.scrollIntoView({behavior: 'smooth'});" 
                  class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg">
            Explore Services
          </button>
          <div class="text-sm text-gray-500">or</div>
          <button onclick="closeOrderHistory(); openContactModal?.();" 
                  class="text-indigo-600 hover:text-indigo-800 font-medium underline">
            Get a Custom Quote
          </button>
        </div>
      </div>
    `;
  }
  
  function generateUnifiedContent(orders, reviews, inquiries) {
    return `
      <div class="space-y-6">
        <!-- Activity Summary -->
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
          <h4 class="text-lg font-bold text-gray-800 mb-4">Your Activity Summary</h4>
          <div class="grid grid-cols-3 gap-4">
            <div class="text-center">
              <div class="text-3xl font-bold text-indigo-600">${orders.length}</div>
              <div class="text-sm text-gray-600">Orders</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-yellow-600">${reviews.length}</div>
              <div class="text-sm text-gray-600">Reviews</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-green-600">${inquiries.length}</div>
              <div class="text-sm text-gray-600">Inquiries</div>
            </div>
          </div>
        </div>

        ${orders.length > 0 ? generateOrdersSection(orders) : ''}
        ${reviews.length > 0 ? generateReviewsSection(reviews) : ''}
        ${inquiries.length > 0 ? generateInquiriesSection(inquiries) : ''}

        <!-- Quick Actions -->
        <div class="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
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
  
  function generateOrdersSection(orders) {
    const recentOrders = orders.slice(0, 5);
    return `
      <div class="bg-white border border-gray-200 rounded-xl p-6">
        <h4 class="font-bold text-gray-800 mb-4 flex items-center">
          <span class="text-xl mr-3">📦</span> 
          Recent Orders
          <span class="ml-2 bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full">${orders.length}</span>
        </h4>
        <div class="space-y-4">
          ${recentOrders.map(order => `
            <div class="border-l-4 border-indigo-400 bg-indigo-50 p-4 rounded-r-lg">
              <div class="flex justify-between items-start mb-2">
                <div class="font-semibold text-gray-800">
                  ${order.businessName || order.service || 'Design Project'}
                </div>
                <span class="text-sm font-medium px-2 py-1 rounded ${
                  order.status === 'completed' ? 'bg-green-100 text-green-700' :
                  order.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }">
                  ${order.status || 'Pending'}
                </span>
              </div>
              <div class="text-sm text-gray-600 mb-1">
                ${order.date || new Date(order.timestamp || Date.now()).toLocaleDateString()}
              </div>
              <div class="text-lg font-bold text-indigo-600">
                $${order.total || order.amount || 'Quote Required'}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  function generateReviewsSection(reviews) {
    const recentReviews = reviews.slice(0, 3);
    return `
      <div class="bg-white border border-gray-200 rounded-xl p-6">
        <h4 class="font-bold text-gray-800 mb-4 flex items-center">
          <span class="text-xl mr-3">⭐</span> 
          Your Reviews
          <span class="ml-2 bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">${reviews.length}</span>
        </h4>
        <div class="space-y-4">
          ${recentReviews.map(review => `
            <div class="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded-r-lg">
              <div class="text-yellow-600 text-lg mb-2">
                ${'★'.repeat(review.rating || 5)}${'☆'.repeat(5 - (review.rating || 5))}
              </div>
              <div class="text-gray-700 mb-2 italic">
                "${review.text || review.comment || 'Great service!'}"
              </div>
              <div class="text-xs text-gray-500">
                ${review.date || 'Recently'}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  function generateInquiriesSection(inquiries) {
    const recentInquiries = inquiries.slice(0, 3);
    return `
      <div class="bg-white border border-gray-200 rounded-xl p-6">
        <h4 class="font-bold text-gray-800 mb-4 flex items-center">
          <span class="text-xl mr-3">💬</span> 
          Recent Inquiries
          <span class="ml-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">${inquiries.length}</span>
        </h4>
        <div class="space-y-4">
          ${recentInquiries.map(inquiry => `
            <div class="border-l-4 border-green-400 bg-green-50 p-4 rounded-r-lg">
              <div class="font-semibold text-gray-800 mb-1">
                ${inquiry.subject || 'General Inquiry'}
              </div>
              <div class="text-gray-600 text-sm mb-2">
                ${(inquiry.message || inquiry.text || '').substring(0, 120)}${(inquiry.message || inquiry.text || '').length > 120 ? '...' : ''}
              </div>
              <div class="text-xs text-gray-500">
                ${inquiry.date || 'Recently'}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  // Ensure close function works properly
  if (!window.closeOrderHistory || window.closeOrderHistory.toString().includes('EMERGENCY')) {
    window.closeOrderHistory = function() {
      console.log('📋 [EMERGENCY FIX] Closing My Orders...');
      const modal = document.getElementById('orderHistoryModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    };
  }
  
  console.log('✅ Emergency dual orders fix applied successfully');
  
})();
