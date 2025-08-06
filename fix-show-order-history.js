// Fix missing showOrderHistory function
console.log('📋 Loading showOrderHistory function fix...');

function createShowOrderHistoryFunction() {
  // Define a robust showOrderHistory function
  function showOrderHistory() {
    console.log('🔍 Opening My Orders modal...');
    
    try {
      // Check if modal already exists
      let modal = document.getElementById('orderHistoryModal');
      
      if (!modal) {
        // Create the modal if it doesn't exist
        modal = document.createElement('div');
        modal.id = 'orderHistoryModal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.style.display = 'none';
        
        modal.innerHTML = `
          <div class="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold text-gray-900">My Orders</h2>
              <button onclick="closeOrderHistory()" class="text-gray-500 hover:text-gray-700 text-2xl font-bold">
                ×
              </button>
            </div>
            
            <div id="orderHistoryContent">
              <div class="text-center py-12">
                <div class="text-6xl mb-4">📋</div>
                <h3 class="text-xl font-semibold text-gray-700 mb-2">No Orders Yet</h3>
                <p class="text-gray-500 mb-6">You haven't placed any orders yet. Start shopping to see your order history here!</p>
                <button onclick="closeOrderHistory()" class="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                  Start Shopping
                </button>
              </div>
            </div>
          </div>
        `;
        
        document.body.appendChild(modal);
        console.log('✅ Order history modal created');
      }
      
      // Show the modal
      modal.style.display = 'flex';
      modal.style.opacity = '0';
      modal.style.transform = 'scale(0.9)';
      
      // Animate in
      setTimeout(() => {
        modal.style.transition = 'all 0.3s ease';
        modal.style.opacity = '1';
        modal.style.transform = 'scale(1)';
      }, 10);
      
      console.log('✅ Order history modal opened');
      
      // Load order history data (placeholder for now)
      loadOrderHistoryData();
      
    } catch (error) {
      console.error('❌ Error in showOrderHistory:', error);
      alert('Error loading order history. Please try again.');
    }
  }
  
  return showOrderHistory;
}

function createCloseOrderHistoryFunction() {
  function closeOrderHistory() {
    console.log('📋 Closing My Orders modal...');
    
    try {
      const modal = document.getElementById('orderHistoryModal');
      if (modal) {
        // Animate out
        modal.style.transition = 'all 0.3s ease';
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
          modal.style.display = 'none';
        }, 300);
        
        console.log('✅ Order history modal closed');
      }
    } catch (error) {
      console.error('❌ Error closing order history:', error);
    }
  }
  
  return closeOrderHistory;
}

function loadOrderHistoryData() {
  console.log('📊 Loading order history data...');
  
  try {
    // Check for stored orders in localStorage
    const storedOrders = JSON.parse(localStorage.getItem('visualVibeOrders') || '[]');
    
    const contentDiv = document.getElementById('orderHistoryContent');
    if (!contentDiv) return;
    
    if (storedOrders.length === 0) {
      // Already shows "No Orders Yet" message
      console.log('📋 No orders found in localStorage');
      return;
    }
    
    // Display orders
    contentDiv.innerHTML = `
      <div class="space-y-4">
        ${storedOrders.map((order, index) => `
          <div class="border border-gray-200 rounded-lg p-4">
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-semibold text-gray-900">Order #${order.id || (index + 1)}</h3>
              <span class="text-sm text-gray-500">${order.date || 'Recent'}</span>
            </div>
            <p class="text-gray-600 mb-2">${order.service || 'Custom Service'}</p>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500">Status: ${order.status || 'Pending'}</span>
              <span class="font-semibold text-purple-600">${order.amount || 'Quote Pending'}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    
    console.log(`✅ Displayed ${storedOrders.length} orders`);
    
  } catch (error) {
    console.error('❌ Error loading order history data:', error);
    
    const contentDiv = document.getElementById('orderHistoryContent');
    if (contentDiv) {
      contentDiv.innerHTML = `
        <div class="text-center py-8">
          <div class="text-4xl mb-4">❌</div>
          <p class="text-gray-500">Error loading order history</p>
        </div>
      `;
    }
  }
}

// Install the functions globally
function installOrderHistoryFunctions() {
  console.log('📦 Installing order history functions...');
  
  const showOrderHistoryFunction = createShowOrderHistoryFunction();
  const closeOrderHistoryFunction = createCloseOrderHistoryFunction();
  
  // Multiple installation methods for maximum compatibility
  window.showOrderHistory = showOrderHistoryFunction;
  window.closeOrderHistory = closeOrderHistoryFunction;
  
  window['showOrderHistory'] = showOrderHistoryFunction;
  window['closeOrderHistory'] = closeOrderHistoryFunction;
  
  // Global scope assignment
  if (typeof global !== 'undefined') {
    global.showOrderHistory = showOrderHistoryFunction;
    global.closeOrderHistory = closeOrderHistoryFunction;
  }
  
  console.log('✅ Order history functions installed');
}

// Continuous protection - reinstall if someone overwrites them
function protectOrderHistoryFunctions() {
  console.log('🛡️ Setting up order history function protection...');
  
  let protectionCount = 0;
  const maxProtections = 30; // Protect for 30 seconds
  
  const protectionInterval = setInterval(() => {
    if (typeof window.showOrderHistory !== 'function') {
      console.warn('🛡️ showOrderHistory function missing, reinstalling...');
      installOrderHistoryFunctions();
    }
    
    if (typeof window.closeOrderHistory !== 'function') {
      console.warn('🛡️ closeOrderHistory function missing, reinstalling...');
      installOrderHistoryFunctions();
    }
    
    protectionCount++;
    if (protectionCount >= maxProtections) {
      clearInterval(protectionInterval);
      console.log('🛡️ Order history function protection period ended');
    }
  }, 1000);
}

// Initialize
function initializeOrderHistoryFix() {
  console.log('🚀 Initializing order history function fix...');
  
  // Install functions immediately
  installOrderHistoryFunctions();
  
  // Set up protection
  protectOrderHistoryFunctions();
  
  // Verify installation
  setTimeout(() => {
    console.log('🔍 VERIFICATION:');
    console.log('  showOrderHistory type:', typeof window.showOrderHistory);
    console.log('  closeOrderHistory type:', typeof window.closeOrderHistory);
    
    if (typeof window.showOrderHistory === 'function' && typeof window.closeOrderHistory === 'function') {
      console.log('✅ Order history functions are properly available');
    } else {
      console.error('❌ Order history function installation failed');
    }
  }, 500);
}

// Test function
window.testOrderHistoryFunctions = function() {
  console.log('🧪 Testing order history functions...');
  
  const showAvailable = typeof window.showOrderHistory === 'function';
  const closeAvailable = typeof window.closeOrderHistory === 'function';
  
  console.log('Show function available:', showAvailable);
  console.log('Close function available:', closeAvailable);
  
  if (showAvailable) {
    console.log('✅ Test: Opening order history...');
    window.showOrderHistory();
    
    setTimeout(() => {
      if (closeAvailable) {
        console.log('✅ Test: Closing order history...');
        window.closeOrderHistory();
      }
    }, 2000);
  }
  
  return { showAvailable, closeAvailable };
};

// Initialize immediately
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeOrderHistoryFix);
} else {
  initializeOrderHistoryFix();
}

setTimeout(initializeOrderHistoryFix, 1000);

console.log('📋 Order history function fix loaded - showOrderHistory should now be available');
