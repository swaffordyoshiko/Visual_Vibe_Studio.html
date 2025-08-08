// DIRECT UI FIX INJECTION - Force show signed-in buttons immediately
console.log('🚨 DIRECT UI FIX: Forcing immediate UI state correction...');

(function immediateUIFix() {
    console.log('🔧 Starting immediate UI fix...');
    
    // Step 1: Check if user should be signed in
    let userSignedIn = false;
    
    // Check multiple indicators
    const currentUser = window.currentUser;
    const storedUser = localStorage.getItem('visualVibeUser') || localStorage.getItem('currentUser');
    const welcomeBanner = document.getElementById('welcomeBanner');
    
    if (currentUser || storedUser || (welcomeBanner && welcomeBanner.textContent.includes('Welcome'))) {
        userSignedIn = true;
        console.log('✅ User is signed in, forcing signed-in UI...');
    } else {
        console.log('🔓 User appears signed out');
    }
    
    // Step 2: Force UI to correct state
    if (userSignedIn) {
        // FORCE SHOW signed-in elements
        const signedInState = document.getElementById('signedInState');
        const mobileSignedInState = document.getElementById('mobileSignedInState');
        
        if (signedInState) {
            signedInState.classList.remove('hidden');
            signedInState.style.display = 'flex';
            signedInState.style.visibility = 'visible';
            signedInState.style.opacity = '1';
            console.log('✅ Forced desktop signed-in state to show');
        }
        
        if (mobileSignedInState) {
            mobileSignedInState.classList.remove('hidden');
            mobileSignedInState.style.display = 'block';
            mobileSignedInState.style.visibility = 'visible';
            mobileSignedInState.style.opacity = '1';
            console.log('✅ Forced mobile signed-in state to show');
        }
        
        // FORCE HIDE signed-out elements
        const signedOutState = document.getElementById('signedOutState');
        const mobileSignedOutState = document.getElementById('mobileSignedOutState');
        
        if (signedOutState) {
            signedOutState.classList.add('hidden');
            signedOutState.style.display = 'none';
            console.log('🔒 Hid desktop signed-out state');
        }
        
        if (mobileSignedOutState) {
            mobileSignedOutState.classList.add('hidden');
            mobileSignedOutState.style.display = 'none';
            console.log('🔒 Hid mobile signed-out state');
        }
        
        // FORCE SHOW welcome banner
        if (welcomeBanner) {
            welcomeBanner.classList.remove('hidden');
            welcomeBanner.style.display = 'block';
            welcomeBanner.style.visibility = 'visible';
            welcomeBanner.style.opacity = '1';
            console.log('✅ Forced welcome banner to show');
        }
        
    } else {
        // Show signed-out UI
        const signedOutState = document.getElementById('signedOutState');
        const mobileSignedOutState = document.getElementById('mobileSignedOutState');
        
        if (signedOutState) {
            signedOutState.classList.remove('hidden');
            signedOutState.style.display = 'flex';
        }
        
        if (mobileSignedOutState) {
            mobileSignedOutState.classList.remove('hidden');
            mobileSignedOutState.style.display = 'block';
        }
    }
    
    // Step 3: Fix sign-in button functionality
    const signInButtons = document.querySelectorAll('button[onclick*="openSignInModal"]');
    console.log(`🔘 Found ${signInButtons.length} sign-in buttons to fix`);
    
    signInButtons.forEach((button, index) => {
        button.onclick = function(e) {
            e.preventDefault();
            console.log(`🔘 Sign-in button ${index + 1} clicked (fixed)`);
            
            const modal = document.getElementById('signInModal');
            if (modal) {
                modal.style.display = 'flex';
                modal.classList.remove('hidden');
                modal.style.opacity = '1';
                modal.style.visibility = 'visible';
                modal.style.zIndex = '9999';
                
                // Focus email input
                const emailInput = document.getElementById('signInEmail');
                if (emailInput) {
                    setTimeout(() => emailInput.focus(), 100);
                }
                
                console.log('✅ Sign-in modal opened');
            } else {
                console.error('❌ Sign-in modal not found');
                alert('Sign-in form not found. Please refresh the page.');
            }
        };
        console.log(`✅ Fixed sign-in button ${index + 1}`);
    });
    
    // Step 4: Fix sign-out button functionality  
    const signOutButtons = document.querySelectorAll('button[onclick*="signOut"]');
    console.log(`🔘 Found ${signOutButtons.length} sign-out buttons to fix`);
    
    signOutButtons.forEach((button, index) => {
        button.onclick = function(e) {
            e.preventDefault();
            console.log(`🔘 Sign-out button ${index + 1} clicked`);
            
            // Clear user data
            window.currentUser = null;
            localStorage.removeItem('visualVibeUser');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('vvs_user');
            
            // Force UI to signed-out state
            const signedInState = document.getElementById('signedInState');
            const mobileSignedInState = document.getElementById('mobileSignedInState');
            const signedOutState = document.getElementById('signedOutState');
            const mobileSignedOutState = document.getElementById('mobileSignedOutState');
            const welcomeBanner = document.getElementById('welcomeBanner');
            
            if (signedInState) {
                signedInState.classList.add('hidden');
                signedInState.style.display = 'none';
            }
            if (mobileSignedInState) {
                mobileSignedInState.classList.add('hidden');
                mobileSignedInState.style.display = 'none';
            }
            if (signedOutState) {
                signedOutState.classList.remove('hidden');
                signedOutState.style.display = 'flex';
            }
            if (mobileSignedOutState) {
                mobileSignedOutState.classList.remove('hidden');
                mobileSignedOutState.style.display = 'block';
            }
            if (welcomeBanner) {
                welcomeBanner.classList.add('hidden');
                welcomeBanner.style.display = 'none';
            }
            
            alert('You have been signed out successfully.');
            console.log('✅ Sign-out completed');
        };
        console.log(`✅ Fixed sign-out button ${index + 1}`);
    });
    
    // Step 5: Fix My Orders button functionality
    const myOrdersButtons = document.querySelectorAll('button[onclick*="showOrderHistory"]');
    console.log(`🔘 Found ${myOrdersButtons.length} My Orders buttons to fix`);
    
    myOrdersButtons.forEach((button, index) => {
        button.onclick = function(e) {
            e.preventDefault();
            console.log(`🔘 My Orders button ${index + 1} clicked`);
            
            const modal = document.getElementById('orderHistoryModal');
            if (modal) {
                modal.style.display = 'flex';
                modal.classList.remove('hidden');
                modal.style.opacity = '1';
                modal.style.visibility = 'visible';
                modal.style.zIndex = '9999';
                console.log('✅ My Orders modal opened');
            } else {
                alert('My Orders feature is being loaded. Please try again in a moment.');
                console.warn('⚠️ Order history modal not found');
            }
        };
        console.log(`✅ Fixed My Orders button ${index + 1}`);
    });
    
    // Step 6: Fix Edit Profile button functionality
    const profileButtons = document.querySelectorAll('button[onclick*="openProfileModal"]');
    console.log(`🔘 Found ${profileButtons.length} Edit Profile buttons to fix`);
    
    profileButtons.forEach((button, index) => {
        button.onclick = function(e) {
            e.preventDefault();
            console.log(`🔘 Edit Profile button ${index + 1} clicked`);
            
            const modal = document.getElementById('profileModal');
            if (modal) {
                modal.style.display = 'flex';
                modal.classList.remove('hidden');
                modal.style.opacity = '1';
                modal.style.visibility = 'visible';
                modal.style.zIndex = '9999';
                console.log('✅ Profile modal opened');
            } else {
                alert('Profile editor is being loaded. Please try again in a moment.');
                console.warn('⚠️ Profile modal not found');
            }
        };
        console.log(`✅ Fixed Edit Profile button ${index + 1}`);
    });
    
    console.log('✅ DIRECT UI FIX: Complete');
    console.log('📊 Fixed elements:');
    console.log(`- ${signInButtons.length} sign-in buttons`);
    console.log(`- ${signOutButtons.length} sign-out buttons`);
    console.log(`- ${myOrdersButtons.length} My Orders buttons`);
    console.log(`- ${profileButtons.length} Edit Profile buttons`);
    
})();

