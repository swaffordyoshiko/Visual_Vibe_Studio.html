// COMPLETE CLEANUP - Remove all hardcoded test users and disable test scripts
console.log('🧹 COMPLETE CLEANUP: Removing all test users and disabling test scripts...');

(function() {
    try {
        // STEP 1: Clear ALL localStorage data
        console.log('🧹 Step 1: Clearing all localStorage data...');
        
        // Get all keys first (since removing items while iterating can cause issues)
        const allKeys = [];
        for (let i = 0; i < localStorage.length; i++) {
            allKeys.push(localStorage.key(i));
        }
        
        // Remove all keys that might contain user data
        allKeys.forEach(key => {
            if (key && (
                key.includes('visualVibe') ||
                key.includes('user') ||
                key.includes('User') ||
                key.includes('auth') ||
                key.includes('Auth') ||
                key.includes('session') ||
                key.includes('Session') ||
                key.includes('login') ||
                key.includes('profile') ||
                key.includes('Profile') ||
                key.startsWith('user_') ||
                key.startsWith('profile_')
            )) {
                localStorage.removeItem(key);
                console.log(`✅ Removed: ${key}`);
            }
        });
        
        // STEP 2: Force clear specific user storage keys
        console.log('🧹 Step 2: Force clearing specific storage keys...');
        const specificKeys = [
            'visualVibeUsers',
            'visualVibeUser', 
            'users',
            'currentUser',
            'sessionUser',
            'authUser',
            'loggedInUser'
        ];
        
        specificKeys.forEach(key => {
            localStorage.removeItem(key);
            sessionStorage.removeItem(key);
            console.log(`✅ Force cleared: ${key}`);
        });
        
        // STEP 3: Clear global variables
        console.log('🧹 Step 3: Clearing global variables...');
        window.currentUser = null;
        window.sessionUser = null;
        window.authUser = null;
        window.loggedInUser = null;
        
        // STEP 4: Disable test user creation functions
        console.log('🧹 Step 4: Disabling test user creation functions...');
        window.createTestUser = function() {
            console.log('🚫 Test user creation disabled');
            return false;
        };
        
        window.createTestUsers = function() {
            console.log('🚫 Test users creation disabled');
            return false;
        };
        
        window.testBulletproofSignup = function() {
            console.log('🚫 Test signup disabled');
            return false;
        };
        
        // STEP 5: Override any functions that might auto-create test users
        console.log('🧹 Step 5: Overriding auto-test-creation functions...');
        
        // Disable BulletproofAuth test creation
        if (window.BulletproofAuth) {
            const originalSignUp = window.BulletproofAuth.signUp;
            window.BulletproofAuth.signUp = function(name, email, password, confirm) {
                // Block test emails
                const testEmails = ['john@test.com', 'jane@test.com', 'bob@test.com', 'test@example.com'];
                if (testEmails.includes(email?.toLowerCase())) {
                    console.log('🚫 Blocked test user creation:', email);
                    return {success: false, message: 'Test user creation disabled'};
                }
                return originalSignUp.call(this, name, email, password, confirm);
            };
        }
        
        // STEP 6: Reset all arrays that might contain users
        console.log('🧹 Step 6: Resetting user arrays...');
        localStorage.setItem('visualVibeUsers', '[]');
        
        // STEP 7: Force update UI to signed-out state
        console.log('🧹 Step 7: Updating UI to signed-out state...');
        function forceSignedOutUI() {
            try {
                // Desktop elements
                const signedOutState = document.getElementById('signedOutState');
                const signedInState = document.getElementById('signedInState');
                const userName = document.getElementById('userName');
                
                // Mobile elements
                const mobileSignedOutState = document.getElementById('mobileSignedOutState');
                const mobileSignedInState = document.getElementById('mobileSignedInState');
                
                // Other elements
                const welcomeBanner = document.getElementById('welcomeBanner');
                const welcomeMessage = document.getElementById('welcomeMessage');
                
                // Force show signed-out state
                if (signedOutState) {
                    signedOutState.style.display = 'flex';
                    signedOutState.style.visibility = 'visible';
                    signedOutState.style.position = 'static';
                    signedOutState.style.left = 'auto';
                    signedOutState.classList.remove('hidden');
                }
                
                // Force hide signed-in state
                if (signedInState) {
                    signedInState.style.display = 'none';
                    signedInState.style.visibility = 'hidden';
                    signedInState.style.position = 'absolute';
                    signedInState.style.left = '-99999px';
                    signedInState.classList.add('hidden');
                }
                
                // Mobile states
                if (mobileSignedOutState) {
                    mobileSignedOutState.style.display = 'block';
                    mobileSignedOutState.style.visibility = 'visible';
                    mobileSignedOutState.classList.remove('hidden');
                }
                
                if (mobileSignedInState) {
                    mobileSignedInState.style.display = 'none';
                    mobileSignedInState.style.visibility = 'hidden';
                    mobileSignedInState.classList.add('hidden');
                }
                
                // Clear user name displays
                if (userName) userName.textContent = '';
                
                // Hide welcome elements
                if (welcomeBanner) welcomeBanner.classList.add('hidden');
                if (welcomeMessage) welcomeMessage.textContent = '';
                
                // Clear any other user name elements
                document.querySelectorAll('[id*="userName"], [class*="userName"], [id*="userDisplay"]').forEach(el => {
                    el.textContent = '';
                });
                
                console.log('✅ UI forced to signed-out state');
            } catch (error) {
                console.error('❌ Error updating UI:', error);
            }
        }
        
        forceSignedOutUI();
        
        // STEP 8: Clear any cached authentication states
        console.log('🧹 Step 8: Clearing authentication states...');
        
        // Clear cookies that might contain auth data
        document.cookie.split(";").forEach(function(c) { 
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
        });
        
        // STEP 9: Log final state
        console.log('🧹 Step 9: Verifying cleanup...');
        console.log('📊 Final storage state:');
        console.log('  - visualVibeUsers:', JSON.parse(localStorage.getItem('visualVibeUsers') || '[]'));
        console.log('  - visualVibeUser:', localStorage.getItem('visualVibeUser'));
        console.log('  - window.currentUser:', window.currentUser);
        console.log('  - Total localStorage items:', localStorage.length);
        
        // STEP 10: Create a function to prevent future test user pollution
        console.log('🧹 Step 10: Installing protection against test user creation...');
        
        // Override handleSignUp to block test emails
        const originalHandleSignUp = window.handleSignUp;
        window.handleSignUp = function(event) {
            if (event) event.preventDefault();
            
            const email = document.getElementById('signUpEmail')?.value?.trim()?.toLowerCase();
            const testEmails = ['john@test.com', 'jane@test.com', 'bob@test.com', 'test@example.com'];
            
            if (testEmails.includes(email)) {
                alert('🚫 Test email addresses are blocked. Please use a real email address.');
                return false;
            }
            
            // Call original function if not a test email
            if (originalHandleSignUp) {
                return originalHandleSignUp.call(this, event);
            }
            
            return false;
        };
        
        console.log('🎉 COMPLETE CLEANUP FINISHED!');
        console.log('✅ All test users removed');
        console.log('✅ Test user creation disabled');
        console.log('✅ UI reset to signed-out state');
        console.log('✅ Protection installed against future test users');
        
        alert('🎉 COMPLETE CLEANUP FINISHED!\n\n✅ All test users removed\n✅ All test accounts cleared\n✅ Page reset to clean state\n\nThe authentication system is now clean and ready for real users.');
        
    } catch (error) {
        console.error('❌ Error during complete cleanup:', error);
        alert('❌ Error during cleanup. Check console for details.');
    }
})();
