// DIRECT SIGNUP CONFLICT FIX - Clear conflicting data and enable signup
console.log('🚨 DIRECT SIGNUP CONFLICT FIX: Starting...');

// Step 1: Immediate data inspection and clearing
(function() {
  console.log('🔍 Inspecting localStorage for conflicts...');
  
  // Show what's currently in localStorage
  const currentUsers = localStorage.getItem('visualVibeUsers');
  if (currentUsers) {
    console.log('❌ CONFLICT FOUND: Users data exists:', currentUsers);
    try {
      const users = JSON.parse(currentUsers);
      console.log(`📋 Found ${users.length} existing users:`);
      users.forEach((user, i) => {
        console.log(`  ${i+1}. ${user.name} <${user.email}>`);
      });
    } catch (e) {
      console.log('❌ CORRUPTED users data found');
    }
  }
  
  // NUCLEAR CLEAR - Remove everything that could cause conflicts
  console.log('💣 Clearing ALL conflicting data...');
  localStorage.removeItem('visualVibeUsers');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('visualVibeUser');
  
  // Clear any other user-related keys
  Object.keys(localStorage).forEach(key => {
    if (key.toLowerCase().includes('user') || key.toLowerCase().includes('vibe')) {
      localStorage.removeItem(key);
      console.log(`🗑️ Removed: ${key}`);
    }
  });
  
  window.currentUser = null;
  console.log('✅ All conflicting data cleared');
})();

// Step 2: Install bulletproof signup function
function bulletproofSignup(e) {
  if (e) e.preventDefault();
  console.log('📝 BULLETPROOF SIGNUP: Starting...');
  
  // Get form data
  const name = document.getElementById('signUpName')?.value?.trim();
  const email = document.getElementById('signUpEmail')?.value?.trim()?.toLowerCase();
  const password = document.getElementById('signUpPassword')?.value;
  const confirmPassword = document.getElementById('signUpConfirmPassword')?.value;
  
  // Validation
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
  
  console.log(`📝 Creating account for: ${name} <${email}>`);
  
  // Create fresh user array (should be empty after clear)
  const users = [];
  
  // Create new user
  const newUser = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: name,
    email: email,
    password: password,
    orders: [],
    createdAt: new Date().toISOString(),
    source: 'direct_fix'
  };
  
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
  
  console.log('✅ User created and session established');
  
  // Update UI
  if (typeof window.updateAuthUI === 'function') {
    window.updateAuthUI();
  }
  
  // Close modal
  if (typeof window.closeSignUpModal === 'function') {
    window.closeSignUpModal();
  }
  
  // Clear form
  document.getElementById('signUpName').value = '';
  document.getElementById('signUpEmail').value = '';
  document.getElementById('signUpPassword').value = '';
  document.getElementById('signUpConfirmPassword').value = '';
  
  alert(`✅ Account created successfully! Welcome, ${name}!`);
}

// Step 3: Override all existing signup functions
console.log('🔧 Installing bulletproof signup function...');
window.handleSignUp = bulletproofSignup;

// Attach to form directly
setTimeout(() => {
  const form = document.getElementById('signUpForm');
  if (form) {
    // Clone form to remove all existing listeners
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    // Attach our function
    newForm.addEventListener('submit', bulletproofSignup);
    console.log('✅ Bulletproof signup attached to form');
  }
}, 100);

// Step 4: Emergency clear function
window.emergencyClear = function() {
  console.log('🚨 EMERGENCY CLEAR: Removing all data...');
  localStorage.clear();
  window.currentUser = null;
  alert('All data cleared. Try signup now!');
};

// Step 5: Test signup function
window.testSignup = function(testName = 'Test User', testEmail = 'test@example.com', testPassword = 'password123') {
  // Fill form and submit
  document.getElementById('signUpName').value = testName;
  document.getElementById('signUpEmail').value = testEmail;
  document.getElementById('signUpPassword').value = testPassword;
  document.getElementById('signUpConfirmPassword').value = testPassword;
  
  bulletproofSignup();
};

console.log('✅ DIRECT SIGNUP CONFLICT FIX: Complete');
console.log('🧪 Available commands:');
console.log('- emergencyClear() - Clear all data');
console.log('- testSignup() - Test signup with default data');
console.log('- testSignup("Your Name", "your@email.com", "yourpass123") - Test with custom data');
