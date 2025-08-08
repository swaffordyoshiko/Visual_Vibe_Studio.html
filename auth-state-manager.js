// AUTHENTICATION STATE MANAGER - FORCE CORRECT DISPLAY
(function() {
    'use strict';
    
    console.log('🔐 AUTH STATE MANAGER - STARTING...');
    
    function manageAuthState() {
        try {
            // Check if user is actually signed in
            const isSignedIn = window.currentUser && window.currentUser.email;
            
            const signedInState = document.getElementById('signedInState');
            const signedOutState = document.getElementById('signedOutState');
            
            if (isSignedIn) {
                // User is signed in - show signed in elements
                if (signedInState) {
                    signedInState.style.display = 'flex';
                    signedInState.style.visibility = 'visible';
                    
                    // Show all child elements
                    const childElements = signedInState.querySelectorAll('*');
                    childElements.forEach(child => {
                        child.style.display = '';
                        child.style.visibility = 'visible';
                    });
                }
                
                if (signedOutState) {
                    signedOutState.style.display = 'none';
                    signedOutState.style.visibility = 'hidden';
                }
                
                console.log('✅ User signed in - showing signed in elements');
                
            } else {
                // User is NOT signed in - hide signed in elements
                if (signedInState) {
                    signedInState.style.display = 'none';
                    signedInState.style.visibility = 'hidden';
                    
                    // Hide all child elements specifically
                    const childElements = signedInState.querySelectorAll('*');
                    childElements.forEach(child => {
                        child.style.display = 'none';
                        child.style.visibility = 'hidden';
                    });
                    
                    // Hide specific elements by their onclick handlers
                    const profileButtons = document.querySelectorAll('[onclick*="openProfileModal"]');
                    const orderButtons = document.querySelectorAll('[onclick*="showOrderHistory"]');
                    const signOutButtons = document.querySelectorAll('[onclick*="signOut"]');
                    
                    [...profileButtons, ...orderButtons, ...signOutButtons].forEach(btn => {
                        btn.style.display = 'none';
                        btn.style.visibility = 'hidden';
                    });
                }
                
                if (signedOutState) {
                    signedOutState.style.display = 'flex';
                    signedOutState.style.visibility = 'visible';
                }
                
                console.log('✅ User NOT signed in - hiding signed in elements');
            }
            
        } catch (error) {
            console.error('❌ Auth state management error:', error);
        }
    }
    
    // Run immediately
    manageAuthState();
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', manageAuthState);
    } else {
        setTimeout(manageAuthState, 100);
    }
    
    // Run periodically to maintain correct state
    setInterval(manageAuthState, 2000);
    
    // Listen for auth state changes
    window.addEventListener('user-signed-in', manageAuthState);
    window.addEventListener('user-signed-out', manageAuthState);
    
    // Override the updateAuthUI function to ensure it calls our manager
    const originalUpdateAuthUI = window.updateAuthUI;
    window.updateAuthUI = function() {
        if (originalUpdateAuthUI) {
            originalUpdateAuthUI();
        }
        setTimeout(manageAuthState, 100);
    };
    
    console.log('🔐 AUTH STATE MANAGER - ACTIVE');
})();
