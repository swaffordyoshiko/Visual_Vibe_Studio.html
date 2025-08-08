// CLEANUP TEST DATA - Remove all test users and notifications
console.log('🧹 CLEANUP: Removing all test users and notifications...');

// Function to clean up all test data
function cleanupTestData() {
  console.log('🗑️ Starting cleanup of test data...');
  
  // Clear all user-related data from localStorage
  const keysToRemove = [
    'visualVibeUsers',
    'currentUser', 
    'visualVibeUser',
    'pendingOrders',
    'testUsers',
    'demoUsers'
  ];
  
  keysToRemove.forEach(key => {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
      console.log(`✅ Removed: ${key}`);
    }
  });
  
  // Clear any other test-related keys
  Object.keys(localStorage).forEach(key => {
    if (key.toLowerCase().includes('test') || 
        key.toLowerCase().includes('demo') ||
        key.toLowerCase().includes('temp') ||
        key.toLowerCase().includes('mock')) {
      localStorage.removeItem(key);
      console.log(`✅ Removed test key: ${key}`);
    }
  });
  
  // Reset authentication state
  window.currentUser = null;
  
  // Remove any test notifications from DOM
  const testNotifications = document.querySelectorAll('[class*="notification"], [class*="toast"], [class*="alert"]');
  testNotifications.forEach(notification => {
    const text = notification.textContent.toLowerCase();
    if (text.includes('test') || 
        text.includes('demo') || 
        text.includes('example') ||
        text.includes('sample')) {
      notification.remove();
      console.log('✅ Removed test notification from DOM');
    }
  });
  
  // Clear any welcome banners or test messages
  const welcomeBanner = document.getElementById('welcomeBanner');
  if (welcomeBanner && !welcomeBanner.classList.contains('hidden')) {
    welcomeBanner.classList.add('hidden');
    welcomeBanner.style.display = 'none';
    console.log('✅ Hidden welcome banner');
  }
  
  // Update auth UI to signed-out state
  if (typeof window.updateAuthUI === 'function') {
    window.updateAuthUI();
    console.log('✅ Updated auth UI to signed-out state');
  }
  
  // Show clean state
  const signedOutState = document.getElementById('signedOutState');
  const signedInState = document.getElementById('signedInState');
  const mobileSignedOutState = document.getElementById('mobileSignedOutState');
  const mobileSignedInState = document.getElementById('mobileSignedInState');
  
  if (signedOutState) {
    signedOutState.classList.remove('hidden');
    signedOutState.style.display = 'flex';
  }
  
  if (signedInState) {
    signedInState.classList.add('hidden');
    signedInState.style.display = 'none';
  }
  
  if (mobileSignedOutState) {
    mobileSignedOutState.classList.remove('hidden');
    mobileSignedOutState.style.display = 'block';
  }
  
  if (mobileSignedInState) {
    mobileSignedInState.classList.add('hidden');
    mobileSignedInState.style.display = 'none';
  }
  
  console.log('🎉 CLEANUP COMPLETE: All test users and notifications removed');
  
  // Show summary
  const remainingKeys = Object.keys(localStorage).length;
  console.log(`📊 Storage summary: ${remainingKeys} keys remaining in localStorage`);
  
  return {
    success: true,
    message: 'All test data cleaned up successfully',
    remainingKeys: remainingKeys
  };
}

// Execute cleanup immediately
const result = cleanupTestData();

// Make cleanup function available globally for manual use
window.cleanupTestData = cleanupTestData;

// Also provide a complete reset function
window.completeReset = function() {
  console.log('💥 COMPLETE RESET: Clearing everything...');
  localStorage.clear();
  window.currentUser = null;
  
  // Reset all auth UI
  const signedOutState = document.getElementById('signedOutState');
  const signedInState = document.getElementById('signedInState');
  const mobileSignedOutState = document.getElementById('mobileSignedOutState');
  const mobileSignedInState = document.getElementById('mobileSignedInState');
  
  if (signedOutState) {
    signedOutState.classList.remove('hidden');
    signedOutState.style.display = 'flex';
  }
  
  if (signedInState) {
    signedInState.classList.add('hidden');
    signedInState.style.display = 'none';
  }
  
  if (mobileSignedOutState) {
    mobileSignedOutState.classList.remove('hidden');
    mobileSignedOutState.style.display = 'block';
  }
  
  if (mobileSignedInState) {
    mobileSignedInState.classList.add('hidden');
    mobileSignedInState.style.display = 'none';
  }
  
  console.log('✅ Complete reset finished');
  alert('✅ Complete reset finished - all data cleared');
};

console.log('✅ CLEANUP SCRIPT LOADED');
console.log('🧪 Available commands:');
console.log('- cleanupTestData() - Remove test users and notifications');
console.log('- completeReset() - Clear everything and reset to clean state');
