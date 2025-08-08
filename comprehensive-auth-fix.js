// 🔧 COMPREHENSIVE AUTHENTICATION FIX
// Fixes: Sign-in recognition, profile buttons visibility, and authentication conflicts

console.log('🚀 Loading comprehensive authentication fix...');

// STEP 1: Clear all conflicting authentication handlers
const conflictingFunctions = [
    'handleSignIn', 'handleSignUp', 'openSignInModal', 'openSignUpModal', 
    'showSignInModal', 'showSignUpModal', 'updateAuthUI', 'signOut'
];

conflictingFunctions.forEach(funcName => {
    if (window[funcName]) {
        console.log(`🧹 Clearing conflicting function: ${funcName}`);
        delete window[funcName];
    }
});

// STEP 2: Unified storage manager that checks all possible storage locations
const AuthStorage = {
    // Storage keys used across the system
    keys: [
        'vvs_user',
        'visualVibeUser', 
        'visualVibeUsers',
        'currentUser'
    ],
    
    // Save user to all storage locations for compatibility
    saveUser(userData) {
        const userToSave = {
            id: userData.id || Date.now().toString(),
            name: userData.name,
            email: userData.email.toLowerCase(),
            password: userData.password,
            createdAt: userData.createdAt || new Date().toISOString()
        };
        
        // Save to primary location
        localStorage.setItem('vvs_user', JSON.stringify(userToSave));
        localStorage.setItem('visualVibeUser', JSON.stringify(userToSave));
        localStorage.setItem('currentUser', JSON.stringify(userToSave));
        
        // Save to user-specific key
        localStorage.setItem(`user_${userToSave.email}`, JSON.stringify(userToSave));
        localStorage.setItem(`vvs_user_${userToSave.email}`, JSON.stringify(userToSave));
        
        // Update users array
        let users = this.getAllUsers();
        users = users.filter(u => u.email !== userToSave.email); // Remove duplicates
        users.push(userToSave);
        localStorage.setItem('visualVibeUsers', JSON.stringify(users));
        
        console.log('✅ User saved to all storage locations:', userToSave.email);
        return userToSave;
    },
    
    // Get user by email from any storage location
    getUser(email) {
        if (!email) {
            // Get current user
            for (const key of ['vvs_user', 'visualVibeUser', 'currentUser']) {
                const userData = localStorage.getItem(key);
                if (userData) {
                    try {
                        return JSON.parse(userData);
                    } catch (e) {
                        console.warn(`Invalid JSON in ${key}:`, e);
                    }
                }
            }
            return null;
        }
        
        const emailLower = email.toLowerCase();
        
        // Check user-specific keys first
        for (const prefix of ['user_', 'vvs_user_']) {
            const userData = localStorage.getItem(prefix + emailLower);
            if (userData) {
                try {
                    return JSON.parse(userData);
                } catch (e) {
                    console.warn(`Invalid JSON in ${prefix + emailLower}:`, e);
                }
            }
        }
        
        // Check users array
        const users = this.getAllUsers();
        const user = users.find(u => u.email && u.email.toLowerCase() === emailLower);
        if (user) return user;
        
        console.log(`❌ No user found for email: ${email}`);
        return null;
    },
    
    // Get all users from storage
    getAllUsers() {
        try {
            const usersData = localStorage.getItem('visualVibeUsers');
            return usersData ? JSON.parse(usersData) : [];
        } catch (e) {
            console.warn('Invalid JSON in visualVibeUsers:', e);
            return [];
        }
    },
    
    // Remove current user session
    removeUser() {
        const keysToRemove = ['vvs_user', 'visualVibeUser', 'currentUser'];
        keysToRemove.forEach(key => localStorage.removeItem(key));
        console.log('✅ User session cleared');
    },
    
    // Check if user exists in any storage location
    userExists(email) {
        return this.getUser(email) !== null;
    }
};

