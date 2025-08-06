// Fix order history modal to show actual content instead of loading message
console.log('📋 Loading order history content fix...');

function loadActualOrderHistory() {
  console.log('📊 Loading actual order history content...');
  
  try {
    const orderHistoryContent = document.getElementById('orderHistoryContent');
    if (!orderHistoryContent) {
      console.error('❌ Order history content div not found');
      return false;
    }
    
    // Check for stored orders
    const storedOrders = JSON.parse(localStorage.getItem('visualVibeOrders') || '[]');
    const storedContacts = JSON.parse(localStorage.getItem('visualVibeContacts') || '[]');
    const storedReviews = JSON.parse(localStorage.getItem('visualVibeReviews') || '[]');
    
    console.log(`📋 Found ${storedOrders.length} orders, ${storedContacts.length} contacts, ${storedReviews.length} reviews`);
    
    // If no data exists, show welcome state
    if (storedOrders.length === 0 && storedContacts.length === 0 && storedReviews.length === 0) {
      orderHistoryContent.innerHTML = `
        <div class="text-center py-12">
          <div class="text-6xl mb-6">🎯</div>
          <h3 class="text-xl font-semibold text-gray-700 mb-3">Ready to Start Your Project?</h3>
          <p class="text-gray-500 mb-6 max-w-md mx-auto">
            No orders yet, but we're excited to help bring your vision to life! 
            Start by getting a quote for your next project.
          </p>
          <div class="space-y-3">
            <button onclick="closeOrderHistory(); document.getElementById('contactForm').scrollIntoView();" 
                    class="block w-full sm:inline-block sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 mb-3 sm:mb-0 sm:mr-3">
              Get Free Quote
            </button>
            <button onclick="closeOrderHistory(); document.querySelector('#reviewForm').scrollIntoView();" 
                    class="block w-full sm:inline-block sm:w-auto bg-white border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-50 transition-all duration-300">
              Leave a Review
            </button>
          </div>
        </div>
      `;
      
      console.log('✅ Displayed welcome state for new users');
      return true;
    }
    
    // Build content with actual data
    let contentHTML = '<div class="space-y-6">';
    
    // Show recent activity summary
    contentHTML += `
      <div class="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-100">
        <h4 class="text-lg font-semibold text-gray-800 mb-2">Account Summary</h4>
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <div class="text-2xl font-bold text-purple-600">${storedOrders.length || 0}</div>
            <div class="text-sm text-gray-600">Orders</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-blue-600">${storedContacts.length || 0}</div>
            <div class="text-sm text-gray-600">Inquiries</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-green-600">${storedReviews.length || 0}</div>
            <div class="text-sm text-gray-600">Reviews</div>
          </div>
        </div>
      </div>
    `;
    
    // Show orders if any
    if (storedOrders.length > 0) {
      contentHTML += `
        <div>
          <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            📦 Recent Orders
          </h4>
          <div class="space-y-3">
      `;
      
      storedOrders.slice(0, 5).forEach((order, index) => {
        const orderDate = order.date || order.timestamp || 'Recent';
        const orderService = order.service || order.projectType || 'Custom Service';
        const orderStatus = order.status || 'Pending Review';
        const orderId = order.id || `ORD-${Date.now()}-${index}`;
        
        contentHTML += `
          <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start mb-2">
              <div>
                <h5 class="font-semibold text-gray-900">Order #${orderId}</h5>
                <p class="text-gray-600 text-sm">${orderService}</p>
              </div>
              <span class="text-xs text-gray-500">${orderDate}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                ${orderStatus}
              </span>
              <span class="text-sm font-semibold text-purple-600">Quote Pending</span>
            </div>
          </div>
        `;
      });
      
      contentHTML += '</div></div>';
    }
    
    // Show recent contacts/inquiries
    if (storedContacts.length > 0) {
      contentHTML += `
        <div>
          <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            💬 Recent Inquiries
          </h4>
          <div class="space-y-3">
      `;
      
      storedContacts.slice(0, 3).forEach((contact, index) => {
        const contactDate = contact.date || contact.timestamp || 'Recent';
        const contactName = contact.name || 'Customer';
        const contactMessage = contact.message || contact.text || 'Inquiry submitted';
        
        contentHTML += `
          <div class="border border-gray-200 rounded-lg p-4">
            <div class="flex justify-between items-start mb-2">
              <h5 class="font-semibold text-gray-900">${contactName}</h5>
              <span class="text-xs text-gray-500">${contactDate}</span>
            </div>
            <p class="text-gray-600 text-sm">${contactMessage.substring(0, 100)}${contactMessage.length > 100 ? '...' : ''}</p>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
              Response Pending
            </span>
          </div>
        `;
      });
      
      contentHTML += '</div></div>';
    }
    
    // Show recent reviews
    if (storedReviews.length > 0) {
      contentHTML += `
        <div>
          <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            ⭐ Your Reviews
          </h4>
          <div class="space-y-3">
      `;
      
      storedReviews.slice(0, 3).forEach((review, index) => {
        const reviewDate = review.date || review.timestamp || 'Recent';
        const reviewName = review.name || 'Anonymous';
        const reviewText = review.text || 'Review submitted';
        const reviewRating = review.rating || 5;
        const stars = '⭐'.repeat(reviewRating);
        
        contentHTML += `
          <div class="border border-gray-200 rounded-lg p-4">
            <div class="flex justify-between items-start mb-2">
              <div>
                <h5 class="font-semibold text-gray-900">${reviewName}</h5>
                <div class="text-yellow-400">${stars}</div>
              </div>
              <span class="text-xs text-gray-500">${reviewDate}</span>
            </div>
            <p class="text-gray-600 text-sm">${reviewText.substring(0, 100)}${reviewText.length > 100 ? '...' : ''}</p>
          </div>
        `;
      });
      
      contentHTML += '</div></div>';
    }
    
    // Add action buttons
    contentHTML += `
      <div class="bg-gray-50 rounded-xl p-4 text-center">
        <h4 class="text-lg font-semibold text-gray-800 mb-3">Need Help?</h4>
        <div class="space-y-2 sm:space-y-0 sm:space-x-3 sm:flex sm:justify-center">
          <button onclick="closeOrderHistory(); document.getElementById('contactForm').scrollIntoView();" 
                  class="block w-full sm:inline-block sm:w-auto bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            Contact Support
          </button>
          <button onclick="closeOrderHistory(); window.location.href='tel:+1234567890';" 
                  class="block w-full sm:inline-block sm:w-auto bg-white border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
            Call Us
          </button>
        </div>
      </div>
    `;
    
    contentHTML += '</div>';
    
    // Update the content
    orderHistoryContent.innerHTML = contentHTML;
    
    console.log('✅ Order history content populated successfully');
    return true;
    
  } catch (error) {
    console.error('❌ Error loading order history content:', error);
    
    // Fallback content
    const orderHistoryContent = document.getElementById('orderHistoryContent');
    if (orderHistoryContent) {
      orderHistoryContent.innerHTML = `
        <div class="text-center py-8">
          <div class="text-4xl mb-4">❌</div>
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Unable to Load Orders</h3>
          <p class="text-gray-500 mb-4">There was an error loading your order history.</p>
          <button onclick="loadActualOrderHistory()" 
                  class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            Try Again
          </button>
        </div>
      `;
    }
    
    return false;
  }
}

