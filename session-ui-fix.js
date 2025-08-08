// SESSION UI FIX - Update UI when active session is detected
(function() {
    console.log('🔧 SESSION UI FIX: Starting...');
    
    function updateUIForActiveSession() {
        console.log('🔍 Checking for active session...');
        
        // Check for session in localStorage
        let currentUser = null;
        try {
            const savedUser = localStorage.getItem('visualVibeUser');
            if (savedUser) {
                currentUser = JSON.parse(savedUser);
                console.log('✅ Found saved user session:', currentUser);
            }
        } catch (error) {
            console.log('❌ Error reading session:', error);
        }
        
        // Also check if there's a global currentUser
        if (!currentUser && window.currentUser) {
            currentUser = window.currentUser;
            console.log('✅ Found global currentUser:', currentUser);
        }
        
        if (currentUser && currentUser.signedIn) {
            console.log('🎯 Active session found, updating UI for:', currentUser.name);
            
            // Get UI elements
            const signedOutState = document.getElementById('signedOutState');
            const signedInState = document.getElementById('signedInState');
            const mobileSignedOutState = document.getElementById('mobileSignedOutState');
            const mobileSignedInState = document.getElementById('mobileSignedInState');
            const userNameSpan = document.getElementById('userName');
            
            console.log('🔍 UI Elements found:', {
                signedOutState: !!signedOutState,
                signedInState: !!signedInState,
                mobileSignedOutState: !!mobileSignedOutState,
                mobileSignedInState: !!mobileSignedInState,
                userNameSpan: !!userNameSpan
            });
            
            // Update to signed-in state
            if (signedOutState) {
                signedOutState.style.display = 'none';
                signedOutState.style.visibility = 'hidden';
                signedOutState.style.position = 'absolute';
                signedOutState.style.left = '-9999px';
                console.log('✅ Hidden signedOutState');
            }
            
            if (signedInState) {
                signedInState.classList.remove('hidden');
                signedInState.style.display = 'flex';
                signedInState.style.visibility = 'visible';
                signedInState.style.position = 'static';
                signedInState.style.left = 'auto';
                console.log('✅ Shown signedInState');
            }
            
            if (mobileSignedOutState) {
                mobileSignedOutState.style.display = 'none';
                mobileSignedOutState.style.visibility = 'hidden';
                mobileSignedOutState.style.position = 'absolute';
                mobileSignedOutState.style.left = '-9999px';
                console.log('✅ Hidden mobileSignedOutState');
            }
            
            if (mobileSignedInState) {
                mobileSignedInState.classList.remove('hidden');
                mobileSignedInState.style.display = 'block';
                mobileSignedInState.style.visibility = 'visible';
                mobileSignedInState.style.position = 'static';
                mobileSignedInState.style.left = 'auto';
                console.log('✅ Shown mobileSignedInState');
            }
            
            if (userNameSpan) {
                userNameSpan.textContent = currentUser.name;
                console.log('✅ Updated userName to:', currentUser.name);
            }
            
            // Show signed-in buttons (My Orders, Edit Profile, Sign Out)
            const profileBtn = document.querySelector('button[onclick*="openProfileModal"]');
            const ordersBtn = document.querySelector('button[onclick*="showOrderHistory"]');
            const signOutBtn = document.querySelector('button[onclick*="signOut"]');
            
            [profileBtn, ordersBtn, signOutBtn].forEach((btn, index) => {
                if (btn) {
                    btn.style.display = 'flex';
                    btn.style.visibility = 'visible';
                    btn.style.position = 'static';
                    btn.style.left = 'auto';
                    console.log(`✅ Shown button ${index + 1}`);
                }
            });
            
            // Show mobile signed-in buttons
            const mobileProfileBtn = document.querySelector('#mobileSignedInState button[onclick*="openProfileModal"]');
            const mobileOrdersBtn = document.querySelector('#mobileSignedInState button[onclick*="showOrderHistory"]');
            const mobileSignOutBtn = document.querySelector('#mobileSignedInState button[onclick*="signOut"]');
            
            [mobileProfileBtn, mobileOrdersBtn, mobileSignOutBtn].forEach((btn, index) => {
                if (btn) {
                    btn.style.display = 'flex';
                    btn.style.visibility = 'visible';
                    btn.style.position = 'static';
                    btn.style.left = 'auto';
                    console.log(`✅ Shown mobile button ${index + 1}`);
                }
            });
            
            // Set global currentUser for other scripts
            window.currentUser = currentUser;
            
            // Show welcome banner if it exists
            const welcomeBanner = document.getElementById('welcomeBanner');
            const welcomeMessage = document.getElementById('welcomeMessage');
            if (welcomeBanner && welcomeMessage) {
                welcomeMessage.textContent = `Welcome back, ${currentUser.firstName || currentUser.name.split(' ')[0]}!`;
                welcomeBanner.classList.remove('hidden');
                console.log('✅ Shown welcome banner');
            }
            
            console.log('🎉 UI successfully updated for signed-in user:', currentUser.name);
            
        } else {
            console.log('❌ No active session found or user not signed in');
        }
    }
    
    // Run the fix immediately
    updateUIForActiveSession();
    
    // Also run after a short delay to ensure DOM is ready
    setTimeout(updateUIForActiveSession, 500);
    setTimeout(updateUIForActiveSession, 1000);
    
    console.log('✅ SESSION UI FIX: Complete');
})();
