// Quick loader for profile photo fix
console.log('🔄 Loading profile photo fix...');

(function() {
  const script = document.createElement('script');
  script.src = 'profile-photo-display-fix.js';
  script.onload = function() {
    console.log('✅ Profile photo fix loaded successfully!');
    console.log('💡 Profile photos will now show on the button and in the edit form');
    console.log('💡 Profile modal will only open when you click the edit profile button');
  };
  script.onerror = function() {
    console.error('❌ Failed to load profile photo fix');
  };
  
  document.head.appendChild(script);
})();
