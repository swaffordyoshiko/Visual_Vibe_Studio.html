// IMMEDIATE BUTTON FIX - LOAD THIS MANUALLY IN CONSOLE IF NEEDED
console.log('⚡ Immediate Button Fix Loading...');

// Override any existing functions immediately
window.openSignInModal = function() {
  console.log('🔑 IMMEDIATE: Opening sign in modal...');
  
  let modal = document.getElementById('signInModal');
  
  // Create modal if missing
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'signInModal';
    modal.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
        <div class="bg-white rounded-xl p-8 max-w-md w-full">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-bold text-gray-800">Sign In</h3>
            <button onclick="closeSignInModal()" class="text-gray-500 hover:text-gray-700 text-3xl">&times;</button>
          </div>
          <form onsubmit="handleSignIn(event); return false;" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" id="signInEmail" required class="w-full border border-gray-300 p-3 rounded-lg" placeholder="your@email.com">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" id="signInPassword" required class="w-full border border-gray-300 p-3 rounded-lg" placeholder="Enter your password">
            </div>
            <button type="submit" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700">Sign In</button>
          </form>
          <p class="text-center text-sm text-gray-600 mt-4">
            Don't have an account? <button onclick="switchToSignUp()" class="text-indigo-600 font-medium">Sign up</button>
          </p>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  
  setTimeout(() => {
    const email = document.getElementById('signInEmail');
    if (email) email.focus();
  }, 100);
};

window.openSignUpModal = function() {
  console.log('📝 IMMEDIATE: Opening sign up modal...');
  
  let modal = document.getElementById('signUpModal');
  
  // Create modal if missing
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'signUpModal';
    modal.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
        <div class="bg-white rounded-xl p-8 max-w-md w-full">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-bold text-gray-800">Create Account</h3>
            <button onclick="closeSignUpModal()" class="text-gray-500 hover:text-gray-700 text-3xl">&times;</button>
          </div>
          <form onsubmit="handleSignUp(event); return false;" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" id="signUpName" required class="w-full border border-gray-300 p-3 rounded-lg" placeholder="Enter your full name">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" id="signUpEmail" required class="w-full border border-gray-300 p-3 rounded-lg" placeholder="your@email.com">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" id="signUpPassword" required class="w-full border border-gray-300 p-3 rounded-lg" placeholder="Create a password" minlength="6">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input type="password" id="signUpConfirmPassword" required class="w-full border border-gray-300 p-3 rounded-lg" placeholder="Confirm your password">
            </div>
            <button type="submit" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700">Create Account</button>
          </form>
          <p class="text-center text-sm text-gray-600 mt-4">
            Already have an account? <button onclick="switchToSignIn()" class="text-indigo-600 font-medium">Sign in</button>
          </p>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  
  setTimeout(() => {
    const name = document.getElementById('signUpName');
    if (name) name.focus();
  }, 100);
};

window.closeSignInModal = function() {
  const modal = document.getElementById('signInModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
};

window.closeSignUpModal = function() {
  const modal = document.getElementById('signUpModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
};

window.switchToSignUp = function() {
  closeSignInModal();
  setTimeout(openSignUpModal, 100);
};

window.switchToSignIn = function() {
  closeSignUpModal();
  setTimeout(openSignInModal, 100);
};

// Basic auth handlers
window.handleSignIn = function(e) {
  if (e) e.preventDefault();
  
  const email = document.getElementById('signInEmail').value.trim().toLowerCase();
  const password = document.getElementById('signInPassword').value;
  
  if (!email || !password) {
    alert('Please enter both email and password.');
    return;
  }
  
  const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
  const user = users.find(u => u.email.toLowerCase() === email && u.password === password);
  
  if (user) {
    window.currentUser = user;
    localStorage.setItem('visualVibeUser', JSON.stringify(user));
    closeSignInModal();
    alert('Welcome back, ' + user.name + '!');
  } else {
    alert('Invalid email or password.');
  }
};

window.handleSignUp = function(e) {
  if (e) e.preventDefault();
  
  const name = document.getElementById('signUpName').value.trim();
  const email = document.getElementById('signUpEmail').value.trim().toLowerCase();
  const password = document.getElementById('signUpPassword').value;
  const confirmPassword = document.getElementById('signUpConfirmPassword').value;
  
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
  
  const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
  
  if (users.find(u => u.email.toLowerCase() === email)) {
    alert('Account already exists with this email.');
    return;
  }
  
  const newUser = {
    id: Date.now().toString(),
    name: name,
    email: email,
    password: password,
    orders: [],
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem('visualVibeUsers', JSON.stringify(users));
  
  window.currentUser = newUser;
  localStorage.setItem('visualVibeUser', JSON.stringify(newUser));
  
  closeSignUpModal();
  alert('Welcome, ' + name + '! Account created successfully.');
};

// Fix all buttons immediately
function fixButtons() {
  const signInButtons = document.querySelectorAll('button[onclick*="openSignInModal"], a[onclick*="openSignInModal"]');
  const signUpButtons = document.querySelectorAll('button[onclick*="openSignUpModal"], a[onclick*="openSignUpModal"]');
  
  signInButtons.forEach(btn => {
    btn.onclick = function(e) {
      e.preventDefault();
      openSignInModal();
    };
  });
  
  signUpButtons.forEach(btn => {
    btn.onclick = function(e) {
      e.preventDefault();
      openSignUpModal();
    };
  });
  
  console.log(`✅ IMMEDIATE: Fixed ${signInButtons.length + signUpButtons.length} buttons`);
}

// Apply fix immediately
fixButtons();

// Apply fix every 3 seconds
setInterval(fixButtons, 3000);

console.log('✅ IMMEDIATE BUTTON FIX APPLIED - Try clicking sign in/sign up buttons now!');
