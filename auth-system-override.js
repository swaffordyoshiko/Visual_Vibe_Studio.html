// AUTH SYSTEM OVERRIDE - Loads after all conflicting scripts to fix authentication
console.log('🔐 Auth System Override Loading...');

// Wait for DOM and other scripts to load first
setTimeout(() => {
  console.log('🔧 Overriding conflicting authentication scripts...');

  // DISABLE ALL CONFLICTING FUNCTIONS
  const conflictingFunctions = [
    'handleSignIn_DISABLED', 'handleSignUp_DISABLED', 'handleSignUp_EMERGENCY_DISABLED',
    'handleSignUp_DISABLED_FROM_FINAL_CHECK', 'handleSignUp_CROSS_DEVICE_DISABLED',
    'openSignInModal_conflicted', 'openSignUpModal_conflicted'
  ];

  conflictingFunctions.forEach(fn => {
    if (window[fn]) {
      window[fn] = () => console.log(`🚫 ${fn} disabled by override`);
    }
  });

  // CLEAR BROKEN AUTH FUNCTIONS
  const brokenAuthFunctions = ['handleSignIn', 'handleSignUp', 'openSignInModal', 'openSignUpModal'];
  brokenAuthFunctions.forEach(fn => {
    delete window[fn];
  });

  // CORE AUTHENTICATION STATE
  let isProcessing = false;

  // UTILITY FUNCTIONS  
  function showMessage(message, type = 'info') {
    console.log(`${type.toUpperCase()}: ${message}`);
    alert(message); // Simple fallback
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // USER STORAGE
  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    } catch {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem('visualVibeUsers', JSON.stringify(users));
  }

  function saveSession(user) {
    localStorage.setItem('visualVibeUser', JSON.stringify(user));
    window.currentUser = user;
  }

  // MODAL FUNCTIONS
  function openSignInModal() {
    console.log('🔑 Opening Sign In Modal');
    const modal = document.getElementById('signInModal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      setTimeout(() => {
        const emailInput = document.getElementById('signInEmail');
        if (emailInput) emailInput.focus();
      }, 100);
    } else {
      showMessage('Sign in form not available. Please refresh the page.', 'error');
    }
  }

  function openSignUpModal() {
    console.log('📝 Opening Sign Up Modal');
    const modal = document.getElementById('signUpModal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      setTimeout(() => {
        const nameInput = document.getElementById('signUpName');
        if (nameInput) nameInput.focus();
      }, 100);
    } else {
      showMessage('Sign up form not available. Please refresh the page.', 'error');
    }
  }

  function closeSignInModal() {
    const modal = document.getElementById('signInModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
  }

  function closeSignUpModal() {
    const modal = document.getElementById('signUpModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
  }

  // AUTH HANDLERS
  function handleSignIn(event) {
    if (event) event.preventDefault();
    if (isProcessing) return;
    
    isProcessing = true;
    console.log('🔑 Processing Sign In');

    try {
      const email = document.getElementById('signInEmail')?.value?.trim()?.toLowerCase();
      const password = document.getElementById('signInPassword')?.value?.trim();

      if (!email || !password) {
        showMessage('Please enter both email and password.', 'error');
        return;
      }

      if (!validateEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
      }

      const users = getUsers();
      const user = users.find(u => u.email?.toLowerCase() === email && u.password === password);

      if (user) {
        console.log('✅ Sign in successful:', user.name);
        
        const sessionUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          firstName: user.firstName || user.name.split(' ')[0],
          signedIn: true,
          loginTime: new Date().toISOString()
        };

        saveSession(sessionUser);
        updateAuthUI();
        closeSignInModal();
        showMessage(`Welcome back, ${sessionUser.firstName}!`, 'success');
        
      } else {
        const existingUser = users.find(u => u.email?.toLowerCase() === email);
        if (existingUser) {
          showMessage('Incorrect password. Please try again.', 'error');
        } else {
          showMessage('No account found. Please sign up first.', 'error');
        }
      }
    } catch (error) {
      console.error('Sign in error:', error);
      showMessage('Sign in failed. Please try again.', 'error');
    } finally {
      isProcessing = false;
    }
  }

  function handleSignUp(event) {
    if (event) event.preventDefault();
    if (isProcessing) return;
    
    isProcessing = true;
    console.log('📝 Processing Sign Up');

    try {
      const name = document.getElementById('signUpName')?.value?.trim();
      const email = document.getElementById('signUpEmail')?.value?.trim()?.toLowerCase();
      const password = document.getElementById('signUpPassword')?.value?.trim();
      const confirmPassword = document.getElementById('signUpConfirmPassword')?.value?.trim();

      if (!name || !email || !password || !confirmPassword) {
        showMessage('Please fill in all fields.', 'error');
        return;
      }

      if (!validateEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
      }

      if (password.length < 6) {
        showMessage('Password must be at least 6 characters.', 'error');
        return;
      }

      if (password !== confirmPassword) {
        showMessage('Passwords do not match.', 'error');
        return;
      }

      const users = getUsers();
      const existingUser = users.find(u => u.email?.toLowerCase() === email);

      if (existingUser) {
        showMessage('Account already exists. Please sign in instead.', 'error');
        return;
      }

      const newUser = {
        id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        name: name,
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' ') || '',
        email: email,
        password: password,
        orders: [],
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      saveUsers(users);

      const sessionUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        firstName: newUser.firstName,
        signedIn: true,
        loginTime: new Date().toISOString()
      };

      saveSession(sessionUser);
      updateAuthUI();
      closeSignUpModal();
      showMessage(`Welcome, ${newUser.firstName}! Account created successfully.`, 'success');

    } catch (error) {
      console.error('Sign up error:', error);
      showMessage('Sign up failed. Please try again.', 'error');
    } finally {
      isProcessing = false;
    }
  }

  function signOut() {
    localStorage.removeItem('visualVibeUser');
    window.currentUser = null;
    updateAuthUI();
    showMessage('Signed out successfully.', 'success');
  }

  function updateAuthUI() {
    try {
      const user = window.currentUser;
      const signedOutState = document.getElementById('signedOutState');
      const signedInState = document.getElementById('signedInState');
      const userNameSpan = document.getElementById('userName');

      if (user) {
        if (signedOutState) signedOutState.style.display = 'none';
        if (signedInState) signedInState.style.display = 'flex';
        if (userNameSpan) userNameSpan.textContent = user.name;
      } else {
        if (signedOutState) signedOutState.style.display = 'flex';
        if (signedInState) signedInState.style.display = 'none';
      }
    } catch (error) {
      console.error('UI update error:', error);
    }
  }

  // RESTORE SESSION
  function restoreSession() {
    try {
      const savedUser = JSON.parse(localStorage.getItem('visualVibeUser') || 'null');
      if (savedUser && savedUser.signedIn) {
        window.currentUser = savedUser;
        updateAuthUI();
        console.log('Session restored for:', savedUser.name);
      }
    } catch (error) {
      console.error('Session restore error:', error);
    }
  }

  // REGISTER FUNCTIONS GLOBALLY
  window.openSignInModal = openSignInModal;
  window.openSignUpModal = openSignUpModal;
  window.closeSignInModal = closeSignInModal;
  window.closeSignUpModal = closeSignUpModal;
  window.handleSignIn = handleSignIn;
  window.handleSignUp = handleSignUp;
  window.signOut = signOut;
  window.updateAuthUI = updateAuthUI;

  // SETUP EVENT LISTENERS
  function setupListeners() {
    const signInForm = document.getElementById('signInForm');
    if (signInForm) {
      signInForm.removeEventListener('submit', handleSignIn);
      signInForm.addEventListener('submit', handleSignIn);
    }

    const signUpForm = document.getElementById('signUpForm');
    if (signUpForm) {
      signUpForm.removeEventListener('submit', handleSignUp);
      signUpForm.addEventListener('submit', handleSignUp);
    }

    // Fix button onclick handlers
    document.querySelectorAll('button[onclick*="openSignInModal"]').forEach(btn => {
      btn.onclick = openSignInModal;
    });

    document.querySelectorAll('button[onclick*="openSignUpModal"]').forEach(btn => {
      btn.onclick = openSignUpModal;
    });
  }

  // INITIALIZE
  restoreSession();
  setupListeners();

  console.log('✅ Auth System Override Complete');
  console.log('📊 Available functions:', {
    openSignInModal: typeof window.openSignInModal,
    openSignUpModal: typeof window.openSignUpModal,
    handleSignIn: typeof window.handleSignIn,
    handleSignUp: typeof window.handleSignUp
  });

}, 2000); // Wait 2 seconds for other scripts to load first
