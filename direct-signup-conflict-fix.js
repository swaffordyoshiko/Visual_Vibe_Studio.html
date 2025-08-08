// FIX AUTH UI DISPLAY - Ensure signed-in buttons are visible after signup
console.log('🔧 FIXING AUTH UI DISPLAY: Ensuring signed-in elements are visible...');

// Enhanced updateAuthUI function that properly handles CSS classes and styles
function fixedUpdateAuthUI() {
  console.log('🔄 FIXED UPDATE AUTH UI: Running...');
  
  const signedOutState = document.getElementById('signedOutState');
  const signedInState = document.getElementById('signedInState');
  const mobileSignedOutState = document.getElementById('mobileSignedOutState');
  const mobileSignedInState = document.getElementById('mobileSignedInState');
  const userNameSpan = document.getElementById('userName');
  const welcomeBanner = document.getElementById('welcomeBanner');
  
  console.log('🔍 Auth UI elements found:', {
    signedOutState: !!signedOutState,
    signedInState: !!signedInState,
    mobileSignedOutState: !!mobileSignedOutState,
    mobileSignedInState: !!mobileSignedInState,
    currentUser: !!window.currentUser
  });
  
  if (window.currentUser) {
    console.log('✅ User is signed in:', window.currentUser.name);
    
    // DESKTOP - Hide signed out state
    if (signedOutState) {
      signedOutState.classList.add('hidden');
      signedOutState.style.display = 'none';
      console.log('🖥️ Hidden desktop signed-out state');
    }
    
    // DESKTOP - Show signed in state
    if (signedInState) {
      signedInState.classList.remove('hidden');
      signedInState.style.display = 'flex';
      signedInState.style.visibility = 'visible';
      signedInState.style.opacity = '1';
      console.log('🖥️ Showed desktop signed-in state');
    }
    
    // MOBILE - Hide signed out state
    if (mobileSignedOutState) {
      mobileSignedOutState.classList.add('hidden');
      mobileSignedOutState.style.display = 'none';
      console.log('📱 Hidden mobile signed-out state');
    }
    
    // MOBILE - Show signed in state
    if (mobileSignedInState) {
      mobileSignedInState.classList.remove('hidden');
      mobileSignedInState.style.display = 'block';
      mobileSignedInState.style.visibility = 'visible';
      mobileSignedInState.style.opacity = '1';
      console.log('📱 Showed mobile signed-in state');
    }
    
    // Update user name
    if (userNameSpan) {
      userNameSpan.textContent = window.currentUser.name;
      console.log('👤 Updated user name display');
    }
    
    // Show welcome banner
    if (welcomeBanner) {
      welcomeBanner.classList.remove('hidden');
      welcomeBanner.style.display = 'block';
      
      const welcomeMessage = document.getElementById('welcomeMessage');
      if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome back, ${window.currentUser.name}! 👋`;
      }
      console.log('🎉 Showed welcome banner');
    }
    
  } else {
    console.log('🚪 User is signed out');
    
    // DESKTOP - Show signed out state
    if (signedOutState) {
      signedOutState.classList.remove('hidden');
      signedOutState.style.display = 'flex';
      signedOutState.style.visibility = 'visible';
      signedOutState.style.opacity = '1';
      console.log('🖥️ Showed desktop signed-out state');
    }
    
    // DESKTOP - Hide signed in state
    if (signedInState) {
      signedInState.classList.add('hidden');
      signedInState.style.display = 'none';
      console.log('🖥️ Hidden desktop signed-in state');
    }
    
    // MOBILE - Show signed out state
    if (mobileSignedOutState) {
      mobileSignedOutState.classList.remove('hidden');
      mobileSignedOutState.style.display = 'block';
      mobileSignedOutState.style.visibility = 'visible';
      mobileSignedOutState.style.opacity = '1';
      console.log('📱 Showed mobile signed-out state');
    }
    
    // MOBILE - Hide signed in state
    if (mobileSignedInState) {
      mobileSignedInState.classList.add('hidden');
      mobileSignedInState.style.display = 'none';
      console.log('📱 Hidden mobile signed-in state');
    }
    
    // Hide welcome banner
    if (welcomeBanner) {
      welcomeBanner.classList.add('hidden');
      welcomeBanner.style.display = 'none';
      console.log('🙈 Hidden welcome banner');
    }
  }
  
  // Force a reflow to ensure changes are applied
  if (signedInState) signedInState.offsetHeight;
  if (mobileSignedInState) mobileSignedInState.offsetHeight;
  
  console.log('✅ FIXED UPDATE AUTH UI: Complete');
}

// Enhanced signup function with proper UI update
function fixedSignUpWithUI(e) {
  if (e) e.preventDefault();
  console.log('📝 FIXED SIGNUP WITH UI: Starting...');
  
  // Get form elements
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
  
  console.log(`📝 Signup attempt: "${name}" <${email}>`);
  
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
  
  // Get existing users
  let users = [];
  try {
    const existingData = localStorage.getItem('visualVibeUsers');
    if (existingData) {
      users = JSON.parse(existingData);
    }
  } catch (e) {
    users = [];
  }
  
  // Check for duplicate
  const duplicate = users.find(u => u.email === email);
  if (duplicate) {
    alert(`Account exists for ${duplicate.name}.`);
    return;
  }
  
  // Create new user
  const newUser = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: name,
    email: email,
    password: password,
    orders: [],
    createdAt: new Date().toISOString()
  };
  
  console.log('👤 Creating user:', newUser);
  
  // Save user
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
  
  console.log('💾 User and session saved');
  
  // Close modal first
  if (typeof window.closeSignUpModal === 'function') {
    window.closeSignUpModal();
  }
  
  // Clear form
  nameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
  confirmPasswordInput.value = '';
  
  // Update UI with delay to ensure modal is closed
  setTimeout(() => {
    console.log('🔄 Updating auth UI after signup...');
    fixedUpdateAuthUI();
  }, 100);
  
  // Show success message
  alert(`✅ SUCCESS! Account created for ${name}!`);
  console.log('✅ Signup with UI update completed successfully');
}

// Enhanced signin function with proper UI update
function fixedSignInWithUI(e) {
  if (e) e.preventDefault();
  console.log('🔑 FIXED SIGNIN WITH UI: Starting...');
  
  const emailInput = document.getElementById('signInEmail');
  const passwordInput = document.getElementById('signInPassword');
  
  if (!emailInput || !passwordInput) {
    alert('Form elements not found. Please refresh the page.');
    return;
  }
  
  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;
  
  if (!email || !password) {
    alert('Please enter both email and password.');
    return;
  }
  
  // Get users
  let users = [];
  try {
    const existingData = localStorage.getItem('visualVibeUsers');
    if (existingData) {
      users = JSON.parse(existingData);
    }
  } catch (e) {
    users = [];
  }
  
  // Find user
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Create session
    window.currentUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
    
    // Close modal
    if (typeof window.closeSignInModal === 'function') {
      window.closeSignInModal();
    }
    
    // Update UI with delay
    setTimeout(() => {
      console.log('🔄 Updating auth UI after signin...');
      fixedUpdateAuthUI();
    }, 100);
    
    alert(`Welcome back, ${user.name}!`);
    console.log('✅ Signin with UI update completed successfully');
  } else {
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      alert('Incorrect password. Please try again.');
    } else {
      alert('No account found with this email. Please sign up first.');
    }
  }
}

// Install the fixed functions
console.log('🔧 Installing fixed auth functions...');

// Override existing functions
window.updateAuthUI = fixedUpdateAuthUI;
window.handleSignUp = fixedSignUpWithUI;
window.handleSignIn = fixedSignInWithUI;

// Attach to forms
setTimeout(() => {
  const signUpForm = document.getElementById('signUpForm');
  const signInForm = document.getElementById('signInForm');
  
  if (signUpForm) {
    signUpForm.removeEventListener('submit', window.handleSignUp);
    signUpForm.addEventListener('submit', window.handleSignUp);
    console.log('✅ Fixed signup handler attached');
  }
  
  if (signInForm) {
    signInForm.removeEventListener('submit', window.handleSignIn);
    signInForm.addEventListener('submit', window.handleSignIn);
    console.log('✅ Fixed signin handler attached');
  }
}, 500);

// Test the auth UI immediately if user is signed in
setTimeout(() => {
  if (window.currentUser) {
    console.log('🔄 User already signed in, updating UI...');
    fixedUpdateAuthUI();
  }
}, 1000);

// Manual fix function for testing
window.fixAuthUIManually = function() {
  console.log('🔧 MANUAL AUTH UI FIX: Running...');
  fixedUpdateAuthUI();
};

console.log('✅ AUTH UI DISPLAY FIX: Installed successfully');
console.log('🧪 Manual fix command: fixAuthUIManually()');
