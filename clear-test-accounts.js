// CLEAR ALL TEST ACCOUNTS
console.log('🧹 Clearing all test sign-in accounts...');

(function() {
    try {
        // Clear all user accounts
        localStorage.removeItem('visualVibeUsers');
        console.log('✅ Cleared all user accounts from visualVibeUsers');
        
        // Clear current session
        localStorage.removeItem('visualVibeUser');
        console.log('✅ Cleared current user session');
        
        // Clear any other auth-related data
        const authKeys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (
                key.startsWith('user_') ||
                key.startsWith('profile_backup_') ||
                key.includes('auth') ||
                key.includes('session') ||
                key.includes('login')
            )) {
                authKeys.push(key);
            }
        }
        
        // Remove auth-related keys
        authKeys.forEach(key => {
            localStorage.removeItem(key);
            console.log(`✅ Cleared ${key}`);
        });
        
        // Clear global user variable
        window.currentUser = null;
        console.log('✅ Cleared global currentUser');
        
        // Update UI to signed-out state
        function updateUIToSignedOut() {
            try {
                const signedOutState = document.getElementById('signedOutState');
                const signedInState = document.getElementById('signedInState');
                const mobileSignedOutState = document.getElementById('mobileSignedOutState');
                const mobileSignedInState = document.getElementById('mobileSignedInState');
                const welcomeBanner = document.getElementById('welcomeBanner');
                
                // Show signed out state
                if (signedOutState) {
                    signedOutState.style.display = 'flex';
                    signedOutState.style.visibility = 'visible';
                    signedOutState.style.position = 'static';
                    signedOutState.style.left = 'auto';
                }
                
                // Hide signed in state
                if (signedInState) {
                    signedInState.classList.add('hidden');
                    signedInState.style.display = 'none';
                    signedInState.style.visibility = 'hidden';
                    signedInState.style.position = 'absolute';
                    signedInState.style.left = '-9999px';
                }
                
                // Show mobile signed out state
                if (mobileSignedOutState) {
                    mobileSignedOutState.style.display = 'block';
                    mobileSignedOutState.style.visibility = 'visible';
                    mobileSignedOutState.style.position = 'static';
                    mobileSignedOutState.style.left = 'auto';
                }
                
                // Hide mobile signed in state
                if (mobileSignedInState) {
                    mobileSignedInState.classList.add('hidden');
                    mobileSignedInState.style.display = 'none';
                    mobileSignedInState.style.visibility = 'hidden';
                    mobileSignedInState.style.position = 'absolute';
                    mobileSignedInState.style.left = '-9999px';
                }
                
                // Hide welcome banner
                if (welcomeBanner) {
                    welcomeBanner.classList.add('hidden');
                }
                
                console.log('✅ UI updated to signed-out state');
            } catch (error) {
                console.error('❌ Error updating UI:', error);
            }
        }
        
        updateUIToSignedOut();
        
        // Clear any user name displays
        const userNameElements = document.querySelectorAll('#userName, [id*="userName"], [class*="userName"]');
        userNameElements.forEach(element => {
            element.textContent = '';
        });
        
        console.log('🎉 All test accounts cleared successfully!');
        console.log('📊 Storage status:');
        console.log('  - visualVibeUsers:', localStorage.getItem('visualVibeUsers'));
        console.log('  - visualVibeUser:', localStorage.getItem('visualVibeUser'));
        console.log('  - currentUser:', window.currentUser);
        
        alert('✅ All test sign-in accounts have been cleared!\n\nThe page is now in a clean signed-out state.');
        
    } catch (error) {
        console.error('❌ Error clearing test accounts:', error);
        alert('❌ Error clearing test accounts. Check console for details.');
    }
})();
