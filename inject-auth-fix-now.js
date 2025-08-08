// IMMEDIATE AUTH FIX INJECTION
console.log('🚨 IMMEDIATE AUTH FIX: Injecting fix script...');

// Load the auth UI state fix script immediately
(function() {
  const script = document.createElement('script');
  script.src = 'auth-ui-state-fix.js';
  script.onload = function() {
    console.log('✅ Auth UI state fix loaded successfully');
    
    // Run the fix immediately
    setTimeout(() => {
      if (typeof window.forceFixAuthUI === 'function') {
        window.forceFixAuthUI();
        console.log('✅ Auth UI fix applied immediately');
      }
    }, 500);
  };
  script.onerror = function() {
    console.error('❌ Failed to load auth UI state fix');
  };
  
  document.head.appendChild(script);
  console.log('📡 Auth UI state fix script injected');
})();

// Also apply immediate CSS fixes for hidden elements
console.log('🎨 Applying immediate CSS fixes...');

// Function to force show signed-in elements
function immediateShowSignedInElements() {
  const elementsToShow = [
    { id: 'signedInState', display: 'flex' },
    { id: 'mobileSignedInState', display: 'block' },
    { id: 'welcomeBanner', display: 'block' }
  ];
  
  const elementsToHide = [
    'signedOutState',
    'mobileSignedOutState'
  ];
  
  // Check if user should be signed in
  const isSignedIn = window.currentUser || 
                    localStorage.getItem('visualVibeUser') ||
                    localStorage.getItem('currentUser') ||
                    document.getElementById('welcomeBanner')?.textContent?.includes('Welcome');
  
  if (isSignedIn) {
    console.log('👤 User appears to be signed in, showing signed-in elements...');
    
    // Show signed-in elements
    elementsToShow.forEach(({ id, display }) => {
      const element = document.getElementById(id);
      if (element) {
        element.classList.remove('hidden');
        element.style.display = display;
        element.style.visibility = 'visible';
        element.style.opacity = '1';
        console.log(`✅ Showed ${id}`);
      }
    });
    
    // Hide signed-out elements
    elementsToHide.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.classList.add('hidden');
        element.style.display = 'none';
        element.style.visibility = 'hidden';
        console.log(`🔒 Hid ${id}`);
      }
    });
    
    console.log('✅ Immediate signed-in UI applied');
  } else {
    console.log('🔓 User appears to be signed out');
  }
}

// Apply immediate fixes
immediateShowSignedInElements();

// Retry the fix periodically
let retryCount = 0;
const maxRetries = 10;

function retryFix() {
  if (retryCount < maxRetries) {
    retryCount++;
    console.log(`🔄 Retry ${retryCount}/${maxRetries}: Applying auth UI fix...`);
    immediateShowSignedInElements();
    setTimeout(retryFix, 2000);
  } else {
    console.log('⏹️ Max retry attempts reached');
  }
}

// Start retry cycle
setTimeout(retryFix, 1000);

// Make function available globally
window.immediateAuthFix = immediateShowSignedInElements;

console.log('🚨 IMMEDIATE AUTH FIX: Applied');
console.log('💡 Run immediateAuthFix() to manually trigger fix');
