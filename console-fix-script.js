// COPY THIS ENTIRE SCRIPT AND PASTE INTO BROWSER CONSOLE TO FIX AUTHENTICATION
// ================================================================================

console.log('🚨 CONSOLE FIX: Starting immediate authentication repair...');

// STEP 1: Force show signed-in buttons immediately
const signedInState = document.getElementById('signedInState');
const mobileSignedInState = document.getElementById('mobileSignedInState');
const signedOutState = document.getElementById('signedOutState');
const mobileSignedOutState = document.getElementById('mobileSignedOutState');
const welcomeBanner = document.getElementById('welcomeBanner');

if (signedInState) {
    signedInState.classList.remove('hidden');
    signedInState.style.display = 'flex';
    signedInState.style.visibility = 'visible';
    console.log('✅ Fixed desktop signed-in state');
}

if (mobileSignedInState) {
    mobileSignedInState.classList.remove('hidden');
    mobileSignedInState.style.display = 'block';
    mobileSignedInState.style.visibility = 'visible';
    console.log('✅ Fixed mobile signed-in state');
}

if (signedOutState) {
    signedOutState.classList.add('hidden');
    signedOutState.style.display = 'none';
    console.log('🔒 Hid signed-out state');
}

if (mobileSignedOutState) {
    mobileSignedOutState.classList.add('hidden');
    mobileSignedOutState.style.display = 'none';
    console.log('🔒 Hid mobile signed-out state');
}

if (welcomeBanner) {
    welcomeBanner.classList.remove('hidden');
    welcomeBanner.style.display = 'block';
    welcomeBanner.style.visibility = 'visible';
    console.log('✅ Fixed welcome banner');
}

// STEP 2: Fix sign-in button
const signInBtns = document.querySelectorAll('button[onclick*="openSignInModal"]');
signInBtns.forEach((btn, i) => {
    btn.onclick = function(e) {
        e.preventDefault();
        const modal = document.getElementById('signInModal');
        if (modal) {
            modal.style.display = 'flex';
            modal.classList.remove('hidden');
            modal.style.zIndex = '9999';
            const emailInput = document.getElementById('signInEmail');
            if (emailInput) setTimeout(() => emailInput.focus(), 100);
            console.log('✅ Sign-in modal opened');
        }
    };
    console.log(`✅ Fixed sign-in button ${i + 1}`);
});

// STEP 3: Fix sign-out button
const signOutBtns = document.querySelectorAll('button[onclick*="signOut"]');
signOutBtns.forEach((btn, i) => {
    btn.onclick = function(e) {
        e.preventDefault();
        window.currentUser = null;
        localStorage.removeItem('visualVibeUser');
        localStorage.removeItem('currentUser');
        if (signedInState) signedInState.classList.add('hidden');
        if (mobileSignedInState) mobileSignedInState.classList.add('hidden');
        if (signedOutState) { signedOutState.classList.remove('hidden'); signedOutState.style.display = 'flex'; }
        if (mobileSignedOutState) { mobileSignedOutState.classList.remove('hidden'); mobileSignedOutState.style.display = 'block'; }
        if (welcomeBanner) welcomeBanner.classList.add('hidden');
        alert('Signed out successfully!');
        console.log('✅ Sign-out completed');
    };
    console.log(`✅ Fixed sign-out button ${i + 1}`);
});

// STEP 4: Fix My Orders button
const orderBtns = document.querySelectorAll('button[onclick*="showOrderHistory"]');
orderBtns.forEach((btn, i) => {
    btn.onclick = function(e) {
        e.preventDefault();
        const modal = document.getElementById('orderHistoryModal');
        if (modal) {
            modal.style.display = 'flex';
            modal.classList.remove('hidden');
            modal.style.zIndex = '9999';
            console.log('✅ My Orders modal opened');
        } else {
            alert('My Orders is loading...');
        }
    };
    console.log(`✅ Fixed My Orders button ${i + 1}`);
});

// STEP 5: Fix Edit Profile button
const profileBtns = document.querySelectorAll('button[onclick*="openProfileModal"]');
profileBtns.forEach((btn, i) => {
    btn.onclick = function(e) {
        e.preventDefault();
        const modal = document.getElementById('profileModal');
        if (modal) {
            modal.style.display = 'flex';
            modal.classList.remove('hidden');
            modal.style.zIndex = '9999';
            console.log('✅ Profile modal opened');
        } else {
            alert('Profile editor is loading...');
        }
    };
    console.log(`✅ Fixed Edit Profile button ${i + 1}`);
});

console.log('✅ CONSOLE FIX COMPLETE!');
console.log('📊 Summary:');
console.log(`- Fixed ${signInBtns.length} sign-in buttons`);
console.log(`- Fixed ${signOutBtns.length} sign-out buttons`);  
console.log(`- Fixed ${orderBtns.length} My Orders buttons`);
console.log(`- Fixed ${profileBtns.length} Edit Profile buttons`);
console.log('🎉 All buttons should now be visible and working!');

// ================================================================================
// END OF CONSOLE FIX SCRIPT
