// Enhanced My Orders - Comprehensive customer activity tracking
console.log('📋 Loading enhanced My Orders functionality...');

function initializeEnhancedMyOrders() {
  console.log('🚀 Initializing enhanced My Orders system...');
  
  // Override and enhance order history functionality
  enhanceOrderHistorySystem();
  
  // Setup activity tracking
  setupActivityTracking();
  
  // Initialize data management
  initializeDataManagement();
  
  console.log('✅ Enhanced My Orders system initialized');
}

function enhanceOrderHistorySystem() {
  console.log('📝 Enhancing order history system...');
  
  // Override showOrderHistory with comprehensive functionality
  window.showOrderHistory = function() {
    console.log('📋 Opening comprehensive My Orders...');
    
    try {
      // Check authentication
      if (!window.currentUser) {
        if (window.toastManager) {
          window.toastManager.error('Please sign in to view your orders', { duration: 3000 });
        } else {
          alert('Please sign in to view your orders');
        }
        return;
      }
      
      // Create or show modal
      createEnhancedOrderModal();
      
      // Load comprehensive data
      loadComprehensiveOrderData();
      
    } catch (error) {
      console.error('❌ Error in enhanced showOrderHistory:', error);
      if (window.toastManager) {
        window.toastManager.error('Error loading your orders', { duration: 3000 });
      }
    }
  };
  
  // Enhanced close function
  window.closeOrderHistory = function() {
    console.log('📋 Closing enhanced My Orders...');
    
    const modal = document.getElementById('orderHistoryModal');
    if (modal) {
      modal.style.transition = 'all 0.3s ease';
      modal.style.opacity = '0';
      modal.style.transform = 'scale(0.95)';
      
      setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }, 300);
    }
  };
}

function createEnhancedOrderModal() {
  console.log('🏗️ Creating enhanced order modal...');
  
  try {
    // Remove existing modal
    const existingModal = document.getElementById('orderHistoryModal');
    if (existingModal) {
      existingModal.remove();
    }
    
    // Create enhanced modal
    const modal = document.createElement('div');
    modal.id = 'orderHistoryModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
      <div class="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl">
        <!-- Header -->
        <div class="flex justify-between items-center p-6 border-b border-gray-200 flex-shrink-0">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">My Account</h2>
            <p class="text-gray-600 text-sm">Orders, Reviews & Activity</p>
          </div>
          <button onclick="closeOrderHistory()" class="text-gray-500 hover:text-gray-700 p-2 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <!-- Tab Navigation -->
        <div class="flex border-b border-gray-200 px-6 flex-shrink-0">
          <button onclick="switchOrderTab('overview')" id="tab-overview" class="px-4 py-3 font-medium text-sm border-b-2 border-purple-500 text-purple-600">
            Overview
          </button>
          <button onclick="switchOrderTab('orders')" id="tab-orders" class="px-4 py-3 font-medium text-sm border-b-2 border-transparent text-gray-500 hover:text-gray-700">
            Orders
          </button>
          <button onclick="switchOrderTab('reviews')" id="tab-reviews" class="px-4 py-3 font-medium text-sm border-b-2 border-transparent text-gray-500 hover:text-gray-700">
            Reviews
          </button>
          <button onclick="switchOrderTab('inquiries')" id="tab-inquiries" class="px-4 py-3 font-medium text-sm border-b-2 border-transparent text-gray-500 hover:text-gray-700">
            Inquiries
          </button>
          <button onclick="switchOrderTab('activity')" id="tab-activity" class="px-4 py-3 font-medium text-sm border-b-2 border-transparent text-gray-500 hover:text-gray-700">
            Activity
          </button>
        </div>
        
        <!-- Content Area -->
        <div class="flex-1 overflow-y-auto p-6">
          <div id="orderTabContent">
            <div class="text-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p class="text-gray-500">Loading your account data...</p>
            </div>
          </div>
        </div>
        
        <!-- Footer Actions -->
        <div class="border-t border-gray-200 p-6 bg-gray-50 flex-shrink-0">
          <div class="flex flex-wrap gap-3 justify-center">
            <button onclick="newOrder()" class="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all flex items-center space-x-2">
              <span>➕</span>
              <span>New Order</span>
            </button>
            <button onclick="contactSupport()" class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all flex items-center space-x-2">
              <span>💬</span>
              <span>Contact Support</span>
            </button>
            <button onclick="downloadReceiptSummary()" class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all flex items-center space-x-2">
              <span>📄</span>
              <span>Download Summary</span>
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      modal.style.transition = 'all 0.3s ease';
      modal.style.opacity = '1';
      modal.style.transform = 'scale(1)';
    }, 10);
    
    console.log('✅ Enhanced order modal created');
  } catch (error) {
    console.error('❌ Error creating enhanced order modal:', error);
  }
}

