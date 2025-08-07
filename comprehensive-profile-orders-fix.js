// COMPREHENSIVE FIX - Profile Modal + Photo Display + My Orders
console.log('🎯 Loading comprehensive fix for profile and orders...');

(function() {
  'use strict';
  
  let isFixApplied = false;
  
  function applyComprehensiveFix() {
    if (isFixApplied) return;
    isFixApplied = true;
    
    console.log('🔧 Applying comprehensive fix...');
    
    // 1. FIX PROFILE MODAL AUTO-OPENING
    fixProfileModalAutoOpening();
    
    // 2. FIX PROFILE PHOTO DISPLAY
    fixProfilePhotoDisplay();
    
    // 3. FIX MY ORDERS FUNCTIONALITY
    fixMyOrdersComplete();
    
    console.log('✅ Comprehensive fix applied successfully');
  }
  
  // === PROFILE MODAL AUTO-OPENING FIX ===
  function fixProfileModalAutoOpening() {
    console.log('🚫 Preventing profile modal auto-opening...');
    
    // Store original function but only allow explicit user clicks
    const originalOpenProfileModal = window.openProfileModal;
    
    window.openProfileModal = function(userInitiated = false) {
      // Only open if explicitly called by user click
      if (!userInitiated) {
        console.log('🚫 Blocked automatic profile modal opening');
        return;
      }
      
      console.log('👤 Opening profile modal (user clicked)...');
      
      try {
        const modal = document.getElementById('profileModal');
        if (!modal) {
          alert('Profile editor not available. Please refresh the page.');
          return;
        }
        
        if (!window.currentUser) {
          alert('Please sign in to edit your profile.');
          return;
        }
        
        // Load user data
        loadUserDataIntoProfileForm();
        
        // Show modal
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        console.log('✅ Profile modal opened by user click');
        
      } catch (error) {
        console.error('❌ Error opening profile modal:', error);
        alert('Error opening profile editor. Please try again.');
      }
    };
    
    // Update all profile buttons to pass userInitiated flag
    setTimeout(() => {
      const profileButtons = document.querySelectorAll('button[onclick*="openProfileModal"]');
      profileButtons.forEach(button => {
        button.onclick = function(e) {
          e.preventDefault();
          window.openProfileModal(true); // Pass true for user-initiated
        };
        console.log('✅ Updated profile button click handler');
      });
    }, 500);
    
    console.log('✅ Profile modal auto-opening prevention active');
  }
  
  // === PROFILE PHOTO DISPLAY FIX ===
  function fixProfilePhotoDisplay() {
    console.log('🖼️ Fixing profile photo display...');
    
    function updateProfileButtonWithPhoto() {
      const savedPhoto = localStorage.getItem('visualVibeProfilePicture');
      
      // Desktop profile button
      const profileButton = document.querySelector('button[onclick*="openProfileModal"]');
      if (profileButton) {
        const iconContainer = profileButton.querySelector('.bg-indigo-100, div:first-child');
        
        if (savedPhoto && iconContainer) {
          // Replace with profile photo
          iconContainer.outerHTML = `
            <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-200 group-hover:border-indigo-300 transition-colors">
              <img src="${savedPhoto}" alt="Profile Photo" class="w-full h-full object-cover">
            </div>
          `;
          console.log('✅ Desktop profile button updated with photo');
          
        } else if (iconContainer && window.currentUser) {
          // Show initials if no photo
          const initials = getInitials(window.currentUser.name || 'User');
          iconContainer.outerHTML = `
            <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold group-hover:opacity-90 transition-opacity border-2 border-indigo-200">
              ${initials}
            </div>
          `;
          console.log('✅ Desktop profile button updated with initials');
        }
      }
      
      // Mobile profile button
      const mobileButton = document.querySelector('button[onclick*="openProfileModal(); closeMobileMenu()"]');
      if (mobileButton) {
        const iconContainer = mobileButton.querySelector('svg')?.parentElement;
        
        if (savedPhoto && iconContainer) {
          iconContainer.innerHTML = `
            <img src="${savedPhoto}" alt="Profile Photo" class="w-6 h-6 rounded-full object-cover border border-gray-300">
          `;
          console.log('✅ Mobile profile button updated with photo');
          
        } else if (iconContainer && window.currentUser) {
          const initials = getInitials(window.currentUser.name || 'User');
          iconContainer.innerHTML = `
            <div class="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              ${initials}
            </div>
          `;
          console.log('✅ Mobile profile button updated with initials');
        }
      }
    }
    
    function getInitials(name) {
      if (!name) return 'U';
      return name.split(' ')
        .filter(n => n.length > 0)
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    
    // Update immediately and when user changes
    updateProfileButtonWithPhoto();
    
    // Monitor for changes
    const observer = new MutationObserver(updateProfileButtonWithPhoto);
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    }
    
    // Make function globally available
    window.updateProfilePhotoDisplay = updateProfileButtonWithPhoto;
    
    console.log('✅ Profile photo display fix active');
  }
  
  // === MY ORDERS COMPLETE FIX ===
  function fixMyOrdersComplete() {
    console.log('📋 Fixing My Orders complete functionality...');
    
    // Override showOrderHistory with comprehensive version
    window.showOrderHistory = function() {
      console.log('📋 Opening My Orders (COMPREHENSIVE)...');
      
      try {
        // Ensure user is signed in
        if (!window.currentUser) {
          try {
            const savedUser = localStorage.getItem('visualVibeUser');
            if (savedUser) {
              window.currentUser = JSON.parse(savedUser);
              console.log('✅ Restored user session:', window.currentUser.name);
            } else {
              alert('Please sign in to view your orders.');
              return;
            }
          } catch (e) {
            alert('Please sign in to view your orders.');
            return;
          }
        }
        
        // Create comprehensive modal
        createComprehensiveOrdersModal();
        
        // Show modal
        const modal = document.getElementById('orderHistoryModal');
        if (modal) {
          modal.classList.remove('hidden');
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        }
        
        // Load all data
        loadComprehensiveOrderData();
        
        console.log('✅ Comprehensive My Orders opened');
        
      } catch (error) {
        console.error('❌ Error opening My Orders:', error);
        alert('Error opening My Orders. Please try again.');
      }
    };
    
    function createComprehensiveOrdersModal() {
      // Remove existing modal
      const existingModal = document.getElementById('orderHistoryModal');
      if (existingModal) {
        existingModal.remove();
      }
      
      const modal = document.createElement('div');
      modal.id = 'orderHistoryModal';
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
      
      modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] flex flex-col shadow-2xl">
          <!-- Header -->
          <div class="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-xl">
            <h3 class="text-2xl font-bold">📋 My Account Dashboard</h3>
            <button onclick="closeOrderHistory()" class="text-white/80 hover:text-white p-2 transition-colors rounded-lg hover:bg-white/10">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <!-- Tabs -->
          <div class="flex border-b border-gray-200 bg-gray-50">
            <button onclick="switchOrderTab('orders')" id="tab-orders" class="px-6 py-3 font-medium text-sm border-b-2 border-indigo-500 text-indigo-600 bg-white">
              📦 Orders
            </button>
            <button onclick="switchOrderTab('receipts')" id="tab-receipts" class="px-6 py-3 font-medium text-sm border-b-2 border-transparent text-gray-500 hover:text-gray-700">
              🧾 Receipts
            </button>
            <button onclick="switchOrderTab('reviews')" id="tab-reviews" class="px-6 py-3 font-medium text-sm border-b-2 border-transparent text-gray-500 hover:text-gray-700">
              ⭐ Reviews
            </button>
          </div>
          
          <!-- Content -->
          <div id="orderTabContent" class="flex-1 overflow-y-auto p-6">
            <div class="text-center py-12">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-6"></div>
              <h4 class="text-xl font-semibold text-gray-700 mb-2">Loading Your Data...</h4>
              <p class="text-gray-500">Please wait while we fetch your information.</p>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="border-t border-gray-200 p-6 bg-gray-50 rounded-b-xl">
            <div class="flex flex-wrap gap-3 justify-center">
              <button onclick="createSampleData()" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                🧪 Create Sample Data
              </button>
              <button onclick="refreshOrderData()" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                🔄 Refresh Data
              </button>
              <button onclick="exportAllData()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                📤 Export Data
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
      console.log('✅ Comprehensive orders modal created');
    }
    
    function loadComprehensiveOrderData() {
      console.log('📊 Loading comprehensive order data...');
      
      try {
        // Get all data sources
        let orders = getAllUserOrders();
        let receipts = getAllUserReceipts();
        let reviews = getAllUserReviews();
        
        console.log(`📦 Found ${orders.length} orders`);
        console.log(`🧾 Found ${receipts.length} receipts`);
        console.log(`⭐ Found ${reviews.length} reviews`);
        
        // Show orders tab by default
        switchOrderTab('orders');
        
      } catch (error) {
        console.error('❌ Error loading comprehensive data:', error);
        showErrorContent();
      }
    }
    
    function getAllUserOrders() {
      let allOrders = [];
      
      try {
        // User account orders
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        const user = users.find(u => u.id === window.currentUser.id);
        if (user && user.orders) {
          allOrders.push(...user.orders);
        }
        
        // Pending orders
        const pendingOrders = JSON.parse(localStorage.getItem('pendingOrders') || '[]');
        const userPendingOrders = pendingOrders.filter(order => 
          (order.email && order.email.toLowerCase() === window.currentUser.email.toLowerCase()) ||
          (order.phone && order.phone === window.currentUser.phone) ||
          (order.userId === window.currentUser.id)
        );
        
        userPendingOrders.forEach(pendingOrder => {
          if (!allOrders.find(order => order.orderNumber === pendingOrder.orderNumber)) {
            allOrders.push(pendingOrder);
          }
        });
        
        // Legacy storage
        const legacyKeys = ['visualVibeOrders', 'customerOrders', 'orders'];
        legacyKeys.forEach(key => {
          try {
            const legacyOrders = JSON.parse(localStorage.getItem(key) || '[]');
            const userLegacyOrders = legacyOrders.filter(order =>
              (order.email && order.email.toLowerCase() === window.currentUser.email.toLowerCase()) ||
              (order.userId === window.currentUser.id)
            );
            
            userLegacyOrders.forEach(legacyOrder => {
              if (!allOrders.find(order => order.orderNumber === legacyOrder.orderNumber)) {
                allOrders.push(legacyOrder);
              }
            });
          } catch (e) {
            console.error(`Error checking ${key}:`, e);
          }
        });
        
      } catch (error) {
        console.error('Error getting user orders:', error);
      }
      
      return allOrders.sort((a, b) => new Date(b.date || b.createdAt || 0) - new Date(a.date || a.createdAt || 0));
    }
    
    function getAllUserReceipts() {
      // For now, receipts are the same as orders but formatted differently
      return getAllUserOrders().map(order => ({
        ...order,
        receiptNumber: `RCP-${order.orderNumber}`,
        receiptDate: order.date || order.createdAt,
        amount: order.amount || '$50.00'
      }));
    }
    
    function getAllUserReviews() {
      let allReviews = [];
      
      try {
        // Get from reviews storage
        const reviewsKeys = ['visualVibeReviews', 'customerReviews', 'reviews'];
        reviewsKeys.forEach(key => {
          try {
            const reviews = JSON.parse(localStorage.getItem(key) || '[]');
            const userReviews = reviews.filter(review =>
              (review.email && review.email.toLowerCase() === window.currentUser.email.toLowerCase()) ||
              (review.userId === window.currentUser.id) ||
              (review.customerName && review.customerName.toLowerCase().includes(window.currentUser.name?.toLowerCase() || ''))
            );
            
            userReviews.forEach(review => {
              if (!allReviews.find(r => r.id === review.id || r.text === review.text)) {
                allReviews.push(review);
              }
            });
          } catch (e) {
            console.error(`Error checking ${key}:`, e);
          }
        });
        
      } catch (error) {
        console.error('Error getting user reviews:', error);
      }
      
      return allReviews.sort((a, b) => new Date(b.date || b.createdAt || 0) - new Date(a.date || a.createdAt || 0));
    }
    
    // Tab switching functionality
    window.switchOrderTab = function(tabName) {
      console.log(`📑 Switching to ${tabName} tab`);
      
      // Update tab buttons
      const tabs = ['orders', 'receipts', 'reviews'];
      tabs.forEach(tab => {
        const tabButton = document.getElementById(`tab-${tab}`);
        if (tabButton) {
          if (tab === tabName) {
            tabButton.className = 'px-6 py-3 font-medium text-sm border-b-2 border-indigo-500 text-indigo-600 bg-white';
          } else {
            tabButton.className = 'px-6 py-3 font-medium text-sm border-b-2 border-transparent text-gray-500 hover:text-gray-700';
          }
        }
      });
      
      // Update content
      const content = document.getElementById('orderTabContent');
      if (!content) return;
      
      switch (tabName) {
        case 'orders':
          showOrdersContent(content);
          break;
        case 'receipts':
          showReceiptsContent(content);
          break;
        case 'reviews':
          showReviewsContent(content);
          break;
        default:
          showOrdersContent(content);
      }
    };
    
    function showOrdersContent(content) {
      const orders = getAllUserOrders();
      
      if (orders.length === 0) {
        content.innerHTML = `
          <div class="text-center py-12">
            <div class="text-8xl mb-6">📦</div>
            <h4 class="text-2xl font-bold text-gray-700 mb-4">No Orders Found</h4>
            <p class="text-gray-600 mb-8">You haven't placed any orders yet.</p>
            <button onclick="createSampleData()" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Create Sample Order
            </button>
          </div>
        `;
        return;
      }
      
      const ordersHTML = orders.map(order => `
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h4 class="text-lg font-semibold text-gray-800">Order #${order.orderNumber || 'N/A'}</h4>
              <p class="text-sm text-gray-500">${new Date(order.date || order.createdAt || Date.now()).toLocaleDateString()}</p>
            </div>
            <span class="px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status || 'pending')}">
              ${(order.status || 'pending').charAt(0).toUpperCase() + (order.status || 'pending').slice(1)}
            </span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="text-sm font-medium text-gray-600">Service:</label>
              <p class="text-gray-800">${order.serviceType || order.service || 'Custom Service'}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-600">Business:</label>
              <p class="text-gray-800">${order.businessName || order.companyName || 'N/A'}</p>
            </div>
          </div>
          <div class="flex gap-3 pt-4 border-t border-gray-100">
            <button onclick="downloadReceipt('${order.orderNumber}')" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm">
              📄 Download Receipt
            </button>
            <button onclick="viewOrderDetails('${order.orderNumber}')" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm">
              👁️ View Details
            </button>
          </div>
        </div>
      `).join('');
      
      content.innerHTML = `
        <div class="space-y-4">
          <h4 class="text-xl font-bold text-gray-800">Your Orders (${orders.length})</h4>
          <div class="space-y-4">${ordersHTML}</div>
        </div>
      `;
    }
    
    function showReceiptsContent(content) {
      const receipts = getAllUserReceipts();
      
      if (receipts.length === 0) {
        content.innerHTML = `
          <div class="text-center py-12">
            <div class="text-8xl mb-6">🧾</div>
            <h4 class="text-2xl font-bold text-gray-700 mb-4">No Receipts Found</h4>
            <p class="text-gray-600 mb-8">Your receipts will appear here after placing orders.</p>
          </div>
        `;
        return;
      }
      
      const receiptsHTML = receipts.map(receipt => `
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h4 class="text-lg font-semibold text-gray-800">Receipt #${receipt.receiptNumber}</h4>
              <p class="text-sm text-gray-500">${new Date(receipt.receiptDate || Date.now()).toLocaleDateString()}</p>
            </div>
            <span class="text-lg font-bold text-green-600">${receipt.amount}</span>
          </div>
          <div class="mb-4">
            <p class="text-gray-600">${receipt.serviceType || receipt.service || 'Custom Service'}</p>
            <p class="text-sm text-gray-500">Order #${receipt.orderNumber}</p>
          </div>
          <button onclick="downloadReceipt('${receipt.orderNumber}')" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm">
            📄 Download Receipt
          </button>
        </div>
      `).join('');
      
      content.innerHTML = `
        <div class="space-y-4">
          <h4 class="text-xl font-bold text-gray-800">Your Receipts (${receipts.length})</h4>
          <div class="space-y-4">${receiptsHTML}</div>
        </div>
      `;
    }
    
    function showReviewsContent(content) {
      const reviews = getAllUserReviews();
      
      if (reviews.length === 0) {
        content.innerHTML = `
          <div class="text-center py-12">
            <div class="text-8xl mb-6">⭐</div>
            <h4 class="text-2xl font-bold text-gray-700 mb-4">No Reviews Yet</h4>
            <p class="text-gray-600 mb-8">Your reviews and feedback will appear here.</p>
            <button onclick="createSampleData()" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Add Sample Review
            </button>
          </div>
        `;
        return;
      }
      
      const reviewsHTML = reviews.map(review => `
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div class="flex justify-between items-start mb-4">
            <div>
              <div class="flex items-center mb-2">
                <div class="flex text-yellow-400 mr-2">
                  ${'★'.repeat(review.rating || 5)}${'☆'.repeat(5 - (review.rating || 5))}
                </div>
                <span class="text-sm text-gray-500">${review.rating || 5}/5</span>
              </div>
              <p class="text-sm text-gray-500">${new Date(review.date || review.createdAt || Date.now()).toLocaleDateString()}</p>
            </div>
          </div>
          <p class="text-gray-800 mb-4">${review.text || review.comment || review.review || 'Great service!'}</p>
          <p class="text-sm text-gray-600">Service: ${review.service || review.serviceType || 'General'}</p>
        </div>
      `).join('');
      
      content.innerHTML = `
        <div class="space-y-4">
          <h4 class="text-xl font-bold text-gray-800">Your Reviews (${reviews.length})</h4>
          <div class="space-y-4">${reviewsHTML}</div>
        </div>
      `;
    }
    
    function getStatusColor(status) {
      switch (status.toLowerCase()) {
        case 'completed': return 'bg-green-100 text-green-800';
        case 'in-progress': case 'processing': return 'bg-blue-100 text-blue-800';
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        case 'cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }
    
    // Sample data creation
    window.createSampleData = function() {
      if (!window.currentUser) return;
      
      const sampleOrder = {
        orderNumber: `SAMPLE-${Date.now()}`,
        date: new Date().toISOString(),
        status: 'completed',
        serviceType: 'Website Design',
        businessName: 'Sample Business LLC',
        email: window.currentUser.email,
        phone: '(555) 123-4567',
        userId: window.currentUser.id,
        amount: '$150.00'
      };
      
      const sampleReview = {
        id: `review-${Date.now()}`,
        rating: 5,
        text: 'Excellent service! The website design exceeded my expectations. Very professional and responsive team.',
        date: new Date().toISOString(),
        email: window.currentUser.email,
        userId: window.currentUser.id,
        service: 'Website Design',
        customerName: window.currentUser.name
      };
      
      try {
        // Save sample order
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        const userIndex = users.findIndex(u => u.id === window.currentUser.id);
        if (userIndex !== -1) {
          if (!users[userIndex].orders) users[userIndex].orders = [];
          users[userIndex].orders.unshift(sampleOrder);
          localStorage.setItem('visualVibeUsers', JSON.stringify(users));
        }
        
        // Save sample review
        const reviews = JSON.parse(localStorage.getItem('visualVibeReviews') || '[]');
        reviews.unshift(sampleReview);
        localStorage.setItem('visualVibeReviews', JSON.stringify(reviews));
        
        alert('✅ Sample data created successfully!');
        loadComprehensiveOrderData();
        
      } catch (error) {
        console.error('Error creating sample data:', error);
        alert('❌ Error creating sample data');
      }
    };
    
    // Refresh data
    window.refreshOrderData = function() {
      console.log('🔄 Refreshing order data...');
      loadComprehensiveOrderData();
    };
    
    // Export data
    window.exportAllData = function() {
      const orders = getAllUserOrders();
      const receipts = getAllUserReceipts();
      const reviews = getAllUserReviews();
      
      const exportData = {
        user: window.currentUser,
        orders: orders,
        receipts: receipts,
        reviews: reviews,
        exportDate: new Date().toISOString()
      };
      
      const dataStr = JSON.stringify(exportData, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `visual-vibe-data-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert('✅ Data exported successfully!');
    };
    
    // Enhanced close function
    window.closeOrderHistory = function() {
      const modal = document.getElementById('orderHistoryModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    };
    
    console.log('✅ My Orders complete fix applied');
  }
  
  // === SHARED UTILITY FUNCTIONS ===
  
  function loadUserDataIntoProfileForm() {
    try {
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const user = users.find(u => u.id === window.currentUser.id);
      
      if (user) {
        const fields = [
          { id: 'profileFirstName', value: user.firstName || '' },
          { id: 'profileLastName', value: user.lastName || '' },
          { id: 'profileCompanyName', value: user.companyName || '' },
          { id: 'profilePhone', value: user.phone || '' },
          { id: 'profileEmail', value: user.email || '' }
        ];
        
        fields.forEach(field => {
          const element = document.getElementById(field.id);
          if (element) {
            element.value = field.value;
          }
        });
        
        console.log('✅ User data loaded into profile form');
      }
    } catch (error) {
      console.error('❌ Error loading user data:', error);
    }
  }
  
  // Enhanced download receipt function
  window.downloadReceipt = function(orderNumber) {
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
        </div>
        
        <div class="order-info">
          <h2>Order Receipt</h2>
          <div class="row"><span class="label">Order Number:</span><span>${orderNumber}</span></div>
          <div class="row"><span class="label">Date:</span><span>${new Date().toLocaleDateString()}</span></div>
          <div class="row"><span class="label">Customer:</span><span>${window.currentUser.name}</span></div>
          <div class="row"><span class="label">Email:</span><span>${window.currentUser.email}</span></div>
        </div>
        
        <div class="footer">
          <p>Thank you for choosing Visual Vibe Studio!</p>
        </div>
      </body>
      </html>
    `;
    
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
  };
  
  window.viewOrderDetails = function(orderNumber) {
    alert(`Order Details for #${orderNumber}\n\nDetailed order information coming soon!`);
  };
  
  // Initialize the comprehensive fix
  applyComprehensiveFix();
  
  // Also initialize when DOM changes
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyComprehensiveFix);
  }
  
  // Apply with delays to override other scripts
  setTimeout(applyComprehensiveFix, 1000);
  setTimeout(applyComprehensiveFix, 3000);
  
})();

console.log('🎯 Comprehensive profile and orders fix loaded!');
