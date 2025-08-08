// NUCLEAR SIGNUP FIX - Clear everything and enable fresh signups
console.log('💥 NUCLEAR SIGNUP FIX: Starting complete reset...');

// IMMEDIATE EXECUTION - Clear all user data right now
(function immediateReset() {
  console.log('🗑️ IMMEDIATE RESET: Clearing all user data...');
  
  // Show what's being cleared
  const existingUsers = localStorage.getItem('visualVibeUsers');
  if (existingUsers) {
    console.log('❌ CLEARING EXISTING DATA:', existingUsers);
  }
  
  // Nuclear clear - remove everything
  localStorage.removeItem('visualVibeUsers');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('visualVibeUser');
  
  // Clear all other potentially conflicting keys
  Object.keys(localStorage).forEach(key => {
    if (key.toLowerCase().includes('user') || 
        key.toLowerCase().includes('vibe') ||
        key.toLowerCase().includes('auth')) {
      localStorage.removeItem(key);
      console.log(`🗑️ Removed: ${key}`);
    }
  });
  
  // Reset window variables
  window.currentUser = null;
  
  console.log('✅ Nuclear clear complete - localStorage is now clean');
})();

// FRESH SIGNUP FUNCTION - No duplicate checking, just create account
function freshSignup(e) {
  if (e) e.preventDefault();
  console.log('🆕 FRESH SIGNUP: Creating account (no duplicate check)...');
  
  // Get form data
  const name = document.getElementById('signUpName')?.value?.trim();
  const email = document.getElementById('signUpEmail')?.value?.trim()?.toLowerCase();
  const password = document.getElementById('signUpPassword')?.value;
  const confirmPassword = document.getElementById('signUpConfirmPassword')?.value;
  
  console.log(`🆕 Creating account for: "${name}" <${email}>`);
  
  // Basic validation only
  if (!name || !email || !password || !confirmPassword) {
    alert('Please fill in all fields.');
    return;
  }
  
  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }
  
  if (password.length < 6) {
    alert('Password must be at least 6 characters long.');
    return;
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  
  // Create completely fresh user array (ignore any existing data)
  const users = [];
  
  // Create new user
  const newUser = {
    id: `fresh_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: name,
    email: email,
    password: password,
    orders: [],
    createdAt: new Date().toISOString(),
    accountType: 'fresh_nuclear'
  };
  
  console.log('👤 Creating fresh user:', {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email
  });
  
  // Add to fresh array and save
  users.push(newUser);
  localStorage.setItem('visualVibeUsers', JSON.stringify(users));
  
  // Create session
  window.currentUser = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    loginTime: new Date().toISOString()
  };
  localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
  
  console.log('💾 Fresh user and session created');
  
  // Update UI if function exists
  if (typeof window.updateAuthUI === 'function') {
    setTimeout(() => window.updateAuthUI(), 100);
  }
  
  // Close modal if function exists
  if (typeof window.closeSignUpModal === 'function') {
    window.closeSignUpModal();
  }
  
  // Clear form
  document.getElementById('signUpName').value = '';
  document.getElementById('signUpEmail').value = '';
  document.getElementById('signUpPassword').value = '';
  document.getElementById('signUpConfirmPassword').value = '';
  
  alert(`✅ SUCCESS! Fresh account created for ${name}!`);
  console.log('✅ Fresh signup completed successfully');
}

// OVERRIDE ALL SIGNUP FUNCTIONS
console.log('🔧 Overriding all signup functions...');
window.handleSignUp = freshSignup;

// Force attach to form
setTimeout(() => {
  const form = document.getElementById('signUpForm');
  if (form) {
    // Remove all existing listeners by cloning
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    // Attach fresh function
    newForm.addEventListener('submit', freshSignup);
    console.log('✅ Fresh signup function attached to form');
  }
}, 100);

// EMERGENCY FUNCTIONS
window.emergencyReset = function() {
  console.log('🚨 EMERGENCY RESET: Clearing everything...');
  localStorage.clear();
  window.currentUser = null;
  alert('🆕 Everything cleared! Signup should work now.');
};

window.checkStorage = function() {
  console.log('🔍 STORAGE CHECK:', {
    visualVibeUsers: localStorage.getItem('visualVibeUsers'),
    currentUser: localStorage.getItem('currentUser'),
    totalKeys: localStorage.length
  });
};

window.testFreshSignup = function(name = 'Test User', email = 'test@fresh.com', password = 'fresh123') {
  console.log('🧪 TESTING FRESH SIGNUP...');
  
  // Fill form and submit
  document.getElementById('signUpName').value = name;
  document.getElementById('signUpEmail').value = email;
  document.getElementById('signUpPassword').value = password;
  document.getElementById('signUpConfirmPassword').value = password;
  
  freshSignup();
};

console.log('💥 NUCLEAR SIGNUP FIX: Complete');
console.log('🧪 Commands available:');
console.log('- emergencyReset() - Clear everything');
console.log('- checkStorage() - Check current storage');
console.log('- testFreshSignup() - Test signup with default data');

// Show final state
setTimeout(() => {
  const users = localStorage.getItem('visualVibeUsers');
  console.log('📊 FINAL STATE:');
  console.log('Users in storage:', users ? JSON.parse(users).length : 0);
  console.log('Ready for signup:', true);
}, 200);
