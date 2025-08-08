// AUTHENTICATION SYSTEM TEST
(function() {
    'use strict';
    
    console.log('🧪 AUTH SYSTEM TEST - STARTING...');
    
    // Wait for final auth override to load
    setTimeout(() => {
        console.log('🧪 RUNNING AUTHENTICATION TESTS...');
        
        // Test 1: Check if auth functions exist
        console.log('=== TEST 1: AUTH FUNCTIONS ===');
        const requiredFunctions = ['handleSignIn', 'handleSignUp', 'signOut', 'updateAuthUI'];
        requiredFunctions.forEach(fn => {
            const exists = typeof window[fn] === 'function';
            console.log(`${fn}: ${exists ? '✅' : '❌'}`);
        });
        
        // Test 2: Check for users in storage
        console.log('=== TEST 2: USER STORAGE ===');
        try {
            const users1 = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
            const users2 = JSON.parse(localStorage.getItem('visualVibeUsers_v3') || '[]');
            console.log(`visualVibeUsers: ${users1.length} users`);
            console.log(`visualVibeUsers_v3: ${users2.length} users`);
            
            if (users1.length === 0 && users2.length === 0) {
                console.log('⚠️ NO USERS FOUND - Creating test user...');
                
                if (typeof window.createDebugUser === 'function') {
                    window.createDebugUser();
                    console.log('✅ Test user created: debug@test.com / debug123');
                } else {
                    // Create manually
                    const testUser = {
                        id: 'test-user-' + Date.now(),
                        name: 'Test User',
                        firstName: 'Test',
                        lastName: 'User',
                        email: 'test@test.com',
                        password: 'test123',
                        orders: [],
                        reviews: [],
                        createdAt: new Date().toISOString()
                    };
                    
                    localStorage.setItem('visualVibeUsers', JSON.stringify([testUser]));
                    localStorage.setItem('visualVibeUsers_v3', JSON.stringify([testUser]));
                    console.log('✅ Manual test user created: test@test.com / test123');
                }
            } else {
                console.log('✅ Users found in storage');
                const allUsers = [...new Set([...users1, ...users2])];
                allUsers.forEach(user => {
                    console.log(`  - ${user.name} (${user.email})`);
                });
            }
        } catch (error) {
            console.error('❌ Error checking user storage:', error);
        }
        
        // Test 3: Check current session
        console.log('=== TEST 3: CURRENT SESSION ===');
        try {
            const session = localStorage.getItem('visualVibeUser');
            if (session) {
                const user = JSON.parse(session);
                console.log(`✅ Active session: ${user.name} (${user.email})`);
                console.log('Current user object:', window.currentUser);
            } else {
                console.log('ℹ️ No active session (normal if not signed in)');
            }
        } catch (error) {
            console.error('❌ Error checking session:', error);
        }
        
        // Test 4: Check UI state
        console.log('=== TEST 4: UI STATE ===');
        const signedInState = document.getElementById('signedInState');
        const signedOutState = document.getElementById('signedOutState');
        
        if (signedInState) {
            const isVisible = signedInState.style.display !== 'none';
            console.log(`signedInState visible: ${isVisible ? '✅' : '❌'}`);
        }
        
        if (signedOutState) {
            const isVisible = signedOutState.style.display !== 'none';
            console.log(`signedOutState visible: ${isVisible ? '✅' : '❌'}`);
        }
        
        console.log('🧪 AUTHENTICATION TESTS COMPLETE');
        console.log('💡 To test sign-in, use: debugFinalAuth() in console');
        
    }, 12000); // Wait for final auth override to load
    
})();
