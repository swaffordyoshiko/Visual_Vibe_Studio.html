// 🔧 WORKING AUTHENTICATION FIX
// Based on final-check.js - fixes sign-in recognition and signup conflicts

console.log('🔧 Working Auth Fix: Starting...');

// Clear existing broken auth functions
const brokenFunctions = ['handleSignIn', 'handleSignUp', 'updateAuthUI'];
brokenFunctions.forEach(func => {
    if (window[func]) {
        console.log(`🧹 Clearing broken function: ${func}`);
        delete window[func];
    }
});

// Unified storage manager
const AuthManager = {
    getAllUsers() {
        try {
            return JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        } catch (e) {
            return [];
        }
    },
    
    saveAllUsers(users) {
        localStorage.setItem('visualVibeUsers', JSON.stringify(users));
    },
    
    findUser(email) {
        const users = this.getAllUsers();
        return users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase());
    },
    
    createUser(userData) {
        const users = this.getAllUsers();
        const newUser = {
            id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: userData.name,
            firstName: userData.name.split(' ')[0],
            lastName: userData.name.split(' ').slice(1).join(' ') || '',
            email: userData.email.toLowerCase(),
            password: userData.password,
            orders: [],
            reviews: [],
            createdAt: new Date().toISOString(),
            lastActivity: new Date().toISOString(),
            accountVersion: '2.0',
            realAccount: true
        };
        
        users.push(newUser);
        this.saveAllUsers(users);
        return newUser;
    },
    
    setCurrentUser(user) {
        const sessionUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            orders: user.orders || [],
            reviews: user.reviews || [],
            signedIn: true,
            signInTime: new Date().toISOString()
        };
        
        window.currentUser = sessionUser;
        localStorage.setItem('visualVibeUser', JSON.stringify(sessionUser));
        localStorage.setItem('currentUser', JSON.stringify(sessionUser));
        localStorage.setItem(`user_${user.email}`, JSON.stringify(user));
        
        return sessionUser;
    },
    
    clearCurrentUser() {
        window.currentUser = null;
        localStorage.removeItem('visualVibeUser');
        localStorage.removeItem('currentUser');
    }
};

// Fixed Sign In Handler
window.handleSignIn = function(e) {
    if (e) e.preventDefault();
    console.log('🔑 Processing sign in...');
    
    const emailInput = document.getElementById('signInEmail');
    const passwordInput = document.getElementById('signInPassword');
    
    if (!emailInput || !passwordInput) {
        alert('Sign in form not found. Please refresh the page.');
        return;
    }
    
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();
    
    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }
    
    // Find existing user
    const user = AuthManager.findUser(email);
    if (!user) {
        alert('No account found with this email. Please sign up first.');
        return;
    }
    
    if (user.password !== password) {
        alert('Incorrect password. Please try again.');
        return;
    }
    
    // Successful sign in
    const sessionUser = AuthManager.setCurrentUser(user);
    
    // Update last activity
    user.lastActivity = new Date().toISOString();
    const users = AuthManager.getAllUsers();
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
        users[userIndex] = user;
        AuthManager.saveAllUsers(users);
    }
    
    // Close modal and update UI
    if (typeof window.hideSignInModal === 'function') {
        window.hideSignInModal();
    }
    
    window.updateAuthUI(true, sessionUser.name);
    
    alert(`Welcome back, ${sessionUser.name}!`);
    console.log('✅ Sign in successful for:', sessionUser.email);
};

// Fixed Sign Up Handler
window.handleSignUp = function(e) {
    if (e) e.preventDefault();
    console.log('📝 Processing sign up...');
    
    const nameInput = document.getElementById('signUpName');
    const emailInput = document.getElementById('signUpEmail');
    const passwordInput = document.getElementById('signUpPassword');
    const confirmPasswordInput = document.getElementById('signUpConfirmPassword');
    
    if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
        alert('Sign up form not found. Please refresh the page.');
        return;
    }
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Check if user already exists
    const existingUser = AuthManager.findUser(email);
    if (existingUser) {
        // Check if it's a phantom account
        const isPhantom = (
            existingUser.syncedFromCloud === true ||
            existingUser.password === 'temp123' ||
            existingUser.password === 'temporary' ||
            !existingUser.createdAt ||
            existingUser.accountVersion !== '2.0'
        );
        
        if (isPhantom) {
            console.log('👻 Removing phantom account and creating real account');
            const users = AuthManager.getAllUsers();
            const filteredUsers = users.filter(u => u.email.toLowerCase() !== email);
            AuthManager.saveAllUsers(filteredUsers);
        } else {
            alert('An account already exists with this email. Please sign in instead.');
            
            // Switch to sign in and pre-fill email
            setTimeout(() => {
                if (typeof window.switchToSignIn === 'function') {
                    window.switchToSignIn();
                    setTimeout(() => {
                        const signInEmailInput = document.getElementById('signInEmail');
                        if (signInEmailInput) {
                            signInEmailInput.value = email;
                            signInEmailInput.focus();
                        }
                    }, 200);
                }
            }, 500);
            return;
        }
    }
    
    // Create new user
    const newUser = AuthManager.createUser({ name, email, password });
    const sessionUser = AuthManager.setCurrentUser(newUser);
    
    // Clear form
    nameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
    
    // Close modal and update UI
    if (typeof window.hideSignUpModal === 'function') {
        window.hideSignUpModal();
    }
    
    window.updateAuthUI(true, sessionUser.name);
    
    alert(`Welcome to Visual Vibe Studio, ${sessionUser.name}!`);
    console.log('✅ Sign up successful for:', sessionUser.email);
};

