// SETUP TEST USERS FOR AUTHENTICATION TESTING
console.log('👥 Setting up test users...');

(function() {
  'use strict';

  function setupTestUsers() {
    try {
      // Check if users already exist
      const existingUsers = localStorage.getItem('visualVibeUsers');
      let users = existingUsers ? JSON.parse(existingUsers) : [];
      
      console.log('📦 Current users in storage:', users.length);
      
      // Create test users if none exist
      if (users.length === 0) {
        const testUsers = [
          {
            id: 'test_user_1',
            name: 'John Doe',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: 'password123',
            phone: '(555) 123-4567',
            companyName: 'Test Company Inc',
            orders: [],
            reviews: [],
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            accountVersion: '4.0'
          },
          {
            id: 'test_user_2',
            name: 'Jane Smith',
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane@example.com',
            password: 'test123',
            phone: '(555) 987-6543',
            companyName: 'Smith Enterprises',
            orders: [],
            reviews: [],
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            accountVersion: '4.0'
          },
          {
            id: 'demo_user',
            name: 'Demo User',
            firstName: 'Demo',
            lastName: 'User',
            email: 'demo@visualvibestudio.store',
            password: 'demo123',
            phone: '(402) 979-7184',
            companyName: 'Visual Vibe Studio',
            orders: [],
            reviews: [],
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            accountVersion: '4.0'
          }
        ];
        
        // Save test users
        localStorage.setItem('visualVibeUsers', JSON.stringify(testUsers));
        console.log('✅ Created test users:');
        testUsers.forEach(user => {
          console.log(`- ${user.name}: ${user.email} / ${user.password}`);
        });
        
        users = testUsers;
      } else {
        console.log('👥 Users already exist in storage');
        users.forEach(user => {
          console.log(`- ${user.name}: ${user.email}`);
        });
      }
      
      // Display test credentials
      console.log('🔑 TEST CREDENTIALS:');
      console.log('===================');
      users.forEach(user => {
        console.log(`Email: ${user.email}`);
        console.log(`Password: ${user.password}`);
        console.log('---');
      });
      
      return users;
      
    } catch (error) {
      console.error('❌ Error setting up test users:', error);
      return [];
    }
  }

  // Auto-setup when script loads
  setupTestUsers();
  
  // Make function available globally
  window.setupTestUsers = setupTestUsers;
  
  // Quick test function
  window.quickSignInTest = function() {
    console.log('🧪 Quick sign in test...');
    
    // Open sign in modal
    if (typeof window.openSignInModal === 'function') {
      window.openSignInModal();
      
      // Fill in test credentials after a short delay
      setTimeout(() => {
        const emailInput = document.getElementById('signInEmail');
        const passwordInput = document.getElementById('signInPassword');
        
        if (emailInput && passwordInput) {
          emailInput.value = 'demo@visualvibestudio.store';
          passwordInput.value = 'demo123';
          console.log('✅ Test credentials filled. Click Sign In or press Enter.');
        } else {
          console.error('❌ Could not find form inputs');
        }
      }, 500);
    } else {
      console.error('❌ openSignInModal function not available');
    }
  };
  
  console.log('👥 Test users setup complete');
  console.log('💡 Use window.quickSignInTest() to test sign in with demo credentials');

})();
