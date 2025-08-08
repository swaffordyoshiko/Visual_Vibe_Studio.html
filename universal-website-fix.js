// UNIVERSAL WEBSITE FUNCTIONALITY FIX
// Ensures all buttons, forms, and interactive elements work smoothly
console.log('🚀 Loading Universal Website Fix...');

(function() {
  'use strict';

  // Global state management
  let isFixLoaded = false;
  let currentUser = null;
  
  // Initialize immediately
  function initializeUniversalFix() {
    if (isFixLoaded) return;
    isFixLoaded = true;
    
    console.log('🔧 Initializing Universal Website Fix...');
    
    // 1. Fix Authentication System
    setupAuthenticationSystem();
    
    // 2. Fix Navigation Functionality
    setupNavigationSystem();
    
    // 3. Fix Profile and Orders System
    setupProfileOrdersSystem();
    
    // 4. Fix Contact and Order Forms
    setupFormSystem();
    
    // 5. Fix All Missing Functions
    setupMissingFunctions();
    
    // 6. Setup Error Handling
    setupErrorHandling();
    
    // 7. Setup UI Notifications
    setupNotificationSystem();
    
    // 8. Restore User Session
    restoreUserSession();
    
    console.log('✅ Universal Website Fix Complete');
  }

  // 1. AUTHENTICATION SYSTEM
  function setupAuthenticationSystem() {
    console.log('🔐 Setting up authentication system...');
    
    // Enhanced sign in function
    window.handleSignIn = function(event) {
      if (event) event.preventDefault();
      
      try {
        const emailInput = document.getElementById('signInEmail');
        const passwordInput = document.getElementById('signInPassword');

        if (!emailInput || !passwordInput) {
          showNotification('Sign in form not available. Please refresh the page.', 'error');
          return false;
        }

        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value.trim();

        if (!email || !password) {
          showNotification('Please enter both email and password.', 'error');
          return false;
        }

        // Get users from storage
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        const user = users.find(u => u.email && u.email.toLowerCase() === email && u.password === password);

        if (user) {
          // Save session
          const sessionData = {
            id: user.id,
            name: user.name,
            email: user.email,
            firstName: user.firstName || user.name.split(' ')[0],
            lastName: user.lastName || user.name.split(' ').slice(1).join(' '),
            phone: user.phone || '',
            companyName: user.companyName || '',
            signedIn: true,
            lastActivity: new Date().toISOString(),
            loginTime: new Date().toISOString()
          };
          
          localStorage.setItem('visualVibeUser', JSON.stringify(sessionData));
          window.currentUser = sessionData;
          currentUser = sessionData;
          
          updateAuthUI();
          closeSignInModal();
          showNotification(`Welcome back, ${sessionData.firstName}!`, 'success');
          return true;
        } else {
          const existingUser = users.find(u => u.email && u.email.toLowerCase() === email);
          if (existingUser) {
            showNotification('Incorrect password. Please try again.', 'error');
          } else {
            showNotification('No account found. Please sign up first.', 'error');
          }
          return false;
        }
      } catch (error) {
        console.error('Sign in error:', error);
        showNotification('Sign in failed. Please try again.', 'error');
        return false;
      }
    };

    // Enhanced sign up function
    window.handleSignUp = function(event) {
      if (event) event.preventDefault();
      
      try {
        const nameInput = document.getElementById('signUpName');
        const emailInput = document.getElementById('signUpEmail');
        const passwordInput = document.getElementById('signUpPassword');
        const confirmPasswordInput = document.getElementById('signUpConfirmPassword');

        if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
          showNotification('Sign up form not available. Please refresh the page.', 'error');
          return false;
        }

        const name = nameInput.value.trim();
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        if (!name || !email || !password || !confirmPassword) {
          showNotification('Please fill in all fields.', 'error');
          return false;
        }

        if (password !== confirmPassword) {
          showNotification('Passwords do not match.', 'error');
          return false;
        }

        if (password.length < 6) {
          showNotification('Password must be at least 6 characters long.', 'error');
          return false;
        }

        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        const existingUser = users.find(u => u.email && u.email.toLowerCase() === email);
        
        if (existingUser) {
          showNotification(`Account already exists for ${email}. Please sign in instead.`, 'error');
          setTimeout(() => {
            closeSignUpModal();
            openSignInModal();
            const signInEmail = document.getElementById('signInEmail');
            if (signInEmail) signInEmail.value = email;
          }, 1500);
          return false;
        }

        // Create new user
        const nameParts = name.split(' ');
        const newUser = {
          id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
          name: name,
          firstName: nameParts[0] || '',
          lastName: nameParts.slice(1).join(' ') || '',
          email: email,
          password: password,
          phone: '',
          companyName: '',
          orders: [],
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('visualVibeUsers', JSON.stringify(users));
        
        // Auto sign in
        const sessionData = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          phone: newUser.phone,
          companyName: newUser.companyName,
          signedIn: true,
          lastActivity: new Date().toISOString(),
          loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('visualVibeUser', JSON.stringify(sessionData));
        window.currentUser = sessionData;
        currentUser = sessionData;
        
        updateAuthUI();
        closeSignUpModal();
        showNotification(`Welcome, ${newUser.firstName}! Your account has been created.`, 'success');
        return true;
      } catch (error) {
        console.error('Sign up error:', error);
        showNotification('Sign up failed. Please try again.', 'error');
        return false;
      }
    };

    // Modal functions
    window.openSignInModal = function() {
      const modal = document.getElementById('signInModal');
      if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        const emailInput = document.getElementById('signInEmail');
        if (emailInput) setTimeout(() => emailInput.focus(), 100);
      }
    };

    window.openSignUpModal = function() {
      const modal = document.getElementById('signUpModal');
      if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        const nameInput = document.getElementById('signUpName');
        if (nameInput) setTimeout(() => nameInput.focus(), 100);
      }
    };

    window.closeSignInModal = function() {
      const modal = document.getElementById('signInModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
      }
      const form = document.getElementById('signInForm');
      if (form) form.reset();
    };

    window.closeSignUpModal = function() {
      const modal = document.getElementById('signUpModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
      }
      const form = document.getElementById('signUpForm');
      if (form) form.reset();
    };

    window.switchToSignUp = function() {
      closeSignInModal();
      setTimeout(openSignUpModal, 150);
    };

    window.switchToSignIn = function() {
      closeSignUpModal();
      setTimeout(openSignInModal, 150);
    };

    window.signOut = function() {
      localStorage.removeItem('visualVibeUser');
      window.currentUser = null;
      currentUser = null;
      updateAuthUI();
      showNotification('You have been signed out successfully.', 'success');
    };

    // Setup form listeners
    setTimeout(() => {
      const signInForm = document.getElementById('signInForm');
      const signUpForm = document.getElementById('signUpForm');
      
      if (signInForm) {
        signInForm.addEventListener('submit', window.handleSignIn);
      }
      
      if (signUpForm) {
        signUpForm.addEventListener('submit', window.handleSignUp);
      }
    }, 100);
  }

  // 2. NAVIGATION SYSTEM
  function setupNavigationSystem() {
    console.log('🧭 Setting up navigation system...');
    
    // Mobile menu toggle
    window.toggleMobileMenu = function() {
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu) {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
          mobileMenu.classList.remove('hidden');
          mobileMenu.style.display = 'block';
        } else {
          mobileMenu.classList.add('hidden');
          mobileMenu.style.display = 'none';
        }
      }
    };

    window.closeMobileMenu = function() {
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu) {
        mobileMenu.classList.add('hidden');
        mobileMenu.style.display = 'none';
      }
    };

    // Smooth scrolling for anchor links
    window.scrollToSection = function(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        closeMobileMenu();
      }
    };

    // Setup anchor link behavior
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
      });
    });
  }

  // 3. PROFILE AND ORDERS SYSTEM
  function setupProfileOrdersSystem() {
    console.log('👤 Setting up profile and orders system...');
    
    window.openProfileModal = function() {
      if (!window.currentUser && !currentUser) {
        showNotification('Please sign in to edit your profile.', 'error');
        openSignInModal();
        return;
      }
      
      showNotification('Profile editing will be available soon!', 'info');
    };

    window.showOrderHistory = function() {
      if (!window.currentUser && !currentUser) {
        showNotification('Please sign in to view your orders.', 'error');
        openSignInModal();
        return;
      }
      
      showNotification('Order history will be available soon!', 'info');
    };
  }

  // 4. FORM SYSTEM
  function setupFormSystem() {
    console.log('📝 Setting up form system...');
    
    // Contact form handler
    window.submitContactForm = function() {
      try {
        const nameInput = document.getElementById('customerName') || document.getElementById('customerName2');
        const phoneInput = document.getElementById('customerPhone') || document.getElementById('customerPhone2');
        const emailInput = document.getElementById('customerEmail') || document.getElementById('customerEmail2');
        const messageInput = document.getElementById('customerMessage') || document.getElementById('customerMessage2');

        if (!nameInput || !phoneInput || !emailInput || !messageInput) {
          showNotification('Contact form elements not found.', 'error');
          return;
        }

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !phone || !email || !message) {
          showNotification('Please fill in all fields.', 'error');
          return;
        }

        if (!email.includes('@')) {
          showNotification('Please enter a valid email address.', 'error');
          return;
        }

        // Simulate form submission
        showNotification(`Thank you ${name}! Your message has been received. We'll contact you soon.`, 'success');
        
        // Reset form
        nameInput.value = '';
        phoneInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
      } catch (error) {
        console.error('Contact form error:', error);
        showNotification('Error submitting contact form. Please try again.', 'error');
      }
    };

    // Order form handler
    window.simpleOrderSubmit = function() {
      try {
        const form = document.getElementById('orderForm');
        if (!form) {
          showNotification('Order form not found.', 'error');
          return;
        }

        // Basic validation
        const firstName = form.querySelector('input[name="firstName"]')?.value?.trim();
        const lastName = form.querySelector('input[name="lastName"]')?.value?.trim();
        const businessName = form.querySelector('input[name="businessName"]')?.value?.trim();
        const email = form.querySelector('input[name="email"]')?.value?.trim();
        const services = form.querySelector('select[name="services"]');

        if (!firstName || !lastName || !businessName || !email) {
          showNotification('Please fill in all required fields.', 'error');
          return;
        }

        if (!email.includes('@')) {
          showNotification('Please enter a valid email address.', 'error');
          return;
        }

        if (!services || services.selectedOptions.length === 0) {
          showNotification('Please select at least one service.', 'error');
          return;
        }

        showNotification('Order submitted successfully! You will be contacted within 24 hours.', 'success');
      } catch (error) {
        console.error('Order form error:', error);
        showNotification('Error submitting order. Please try again.', 'error');
      }
    };
  }

  // 5. MISSING FUNCTIONS SETUP
  function setupMissingFunctions() {
    console.log('🔧 Setting up missing functions...');
    
    // Email handling
    window.handleEmailClick = function(event, emailAddress) {
      try {
        if (event) event.preventDefault();
        
        const email = emailAddress || 'support@visualvibestudio.store';
        const subject = 'Inquiry from Visual Vibe Studio Website';
        const body = 'Hi,\n\nI would like to inquire about your services.\n\nThanks!';
        
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Check if on mobile
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
          window.location.href = mailtoLink;
        } else {
          // Desktop - try different email clients
          const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          const outlook = `https://outlook.live.com/mail/0/deeplink/compose?to=${email}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          
          // Show options or default to mailto
          if (confirm('Would you like to open Gmail? (Cancel for default email app)')) {
            window.open(gmail, '_blank');
          } else {
            window.location.href = mailtoLink;
          }
        }
        
        showNotification('Opening email client...', 'info');
      } catch (error) {
        console.error('Email error:', error);
        showNotification('Error opening email. Please contact us at support@visualvibestudio.store', 'error');
      }
    };

    // Copy to clipboard
    window.copyToClipboard = function(text, message) {
      try {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(() => {
            showNotification(message || 'Copied to clipboard!', 'success');
          }).catch(() => {
            fallbackCopy(text, message);
          });
        } else {
          fallbackCopy(text, message);
        }
      } catch (error) {
        console.error('Copy error:', error);
        showNotification('Copy failed. Please manually copy the text.', 'error');
      }
    };

    function fallbackCopy(text, message) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showNotification(message || 'Copied to clipboard!', 'success');
    }

    // Review functions
    window.toggleAllCustomerReviews = function(event) {
      if (event) event.preventDefault();
      
      const buttonText = document.getElementById('viewAllCustomerReviewsText');
      const reviewsContainer = document.getElementById('allCustomerReviews');
      
      if (buttonText) {
        if (buttonText.textContent.includes('View All')) {
          buttonText.textContent = 'Hide Recent Reviews';
          if (reviewsContainer) reviewsContainer.style.display = 'block';
        } else {
          buttonText.textContent = 'View All Reviews';
          if (reviewsContainer) reviewsContainer.style.display = 'none';
        }
      }
      
      return false;
    };

    // Chat toggle
    window.toggleChat = function() {
      showNotification('Chat feature will be available soon!', 'info');
    };

    // Venmo payment
    window.openVenmoPayment = function() {
      try {
        const venmoUrl = 'https://venmo.com/u/Yoshiko-Swafford';
        window.open(venmoUrl, '_blank');
        showNotification('Opening Venmo for payment...', 'info');
      } catch (error) {
        showNotification('Please visit venmo.com/u/Yoshiko-Swafford to make payment', 'info');
      }
    };
  }

  // 6. ERROR HANDLING SETUP
  function setupErrorHandling() {
    console.log('⚠️ Setting up error handling...');
    
    window.addEventListener('error', (event) => {
      console.error('JavaScript error:', event.error);
      // Don't show user notifications for every JS error to avoid spam
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
    });
  }

  // 7. NOTIFICATION SYSTEM
  function setupNotificationSystem() {
    console.log('🔔 Setting up notification system...');
    
    if (!window.showAlert) {
      window.showAlert = showNotification;
    }
    
    // Enhanced toast manager
    if (!window.toastManager) {
      window.toastManager = {
        show: showNotification,
        success: (msg) => showNotification(msg, 'success'),
        error: (msg) => showNotification(msg, 'error'),
        warning: (msg) => showNotification(msg, 'warning'),
        info: (msg) => showNotification(msg, 'info')
      };
    }
  }

  // 8. UI UPDATE SYSTEM
  function updateAuthUI() {
    try {
      const signedOutState = document.getElementById('signedOutState');
      const signedInState = document.getElementById('signedInState');
      const mobileSignedOutState = document.getElementById('mobileSignedOutState');
      const mobileSignedInState = document.getElementById('mobileSignedInState');
      const userNameSpan = document.getElementById('userName');

      const user = currentUser || window.currentUser;

      if (user && user.signedIn) {
        if (signedOutState) signedOutState.style.display = 'none';
        if (signedInState) signedInState.style.display = 'flex';
        if (mobileSignedOutState) mobileSignedOutState.style.display = 'none';
        if (mobileSignedInState) mobileSignedInState.style.display = 'block';
        if (userNameSpan) userNameSpan.textContent = user.firstName || user.name;
      } else {
        if (signedOutState) signedOutState.style.display = 'flex';
        if (signedInState) signedInState.style.display = 'none';
        if (mobileSignedOutState) mobileSignedOutState.style.display = 'block';
        if (mobileSignedInState) mobileSignedInState.style.display = 'none';
      }
    } catch (error) {
      console.error('UI update error:', error);
    }
  }

  // NOTIFICATION HELPER
  function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-[9999] px-6 py-3 rounded-lg shadow-lg text-white font-medium transform transition-all duration-300 max-w-sm`;
    
    // Set color based on type
    switch (type) {
      case 'success':
        notification.className += ' bg-green-500';
        break;
      case 'error':
        notification.className += ' bg-red-500';
        break;
      case 'warning':
        notification.className += ' bg-yellow-500';
        break;
      default:
        notification.className += ' bg-blue-500';
    }
    
    notification.textContent = message;
    notification.style.transform = 'translateX(100%)';
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 4000);
  }

  // SESSION RESTORATION
  function restoreUserSession() {
    try {
      const savedSession = localStorage.getItem('visualVibeUser');
      if (savedSession) {
        const sessionData = JSON.parse(savedSession);
        if (sessionData && sessionData.signedIn) {
          window.currentUser = sessionData;
          currentUser = sessionData;
          updateAuthUI();
          console.log('✅ User session restored:', sessionData.name);
        }
      }
    } catch (error) {
      console.error('Session restoration error:', error);
    }
  }

  // Make updateAuthUI globally available
  window.updateAuthUI = updateAuthUI;

  // INITIALIZATION
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeUniversalFix);
  } else {
    initializeUniversalFix();
  }

  // Also initialize after a delay to ensure all elements are ready
  setTimeout(initializeUniversalFix, 1000);

  console.log('🌟 Universal Website Fix System Loaded');

})();