// STEP 3: Enhanced authentication functions
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
        alert('Please enter both email and password');
        return;
    }
    
    // Check if user exists in any storage location
    const user = AuthStorage.getUser(email);
    if (!user) {
        alert('No account found with this email. Please sign up first.');
        return;
    }
    
    if (user.password !== password) {
        alert('Incorrect password. Please try again.');
        return;
    }
    
    // Sign in successful - save user and update UI
    const sessionUser = AuthStorage.saveUser(user);
    window.currentUser = sessionUser;
    hideSignInModal();
    updateAuthUI(true, sessionUser.name);
    
    // Show success message
    showToast(`Welcome back, ${sessionUser.name}!`, 'success');
    console.log('✅ Sign in successful for:', sessionUser.email);
};

window.handleSignUp = function(e) {
    if (e) e.preventDefault();
    console.log('📝 Processing sign up...');
    
    const nameInput = document.getElementById('signUpName');
    const emailInput = document.getElementById('signUpEmail');
    const passwordInput = document.getElementById('signUpPassword');
    const confirmInput = document.getElementById('signUpConfirmPassword');
    
    if (!nameInput || !emailInput || !passwordInput || !confirmInput) {
        alert('Sign up form not found. Please refresh the page.');
        return;
    }
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();
    const confirm = confirmInput.value.trim();
    
    if (!name || !email || !password || !confirm) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }
    
    if (password !== confirm) {
        alert('Passwords do not match');
        return;
    }
    
    // Check if user already exists
    if (AuthStorage.userExists(email)) {
        alert('Account already exists with this email. Please sign in instead.');
        return;
    }
    
    // Create new user
    const userData = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };
    
    // Save user and update UI
    const sessionUser = AuthStorage.saveUser(userData);
    window.currentUser = sessionUser;
    hideSignUpModal();
    updateAuthUI(true, sessionUser.name);
    
    // Show success message
    showToast(`Welcome to Visual Vibe Studio, ${sessionUser.name}!`, 'success');
    console.log('✅ Sign up successful for:', sessionUser.email);
};

// STEP 4: Enhanced UI update function with profile buttons
window.updateAuthUI = function(isSignedIn, userName = '') {
    console.log('🎨 Updating auth UI:', { isSignedIn, userName });
    
    const signedOutState = document.getElementById('signedOutState');
    const signedInState = document.getElementById('signedInState');
    const mobileSignedOutState = document.getElementById('mobileSignedOutState');
    const mobileSignedInState = document.getElementById('mobileSignedInState');
    const userWelcome = document.getElementById('userWelcome');
    
    if (isSignedIn) {
        // Show signed in state
        if (signedOutState) signedOutState.style.display = 'none';
        if (signedInState) {
            signedInState.style.display = 'flex';
            signedInState.style.visibility = 'visible';
            signedInState.style.opacity = '1';
        }
        if (mobileSignedOutState) mobileSignedOutState.style.display = 'none';
        if (mobileSignedInState) {
            mobileSignedInState.style.display = 'block';
            mobileSignedInState.style.visibility = 'visible';
        }
        
        // Update welcome message
        if (userWelcome && userName) {
            userWelcome.textContent = `Welcome, ${userName}!`;
        }
        
        // Ensure profile buttons are visible and functional
        ensureProfileButtons();
        
    } else {
        // Show signed out state
        if (signedOutState) {
            signedOutState.style.display = 'flex';
            signedOutState.style.visibility = 'visible';
        }
        if (signedInState) {
            signedInState.style.display = 'none';
            signedInState.style.visibility = 'hidden';
            signedInState.style.opacity = '0';
        }
        if (mobileSignedOutState) {
            mobileSignedOutState.style.display = 'block';
            mobileSignedOutState.style.visibility = 'visible';
        }
        if (mobileSignedInState) {
            mobileSignedInState.style.display = 'none';
            mobileSignedInState.style.visibility = 'hidden';
        }
    }
    
    console.log('✅ Auth UI updated successfully');
};

