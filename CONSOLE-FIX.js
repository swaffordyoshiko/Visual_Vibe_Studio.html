// IMMEDIATE CONSOLE FIX - Copy and paste this into browser console
console.log('🚨 IMMEDIATE AUTH FIX - Resolving conflicts...');

// Stop all intervals and timeouts that might be interfering
for (let i = 1; i < 99999; i++) window.clearInterval(i);
for (let i = 1; i < 99999; i++) window.clearTimeout(i);

// Nuclear option - clear all broken auth functions
delete window.handleSignIn;
delete window.handleSignUp;
delete window.openSignInModal;
delete window.openSignUpModal;
delete window.closeSignInModal;
delete window.closeSignUpModal;
delete window.switchToSignUp;
delete window.switchToSignIn;
delete window.signOut;
delete window.updateAuthUI;

console.log('🧹 Cleared all conflicting functions');

// WORKING AUTHENTICATION SYSTEM
window.openSignInModal = function() {
    console.log('🔑 Opening Sign In Modal');
    const modal = document.getElementById('signInModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
        modal.style.position = 'fixed';
        modal.style.zIndex = '9999';
        
        setTimeout(() => {
            const emailInput = document.getElementById('signInEmail');
            if (emailInput) emailInput.focus();
        }, 100);
    } else {
        alert('Sign in form not available');
    }
};

window.openSignUpModal = function() {
    console.log('📝 Opening Sign Up Modal');
    const modal = document.getElementById('signUpModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
        modal.style.position = 'fixed';
        modal.style.zIndex = '9999';
        
        setTimeout(() => {
            const nameInput = document.getElementById('signUpName');
            if (nameInput) nameInput.focus();
        }, 100);
    } else {
        alert('Sign up form not available');
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
    window.closeSignInModal();
    setTimeout(window.openSignUpModal, 100);
};

window.switchToSignIn = function() {
    window.closeSignUpModal();
    setTimeout(window.openSignInModal, 100);
};

window.handleSignIn = function(event) {
    if (event) event.preventDefault();
    console.log('🔑 Processing Sign In');
    
    const email = document.getElementById('signInEmail')?.value?.trim()?.toLowerCase();
    const password = document.getElementById('signInPassword')?.value?.trim();
    
    if (!email || !password) {
        alert('Please enter both email and password');
        return false;
    }
    
    try {
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        console.log(`🔍 Checking ${users.length} users for ${email}`);
        
        const user = users.find(u => 
            u.email && u.email.toLowerCase() === email && u.password === password
        );
        
        if (user) {
            console.log('✅ Sign in successful for', user.name);
            
            const sessionUser = {
                id: user.id,
                name: user.name,
                email: user.email,
                firstName: user.firstName || user.name.split(' ')[0],
                signedIn: true,
                loginTime: new Date().toISOString()
            };
            
            window.currentUser = sessionUser;
            localStorage.setItem('visualVibeUser', JSON.stringify(sessionUser));
            
            updateUI();
            window.closeSignInModal();
            alert(`Welcome back, ${sessionUser.firstName}!`);
            
        } else {
            const existingUser = users.find(u => u.email && u.email.toLowerCase() === email);
            if (existingUser) {
                alert('Incorrect password. Please try again.');
            } else {
                alert('No account found with this email. Please sign up first.');
            }
        }
    } catch (error) {
        console.error('Sign in error:', error);
        alert('Sign in failed. Please try again.');
    }
    
    return false;
};

window.handleSignUp = function(event) {
    if (event) event.preventDefault();
    console.log('📝 Processing Sign Up');
    
    const name = document.getElementById('signUpName')?.value?.trim();
    const email = document.getElementById('signUpEmail')?.value?.trim()?.toLowerCase();
    const password = document.getElementById('signUpPassword')?.value?.trim();
    const confirm = document.getElementById('signUpConfirmPassword')?.value?.trim();
    
    if (!name || !email || !password || !confirm) {
        alert('Please fill in all fields');
        return false;
    }
    
    if (password !== confirm) {
        alert('Passwords do not match');
        return false;
    }
    
    try {
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        
        const existingUser = users.find(u => u.email && u.email.toLowerCase() === email);
        if (existingUser) {
            alert('Account already exists. Please sign in instead.');
            return false;
        }
        
        const newUser = {
            id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 8),
            name: name,
            firstName: name.split(' ')[0] || '',
            lastName: name.split(' ').slice(1).join(' ') || '',
            email: email,
            password: password,
            orders: [],
            reviews: [],
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('visualVibeUsers', JSON.stringify(users));
        console.log('✅ New user created:', newUser.name);
        
        const sessionUser = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            firstName: newUser.firstName,
            signedIn: true,
            loginTime: new Date().toISOString()
        };
        
        window.currentUser = sessionUser;
        localStorage.setItem('visualVibeUser', JSON.stringify(sessionUser));
        
        updateUI();
        window.closeSignUpModal();
        alert(`Welcome, ${newUser.firstName}! Account created successfully.`);
        
    } catch (error) {
        console.error('Sign up error:', error);
        alert('Sign up failed. Please try again.');
    }
    
    return false;
};

