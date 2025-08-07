// Debug My Orders functionality
console.log('🐛 Loading My Orders debug script...');

window.debugMyOrders = function() {
  console.log('🐛 Starting My Orders debug...');
  
  console.log('Current user:', window.currentUser);
  
  // Check all storage locations
  const storageKeys = [
    'visualVibeUsers',
    'pendingOrders', 
    'visualVibeReviews',
    'customerInquiries',
    'visualVibeContacts',
    'customerReviews',
    'orders',
    'reviews'
  ];
  
  storageKeys.forEach(key => {
    try {
      const data = JSON.parse(localStorage.getItem(key) || '[]');
      console.log(`📊 ${key}:`, data.length, 'items', data);
    } catch (e) {
      console.log(`📊 ${key}: Error reading -`, e.message);
    }
  });
  
  // DISABLED: Not adding debug reviews automatically to avoid fake data
  console.log('ℹ️ Debug review creation disabled to show only real customer data');
  
  // Test the showOrderHistory function
  setTimeout(() => {
    console.log('🐛 Testing showOrderHistory...');
    if (typeof window.showOrderHistory === 'function') {
      window.showOrderHistory();
    }
  }, 1000);
};

window.clearDebugData = function() {
  // Remove debug reviews
  const reviews = JSON.parse(localStorage.getItem('visualVibeReviews') || '[]');
  const filtered = reviews.filter(review => !review.id.startsWith('debug-'));
  localStorage.setItem('visualVibeReviews', JSON.stringify(filtered));
  console.log('✅ Debug data cleared');
};

// DISABLED: Not auto-running debug to prevent interference
console.log('ℹ️ Auto-debug disabled - run window.debugMyOrders() manually if needed');

console.log('🐛 My Orders debug script loaded');
console.log('💡 Run window.debugMyOrders() to test manually');
console.log('💡 Run window.clearDebugData() to clean up test data');
