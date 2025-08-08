// AUTH USER FINDER - Find and list all existing users
(function() {
    'use strict';
    
    console.log('🔍 AUTH USER FINDER - LOADING...');
    
    // Function to scan ALL possible storage locations for users
    window.findAllUsers = function() {
        console.log('🔍 === SCANNING ALL STORAGE FOR USERS ===');
        
        const allUsers = [];
        const storageKeys = [
            'visualVibeUsers',
            'visualVibeUsers_v2',
            'visualVibeUsers_v3',
            'userDatabase',
            'authBackup_v3',
            'authBackup',
            'users'
        ];
        
        // Check main storage locations
        storageKeys.forEach(key => {
            try {
                const stored = localStorage.getItem(key);
                if (stored) {
                    const data = JSON.parse(stored);
                    if (Array.isArray(data) && data.length > 0) {
                        console.log(`✅ Found ${data.length} users in '${key}':`);
                        data.forEach((user, index) => {
                            if (user && user.email) {
                                console.log(`  ${index + 1}. ${user.name || 'No name'} (${user.email}) - ${user.createdAt || 'No date'}`);
                                allUsers.push({
                                    source: key,
                                    user: user
                                });
                            }
                        });
                    }
                }
            } catch (e) {
                console.log(`❌ Failed to parse '${key}':`, e.message);
            }
        });
        
        // Check individual user storage
        console.log('🔍 Checking individual user storage...');
        let individualCount = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('user_')) {
                try {
                    const userData = JSON.parse(localStorage.getItem(key));
                    if (userData && userData.email) {
                        console.log(`  Individual: ${userData.name || 'No name'} (${userData.email}) - Key: ${key}`);
                        allUsers.push({
                            source: key,
                            user: userData
                        });
                        individualCount++;
                    }
                } catch (e) {
                    console.log(`❌ Failed to parse individual user '${key}':`, e.message);
                }
            }
        }
        
        if (individualCount > 0) {
            console.log(`✅ Found ${individualCount} individual user records`);
        }
        
        // Check session storage
        console.log('🔍 Checking current sessions...');
        const sessionKeys = [
            'visualVibeUser',
            'visualVibeSession_v3',
            'currentUserSession',
            'authSession'
        ];
        
        sessionKeys.forEach(key => {
            try {
                const session = localStorage.getItem(key);
                if (session) {
                    const data = JSON.parse(session);
                    if (data && data.email) {
                        console.log(`🎫 Active session in '${key}': ${data.name} (${data.email})`);
                    }
                }
            } catch (e) {
                console.log(`❌ Failed to parse session '${key}':`, e.message);
            }
        });
        
        console.log(`🔍 === TOTAL: ${allUsers.length} user records found ===`);
        return allUsers;
    };
    
    // Function to test if a specific email exists
    window.testUserExists = function(email) {
        console.log(`🧪 Testing if user exists: ${email}`);
        
        const allUsers = window.findAllUsers();
        const matches = allUsers.filter(entry => 
            entry.user.email && entry.user.email.toLowerCase() === email.toLowerCase()
        );
        
        if (matches.length > 0) {
            console.log(`✅ Found ${matches.length} records for ${email}:`);
            matches.forEach(match => {
                console.log(`  - Source: ${match.source}`);
                console.log(`  - Name: ${match.user.name}`);
                console.log(`  - Has Password: ${!!match.user.password}`);
                console.log(`  - Created: ${match.user.createdAt || 'Unknown'}`);
            });
            return matches[0].user; // Return first match
        } else {
            console.log(`❌ No records found for ${email}`);
            return null;
        }
    };
    
    // Function to migrate users to the rock-solid format
    window.migrateUsersToRockSolid = function() {
        console.log('🔄 MIGRATING ALL USERS TO ROCK-SOLID FORMAT...');
        
        const allUsers = window.findAllUsers();
        const uniqueUsers = new Map();
        
        // Deduplicate users by email
        allUsers.forEach(entry => {
            const email = entry.user.email.toLowerCase();
            if (!uniqueUsers.has(email)) {
                uniqueUsers.set(email, entry.user);
            }
        });
        
        const finalUsers = Array.from(uniqueUsers.values());
        
        // Save to rock-solid storage locations
        const rockSolidKeys = [
            'visualVibeUsers',
            'visualVibeUsers_v3',
            'userDatabase',
            'authBackup_v3'
        ];
        
        rockSolidKeys.forEach(key => {
            try {
                localStorage.setItem(key, JSON.stringify(finalUsers));
                console.log(`✅ Saved ${finalUsers.length} users to '${key}'`);
            } catch (e) {
                console.error(`❌ Failed to save to '${key}':`, e);
            }
        });
        
        // Also save individual records
        finalUsers.forEach(user => {
            try {
                localStorage.setItem(`user_${user.email.toLowerCase()}`, JSON.stringify(user));
            } catch (e) {
                console.error(`�� Failed to save individual record for ${user.email}:`, e);
            }
        });
        
        console.log(`✅ MIGRATION COMPLETE: ${finalUsers.length} users migrated`);
        return finalUsers;
    };
    
    // Auto-run on load to check for users
    setTimeout(() => {
        console.log('🔍 Auto-scanning for existing users...');
        const users = window.findAllUsers();
        
        if (users.length === 0) {
            console.log('⚠️ NO USERS FOUND! This might be why authentication is failing.');
            console.log('💡 Try creating a test user: createRockSolidTestUser("Test User", "test@test.com", "test123")');
        } else {
            console.log(`✅ Found existing users - authentication should work`);
            
            // Migrate users to ensure they're in the right format
            window.migrateUsersToRockSolid();
        }
    }, 3000);
    
    console.log('🔍 AUTH USER FINDER - READY');
    console.log('Available functions: findAllUsers(), testUserExists(email), migrateUsersToRockSolid()');
    
})();
