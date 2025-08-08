// ==========================================
// INSTANT FIX - Direct button functionality
// ==========================================

console.log('🔧 INSTANT FIX: Injecting working button functions...');

// Define working modal functions immediately
window.openSignInModal = function() {
    console.log('🔑 Opening sign in modal...');
    const modal = document.getElementById('signInModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.zIndex = '99999';
        modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modal.classList.remove('hidden');
        
        // Clear form
        const emailInput = document.getElementById('signInEmail');
        const passwordInput = document.getElementById('signInPassword');
        if (emailInput) emailInput.value = '';
        if (passwordInput) passwordInput.value = '';
        
        console.log('✅ Sign in modal opened');
    } else {
        alert('Sign in modal not found on page. The modal may need to be added to the HTML.');
        console.error('❌ Sign in modal element not found');
    }
};

window.openSignUpModal = function() {
    console.log('📝 Opening sign up modal...');
    const modal = document.getElementById('signUpModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.zIndex = '99999';
        modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modal.classList.remove('hidden');
        
        // Clear form
        const nameInput = document.getElementById('signUpName');
        const emailInput = document.getElementById('signUpEmail');
        const passwordInput = document.getElementById('signUpPassword');
        const confirmInput = document.getElementById('signUpConfirmPassword');
        
        if (nameInput) nameInput.value = '';
        if (emailInput) emailInput.value = '';
        if (passwordInput) passwordInput.value = '';
        if (confirmInput) confirmInput.value = '';
        
        console.log('✅ Sign up modal opened');
    } else {
        alert('Sign up modal not found on page. The modal may need to be added to the HTML.');
        console.error('❌ Sign up modal element not found');
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
    setTimeout(() => window.openSignUpModal(), 100);
};

window.switchToSignIn = function() {
    window.closeSignUpModal();
    setTimeout(() => window.openSignInModal(), 100);
};

// Simple authentication
window.handleSignIn = function(e) {
    if (e) e.preventDefault();
    
    const email = document.getElementById('signInEmail')?.value?.trim();
    const password = document.getElementById('signInPassword')?.value?.trim();
    
    if (!email || !password) {
        alert('Please enter both email and password');
        return false;
    }
    
    // Check for user
    const userData = localStorage.getItem('vvs_user_' + email);
    if (!userData) {
        alert('No account found with this email. Please sign up first.');
        return false;
    }
    
    const user = JSON.parse(userData);
    if (user.password !== password) {
        alert('Incorrect password');
        return false;
    }
    
    // Success
    localStorage.setItem('vvs_user', userData);
    window.closeSignInModal();
    alert(`Welcome back, ${user.name}!`);
    updateAuthUI(true);
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
    
    // Check if user exists
    if (localStorage.getItem('vvs_user_' + email)) {
        alert('Account already exists with this email. Please sign in instead.');
        return false;
    }
    
    // Create user
    const userData = {
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('vvs_user_' + email, JSON.stringify(userData));
    localStorage.setItem('vvs_user', JSON.stringify(userData));
    window.closeSignUpModal();
    alert(`Welcome to Visual Vibe Studio, ${name}!`);
    updateAuthUI(true);
    return false;
};

window.signOut = function() {
    localStorage.removeItem('vvs_user');
    alert('You have been signed out');
    updateAuthUI(false);
};

function updateAuthUI(isSignedIn) {
    const signedOutState = document.getElementById('signedOutState');
    const signedInState = document.getElementById('signedInState');
    const mobileSignedOutState = document.getElementById('mobileSignedOutState');
    const mobileSignedInState = document.getElementById('mobileSignedInState');
    
    if (isSignedIn) {
        if (signedOutState) signedOutState.style.display = 'none';
        if (signedInState) signedInState.style.display = 'flex';
        if (mobileSignedOutState) mobileSignedOutState.style.display = 'none';
        if (mobileSignedInState) mobileSignedInState.style.display = 'block';
    } else {
        if (signedOutState) signedOutState.style.display = 'flex';
        if (signedInState) signedInState.style.display = 'none';
        if (mobileSignedOutState) mobileSignedOutState.style.display = 'block';
        if (mobileSignedInState) mobileSignedInState.style.display = 'none';
    }
}

// Attach form handlers if forms exist
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

// Initialize
attachFormHandlers();

// Check for existing user
const currentUser = localStorage.getItem('vvs_user');
if (currentUser) {
    updateAuthUI(true);
} else {
    updateAuthUI(false);
}

console.log('✅ INSTANT FIX: Button functions are now working!');
console.log('Functions available:', {
    openSignInModal: typeof window.openSignInModal,
    openSignUpModal: typeof window.openSignUpModal,
    handleSignIn: typeof window.handleSignIn,
    handleSignUp: typeof window.handleSignUp
});