// STEP 5: Ensure profile management buttons are present and functional
function ensureProfileButtons() {
    const signedInState = document.getElementById('signedInState');
    const mobileSignedInState = document.getElementById('mobileSignedInState');
    
    if (signedInState) {
        // Check if profile buttons already exist
        const existingButtons = signedInState.querySelectorAll('.profile-btn');
        if (existingButtons.length === 0) {
            // Add profile management buttons to desktop
            const profileButtonsHTML = `
                <button onclick="openEditProfile()" class="profile-btn text-indigo-600 hover:text-indigo-800 text-sm font-medium px-2 py-1 rounded transition-colors">
                    Edit Profile
                </button>
                <button onclick="openMyOrders()" class="profile-btn text-indigo-600 hover:text-indigo-800 text-sm font-medium px-2 py-1 rounded transition-colors">
                    My Orders
                </button>
            `;
            
            // Insert before the sign out button
            const signOutBtn = signedInState.querySelector('button[onclick*="signOut"]');
            if (signOutBtn) {
                signOutBtn.insertAdjacentHTML('beforebegin', profileButtonsHTML);
            }
        }
    }
    
    if (mobileSignedInState) {
        // Check if mobile profile buttons already exist
        const existingMobileButtons = mobileSignedInState.querySelectorAll('.mobile-profile-btn');
        if (existingMobileButtons.length === 0) {
            // Add profile management buttons to mobile
            const mobileButtonsHTML = `
                <button onclick="openEditProfile(); toggleMobileMenu();" class="mobile-profile-btn w-full text-left text-indigo-600 hover:text-indigo-800 py-3 text-sm">
                    Edit Profile
                </button>
                <button onclick="openMyOrders(); toggleMobileMenu();" class="mobile-profile-btn w-full text-left text-indigo-600 hover:text-indigo-800 py-3 text-sm">
                    My Orders
                </button>
            `;
            
            // Insert before the sign out button
            const mobileSignOutBtn = mobileSignedInState.querySelector('button[onclick*="signOut"]');
            if (mobileSignOutBtn) {
                mobileSignOutBtn.insertAdjacentHTML('beforebegin', mobileButtonsHTML);
            }
        }
    }
    
    console.log('✅ Profile buttons ensured');
}

// STEP 6: Profile management functions
window.openEditProfile = function() {
    console.log('👤 Opening edit profile...');
    // Check if profile modal exists, if not create it
    let profileModal = document.getElementById('editProfileModal');
    if (!profileModal) {
        createEditProfileModal();
        profileModal = document.getElementById('editProfileModal');
    }
    
    if (profileModal) {
        profileModal.style.display = 'flex';
        // Pre-fill current user data
        if (window.currentUser) {
            const nameInput = document.getElementById('editProfileName');
            const emailInput = document.getElementById('editProfileEmail');
            if (nameInput) nameInput.value = window.currentUser.name || '';
            if (emailInput) emailInput.value = window.currentUser.email || '';
        }
    }
};

window.openMyOrders = function() {
    console.log('📦 Opening my orders...');
    // Check if orders modal exists, if not create it
    let ordersModal = document.getElementById('myOrdersModal');
    if (!ordersModal) {
        createMyOrdersModal();
        ordersModal = document.getElementById('myOrdersModal');
    }
    
    if (ordersModal) {
        ordersModal.style.display = 'flex';
        loadUserOrders();
    }
};

