// COMPREHENSIVE MY ORDERS FIX - Shows ALL Reviews, Orders, and Inquiries
console.log('📋 Loading comprehensive My Orders fix...');

(function() {
  'use strict';
  
  let comprehensiveOrdersInitialized = false;
  
  function initializeComprehensiveOrders() {
    if (comprehensiveOrdersInitialized) return;
    comprehensiveOrdersInitialized = true;
    
    console.log('🚀 Initializing comprehensive My Orders system...');
    
    // Override showOrderHistory with comprehensive version
    window.showOrderHistory = function() {
      console.log('📋 Opening comprehensive My Orders & Receipts...');
      
      try {
        const modal = document.getElementById('orderHistoryModal');
        const content = document.getElementById('orderHistoryContent');
        
        if (!modal || !content) {
          console.error('❌ Order history modal or content not found');
          return;
        }
        
        // Show modal
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Check if user is signed in
        if (!window.currentUser) {
          content.innerHTML = `
            <div class="text-center py-8">
              <div class="text-gray-400 text-6xl mb-4">📋</div>
              <p class="text-gray-500 mb-4">Please sign in to view your orders, reviews, and inquiries.</p>
              <button onclick="closeOrderHistory(); openSignInModal();" 
                      class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                Sign In
              </button>
            </div>
          `;
          return;
        }
        
        // Get ALL customer data
        const allCustomerData = getAllCustomerData();
        
        if (allCustomerData.length === 0) {
          content.innerHTML = `
            <div class="text-center py-8">
              <div class="text-gray-400 text-6xl mb-4">📋</div>
              <h4 class="text-xl font-semibold text-gray-600 mb-2">No Activity Yet</h4>
              <p class="text-gray-500 mb-6">You haven't placed any orders, submitted reviews, or sent inquiries yet.</p>
              <div class="space-y-3">
                <button onclick="closeOrderHistory(); document.getElementById('order')?.scrollIntoView();" 
                        class="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium">
                  Place Your First Order
                </button>
                <button onclick="closeOrderHistory(); document.getElementById('contact')?.scrollIntoView();" 
                        class="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium">
                  Send an Inquiry
                </button>
                <button onclick="closeOrderHistory(); document.getElementById('reviews')?.scrollIntoView();" 
                        class="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-medium">
                  Leave a Review
                </button>
              </div>
            </div>
          `;
        } else {
          displayAllCustomerData(content, allCustomerData);
        }
        
        console.log('✅ Comprehensive My Orders displayed successfully');
        
      } catch (error) {
        console.error('❌ Error in comprehensive showOrderHistory:', error);
        if (content) {
          content.innerHTML = `
            <div class="text-center py-8">
              <p class="text-red-500 mb-4">Error loading your data. Please try again.</p>
              <button onclick="closeOrderHistory()" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
                Close
              </button>
            </div>
          `;
        }
      }
    };
    
    // Ensure we have the close function
    if (!window.closeOrderHistory) {
      window.closeOrderHistory = function() {
        const modal = document.getElementById('orderHistoryModal');
        if (modal) {
          modal.classList.add('hidden');
          document.body.style.overflow = '';
        }
      };
    }
    
    console.log('✅ Comprehensive My Orders system initialized');
  }
  
  function getAllCustomerData() {
    const allData = [];
    
    try {
      console.log('📊 Gathering ALL customer data...');
      
      // 1. GET ORDERS from multiple sources
      const orders = getCustomerOrders();
      orders.forEach(order => {
        allData.push({
          ...order,
          type: 'order',
          category: 'Orders',
          sortDate: new Date(order.date || order.createdAt || Date.now())
        });
      });
      
      // 2. GET REVIEWS 
      const reviews = getCustomerReviews();
      reviews.forEach(review => {
        allData.push({
          ...review,
          type: 'review', 
          category: 'Reviews',
          sortDate: new Date(review.date || review.createdAt || Date.now())
        });
      });
      
      // 3. GET INQUIRIES
      const inquiries = getCustomerInquiries();
      inquiries.forEach(inquiry => {
        allData.push({
          ...inquiry,
          type: 'inquiry',
          category: 'Inquiries', 
          sortDate: new Date(inquiry.date || inquiry.createdAt || Date.now())
        });
      });
      
      // 4. GET CONTACT SUBMISSIONS
      const contacts = getCustomerContacts();
      contacts.forEach(contact => {
        allData.push({
          ...contact,
          type: 'contact',
          category: 'Contact Forms',
          sortDate: new Date(contact.date || contact.submittedAt || Date.now())
        });
      });
      
      // Sort by date (newest first)
      allData.sort((a, b) => b.sortDate - a.sortDate);
      
      console.log(`📊 Found total items:`, {
        orders: orders.length,
        reviews: reviews.length, 
        inquiries: inquiries.length,
        contacts: contacts.length,
        total: allData.length
      });
      
    } catch (error) {
      console.error('❌ Error gathering customer data:', error);
    }
    
    return allData;
  }
  
  function getCustomerOrders() {
    const orders = [];
    
    try {
      // From user account
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const user = users.find(u => u.id === window.currentUser.id);
      if (user && user.orders) {
        orders.push(...user.orders);
      }
      
      // From pending orders
      const pendingOrders = JSON.parse(localStorage.getItem('pendingOrders') || '[]');
      const userPendingOrders = pendingOrders.filter(order =>
        order.email === window.currentUser.email || order.phone === window.currentUser.phone
      );
      
      // Add non-duplicate pending orders
      userPendingOrders.forEach(order => {
        if (!orders.find(existing => existing.orderNumber === order.orderNumber)) {
          orders.push(order);
        }
      });
      
      // From other order storage locations
      const otherOrderKeys = ['visualVibeOrders', 'customerOrders', 'orders'];
      otherOrderKeys.forEach(key => {
        try {
          const stored = JSON.parse(localStorage.getItem(key) || '[]');
          const userOrders = stored.filter(order =>
            order.email === window.currentUser.email || order.phone === window.currentUser.phone
          );
          userOrders.forEach(order => {
            if (!orders.find(existing => existing.orderNumber === order.orderNumber)) {
              orders.push(order);
            }
          });
        } catch (e) {
          // Ignore errors for optional storage
        }
      });
      
    } catch (error) {
      console.error('❌ Error getting customer orders:', error);
    }
    
    return orders;
  }
  
  function getCustomerReviews() {
    const reviews = [];
    
    try {
      // From user account
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const user = users.find(u => u.id === window.currentUser.id);
      if (user && user.reviews) {
        reviews.push(...user.reviews);
      }
      
      // From main reviews storage - match by name or email
      const allReviews = JSON.parse(localStorage.getItem('visualVibeReviews') || '[]');
      const userReviews = allReviews.filter(review =>
        review.name === window.currentUser.name ||
        review.email === window.currentUser.email ||
        (review.name && window.currentUser.name && 
         review.name.toLowerCase().includes(window.currentUser.name.toLowerCase().split(' ')[0]))
      );
      
      // Add non-duplicate reviews
      userReviews.forEach(review => {
        if (!reviews.find(existing => existing.id === review.id)) {
          reviews.push(review);
        }
      });
      
      // From other review storage locations
      const otherReviewKeys = ['customerReviews', 'reviews', 'userReviews'];
      otherReviewKeys.forEach(key => {
        try {
          const stored = JSON.parse(localStorage.getItem(key) || '[]');
          const userRevs = stored.filter(review =>
            review.name === window.currentUser.name || review.email === window.currentUser.email
          );
          userRevs.forEach(review => {
            if (!reviews.find(existing => existing.id === review.id)) {
              reviews.push(review);
            }
          });
        } catch (e) {
          // Ignore errors for optional storage
        }
      });
      
    } catch (error) {
      console.error('❌ Error getting customer reviews:', error);
    }
    
    return reviews;
  }
  
  function getCustomerInquiries() {
    const inquiries = [];
    
    try {
      // From user account
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const user = users.find(u => u.id === window.currentUser.id);
      if (user && user.inquiries) {
        inquiries.push(...user.inquiries);
      }
      
      // From general inquiries storage
      const allInquiries = JSON.parse(localStorage.getItem('customerInquiries') || '[]');
      const userInquiries = allInquiries.filter(inquiry =>
        inquiry.email === window.currentUser.email || inquiry.phone === window.currentUser.phone
      );
      
      // Add non-duplicate inquiries
      userInquiries.forEach(inquiry => {
        if (!inquiries.find(existing => existing.inquiryNumber === inquiry.inquiryNumber)) {
          inquiries.push(inquiry);
        }
      });
      
    } catch (error) {
      console.error('❌ Error getting customer inquiries:', error);
    }
    
    return inquiries;
  }
  
  function getCustomerContacts() {
    const contacts = [];
    
    try {
      // From contact submissions storage
      const contactKeys = ['visualVibeContacts', 'customerContacts', 'contactSubmissions'];
      contactKeys.forEach(key => {
        try {
          const stored = JSON.parse(localStorage.getItem(key) || '[]');
          const userContacts = stored.filter(contact =>
            contact.email === window.currentUser.email || contact.phone === window.currentUser.phone
          );
          userContacts.forEach(contact => {
            if (!contacts.find(existing => existing.id === contact.id || existing.submissionId === contact.submissionId)) {
              contacts.push(contact);
            }
          });
        } catch (e) {
          // Ignore errors for optional storage
        }
      });
      
    } catch (error) {
      console.error('❌ Error getting customer contacts:', error);
    }
    
    return contacts;
  }
  
  function displayAllCustomerData(content, allData) {
    const categories = ['Orders', 'Reviews', 'Inquiries', 'Contact Forms'];
    const summary = categories.map(cat => {
      const count = allData.filter(item => item.category === cat).length;
      return `${count} ${cat}`;
    }).filter(item => !item.startsWith('0')).join(', ');
    
    const itemsHTML = allData.map(item => generateItemHTML(item)).join('');
    
    content.innerHTML = `
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Your Complete Activity History</h3>
        <p class="text-gray-600">Showing all ${allData.length} items: ${summary}</p>
      </div>
      
      <div class="space-y-4">
        ${itemsHTML}
      </div>
    `;
  }
  
  function generateItemHTML(item) {
    const date = item.sortDate.toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    
    switch (item.type) {
      case 'order':
        return `
          <div class="border rounded-lg p-4 bg-blue-50 border-blue-200">
            <div class="flex justify-between items-start mb-3">
              <div>
                <h4 class="font-semibold text-gray-800 flex items-center">
                  <span class="bg-blue-600 text-white text-xs px-2 py-1 rounded mr-2">ORDER</span>
                  #${item.orderNumber || 'N/A'}
                </h4>
                <p class="text-sm text-gray-500">${date}</p>
              </div>
              <span class="px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}">
                ${(item.status || 'Pending').charAt(0).toUpperCase() + (item.status || 'pending').slice(1)}
              </span>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <p class="text-sm font-medium text-gray-600">Business:</p>
                <p class="text-gray-800">${item.businessName || 'N/A'}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-600">Services:</p>
                <p class="text-gray-800">${item.services ? (Array.isArray(item.services) ? item.services.join(', ') : item.services) : 'N/A'}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-600">Total:</p>
                <p class="text-gray-800 font-semibold">$${item.total || item.totalAmount || 'TBD'}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-600">Due Date:</p>
                <p class="text-gray-800">${item.dueDate ? new Date(item.dueDate).toLocaleDateString() : 'TBD'}</p>
              </div>
            </div>
          </div>
        `;
        
      case 'review':
        return `
          <div class="border rounded-lg p-4 bg-purple-50 border-purple-200">
            <div class="flex justify-between items-start mb-3">
              <div>
                <h4 class="font-semibold text-gray-800 flex items-center">
                  <span class="bg-purple-600 text-white text-xs px-2 py-1 rounded mr-2">REVIEW</span>
                  ${item.service || 'Service Review'}
                </h4>
                <p class="text-sm text-gray-500">${date}</p>
              </div>
              <div class="flex items-center">
                <span class="text-yellow-400 text-lg">${'★'.repeat(item.rating || 5)}</span>
                <span class="text-gray-400 text-lg">${'★'.repeat(Math.max(0, 5 - (item.rating || 5)))}</span>
              </div>
            </div>
            
            <div class="space-y-2">
              <div>
                <p class="text-sm font-medium text-gray-600">Your Review:</p>
                <p class="text-gray-800 bg-white p-3 rounded border text-sm">${item.text || item.comment || 'No review text'}</p>
              </div>
              <div class="flex justify-between text-sm text-gray-600">
                <span>Business: ${item.businessType || 'N/A'}</span>
                <span>Rating: ${item.rating || 5}/5 stars</span>
              </div>
            </div>
          </div>
        `;
        
      case 'inquiry':
        return `
          <div class="border rounded-lg p-4 bg-green-50 border-green-200">
            <div class="flex justify-between items-start mb-3">
              <div>
                <h4 class="font-semibold text-gray-800 flex items-center">
                  <span class="bg-green-600 text-white text-xs px-2 py-1 rounded mr-2">INQUIRY</span>
                  #${item.inquiryNumber || 'N/A'}
                </h4>
                <p class="text-sm text-gray-500">${date}</p>
              </div>
              <span class="px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}">
                ${(item.status || 'Submitted').charAt(0).toUpperCase() + (item.status || 'submitted').slice(1)}
              </span>
            </div>
            
            <div class="space-y-3">
              <div>
                <p class="text-sm font-medium text-gray-600">Project Type:</p>
                <p class="text-gray-800">${item.projectType || 'General Inquiry'}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-600">Message:</p>
                <p class="text-gray-800 bg-white p-3 rounded border text-sm">${item.message}</p>
              </div>
              <div class="flex justify-between text-sm text-gray-600">
                <span>Urgency: ${item.urgency || 'Standard'}</span>
                <span>Preferred Response: ${item.responsePreference || 'Text'}</span>
              </div>
            </div>
          </div>
        `;
        
      case 'contact':
        return `
          <div class="border rounded-lg p-4 bg-orange-50 border-orange-200">
            <div class="flex justify-between items-start mb-3">
              <div>
                <h4 class="font-semibold text-gray-800 flex items-center">
                  <span class="bg-orange-600 text-white text-xs px-2 py-1 rounded mr-2">CONTACT</span>
                  Message Submitted
                </h4>
                <p class="text-sm text-gray-500">${date}</p>
              </div>
              <span class="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                Sent
              </span>
            </div>
            
            <div class="space-y-2">
              <div>
                <p class="text-sm font-medium text-gray-600">Message:</p>
                <p class="text-gray-800 bg-white p-3 rounded border text-sm">${item.message || item.content || 'Contact message'}</p>
              </div>
              <div class="text-sm text-gray-600">
                Contact method: ${item.phone ? 'Phone: ' + item.phone : 'Email: ' + item.email}
              </div>
            </div>
          </div>
        `;
        
      default:
        return `
          <div class="border rounded-lg p-4 bg-gray-50 border-gray-200">
            <h4 class="font-semibold text-gray-800">Unknown Item Type</h4>
            <p class="text-sm text-gray-500">${date}</p>
          </div>
        `;
    }
  }
  
  function getStatusColor(status) {
    const s = (status || '').toLowerCase();
    if (s.includes('completed') || s.includes('responded')) return 'bg-green-100 text-green-800';
    if (s.includes('progress') || s.includes('processing')) return 'bg-blue-100 text-blue-800';
    if (s.includes('pending') || s.includes('submitted')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  }
  
  // Initialize when ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeComprehensiveOrders);
  } else {
    setTimeout(initializeComprehensiveOrders, 100);
  }
  
  // Initialize after delay to override other scripts
  setTimeout(initializeComprehensiveOrders, 3000);
  
})();

console.log('✅ Comprehensive My Orders fix loaded - Will show ALL reviews, orders, and inquiries');
