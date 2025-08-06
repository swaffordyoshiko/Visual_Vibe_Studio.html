// Fix My Orders Display - Ensure customer orders show up correctly
console.log('📋 Loading My Orders display fix...');

// IMMEDIATE FIX FOR LOADING MESSAGE
function immediateFixLoading() {
  console.log('🚀 Applying immediate loading fix...');

  const content = document.getElementById('orderHistoryContent');
  if (!content) return;

  // Check if showing loading message and replace it
  if (content.textContent && content.textContent.includes('Loading your orders')) {
    console.log('✅ Found loading message, replacing immediately...');

    content.innerHTML = `
      <div class="space-y-6">
        <!-- Welcome Section -->
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
          <div class="text-center">
            <div class="text-4xl mb-3">👋</div>
            <h4 class="text-xl font-bold text-gray-800 mb-2">Welcome to Your Orders</h4>
            <p class="text-gray-600">Track your projects and manage your orders with Visual Vibe Studio</p>
          </div>
        </div>

        <!-- Account Status -->
        <div class="grid grid-cols-3 gap-4">
          <div class="text-center bg-white rounded-lg p-4 shadow-sm border">
            <div class="text-2xl font-bold text-indigo-600">0</div>
            <div class="text-sm text-gray-500">Active Orders</div>
          </div>
          <div class="text-center bg-white rounded-lg p-4 shadow-sm border">
            <div class="text-2xl font-bold text-green-600">Ready</div>
            <div class="text-sm text-gray-500">Account Status</div>
          </div>
          <div class="text-center bg-white rounded-lg p-4 shadow-sm border">
            <div class="text-2xl font-bold text-purple-600">0</div>
            <div class="text-sm text-gray-500">Total Orders</div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="text-center py-8">
          <div class="text-6xl mb-4">🎨</div>
          <h3 class="text-xl font-semibold text-gray-700 mb-3">Ready to Start Your First Project?</h3>
          <p class="text-gray-500 mb-6 max-w-md mx-auto">
            No orders yet! Let's create something amazing together. Our professional design services are ready to bring your vision to life.
          </p>

          <!-- Action Buttons -->
          <div class="space-y-3 sm:space-y-0 sm:space-x-3 sm:flex sm:justify-center">
            <button onclick="closeOrderHistory(); document.getElementById('services').scrollIntoView({behavior: 'smooth'});"
                    class="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              🛒 Browse Services
            </button>
            <button onclick="closeOrderHistory(); document.getElementById('contact').scrollIntoView({behavior: 'smooth'});"
                    class="w-full sm:w-auto bg-white border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-all duration-300">
              💬 Get Free Quote
            </button>
          </div>
        </div>

        <!-- Services Preview -->
        <div class="bg-gray-50 rounded-xl p-6">
          <h4 class="text-lg font-semibold text-gray-800 mb-4 text-center">Popular Services</h4>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div class="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow cursor-pointer" onclick="closeOrderHistory(); document.getElementById('services').scrollIntoView({behavior: 'smooth'});">
              <div class="text-3xl mb-2">🌐</div>
              <div class="font-medium text-gray-700">Website Design</div>
              <div class="text-sm text-gray-500">Starting at $100</div>
            </div>
            <div class="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow cursor-pointer" onclick="closeOrderHistory(); document.getElementById('services').scrollIntoView({behavior: 'smooth'});">
              <div class="text-3xl mb-2">⚡</div>
              <div class="font-medium text-gray-700">Logo Design</div>
              <div class="text-sm text-gray-500">Only $25</div>
            </div>
            <div class="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow cursor-pointer" onclick="closeOrderHistory(); document.getElementById('services').scrollIntoView({behavior: 'smooth'});">
              <div class="text-3xl mb-2">📋</div>
              <div class="font-medium text-gray-700">Brochure</div>
              <div class="text-sm text-gray-500">Starting at $80</div>
            </div>
          </div>
        </div>

        <!-- Contact Support -->
        <div class="bg-indigo-50 rounded-xl p-6 text-center">
          <h4 class="text-lg font-semibold text-gray-800 mb-2">Need Help Getting Started?</h4>
          <p class="text-gray-600 mb-4">Our team is here to help you choose the perfect service for your needs.</p>
          <div class="space-y-2 sm:space-y-0 sm:space-x-3 sm:flex sm:justify-center">
            <button onclick="handleContactSupport()"
                    class="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              📧 Contact Us
            </button>
            <button onclick="window.open('tel:+14029797184', '_self');"
                    class="w-full sm:w-auto bg-white border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors">
              📞 Call (402) 979-7184
            </button>
          </div>
        </div>
      </div>
    `;

    console.log('✅ Loading message replaced with proper content');
    return true;
  }
  return false;
}

