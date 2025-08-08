// MANUAL LOADER FOR WORKING AUTH FIX
// Run this in browser console to manually load the working auth fix

console.log('🔧 Loading Working Auth Fix manually...');

// Method 1: Load from file
function loadWorkingAuthFix() {
  const script = document.createElement('script');
  script.src = 'working-auth-fix.js?' + Date.now(); // Cache busting
  script.onload = function() {
    console.log('✅ Working Auth Fix loaded from file successfully');
    testButtons();
  };
  script.onerror = function() {
    console.log('❌ Failed to load from file, applying inline fix...');
    applyInlineFix();
  };
  document.head.appendChild(script);
}

// Method 2: Inline fix
function applyInlineFix() {
  console.log('🔧 Applying inline working auth fix...');
  
  // Simple working sign in modal
  window.openSignInModal = function() {
    console.log('🔑 Opening sign in modal (inline)...');
    
    const modal = document.createElement('div');
    modal.id = 'workingSignInModal';
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:99999;';
    modal.innerHTML = `
      <div style="background:white;padding:2rem;border-radius:0.5rem;max-width:400px;width:90%;max-height:90vh;overflow-y:auto;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
          <h3 style="font-size:1.5rem;font-weight:bold;margin:0;">Sign In</h3>
          <button onclick="this.closest('#workingSignInModal').remove()" style="background:none;border:none;font-size:2rem;cursor:pointer;">&times;</button>
        </div>
        <form onsubmit="workingSignIn(event); return false;" style="display:flex;flex-direction:column;gap:1rem;">
          <div>
            <label style="display:block;margin-bottom:0.5rem;font-weight:bold;">Email:</label>
            <input type="email" id="workingSignInEmail" required style="width:100%;padding:0.75rem;border:2px solid #ccc;border-radius:0.25rem;" placeholder="Enter your email">
          </div>
          <div>
            <label style="display:block;margin-bottom:0.5rem;font-weight:bold;">Password:</label>
            <input type="password" id="workingSignInPassword" required style="width:100%;padding:0.75rem;border:2px solid #ccc;border-radius:0.25rem;" placeholder="Enter your password">
          </div>
          <button type="submit" style="background:#4f46e5;color:white;padding:0.75rem;border:none;border-radius:0.25rem;font-weight:bold;cursor:pointer;">Sign In</button>
        </form>
        <div style="text-align:center;margin-top:1rem;">
          <p style="margin:0.5rem 0;">Don't have an account?</p>
          <button onclick="this.closest('#workingSignInModal').remove(); openSignUpModal();" style="background:none;border:none;color:#4f46e5;font-weight:bold;cursor:pointer;">Create Account</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('workingSignInEmail').focus();
  };

  // Simple working sign up modal
  window.openSignUpModal = function() {
    console.log('📝 Opening sign up modal (inline)...');
    
    const modal = document.createElement('div');
    modal.id = 'workingSignUpModal';
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:99999;';
    modal.innerHTML = `
      <div style="background:white;padding:2rem;border-radius:0.5rem;max-width:400px;width:90%;max-height:90vh;overflow-y:auto;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
          <h3 style="font-size:1.5rem;font-weight:bold;margin:0;">Create Account</h3>
          <button onclick="this.closest('#workingSignUpModal').remove()" style="background:none;border:none;font-size:2rem;cursor:pointer;">&times;</button>
        </div>
        <form onsubmit="workingSignUp(event); return false;" style="display:flex;flex-direction:column;gap:1rem;">
          <div>
            <label style="display:block;margin-bottom:0.5rem;font-weight:bold;">Full Name:</label>
            <input type="text" id="workingSignUpName" required style="width:100%;padding:0.75rem;border:2px solid #ccc;border-radius:0.25rem;" placeholder="Enter your full name">
          </div>
          <div>
            <label style="display:block;margin-bottom:0.5rem;font-weight:bold;">Email:</label>
            <input type="email" id="workingSignUpEmail" required style="width:100%;padding:0.75rem;border:2px solid #ccc;border-radius:0.25rem;" placeholder="Enter your email">
          </div>
          <div>
            <label style="display:block;margin-bottom:0.5rem;font-weight:bold;">Password:</label>
            <input type="password" id="workingSignUpPassword" required minlength="6" style="width:100%;padding:0.75rem;border:2px solid #ccc;border-radius:0.25rem;" placeholder="Create a password (min 6 chars)">
          </div>
          <div>
            <label style="display:block;margin-bottom:0.5rem;font-weight:bold;">Confirm Password:</label>
            <input type="password" id="workingSignUpConfirm" required style="width:100%;padding:0.75rem;border:2px solid #ccc;border-radius:0.25rem;" placeholder="Confirm your password">
          </div>
          <button type="submit" style="background:#4f46e5;color:white;padding:0.75rem;border:none;border-radius:0.25rem;font-weight:bold;cursor:pointer;">Create Account</button>
        </form>
        <div style="text-align:center;margin-top:1rem;">
          <p style="margin:0.5rem 0;">Already have an account?</p>
          <button onclick="this.closest('#workingSignUpModal').remove(); openSignInModal();" style="background:none;border:none;color:#4f46e5;font-weight:bold;cursor:pointer;">Sign In</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('workingSignUpName').focus();
  };

  // Working sign in handler
  window.workingSignIn = function(e) {
    e.preventDefault();
    
    const email = document.getElementById('workingSignInEmail').value.trim().toLowerCase();
    const password = document.getElementById('workingSignInPassword').value.trim();
    
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    
    const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    const user = users.find(u => u.email && u.email.toLowerCase() === email && u.password === password);
    
    if (user) {
      window.currentUser = user;
      localStorage.setItem('visualVibeUser', JSON.stringify(user));
      document.getElementById('workingSignInModal').remove();
      alert('✅ Welcome back, ' + user.name + '!');
      
      // Update UI if function exists
      if (typeof window.updateAuthUI === 'function') {
        window.updateAuthUI();
      }
    } else {
      alert('❌ Invalid email or password.');
    }
  };

  // Working sign up handler
  window.workingSignUp = function(e) {
    e.preventDefault();
    
    const name = document.getElementById('workingSignUpName').value.trim();
    const email = document.getElementById('workingSignUpEmail').value.trim().toLowerCase();
    const password = document.getElementById('workingSignUpPassword').value.trim();
    const confirm = document.getElementById('workingSignUpConfirm').value.trim();
    
    if (!name || !email || !password || !confirm) {
      alert('Please fill in all fields.');
      return;
    }
    
    if (password !== confirm) {
      alert('Passwords do not match.');
      return;
    }
    
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    
    const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    
    if (users.find(u => u.email && u.email.toLowerCase() === email)) {
      alert('❌ Account already exists with this email.');
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
    
    document.getElementById('workingSignUpModal').remove();
    alert('✅ Welcome, ' + name + '! Account created successfully.');
    
    // Update UI if function exists
    if (typeof window.updateAuthUI === 'function') {
      window.updateAuthUI();
    }
  };

  // Fix buttons
  fixButtonsInline();
  
  console.log('✅ Inline working auth fix applied successfully');
}

// Fix buttons with inline fix
function fixButtonsInline() {
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
  
  console.log(`✅ Fixed ${signInButtons.length + signUpButtons.length} buttons with inline fix`);
}

// Test buttons function
function testButtons() {
  console.log('🧪 Testing sign in/sign up buttons...');
  
  const signInButtons = document.querySelectorAll('button[onclick*="openSignInModal"], a[onclick*="openSignInModal"]');
  const signUpButtons = document.querySelectorAll('button[onclick*="openSignUpModal"], a[onclick*="openSignUpModal"]');
  
  console.log(`Found ${signInButtons.length} sign in buttons and ${signUpButtons.length} sign up buttons`);
  
  if (signInButtons.length > 0) {
    console.log('Testing first sign in button...');
    try {
      if (typeof openSignInModal === 'function') {
        console.log('✅ openSignInModal function is available');
      } else {
        console.log('❌ openSignInModal function is NOT available');
      }
    } catch(e) {
      console.log('❌ Error testing openSignInModal:', e);
    }
  }
  
  console.log('🎯 Manual test commands:');
  console.log('  - openSignInModal()');
  console.log('  - openSignUpModal()');
}

// Auto-run
console.log('🚀 Auto-loading working auth fix...');
loadWorkingAuthFix();