// Fixed UI Update Function
window.updateAuthUI = function(isSignedIn, userName = '') {
    console.log('🎨 Updating auth UI:', { isSignedIn, userName });
    
    const signedOutState = document.getElementById('signedOutState');
    const signedInState = document.getElementById('signedInState');
    const mobileSignedOutState = document.getElementById('mobileSignedOutState');
    const mobileSignedInState = document.getElementById('mobileSignedInState');
    const userWelcome = document.getElementById('userWelcome');
    
    if (isSignedIn) {
        // Show signed in state
        if (signedOutState) {
            signedOutState.style.display = 'none';
            signedOutState.classList.add('hidden');
        }
        if (signedInState) {
            signedInState.style.display = 'flex';
            signedInState.style.visibility = 'visible';
            signedInState.classList.remove('hidden');
        }
        if (mobileSignedOutState) {
            mobileSignedOutState.style.display = 'none';
            mobileSignedOutState.classList.add('hidden');
        }
        if (mobileSignedInState) {
            mobileSignedInState.style.display = 'block';
            mobileSignedInState.style.visibility = 'visible';
            mobileSignedInState.classList.remove('hidden');
        }
        if (userWelcome && userName) {
            userWelcome.textContent = `Welcome, ${userName}!`;
        }
        
        // Add profile buttons if missing
        addProfileButtons();
        
    } else {
        // Show signed out state
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
    }
    
    console.log('✅ Auth UI updated successfully');
};

// Add profile management buttons
function addProfileButtons() {
    const signedInState = document.getElementById('signedInState');
    const mobileSignedInState = document.getElementById('mobileSignedInState');
    
    // Desktop buttons
    if (signedInState && !signedInState.querySelector('.auth-profile-btn')) {
        const existingButtons = signedInState.innerHTML;
        signedInState.innerHTML = `
            <span id="userWelcome" class="text-gray-700">Welcome!</span>
            <button onclick="openEditProfile()" class="auth-profile-btn text-indigo-600 hover:text-indigo-800 text-sm font-medium px-2 py-1 rounded transition-colors">
                Edit Profile
            </button>
            <button onclick="openMyOrders()" class="auth-profile-btn text-indigo-600 hover:text-indigo-800 text-sm font-medium px-2 py-1 rounded transition-colors">
                My Orders
            </button>
            <button onclick="signOut()" class="text-gray-500 hover:text-gray-700 text-sm">
                Sign Out
            </button>
        `;
    }
    
    // Mobile buttons
    if (mobileSignedInState && !mobileSignedInState.querySelector('.auth-mobile-btn')) {
        mobileSignedInState.innerHTML = `
            <button onclick="openEditProfile(); toggleMobileMenu && toggleMobileMenu();" class="auth-mobile-btn w-full text-left text-indigo-600 hover:text-indigo-800 py-3 text-sm">
                Edit Profile
            </button>
            <button onclick="openMyOrders(); toggleMobileMenu && toggleMobileMenu();" class="auth-mobile-btn w-full text-left text-indigo-600 hover:text-indigo-800 py-3 text-sm">
                My Orders
            </button>
            <button onclick="signOut(); toggleMobileMenu && toggleMobileMenu();" class="w-full text-left text-gray-500 hover:text-gray-700 py-3 text-sm">
                Sign Out
            </button>
        `;
    }
}

// Profile management functions
window.openEditProfile = function() {
    if (typeof window.openProfileModal === 'function') {
        window.openProfileModal();
    } else {
        alert('Edit Profile feature is loading...\n\nPlease wait for the page to fully load and try again.');
    }
};

window.openMyOrders = function() {
    if (typeof window.showOrderHistory === 'function') {
        window.showOrderHistory();
    } else {
        alert('My Orders feature is loading...\n\nPlease wait for the page to fully load and try again.');
    }
};

// Sign out function
window.signOut = function() {
    console.log('👋 Signing out user');
    AuthManager.clearCurrentUser();
    window.updateAuthUI(false);
    alert('You have been signed out successfully.');
};

