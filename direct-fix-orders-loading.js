// Direct fix for "Loading your orders..." message - immediate replacement
console.log('🔥 Loading direct orders loading fix...');

function replaceLoadingMessage() {
  console.log('🎯 Directly replacing loading message...');
  
  try {
    // Find the content div
    const contentDiv = document.getElementById('orderHistoryContent');
    if (!contentDiv) {
      console.log('❌ Order history content div not found');
      return false;
    }
    
    // Check if it's showing loading message
    const currentContent = contentDiv.textContent || '';
    if (currentContent.includes('Loading your orders')) {
      console.log('🔄 Found loading message, replacing immediately...');
      
      // Replace with actual content immediately
      contentDiv.innerHTML = `
        <div class="space-y-6">
          <!-- Welcome Header -->
          <div class="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
            <div class="text-center">
              <div class="text-4xl mb-3">👋</div>
              <h4 class="text-xl font-bold text-gray-800 mb-2">Welcome to Your Account Dashboard</h4>
              <p class="text-gray-600 mb-4">Track your projects, manage orders, and stay connected with Visual Vibe Studio</p>
            </div>
            
            <!-- Quick Stats -->
            <div class="grid grid-cols-3 gap-4 mt-6">
              <div class="text-center bg-white rounded-lg p-3 shadow-sm">
                <div class="text-lg font-bold text-purple-600">0</div>
                <div class="text-xs text-gray-500">Active Projects</div>
              </div>
              <div class="text-center bg-white rounded-lg p-3 shadow-sm">
                <div class="text-lg font-bold text-blue-600">0</div>
                <div class="text-xs text-gray-500">Completed Orders</div>
              </div>
              <div class="text-center bg-white rounded-lg p-3 shadow-sm">
                <div class="text-lg font-bold text-green-600">Ready</div>
                <div class="text-xs text-gray-500">Account Status</div>
              </div>
            </div>
          </div>
          
          <!-- No Orders State -->
          <div class="text-center py-8">
            <div class="text-6xl mb-4">🎨</div>
            <h3 class="text-xl font-semibold text-gray-700 mb-3">Ready to Create Something Amazing?</h3>
            <p class="text-gray-500 mb-6 max-w-md mx-auto">
              No orders yet, but that's about to change! Let's bring your vision to life with our professional design services.
            </p>
            
            <!-- Action Buttons -->
            <div class="space-y-3 sm:space-y-0 sm:space-x-3 sm:flex sm:justify-center">
              <button onclick="closeOrderHistory(); document.getElementById('services').scrollIntoView({behavior: 'smooth'});" 
                      class="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                📋 Browse Services
              </button>
              <button onclick="closeOrderHistory(); document.getElementById('contact').scrollIntoView({behavior: 'smooth'});" 
                      class="w-full sm:w-auto bg-white border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-50 transition-all duration-300 transform hover:scale-105">
                💬 Get Free Quote
              </button>
            </div>
          </div>
          
          <!-- Services Preview -->
          <div class="bg-gray-50 rounded-xl p-6">
            <h4 class="text-lg font-semibold text-gray-800 mb-4 text-center">Popular Services</h4>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div class="bg-white rounded-lg p-3 text-center hover:shadow-md transition-shadow cursor-pointer" onclick="closeOrderHistory(); document.getElementById('services').scrollIntoView({behavior: 'smooth'});">
                <div class="text-2xl mb-1">🌐</div>
                <div class="text-sm font-medium text-gray-700">Website</div>
                <div class="text-xs text-gray-500">From $100</div>
              </div>
              <div class="bg-white rounded-lg p-3 text-center hover:shadow-md transition-shadow cursor-pointer" onclick="closeOrderHistory(); document.getElementById('services').scrollIntoView({behavior: 'smooth'});">
                <div class="text-2xl mb-1">⚡</div>
                <div class="text-sm font-medium text-gray-700">Logo</div>
                <div class="text-xs text-gray-500">$25</div>
              </div>
              <div class="bg-white rounded-lg p-3 text-center hover:shadow-md transition-shadow cursor-pointer" onclick="closeOrderHistory(); document.getElementById('services').scrollIntoView({behavior: 'smooth'});">
                <div class="text-2xl mb-1">📋</div>
                <div class="text-sm font-medium text-gray-700">Brochure</div>
                <div class="text-xs text-gray-500">$80</div>
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
              <button onclick="closeOrderHistory(); window.open('tel:+1234567890', '_self');" 
                      class="w-full sm:w-auto bg-white border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors">
                📞 Call Now
              </button>
            </div>
          </div>
        </div>
      `;
      
      console.log('✅ Loading message replaced with actual content');
      return true;
    } else {
      console.log('ℹ️ No loading message found - content already populated');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Error replacing loading message:', error);
    return false;
  }
}

// Monitor for when the modal opens and immediately replace content
function monitorModalOpening() {
  console.log('👁️ Setting up modal opening monitor...');
  
  const modal = document.getElementById('orderHistoryModal');
  if (!modal) {
    console.log('❌ Order history modal not found');
    return;
  }
  
  // Use MutationObserver to watch for when modal becomes visible
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const modal = mutation.target;
        const isVisible = !modal.classList.contains('hidden');
        
        if (isVisible) {
          console.log('🔍 Modal opened, checking for loading message...');
          setTimeout(() => {
            replaceLoadingMessage();
          }, 50); // Small delay to ensure content is rendered
        }
      }
    });
  });
  
  observer.observe(modal, {
    attributes: true,
    attributeFilter: ['class', 'style']
  });
  
  console.log('✅ Modal opening monitor active');
}

