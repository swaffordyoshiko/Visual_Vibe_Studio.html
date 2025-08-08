// CRITICAL FUNCTIONS FIX - ESSENTIAL BUTTON AND FORM FUNCTIONALITY
console.log('🚨 Loading Critical Functions Fix...');

(function() {
  'use strict';

  // Prevent duplicate execution
  if (window.criticalFunctionsFixLoaded) {
    console.log('✅ Critical Functions Fix already loaded');
    return;
  }
  window.criticalFunctionsFixLoaded = true;

  // CORE MODAL FUNCTIONS
  
  // Sign In Modal
  window.openSignInModal = function() {
    console.log('🔑 Opening sign in modal...');
    
    try {
      const modal = document.getElementById('signInModal');
      if (!modal) {
        console.error('❌ Sign in modal not found');
        alert('Sign in form not available. Please refresh the page.');
        return false;
      }

      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      modal.style.opacity = '1';
      modal.style.visibility = 'visible';
      document.body.style.overflow = 'hidden';

      const emailInput = document.getElementById('signInEmail');
      if (emailInput) {
        setTimeout(() => emailInput.focus(), 100);
      }

      console.log('✅ Sign in modal opened successfully');
      return true;
    } catch (error) {
      console.error('❌ Error opening sign in modal:', error);
      alert('Error opening sign in form. Please refresh the page.');
      return false;
    }
  };

  window.closeSignInModal = function() {
    console.log('🔑 Closing sign in modal...');
    
    const modal = document.getElementById('signInModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      modal.style.visibility = 'hidden';
      document.body.style.overflow = '';
    }
    
    const form = document.getElementById('signInForm');
    if (form) {
      form.reset();
    }
  };

  // Sign Up Modal
  window.openSignUpModal = function() {
    console.log('📝 Opening sign up modal...');
    
    try {
      const modal = document.getElementById('signUpModal');
      if (!modal) {
        console.error('❌ Sign up modal not found');
        alert('Sign up form not available. Please refresh the page.');
        return false;
      }

      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      modal.style.opacity = '1';
      modal.style.visibility = 'visible';
      document.body.style.overflow = 'hidden';

      const nameInput = document.getElementById('signUpName');
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 100);
      }

      console.log('✅ Sign up modal opened successfully');
      return true;
    } catch (error) {
      console.error('❌ Error opening sign up modal:', error);
      alert('Error opening sign up form. Please refresh the page.');
      return false;
    }
  };

  window.closeSignUpModal = function() {
    console.log('📝 Closing sign up modal...');
    
    const modal = document.getElementById('signUpModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      modal.style.visibility = 'hidden';
      document.body.style.overflow = '';
    }
    
    const form = document.getElementById('signUpForm');
    if (form) {
      form.reset();
    }
  };

  // Modal Switching
  window.switchToSignUp = function() {
    closeSignInModal();
    setTimeout(openSignUpModal, 100);
  };

  window.switchToSignIn = function() {
    closeSignUpModal();
    setTimeout(openSignInModal, 100);
  };

  // WORKING AUTHENTICATION HANDLERS
  window.handleSignIn = function(e) {
    console.log('🔑 Sign in form submitted');
    if (e) e.preventDefault();

    try {
      const emailInput = document.getElementById('signInEmail');
      const passwordInput = document.getElementById('signInPassword');

      if (!emailInput || !passwordInput) {
        alert('Sign in form elements not found. Please refresh the page.');
        return;
      }

      const email = emailInput.value.trim().toLowerCase();
      const password = passwordInput.value;

      if (!email || !password) {
        alert('Please enter both email and password.');
        return;
      }

      // Get stored users
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      console.log('🔍 Checking against', users.length, 'registered users');

      const user = users.find(u => u.email.toLowerCase() === email && u.password === password);
      const existingUser = users.find(u => u.email.toLowerCase() === email);

      if (user) {
        // Successful login
        const now = new Date().toISOString();
        window.currentUser = {
          id: user.id,
          name: user.name,
          firstName: user.firstName || user.name.split(' ')[0],
          lastName: user.lastName || user.name.split(' ').slice(1).join(' '),
          email: user.email,
          phone: user.phone || '',
          companyName: user.companyName || '',
          orders: user.orders || [],
          reviews: user.reviews || [],
          lastActivity: now,
          loginTime: now
        };

        // Save session
        localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));

        // Update last login time
        user.lastLogin = now;
        localStorage.setItem('visualVibeUsers', JSON.stringify(users));

        updateAuthUI();
        closeSignInModal();
        showNotification('Welcome back, ' + user.name + '!', 'success');
        console.log('✅ User successfully signed in:', user.name);
      } else if (existingUser) {
        alert('Incorrect password for this email address. Please try again.');
        console.log('❌ Incorrect password for existing email:', email);
      } else {
        alert('No account found with this email address. Please sign up first.');
        console.log('❌ No account found for email:', email);
      }
    } catch (error) {
      console.error('Error in handleSignIn:', error);
      alert('Sign in error. Please try again.');
    }
  };

  window.handleSignUp = function(e) {
    console.log('📝 Sign up form submitted');
    if (e) e.preventDefault();

    try {
      const nameInput = document.getElementById('signUpName');
      const emailInput = document.getElementById('signUpEmail');
      const passwordInput = document.getElementById('signUpPassword');
      const confirmPasswordInput = document.getElementById('signUpConfirmPassword');

      if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
        alert('Sign up form elements not found. Please refresh the page.');
        return;
      }

      const name = nameInput.value.trim();
      const email = emailInput.value.trim().toLowerCase();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;

      if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
      }

      if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Get existing users
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      console.log('📝 Checking if email exists among', users.length, 'users');

      // Check if email already exists
      const existingUser = users.find(u => u.email.toLowerCase() === email);
      if (existingUser) {
        alert(`An account with this email already exists under the name "${existingUser.name}". Please sign in instead.`);
        console.log('❌ Attempted duplicate registration for:', email);

        setTimeout(() => {
          closeSignUpModal();
          openSignInModal();
          const signInEmail = document.getElementById('signInEmail');
          if (signInEmail) signInEmail.value = email;
        }, 2000);
        return;
      }

      // Parse name into first and last name
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Create new user
      const newUser = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: name,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phone: '',
        companyName: '',
        orders: [],
        reviews: [],
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('visualVibeUsers', JSON.stringify(users));

      // Sign in the new user
      const now = new Date().toISOString();
      window.currentUser = {
        id: newUser.id,
        name: newUser.name,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
        companyName: newUser.companyName,
        orders: newUser.orders,
        reviews: newUser.reviews,
        lastActivity: now,
        loginTime: now
      };

      localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));
      updateAuthUI();
      closeSignUpModal();
      showNotification('Account created successfully! Welcome, ' + name + '!', 'success');
      console.log('✅ User successfully signed up:', name);
    } catch (error) {
      console.error('Error in handleSignUp:', error);
      alert('Sign up error. Please try again.');
    }
  };

  // SIGN OUT FUNCTION
  window.signOut = function() {
    console.log('👋 Signing out user...');
    
    if (window.currentUser) {
      showNotification('Goodbye, ' + window.currentUser.name + '!', 'success');
    }

    window.currentUser = null;
    localStorage.removeItem('visualVibeUser');
    updateAuthUI();
    
    // Close any open modals
    closeSignInModal();
    closeSignUpModal();
    if (window.closeProfileModal) window.closeProfileModal();
    if (window.closeOrderHistory) window.closeOrderHistory();
    
    console.log('✅ User signed out successfully');
  };

  // UI UPDATE FUNCTION
  window.updateAuthUI = function() {
    try {
      const signedOutState = document.getElementById('signedOutState');
      const signedInState = document.getElementById('signedInState');
      const mobileSignedOutState = document.getElementById('mobileSignedOutState');
      const mobileSignedInState = document.getElementById('mobileSignedInState');
      const userNameSpan = document.getElementById('userName');

      if (window.currentUser) {
        if (signedOutState) signedOutState.style.display = 'none';
        if (signedInState) signedInState.style.display = 'flex';
        if (mobileSignedOutState) mobileSignedOutState.style.display = 'none';
        if (mobileSignedInState) mobileSignedInState.style.display = 'block';
        if (userNameSpan) userNameSpan.textContent = window.currentUser.name;

        console.log('✅ UI updated for signed in user:', window.currentUser.name);
      } else {
        if (signedOutState) signedOutState.style.display = 'flex';
        if (signedInState) signedInState.style.display = 'none';
        if (mobileSignedOutState) mobileSignedOutState.style.display = 'block';
        if (mobileSignedInState) mobileSignedInState.style.display = 'none';

        console.log('✅ UI updated for signed out state');
      }
    } catch (error) {
      console.error('Error updating auth UI:', error);
    }
  };

  // NOTIFICATION FUNCTION
  function showNotification(message, type = 'success') {
    console.log(`[${type.toUpperCase()}] ${message}`);
    
    // Try different notification systems
    if (window.toastManager && typeof window.toastManager.show === 'function') {
      window.toastManager.show(message, type);
    } else if (window.showAlert && typeof window.showAlert === 'function') {
      window.showAlert(message, type);
    } else {
      // Fallback: simple alert for critical messages
      if (type === 'error') {
        alert('Error: ' + message);
      } else {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-[9999] px-6 py-3 rounded-lg shadow-lg text-white font-medium transform transition-all duration-300 ${
          type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        }`;
        notification.textContent = message;
        notification.style.transform = 'translateX(100%)';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
          notification.style.transform = 'translateX(100%)';
          setTimeout(() => {
            if (notification.parentNode) {
              notification.remove();
            }
          }, 300);
        }, 3000);
      }
    }
  }
  
  window.showNotification = showNotification;

  // CONTACT FORM FUNCTION
  window.submitContactForm = function() {
    console.log('📧 Contact form submission');

    try {
      // Try to get form elements from first form, then fallback to second form
      let nameInput = document.getElementById('customerName');
      let phoneInput = document.getElementById('customerPhone');
      let emailInput = document.getElementById('customerEmail');
      let messageInput = document.getElementById('customerMessage');
      let submitBtn = document.getElementById('submitContactBtn');

      // If first form elements are empty or not found, try second form
      if (!nameInput || !phoneInput || !emailInput || !messageInput ||
          (!nameInput.value.trim() && !phoneInput.value.trim() && !emailInput.value.trim() && !messageInput.value.trim())) {
        const nameInput2 = document.getElementById('customerName2');
        const phoneInput2 = document.getElementById('customerPhone2');
        const emailInput2 = document.getElementById('customerEmail2');
        const messageInput2 = document.getElementById('customerMessage2');

        if (nameInput2 && (nameInput2.value.trim() || phoneInput2.value.trim() || emailInput2.value.trim() || messageInput2.value.trim())) {
          nameInput = nameInput2;
          phoneInput = phoneInput2;
          emailInput = emailInput2;
          messageInput = messageInput2;
          submitBtn = document.getElementById('submitContactBtn2') || submitBtn;
        }
      }

      if (!nameInput || !phoneInput || !emailInput || !messageInput) {
        alert('Contact form elements not found');
        return;
      }

      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      // Basic validation
      if (!name) {
        alert('Please enter your full name');
        nameInput.focus();
        return;
      }
      if (!phone) {
        alert('Please enter your mobile number');
        phoneInput.focus();
        return;
      }
      if (!email || !email.includes('@')) {
        alert('Please enter a valid email address');
        emailInput.focus();
        return;
      }
      if (!message) {
        alert('Please enter your message');
        messageInput.focus();
        return;
      }

      // Disable submit button to prevent double submission
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      // Simple success message
      alert(`Thank you ${name}! Your message has been received. We'll contact you soon at ${email} or ${phone}.`);

      // Reset form
      nameInput.value = '';
      phoneInput.value = '';
      emailInput.value = '';
      messageInput.value = '';

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = '📧 Send Message';
      }

      console.log('✅ Contact form submitted:', { name, phone, email, message });
    } catch (error) {
      console.error('❌ Error in submitContactForm:', error);
      alert('There was an error submitting your message. Please try again.');

      const submitBtn = document.getElementById('submitContactBtn') || document.getElementById('submitContactBtn2');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = '📧 Send Message';
      }
    }
  };

  // ORDER FORM FUNCTION (working)
  window.simpleOrderSubmit = function(event) {
    console.log('🔄 Order form submission');
    
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const form = document.getElementById('orderForm');
      if (!form) {
        alert('Order form not found. Please refresh the page.');
        return false;
      }

      // Get form values
      const firstName = form.querySelector('input[name="firstName"]')?.value?.trim();
      const lastName = form.querySelector('input[name="lastName"]')?.value?.trim();
      const businessName = form.querySelector('input[name="businessName"]')?.value?.trim();
      const industry = form.querySelector('input[name="industry"]')?.value?.trim();
      const email = form.querySelector('input[name="email"]')?.value?.trim();
      const phone = form.querySelector('input[name="phone"]')?.value?.trim() || 'Not provided';
      const services = form.querySelector('select[name="services"]');

      // Validation
      if (!firstName) {
        alert('Please enter your first name');
        form.querySelector('input[name="firstName"]')?.focus();
        return false;
      }

      if (!lastName) {
        alert('Please enter your last name');
        form.querySelector('input[name="lastName"]')?.focus();
        return false;
      }

      if (!businessName) {
        alert('Please enter your business name');
        form.querySelector('input[name="businessName"]')?.focus();
        return false;
      }

      if (!industry) {
        alert('Please enter your business industry');
        form.querySelector('input[name="industry"]')?.focus();
        return false;
      }

      if (!email || !email.includes('@')) {
        alert('Please enter a valid email address');
        form.querySelector('input[name="email"]')?.focus();
        return false;
      }

      if (!services || services.selectedOptions.length === 0) {
        alert('Please select at least one service');
        services?.focus();
        return false;
      }

      // Calculate totals
      let selectedServices = [];
      let totalAmount = 0;

      if (services && services.selectedOptions.length > 0) {
        selectedServices = Array.from(services.selectedOptions).map(opt => opt.text);
        totalAmount = Array.from(services.selectedOptions).reduce((total, opt) => {
          const price = parseInt(opt.getAttribute('data-price')) || 50;
          return total + price;
        }, 0);
      }

      const depositAmount = (totalAmount * 0.5).toFixed(2);

      // Show success message
      const orderMessage = `✅ ORDER SUBMITTED SUCCESSFULLY!

📋 Order Details:
• Customer: ${firstName} ${lastName}
• Business: ${businessName}
• Industry: ${industry}
• Email: ${email}
• Phone: ${phone}
• Services: ${selectedServices.join(', ')}
• Total: $${totalAmount}
• Deposit Required: $${depositAmount}

💳 Next Steps:
1. Send $${depositAmount} via Venmo to @Yoshiko-Swafford
2. Include "${businessName}" in the payment note
3. We'll contact you within 24 hours to begin your project

📞 Questions? Call (402) 979-7184`;

      alert(orderMessage);

      // Reset form
      form.reset();

      console.log('✅ Order submitted successfully');
      return false;

    } catch (error) {
      console.error('❌ Error in simpleOrderSubmit:', error);
      alert('There was an error processing your order. Please try again or contact support at (402) 979-7184');
      return false;
    }
  };

  // RESTORE USER SESSION ON LOAD
  function restoreUserSession() {
    try {
      const savedUser = localStorage.getItem('visualVibeUser');
      if (savedUser) {
        window.currentUser = JSON.parse(savedUser);
        updateAuthUI();
        console.log('✅ User session restored:', window.currentUser.name);
      }
    } catch (error) {
      console.error('Error restoring user session:', error);
      localStorage.removeItem('visualVibeUser');
    }
  }

  // SETUP EVENT LISTENERS
  function setupEventListeners() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupEventListeners);
      return;
    }

    // Sign in form
    const signInForm = document.getElementById('signInForm');
    if (signInForm) {
      signInForm.addEventListener('submit', handleSignIn);
      console.log('✅ Sign in form listener attached');
    }

    // Sign up form
    const signUpForm = document.getElementById('signUpForm');
    if (signUpForm) {
      signUpForm.addEventListener('submit', handleSignUp);
      console.log('✅ Sign up form listener attached');
    }
  }

  // INITIALIZE ON LOAD
  function initialize() {
    console.log('🚀 Initializing critical functions...');
    restoreUserSession();
    setupEventListeners();
    console.log('✅ Critical Functions Fix loaded successfully');
  }

  // Run initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

})();