window.signOut = function() {
    console.log('🚪 Signing out');
    window.currentUser = null;
    localStorage.removeItem('visualVibeUser');
    updateUI();
    alert('Signed out successfully');
};

function updateUI() {
    try {
        const user = window.currentUser;
        const signedOutState = document.getElementById('signedOutState');
        const signedInState = document.getElementById('signedInState');
        const userNameSpan = document.getElementById('userName');
        
        if (user) {
            // Show signed in state
            if (signedOutState) {
                signedOutState.style.display = 'none';
                signedOutState.style.visibility = 'hidden';
            }
            if (signedInState) {
                signedInState.classList.remove('hidden');
                signedInState.style.display = 'flex';
                signedInState.style.visibility = 'visible';
                signedInState.style.position = 'static';
                signedInState.style.left = 'auto';
            }
            if (userNameSpan) userNameSpan.textContent = user.name;
            
            // Show signed in buttons
            const myOrdersBtn = document.querySelector('button[onclick*="showOrderHistory"]');
            const profileBtn = document.querySelector('button[onclick*="openProfileModal"]');
            const signOutBtn = document.querySelector('button[onclick*="signOut"]');
            
            [myOrdersBtn, profileBtn, signOutBtn].forEach(btn => {
                if (btn) {
                    btn.style.display = 'flex';
                    btn.style.visibility = 'visible';
                    btn.style.position = 'static';
                    btn.style.left = 'auto';
                }
            });
            
            console.log('✅ UI updated to signed in state for', user.name);
        } else {
            // Show signed out state
            if (signedOutState) {
                signedOutState.style.display = 'flex';
                signedOutState.style.visibility = 'visible';
            }
            if (signedInState) {
                signedInState.classList.add('hidden');
                signedInState.style.display = 'none';
            }
            console.log('✅ UI updated to signed out state');
        }
    } catch (error) {
        console.error('UI update error:', error);
    }
}

window.updateAuthUI = updateUI;

// Setup form listeners
setTimeout(() => {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    
    if (signInForm) {
        signInForm.onsubmit = window.handleSignIn;
        console.log('✅ Sign in form listener attached');
    }
    
    if (signUpForm) {
        signUpForm.onsubmit = window.handleSignUp;
        console.log('✅ Sign up form listener attached');
    }
    
    // Fix button handlers
    document.querySelectorAll('button[onclick*="openSignInModal"]').forEach(btn => {
        btn.onclick = window.openSignInModal;
    });
    
    document.querySelectorAll('button[onclick*="openSignUpModal"]').forEach(btn => {
        btn.onclick = window.openSignUpModal;
    });
    
    console.log('✅ Button handlers fixed');
    
    // Clear any existing user that's causing conflicts
    const savedUser = localStorage.getItem('visualVibeUser');
    if (savedUser) {
        try {
            const user = JSON.parse(savedUser);
            if (user && user.signedIn) {
                window.currentUser = user;
                updateUI();
                console.log('🔄 Session restored for', user.name);
            }
        } catch (error) {
            console.log('🔄 Clearing corrupted session');
            localStorage.removeItem('visualVibeUser');
            window.currentUser = null;
            updateUI();
        }
    }
    
}, 500);

console.log('🔥 IMMEDIATE AUTH FIX COMPLETE!');
console.log('📊 Available functions:', {
    openSignInModal: typeof window.openSignInModal,
    openSignUpModal: typeof window.openSignUpModal,
    handleSignIn: typeof window.handleSignIn,
    handleSignUp: typeof window.handleSignUp
});
console.log('✅ Try clicking the Sign In or Sign Up buttons now!');
