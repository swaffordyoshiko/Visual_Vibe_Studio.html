// Test script to debug notification issues
console.log('🧪 Testing notification system...');

// Function to test and debug notifications
function testNotifications() {
  console.log('=== NOTIFICATION TEST STARTING ===');
  
  // Check if toast manager exists
  console.log('toastManager exists:', typeof window.toastManager);
  console.log('toastManager object:', window.toastManager);
  
  // Check current alert function
  console.log('alert function:', window.alert.toString().substring(0, 100) + '...');
  console.log('showAlert function:', window.showAlert?.toString().substring(0, 100) + '...');
  
  // Test toast manager directly
  if (window.toastManager) {
    console.log('✅ Testing toast manager directly...');
    try {
      window.toastManager.success('Direct toast test - SUCCESS');
      window.toastManager.error('Direct toast test - ERROR');
      window.toastManager.info('Direct toast test - INFO');
    } catch (e) {
      console.error('❌ Direct toast manager test failed:', e);
    }
  } else {
    console.error('❌ Toast manager not available');
  }
  
  // Test alert override
  console.log('✅ Testing alert override...');
  setTimeout(() => {
    window.alert('Testing alert override - should be toast');
  }, 1000);
  
  // Test showAlert override  
  console.log('✅ Testing showAlert override...');
  setTimeout(() => {
    if (typeof window.showAlert === 'function') {
      window.showAlert('Testing showAlert override - should be toast', 'success');
    } else {
      console.error('❌ showAlert function not found');
    }
  }, 2000);
  
  console.log('=== NOTIFICATION TEST COMPLETE ===');
}

// Run test when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', testNotifications);
} else {
  testNotifications();
}

// Also test after a delay to catch late-loading scripts
setTimeout(testNotifications, 3000);

// Make test function available globally for manual testing
window.testNotifications = testNotifications;

console.log('🧪 Notification test script loaded. Call testNotifications() to run manual test.');
