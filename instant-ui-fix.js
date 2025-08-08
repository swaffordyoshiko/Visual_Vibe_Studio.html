// INSTANT UI FIX - Copy this entire script and paste into browser console
// This will immediately show the hidden Edit Profile, My Orders, Sign Out buttons

console.log('⚡ INSTANT UI FIX: Showing hidden signed-in buttons...');

// STEP 1: Force show signed-in UI elements immediately
const signedInState = document.getElementById('signedInState');
const mobileSignedInState = document.getElementById('mobileSignedInState');
const welcomeBanner = document.getElementById('welcomeBanner');

if (signedInState) {
    signedInState.classList.remove('hidden');
    signedInState.style.display = 'flex';
    signedInState.style.visibility = 'visible';
    signedInState.style.opacity = '1';
    console.log('✅ Desktop signed-in buttons: NOW VISIBLE');
} else {
    console.warn('⚠️ signedInState element not found');
}

if (mobileSignedInState) {
    mobileSignedInState.classList.remove('hidden');
    mobileSignedInState.style.display = 'block';
    mobileSignedInState.style.visibility = 'visible';
    mobileSignedInState.style.opacity = '1';
    console.log('✅ Mobile signed-in buttons: NOW VISIBLE');
} else {
    console.warn('⚠️ mobileSignedInState element not found');
}

if (welcomeBanner) {
    welcomeBanner.classList.remove('hidden');
    welcomeBanner.style.display = 'block';
    welcomeBanner.style.visibility = 'visible';
    welcomeBanner.style.opacity = '1';
    console.log('✅ Welcome banner: NOW VISIBLE');
}

// STEP 2: Hide signed-out elements
const signedOutState = document.getElementById('signedOutState');
const mobileSignedOutState = document.getElementById('mobileSignedOutState');

if (signedOutState) {
    signedOutState.classList.add('hidden');
    signedOutState.style.display = 'none';
    signedOutState.style.visibility = 'hidden';
    console.log('🔒 Desktop signed-out buttons: HIDDEN');
}

if (mobileSignedOutState) {
    mobileSignedOutState.classList.add('hidden');
    mobileSignedOutState.style.display = 'none';
    mobileSignedOutState.style.visibility = 'hidden';
    console.log('🔒 Mobile signed-out buttons: HIDDEN');
}

// STEP 3: Create test user if none exists
let users = [];
try {
    users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
} catch (e) {
    users = [];
}

if (users.length === 0) {
    console.log('📝 Creating test user for sign-in testing...');
    const testUser = {
        id: 'instant_test_' + Date.now(),
        name: 'Test User',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'test123',
        createdAt: new Date().toISOString()
    };
    
    users.push(testUser);
    localStorage.setItem('visualVibeUsers', JSON.stringify(users));
    console.log('✅ Test user created: test@example.com / test123');
}

// STEP 4: Fix sign-in button functionality
const signInButtons = document.querySelectorAll('button[onclick*="openSignInModal"]');
signInButtons.forEach((button, index) => {
    button.onclick = function(e) {
        e.preventDefault();
        console.log(`🔘 Sign-in button ${index + 1} clicked (instant fix)`);
        
        const modal = document.getElementById('signInModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
            modal.style.opacity = '1';
            modal.style.visibility = 'visible';
            modal.style.zIndex = '9999';
            
            const emailInput = document.getElementById('signInEmail');
            if (emailInput) {
                setTimeout(() => emailInput.focus(), 100);
            }
            
            console.log('✅ Sign-in modal opened');
        }
    };
});

// STEP 5: Fix sign-in form submission
const signInForm = document.getElementById('signInForm');
if (signInForm) {
    signInForm.onsubmit = function(e) {
        e.preventDefault();
        console.log('🔑 Processing sign-in (instant fix)...');
        
        const emailInput = document.getElementById('signInEmail');
        const passwordInput = document.getElementById('signInPassword');
        
        if (!emailInput || !passwordInput) {
            alert('Form not found. Please refresh the page.');
            return;
        }
        
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value.trim();
        
        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }
        
        // Get users
        let users = [];
        try {
            users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        } catch (e) {
            users = [];
        }
        
        // Find user
        const user = users.find(u => u && u.email && u.email.toLowerCase() === email);
        
        if (!user) {
            alert(`No account found with email: ${email}\nTry test@example.com with password test123`);
            return;
        }
        
        if (user.password !== password) {
            alert('Incorrect password. Please try again.');
            return;
        }
        
        // Success! Create session
        const sessionUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            loginTime: new Date().toISOString()
        };
        
        window.currentUser = sessionUser;
        localStorage.setItem('visualVibeUser', JSON.stringify(sessionUser));
        localStorage.setItem('currentUser', JSON.stringify(sessionUser));
        
        // Close modal
        const modal = document.getElementById('signInModal');
        if (modal) {
            modal.classList.add('hidden');
            modal.style.display = 'none';
        }
        signInForm.reset();
        
        // Show signed-in UI
        if (signedInState) {
            signedInState.classList.remove('hidden');
            signedInState.style.display = 'flex';
            signedInState.style.visibility = 'visible';
        }
        if (mobileSignedInState) {
            mobileSignedInState.classList.remove('hidden');
            mobileSignedInState.style.display = 'block';
            mobileSignedInState.style.visibility = 'visible';
        }
        if (welcomeBanner) {
            welcomeBanner.classList.remove('hidden');
            welcomeBanner.style.display = 'block';
            welcomeBanner.style.visibility = 'visible';
        }
        
        alert(`Welcome back, ${user.name}!`);
        console.log('✅ Sign-in successful! UI updated to show signed-in buttons.');
    };
    
    console.log('✅ Sign-in form handler fixed');
}

console.log('⚡ INSTANT UI FIX COMPLETE!');
console.log('🎉 Edit Profile, My Orders, and Sign Out buttons should now be VISIBLE!');
console.log('🔑 Test sign-in with: test@example.com / test123');

// Make this function available for re-running
window.instantUIFix = function() {
    console.log('🔄 Re-running instant UI fix...');
    // Re-run the main logic
    if (signedInState) {
        signedInState.classList.remove('hidden');
        signedInState.style.display = 'flex';
        signedInState.style.visibility = 'visible';
    }
    if (mobileSignedInState) {
        mobileSignedInState.classList.remove('hidden');
        mobileSignedInState.style.display = 'block';
        mobileSignedInState.style.visibility = 'visible';
    }
    console.log('✅ Instant fix re-applied');
};

console.log('💡 Run instantUIFix() to apply again if needed');