function loadComprehensiveOrderData() {
  console.log('📊 Loading comprehensive order data...');
  
  try {
    // Get current user data
    if (!window.currentUser) return;
    
    // Load data from localStorage
    const allUsers = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    const currentUserData = allUsers.find(u => u.id === window.currentUser.id);
    
    const allOrders = JSON.parse(localStorage.getItem('visualVibeOrders') || '[]');
    const allContacts = JSON.parse(localStorage.getItem('visualVibeContacts') || '[]');
    const allReviews = JSON.parse(localStorage.getItem('visualVibeReviews') || '[]');
    const pendingOrders = JSON.parse(localStorage.getItem('pendingOrders') || '[]');
    
    // Filter data for current user
    const userOrders = [
      ...allOrders.filter(order => 
        order.userId === window.currentUser.id || 
        order.email === window.currentUser.email ||
        order.userEmail === window.currentUser.email
      ),
      ...pendingOrders.filter(order =>
        order.userId === window.currentUser.id ||
        order.email === window.currentUser.email ||
        order.userEmail === window.currentUser.email
      ),
      ...(currentUserData?.orders || [])
    ];
    
    const userContacts = allContacts.filter(contact =>
      contact.userId === window.currentUser.id ||
      contact.email === window.currentUser.email ||
      contact.userEmail === window.currentUser.email
    );
    
    const userReviews = allReviews.filter(review =>
      review.userId === window.currentUser.id ||
      review.email === window.currentUser.email ||
      review.userEmail === window.currentUser.email ||
      review.name === window.currentUser.name
    );
    
    // Store filtered data globally for tab switching
    window.currentUserData = {
      orders: userOrders,
      contacts: userContacts,
      reviews: userReviews,
      user: currentUserData
    };
    
    // Show overview tab by default
    switchOrderTab('overview');
    
    console.log(`✅ Loaded data: ${userOrders.length} orders, ${userContacts.length} contacts, ${userReviews.length} reviews`);
    
  } catch (error) {
    console.error('❌ Error loading comprehensive order data:', error);
    showErrorContent();
  }
}

function switchOrderTab(tabName) {
  console.log(`🔄 Switching to ${tabName} tab...`);
  
  try {
    // Update tab styling
    const tabs = ['overview', 'orders', 'reviews', 'inquiries', 'activity'];
    tabs.forEach(tab => {
      const tabButton = document.getElementById(`tab-${tab}`);
      if (tabButton) {
        if (tab === tabName) {
          tabButton.className = 'px-4 py-3 font-medium text-sm border-b-2 border-purple-500 text-purple-600';
        } else {
          tabButton.className = 'px-4 py-3 font-medium text-sm border-b-2 border-transparent text-gray-500 hover:text-gray-700';
        }
      }
    });
    
    // Load content for the selected tab
    const contentArea = document.getElementById('orderTabContent');
    if (!contentArea) return;
    
    switch (tabName) {
      case 'overview':
        loadOverviewContent(contentArea);
        break;
      case 'orders':
        loadOrdersContent(contentArea);
        break;
      case 'reviews':
        loadReviewsContent(contentArea);
        break;
      case 'inquiries':
        loadInquiriesContent(contentArea);
        break;
      case 'activity':
        loadActivityContent(contentArea);
        break;
      default:
        contentArea.innerHTML = '<p class="text-center text-gray-500 py-8">Tab not found</p>';
    }
    
  } catch (error) {
    console.error(`❌ Error switching to ${tabName} tab:`, error);
  }
}

