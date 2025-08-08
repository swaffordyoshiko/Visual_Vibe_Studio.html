// CONSOLE FIX - COPY AND PASTE THIS INTO BROWSER CONSOLE
// Run this command in the browser console to immediately fix sign in/sign up buttons

console.log('🚨 CONSOLE FIX: Fixing buttons now...');

// Quick working sign in modal
window.openSignInModal = function() {
  const modal = document.createElement('div');
  modal.id = 'consoleSignInModal';
  modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:99999;';
  modal.innerHTML = '<div style="background:white;padding:2rem;border-radius:0.5rem;max-width:400px;width:90%;"><h3 style="font-size:1.5rem;font-weight:bold;margin-bottom:1rem;">Sign In</h3><form onsubmit="consoleSignIn(event);return false;"><input type="email" id="consoleEmail" placeholder="Email" required style="width:100%;margin-bottom:1rem;padding:0.5rem;border:1px solid #ccc;border-radius:0.25rem;"><input type="password" id="consolePassword" placeholder="Password" required style="width:100%;margin-bottom:1rem;padding:0.5rem;border:1px solid #ccc;border-radius:0.25rem;"><button type="submit" style="width:100%;background:#4f46e5;color:white;padding:0.75rem;border:none;border-radius:0.25rem;font-weight:bold;">Sign In</button></form><button onclick="this.closest(\'#consoleSignInModal\').remove()" style="position:absolute;top:1rem;right:1rem;background:none;border:none;font-size:1.5rem;">×</button></div>';
  document.body.appendChild(modal);
  document.getElementById('consoleEmail').focus();
};

// Quick working sign up modal
window.openSignUpModal = function() {
  const modal = document.createElement('div');
  modal.id = 'consoleSignUpModal';
  modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:99999;';
  modal.innerHTML = '<div style="background:white;padding:2rem;border-radius:0.5rem;max-width:400px;width:90%;"><h3 style="font-size:1.5rem;font-weight:bold;margin-bottom:1rem;">Sign Up</h3><form onsubmit="consoleSignUp(event);return false;"><input type="text" id="consoleName" placeholder="Full Name" required style="width:100%;margin-bottom:1rem;padding:0.5rem;border:1px solid #ccc;border-radius:0.25rem;"><input type="email" id="consoleEmailUp" placeholder="Email" required style="width:100%;margin-bottom:1rem;padding:0.5rem;border:1px solid #ccc;border-radius:0.25rem;"><input type="password" id="consolePasswordUp" placeholder="Password (min 6)" required minlength="6" style="width:100%;margin-bottom:1rem;padding:0.5rem;border:1px solid #ccc;border-radius:0.25rem;"><button type="submit" style="width:100%;background:#4f46e5;color:white;padding:0.75rem;border:none;border-radius:0.25rem;font-weight:bold;">Sign Up</button></form><button onclick="this.closest(\'#consoleSignUpModal\').remove()" style="position:absolute;top:1rem;right:1rem;background:none;border:none;font-size:1.5rem;">×</button></div>';
  document.body.appendChild(modal);
  document.getElementById('consoleName').focus();
};

// Quick sign in handler
window.consoleSignIn = function(e) {
  e.preventDefault();
  const email = document.getElementById('consoleEmail').value.trim().toLowerCase();
  const password = document.getElementById('consolePassword').value.trim();
  if (!email || !password) { alert('Please fill all fields'); return; }
  const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
  const user = users.find(u => u.email && u.email.toLowerCase() === email && u.password === password);
  if (user) {
    window.currentUser = user;
    localStorage.setItem('visualVibeUser', JSON.stringify(user));
    document.getElementById('consoleSignInModal').remove();
    alert('✅ Welcome back, ' + user.name + '!');
    // Update UI
    const signedOut = document.getElementById('signedOutState');
    const signedIn = document.getElementById('signedInState');
    const userName = document.getElementById('userName');
    if (signedOut) { signedOut.style.display = 'none'; signedOut.classList.add('hidden'); }
    if (signedIn) { signedIn.style.display = 'flex'; signedIn.classList.remove('hidden'); }
    if (userName) userName.textContent = user.name;
  } else {
    alert('❌ Invalid email or password');
  }
};

// Quick sign up handler
window.consoleSignUp = function(e) {
  e.preventDefault();
  const name = document.getElementById('consoleName').value.trim();
  const email = document.getElementById('consoleEmailUp').value.trim().toLowerCase();
  const password = document.getElementById('consolePasswordUp').value.trim();
  if (!name || !email || !password) { alert('Please fill all fields'); return; }
  if (password.length < 6) { alert('Password must be at least 6 characters'); return; }
  const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
  if (users.find(u => u.email && u.email.toLowerCase() === email)) { alert('Email already exists'); return; }
  const newUser = { id: Date.now().toString(), name: name, email: email, password: password, orders: [], createdAt: new Date().toISOString() };
  users.push(newUser);
  localStorage.setItem('visualVibeUsers', JSON.stringify(users));
  window.currentUser = newUser;
  localStorage.setItem('visualVibeUser', JSON.stringify(newUser));
  document.getElementById('consoleSignUpModal').remove();
  alert('✅ Welcome, ' + name + '! Account created!');
  // Update UI
  const signedOut = document.getElementById('signedOutState');
  const signedIn = document.getElementById('signedInState');
  const userName = document.getElementById('userName');
  if (signedOut) { signedOut.style.display = 'none'; signedOut.classList.add('hidden'); }
  if (signedIn) { signedIn.style.display = 'flex'; signedIn.classList.remove('hidden'); }
  if (userName) userName.textContent = newUser.name;
};

// Quick sign out
window.signOut = function() {
  window.currentUser = null;
  localStorage.removeItem('visualVibeUser');
  const signedOut = document.getElementById('signedOutState');
  const signedIn = document.getElementById('signedInState');
  if (signedOut) { signedOut.style.display = 'flex'; signedOut.classList.remove('hidden'); }
  if (signedIn) { signedIn.style.display = 'none'; signedIn.classList.add('hidden'); }
  alert('👋 Signed out successfully!');
};

// Placeholder functions
window.openProfileModal = function() { alert('Edit Profile: Please contact support for profile changes.'); };
window.showOrderHistory = function() { alert('My Orders: Please contact support for order inquiries.'); };

console.log('✅ CONSOLE FIX APPLIED! Try clicking the sign in/sign up buttons now.');
