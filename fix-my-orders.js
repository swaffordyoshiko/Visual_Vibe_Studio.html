// Fix My Orders - Ensure orders and receipts display properly
console.log('📋 Fixing My Orders functionality...');

(function() {
  'use strict';
  
  function fixMyOrders() {
    console.log('🔧 Initializing My Orders fix...');
    
    // Override showOrderHistory with a working version
    window.showOrderHistory = function() {
      console.log('📋 Opening My Orders (FIXED VERSION)...');
      
      try {
        // Check if user is signed in
        if (!window.currentUser) {
          // Try to restore user from localStorage
          try {
            const savedUser = localStorage.getItem('visualVibeUser');
            if (savedUser) {
              window.currentUser = JSON.parse(savedUser);
              console.log('✅ Restored current user:', window.currentUser.name);
            }
          } catch (e) {
            console.error('❌ Failed to restore user:', e);
          }
        }
        
        // Get or create modal
        let modal = document.getElementById('orderHistoryModal');
        if (!modal) {
          createOrderHistoryModal();
          modal = document.getElementById('orderHistoryModal');
        }
        
        // Show modal
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Load orders
        loadOrderHistory();
        
        console.log('✅ My Orders modal opened');
        
      } catch (error) {
        console.error('❌ Error opening My Orders:', error);
        alert('Error opening My Orders. Please try again.');
      }
    };
    
    // Create modal if it doesn't exist
    function createOrderHistoryModal() {
      console.log('🏗️ Creating order history modal...');
      
      const modal = document.createElement('div');
      modal.id = 'orderHistoryModal';
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden p-4';
      
      modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl">
          <!-- Header -->
          <div class="flex justify-between items-center p-6 border-b border-gray-200">
            <h3 class="text-2xl font-bold text-gray-800">My Orders & Receipts</h3>
            <button onclick="closeOrderHistory()" class="text-gray-500 hover:text-gray-700 p-2 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <!-- Content -->
          <div id="orderHistoryContent" class="flex-1 overflow-y-auto p-6">
            <div class="text-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p class="text-gray-500">Loading your orders...</p>
            </div>
          </div>
        </div>
      `;
      
      // Add click outside to close
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          window.closeOrderHistory();
        }
      });
      
      document.body.appendChild(modal);
      console.log('✅ Order history modal created');
    }
    
    // Load order history with multiple fallbacks
    function loadOrderHistory() {
      console.log('📊 Loading order history...');
      
      const content = document.getElementById('orderHistoryContent');
      if (!content) {
        console.error('❌ Order history content not found');
        return;
      }
      
      // Check if user is signed in
      if (!window.currentUser) {
        content.innerHTML = `
          <div class="text-center py-8">
            <div class="text-gray-400 text-6xl mb-4">👤</div>
            <h4 class="text-xl font-semibold text-gray-600 mb-2">Sign In Required</h4>
            <p class="text-gray-500 mb-4">Please sign in to view your orders and receipts.</p>
            <button onclick="closeOrderHistory(); openSignInModal();" class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
              Sign In
            </button>
          </div>
        `;
        return;
      }
      
      // Get orders from all possible sources
      let allOrders = [];
      
      try {
        // 1. Get orders from user account
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        const user = users.find(u => u.id === window.currentUser.id);
        if (user && user.orders) {
          allOrders.push(...user.orders);
          console.log(`📦 Found ${user.orders.length} orders in user account`);
        }
        
        // 2. Get orders from pending orders (by email/phone matching)
        const pendingOrders = JSON.parse(localStorage.getItem('pendingOrders') || '[]');
        const userPendingOrders = pendingOrders.filter(order => 
          (order.email && order.email.toLowerCase() === window.currentUser.email.toLowerCase()) ||
          (order.phone && order.phone === window.currentUser.phone)
        );
        
        // Add pending orders that aren't already in the user's orders
        userPendingOrders.forEach(pendingOrder => {
          if (!allOrders.find(order => order.orderNumber === pendingOrder.orderNumber)) {
            allOrders.push(pendingOrder);
          }
        });
        console.log(`📦 Found ${userPendingOrders.length} additional orders in pending orders`);
        
        // 3. Check legacy storage locations
        const legacyOrders = JSON.parse(localStorage.getItem('visualVibeOrders') || '[]');
        const userLegacyOrders = legacyOrders.filter(order => 
          (order.email && order.email.toLowerCase() === window.currentUser.email.toLowerCase()) ||
          (order.userId === window.currentUser.id)
        );
        
        userLegacyOrders.forEach(legacyOrder => {
          if (!allOrders.find(order => order.orderNumber === legacyOrder.orderNumber)) {
            allOrders.push(legacyOrder);
          }
        });
        console.log(`📦 Found ${userLegacyOrders.length} additional orders in legacy storage`);
        
        console.log(`📊 Total orders found: ${allOrders.length}`);
        
      } catch (error) {
        console.error('❌ Error loading orders:', error);
      }
      
      // If no orders found, create some sample orders for testing
      if (allOrders.length === 0) {
        console.log('📝 No orders found, checking if we should create sample data...');
        
        // Show empty state
        content.innerHTML = `
          <div class="text-center py-8">
            <div class="text-gray-400 text-6xl mb-4">📋</div>
            <h4 class="text-xl font-semibold text-gray-600 mb-2">No Orders Yet</h4>
            <p class="text-gray-500 mb-6">You haven't placed any orders yet. Start by browsing our services!</p>
            <div class="space-y-3">
              <button onclick="closeOrderHistory(); document.getElementById('services').scrollIntoView({behavior: 'smooth'});" 
                      class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                Browse Services
              </button>
              <div class="text-center">
                <button onclick="createSampleOrder()" class="text-indigo-600 hover:text-indigo-800 text-sm underline">
                  Create Sample Order (for testing)
                </button>
              </div>
            </div>
          </div>
        `;
        return;
      }
      
      // Sort orders by date (newest first)
      allOrders.sort((a, b) => new Date(b.date || b.createdAt || Date.now()) - new Date(a.date || a.createdAt || Date.now()));
      
      // Display orders
      displayOrders(allOrders);
    }
    
    // Display orders in the UI
    function displayOrders(orders) {
      console.log(`🎨 Displaying ${orders.length} orders`);
      
      const content = document.getElementById('orderHistoryContent');
      if (!content) return;
      
      const ordersHTML = orders.map(order => {
        const orderDate = new Date(order.date || order.createdAt || Date.now());
        const status = order.status || 'pending';
        const statusColor = getStatusColor(status);
        
        return `
          <div class="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
            <!-- Order Header -->
            <div class="flex justify-between items-start mb-4">
              <div>
                <h4 class="text-lg font-semibold text-gray-800">Order #${order.orderNumber || 'N/A'}</h4>
                <p class="text-sm text-gray-500">${orderDate.toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric', 
                  hour: '2-digit', minute: '2-digit'
                })}</p>
              </div>
              <span class="px-3 py-1 rounded-full text-sm font-medium ${statusColor}">
                ${status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
            
            <!-- Order Details -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p class="text-sm font-medium text-gray-600">Service:</p>
                <p class="text-gray-800">${order.serviceType || order.service || 'Custom Project'}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-600">Business Name:</p>
                <p class="text-gray-800">${order.businessName || order.companyName || 'N/A'}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-600">Contact:</p>
                <p class="text-gray-800">${order.email || window.currentUser.email}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-600">Phone:</p>
                <p class="text-gray-800">${order.phone || 'N/A'}</p>
              </div>
            </div>
            
            <!-- Order Actions -->
            <div class="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
              <button onclick="downloadReceipt('${order.orderNumber}')" 
                      class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                📄 Download Receipt
              </button>
              <button onclick="viewOrderDetails('${order.orderNumber}')" 
                      class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                👁️ View Details
              </button>
              ${status === 'pending' ? `
                <button onclick="contactSupport('${order.orderNumber}')" 
                        class="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg hover:bg-yellow-200 transition-colors text-sm">
                  💬 Contact Support
                </button>
              ` : ''}
            </div>
          </div>
        `;
      }).join('');
      
      content.innerHTML = `
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <h4 class="text-lg font-semibold text-gray-800">Your Orders (${orders.length})</h4>
            <button onclick="refreshOrderHistory()" class="text-indigo-600 hover:text-indigo-800 text-sm">
              🔄 Refresh
            </button>
          </div>
          ${ordersHTML}
        </div>
      `;
    }
    
    // Get status color
    function getStatusColor(status) {
      switch (status.toLowerCase()) {
        case 'completed': return 'bg-green-100 text-green-800';
        case 'in-progress': case 'processing': return 'bg-blue-100 text-blue-800';
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        case 'cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }
    
    // Enhanced download receipt function
    window.downloadReceipt = function(orderNumber) {
      console.log(`📄 Downloading receipt for order ${orderNumber}`);
      
      try {
        // Find the order
        let allOrders = [];
        
        // Get from user account
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        const user = users.find(u => u.id === window.currentUser.id);
        if (user && user.orders) {
          allOrders.push(...user.orders);
        }
        
        // Get from pending orders
        const pendingOrders = JSON.parse(localStorage.getItem('pendingOrders') || '[]');
        allOrders.push(...pendingOrders.filter(order => 
          (order.email && order.email.toLowerCase() === window.currentUser.email.toLowerCase()) ||
          (order.phone && order.phone === window.currentUser.phone)
        ));
        
        const order = allOrders.find(o => o.orderNumber === orderNumber);
        
        if (!order) {
          alert('Receipt not found. Please contact support if you need assistance.');
          return;
        }
        
        // Generate and download receipt
        generateReceipt(order);
        
      } catch (error) {
        console.error('❌ Error downloading receipt:', error);
        alert('Error downloading receipt. Please try again.');
      }
    };
    
    // Generate receipt
    function generateReceipt(order) {
      const receiptHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Receipt - Order #${order.orderNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 20px; }
            .order-info { margin-bottom: 20px; }
            .order-info div { margin-bottom: 10px; }
            .label { font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Visual Vibe Studio</h1>
            <p>Professional Design Services</p>
            <p>www.visualvibestudio.store</p>
          </div>
          
          <div class="order-info">
            <div><span class="label">Order Number:</span> ${order.orderNumber}</div>
            <div><span class="label">Date:</span> ${new Date(order.date || order.createdAt).toLocaleDateString()}</div>
            <div><span class="label">Status:</span> ${order.status || 'Pending'}</div>
            <div><span class="label">Service:</span> ${order.serviceType || order.service || 'Custom Project'}</div>
            <div><span class="label">Business Name:</span> ${order.businessName || 'N/A'}</div>
            <div><span class="label">Contact Email:</span> ${order.email}</div>
            <div><span class="label">Phone:</span> ${order.phone || 'N/A'}</div>
          </div>
          
          <div style="margin-top: 40px; text-align: center; font-size: 12px; color: #666;">
            <p>Thank you for choosing Visual Vibe Studio!</p>
            <p>Contact us: support@visualvibestudio.store | (402) 979-7184</p>
          </div>
        </body>
        </html>
      `;
      
      // Create and download the receipt
      const blob = new Blob([receiptHTML], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${order.orderNumber}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      console.log('✅ Receipt downloaded successfully');
      
      if (window.toastManager) {
        window.toastManager.success('Receipt downloaded successfully!', { duration: 3000 });
      }
    }
    
    // Create sample order for testing
    window.createSampleOrder = function() {
      if (!window.currentUser) return;
      
      const sampleOrder = {
        orderNumber: 'SAMPLE-' + Date.now(),
        date: new Date().toISOString(),
        status: 'completed',
        serviceType: 'Website Design',
        businessName: 'Sample Business',
        email: window.currentUser.email,
        phone: '(555) 123-4567',
        createdAt: new Date().toISOString()
      };
      
      // Save to user account
      try {
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        const userIndex = users.findIndex(u => u.id === window.currentUser.id);
        
        if (userIndex !== -1) {
          if (!users[userIndex].orders) {
            users[userIndex].orders = [];
          }
          users[userIndex].orders.unshift(sampleOrder);
          localStorage.setItem('visualVibeUsers', JSON.stringify(users));
          
          console.log('✅ Sample order created');
          loadOrderHistory(); // Refresh the display
          
          if (window.toastManager) {
            window.toastManager.success('Sample order created!', { duration: 2000 });
          }
        }
      } catch (error) {
        console.error('❌ Error creating sample order:', error);
      }
    };
    
    // Refresh order history
    window.refreshOrderHistory = function() {
      console.log('🔄 Refreshing order history...');
      loadOrderHistory();
    };
    
    // View order details
    window.viewOrderDetails = function(orderNumber) {
      console.log(`👁️ Viewing details for order ${orderNumber}`);
      alert('Order details feature coming soon! For now, you can download the receipt.');
    };
    
    // Contact support for specific order
    window.contactSupport = function(orderNumber) {
      console.log(`💬 Contacting support for order ${orderNumber}`);
      window.closeOrderHistory();
      setTimeout(() => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      }, 300);
    };
    
    // Enhanced close function
    window.closeOrderHistory = function() {
      console.log('❌ Closing My Orders...');
      
      const modal = document.getElementById('orderHistoryModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    };
    
    console.log('✅ My Orders fix initialized');
  }
  
  // Initialize immediately
  fixMyOrders();
  
  // Also initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixMyOrders);
  }
  
  // Initialize with delay to override other scripts
  setTimeout(fixMyOrders, 1000);
  
})();

console.log('📋 My Orders fix loaded - orders and receipts should now display properly!');
