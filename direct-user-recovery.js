// DIRECT USER RECOVERY - Find and fix existing user authentication
(function() {
    'use strict';
    
    console.log('🔧 DIRECT USER RECOVERY - STARTING...');
    
    // Function to scan EVERY possible location for user data
    function scanAllUserData() {
        console.log('🔍 SCANNING ALL POSSIBLE USER STORAGE LOCATIONS...');
        
        const results = {
            foundUsers: [],
            storageLocations: [],
            totalUniqueUsers: 0
        };
        
        // All possible storage keys that might contain user data
        const possibleKeys = [
            'visualVibeUsers',
            'visualVibeUsers_v2', 
            'visualVibeUsers_v3',
            'userDatabase',
            'authBackup_v3',
            'authBackup',
            'users',
            'registeredUsers',
            'customerDatabase',
            'allUsers'
        ];
        
        // Check each possible key
        possibleKeys.forEach(key => {
            try {
                const stored = localStorage.getItem(key);
                if (stored && stored !== 'null' && stored !== 'undefined') {
                    const data = JSON.parse(stored);
                    if (Array.isArray(data) && data.length > 0) {
                        console.log(`✅ Found ${data.length} users in '${key}':`, data);
                        results.storageLocations.push({
                            key: key,
                            users: data,
                            count: data.length
                        });
                        results.foundUsers.push(...data);
                    }
                }
            } catch (e) {
                console.log(`❌ Error parsing '${key}':`, e.message);
            }
        });
        
        // Check for individual user storage (user_email@domain.com format)
        console.log('🔍 Checking individual user storage...');
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('user_')) {
                try {
                    const userData = localStorage.getItem(key);
                    if (userData && userData !== 'null') {
                        const user = JSON.parse(userData);
                        if (user && user.email) {
                            console.log(`✅ Found individual user: ${user.name} (${user.email}) in key '${key}'`);
                            results.foundUsers.push(user);
                        }
                    }
                } catch (e) {
                    console.log(`❌ Error parsing individual user '${key}':`, e.message);
                }
            }
        }
        
        // Deduplicate users by email
        const uniqueUsers = [];
        const seenEmails = new Set();
        
        results.foundUsers.forEach(user => {
            if (user && user.email) {
                const email = user.email.toLowerCase();
                if (!seenEmails.has(email)) {
                    seenEmails.add(email);
                    uniqueUsers.push(user);
                }
            }
        });
        
        results.totalUniqueUsers = uniqueUsers.length;
        
        console.log(`🔍 SCAN COMPLETE: Found ${results.totalUniqueUsers} unique users across ${results.storageLocations.length} storage locations`);
        
        if (results.totalUniqueUsers === 0) {
            console.log('⚠️ NO USERS FOUND ANYWHERE! This explains why login is failing.');
        } else {
            console.log('📋 Unique users found:');
            uniqueUsers.forEach((user, index) => {
                console.log(`${index + 1}. ${user.name || 'No name'} (${user.email}) - Password: ${user.password ? 'YES' : 'NO'}`);
            });
        }
        
        return {
            success: results.totalUniqueUsers > 0,
            users: uniqueUsers,
            details: results
        };
    }
    
    // Function to rebuild user database in correct format
    function rebuildUserDatabase(users) {
        console.log('🔨 REBUILDING USER DATABASE...');
        
        if (!users || users.length === 0) {
            console.log('❌ No users to rebuild with');
            return false;
        }
        
        try {
            // Save to all standard locations
            const standardKeys = [
                'visualVibeUsers',
                'visualVibeUsers_v3',
                'userDatabase'
            ];
            
            standardKeys.forEach(key => {
                localStorage.setItem(key, JSON.stringify(users));
                console.log(`✅ Saved ${users.length} users to '${key}'`);
            });
            
            // Save individual user records too
            users.forEach(user => {
                if (user.email) {
                    localStorage.setItem(`user_${user.email.toLowerCase()}`, JSON.stringify(user));
                }
            });
            
            console.log('✅ User database rebuilt successfully');
            return true;
            
        } catch (error) {
            console.error('❌ Failed to rebuild user database:', error);
            return false;
        }
    }
    
    // Simple, direct authentication function
    function directAuthenticate(email, password) {
        console.log(`🔐 DIRECT AUTHENTICATE: ${email}`);
        
        if (!email || !password) {
            return { success: false, message: 'Email and password required' };
        }
        
        // Scan for users first
        const scanResult = scanAllUserData();
        
        if (!scanResult.success) {
            return { success: false, message: 'No user database found. Please contact support.' };
        }
        
        // Find user by email (case insensitive)
        const user = scanResult.users.find(u => 
            u.email && u.email.toLowerCase() === email.toLowerCase()
        );
        
        if (!user) {
            console.log(`��� User not found: ${email}`);
            console.log('Available users:', scanResult.users.map(u => u.email));
            return { success: false, message: `No account found for ${email}. Available users: ${scanResult.users.map(u => u.email).join(', ')}` };
        }
        
        if (!user.password || user.password !== password) {
            console.log(`❌ Wrong password for: ${email}`);
            return { success: false, message: 'Incorrect password' };
        }
        
        // Create session
        const session = {
            id: user.id || `user-${Date.now()}`,
            name: user.name,
            email: user.email,
            firstName: user.firstName || user.name.split(' ')[0],
            lastName: user.lastName || user.name.split(' ').slice(1).join(' '),
            signedIn: true,
            loginTime: new Date().toISOString()
        };
        
        // Save session to multiple locations
        localStorage.setItem('visualVibeUser', JSON.stringify(session));
        localStorage.setItem('currentUserSession', JSON.stringify(session));
        localStorage.setItem('activeUser', JSON.stringify(session));
        
        window.currentUser = session;
        
        console.log(`✅ Authentication successful: ${user.name}`);
        return { success: true, user: session, message: `Welcome back, ${user.name}!` };
    }
    
    // Direct UI update function
    function directUpdateUI() {
        console.log('🎨 DIRECT UI UPDATE...');
        
        try {
            const signedInState = document.getElementById('signedInState');
            const signedOutState = document.getElementById('signedOutState');
            
            if (window.currentUser && window.currentUser.email) {
                console.log(`🎨 Showing signed-in UI for: ${window.currentUser.name}`);
                
                // Hide signed out
                if (signedOutState) {
                    signedOutState.style.display = 'none';
                    signedOutState.style.visibility = 'hidden';
                }
                
                // Show signed in
                if (signedInState) {
                    signedInState.style.display = 'flex';
                    signedInState.style.visibility = 'visible';
                    signedInState.style.position = 'static';
                    signedInState.style.left = 'auto';
                    signedInState.classList.remove('hidden');
                    
                    // Show ALL child elements
                    const allChildren = signedInState.querySelectorAll('*');
                    allChildren.forEach(child => {
                        child.style.display = '';
                        child.style.visibility = 'visible';
                        child.style.position = 'static';
                        child.style.left = 'auto';
                    });
                }
                
                // Show individual buttons too
                const profileBtns = document.querySelectorAll('[onclick*="openProfileModal"]');
                const orderBtns = document.querySelectorAll('[onclick*="showOrderHistory"]');
                const signOutBtns = document.querySelectorAll('[onclick*="signOut"]');
                
                [...profileBtns, ...orderBtns, ...signOutBtns].forEach(btn => {
                    btn.style.display = '';
                    btn.style.visibility = 'visible';
                    btn.style.position = 'static';
                    btn.style.left = 'auto';
                });
                
                console.log('✅ Signed-in UI shown');
                
            } else {
                console.log('🎨 Showing signed-out UI');
                
                // Hide signed in
                if (signedInState) {
                    signedInState.style.display = 'none';
                    signedInState.style.visibility = 'hidden';
                }
                
                // Show signed out
                if (signedOutState) {
                    signedOutState.style.display = 'flex';
                    signedOutState.style.visibility = 'visible';
                }
                
                console.log('✅ Signed-out UI shown');
            }
            
        } catch (error) {
            console.error('❌ UI update failed:', error);
        }
    }
    
    // Override authentication functions
    function setupDirectAuth() {
        console.log('🔧 Setting up direct authentication...');
        
        // Direct sign-in handler
        window.handleSignIn = function(e) {
            if (e) e.preventDefault();
            
            const emailInput = document.getElementById('signInEmail');
            const passwordInput = document.getElementById('signInPassword');
            
            if (!emailInput || !passwordInput) {
                alert('Form not found. Please refresh the page.');
                return;
            }
            
            const result = directAuthenticate(emailInput.value.trim(), passwordInput.value);
            
            if (result.success) {
                directUpdateUI();
                alert(result.message);
                
                if (window.closeSignInModal) {
                    window.closeSignInModal();
                }
                
                emailInput.value = '';
                passwordInput.value = '';
            } else {
                alert(result.message);
            }
        };
        
        // Direct sign-up handler
        window.handleSignUp = function(e) {
            if (e) e.preventDefault();
            
            const nameInput = document.getElementById('signUpName');
            const emailInput = document.getElementById('signUpEmail');
            const passwordInput = document.getElementById('signUpPassword');
            const confirmInput = document.getElementById('signUpConfirmPassword');
            
            if (!nameInput || !emailInput || !passwordInput || !confirmInput) {
                alert('Form not found. Please refresh the page.');
                return;
            }
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmInput.value;
            
            if (!name || !email || !password || !confirmPassword) {
                alert('Please fill in all fields.');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            
            // Check if user exists
            const scanResult = scanAllUserData();
            const existingUser = scanResult.users.find(u => 
                u.email && u.email.toLowerCase() === email.toLowerCase()
            );
            
            if (existingUser) {
                alert(`Account already exists for ${email}. Please sign in instead.`);
                
                // Switch to sign in
                setTimeout(() => {
                    if (window.closeSignUpModal) window.closeSignUpModal();
                    if (window.openSignInModal) {
                        window.openSignInModal();
                        setTimeout(() => {
                            const signInEmail = document.getElementById('signInEmail');
                            if (signInEmail) signInEmail.value = email;
                        }, 300);
                    }
                }, 1500);
                return;
            }
            
            // Create new user
            const newUser = {
                id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                name: name,
                firstName: name.split(' ')[0],
                lastName: name.split(' ').slice(1).join(' ') || '',
                email: email.toLowerCase(),
                password: password,
                orders: [],
                reviews: [],
                createdAt: new Date().toISOString()
            };
            
            // Add to existing users and rebuild
            const allUsers = [...scanResult.users, newUser];
            rebuildUserDatabase(allUsers);
            
            // Sign them in
            const authResult = directAuthenticate(email, password);
            if (authResult.success) {
                directUpdateUI();
                alert(`Welcome ${name}! Account created successfully.`);
                
                if (window.closeSignUpModal) {
                    window.closeSignUpModal();
                }
                
                // Clear form
                nameInput.value = '';
                emailInput.value = '';
                passwordInput.value = '';
                confirmInput.value = '';
            }
        };
        
        // Sign out handler
        window.signOut = function() {
            window.currentUser = null;
            localStorage.removeItem('visualVibeUser');
            localStorage.removeItem('currentUserSession');
            localStorage.removeItem('activeUser');
            
            directUpdateUI();
            alert('Signed out successfully.');
        };
        
        // Update auth UI function
        window.updateAuthUI = directUpdateUI;
        
        console.log('✅ Direct authentication setup complete');
    }
    
    // Restore session if exists
    function restoreSession() {
        try {
            const sessionKeys = ['visualVibeUser', 'currentUserSession', 'activeUser'];
            
            for (const key of sessionKeys) {
                const session = localStorage.getItem(key);
                if (session) {
                    const user = JSON.parse(session);
                    if (user && user.email) {
                        window.currentUser = user;
                        console.log(`✅ Session restored: ${user.name}`);
                        directUpdateUI();
                        return;
                    }
                }
            }
        } catch (e) {
            console.log('No valid session to restore');
        }
    }
    
    // Initialize system
    function initialize() {
        console.log('🚀 Initializing direct user recovery...');
        
        // Scan for users first
        const scanResult = scanAllUserData();
        
        if (scanResult.success) {
            // Rebuild database to ensure consistency
            rebuildUserDatabase(scanResult.users);
        }
        
        // Setup authentication
        setupDirectAuth();
        
        // Restore session
        restoreSession();
        
        // Attach to forms
        setTimeout(() => {
            const signInForm = document.getElementById('signInForm');
            const signUpForm = document.getElementById('signUpForm');
            
            if (signInForm) {
                signInForm.removeEventListener('submit', window.handleSignIn);
                signInForm.addEventListener('submit', window.handleSignIn);
                console.log('✅ Sign-in form attached');
            }
            
            if (signUpForm) {
                signUpForm.removeEventListener('submit', window.handleSignUp);
                signUpForm.addEventListener('submit', window.handleSignUp);
                console.log('✅ Sign-up form attached');
            }
        }, 1000);
        
        console.log('🔧 DIRECT USER RECOVERY - COMPLETE');
    }
    
    // Global functions for debugging
    window.scanAllUserData = scanAllUserData;
    window.directAuthenticate = directAuthenticate;
    window.rebuildUserDatabase = rebuildUserDatabase;
    
    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    // Also run after delays
    setTimeout(initialize, 500);
    setTimeout(initialize, 2000);
    
})();