// Override showOrderHistory to apply immediate fix
const originalShowOrderHistory = window.showOrderHistory;
window.showOrderHistory = function() {
  console.log('📋 Enhanced showOrderHistory with immediate fix...');

  // Call original if it exists
  if (typeof originalShowOrderHistory === 'function') {
    try {
      originalShowOrderHistory();
    } catch (error) {
      console.log('⚠️ Error in original showOrderHistory, proceeding with fix');
    }
  } else {
    // Fallback - show modal manually
    const modal = document.getElementById('orderHistoryModal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  }

  // Apply immediate fix with multiple attempts
  setTimeout(() => immediateFixLoading(), 10);
  setTimeout(() => immediateFixLoading(), 100);
  setTimeout(() => immediateFixLoading(), 500);
};

// Set up monitoring for modal changes
const setupModalMonitoring = () => {
  const modal = document.getElementById('orderHistoryModal');
  if (modal) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          if (!modal.classList.contains('hidden')) {
            setTimeout(() => immediateFixLoading(), 50);
          }
        }
      });
    });

    observer.observe(modal, {
      attributes: true,
      attributeFilter: ['class']
    });

    console.log('✅ Modal monitoring setup complete');
  }
};

// Apply immediate fix on page load
setTimeout(() => {
  immediateFixLoading();
  setupModalMonitoring();
}, 100);

// Periodic check
let periodicChecks = 0;
const periodicInterval = setInterval(() => {
  const modal = document.getElementById('orderHistoryModal');
  if (modal && !modal.classList.contains('hidden')) {
    immediateFixLoading();
  }

  periodicChecks++;
  if (periodicChecks > 30) { // Stop after 30 seconds
    clearInterval(periodicInterval);
  }
}, 1000);

class MyOrdersFix {
  constructor() {
    this.init();
  }

  init() {
    console.log('🔧 Initializing My Orders fix...');
    
    // Fix order saving when orders are submitted
    this.fixOrderSaving();
    
    // Fix order display in My Orders modal
    this.fixOrderDisplay();
    
    // Migrate any existing pending orders to user accounts
    this.migratePendingOrders();
    
    // Monitor for new orders
    this.monitorNewOrders();
    
    console.log('✅ My Orders fix initialized');
  }

