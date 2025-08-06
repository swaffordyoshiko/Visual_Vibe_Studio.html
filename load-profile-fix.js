// Simple loader for the profile first-click fix
console.log('🔧 Loading profile first-click fix...');

(function() {
  // Create and load the fix script
  const script = document.createElement('script');
  script.src = 'PROFILE-FIRST-CLICK-FIX.js';
  script.onload = function() {
    console.log('✅ Profile first-click fix loaded successfully!');
    console.log('💡 The profile should now save properly on the first click.');
    
    // Test if the fix is working
    if (typeof window.testDefinitiveProfile === 'function') {
      console.log('🧪 Use window.testDefinitiveProfile() to test the fix');
    }
  };
  script.onerror = function() {
    console.error('❌ Failed to load profile first-click fix');
  };
  
  document.head.appendChild(script);
})();
