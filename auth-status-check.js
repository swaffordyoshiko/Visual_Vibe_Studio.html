// Quick authentication status check
console.log('🔍 Authentication Status Check');

// Check if user is signed in
const currentUser = window.currentUser || JSON.parse(localStorage.getItem('visualVibeUser') || 'null');
console.log('Current User:', currentUser);

// Check UI elements
const elements = {
  signedOutState: document.getElementById('signedOutState'),
  signedInState: document.getElementById('signedInState'),
  mobileSignedOutState: document.getElementById('mobileSignedOutState'),
  mobileSignedInState: document.getElementById('mobileSignedInState'),
  userName: document.getElementById('userName')
};

console.log('UI Elements:', elements);

// Check visibility
Object.entries(elements).forEach(([name, element]) => {
  if (element) {
    console.log(`${name}:`, {
      hidden: element.classList.contains('hidden'),
      display: element.style.display,
      visible: !element.classList.contains('hidden') && element.style.display !== 'none'
    });
  } else {
    console.log(`${name}: NOT FOUND`);
  }
});

// Force update UI if updateAuthUI exists
if (typeof window.updateAuthUI === 'function') {
  console.log('🔄 Forcing UI update...');
  window.updateAuthUI();
} else {
  console.log('❌ updateAuthUI function not found');
}
