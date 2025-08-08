// AUTHENTICATION VERIFICATION TEST
(function() {
    'use strict';
    
    console.log('🧪 AUTH VERIFICATION TEST - STARTING...');
    
    // Wait for bulletproof auth to load
    function waitForBulletproofAuth(callback) {
        if (window.BulletproofAuth) {
            callback();
        } else {
            setTimeout(() => waitForBulletproofAuth(callback), 500);
        }
    }
    
    waitForBulletproofAuth(() => {
        console.log('🧪 Running authentication verification...');
        
        // Test 1: Check if we can access user data
        setTimeout(() => {
            try {
                const users = window.BulletproofAuth.getUsers();
                console.log(`✅ Test 1: Found ${users.length} users in database`);
                
                if (users.length > 0) {
                    users.forEach((user, index) => {
                        console.log(`User ${index + 1}:`, {
                            name: user.name,
                            email: user.email,
                            hasPassword: !!user.password,
                            createdAt: user.createdAt
                        });
                    });
                } else {
                    console.log('⚠️ No users found. Creating test user...');
                    
                    // Create a test user for verification
                    const testResult = window.BulletproofAuth.signUp('Test User', 'test@example.com', 'test123', 'test123');
                    console.log('Test user creation result:', testResult);
                }
                
                // Test 2: Verify sign-in function
                if (users.length > 0) {
                    const firstUser = users[0];
                    console.log('🧪 Test 2: Testing sign-in with first user...');
                    
                    // Note: This is just a test, we won't actually sign in
                    const signInTest = window.BulletproofAuth.findUser(firstUser.email);
                    if (signInTest) {
                        console.log('✅ Test 2: User lookup successful');
                    } else {
                        console.log('❌ Test 2: User lookup failed');
                    }
                }
                
                // Test 3: Check current session
                const currentSession = window.BulletproofAuth.restoreSession();
                if (currentSession) {
                    console.log('✅ Test 3: Active session found for:', currentSession.name);
                } else {
                    console.log('ℹ️ Test 3: No active session (expected if not signed in)');
                }
                
                console.log('🧪 AUTH VERIFICATION COMPLETE');
                
            } catch (error) {
                console.error('❌ Auth verification error:', error);
            }
        }, 2000);
    });
    
    // Create global test functions
    window.testSignInWithUser = function(email, password) {
        if (!window.BulletproofAuth) {
            console.log('❌ Bulletproof auth not loaded yet');
            return;
        }
        
        console.log(`🧪 Testing sign-in for: ${email}`);
        const result = window.BulletproofAuth.signIn(email, password);
        console.log('Result:', result);
        
        if (result.success) {
            window.BulletproofAuth.updateUI();
        }
        
        return result;
    };
    
    window.listAllUsers = function() {
        if (!window.BulletproofAuth) {
            console.log('❌ Bulletproof auth not loaded yet');
            return;
        }
        
        const users = window.BulletproofAuth.getUsers();
        console.log(`📋 Total users: ${users.length}`);
        
        users.forEach((user, index) => {
            console.log(`${index + 1}. ${user.name} (${user.email}) - Created: ${user.createdAt}`);
        });
        
        return users;
    };
    
    window.createTestUser = function(name = 'Test User', email = 'test@example.com', password = 'test123') {
        if (!window.BulletproofAuth) {
            console.log('❌ Bulletproof auth not loaded yet');
            return;
        }
        
        console.log(`🧪 Creating test user: ${name} (${email})`);
        const result = window.BulletproofAuth.signUp(name, email, password, password);
        console.log('Result:', result);
        
        return result;
    };
    
    console.log('🧪 AUTH VERIFICATION TEST - READY');
    console.log('Available test functions: testSignInWithUser(email, password), listAllUsers(), createTestUser()');
    
})();
