// EMERGENCY BUTTON FIX - IMMEDIATE WORKING SOLUTION
console.log('🚨 EMERGENCY: Fixing sign in/sign up buttons NOW...');

(function() {
  'use strict';

  // IMMEDIATE WORKING FUNCTIONS - NO DEPENDENCIES
  
  // WORKING SIGN IN MODAL
  window.openSignInModal = function() {
    console.log('🔑 EMERGENCY: Opening sign in modal...');
    
    // Remove any existing modal
    const existing = document.getElementById('emergencySignInModal');
    if (existing) existing.remove();
    
    // Create working modal
    const modal = document.createElement('div');
    modal.id = 'emergencySignInModal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      padding: 1rem;
    `;
    
    modal.innerHTML = `
      <div style="
        background: white;
        border-radius: 12px;
        padding: 2rem;
        max-width: 400px;
        width: 100%;
        box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
      ">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <h3 style="font-size: 1.5rem; font-weight: bold; margin: 0; color: #1f2937;">Sign In</h3>
          <button onclick="document.getElementById('emergencySignInModal').remove()" style="
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #6b7280;
            padding: 0;
            line-height: 1;
          ">&times;</button>
        </div>
        
        <form onsubmit="emergencySignIn(event); return false;" style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #374151;">Email:</label>
            <input type="email" id="emergencySignInEmail" required style="
              width: 100%;
              padding: 0.75rem;
              border: 2px solid #d1d5db;
              border-radius: 6px;
              font-size: 1rem;
            " placeholder="Enter your email">
          </div>
          
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #374151;">Password:</label>
            <input type="password" id="emergencySignInPassword" required style="
              width: 100%;
              padding: 0.75rem;
              border: 2px solid #d1d5db;
              border-radius: 6px;
              font-size: 1rem;
            " placeholder="Enter your password">
          </div>
          
          <button type="submit" style="
            background: #4f46e5;
            color: white;
            padding: 0.75rem;
            border: none;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
            font-size: 1rem;
            margin-top: 0.5rem;
          ">Sign In</button>
        </form>
        
        <div style="text-align: center; margin-top: 1.5rem;">
          <p style="margin: 0.5rem 0; color: #6b7280;">Don't have an account?</p>
          <button onclick="document.getElementById('emergencySignInModal').remove(); openSignUpModal();" style="
            background: none;
            border: none;
            color: #4f46e5;
            font-weight: bold;
            cursor: pointer;
            text-decoration: underline;
          ">Create Account</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Focus email input
    setTimeout(() => {
      const emailInput = document.getElementById('emergencySignInEmail');
      if (emailInput) emailInput.focus();
    }, 100);
    
    return true;
  };

  // WORKING SIGN UP MODAL  
  window.openSignUpModal = function() {
    console.log('📝 EMERGENCY: Opening sign up modal...');
    
    // Remove any existing modal
    const existing = document.getElementById('emergencySignUpModal');
    if (existing) existing.remove();
    
    // Create working modal
    const modal = document.createElement('div');
    modal.id = 'emergencySignUpModal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      padding: 1rem;
    `;
    
    modal.innerHTML = `
      <div style="
        background: white;
        border-radius: 12px;
        padding: 2rem;
        max-width: 400px;
        width: 100%;
        box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
        max-height: 90vh;
        overflow-y: auto;
      ">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <h3 style="font-size: 1.5rem; font-weight: bold; margin: 0; color: #1f2937;">Create Account</h3>
          <button onclick="document.getElementById('emergencySignUpModal').remove()" style="
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #6b7280;
            padding: 0;
            line-height: 1;
          ">&times;</button>
        </div>
        
        <form onsubmit="emergencySignUp(event); return false;" style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #374151;">Full Name:</label>
            <input type="text" id="emergencySignUpName" required style="
              width: 100%;
              padding: 0.75rem;
              border: 2px solid #d1d5db;
              border-radius: 6px;
              font-size: 1rem;
            " placeholder="Enter your full name">
          </div>
          
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #374151;">Email:</label>
            <input type="email" id="emergencySignUpEmail" required style="
              width: 100%;
              padding: 0.75rem;
              border: 2px solid #d1d5db;
              border-radius: 6px;
              font-size: 1rem;
            " placeholder="Enter your email">
          </div>
          
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #374151;">Password:</label>
            <input type="password" id="emergencySignUpPassword" required minlength="6" style="
              width: 100%;
              padding: 0.75rem;
              border: 2px solid #d1d5db;
              border-radius: 6px;
              font-size: 1rem;
            " placeholder="Create password (min 6 chars)">
          </div>
          
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #374151;">Confirm Password:</label>
            <input type="password" id="emergencySignUpConfirm" required style="
              width: 100%;
              padding: 0.75rem;
              border: 2px solid #d1d5db;
              border-radius: 6px;
              font-size: 1rem;
            " placeholder="Confirm your password">
          </div>
          
          <button type="submit" style="
            background: #4f46e5;
            color: white;
            padding: 0.75rem;
            border: none;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
            font-size: 1rem;
            margin-top: 0.5rem;
          ">Create Account</button>
        </form>
        
        <div style="text-align: center; margin-top: 1.5rem;">
          <p style="margin: 0.5rem 0; color: #6b7280;">Already have an account?</p>
          <button onclick="document.getElementById('emergencySignUpModal').remove(); openSignInModal();" style="
            background: none;
            border: none;
            color: #4f46e5;
            font-weight: bold;
            cursor: pointer;
            text-decoration: underline;
          ">Sign In</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Focus name input
    setTimeout(() => {
      const nameInput = document.getElementById('emergencySignUpName');
      if (nameInput) nameInput.focus();
    }, 100);
    
    return true;
  };

  // WORKING SIGN IN HANDLER
  window.emergencySignIn = function(e) {
    e.preventDefault();
    console.log('🔑 EMERGENCY: Processing sign in...');
    
    const email = document.getElementById('emergencySignInEmail').value.trim().toLowerCase();
    const password = document.getElementById('emergencySignInPassword').value.trim();
    
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    
    // Find user
    const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    const user = users.find(u => u.email && u.email.toLowerCase() === email && u.password === password);
    
    if (user) {
      // Success - set current user
      window.currentUser = {
        id: user.id,
        name: user.name,
        firstName: user.firstName || user.name.split(' ')[0],
        lastName: user.lastName || user.name.split(' ').slice(1).join(' '),
        email: user.email,
        phone: user.phone || '',
        orders: user.orders || [],
        reviews: user.reviews || []
      };
      
      // Save session
      localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));
      
      // Update UI immediately
      emergencyUpdateUI();
      
      // Close modal
      document.getElementById('emergencySignInModal').remove();
      document.body.style.overflow = '';
      
      // Show success
      emergencyShowNotification(`Welcome back, ${user.name}! 🎉`, 'success');
      
      console.log('✅ EMERGENCY: Sign in successful');
    } else {
      alert('Invalid email or password. Please try again.');
    }
  };

  // WORKING SIGN UP HANDLER
  window.emergencySignUp = function(e) {
    e.preventDefault();
    console.log('📝 EMERGENCY: Processing sign up...');
    
    const name = document.getElementById('emergencySignUpName').value.trim();
    const email = document.getElementById('emergencySignUpEmail').value.trim().toLowerCase();
    const password = document.getElementById('emergencySignUpPassword').value.trim();
    const confirm = document.getElementById('emergencySignUpConfirm').value.trim();
    
    // Validation
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
    
    // Check if user exists
    const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    if (users.find(u => u.email && u.email.toLowerCase() === email)) {
      alert('Account already exists with this email. Please sign in instead.');
      return;
    }
    
    // Create user
    const newUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name,
      firstName: name.split(' ')[0],
      lastName: name.split(' ').slice(1).join(' '),
      email: email,
      password: password,
      phone: '',
      orders: [],
      reviews: [],
      createdAt: new Date().toISOString()
    };
    
    // Save user
    users.push(newUser);
    localStorage.setItem('visualVibeUsers', JSON.stringify(users));
    
    // Set current user
    window.currentUser = newUser;
    localStorage.setItem('visualVibeUser', JSON.stringify(newUser));
    
    // Update UI immediately
    emergencyUpdateUI();
    
    // Close modal
    document.getElementById('emergencySignUpModal').remove();
    document.body.style.overflow = '';
    
    // Show success
    emergencyShowNotification(`Welcome, ${name}! Account created! 🎉`, 'success');
    
    console.log('✅ EMERGENCY: Sign up successful');
  };

  // EMERGENCY UI UPDATE
  function emergencyUpdateUI() {
    console.log('🎨 EMERGENCY: Updating UI...');
    
    try {
      // Desktop elements
      const signedOutState = document.getElementById('signedOutState');
      const signedInState = document.getElementById('signedInState');
      const userName = document.getElementById('userName');
      
      // Mobile elements  
      const mobileSignedOutState = document.getElementById('mobileSignedOutState');
      const mobileSignedInState = document.getElementById('mobileSignedInState');
      
      if (window.currentUser) {
        // Show signed-in state
        if (signedOutState) {
          signedOutState.style.display = 'none';
          signedOutState.classList.add('hidden');
        }
        if (signedInState) {
          signedInState.style.display = 'flex';
          signedInState.classList.remove('hidden');
        }
        if (mobileSignedOutState) {
          mobileSignedOutState.style.display = 'none';
          mobileSignedOutState.classList.add('hidden');
        }
        if (mobileSignedInState) {
          mobileSignedInState.style.display = 'block';
          mobileSignedInState.classList.remove('hidden');
        }
        if (userName) {
          userName.textContent = window.currentUser.name;
        }
        
        console.log('✅ EMERGENCY: UI updated to signed-in state');
      } else {
        // Show signed-out state
        if (signedOutState) {
          signedOutState.style.display = 'flex';
          signedOutState.classList.remove('hidden');
        }
        if (signedInState) {
          signedInState.style.display = 'none';
          signedInState.classList.add('hidden');
        }
        if (mobileSignedOutState) {
          mobileSignedOutState.style.display = 'block';
          mobileSignedOutState.classList.remove('hidden');
        }
        if (mobileSignedInState) {
          mobileSignedInState.style.display = 'none';
          mobileSignedInState.classList.add('hidden');
        }
        
        console.log('✅ EMERGENCY: UI updated to signed-out state');
      }
    } catch (error) {
      console.error('❌ EMERGENCY: Error updating UI:', error);
    }
  }

  // EMERGENCY SIGN OUT
  window.signOut = function() {
    console.log('👋 EMERGENCY: Signing out...');
    
    window.currentUser = null;
    localStorage.removeItem('visualVibeUser');
    
    emergencyUpdateUI();
    emergencyShowNotification('Signed out successfully! 👋', 'info');
  };

  // EMERGENCY NOTIFICATION
  function emergencyShowNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelectorAll('.emergency-notification');
    existing.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = 'emergency-notification';
    notification.style.cssText = `
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 99999;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      color: white;
      font-weight: bold;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
      transform: translateX(100%);
      transition: transform 0.3s ease;
      ${type === 'success' ? 'background: #10b981;' : type === 'error' ? 'background: #ef4444;' : 'background: #3b82f6;'}
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // PLACEHOLDER FUNCTIONS FOR PROFILE AND ORDERS
  window.openProfileModal = function() {
    alert('Edit Profile functionality will be available soon. Please contact support for profile changes.');
  };

  window.showOrderHistory = function() {
    alert('My Orders functionality will be available soon. Please contact support for order inquiries.');
  };

  // RESTORE SESSION ON LOAD
  try {
    const savedUser = localStorage.getItem('visualVibeUser');
    if (savedUser && !window.currentUser) {
      window.currentUser = JSON.parse(savedUser);
      emergencyUpdateUI();
      console.log('🔄 EMERGENCY: Session restored for:', window.currentUser.name);
    }
  } catch (error) {
    console.error('❌ EMERGENCY: Error restoring session:', error);
    localStorage.removeItem('visualVibeUser');
  }

  // ENSURE UI IS UPDATED
  emergencyUpdateUI();

  console.log('✅ EMERGENCY BUTTON FIX LOADED - Buttons should work now!');

})();
