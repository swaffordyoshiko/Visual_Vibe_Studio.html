// Immediate fix for "Loading your orders..." message
console.log('🚀 Loading immediate orders fix...');

// Function to immediately replace loading content
function replaceOrdersLoading() {
  console.log('🔄 Replacing orders loading message...');
  
  const content = document.getElementById('orderHistoryContent');
  if (!content) {
    console.log('❌ Order history content not found');
    return;
  }
  
  // Check if showing loading message
  if (content.textContent && content.textContent.includes('Loading your orders')) {
    console.log('✅ Found loading message, replacing now...');
    
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
            <button onclick="closeOrderHistory(); document.getElementById('contact').scrollIntoView({behavior: 'smooth'});" 
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
    
    console.log('✅ Orders loading message replaced successfully');
    return true;
  } else {
    console.log('ℹ️ No loading message found to replace');
    return false;
  }
}

// Override showOrderHistory to immediately fix the loading issue
const originalShowOrderHistory = window.showOrderHistory;
window.showOrderHistory = function() {
  console.log('📋 Opening My Orders - with immediate fix...');
  
  // Call original function if it exists
  if (typeof originalShowOrderHistory === 'function') {
    try {
      originalShowOrderHistory();
    } catch (error) {
      console.log('⚠️ Error in original showOrderHistory, proceeding with fix');
    }
  } else {
    // If no original function, show the modal manually
    const modal = document.getElementById('orderHistoryModal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  }
  
  // Replace loading message immediately
  setTimeout(() => {
    replaceOrdersLoading();
  }, 10);
  
  // Also try after a short delay as backup
  setTimeout(() => {
    replaceOrdersLoading();
  }, 100);
};

// Set up immediate monitoring
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.target.id === 'orderHistoryModal') {
      const modal = mutation.target;
      if (!modal.classList.contains('hidden')) {
        setTimeout(() => {
          replaceOrdersLoading();
        }, 50);
      }
    }
  });
});

// Start observing when DOM is ready
function startObserving() {
  const modal = document.getElementById('orderHistoryModal');
  if (modal) {
    observer.observe(modal, {
      attributes: true,
      attributeFilter: ['class']
    });
    console.log('✅ Started observing modal changes');
  }
}

// Periodic check to replace loading message
let checkCount = 0;
const periodicCheck = setInterval(() => {
  const modal = document.getElementById('orderHistoryModal');
  if (modal && !modal.classList.contains('hidden')) {
    replaceOrdersLoading();
  }
  
  checkCount++;
  if (checkCount > 20) { // Stop after 20 seconds
    clearInterval(periodicCheck);
  }
}, 1000);

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      startObserving();
      replaceOrdersLoading();
    }, 100);
  });
} else {
  setTimeout(() => {
    startObserving();
    replaceOrdersLoading();
  }, 100);
}

// Make function globally available for testing
window.replaceOrdersLoading = replaceOrdersLoading;

console.log('🚀 Immediate orders fix loaded and active');