// Modal functions (if not already defined)
if (!window.showSignInModal) {
    window.showSignInModal = function() {
        const modal = document.getElementById('signInModal');
        if (modal) {
            modal.style.display = 'flex';
            modal.classList.remove('hidden');
            
            const emailInput = document.getElementById('signInEmail');
            const passwordInput = document.getElementById('signInPassword');
            if (emailInput) {
                emailInput.value = '';
                setTimeout(() => emailInput.focus(), 100);
            }
            if (passwordInput) passwordInput.value = '';
        }
    };
}

if (!window.showSignUpModal) {
    window.showSignUpModal = function() {
        const modal = document.getElementById('signUpModal');
        if (modal) {
            modal.style.display = 'flex';
            modal.classList.remove('hidden');
            
            ['signUpName', 'signUpEmail', 'signUpPassword', 'signUpConfirmPassword'].forEach(id => {
                const input = document.getElementById(id);
                if (input) input.value = '';
            });
            
            const nameInput = document.getElementById('signUpName');
            if (nameInput) setTimeout(() => nameInput.focus(), 100);
        }
    };
}

if (!window.hideSignInModal) {
    window.hideSignInModal = function() {
        const modal = document.getElementById('signInModal');
        if (modal) {
            modal.style.display = 'none';
            modal.classList.add('hidden');
        }
    };
}

if (!window.hideSignUpModal) {
    window.hideSignUpModal = function() {
        const modal = document.getElementById('signUpModal');
        if (modal) {
            modal.style.display = 'none';
            modal.classList.add('hidden');
        }
    };
}

if (!window.switchToSignUp) {
    window.switchToSignUp = function() {
        window.hideSignInModal();
        setTimeout(window.showSignUpModal, 100);
    };
}

if (!window.switchToSignIn) {
    window.switchToSignIn = function() {
        window.hideSignUpModal();
        setTimeout(window.showSignInModal, 100);
    };
}

// Attach form handlers
function attachFormHandlers() {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    
    if (signInForm) {
        signInForm.onsubmit = window.handleSignIn;
        console.log('✅ Sign in form handler attached');
    }
    
    if (signUpForm) {
        signUpForm.onsubmit = window.handleSignUp;
        console.log('✅ Sign up form handler attached');
    }
}

// Check for existing session
function checkExistingSession() {
    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || localStorage.getItem('visualVibeUser') || 'null');
        if (currentUser && currentUser.signedIn) {
            console.log('✅ Found existing session for:', currentUser.email);
            window.currentUser = currentUser;
            window.updateAuthUI(true, currentUser.name);
        } else {
            console.log('ℹ️ No existing session found');
            window.updateAuthUI(false);
        }
    } catch (e) {
        console.log('ℹ️ No valid session found');
        window.updateAuthUI(false);
    }
}

// Clean up phantom accounts
function cleanPhantomAccounts() {
    try {
        const users = AuthManager.getAllUsers();
        const beforeCount = users.length;
        
        const cleanUsers = users.filter(user => {
            const isPhantom = (
                user.syncedFromCloud === true ||
                user.password === 'temp123' ||
                user.password === 'temporary' ||
                !user.createdAt ||
                (user.accountVersion !== '2.0' && !user.realAccount)
            );
            
            if (isPhantom) {
                console.log('🧹 Removing phantom account:', user.email);
                return false;
            }
            return true;
        });
        
        const afterCount = cleanUsers.length;
        
        if (beforeCount !== afterCount) {
            AuthManager.saveAllUsers(cleanUsers);
            console.log(`🧹 Cleaned up ${beforeCount - afterCount} phantom accounts`);
        }
    } catch (error) {
        console.error('❌ Error cleaning phantom accounts:', error);
    }
}

// Initialize authentication system
function initializeAuth() {
    console.log('🎯 Initializing working authentication system...');
    
    // Clean up first
    cleanPhantomAccounts();
    
    // Attach handlers
    attachFormHandlers();
    
    // Check existing session
    checkExistingSession();
    
    // Setup modal click handlers
    const signInModal = document.getElementById('signInModal');
    const signUpModal = document.getElementById('signUpModal');
    
    if (signInModal) {
        signInModal.onclick = function(e) {
            if (e.target === this) window.hideSignInModal();
        };
    }
    
    if (signUpModal) {
        signUpModal.onclick = function(e) {
            if (e.target === this) window.hideSignUpModal();
        };
    }
    
    console.log('✅ Working authentication system initialized!');
    
    // Show success notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 15px;
        border-radius: 5px;
        z-index: 10000;
        font-family: Arial, sans-serif;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    notification.textContent = '✅ Authentication system fixed!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Start initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAuth);
} else {
    setTimeout(initializeAuth, 500);
}

console.log('✅ Working auth fix loaded successfully!');