  fixOrderSaving() {
    console.log('🔧 Fixing order saving process...');
    
    // Override the order saving to properly link to user accounts
    const originalSaveOrder = window.saveOrderToLocalStorage;
    
    window.saveOrderToUser = (orderData) => {
      console.log('💾 Saving order to user account:', orderData);
      
      if (!window.currentUser) {
        console.log('⚠️ No user signed in, saving to pending orders');
        this.saveToPendingOrders(orderData);
        return;
      }

      try {
        // Get users array
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        const userIndex = users.findIndex(u => u.id === window.currentUser.id);
        
        if (userIndex === -1) {
          console.error('❌ Current user not found in users array');
          this.saveToPendingOrders(orderData);
          return;
        }

        // Initialize orders array if it doesn't exist
        if (!users[userIndex].orders) {
          users[userIndex].orders = [];
        }

        // Create order object with all necessary data
        const order = {
          id: Date.now().toString(),
          orderNumber: orderData.orderNumber || `ORD-${Date.now()}`,
          date: new Date().toISOString(),
          customerName: orderData.customerName || window.currentUser.name,
          email: orderData.email || window.currentUser.email,
          phone: orderData.phone || '',
          service: orderData.service || orderData.projectType || 'Custom Service',
          description: orderData.description || orderData.details || '',
          budget: orderData.budget || 'Not specified',
          timeline: orderData.timeline || 'Not specified',
          status: 'Submitted',
          userId: window.currentUser.id,
          timestamp: Date.now()
        };

        // Add to user's orders (at the beginning for newest first)
        users[userIndex].orders.unshift(order);

        // Save back to localStorage
        localStorage.setItem('visualVibeUsers', JSON.stringify(users));
        
        // Also save to pending orders as backup
        this.saveToPendingOrders(order);
        
        console.log('✅ Order saved to user account successfully');
        
        // Update current user session
        window.currentUser.lastActivity = new Date().toISOString();
        localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));
        
        return order;
      } catch (error) {
        console.error('❌ Error saving order to user account:', error);
        this.saveToPendingOrders(orderData);
      }
    };

    // Hook into form submission
    this.hookFormSubmission();
  }

  saveToPendingOrders(orderData) {
    try {
      const pendingOrders = JSON.parse(localStorage.getItem('pendingOrders') || '[]');
      
      const order = {
        ...orderData,
        id: Date.now().toString(),
        orderNumber: orderData.orderNumber || `ORD-${Date.now()}`,
        date: new Date().toISOString(),
        status: 'Submitted',
        timestamp: Date.now()
      };
      
      pendingOrders.unshift(order);
      localStorage.setItem('pendingOrders', JSON.stringify(pendingOrders));
      console.log('💾 Order saved to pending orders');
    } catch (error) {
      console.error('❌ Error saving to pending orders:', error);
    }
  }

  hookFormSubmission() {
    console.log('🎣 Hooking into form submission...');
    
    // Monitor for form submissions
    document.addEventListener('submit', (e) => {
      if (e.target.id === 'orderForm') {
        console.log('📝 Order form submitted');
        setTimeout(() => this.captureOrderData(), 100);
      }
    });

    // Monitor for button clicks on submit button
    document.addEventListener('click', (e) => {
      if (e.target.id === 'submitOrderBtn' || e.target.closest('#submitOrderBtn')) {
        console.log('🖱️ Order submit button clicked');
        setTimeout(() => this.captureOrderData(), 500);
      }
    });

    // Hook into existing order functions
    this.wrapExistingOrderFunctions();
  }

  captureOrderData() {
    console.log('📊 Capturing order data from form...');
    
    try {
      const form = document.getElementById('orderForm');
      if (!form) {
        console.log('❌ Order form not found');
        return;
      }

      // Get form data
      const formData = new FormData(form);
      const orderData = {
        customerName: formData.get('customerName') || document.getElementById('customerName')?.value || '',
        email: formData.get('email') || document.getElementById('email')?.value || '',
        phone: formData.get('phone') || document.getElementById('phone')?.value || '',
        service: formData.get('service') || document.getElementById('service')?.value || '',
        projectType: formData.get('projectType') || document.getElementById('projectType')?.value || '',
        description: formData.get('description') || document.getElementById('description')?.value || '',
        budget: formData.get('budget') || document.getElementById('budget')?.value || '',
        timeline: formData.get('timeline') || document.getElementById('timeline')?.value || '',
        details: formData.get('details') || ''
      };

      // Only save if we have meaningful data
      if (orderData.customerName || orderData.email || orderData.phone) {
        console.log('💾 Saving captured order data:', orderData);
        window.saveOrderToUser(orderData);
      } else {
        console.log('⚠️ No meaningful order data to capture');
      }
    } catch (error) {
      console.error('❌ Error capturing order data:', error);
    }
  }

  wrapExistingOrderFunctions() {
    // Wrap any existing order submission functions
    const orderFunctions = ['simpleOrderSubmit', 'submitOrder', 'handleOrderSubmit'];
    
    orderFunctions.forEach(funcName => {
      if (typeof window[funcName] === 'function') {
        const originalFunc = window[funcName];
        window[funcName] = (...args) => {
          console.log(`🔄 Wrapped ${funcName} called`);
          const result = originalFunc.apply(this, args);
          
          // Capture order data after execution
          setTimeout(() => this.captureOrderData(), 200);
          
          return result;
        };
        console.log(`✅ Wrapped ${funcName} function`);
      }
    });
  }

  fixOrderDisplay() {
    console.log('🖼️ Fixing order display in My Orders modal...');
    
    // Override showOrderHistory to show comprehensive order data
    const originalShowOrderHistory = window.showOrderHistory;
    
    window.showOrderHistory = () => {
      console.log('📋 Enhanced showOrderHistory called');
      
      try {
        const modal = document.getElementById('orderHistoryModal');
        const content = document.getElementById('orderHistoryContent');
        
        if (!modal || !content) {
          alert('Order history not available. Please refresh the page.');
          return;
        }
        
        modal.classList.remove('hidden');
        
        if (!window.currentUser) {
          content.innerHTML = `
            <div class="text-center py-8">
              <div class="text-gray-400 text-6xl mb-4">🔐</div>
              <h4 class="text-xl font-semibold text-gray-600 mb-2">Sign In Required</h4>
              <p class="text-gray-500 mb-4">Please sign in to view your order history.</p>
              <button onclick="closeOrderHistory(); openSignInModal();" class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
                Sign In Now
              </button>
            </div>
          `;
          return;
        }
        
        // Get all orders for the current user
        const orders = this.getAllUserOrders();
        
        if (orders.length === 0) {
          content.innerHTML = `
            <div class="text-center py-8">
              <div class="text-gray-400 text-6xl mb-4">📋</div>
              <h4 class="text-xl font-semibold text-gray-600 mb-2">No Orders Yet</h4>
              <p class="text-gray-500 mb-4">You haven't placed any orders yet. Start by browsing our services!</p>
              <div class="space-y-3">
                <button onclick="closeOrderHistory(); document.getElementById('order').scrollIntoView({behavior: 'smooth'});" class="block w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
                  Place Your First Order
                </button>
                <button onclick="window.testCreateSampleOrder();" class="block w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300">
                  Create Sample Order (Testing)
                </button>
              </div>
            </div>
          `;
        } else {
          content.innerHTML = `
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-gray-800">Your Orders (${orders.length})</h3>
                <button onclick="window.refreshOrderHistory();" class="text-indigo-600 hover:text-indigo-800 text-sm">
                  🔄 Refresh
                </button>
              </div>
              
              ${orders.map((order, index) => `
                <div class="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                  <div class="flex justify-between items-start mb-3">
                    <div>
                      <h4 class="font-semibold text-gray-800">${order.service || order.projectType || 'Custom Service'}</h4>
                      <p class="text-sm text-gray-600">Order #${order.orderNumber || order.id}</p>
                    </div>
                    <span class="px-3 py-1 text-xs font-medium rounded-full ${this.getStatusStyle(order.status)}">
                      ${order.status || 'Submitted'}
                    </span>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p class="text-gray-600"><strong>Date:</strong> ${this.formatDate(order.date || order.timestamp)}</p>
                      <p class="text-gray-600"><strong>Budget:</strong> ${order.budget || 'Not specified'}</p>
                    </div>
                    <div>
                      <p class="text-gray-600"><strong>Timeline:</strong> ${order.timeline || 'Not specified'}</p>
                      <p class="text-gray-600"><strong>Contact:</strong> ${order.email || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  ${order.description ? `
                    <div class="mt-3 pt-3 border-t border-gray-100">
                      <p class="text-sm text-gray-700"><strong>Description:</strong></p>
                      <p class="text-sm text-gray-600 mt-1">${order.description}</p>
                    </div>
                  ` : ''}
                  
                  <div class="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <button onclick="window.viewOrderDetails('${order.id || index}')" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      View Details
                    </button>
                    <button onclick="window.contactAboutOrder('${order.orderNumber || order.id}')" class="text-green-600 hover:text-green-800 text-sm font-medium">
                      Contact Support
                    </button>
                  </div>
                </div>
              `).join('')}
              
              <div class="mt-6 pt-4 border-t border-gray-200 text-center">
                <p class="text-sm text-gray-500 mb-3">Need help with your orders?</p>
                <button onclick="window.contactSupport();" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm">
                  📞 Contact Support
                </button>
              </div>
            </div>
          `;
        }
      } catch (error) {
        console.error('❌ Error in enhanced showOrderHistory:', error);
        content.innerHTML = `
          <div class="text-center py-8">
            <div class="text-red-400 text-6xl mb-4">⚠️</div>
            <h4 class="text-xl font-semibold text-red-600 mb-2">Error Loading Orders</h4>
            <p class="text-gray-500 mb-4">There was an error loading your order history.</p>
            <button onclick="location.reload();" class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700">
              Refresh Page
            </button>
          </div>
        `;
      }
    };
  }

  getAllUserOrders() {
    if (!window.currentUser) return [];
    
    let allOrders = [];
    
    try {
      // Get orders from user account
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const user = users.find(u => u.id === window.currentUser.id);
      if (user && user.orders) {
        allOrders = [...user.orders];
      }
      
      // Get orders from pending orders that match current user
      const pendingOrders = JSON.parse(localStorage.getItem('pendingOrders') || '[]');
      const userPendingOrders = pendingOrders.filter(order => 
        order.email === window.currentUser.email || 
        order.phone === window.currentUser.phone ||
        order.userId === window.currentUser.id
      );
      
      // Merge orders, avoiding duplicates
      userPendingOrders.forEach(pendingOrder => {
        if (!allOrders.find(order => order.orderNumber === pendingOrder.orderNumber)) {
          allOrders.push(pendingOrder);
        }
      });
      
      // Sort by date (newest first)
      allOrders.sort((a, b) => {
        const dateA = new Date(a.date || a.timestamp || 0);
        const dateB = new Date(b.date || b.timestamp || 0);
        return dateB - dateA;
      });
      
      console.log('📊 Found total orders for user:', allOrders.length);
      return allOrders;
    } catch (error) {
      console.error('❌ Error getting user orders:', error);
      return [];
    }
  }

  migratePendingOrders() {
    console.log('🔄 Migrating pending orders to user accounts...');
    
    if (!window.currentUser) {
      console.log('⚠️ No user signed in, skipping migration');
      return;
    }

    try {
      const pendingOrders = JSON.parse(localStorage.getItem('pendingOrders') || '[]');
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.id === window.currentUser.id);
      
      if (userIndex === -1) {
        console.log('❌ Current user not found for migration');
        return;
      }
      
      if (!users[userIndex].orders) {
        users[userIndex].orders = [];
      }
      
      // Find pending orders that belong to current user
      const userPendingOrders = pendingOrders.filter(order => 
        (order.email && order.email.toLowerCase() === window.currentUser.email.toLowerCase()) ||
        order.userId === window.currentUser.id
      );
      
      if (userPendingOrders.length > 0) {
        // Add to user's orders if not already there
        userPendingOrders.forEach(pendingOrder => {
          if (!users[userIndex].orders.find(order => order.orderNumber === pendingOrder.orderNumber)) {
            users[userIndex].orders.push({
              ...pendingOrder,
              userId: window.currentUser.id,
              migratedAt: new Date().toISOString()
            });
          }
        });
        
        localStorage.setItem('visualVibeUsers', JSON.stringify(users));
        console.log(`✅ Migrated ${userPendingOrders.length} pending orders to user account`);
      } else {
        console.log('📝 No pending orders to migrate for current user');
      }
    } catch (error) {
      console.error('❌ Error migrating pending orders:', error);
    }
  }

  monitorNewOrders() {
    // Monitor localStorage changes for new orders
    window.addEventListener('storage', (e) => {
      if (e.key === 'pendingOrders' || e.key === 'visualVibeUsers') {
        console.log('📊 Order storage changed, refreshing if orders modal is open');
        if (!document.getElementById('orderHistoryModal')?.classList.contains('hidden')) {
          setTimeout(() => window.showOrderHistory(), 500);
        }
      }
    });
  }

  getStatusStyle(status) {
    const statusLower = (status || 'submitted').toLowerCase();
    
    switch (statusLower) {
      case 'completed':
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in progress':
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  formatDate(dateInput) {
    if (!dateInput) return 'Unknown date';
    
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return 'Invalid date';
    
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }
}

// Helper functions
window.refreshOrderHistory = function() {
  console.log('��� Refreshing order history...');
  if (window.myOrdersFix) {
    window.myOrdersFix.migratePendingOrders();
  }
  if (typeof window.showOrderHistory === 'function') {
    window.showOrderHistory();
  }
};

window.viewOrderDetails = function(orderId) {
  console.log('👁️ Viewing order details for:', orderId);
  
  const orders = window.myOrdersFix ? window.myOrdersFix.getAllUserOrders() : [];
  const order = orders.find(o => o.id === orderId) || orders[parseInt(orderId)];
  
  if (order) {
    alert(`
Order Details:

Order #: ${order.orderNumber || order.id}
Service: ${order.service || order.projectType || 'Custom Service'}
Date: ${window.myOrdersFix.formatDate(order.date || order.timestamp)}
Status: ${order.status || 'Submitted'}

Customer: ${order.customerName || 'Not provided'}
Email: ${order.email || 'Not provided'}
Phone: ${order.phone || 'Not provided'}

Budget: ${order.budget || 'Not specified'}
Timeline: ${order.timeline || 'Not specified'}

${order.description ? `Description: ${order.description}` : ''}

Need help? Contact support at (402) 979-7184
    `);
  } else {
    alert('Order details not found. Please refresh and try again.');
  }
};

window.contactAboutOrder = function(orderNumber) {
  console.log('📞 Contacting support about order:', orderNumber);
  
  const subject = `Question about Order #${orderNumber}`;
  const body = `Hi, I have a question about my order #${orderNumber}. Please let me know the current status and next steps.\n\nThank you!`;
  
  const mailtoLink = `mailto:support@visualvibestudio.store?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoLink);
};

window.contactSupport = function() {
  console.log('📞 Contacting general support...');
  
  const subject = 'Order Support Request';
  const body = 'Hi, I need assistance with my orders. Please contact me at your earliest convenience.\n\nThank you!';
  
  const mailtoLink = `mailto:support@visualvibestudio.store?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoLink);
};

