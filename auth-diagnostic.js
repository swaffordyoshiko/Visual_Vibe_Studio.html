// 🔍 AUTHENTICATION DIAGNOSTIC SCRIPT
// This script will help us understand what's going wrong

console.log('🔍 AUTHENTICATION DIAGNOSTIC STARTING...');

// Check 1: What auth functions exist?
console.log('=== AUTH FUNCTIONS CHECK ===');
const authFunctions = ['handleSignIn', 'handleSignUp', 'showSignInModal', 'showSignUpModal', 'updateAuthUI', 'signOut'];
authFunctions.forEach(funcName => {
    const exists = typeof window[funcName] === 'function';
    console.log(`${exists ? '✅' : '❌'} ${funcName}: ${exists ? 'EXISTS' : 'MISSING'}`);
});

// Check 2: What's in localStorage?
console.log('\n=== STORAGE CHECK ===');
const storageKeys = ['vvs_user', 'visualVibeUser', 'visualVibeUsers', 'currentUser'];
storageKeys.forEach(key => {
    const data = localStorage.getItem(key);
    if (data) {
        try {
            const parsed = JSON.parse(data);
            console.log(`✅ ${key}:`, parsed);
        } catch (e) {
            console.log(`❌ ${key}: INVALID JSON - ${data}`);
        }
    } else {
        console.log(`ℹ️ ${key}: EMPTY`);
    }
});

// Check 3: What's window.currentUser?
console.log('\n=== CURRENT USER CHECK ===');
console.log('window.currentUser:', window.currentUser);

// Check 4: UI Elements status
console.log('\n=== UI ELEMENTS CHECK ===');
const uiElements = {
    'signInModal': document.getElementById('signInModal'),
    'signUpModal': document.getElementById('signUpModal'),
    'signedInState': document.getElementById('signedInState'),
    'signedOutState': document.getElementById('signedOutState'),
    'mobileSignedInState': document.getElementById('mobileSignedInState'),
    'mobileSignedOutState': document.getElementById('mobileSignedOutState'),
    'userWelcome': document.getElementById('userWelcome')
};

Object.entries(uiElements).forEach(([name, element]) => {
    if (element) {
        const style = window.getComputedStyle(element);
        console.log(`✅ ${name}: FOUND - display: ${style.display}, visibility: ${style.visibility}`);
    } else {
        console.log(`❌ ${name}: NOT FOUND`);
    }
});

// Check 5: Test a simple sign in flow
console.log('\n=== TESTING SIGN IN FLOW ===');

// Create a test user first
const testUser = {
    id: 'test123',
    name: 'Test User',
    email: 'test@test.com',
    password: 'password123',
    createdAt: new Date().toISOString()
};

// Save test user to all storage locations
localStorage.setItem('vvs_user_test@test.com', JSON.stringify(testUser));
localStorage.setItem('user_test@test.com', JSON.stringify(testUser));

let users = [];
try {
    users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
} catch (e) {
    console.warn('Invalid users array, creating new one');
}

// Remove existing test user
users = users.filter(u => u.email !== 'test@test.com');
users.push(testUser);
localStorage.setItem('visualVibeUsers', JSON.stringify(users));

console.log('✅ Test user created: test@test.com / password123');

// Check 6: Form elements
console.log('\n=== FORM ELEMENTS CHECK ===');
const formElements = {
    'signInForm': document.getElementById('signInForm'),
    'signUpForm': document.getElementById('signUpForm'),
    'signInEmail': document.getElementById('signInEmail'),
    'signInPassword': document.getElementById('signInPassword'),
    'signUpName': document.getElementById('signUpName'),
    'signUpEmail': document.getElementById('signUpEmail'),
    'signUpPassword': document.getElementById('signUpPassword'),
    'signUpConfirmPassword': document.getElementById('signUpConfirmPassword')
};

Object.entries(formElements).forEach(([name, element]) => {
    console.log(`${element ? '✅' : '❌'} ${name}: ${element ? 'FOUND' : 'NOT FOUND'}`);
});

// Check 7: Event listeners
console.log('\n=== EVENT LISTENERS CHECK ===');
const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');

if (signInForm) {
    console.log('✅ Sign In Form found');
    console.log('   onsubmit:', signInForm.onsubmit);
    console.log('   addEventListener count:', signInForm.eventListeners?.length || 'unknown');
} else {
    console.log('❌ Sign In Form not found');
}

if (signUpForm) {
    console.log('✅ Sign Up Form found');
    console.log('   onsubmit:', signUpForm.onsubmit);
} else {
    console.log('❌ Sign Up Form not found');
}

// Check 8: Try to manually trigger updateAuthUI
console.log('\n=== MANUAL UI UPDATE TEST ===');
if (typeof window.updateAuthUI === 'function') {
    console.log('Testing updateAuthUI(false)...');
    window.updateAuthUI(false);
    console.log('Testing updateAuthUI(true, "Test User")...');
    window.updateAuthUI(true, 'Test User');
} else {
    console.log('❌ updateAuthUI function not available');
}

console.log('\n🔍 DIAGNOSTIC COMPLETE - Check console output above');

// Provide quick fix function
window.quickAuthFix = function() {
    console.log('🚀 APPLYING QUICK FIX...');
    
    // Force sign in the test user
    window.currentUser = testUser;
    localStorage.setItem('vvs_user', JSON.stringify(testUser));
    localStorage.setItem('currentUser', JSON.stringify(testUser));
    
    // Force update UI
    if (typeof window.updateAuthUI === 'function') {
        window.updateAuthUI(true, testUser.name);
    }
    
    console.log('✅ Quick fix applied - you should now see signed in state');
    alert('Quick fix applied! Check if you see the signed-in state now.');
};

console.log('💡 TIP: Run window.quickAuthFix() to test if the UI updates work');