function loadOverviewContent(contentArea) {
  const data = window.currentUserData || { orders: [], contacts: [], reviews: [] };
  
  contentArea.innerHTML = `
    <div class="space-y-6">
      <!-- Account Summary -->
      <div class="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Account Summary</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-600">${data.orders.length}</div>
            <div class="text-sm text-gray-600">Total Orders</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600">${data.contacts.length}</div>
            <div class="text-sm text-gray-600">Inquiries</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600">${data.reviews.length}</div>
            <div class="text-sm text-gray-600">Reviews</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-orange-600">${getActiveOrdersCount(data.orders)}</div>
            <div class="text-sm text-gray-600">Active</div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div>
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div class="space-y-3">
          ${getRecentActivity(data).map(activity => `
            <div class="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg">
              <div class="text-2xl">${activity.icon}</div>
              <div class="flex-1">
                <p class="font-medium text-gray-900">${activity.title}</p>
                <p class="text-sm text-gray-500">${activity.description}</p>
              </div>
              <div class="text-xs text-gray-400">${activity.date}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button onclick="newOrder()" class="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-left">
          <div class="text-2xl mb-2">🛒</div>
          <h4 class="font-semibold text-gray-800">Place New Order</h4>
          <p class="text-sm text-gray-600">Start a new project with us</p>
        </button>
        
        <button onclick="switchOrderTab('inquiries')" class="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-left">
          <div class="text-2xl mb-2">💬</div>
          <h4 class="font-semibold text-gray-800">Send Inquiry</h4>
          <p class="text-sm text-gray-600">Ask questions or get quotes</p>
        </button>
        
        <button onclick="switchOrderTab('reviews')" class="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-left">
          <div class="text-2xl mb-2">⭐</div>
          <h4 class="font-semibold text-gray-800">Leave Review</h4>
          <p class="text-sm text-gray-600">Share your experience</p>
        </button>
      </div>
    </div>
  `;
}

function loadOrdersContent(contentArea) {
  const orders = window.currentUserData?.orders || [];
  
  if (orders.length === 0) {
    contentArea.innerHTML = `
      <div class="text-center py-12">
        <div class="text-6xl mb-4">📦</div>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">No Orders Yet</h3>
        <p class="text-gray-500 mb-6">You haven't placed any orders yet. Start your first project!</p>
        <button onclick="newOrder()" class="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
          Place Your First Order
        </button>
      </div>
    `;
    return;
  }
  
  contentArea.innerHTML = `
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold text-gray-800">Your Orders (${orders.length})</h3>
        <button onclick="newOrder()" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
          + New Order
        </button>
      </div>
      
      <div class="space-y-3">
        ${orders.map((order, index) => `
          <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start mb-3">
              <div>
                <h4 class="font-semibold text-gray-900">Order #${order.id || `ORD-${index + 1}`}</h4>
                <p class="text-gray-600">${order.service || order.projectType || order.services?.join(', ') || 'Custom Service'}</p>
              </div>
              <span class="text-xs text-gray-500">${formatDate(order.date || order.timestamp || order.createdAt)}</span>
            </div>
            
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status || 'pending')}">
                  ${order.status || 'Pending Review'}
                </span>
                ${order.priority ? `<span class="text-xs text-orange-600 font-medium">Priority</span>` : ''}
              </div>
              <div class="flex items-center space-x-2">
                <span class="font-semibold text-purple-600">${order.amount || order.total || 'Quote Pending'}</span>
                <button onclick="viewOrderDetails('${order.id || index}')" class="text-blue-600 hover:text-blue-800 text-sm">
                  View Details
                </button>
              </div>
            </div>
            
            ${order.tracking ? `
              <div class="mt-3 pt-3 border-t border-gray-100">
                <p class="text-xs text-gray-600">Tracking: ${order.tracking}</p>
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function loadReviewsContent(contentArea) {
  const reviews = window.currentUserData?.reviews || [];
  
  contentArea.innerHTML = `
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold text-gray-800">Your Reviews (${reviews.length})</h3>
        <button onclick="leaveNewReview()" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
          + Leave Review
        </button>
      </div>
      
      ${reviews.length === 0 ? `
        <div class="text-center py-12">
          <div class="text-6xl mb-4">⭐</div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">No Reviews Yet</h3>
          <p class="text-gray-500 mb-6">Share your experience with other customers!</p>
          <button onclick="leaveNewReview()" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all">
            Write Your First Review
          </button>
        </div>
      ` : `
        <div class="space-y-3">
          ${reviews.map((review, index) => `
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex justify-between items-start mb-3">
                <div>
                  <div class="text-yellow-400 text-lg">${'⭐'.repeat(review.rating || 5)}</div>
                  <p class="text-sm text-gray-500 mt-1">${formatDate(review.date || review.timestamp)}</p>
                </div>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Published
                </span>
              </div>
              <p class="text-gray-700 mb-3">${review.text || review.message || review.review}</p>
              ${review.service ? `<p class="text-xs text-gray-500">Service: ${review.service}</p>` : ''}
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

function loadInquiriesContent(contentArea) {
  const contacts = window.currentUserData?.contacts || [];
  
  contentArea.innerHTML = `
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold text-gray-800">Your Inquiries (${contacts.length})</h3>
        <button onclick="sendNewInquiry()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
          + New Inquiry
        </button>
      </div>
      
      ${contacts.length === 0 ? `
        <div class="text-center py-12">
          <div class="text-6xl mb-4">💬</div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">No Inquiries Yet</h3>
          <p class="text-gray-500 mb-6">Have questions? We're here to help!</p>
          <button onclick="sendNewInquiry()" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all">
            Send Your First Inquiry
          </button>
        </div>
      ` : `
        <div class="space-y-3">
          ${contacts.map((contact, index) => `
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h4 class="font-semibold text-gray-900">${contact.subject || 'General Inquiry'}</h4>
                  <p class="text-sm text-gray-500">${formatDate(contact.date || contact.timestamp)}</p>
                </div>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${contact.responded ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                  ${contact.responded ? 'Responded' : 'Pending Response'}
                </span>
              </div>
              <p class="text-gray-700 text-sm">${contact.message || contact.text}</p>
              ${contact.response ? `
                <div class="mt-3 pt-3 border-t border-gray-100">
                  <p class="text-sm text-gray-600"><strong>Response:</strong> ${contact.response}</p>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

function loadActivityContent(contentArea) {
  const data = window.currentUserData || { orders: [], contacts: [], reviews: [] };
  const allActivity = getAllActivity(data);
  
  contentArea.innerHTML = `
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-800">Activity Timeline</h3>
      
      ${allActivity.length === 0 ? `
        <div class="text-center py-12">
          <div class="text-6xl mb-4">📈</div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">No Activity Yet</h3>
          <p class="text-gray-500">Your activity will appear here as you interact with our services.</p>
        </div>
      ` : `
        <div class="space-y-3">
          ${allActivity.map(activity => `
            <div class="flex items-start space-x-4 p-4 bg-white border border-gray-200 rounded-lg">
              <div class="text-2xl">${activity.icon}</div>
              <div class="flex-1">
                <p class="font-medium text-gray-900">${activity.title}</p>
                <p class="text-sm text-gray-600">${activity.description}</p>
                <p class="text-xs text-gray-400 mt-1">${activity.date}</p>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

// Utility functions
function getActiveOrdersCount(orders) {
  return orders.filter(order => {
    const status = (order.status || 'pending').toLowerCase();
    return !['completed', 'delivered', 'cancelled'].includes(status);
  }).length;
}

function getRecentActivity(data) {
  const activities = [];
  
  // Recent orders
  data.orders.slice(0, 3).forEach(order => {
    activities.push({
      icon: '📦',
      title: 'Order Placed',
      description: order.service || order.projectType || 'Custom Service',
      date: formatDate(order.date || order.timestamp),
      timestamp: new Date(order.date || order.timestamp || Date.now()).getTime()
    });
  });
  
  // Recent reviews
  data.reviews.slice(0, 2).forEach(review => {
    activities.push({
      icon: '⭐',
      title: 'Review Posted',
      description: `${review.rating || 5} star review`,
      date: formatDate(review.date || review.timestamp),
      timestamp: new Date(review.date || review.timestamp || Date.now()).getTime()
    });
  });
  
  // Recent contacts
  data.contacts.slice(0, 2).forEach(contact => {
    activities.push({
      icon: '💬',
      title: 'Inquiry Sent',
      description: contact.subject || 'General inquiry',
      date: formatDate(contact.date || contact.timestamp),
      timestamp: new Date(contact.date || contact.timestamp || Date.now()).getTime()
    });
  });
  
  // Sort by timestamp and return most recent
  return activities
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 5);
}

function getAllActivity(data) {
  const activities = [];
  
  // Add all orders
  data.orders.forEach(order => {
    activities.push({
      icon: '📦',
      title: 'Order Placed',
      description: `${order.service || order.projectType || 'Custom Service'} - ${order.status || 'Pending'}`,
      date: formatDate(order.date || order.timestamp),
      timestamp: new Date(order.date || order.timestamp || Date.now()).getTime()
    });
  });
  
  // Add all reviews
  data.reviews.forEach(review => {
    activities.push({
      icon: '⭐',
      title: 'Review Posted',
      description: `${review.rating || 5} star review${review.service ? ' for ' + review.service : ''}`,
      date: formatDate(review.date || review.timestamp),
      timestamp: new Date(review.date || review.timestamp || Date.now()).getTime()
    });
  });
  
  // Add all contacts
  data.contacts.forEach(contact => {
    activities.push({
      icon: '💬',
      title: 'Inquiry Sent',
      description: contact.subject || contact.message?.substring(0, 50) + '...' || 'General inquiry',
      date: formatDate(contact.date || contact.timestamp),
      timestamp: new Date(contact.date || contact.timestamp || Date.now()).getTime()
    });
  });
  
  // Sort by timestamp (newest first)
  return activities.sort((a, b) => b.timestamp - a.timestamp);
}

function formatDate(dateString) {
  if (!dateString) return 'Recent';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    
    return date.toLocaleDateString();
  } catch (error) {
    return 'Recent';
  }
}

function getStatusColor(status) {
  const statusLower = status.toLowerCase();
  switch (statusLower) {
    case 'completed':
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'in progress':
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function showErrorContent() {
  const contentArea = document.getElementById('orderTabContent');
  if (contentArea) {
    contentArea.innerHTML = `
      <div class="text-center py-12">
        <div class="text-6xl mb-4">❌</div>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">Error Loading Data</h3>
        <p class="text-gray-500 mb-6">We couldn't load your account information. Please try again.</p>
        <button onclick="loadComprehensiveOrderData()" class="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-all">
          Retry
        </button>
      </div>
    `;
  }
}

// Action functions
function newOrder() {
  closeOrderHistory();
  setTimeout(() => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  }, 300);
}

function contactSupport() {
  closeOrderHistory();
  setTimeout(() => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  }, 300);
}

function leaveNewReview() {
  closeOrderHistory();
  setTimeout(() => {
    const reviewForm = document.querySelector('#reviewForm');
    if (reviewForm) {
      reviewForm.scrollIntoView({ behavior: 'smooth' });
    }
  }, 300);
}

function sendNewInquiry() {
  newOrder(); // Same as new order for now
}

function downloadReceiptSummary() {
  const data = window.currentUserData;
  if (!data) return;
  
  const summaryData = {
    user: window.currentUser.name,
    email: window.currentUser.email,
    generated: new Date().toISOString(),
    orders: data.orders.length,
    reviews: data.reviews.length,
    inquiries: data.contacts.length,
    details: {
      orders: data.orders,
      reviews: data.reviews,
      contacts: data.contacts
    }
  };
  
  const blob = new Blob([JSON.stringify(summaryData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `account-summary-${window.currentUser.name.replace(/\s+/g, '-').toLowerCase()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  if (window.toastManager) {
    window.toastManager.success('Account summary downloaded!', { duration: 3000 });
  }
}

function viewOrderDetails(orderId) {
  const orders = window.currentUserData?.orders || [];
  const order = orders.find(o => o.id === orderId) || orders[parseInt(orderId)];
  
  if (!order) return;
  
  const detailsHTML = `
    <div class="bg-white p-6 rounded-lg max-w-md mx-auto">
      <h3 class="text-lg font-semibold mb-4">Order Details</h3>
      <div class="space-y-2 text-sm">
        <p><strong>Order ID:</strong> ${order.id || 'N/A'}</p>
        <p><strong>Service:</strong> ${order.service || order.projectType || 'Custom Service'}</p>
        <p><strong>Status:</strong> ${order.status || 'Pending'}</p>
        <p><strong>Date:</strong> ${formatDate(order.date || order.timestamp)}</p>
        <p><strong>Amount:</strong> ${order.amount || order.total || 'Quote Pending'}</p>
        ${order.description ? `<p><strong>Description:</strong> ${order.description}</p>` : ''}
      </div>
      <button onclick="this.closest('.fixed').remove()" class="mt-4 w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300">
        Close
      </button>
    </div>
  `;
  
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4';
  modal.innerHTML = detailsHTML;
  document.body.appendChild(modal);
}

// Activity tracking setup
function setupActivityTracking() {
  console.log('📊 Setting up activity tracking...');
  
  // Track when orders are placed
  const originalSubmitOrder = window.submitOrder;
  if (typeof originalSubmitOrder === 'function') {
    window.submitOrder = function(...args) {
      const result = originalSubmitOrder.apply(this, args);
      updateUserActivity('order_placed');
      return result;
    };
  }
  
  // Track when reviews are submitted
  const originalSubmitReview = window.submitReview;
  if (typeof originalSubmitReview === 'function') {
    window.submitReview = function(...args) {
      const result = originalSubmitReview.apply(this, args);
      updateUserActivity('review_submitted');
      return result;
    };
  }
}

function updateUserActivity(activityType) {
  try {
    if (!window.currentUser) return;
    
    const activity = {
      type: activityType,
      timestamp: new Date().toISOString(),
      userId: window.currentUser.id
    };
    
    const activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
    activities.push(activity);
    
    // Keep only last 100 activities
    if (activities.length > 100) {
      activities.splice(0, activities.length - 100);
    }
    
    localStorage.setItem('userActivities', JSON.stringify(activities));
  } catch (error) {
    console.error('❌ Error tracking user activity:', error);
  }
}

function initializeDataManagement() {
  console.log('💾 Initializing data management...');
  
  // Ensure user data is properly associated
  window.associateDataWithUser = function() {
    if (!window.currentUser) return;
    
    // Update orders with user ID
    const orders = JSON.parse(localStorage.getItem('visualVibeOrders') || '[]');
    let updated = false;
    
    orders.forEach(order => {
      if (order.email === window.currentUser.email && !order.userId) {
        order.userId = window.currentUser.id;
        updated = true;
      }
    });
    
    if (updated) {
      localStorage.setItem('visualVibeOrders', JSON.stringify(orders));
    }
  };
  
  // Call association on initialization
  if (window.currentUser) {
    window.associateDataWithUser();
  }
}

// Make functions globally available
window.switchOrderTab = switchOrderTab;
window.loadComprehensiveOrderData = loadComprehensiveOrderData;
window.newOrder = newOrder;
window.contactSupport = contactSupport;
window.leaveNewReview = leaveNewReview;
window.sendNewInquiry = sendNewInquiry;
window.downloadReceiptSummary = downloadReceiptSummary;
window.viewOrderDetails = viewOrderDetails;

// Test function
window.testEnhancedMyOrders = function() {
  console.log('🧪 Testing enhanced My Orders...');
  
  if (window.currentUser) {
    window.showOrderHistory();
  } else {
    console.log('No current user - cannot test');
  }
};

// Initialize when DOM is ready
function initialize() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEnhancedMyOrders);
  } else {
    initializeEnhancedMyOrders();
  }
}

// Initialize with delay to ensure other scripts load first
setTimeout(initialize, 3500);

console.log('📋 Enhanced My Orders functionality loaded');
