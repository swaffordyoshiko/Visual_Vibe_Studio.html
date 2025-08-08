// ROCK-SOLID AUTHENTICATION SYSTEM - GUARANTEED TO WORK
(function() {
    'use strict';
    
    console.log('🪨 ROCK-SOLID AUTH - INITIALIZING...');
    
    // Kill all existing auth systems immediately
    const authKiller = function() {
        // Delete all known conflicting functions
        const toDelete = [
            'handleSignIn', 'handleSignUp', 'signOut', 'updateAuthUI',
            'CrossDeviceAuth', 'BulletproofAuth', 'unifiedAuth',
            'handleSignUp_DISABLED_BY_SIMPLE_OVERRIDE',
            'handleSignUp_EMERGENCY_DISABLED',
            'handleSignUp_DISABLED_FROM_FINAL_CHECK'
        ];
        
        toDelete.forEach(fn => {
            try {
                window[fn] = null;
                delete window[fn];
            } catch (e) {}
        });
        
        console.log('💀 Killed all existing auth systems');
    };
    
    authKiller();
    
    // ROCK-SOLID STORAGE MANAGER
    const Storage = {
        // Get ALL users from every possible storage location
        getAllUsers: function() {
            const storageKeys = [
                'visualVibeUsers',
                'visualVibeUsers_v3', 
                'visualVibeUsers_v2',
                'authBackup_v3',
                'userDatabase'
            ];
            
            let allUsers = [];
            const seenEmails = new Set();
            
            // Check each storage location
            storageKeys.forEach(key => {
                try {
                    const stored = localStorage.getItem(key);
                    if (stored) {
                        const users = JSON.parse(stored);
                        if (Array.isArray(users)) {
                            users.forEach(user => {
                                if (user && user.email && !seenEmails.has(user.email.toLowerCase())) {
                                    seenEmails.add(user.email.toLowerCase());
                                    allUsers.push(user);
                                }
                            });
                        }
                    }
                } catch (e) {
                    console.log(`Failed to parse ${key}:`, e);
                }
            });
            
            // Also check individual user storage
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('user_')) {
                    try {
                        const user = JSON.parse(localStorage.getItem(key));
                        if (user && user.email && !seenEmails.has(user.email.toLowerCase())) {
                            seenEmails.add(user.email.toLowerCase());
                            allUsers.push(user);
                        }
                    } catch (e) {}
                }
            }
            
            console.log(`🔍 Found ${allUsers.length} unique users across all storage`);
            return allUsers;
        },
        
        // Find a user by email from ALL storage locations
        findUser: function(email) {
            if (!email) return null;
            
            const searchEmail = email.toLowerCase().trim();
            const allUsers = this.getAllUsers();
            
            // Find user with exact email match
            const user = allUsers.find(u => u.email && u.email.toLowerCase() === searchEmail);
            
            if (user) {
                console.log(`✅ Found user: ${user.name} (${user.email})`);
                return user;
            }
            
            console.log(`❌ No user found for: ${email}`);
            return null;
        },
        
        // Save user to MULTIPLE locations for maximum reliability
        saveUser: function(user) {
            try {
                // Get existing users and update/add this one
                const allUsers = this.getAllUsers();
                const existingIndex = allUsers.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
                
                if (existingIndex !== -1) {
                    allUsers[existingIndex] = { ...allUsers[existingIndex], ...user };
                } else {
                    allUsers.push(user);
                }
                
                // Save to multiple locations
                const storageKeys = [
                    'visualVibeUsers',
                    'visualVibeUsers_v3',
                    'userDatabase',
                    'authBackup_v3'
                ];
                
                storageKeys.forEach(key => {
                    try {
                        localStorage.setItem(key, JSON.stringify(allUsers));
                    } catch (e) {
                        console.error(`Failed to save to ${key}:`, e);
                    }
                });
                
                // Also save individual user record
                localStorage.setItem(`user_${user.email.toLowerCase()}`, JSON.stringify(user));
                
                console.log(`💾 User saved to all storage locations: ${user.name}`);
                return true;
            } catch (error) {
                console.error('💥 Save user failed:', error);
                return false;
            }
        },
        
        // Save session
        saveSession: function(user) {
            const session = {
                id: user.id,
                name: user.name,
                email: user.email,
                firstName: user.firstName || user.name.split(' ')[0],
                lastName: user.lastName || user.name.split(' ').slice(1).join(' '),
                signedIn: true,
                loginTime: new Date().toISOString(),
                device: navigator.userAgent
            };
            
            // Save to multiple session locations
            const sessionKeys = [
                'visualVibeUser',
                'visualVibeSession_v3',
                'currentUserSession',
                'authSession'
            ];
            
            sessionKeys.forEach(key => {
                try {
                    localStorage.setItem(key, JSON.stringify(session));
                } catch (e) {}
            });
            
            window.currentUser = session;
            console.log(`🎫 Session saved: ${user.name}`);
            return session;
        },
        
        // Get current session
        getSession: function() {
            const sessionKeys = [
                'visualVibeUser',
                'visualVibeSession_v3', 
                'currentUserSession',
                'authSession'
            ];
            
            for (const key of sessionKeys) {
                try {
                    const session = localStorage.getItem(key);
                    if (session) {
                        const parsed = JSON.parse(session);
                        if (parsed && parsed.email) {
                            return parsed;
                        }
                    }
                } catch (e) {}
            }
            
            return null;
        },
        
        // Clear all session data
        clearSession: function() {
            const keysToRemove = [
                'visualVibeUser',
                'visualVibeSession_v3',
                'currentUserSession', 
                'authSession'
            ];
            
            keysToRemove.forEach(key => {
                localStorage.removeItem(key);
            });
            
            window.currentUser = null;
            console.log('🧹 All sessions cleared');
        }
    };
    
    // ROCK-SOLID AUTHENTICATION FUNCTIONS
    const Auth = {
        // Sign in with bulletproof user lookup
        signIn: function(email, password) {
            console.log(`🔐 ROCK-SOLID SIGN IN: ${email}`);
            
            if (!email || !password) {
                return { success: false, message: 'Please enter both email and password.' };
            }
            
            // Find user with comprehensive search
            const user = Storage.findUser(email);
            
            if (!user) {
                console.log(`❌ No user found for: ${email}`);
                console.log('Available users:', Storage.getAllUsers().map(u => u.email));
                return { success: false, message: 'No account found with this email. Please check your email or sign up.' };
            }
            
            // Validate password
            if (user.password !== password) {
                console.log(`❌ Wrong password for: ${email}`);
                return { success: false, message: 'Incorrect password. Please try again.' };
            }
            
            // Update user login time
            user.lastLogin = new Date().toISOString();
            Storage.saveUser(user);
            
            // Create session
            const session = Storage.saveSession(user);
            
            console.log(`✅ SIGN IN SUCCESS: ${user.name}`);
            return { 
                success: true, 
                message: `Welcome back, ${user.name}!`,
                user: session 
            };
        },
        
        // Sign up with conflict checking
        signUp: function(name, email, password, confirmPassword) {
            console.log(`📝 ROCK-SOLID SIGN UP: ${name} (${email})`);
            
            // Validation
            if (!name || !email || !password || !confirmPassword) {
                return { success: false, message: 'Please fill in all fields.' };
            }
            
            if (password !== confirmPassword) {
                return { success: false, message: 'Passwords do not match.' };
            }
            
            if (password.length < 6) {
                return { success: false, message: 'Password must be at least 6 characters.' };
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return { success: false, message: 'Please enter a valid email address.' };
            }
            
            // Check if user exists
            const existingUser = Storage.findUser(email);
            if (existingUser) {
                console.log(`❌ User already exists: ${email}`);
                return { 
                    success: false, 
                    message: `Account already exists for ${email}. Please sign in instead.`,
                    shouldRedirectToSignIn: true,
                    email: email
                };
            }
            
            // Create new user
            const newUser = {
                id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                name: name.trim(),
                firstName: name.trim().split(' ')[0],
                lastName: name.trim().split(' ').slice(1).join(' ') || '',
                email: email.toLowerCase().trim(),
                password: password,
                orders: [],
                reviews: [],
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
                version: 'rock-solid-v1'
            };
            
            // Save user
            if (!Storage.saveUser(newUser)) {
                return { success: false, message: 'Failed to create account. Please try again.' };
            }
            
            // Create session
            const session = Storage.saveSession(newUser);
            
            console.log(`✅ SIGN UP SUCCESS: ${newUser.name}`);
            return { 
                success: true, 
                message: `Welcome ${newUser.name}! Account created successfully.`,
                user: session 
            };
        },
        
        // Sign out
        signOut: function() {
            console.log('🚪 ROCK-SOLID SIGN OUT');
            Storage.clearSession();
            return { success: true, message: 'Signed out successfully.' };
        },
        
        // Restore session on page load
        restoreSession: function() {
            const session = Storage.getSession();
            if (session) {
                window.currentUser = session;
                console.log(`🔄 Session restored: ${session.name}`);
                return session;
            }
            return null;
        }
    };
    
    // ROCK-SOLID UI MANAGER
    const UI = {
        updateAuthState: function() {
            try {
                const signedInState = document.getElementById('signedInState');
                const signedOutState = document.getElementById('signedOutState');
                
                console.log('🎨 Updating UI for current user:', window.currentUser ? window.currentUser.name : 'none');
                
                if (window.currentUser && window.currentUser.email) {
                    // User is signed in - SHOW signed in elements
                    if (signedOutState) {
                        signedOutState.style.display = 'none';
                        signedOutState.style.visibility = 'hidden';
                    }
                    
                    if (signedInState) {
                        signedInState.style.display = 'flex';
                        signedInState.style.visibility = 'visible';
                        signedInState.style.position = 'static';
                        signedInState.style.left = 'auto';
                        signedInState.classList.remove('hidden');
                        
                        // Force show ALL child elements
                        const children = signedInState.querySelectorAll('*');
                        children.forEach(child => {
                            child.style.display = '';
                            child.style.visibility = 'visible';
                            child.style.position = 'static';
                            child.style.left = 'auto';
                        });
                    }
                    
                    // Also show individual signed-in buttons
                    const signinButtons = document.querySelectorAll('[onclick*="openProfileModal"], [onclick*="showOrderHistory"], [onclick*="signOut"]');
                    signinButtons.forEach(btn => {
                        btn.style.display = '';
                        btn.style.visibility = 'visible';
                        btn.style.position = 'static';
                        btn.style.left = 'auto';
                    });
                    
                    document.body.classList.add('user-authenticated');
                    console.log('✅ UI: Signed in state shown');
                    
                } else {
                    // User is NOT signed in - HIDE signed in elements
                    if (signedInState) {
                        signedInState.style.display = 'none';
                        signedInState.style.visibility = 'hidden';
                        signedInState.style.position = 'absolute';
                        signedInState.style.left = '-9999px';
                        signedInState.classList.add('hidden');
                        
                        // Force hide ALL child elements
                        const children = signedInState.querySelectorAll('*');
                        children.forEach(child => {
                            child.style.display = 'none';
                            child.style.visibility = 'hidden';
                            child.style.position = 'absolute';
                            child.style.left = '-9999px';
                        });
                    }
                    
                    if (signedOutState) {
                        signedOutState.style.display = 'flex';
                        signedOutState.style.visibility = 'visible';
                        signedOutState.style.position = 'static';
                        signedOutState.style.left = 'auto';
                    }
                    
                    document.body.classList.remove('user-authenticated');
                    console.log('✅ UI: Signed out state shown');
                }
                
            } catch (error) {
                console.error('💥 UI update failed:', error);
            }
        }
    };
    
    // FORM HANDLERS
    function rockSolidSignIn(e) {
        if (e) e.preventDefault();
        
        const emailInput = document.getElementById('signInEmail');
        const passwordInput = document.getElementById('signInPassword');
        
        if (!emailInput || !passwordInput) {
            alert('Sign in form not found.');
            return;
        }
        
        const result = Auth.signIn(emailInput.value.trim(), passwordInput.value);
        
        if (result.success) {
            // Close modal
            if (window.closeSignInModal) window.closeSignInModal();
            
            // Update UI
            UI.updateAuthState();
            
            // Show success
            alert(result.message);
            
            // Clear form
            emailInput.value = '';
            passwordInput.value = '';
        } else {
            alert(result.message);
        }
    }
    
    function rockSolidSignUp(e) {
        if (e) e.preventDefault();
        
        const nameInput = document.getElementById('signUpName');
        const emailInput = document.getElementById('signUpEmail');
        const passwordInput = document.getElementById('signUpPassword');
        const confirmInput = document.getElementById('signUpConfirmPassword');
        
        if (!nameInput || !emailInput || !passwordInput || !confirmInput) {
            alert('Sign up form not found.');
            return;
        }
        
        const result = Auth.signUp(
            nameInput.value.trim(),
            emailInput.value.trim(),
            passwordInput.value,
            confirmInput.value
        );
        
        if (result.success) {
            // Close modal
            if (window.closeSignUpModal) window.closeSignUpModal();
            
            // Update UI
            UI.updateAuthState();
            
            // Show success
            alert(result.message);
            
            // Clear form
            nameInput.value = '';
            emailInput.value = '';
            passwordInput.value = '';
            confirmInput.value = '';
        } else {
            alert(result.message);
            
            // Redirect to sign in if account exists
            if (result.shouldRedirectToSignIn) {
                setTimeout(() => {
                    if (window.closeSignUpModal) window.closeSignUpModal();
                    if (window.openSignInModal) {
                        window.openSignInModal();
                        setTimeout(() => {
                            const signInEmail = document.getElementById('signInEmail');
                            if (signInEmail) signInEmail.value = result.email;
                        }, 300);
                    }
                }, 2000);
            }
        }
    }
    
    function rockSolidSignOut() {
        const result = Auth.signOut();
        UI.updateAuthState();
        alert(result.message);
    }
    
    // INITIALIZATION
    function initializeRockSolidAuth() {
        console.log('🚀 Initializing rock-solid auth...');
        
        // Kill existing auth one more time
        authKiller();
        
        // Set our functions as THE auth functions
        window.handleSignIn = rockSolidSignIn;
        window.handleSignUp = rockSolidSignUp;
        window.signOut = rockSolidSignOut;
        window.updateAuthUI = UI.updateAuthState;
        
        // Restore session
        Auth.restoreSession();
        
        // Update UI
        UI.updateAuthState();
        
        // Attach to forms (replace existing listeners)
        setTimeout(() => {
            const signInForm = document.getElementById('signInForm');
            const signUpForm = document.getElementById('signUpForm');
            
            if (signInForm) {
                // Clone to remove all listeners
                const newSignInForm = signInForm.cloneNode(true);
                signInForm.parentNode.replaceChild(newSignInForm, signInForm);
                newSignInForm.addEventListener('submit', rockSolidSignIn);
                console.log('✅ Sign in form attached');
            }
            
            if (signUpForm) {
                // Clone to remove all listeners
                const newSignUpForm = signUpForm.cloneNode(true);
                signUpForm.parentNode.replaceChild(newSignUpForm, signUpForm);
                newSignUpForm.addEventListener('submit', rockSolidSignUp);
                console.log('✅ Sign up form attached');
            }
        }, 1000);
        
        console.log('🪨 ROCK-SOLID AUTH - READY!');
    }
    
    // DEBUG FUNCTIONS
    window.debugRockSolidAuth = function() {
        console.log('🔍 === ROCK-SOLID AUTH DEBUG ===');
        console.log('Current User:', window.currentUser);
        console.log('All Users:', Storage.getAllUsers());
        console.log('Current Session:', Storage.getSession());
        console.log('Auth Functions:', {
            handleSignIn: typeof window.handleSignIn,
            handleSignUp: typeof window.handleSignUp,
            signOut: typeof window.signOut
        });
        
        // Show UI states
        const signedIn = document.getElementById('signedInState');
        const signedOut = document.getElementById('signedOutState');
        console.log('UI States:', {
            signedInVisible: signedIn ? signedIn.style.display !== 'none' : false,
            signedOutVisible: signedOut ? signedOut.style.display !== 'none' : false
        });
        
        console.log('🔍 === END DEBUG ===');
    };
    
    window.testRockSolidSignIn = function(email, password) {
        console.log(`🧪 Testing sign in: ${email}`);
        const result = Auth.signIn(email, password);
        console.log('Result:', result);
        if (result.success) {
            UI.updateAuthState();
        }
        return result;
    };
    
    window.createRockSolidTestUser = function(name = 'Test User', email = 'test@test.com', password = 'test123') {
        console.log(`🧪 Creating test user: ${name} (${email})`);
        const result = Auth.signUp(name, email, password, password);
        console.log('Result:', result);
        return result;
    };
    
    // Start the system
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeRockSolidAuth);
    } else {
        initializeRockSolidAuth();
    }
    
    // Also run after delays
    setTimeout(initializeRockSolidAuth, 1000);
    setTimeout(initializeRockSolidAuth, 3000);
    
    // Keep UI updated
    setInterval(UI.updateAuthState, 5000);
    
    console.log('🪨 ROCK-SOLID AUTH SYSTEM - LOADED');
    
})();
