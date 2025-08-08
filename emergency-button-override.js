// EMERGENCY BUTTON OVERRIDE - Direct DOM manipulation
console.log('🚨 EMERGENCY: Directly fixing sign in/up buttons...');

// Define functions immediately
window.openSignInModal = function() {
    console.log('🔑 EMERGENCY: Opening sign in modal');
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
        console.log('✅ Sign in modal opened');
    } else {
        console.error('❌ Sign in modal not found!');
        alert('Sign in modal not found. The page may need to refresh.');
    }
};

window.openSignUpModal = function() {
    console.log('📝 EMERGENCY: Opening sign up modal');
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
        console.log('✅ Sign up modal opened');
    } else {
        console.error('❌ Sign up modal not found!');
        alert('Sign up modal not found. The page may need to refresh.');
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

// Basic auth functions
window.handleSignIn = function(e) {
    if (e) e.preventDefault();
    const email = document.getElementById('signInEmail')?.value?.trim();
    const password = document.getElementById('signInPassword')?.value?.trim();
    if (!email || !password) {
        alert('Please enter both email and password');
        return false;
    }
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
    localStorage.setItem('vvs_user', userData);
    window.closeSignInModal();
    alert(`Welcome back, ${user.name}!`);
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
    if (localStorage.getItem('vvs_user_' + email)) {
        alert('Account already exists with this email. Please sign in instead.');
        return false;
    }
    const userData = {name: name, email: email, password: password, createdAt: new Date().toISOString()};
    localStorage.setItem('vvs_user_' + email, JSON.stringify(userData));
    localStorage.setItem('vvs_user', JSON.stringify(userData));
    window.closeSignUpModal();
    alert(`Welcome to Visual Vibe Studio, ${name}!`);
    return false;
};

window.signOut = function() {
    localStorage.removeItem('vvs_user');
    alert('You have been signed out');
};

// Make functions immutable
Object.defineProperty(window, 'openSignInModal', {
    value: window.openSignInModal,
    writable: false,
    configurable: false
});

Object.defineProperty(window, 'openSignUpModal', {
    value: window.openSignUpModal,
    writable: false,
    configurable: false
});

console.log('✅ EMERGENCY: Functions locked and loaded!');
console.log('openSignInModal:', typeof window.openSignInModal);
console.log('openSignUpModal:', typeof window.openSignUpModal);

// Attach form handlers
setTimeout(() => {
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
}, 100);
