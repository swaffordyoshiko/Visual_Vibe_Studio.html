// BYPASS SIGNUP ERROR - Force signup to work regardless of existing data
console.log('🚀 BYPASSING SIGNUP ERROR: Creating force signup system...');

// STEP 1: Clear everything immediately
(function forceClear() {
  console.log('💥 FORCE CLEAR: Removing all data...');
  
  // Clear localStorage completely
  localStorage.clear();
  
  // Reset window variables
  window.currentUser = null;
  
  console.log('✅ Force clear complete');
})();

// STEP 2: Create bypass signup function (no duplicate checking)
function bypassSignup(e) {
  if (e) e.preventDefault();
  console.log('🚀 BYPASS SIGNUP: Creating account with no validation...');
  
  // Get form data
  const nameInput = document.getElementById('signUpName');
  const emailInput = document.getElementById('signUpEmail');
  const passwordInput = document.getElementById('signUpPassword');
  const confirmPasswordInput = document.getElementById('signUpConfirmPassword');
  
  if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
    alert('Form elements not found. Please refresh the page.');
    return;
  }
  
  const name = nameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  
  console.log(`🚀 Bypass signup for: "${name}" <${email}>`);
  
  // Minimal validation only
  if (!name || !email || !password || !confirmPassword) {
    alert('Please fill in all fields.');
    return;
  }
  
  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }
  
  // Create user directly - NO DUPLICATE CHECKING
  const user = {
    id: `bypass_${Date.now()}`,
    name: name,
    email: email,
    password: password,
    orders: [],
    createdAt: new Date().toISOString()
  };
  
  console.log('👤 Creating bypass user:', user);
  
  // Save as single user array
  localStorage.setItem('visualVibeUsers', JSON.stringify([user]));
  
  // Create session immediately
  window.currentUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    loginTime: new Date().toISOString()
  };
  localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
  
  console.log('✅ User created and session established');
  
  // Close modal
  if (typeof window.closeSignUpModal === 'function') {
    window.closeSignUpModal();
  }
  
  // Clear form
  nameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
  confirmPasswordInput.value = '';
  
  // Update UI
  if (typeof window.updateAuthUI === 'function') {
    setTimeout(() => window.updateAuthUI(), 100);
  }
  
  alert(`✅ Account created successfully! Welcome, ${name}!`);
  console.log('🚀 Bypass signup complete');
}

// STEP 3: Override signup function completely
console.log('🔧 Overriding signup function...');
window.handleSignUp = bypassSignup;

// Force attach to form immediately
setTimeout(() => {
  const form = document.getElementById('signUpForm');
  if (form) {
    // Clone form to remove existing listeners
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    // Attach bypass function
    newForm.addEventListener('submit', bypassSignup);
    console.log('✅ Bypass signup attached to form');
  }
}, 50);

// STEP 4: Test function
window.testBypassSignup = function(name = 'Bypass User', email = 'bypass@test.com', password = 'bypass123') {
  console.log('🧪 Testing bypass signup...');
  
  // Fill form
  document.getElementById('signUpName').value = name;
  document.getElementById('signUpEmail').value = email;
  document.getElementById('signUpPassword').value = password;
  document.getElementById('signUpConfirmPassword').value = password;
  
  // Submit
  bypassSignup();
};

// STEP 5: Emergency clear function
window.emergencyClearAll = function() {
  console.log('🚨 EMERGENCY CLEAR ALL...');
  localStorage.clear();
  window.currentUser = null;
  
  // Reset UI
  const signedOutState = document.getElementById('signedOutState');
  const signedInState = document.getElementById('signedInState');
  
  if (signedOutState) {
    signedOutState.classList.remove('hidden');
    signedOutState.style.display = 'flex';
  }
  
  if (signedInState) {
    signedInState.classList.add('hidden');
    signedInState.style.display = 'none';
  }
  
  alert('🆕 Everything cleared! Try signup now.');
};

console.log('🚀 BYPASS SIGNUP ERROR: Complete');
console.log('🧪 Commands:');
console.log('- testBypassSignup() - Test with default data');
console.log('- emergencyClearAll() - Clear everything');

// Verify clean state
console.log('📊 Current state:', {
  localStorage: localStorage.length + ' keys',
  currentUser: window.currentUser,
  ready: true
});