// Override the existing showOrderHistory function to populate content
function enhanceShowOrderHistory() {
  console.log('🔧 Enhancing showOrderHistory function...');
  
  const originalShowOrderHistory = window.showOrderHistory;
  
  window.showOrderHistory = function() {
    console.log('📋 Enhanced showOrderHistory called');
    
    // Call original function if it exists
    if (typeof originalShowOrderHistory === 'function') {
      try {
        originalShowOrderHistory();
      } catch (error) {
        console.error('❌ Error in original showOrderHistory:', error);
      }
    }
    
    // Show the modal if it's not already visible
    const modal = document.getElementById('orderHistoryModal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
    }
    
    // Load actual content after a brief delay
    setTimeout(() => {
      loadActualOrderHistory();
    }, 100);
  };
  
  console.log('✅ showOrderHistory function enhanced');
}

// Initialize the fix
function initializeOrderHistoryContentFix() {
  console.log('🚀 Initializing order history content fix...');
  
  setTimeout(() => {
    // Enhance the showOrderHistory function
    enhanceShowOrderHistory();
    
    // Make loadActualOrderHistory globally available
    window.loadActualOrderHistory = loadActualOrderHistory;
    
    console.log('✅ Order history content fix initialized');
  }, 1000);
}

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeOrderHistoryContentFix);
} else {
  initializeOrderHistoryContentFix();
}

setTimeout(initializeOrderHistoryContentFix, 1500);

console.log('📋 Order history content fix loaded - will show actual content instead of loading message');
