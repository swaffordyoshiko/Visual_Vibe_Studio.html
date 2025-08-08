// CREATE TEST USERS - For testing authentication
(function() {
    'use strict';
    
    console.log('🧪 TEST USER CREATOR - STARTING...');
    
    // Wait for direct user recovery to load
    setTimeout(() => {
        if (typeof window.scanAllUserData === 'function') {
            const scanResult = window.scanAllUserData();
            
            if (!scanResult.success || scanResult.users.length === 0) {
                console.log('⚠️ NO USERS FOUND - Creating test users for authentication testing...');
                
                // Create test users
                const testUsers = [
                    {
                        id: 'test-user-1',
                        name: 'John Doe',
                        firstName: 'John',
                        lastName: 'Doe',
                        email: 'john@test.com',
                        password: 'test123',
                        orders: [],
                        reviews: [],
                        createdAt: new Date().toISOString()
                    },
                    {
                        id: 'test-user-2', 
                        name: 'Jane Smith',
                        firstName: 'Jane',
                        lastName: 'Smith',
                        email: 'jane@test.com',
                        password: 'test123',
                        orders: [],
                        reviews: [],
                        createdAt: new Date().toISOString()
                    },
                    {
                        id: 'test-user-3',
                        name: 'Bob Johnson',
                        firstName: 'Bob',
                        lastName: 'Johnson', 
                        email: 'bob@test.com',
                        password: 'test123',
                        orders: [],
                        reviews: [],
                        createdAt: new Date().toISOString()
                    }
                ];
                
                // Save test users to storage
                if (typeof window.rebuildUserDatabase === 'function') {
                    window.rebuildUserDatabase(testUsers);
                    console.log('✅ Test users created successfully!');
                    console.log('📋 You can now test sign-in with:');
                    testUsers.forEach(user => {
                        console.log(`  - ${user.email} / ${user.password}`);
                    });
                } else {
                    console.log('❌ rebuildUserDatabase not available yet');
                }
            } else {
                console.log(`✅ Found ${scanResult.users.length} existing users - no need to create test users`);
                console.log('📋 Existing users:');
                scanResult.users.forEach(user => {
                    console.log(`  - ${user.name} (${user.email})`);
                });
            }
        } else {
            console.log('❌ scanAllUserData not available yet - direct user recovery not loaded');
        }
    }, 3000);
    
    // Global function to manually create a test user
    window.createTestUser = function(name = 'Test User', email = 'test@example.com', password = 'test123') {
        console.log(`🧪 Creating test user: ${name} (${email})`);
        
        const testUser = {
            id: `test-${Date.now()}`,
            name: name,
            firstName: name.split(' ')[0],
            lastName: name.split(' ').slice(1).join(' ') || '',
            email: email.toLowerCase(),
            password: password,
            orders: [],
            reviews: [],
            createdAt: new Date().toISOString()
        };
        
        // Get existing users
        if (typeof window.scanAllUserData === 'function') {
            const scanResult = window.scanAllUserData();
            const allUsers = [...scanResult.users, testUser];
            
            if (typeof window.rebuildUserDatabase === 'function') {
                window.rebuildUserDatabase(allUsers);
                console.log(`✅ Test user created: ${name} (${email}) with password: ${password}`);
                return true;
            }
        }
        
        console.log('❌ User creation functions not available');
        return false;
    };
    
    console.log('🧪 TEST USER CREATOR - READY');
    
})();
