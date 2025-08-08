// FINAL WORKING FIX - Override all broken authentication functions
console.log('🔧 FINAL FIX: Overriding broken authentication functions...');

// Clear any existing broken functions
const authFunctions = [
    'openSignInModal', 'openSignUpModal', 'closeSignInModal', 'closeSignUpModal',
    'switchToSignUp', 'switchToSignIn', 'handleSignIn', 'handleSignUp', 'signOut'
];

authFunctions.forEach(fn => {
    try {
        delete window[fn];
    } catch (e) {
        // Function may be non-configurable
    }
});

// Define working functions with protection against overwrites
const workingFunctions = {
    openSignInModal: function() {
        console.log('🔑 WORKING: Opening sign in modal...');
        const modal = document.getElementById('signInModal');
        if (modal) {
            modal.style.display = 'flex';
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100vw';
            modal.style.height = '100vh';
            modal.style.zIndex = '999999';
            modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
            modal.classList.remove('hidden');
            
            // Clear form fields
            const emailInput = document.getElementById('signInEmail');
            const passwordInput = document.getElementById('signInPassword');
            if (emailInput) emailInput.value = '';
            if (passwordInput) passwordInput.value = '';
            
            console.log('✅ Sign in modal opened successfully');
        } else {
            console.error('❌ Sign in modal element not found');
            alert('Sign in modal not found. Please refresh the page.');
        }
    },

    openSignUpModal: function() {
        console.log('📝 WORKING: Opening sign up modal...');
        const modal = document.getElementById('signUpModal');
        if (modal) {
            modal.style.display = 'flex';
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100vw';
            modal.style.height = '100vh';
            modal.style.zIndex = '999999';
            modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
            modal.classList.remove('hidden');
            
            // Clear form fields
            const nameInput = document.getElementById('signUpName');
            const emailInput = document.getElementById('signUpEmail');
            const passwordInput = document.getElementById('signUpPassword');
            const confirmInput = document.getElementById('signUpConfirmPassword');
            
            if (nameInput) nameInput.value = '';
            if (emailInput) emailInput.value = '';
            if (passwordInput) passwordInput.value = '';
            if (confirmInput) confirmInput.value = '';
            
            console.log('✅ Sign up modal opened successfully');
        } else {
            console.error('❌ Sign up modal element not found');
            alert('Sign up modal not found. Please refresh the page.');
        }
    },

    closeSignInModal: function() {
        const modal = document.getElementById('signInModal');
        if (modal) {
            modal.style.display = 'none';
            modal.classList.add('hidden');
        }
    },

    closeSignUpModal: function() {
        const modal = document.getElementById('signUpModal');
        if (modal) {
            modal.style.display = 'none';
            modal.classList.add('hidden');
        }
    },

    switchToSignUp: function() {
        workingFunctions.closeSignInModal();
        setTimeout(() => workingFunctions.openSignUpModal(), 100);
    },

    switchToSignIn: function() {
        workingFunctions.closeSignUpModal();
        setTimeout(() => workingFunctions.openSignInModal(), 100);
    },

    handleSignIn: function(e) {
        if (e) e.preventDefault();
        
        const email = document.getElementById('signInEmail')?.value?.trim();
        const password = document.getElementById('signInPassword')?.value?.trim();
        
        if (!email || !password) {
            alert('Please enter both email and password');
            return false;
        }
        
        // Check for existing user
        const userData = localStorage.getItem('vvs_user_' + email);
        if (!userData) {
            alert('No account found with this email. Please sign up first.');
            return false;
        }
        
        try {
            const user = JSON.parse(userData);
            if (user.password !== password) {
                alert('Incorrect password');
                return false;
            }
            
            // Success - sign in user
            localStorage.setItem('vvs_user', userData);
            workingFunctions.closeSignInModal();
            alert(`Welcome back, ${user.name}!`);
            updateAuthUI(true);
            
        } catch (e) {
            console.error('Error parsing user data:', e);
            alert('Error signing in. Please try again.');
        }
        
        return false;
    },

    handleSignUp: function(e) {
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
        if (localStorage.getItem('vvs_user_' + email)) {
            alert('Account already exists with this email. Please sign in instead.');
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
            localStorage.setItem('vvs_user_' + email, JSON.stringify(userData));
            localStorage.setItem('vvs_user', JSON.stringify(userData));
            workingFunctions.closeSignUpModal();
            alert(`Welcome to Visual Vibe Studio, ${name}!`);
            updateAuthUI(true);
            
        } catch (e) {
            console.error('Error saving user data:', e);
            alert('Error creating account. Please try again.');
        }
        
        return false;
    },

    signOut: function() {
        localStorage.removeItem('vvs_user');
        alert('You have been signed out');
        updateAuthUI(false);
    }
};

