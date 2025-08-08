// AUTHENTICATION STATE DEBUGGER
(function() {
    'use strict';
    
    console.log('🔍 AUTHENTICATION DEBUG STARTING...');
    
    // Wait for all systems to load
    setTimeout(() => {
        console.log('=== AUTHENTICATION STATE DEBUG ===');
        
        // 1. Check current user session
        console.log('1. CURRENT SESSION:');
        const currentSession = localStorage.getItem('visualVibeUser');
        if (currentSession) {
            try {
                const user = JSON.parse(currentSession);
                console.log('✅ Active session found:', user);
                console.log('  - Name:', user.name);
                console.log('  - Email:', user.email);
                console.log('  - Signed In:', user.signedIn);
            } catch (e) {
                console.log('❌ Invalid session data:', e);
            }
        } else {
            console.log('❌ No active session found');
        }
        
        // 2. Check window.currentUser
        console.log('2. WINDOW.CURRENTUSER:');
        if (window.currentUser) {
            console.log('✅ window.currentUser exists:', window.currentUser);
        } else {
            console.log('❌ window.currentUser is null/undefined');
        }
        
        // 3. Check all users in storage
        console.log('3. ALL USERS IN STORAGE:');
        const storageKeys = ['visualVibeUsers', 'visualVibeUsers_v3', 'userDatabase'];
        let totalUsers = 0;
        
        storageKeys.forEach(key => {
            try {
                const data = localStorage.getItem(key);
                if (data) {
                    const users = JSON.parse(data);
                    if (Array.isArray(users)) {
                        totalUsers += users.length;
                        console.log(`${key}: ${users.length} users`);
                        users.forEach((user, index) => {
                            console.log(`  ${index + 1}. ${user.name} (${user.email})`);
                        });
                    }
                }
            } catch (e) {
                console.log(`${key}: Error reading data`);
            }
        });
        
        if (totalUsers === 0) {
            console.log('⚠️ NO USERS FOUND IN ANY STORAGE!');
            console.log('Creating test user...');
            
            const testUser = {
                id: 'test-user-' + Date.now(),
                name: 'Test Customer',
                firstName: 'Test',
                lastName: 'Customer',
                email: 'customer@test.com',
                password: 'customer123',
                orders: [],
                reviews: [],
                createdAt: new Date().toISOString()
            };
            
            localStorage.setItem('visualVibeUsers', JSON.stringify([testUser]));
            localStorage.setItem('visualVibeUsers_v3', JSON.stringify([testUser]));
            
            console.log('✅ Test user created: customer@test.com / customer123');
        }
        
        // 4. Check UI elements
        console.log('4. UI ELEMENTS:');
        const signedInState = document.getElementById('signedInState');
        const signedOutState = document.getElementById('signedOutState');
        
        if (signedInState) {
            const isVisible = window.getComputedStyle(signedInState).display !== 'none';
            console.log(`signedInState visible: ${isVisible ? '✅' : '❌'}`);
            console.log(`  display: ${signedInState.style.display}`);
            console.log(`  visibility: ${signedInState.style.visibility}`);
        } else {
            console.log('❌ signedInState element not found');
        }
        
        if (signedOutState) {
            const isVisible = window.getComputedStyle(signedOutState).display !== 'none';
            console.log(`signedOutState visible: ${isVisible ? '✅' : '❌'}`);
            console.log(`  display: ${signedOutState.style.display}`);
            console.log(`  visibility: ${signedOutState.style.visibility}`);
        } else {
            console.log('❌ signedOutState element not found');
        }
        
        // 5. Check auth functions
        console.log('5. AUTH FUNCTIONS:');
        const authFunctions = ['handleSignIn', 'handleSignUp', 'signOut', 'updateAuthUI'];
        authFunctions.forEach(fn => {
            const exists = typeof window[fn] === 'function';
            console.log(`${fn}: ${exists ? '✅' : '❌'}`);
        });
        
        // 6. Quick test sign-in function
        console.log('6. QUICK TEST AVAILABLE:');
        console.log('To test sign-in with test user, run: testSignIn()');
        
        window.testSignIn = function() {
            console.log('🧪 TESTING SIGN-IN...');
            
            // Find test user
            const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
            const testUser = users.find(u => u.email === 'customer@test.com');
            
            if (!testUser) {
                console.log('❌ Test user not found');
                return;
            }
            
            // Create session
            const session = {
                id: testUser.id,
                name: testUser.name,
                email: testUser.email,
                firstName: testUser.firstName,
                lastName: testUser.lastName,
                signedIn: true,
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('visualVibeUser', JSON.stringify(session));
            window.currentUser = session;
            
            console.log('✅ Test sign-in successful');
            
            // Update UI
            if (typeof window.updateAuthUI === 'function') {
                window.updateAuthUI();
            }
        };
        
        console.log('=== DEBUG COMPLETE ===');
        
    }, 15000); // Wait for all auth systems to load
    
})();