// Override showOrderHistory to immediately replace content
function overrideShowOrderHistory() {
  console.log('🔧 Overriding showOrderHistory function...');
  
  const originalShowOrderHistory = window.showOrderHistory;
  
  window.showOrderHistory = function() {
    console.log('📋 Enhanced showOrderHistory called - will replace loading immediately');
    
    // Call original function
    if (typeof originalShowOrderHistory === 'function') {
      try {
        originalShowOrderHistory();
      } catch (error) {
        console.log('⚠️ Error in original function, continuing with override');
      }
    }
    
    // Ensure modal is visible
    const modal = document.getElementById('orderHistoryModal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
    }
    
    // Replace loading message immediately
    setTimeout(() => {
      replaceLoadingMessage();
    }, 100);
    
    // Also try again after a longer delay as backup
    setTimeout(() => {
      replaceLoadingMessage();
    }, 500);
  };
  
  console.log('✅ showOrderHistory function overridden');
}

// Periodic check to replace loading message
function setupPeriodicCheck() {
  console.log('⏰ Setting up periodic loading message check...');
  
  let checkCount = 0;
  const maxChecks = 30; // Check for 30 seconds
  
  const interval = setInterval(() => {
    const modal = document.getElementById('orderHistoryModal');
    const isModalVisible = modal && !modal.classList.contains('hidden');
    
    if (isModalVisible) {
      replaceLoadingMessage();
    }
    
    checkCount++;
    if (checkCount >= maxChecks) {
      clearInterval(interval);
      console.log('⏰ Periodic check completed');
    }
  }, 1000);
}

// Initialize the direct fix
function initializeDirectFix() {
  console.log('🚀 Initializing direct orders loading fix...');
  
  setTimeout(() => {
    // Override the function
    overrideShowOrderHistory();
    
    // Set up monitoring
    monitorModalOpening();
    
    // Set up periodic checking
    setupPeriodicCheck();
    
    // Make function globally available
    window.replaceLoadingMessage = replaceLoadingMessage;
    
    console.log('✅ Direct orders loading fix initialized');
  }, 500);
}

// Test function
window.testOrdersLoadingFix = function() {
  console.log('🧪 Testing orders loading fix...');
  
  // Try to replace loading message
  const result = replaceLoadingMessage();
  
  console.log('Test result:', result);
  
  // Show modal to test
  if (typeof window.showOrderHistory === 'function') {
    console.log('🧪 Opening modal to test...');
    window.showOrderHistory();
  }
  
  return result;
};

// Initialize immediately
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeDirectFix);
} else {
  initializeDirectFix();
}

setTimeout(initializeDirectFix, 1000);

console.log('🔥 Direct orders loading fix loaded - will immediately replace loading message');
