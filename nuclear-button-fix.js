// ==========================================
// NUCLEAR BUTTON FIX - Last Resort
// This will absolutely force the buttons to work
// ==========================================

console.log('💥 NUCLEAR: Forcing sign in/up buttons to work...');

// Run immediately
(function nuclearFix() {
    
    // Clear ALL existing auth functions that might be broken
    const authFunctionNames = [
        'handleSignIn', 'handleSignUp', 'openSignInModal', 'openSignUpModal',
        'closeSignInModal', 'closeSignUpModal', 'switchToSignIn', 'switchToSignUp',
        'signOut', 'updateAuthUI'
    ];
    
    authFunctionNames.forEach(fn => {
        try {
            delete window[fn];
        } catch (e) {}
    });

    // Force create working functions
    window.openSignInModal = function() {
        console.log('💥 NUCLEAR: Opening sign in modal');
        const modal = document.getElementById('signInModal');
        if (modal) {
            modal.style.display = 'flex';
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.zIndex = '999999';
            modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
            modal.classList.remove('hidden');
        } else {
            alert('Please refresh the page and try again.');
        }
    };

    window.openSignUpModal = function() {
        console.log('💥 NUCLEAR: Opening sign up modal');
        const modal = document.getElementById('signUpModal');
        if (modal) {
            modal.style.display = 'flex';
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.zIndex = '999999';
            modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
            modal.classList.remove('hidden');
        } else {
            alert('Please refresh the page and try again.');
        }
    };

    window.closeSignInModal = function() {
        const modal = document.getElementById('signInModal');
        if (modal) {
            modal.style.display = 'none';
            modal.classList.add('hidden');
        }
    };

    window.closeSignUpModal = function() {
        const modal = document.getElementById('signUpModal');
        if (modal) {
            modal.style.display = 'none';
            modal.classList.add('hidden');
        }
    };

    window.switchToSignUp = function() {
        window.closeSignInModal();
        setTimeout(() => window.openSignUpModal(), 50);
    };

    window.switchToSignIn = function() {
        window.closeSignUpModal();
        setTimeout(() => window.openSignInModal(), 50);
    };

    // Nuclear button visibility fix
    function nuclearButtonVisibility() {
        const signedOutState = document.getElementById('signedOutState');
        const mobileSignedOutState = document.getElementById('mobileSignedOutState');
        
        if (signedOutState) {
            // Remove ALL classes and styles that might hide it
            signedOutState.className = 'flex items-center space-x-2';
            signedOutState.style.cssText = 'display: flex !important; visibility: visible !important; opacity: 1 !important;';
            console.log('💥 NUCLEAR: Desktop buttons forced visible');
        }
        
        if (mobileSignedOutState) {
            mobileSignedOutState.className = 'space-y-3';
            mobileSignedOutState.style.cssText = 'display: block !important; visibility: visible !important; opacity: 1 !important;';
            console.log('💥 NUCLEAR: Mobile buttons forced visible');
        }

        // Find and fix all sign in/up buttons on the page
        document.querySelectorAll('button').forEach(btn => {
            const text = btn.textContent.trim().toLowerCase();
            if (text.includes('sign in')) {
                btn.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    window.openSignInModal();
                };
                btn.style.cssText = 'display: inline-block !important; visibility: visible !important; opacity: 1 !important;';
                console.log('💥 NUCLEAR: Fixed sign in button');
            } else if (text.includes('sign up')) {
                btn.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    window.openSignUpModal();
                };
                btn.style.cssText = 'display: inline-block !important; visibility: visible !important; opacity: 1 !important;';
                console.log('💥 NUCLEAR: Fixed sign up button');
            }
        });
    }

    // Authentication functions
    window.handleSignIn = function(e) {
        if (e) e.preventDefault();
        
        const email = document.getElementById('signInEmail')?.value?.trim();
        const password = document.getElementById('signInPassword')?.value?.trim();
        
        if (!email || !password) {
            alert('Please enter both email and password');
            return false;
        }
        
        // Check localStorage for user
        const userKey = 'vvs_user_' + email;
        const userData = localStorage.getItem(userKey);
        
        if (!userData) {
            alert('No account found. Please sign up first.');
            return false;
        }
        
        try {
            const user = JSON.parse(userData);
            if (user.password !== password) {
                alert('Incorrect password');
                return false;
            }
            
            // Sign in success
            localStorage.setItem('vvs_user', userData);
            window.closeSignInModal();
            alert(`Welcome back, ${user.name}!`);
            
            // Hide sign out buttons, show sign in buttons
            hideSignOutButtons();
            showSignInButtons();
            
        } catch (e) {
            alert('Error signing in. Please try again.');
        }
        
        return false;
    };

    window.handleSignUp = function(e) {
        if (e) e.preventDefault();
        
        const name = document.getElementById('signUpName')?.value?.trim();
        const email = document.getElementById('signUpEmail')?.value?.trim();
        const password = document.getElementById('signUpPassword')?.value?.trim();
        const confirm = document.getElementById('signUpConfirmPassword')?.value?.trim();
        
        if (!name || !email || !password || !confirm) {
            alert('Please fill in all fields');
            return false;
        }
        
        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            return false;
        }
        
        if (password !== confirm) {
            alert('Passwords do not match');
            return false;
        }
        
        // Check if user already exists
        const userKey = 'vvs_user_' + email;
        if (localStorage.getItem(userKey)) {
            alert('Account already exists. Please sign in instead.');
            return false;
        }
        
        // Create new user
        const userData = {
            name: name,
            email: email,
            password: password,
            createdAt: new Date().toISOString()
        };
        
        try {
            localStorage.setItem(userKey, JSON.stringify(userData));
            localStorage.setItem('vvs_user', JSON.stringify(userData));
            
            window.closeSignUpModal();
            alert(`Welcome to Visual Vibe Studio, ${name}!`);
            
            // Hide sign out buttons, show sign in buttons
            hideSignOutButtons();
            showSignInButtons();
            
        } catch (e) {
            alert('Error creating account. Please try again.');
        }
        
        return false;
    };

    window.signOut = function() {
        localStorage.removeItem('vvs_user');
        alert('You have been signed out');
        nuclearButtonVisibility();
    };

    function hideSignOutButtons() {
        const signedInState = document.getElementById('signedInState');
        const mobileSignedInState = document.getElementById('mobileSignedInState');
        
        if (signedInState) {
            signedInState.style.display = 'flex';
            signedInState.classList.remove('hidden');
        }
        if (mobileSignedInState) {
            mobileSignedInState.style.display = 'block';
            mobileSignedInState.classList.remove('hidden');
        }
        
        // Hide sign out buttons
        const signedOutState = document.getElementById('signedOutState');
        const mobileSignedOutState = document.getElementById('mobileSignedOutState');
        
        if (signedOutState) {
            signedOutState.style.display = 'none';
            signedOutState.classList.add('hidden');
        }
        if (mobileSignedOutState) {
            mobileSignedOutState.style.display = 'none';
            mobileSignedOutState.classList.add('hidden');
        }
    }

    function showSignInButtons() {
        nuclearButtonVisibility();
    }

    // Initialize form handlers
    function initializeForms() {
        const signInForm = document.getElementById('signInForm');
        const signUpForm = document.getElementById('signUpForm');
        
        if (signInForm) {
            signInForm.onsubmit = window.handleSignIn;
            console.log('💥 NUCLEAR: Sign in form fixed');
        }
        
        if (signUpForm) {
            signUpForm.onsubmit = window.handleSignUp;
            console.log('💥 NUCLEAR: Sign up form fixed');
        }
    }

    // Run the nuclear fix
    nuclearButtonVisibility();
    initializeForms();

    // Check for existing user session
    const currentUser = localStorage.getItem('vvs_user');
    if (currentUser) {
        try {
            const user = JSON.parse(currentUser);
            hideSignOutButtons();
        } catch (e) {
            nuclearButtonVisibility();
        }
    }

    // Keep running the fix every 2 seconds to override any conflicting scripts
    setInterval(function() {
        const currentUser = localStorage.getItem('vvs_user');
        if (!currentUser) {
            nuclearButtonVisibility();
        }
    }, 2000);

    console.log('💥 NUCLEAR: Button fix complete!');

})();

// Run it multiple times to ensure it sticks
setTimeout(() => {
    console.log('💥 NUCLEAR: Re-running fix after 1 second');
    nuclearFix();
}, 1000);

setTimeout(() => {
    console.log('💥 NUCLEAR: Re-running fix after 3 seconds');
    nuclearFix();
}, 3000);
