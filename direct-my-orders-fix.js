// DIRECT My Orders Fix - Ensures orders and receipts display
console.log('🔧 Loading direct My Orders fix...');

(function() {
  'use strict';
  
  function directMyOrdersFix() {
    console.log('🎯 Applying direct My Orders fix...');
    
    // Override showOrderHistory with a comprehensive working version
    window.showOrderHistory = function() {
      console.log('📋 [DIRECT FIX] Opening My Orders...');
      
      try {
        // Ensure user is signed in
        if (!window.currentUser) {
          // Try to restore user session
          try {
            const savedUser = localStorage.getItem('visualVibeUser');
            if (savedUser) {
              window.currentUser = JSON.parse(savedUser);
              console.log('✅ Restored user session:', window.currentUser.name);
            } else {
              console.log('❌ No user session found');
              alert('Please sign in to view your orders.');
              return;
            }
          } catch (e) {
            console.error('❌ Failed to restore user session:', e);
            alert('Please sign in to view your orders.');
            return;
          }
        }
        
        // Create or get modal
        let modal = document.getElementById('orderHistoryModal');
        if (!modal) {
          createMyOrdersModal();
          modal = document.getElementById('orderHistoryModal');
        }
        
        // Show modal immediately
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Load orders with comprehensive data checking
        loadAllUserOrders();
        
        console.log('✅ My Orders modal opened successfully');
        
      } catch (error) {
        console.error('❌ Error in direct My Orders fix:', error);
        alert('Error opening My Orders. Please try again.');
      }
    };
    
    // Create comprehensive My Orders modal
    function createMyOrdersModal() {
      console.log('🏗️ Creating comprehensive My Orders modal...');
      
      // Remove any existing modal first
      const existingModal = document.getElementById('orderHistoryModal');
      if (existingModal) {
        existingModal.remove();
      }
      
      const modal = document.createElement('div');
      modal.id = 'orderHistoryModal';
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
      
      modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl">
          <!-- Header -->
          <div class="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-xl">
            <h3 class="text-2xl font-bold">📋 My Orders & Receipts</h3>
            <button onclick="closeOrderHistory()" class="text-white/80 hover:text-white p-2 transition-colors rounded-lg hover:bg-white/10">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <!-- Content -->
          <div id="orderHistoryContent" class="flex-1 overflow-y-auto p-6">
            <div class="text-center py-12">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-6"></div>
              <h4 class="text-xl font-semibold text-gray-700 mb-2">Loading Your Orders...</h4>
              <p class="text-gray-500">Please wait while we fetch your order history.</p>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="border-t border-gray-200 p-6 bg-gray-50 rounded-b-xl">
            <div class="flex flex-wrap gap-3 justify-center">
              <button onclick="createTestOrder()" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                ➕ Create Test Order
              </button>
              <button onclick="refreshOrders()" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                🔄 Refresh Orders
              </button>
              <button onclick="clearAllOrders()" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
                🗑️ Clear All Orders
              </button>
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
      console.log('✅ My Orders modal created');
    }
    
    // Load all user orders from every possible location
    function loadAllUserOrders() {
      console.log('📊 Loading all user orders from all sources...');
      
      const content = document.getElementById('orderHistoryContent');
      if (!content) {
        console.error('❌ Order content container not found');
        return;
      }
      
      try {
        let allOrders = [];
        let foundOrdersCount = 0;
        
        console.log('🔍 Searching for orders in all storage locations...');
        
        // 1. Check user account orders
        try {
          const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
          console.log(`👥 Found ${users.length} users in storage`);
          
          const currentUserData = users.find(u => u.id === window.currentUser.id);
          if (currentUserData && currentUserData.orders) {
            allOrders.push(...currentUserData.orders);
            foundOrdersCount += currentUserData.orders.length;
            console.log(`📦 Found ${currentUserData.orders.length} orders in user account`);
          } else {
            console.log('📦 No orders found in user account');
          }
        } catch (e) {
          console.error('❌ Error checking user account orders:', e);
        }
        
        // 2. Check pending orders
        try {
          const pendingOrders = JSON.parse(localStorage.getItem('pendingOrders') || '[]');
          console.log(`⏳ Found ${pendingOrders.length} total pending orders`);
          
          const userPendingOrders = pendingOrders.filter(order => 
            (order.email && order.email.toLowerCase() === window.currentUser.email.toLowerCase()) ||
            (order.phone && order.phone === window.currentUser.phone) ||
            (order.userId === window.currentUser.id)
          );
          
          if (userPendingOrders.length > 0) {
            // Add only new orders (avoid duplicates)
            userPendingOrders.forEach(pendingOrder => {
              if (!allOrders.find(order => order.orderNumber === pendingOrder.orderNumber)) {
                allOrders.push(pendingOrder);
                foundOrdersCount++;
              }
            });
            console.log(`📦 Found ${userPendingOrders.length} additional orders in pending orders`);
          }
        } catch (e) {
          console.error('❌ Error checking pending orders:', e);
        }
        
        // 3. Check legacy storage locations
        const legacyKeys = ['visualVibeOrders', 'customerOrders', 'orders'];
        legacyKeys.forEach(key => {
          try {
            const legacyOrders = JSON.parse(localStorage.getItem(key) || '[]');
            if (legacyOrders.length > 0) {
              console.log(`🗃️ Found ${legacyOrders.length} orders in ${key}`);
              
              const userLegacyOrders = legacyOrders.filter(order =>
                (order.email && order.email.toLowerCase() === window.currentUser.email.toLowerCase()) ||
                (order.userId === window.currentUser.id)
              );
              
              userLegacyOrders.forEach(legacyOrder => {
                if (!allOrders.find(order => order.orderNumber === legacyOrder.orderNumber)) {
                  allOrders.push(legacyOrder);
                  foundOrdersCount++;
                }
              });
            }
          } catch (e) {
            console.error(`❌ Error checking ${key}:`, e);
          }
        });
        
        console.log(`📊 TOTAL ORDERS FOUND: ${foundOrdersCount}`);
        console.log('📋 All orders:', allOrders);
        
        // Display results
        if (allOrders.length === 0) {
          showNoOrdersState(content);
        } else {
          displayOrdersList(allOrders, content);
        }
        
      } catch (error) {
        console.error('❌ Critical error loading orders:', error);
        showErrorState(content);
      }
    }
    
    // Show state when no orders are found
    function showNoOrdersState(content) {
      console.log('📭 No orders found, showing empty state...');
      
      content.innerHTML = `
        <div class="text-center py-12">
          <div class="text-8xl mb-6">📭</div>
          <h4 class="text-2xl font-bold text-gray-700 mb-4">No Orders Found</h4>
          <p class="text-gray-600 mb-8 max-w-md mx-auto">
            We couldn't find any orders for your account. This could be because:
          </p>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 max-w-md mx-auto text-left">
            <ul class="space-y-2 text-sm text-gray-700">
              <li class="flex items-start"><span class="text-blue-500 mr-2">•</span>You haven't placed any orders yet</li>
              <li class="flex items-start"><span class="text-blue-500 mr-2">•</span>Orders were placed with a different email</li>
              <li class="flex items-start"><span class="text-blue-500 mr-2">•</span>Data was cleared from browser storage</li>
            </ul>
          </div>
          <div class="space-y-4">
            <button onclick="createTestOrder()" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
              🧪 Create Test Order
            </button>
            <div class="text-center">
              <a href="#services" onclick="closeOrderHistory()" class="text-indigo-600 hover:text-indigo-800 underline">
                Browse our services to place your first order
              </a>
            </div>
          </div>
        </div>
      `;
    }
    
    // Display the orders list
    function displayOrdersList(orders, content) {
      console.log(`📋 Displaying ${orders.length} orders...`);
      
      // Sort orders by date (newest first)
      orders.sort((a, b) => {
        const dateA = new Date(a.date || a.createdAt || a.timestamp || Date.now());
        const dateB = new Date(b.date || b.createdAt || b.timestamp || Date.now());
        return dateB - dateA;
      });
      
      const ordersHTML = orders.map((order, index) => {
        const orderDate = new Date(order.date || order.createdAt || order.timestamp || Date.now());
        const orderNumber = order.orderNumber || `ORDER-${Date.now()}-${index}`;
        const status = order.status || 'pending';
        const service = order.serviceType || order.service || order.type || 'Custom Service';
        const businessName = order.businessName || order.companyName || order.company || 'N/A';
        const email = order.email || window.currentUser.email || 'N/A';
        const phone = order.phone || order.phoneNumber || 'N/A';
        
        return `
          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <!-- Order Header -->
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
              <div class="mb-2 sm:mb-0">
                <h4 class="text-xl font-bold text-gray-800 mb-1">Order #${orderNumber}</h4>
                <p class="text-sm text-gray-500">
                  ${orderDate.toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                  })}
                </p>
              </div>
              <span class="inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(status)}">
                ${status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
            
            <!-- Order Details Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div class="space-y-3">
                <div>
                  <label class="text-sm font-medium text-gray-600">Service Type:</label>
                  <p class="text-gray-800 font-medium">${service}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-600">Business Name:</label>
                  <p class="text-gray-800">${businessName}</p>
                </div>
              </div>
              <div class="space-y-3">
                <div>
                  <label class="text-sm font-medium text-gray-600">Email:</label>
                  <p class="text-gray-800">${email}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-600">Phone:</label>
                  <p class="text-gray-800">${phone}</p>
                </div>
              </div>
            </div>
            
            <!-- Order Actions -->
            <div class="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
              <button onclick="downloadOrderReceipt('${orderNumber}')" 
                      class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Download Receipt
              </button>
              <button onclick="viewOrderDetails('${orderNumber}')" 
                      class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                👁️ View Details
              </button>
              <button onclick="contactSupportForOrder('${orderNumber}')" 
                      class="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg hover:bg-yellow-200 transition-colors text-sm font-medium">
                💬 Contact Support
              </button>
            </div>
          </div>
        `;
      }).join('');
      
      content.innerHTML = `
        <div class="space-y-6">
          <div class="flex justify-between items-center">
            <h4 class="text-xl font-bold text-gray-800">
              Your Orders (${orders.length} total)
            </h4>
            <button onclick="refreshOrders()" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              🔄 Refresh
            </button>
          </div>
          <div class="space-y-4">
            ${ordersHTML}
          </div>
        </div>
      `;
      
      console.log('✅ Orders displayed successfully');
    }
    
    // Show error state
    function showErrorState(content) {
      content.innerHTML = `
        <div class="text-center py-12">
          <div class="text-6xl mb-4">⚠️</div>
          <h4 class="text-xl font-bold text-red-600 mb-4">Error Loading Orders</h4>
          <p class="text-gray-600 mb-6">There was an error loading your order history.</p>
          <button onclick="refreshOrders()" class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
            Try Again
          </button>
        </div>
      `;
    }
    
    // Get status styling
    function getStatusStyle(status) {
      switch (status.toLowerCase()) {
        case 'completed': return 'bg-green-100 text-green-800';
        case 'in-progress': case 'processing': return 'bg-blue-100 text-blue-800';
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        case 'cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }
    
    // Create test order for debugging
    window.createTestOrder = function() {
      if (!window.currentUser) return;
      
      const testOrder = {
        orderNumber: `TEST-${Date.now()}`,
        date: new Date().toISOString(),
        status: 'completed',
        serviceType: 'Website Design',
        businessName: 'Test Business Inc.',
        email: window.currentUser.email,
        phone: '(555) 123-4567',
        createdAt: new Date().toISOString(),
        userId: window.currentUser.id
      };
      
      // Save to user account
      try {
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        const userIndex = users.findIndex(u => u.id === window.currentUser.id);
        
        if (userIndex !== -1) {
          if (!users[userIndex].orders) {
            users[userIndex].orders = [];
          }
          users[userIndex].orders.unshift(testOrder);
          localStorage.setItem('visualVibeUsers', JSON.stringify(users));
          
          // Also save to pending orders as backup
          const pendingOrders = JSON.parse(localStorage.getItem('pendingOrders') || '[]');
          pendingOrders.unshift(testOrder);
          localStorage.setItem('pendingOrders', JSON.stringify(pendingOrders));
          
          console.log('✅ Test order created:', testOrder.orderNumber);
          alert('✅ Test order created successfully!');
          
          // Refresh the display
          loadAllUserOrders();
        }
      } catch (error) {
        console.error('❌ Error creating test order:', error);
        alert('❌ Error creating test order');
      }
    };
    
    // Refresh orders
    window.refreshOrders = function() {
      console.log('🔄 Refreshing orders...');
      loadAllUserOrders();
    };
    
    // Clear all orders (for testing)
    window.clearAllOrders = function() {
      if (confirm('⚠️ Are you sure you want to clear all orders? This cannot be undone.')) {
        try {
          // Clear from user account
          const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
          const userIndex = users.findIndex(u => u.id === window.currentUser.id);
          if (userIndex !== -1) {
            users[userIndex].orders = [];
            localStorage.setItem('visualVibeUsers', JSON.stringify(users));
          }
          
          // Clear pending orders
          localStorage.removeItem('pendingOrders');
          localStorage.removeItem('visualVibeOrders');
          localStorage.removeItem('customerOrders');
          localStorage.removeItem('orders');
          
          console.log('🗑️ All orders cleared');
          alert('✅ All orders cleared successfully!');
          
          // Refresh display
          loadAllUserOrders();
        } catch (error) {
          console.error('❌ Error clearing orders:', error);
          alert('❌ Error clearing orders');
        }
      }
    };
    
    // Download receipt function
    window.downloadOrderReceipt = function(orderNumber) {
      console.log(`📄 Downloading receipt for order: ${orderNumber}`);
      
      // Create a simple HTML receipt
      const receiptHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Receipt - Order #${orderNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; }
            .header { text-align: center; border-bottom: 2px solid #4f46e5; padding-bottom: 20px; margin-bottom: 30px; }
            .header h1 { color: #4f46e5; margin: 0; }
            .order-info { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .row { display: flex; justify-content: space-between; margin: 10px 0; }
            .label { font-weight: bold; color: #374151; }
            .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Visual Vibe Studio</h1>
            <p>Professional Design Services</p>
            <p>📧 support@visualvibestudio.store | 📞 (402) 979-7184</p>
            <p>🌐 www.visualvibestudio.store</p>
          </div>
          
          <div class="order-info">
            <h2>Order Receipt</h2>
            <div class="row">
              <span class="label">Order Number:</span>
              <span>${orderNumber}</span>
            </div>
            <div class="row">
              <span class="label">Date:</span>
              <span>${new Date().toLocaleDateString()}</span>
            </div>
            <div class="row">
              <span class="label">Customer:</span>
              <span>${window.currentUser.name}</span>
            </div>
            <div class="row">
              <span class="label">Email:</span>
              <span>${window.currentUser.email}</span>
            </div>
            <div class="row">
              <span class="label">Status:</span>
              <span>Confirmed</span>
            </div>
          </div>
          
          <div class="footer">
            <p>Thank you for choosing Visual Vibe Studio!</p>
            <p>For questions about this order, please contact us using the information above.</p>
          </div>
        </body>
        </html>
      `;
      
      // Create and download the file
      const blob = new Blob([receiptHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${orderNumber}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert('✅ Receipt downloaded successfully!');
      console.log('✅ Receipt downloaded for order:', orderNumber);
    };
    
    // View order details
    window.viewOrderDetails = function(orderNumber) {
      alert(`Order Details for #${orderNumber}\n\nThis feature will show detailed order information including:\n• Service specifications\n• Project timeline\n• Communication history\n• File attachments\n\nComing soon!`);
    };
    
    // Contact support for specific order
    window.contactSupportForOrder = function(orderNumber) {
      console.log(`💬 Contacting support for order: ${orderNumber}`);
      
      // Close modal
      window.closeOrderHistory();
      
      // Scroll to contact section
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
          alert(`📞 Scroll down to the contact section to get in touch about order #${orderNumber}`);
        } else {
          alert(`📞 Please scroll to the contact section to get in touch about order #${orderNumber}`);
        }
      }, 300);
    };
    
    // Enhanced close function
    window.closeOrderHistory = function() {
      console.log('❌ Closing My Orders modal...');
      
      const modal = document.getElementById('orderHistoryModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = '';
        console.log('✅ My Orders modal closed');
      }
    };
    
    console.log('✅ Direct My Orders fix applied successfully');
  }
  
  // Apply fix immediately
  directMyOrdersFix();
  
  // Also apply when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', directMyOrdersFix);
  }
  
  // Apply with delay to override other scripts
  setTimeout(directMyOrdersFix, 1000);
  
})();

console.log('🎯 Direct My Orders fix loaded - orders and receipts should now display properly!');
