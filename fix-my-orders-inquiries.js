// Fix My Orders to Show Orders AND Inquiries
console.log('📋 Loading My Orders inquiries fix...');

(function() {
  'use strict';
  
  let inquiriesFixInitialized = false;
  
  function initializeInquiriesFix() {
    if (inquiriesFixInitialized) return;
    inquiriesFixInitialized = true;
    
    console.log('🚀 Initializing My Orders inquiries fix...');
    
    // 1. Override contact form submission to save inquiries
    overrideContactFormSubmission();
    
    // 2. Override showOrderHistory to show both orders and inquiries
    overrideShowOrderHistory();
    
    console.log('✅ My Orders inquiries fix initialized');
  }
  
  // 1. SAVE CONTACT FORM SUBMISSIONS AS INQUIRIES
  function overrideContactFormSubmission() {
    console.log('📝 Overriding contact form to save inquiries...');
    
    // Override the contact form function
    const originalSubmitContactForm = window.submitContactForm;
    
    window.submitContactForm = function() {
      console.log('📧 Contact form submission with inquiry saving...');
      
      try {
        // Get form data
        const nameInput = document.getElementById('customerName');
        const phoneInput = document.getElementById('customerPhone');
        const emailInput = document.getElementById('customerEmail');
        const messageInput = document.getElementById('customerMessage');
        const projectTypeEl = document.getElementById('projectType');
        const urgencyEl = document.getElementById('urgency');
        
        if (nameInput && phoneInput && emailInput && messageInput) {
          const inquiryData = {
            name: nameInput.value.trim(),
            phone: phoneInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim(),
            projectType: projectTypeEl ? projectTypeEl.value : 'General Inquiry',
            urgency: urgencyEl ? urgencyEl.value : 'Standard',
            responsePreference: document.querySelector('input[name="responsePreference"]:checked')?.value || 'text',
            date: new Date().toISOString(),
            type: 'inquiry',
            status: 'submitted',
            inquiryNumber: 'INQ-' + Date.now()
          };
          
          // Save inquiry for current user
          saveCustomerInquiry(inquiryData);
        }
        
        // Call original function
        if (originalSubmitContactForm) {
          originalSubmitContactForm();
        }
        
      } catch (error) {
        console.error('❌ Error in enhanced contact form:', error);
        // Still call original function on error
        if (originalSubmitContactForm) {
          originalSubmitContactForm();
        }
      }
    };
  }
  
  function saveCustomerInquiry(inquiryData) {
    try {
      console.log('💾 Saving customer inquiry:', inquiryData);
      
      // Save to customer inquiries storage
      const inquiries = JSON.parse(localStorage.getItem('customerInquiries') || '[]');
      inquiries.unshift(inquiryData);
      localStorage.setItem('customerInquiries', JSON.stringify(inquiries));
      
      // If user is signed in, also save to their user data
      if (window.currentUser) {
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        const userIndex = users.findIndex(u => u.id === window.currentUser.id);
        
        if (userIndex !== -1) {
          if (!users[userIndex].inquiries) {
            users[userIndex].inquiries = [];
          }
          users[userIndex].inquiries.unshift(inquiryData);
          localStorage.setItem('visualVibeUsers', JSON.stringify(users));
          console.log('✅ Inquiry saved to user account');
        }
      }
      
      console.log('✅ Customer inquiry saved successfully');
      
    } catch (error) {
      console.error('❌ Error saving customer inquiry:', error);
    }
  }
  
  // 2. SHOW BOTH ORDERS AND INQUIRIES IN MY ORDERS
  function overrideShowOrderHistory() {
    console.log('📋 Overriding showOrderHistory to include inquiries...');
    
    window.showOrderHistory = function() {
      console.log('📋 Opening My Orders & Inquiries...');
      
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
              <p class="text-gray-500 mb-4">Please sign in to view your orders and inquiries.</p>
              <button onclick="closeOrderHistory(); openSignInModal();" 
                      class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                Sign In
              </button>
            </div>
          `;
          return;
        }
        
        // Get all customer data
        const allItems = getAllCustomerOrdersAndInquiries();
        
        if (allItems.length === 0) {
          content.innerHTML = `
            <div class="text-center py-8">
              <div class="text-gray-400 text-6xl mb-4">📋</div>
              <h4 class="text-xl font-semibold text-gray-600 mb-2">No Orders or Inquiries Yet</h4>
              <p class="text-gray-500 mb-4">You haven't placed any orders or submitted any inquiries yet.</p>
              <div class="space-y-2">
                <button onclick="closeOrderHistory(); document.getElementById('order')?.scrollIntoView();" 
                        class="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium">
                  Place Your First Order
                </button>
                <button onclick="closeOrderHistory(); document.getElementById('contact')?.scrollIntoView();" 
                        class="w-full bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 font-medium">
                  Send an Inquiry
                </button>
              </div>
            </div>
          `;
        } else {
          const itemsHTML = allItems.map(item => generateItemHTML(item)).join('');
          
          content.innerHTML = `
            <div class="mb-6">
              <p class="text-gray-600">You have ${allItems.length} order${allItems.length !== 1 ? 's' : ''} and inquiries on record.</p>
            </div>
            <div class="space-y-4">
              ${itemsHTML}
            </div>
          `;
        }
        
        console.log('✅ My Orders & Inquiries displayed successfully');
        
      } catch (error) {
        console.error('❌ Error in showOrderHistory:', error);
        if (content) {
          content.innerHTML = `
            <div class="text-center py-8">
              <p class="text-red-500">Error loading orders and inquiries. Please try again.</p>
              <button onclick="closeOrderHistory()" class="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
                Close
              </button>
            </div>
          `;
        }
      }
    };
  }
  
  function getAllCustomerOrdersAndInquiries() {
    const allItems = [];
    
    try {
      // 1. Get formal orders from user account
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const user = users.find(u => u.id === window.currentUser.id);
      if (user && user.orders) {
        allItems.push(...user.orders.map(order => ({ ...order, type: 'order' })));
      }
      
      // 2. Get pending orders
      const pendingOrders = JSON.parse(localStorage.getItem('pendingOrders') || '[]');
      const userPendingOrders = pendingOrders.filter(order =>
        order.email === window.currentUser.email || order.phone === window.currentUser.phone
      );
      userPendingOrders.forEach(order => {
        if (!allItems.find(item => item.orderNumber === order.orderNumber)) {
          allItems.push({ ...order, type: 'order' });
        }
      });
      
      // 3. Get inquiries from user account
      if (user && user.inquiries) {
        allItems.push(...user.inquiries.map(inquiry => ({ ...inquiry, type: 'inquiry' })));
      }
      
      // 4. Get inquiries from general storage (by email/phone matching)
      const allInquiries = JSON.parse(localStorage.getItem('customerInquiries') || '[]');
      const userInquiries = allInquiries.filter(inquiry =>
        inquiry.email === window.currentUser.email || inquiry.phone === window.currentUser.phone
      );
      userInquiries.forEach(inquiry => {
        if (!allItems.find(item => item.inquiryNumber === inquiry.inquiryNumber)) {
          allItems.push({ ...inquiry, type: 'inquiry' });
        }
      });
      
      // Sort by date (newest first)
      allItems.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      console.log(`📊 Found ${allItems.length} total items (orders + inquiries)`);
      
    } catch (error) {
      console.error('❌ Error gathering customer data:', error);
    }
    
    return allItems;
  }
  
  function generateItemHTML(item) {
    const isOrder = item.type === 'order';
    const date = new Date(item.date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    
    if (isOrder) {
      return `
        <div class="border rounded-lg p-4 bg-blue-50 border-blue-200">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h4 class="font-semibold text-gray-800 flex items-center">
                <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">ORDER</span>
                #${item.orderNumber}
              </h4>
              <p class="text-sm text-gray-500">${date}</p>
            </div>
            <span class="px-2 py-1 rounded-full text-xs font-medium ${
              item.status === 'completed' ? 'bg-green-100 text-green-800' :
              item.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }">
              ${item.status?.charAt(0).toUpperCase() + item.status?.slice(1) || 'Pending'}
            </span>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <p class="text-sm font-medium text-gray-600">Business:</p>
              <p class="text-gray-800">${item.businessName || 'N/A'}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-600">Services:</p>
              <p class="text-gray-800">${item.services ? item.services.join(', ') : 'N/A'}</p>
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
    } else {
      return `
        <div class="border rounded-lg p-4 bg-green-50 border-green-200">
          <div class="flex justify-between items-start mb-3">
            <div>
              <h4 class="font-semibold text-gray-800 flex items-center">
                <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-2">INQUIRY</span>
                #${item.inquiryNumber}
              </h4>
              <p class="text-sm text-gray-500">${date}</p>
            </div>
            <span class="px-2 py-1 rounded-full text-xs font-medium ${
              item.status === 'responded' ? 'bg-green-100 text-green-800' :
              item.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }">
              ${item.status?.charAt(0).toUpperCase() + item.status?.slice(1) || 'Submitted'}
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
            <div class="flex justify-between text-sm">
              <div>
                <span class="font-medium text-gray-600">Urgency:</span>
                <span class="text-gray-800">${item.urgency || 'Standard'}</span>
              </div>
              <div>
                <span class="font-medium text-gray-600">Preferred Response:</span>
                <span class="text-gray-800">${item.responsePreference || 'Text'}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }
  
  // Initialize when ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeInquiriesFix);
  } else {
    setTimeout(initializeInquiriesFix, 500);
  }
  
  // Also initialize after delay for other scripts
  setTimeout(initializeInquiriesFix, 2000);
  
})();

console.log('✅ My Orders inquiries fix loaded');