// Add continuous monitoring to ensure UI stays fixed
let monitoringCount = 0;
const maxMonitoring = 20;

function monitorUIState() {
    if (monitoringCount < maxMonitoring) {
        monitoringCount++;
        
        // Check if signed-in elements are still visible
        const signedInState = document.getElementById('signedInState');
        const mobileSignedInState = document.getElementById('mobileSignedInState');
        
        if (window.currentUser || localStorage.getItem('visualVibeUser')) {
            // User should be signed in
            if (signedInState && signedInState.classList.contains('hidden')) {
                console.log('🔧 Re-fixing hidden signed-in state...');
                signedInState.classList.remove('hidden');
                signedInState.style.display = 'flex';
            }
            if (mobileSignedInState && mobileSignedInState.classList.contains('hidden')) {
                console.log('🔧 Re-fixing hidden mobile signed-in state...');
                mobileSignedInState.classList.remove('hidden');
                mobileSignedInState.style.display = 'block';
            }
        }
        
        // Schedule next check
        setTimeout(monitorUIState, 2000);
    }
}

// Start monitoring after initial fix
setTimeout(monitorUIState, 1000);

// Expose manual fix function
window.forceUIFix = function() {
    console.log('🔧 Manual UI fix triggered...');
    immediateUIFix();
};

console.log('🚨 DIRECT UI FIX INJECTION: Ready');
console.log('💡 Run forceUIFix() to manually trigger fix again');
console.log('🔍 All signed-in buttons should now be visible and functional!');
