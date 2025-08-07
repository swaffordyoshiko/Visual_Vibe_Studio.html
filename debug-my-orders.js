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
  
  // Test adding a sample review for current user
  if (window.currentUser) {
    const sampleReview = {
      id: 'debug-' + Date.now(),
      name: window.currentUser.name,
      email: window.currentUser.email,
      service: 'Website Design',
      rating: 5,
      text: 'Great service! Debug review.',
      businessType: 'Tech Company',
      date: new Date().toISOString(),
      approved: true
    };
    
    const reviews = JSON.parse(localStorage.getItem('visualVibeReviews') || '[]');
    reviews.unshift(sampleReview);
    localStorage.setItem('visualVibeReviews', JSON.stringify(reviews));
    console.log('✅ Added debug review for', window.currentUser.name);
  }
  
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

// Auto-run debug after delay
setTimeout(() => {
  console.log('🐛 Auto-running My Orders debug...');
  window.debugMyOrders();
}, 4000);

console.log('🐛 My Orders debug script loaded');
console.log('💡 Run window.debugMyOrders() to test manually');
console.log('💡 Run window.clearDebugData() to clean up test data');