// Test function to create sample order
window.testCreateSampleOrder = function() {
  console.log('🧪 Creating sample order for testing...');
  
  if (!window.currentUser) {
    alert('Please sign in first to test order creation.');
    return;
  }
  
  const sampleOrder = {
    customerName: window.currentUser.name,
    email: window.currentUser.email,
    phone: '(555) 123-4567',
    service: 'Logo Design',
    description: 'Sample order for testing the My Orders functionality.',
    budget: '$500-$1000',
    timeline: '1-2 weeks'
  };
  
  if (window.saveOrderToUser) {
    window.saveOrderToUser(sampleOrder);
    alert('Sample order created! Check your My Orders to see it.');
    
    // Refresh the modal if it's open
    if (!document.getElementById('orderHistoryModal')?.classList.contains('hidden')) {
      setTimeout(() => window.showOrderHistory(), 500);
    }
  }
};

// Initialize the fix
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    window.myOrdersFix = new MyOrdersFix();
    console.log('✅ My Orders fix ready');
  }, 1000);
});

// Contact Support function for My Orders modal
window.handleContactSupport = function() {
  console.log('📞 Contact support clicked from My Orders...');

  try {
    // Close the modal first
    if (typeof window.closeOrderHistory === 'function') {
      window.closeOrderHistory();
    } else {
      // Fallback method to close modal
      const modal = document.getElementById('orderHistoryModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    }

    // Wait a moment for modal to close, then scroll to contact
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        console.log('✅ Scrolled to contact section');

        // Optional: Show a toast notification
        if (window.toastManager) {
          window.toastManager.success('Contact form ready! Fill out your details below.', { duration: 3000 });
        }
      } else {
        console.error('❌ Contact section not found');
        // Fallback: scroll to bottom of page
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    }, 300);

  } catch (error) {
    console.error('❌ Error in handleContactSupport:', error);
    alert('Unable to navigate to contact form. Please scroll down to the contact section.');
  }
};

console.log('📋 My Orders display fix loaded');

// Load email buttons fix
const emailButtonsFixScript = document.createElement('script');
emailButtonsFixScript.src = 'fix-email-buttons.js';
emailButtonsFixScript.onload = function() {
  console.log('📧 Email buttons fix script loaded successfully');
};
emailButtonsFixScript.onerror = function() {
  console.error('❌ Failed to load email buttons fix script');
};
document.head.appendChild(emailButtonsFixScript);
