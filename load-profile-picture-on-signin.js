// Load Profile Picture on Sign In
console.log('🔗 Loading profile picture on sign in script...');

(function() {
  'use strict';
  
  // Override updateAuthUI to include profile picture loading
  const originalUpdateAuthUI = window.updateAuthUI;
  
  window.updateAuthUI = function() {
    console.log('🔄 Updating auth UI with profile picture...');
    
    // Call original function first
    if (originalUpdateAuthUI) {
      originalUpdateAuthUI();
    }
    
    // Load profile picture after UI update
    setTimeout(() => {
      loadUserProfilePicture();
    }, 500);
  };
  
  function loadUserProfilePicture() {
    console.log('🖼️ Loading user profile picture...');
    
    try {
      if (!window.currentUser) {
        console.log('ℹ️ No current user, skipping profile picture load');
        return;
      }
      
      // Try to get profile picture from multiple sources
      let profilePicture = null;
      
      // 1. Check localStorage
      profilePicture = localStorage.getItem('visualVibeProfilePicture');
      
      // 2. Check current user object
      if (!profilePicture && window.currentUser.profilePicture) {
        profilePicture = window.currentUser.profilePicture;
      }
      
      // 3. Check user data in storage
      if (!profilePicture && window.currentUser.id) {
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        const userData = users.find(u => u.id === window.currentUser.id);
        if (userData && userData.profilePicture) {
          profilePicture = userData.profilePicture;
          // Save to localStorage for faster access
          localStorage.setItem('visualVibeProfilePicture', profilePicture);
        }
      }
      
      // Update displays
      if (typeof window.updateAllProfilePictureDisplays === 'function') {
        window.updateAllProfilePictureDisplays(profilePicture);
        console.log('✅ Profile picture displays updated after sign in');
      } else {
        console.log('⚠️ updateAllProfilePictureDisplays function not available yet');
        // Retry after a delay
        setTimeout(() => {
          if (typeof window.updateAllProfilePictureDisplays === 'function') {
            window.updateAllProfilePictureDisplays(profilePicture);
            console.log('✅ Profile picture displays updated after retry');
          }
        }, 1000);
      }
      
    } catch (error) {
      console.error('❌ Error loading user profile picture:', error);
    }
  }
  
  // Also check on page load if user is already signed in
  setTimeout(() => {
    if (window.currentUser) {
      console.log('🔍 User already signed in, loading profile picture...');
      loadUserProfilePicture();
    }
  }, 2000);
  
})();

console.log('✅ Profile picture on sign in script loaded');