// STEP 7: Modal creation functions
function createEditProfileModal() {
    const modalHTML = `
        <div id="editProfileModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden p-4" style="z-index: 9999;">
            <div class="bg-white rounded-xl p-8 max-w-md w-full">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-bold text-gray-800">Edit Profile</h3>
                    <button onclick="closeEditProfile()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                </div>
                
                <form onsubmit="saveProfile(event)" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input type="text" id="editProfileName" required class="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" id="editProfileEmail" required class="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    </div>
                    <div class="flex space-x-3 pt-4">
                        <button type="submit" class="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                            Save Changes
                        </button>
                        <button type="button" onclick="closeEditProfile()" class="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function createMyOrdersModal() {
    const modalHTML = `
        <div id="myOrdersModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden p-4" style="z-index: 9999;">
            <div class="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-bold text-gray-800">My Orders</h3>
                    <button onclick="closeMyOrders()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                </div>
                
                <div id="ordersContent" class="space-y-4">
                    <div class="text-center py-8 text-gray-500">
                        Loading orders...
                    </div>
                </div>
                
                <div class="flex justify-end pt-4">
                    <button onclick="closeMyOrders()" class="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// STEP 8: Modal close functions
window.closeEditProfile = function() {
    const modal = document.getElementById('editProfileModal');
    if (modal) modal.style.display = 'none';
};

window.closeMyOrders = function() {
    const modal = document.getElementById('myOrdersModal');
    if (modal) modal.style.display = 'none';
};

// STEP 9: Profile save function
window.saveProfile = function(e) {
    if (e) e.preventDefault();
    
    const nameInput = document.getElementById('editProfileName');
    const emailInput = document.getElementById('editProfileEmail');
    
    if (!nameInput || !emailInput) {
        alert('Profile form elements not found');
        return;
    }
    
    const newName = nameInput.value.trim();
    const newEmail = emailInput.value.trim().toLowerCase();
    
    if (!newName || !newEmail) {
        alert('Please fill in all fields');
        return;
    }
    
    if (window.currentUser) {
        // Update user data
        window.currentUser.name = newName;
        window.currentUser.email = newEmail;
        
        // Save updated user
        AuthStorage.saveUser(window.currentUser);
        
        // Update UI
        updateAuthUI(true, newName);
        closeEditProfile();
        
        showToast('Profile updated successfully!', 'success');
        console.log('✅ Profile updated for:', newEmail);
    }
};

// STEP 10: Load user orders function
function loadUserOrders() {
    const ordersContent = document.getElementById('ordersContent');
    if (!ordersContent) return;
    
    // Mock orders for now - in a real app, this would fetch from backend
    const orders = [
        {
            id: '001',
            service: 'Logo Design',
            status: 'Completed',
            date: '2024-01-15',
            amount: '$299'
        },
        {
            id: '002', 
            service: 'Website Design',
            status: 'In Progress',
            date: '2024-01-20',
            amount: '$899'
        }
    ];
    
    if (orders.length === 0) {
        ordersContent.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <p>No orders found.</p>
                <button onclick="closeMyOrders()" class="mt-4 text-indigo-600 hover:text-indigo-800 font-medium">
                    Place your first order
                </button>
            </div>
        `;
    } else {
        ordersContent.innerHTML = orders.map(order => `
            <div class="border border-gray-200 rounded-lg p-4">
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="font-semibold text-gray-800">${order.service}</h4>
                        <p class="text-sm text-gray-600">Order #${order.id}</p>
                        <p class="text-sm text-gray-600">Date: ${order.date}</p>
                    </div>
                    <div class="text-right">
                        <p class="font-semibold text-gray-800">${order.amount}</p>
                        <span class="text-sm px-2 py-1 rounded-full ${
                            order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                        }">
                            ${order.status}
                        </span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// STEP 11: Enhanced modal functions (override existing ones)
window.showSignInModal = function() {
    console.log('🔑 Showing sign in modal');
    const modal = document.getElementById('signInModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.remove('hidden');
        
        // Clear form and focus
        const emailInput = document.getElementById('signInEmail');
        const passwordInput = document.getElementById('signInPassword');
        if (emailInput) {
            emailInput.value = '';
            setTimeout(() => emailInput.focus(), 100);
        }
        if (passwordInput) passwordInput.value = '';
    }
};

window.showSignUpModal = function() {
    console.log('📝 Showing sign up modal');
    const modal = document.getElementById('signUpModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.remove('hidden');
        
        // Clear form and focus
        const nameInput = document.getElementById('signUpName');
        const emailInput = document.getElementById('signUpEmail');
        const passwordInput = document.getElementById('signUpPassword');
        const confirmInput = document.getElementById('signUpConfirmPassword');
        
        if (nameInput) {
            nameInput.value = '';
            setTimeout(() => nameInput.focus(), 100);
        }
        if (emailInput) emailInput.value = '';
        if (passwordInput) passwordInput.value = '';
        if (confirmInput) confirmInput.value = '';
    }
};

window.hideSignInModal = function() {
    const modal = document.getElementById('signInModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.add('hidden');
    }
};

window.hideSignUpModal = function() {
    const modal = document.getElementById('signUpModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.add('hidden');
    }
};

window.switchToSignUp = function() {
    hideSignInModal();
    setTimeout(showSignUpModal, 100);
};

window.switchToSignIn = function() {
    hideSignUpModal();
    setTimeout(showSignInModal, 100);
};

// STEP 12: Enhanced sign out function
window.signOut = function() {
    console.log('👋 Signing out user');
    AuthStorage.removeUser();
    window.currentUser = null;
    updateAuthUI(false);
    showToast('You have been signed out', 'info');
};

// STEP 13: Toast notification system
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.auth-toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = `auth-toast fixed top-4 right-4 z-[10000] px-6 py-3 rounded-lg shadow-lg text-white font-medium transform transition-all duration-300 translate-x-full opacity-0 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        type === 'info' ? 'bg-blue-500' : 'bg-gray-500'
    }`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.remove('translate-x-full', 'opacity-0');
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// STEP 14: Check for existing session on page load
function checkExistingSession() {
    console.log('🔍 Checking for existing session...');
    
    const currentUser = AuthStorage.getUser();
    if (currentUser) {
        console.log('✅ Found existing session for:', currentUser.email);
        window.currentUser = currentUser;
        updateAuthUI(true, currentUser.name);
    } else {
        console.log('ℹ️ No existing session found');
        updateAuthUI(false);
    }
}

// STEP 15: Initialize authentication system
function initializeAuth() {
    console.log('🎯 Initializing comprehensive authentication system...');
    
    // Setup form handlers
    const signInForm = document.getElementById('signInForm') || document.querySelector('form[onsubmit*="handleSignIn"]');
    const signUpForm = document.getElementById('signUpForm') || document.querySelector('form[onsubmit*="handleSignUp"]');
    
    if (signInForm) {
        signInForm.onsubmit = window.handleSignIn;
        console.log('✅ Sign in form handler attached');
    }
    
    if (signUpForm) {
        signUpForm.onsubmit = window.handleSignUp;
        console.log('✅ Sign up form handler attached');
    }
    
    // Check existing session
    checkExistingSession();
    
    // Setup click handlers for modal backgrounds
    const signInModal = document.getElementById('signInModal');
    const signUpModal = document.getElementById('signUpModal');
    
    if (signInModal) {
        signInModal.onclick = function(e) {
            if (e.target === this) hideSignInModal();
        };
    }
    
    if (signUpModal) {
        signUpModal.onclick = function(e) {
            if (e.target === this) hideSignUpModal();
        };
    }
    
    console.log('✅ Comprehensive authentication system initialized!');
}

// Wait for DOM to be ready, then initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAuth);
} else {
    initializeAuth();
}

// Override any conflicting functions that might load after this script
setTimeout(() => {
    console.log('🔒 Final protection against conflicting scripts...');
    
    // Ensure our functions are preserved
    const protectedFunctions = {
        handleSignIn: window.handleSignIn,
        handleSignUp: window.handleSignUp,
        updateAuthUI: window.updateAuthUI,
        showSignInModal: window.showSignInModal,
        showSignUpModal: window.showSignUpModal,
        signOut: window.signOut
    };
    
    // Re-assign if they were overwritten
    Object.entries(protectedFunctions).forEach(([name, func]) => {
        if (window[name] !== func) {
            console.log(`🛡️ Restoring protected function: ${name}`);
            window[name] = func;
        }
    });
    
}, 2000);

console.log('🚀 Comprehensive authentication fix loaded successfully!');