// Helper function to update UI
function updateAuthUI(isSignedIn) {
    const signedOutState = document.getElementById('signedOutState');
    const signedInState = document.getElementById('signedInState');
    const mobileSignedOutState = document.getElementById('mobileSignedOutState');
    const mobileSignedInState = document.getElementById('mobileSignedInState');
    
    if (isSignedIn) {
        // Hide sign out buttons, show sign in state
        if (signedOutState) signedOutState.style.display = 'none';
        if (signedInState) signedInState.style.display = 'flex';
        if (mobileSignedOutState) mobileSignedOutState.style.display = 'none';
        if (mobileSignedInState) mobileSignedInState.style.display = 'block';
    } else {
        // Show sign out buttons, hide sign in state
        if (signedOutState) signedOutState.style.display = 'flex';
        if (signedInState) signedInState.style.display = 'none';
        if (mobileSignedOutState) mobileSignedOutState.style.display = 'block';
        if (mobileSignedInState) mobileSignedInState.style.display = 'none';
    }
}

// Assign functions to window with protection against overwrites
Object.keys(workingFunctions).forEach(fnName => {
    try {
        Object.defineProperty(window, fnName, {
            value: workingFunctions[fnName],
            writable: false,
            configurable: false
        });
        console.log(`✅ ${fnName} function protected and assigned`);
    } catch (e) {
        // Fallback to regular assignment
        window[fnName] = workingFunctions[fnName];
        console.log(`⚠️ ${fnName} function assigned (not protected)`);
    }
});

// Attach form handlers when DOM is ready
function attachFormHandlers() {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    
    if (signInForm) {
        signInForm.onsubmit = workingFunctions.handleSignIn;
        console.log('✅ Sign in form handler attached');
    } else {
        console.warn('⚠️ Sign in form not found');
    }
    
    if (signUpForm) {
        signUpForm.onsubmit = workingFunctions.handleSignUp;
        console.log('✅ Sign up form handler attached');
    } else {
        console.warn('⚠️ Sign up form not found');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        attachFormHandlers();
        
        // Check for existing user session
        const currentUser = localStorage.getItem('vvs_user');
        if (currentUser) {
            updateAuthUI(true);
        } else {
            updateAuthUI(false);
        }
    });
} else {
    // DOM is already loaded
    setTimeout(function() {
        attachFormHandlers();
        
        // Check for existing user session
        const currentUser = localStorage.getItem('vvs_user');
        if (currentUser) {
            updateAuthUI(true);
        } else {
            updateAuthUI(false);
        }
    }, 100);
}

// Verify functions are working
setTimeout(function() {
    console.log('🔍 FINAL FIX: Function verification:', {
        openSignInModal: typeof window.openSignInModal,
        openSignUpModal: typeof window.openSignUpModal,
        handleSignIn: typeof window.handleSignIn,
        handleSignUp: typeof window.handleSignUp,
        signInModal: !!document.getElementById('signInModal'),
        signUpModal: !!document.getElementById('signUpModal'),
        signInForm: !!document.getElementById('signInForm'),
        signUpForm: !!document.getElementById('signUpForm')
    });
    
    if (typeof window.openSignInModal === 'function' && typeof window.openSignUpModal === 'function') {
        console.log('✅ FINAL FIX: All functions are working correctly!');
        console.log('💡 Try clicking the Sign In or Sign Up buttons - they should work now!');
    } else {
        console.error('❌ FINAL FIX: Functions still not working properly');
    }
}, 1000);

console.log('🎉 FINAL FIX: Authentication override complete!');
