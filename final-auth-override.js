// FINAL AUTHENTICATION OVERRIDE - LOADS LAST AND TAKES COMPLETE CONTROL
(function() {
    'use strict';
    
    console.log('🚀 FINAL AUTH OVERRIDE - TAKING COMPLETE CONTROL...');
    
    // Wait for everything else to load, then override everything
    setTimeout(() => {
        console.log('🔧 FINAL AUTH OVERRIDE - EXECUTING...');
        
        // STORAGE FUNCTIONS
        const Storage = {
            getAllUsers: function() {
                const keys = ['visualVibeUsers', 'visualVibeUsers_v3', 'userDatabase'];
                let allUsers = [];
                
                keys.forEach(key => {
                    try {
                        const stored = localStorage.getItem(key);
                        if (stored) {
                            const users = JSON.parse(stored);
                            if (Array.isArray(users)) {
                                allUsers.push(...users);
                            }
                        }
                    } catch (e) {}
                });
                
                // Deduplicate by email
                const unique = [];
                const seen = new Set();
                allUsers.forEach(user => {
                    if (user && user.email && !seen.has(user.email.toLowerCase())) {
                        seen.add(user.email.toLowerCase());
                        unique.push(user);
                    }
                });
                
                console.log(`📊 Found ${unique.length} unique users`);
                return unique;
            },
            
            findUser: function(email) {
                const users = this.getAllUsers();
                return users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase());
            },
            
            saveSession: function(user) {
                const session = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    firstName: user.firstName || user.name.split(' ')[0],
                    lastName: user.lastName || user.name.split(' ').slice(1).join(' '),
                    signedIn: true,
                    loginTime: new Date().toISOString()
                };
                
                localStorage.setItem('visualVibeUser', JSON.stringify(session));
                window.currentUser = session;
                console.log(`✅ Session created: ${user.name}`);
                return session;
            },
            
            clearSession: function() {
                localStorage.removeItem('visualVibeUser');
                window.currentUser = null;
                console.log('🧹 Session cleared');
            }
        };
        
        // UI UPDATE FUNCTION
        function forceUpdateUI() {
            console.log('🎨 FINAL UI UPDATE...');
            
            try {
                const signedInState = document.getElementById('signedInState');
                const signedOutState = document.getElementById('signedOutState');
                
                if (window.currentUser && window.currentUser.email) {
                    console.log(`✅ User signed in: ${window.currentUser.name}`);
                    
                    // FORCE SHOW signed-in elements
                    if (signedInState) {
                        signedInState.style.display = 'flex';
                        signedInState.style.visibility = 'visible';
                        signedInState.style.position = 'static';
                        signedInState.style.left = 'auto';
                        signedInState.classList.remove('hidden');
                        
                        // Force show ALL children
                        signedInState.querySelectorAll('*').forEach(child => {
                            child.style.display = '';
                            child.style.visibility = 'visible';
                            child.style.position = 'static';
                            child.style.left = 'auto';
                        });
                    }
                    
                    // FORCE HIDE signed-out elements
                    if (signedOutState) {
                        signedOutState.style.display = 'none';
                        signedOutState.style.visibility = 'hidden';
                    }
                    
                    // Show individual signed-in buttons
                    document.querySelectorAll('[onclick*="openProfileModal"], [onclick*="showOrderHistory"], [onclick*="signOut"]').forEach(btn => {
                        btn.style.display = '';
                        btn.style.visibility = 'visible';
                        btn.style.position = 'static';
                        btn.style.left = 'auto';
                    });
                    
                    console.log('🎨 Signed-in UI FORCED to show');
                    
                } else {
                    console.log('❌ No user signed in');
                    
                    // FORCE HIDE signed-in elements
                    if (signedInState) {
                        signedInState.style.display = 'none';
                        signedInState.style.visibility = 'hidden';
                        signedInState.style.position = 'absolute';
                        signedInState.style.left = '-9999px';
                        
                        // Force hide ALL children
                        signedInState.querySelectorAll('*').forEach(child => {
                            child.style.display = 'none';
                            child.style.visibility = 'hidden';
                            child.style.position = 'absolute';
                            child.style.left = '-9999px';
                        });
                    }
                    
                    // FORCE SHOW signed-out elements
                    if (signedOutState) {
                        signedOutState.style.display = 'flex';
                        signedOutState.style.visibility = 'visible';
                    }
                    
                    console.log('🎨 Signed-out UI FORCED to show');
                }
                
            } catch (error) {
                console.error('❌ UI update error:', error);
            }
        }
        
        // AUTHENTICATION FUNCTIONS
        function finalSignIn(e) {
            console.log('🔑 FINAL SIGN IN');
            if (e) e.preventDefault();
            
            const emailInput = document.getElementById('signInEmail');
            const passwordInput = document.getElementById('signInPassword');
            
            if (!emailInput || !passwordInput) {
                alert('Form not found');
                return;
            }
            
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            
            if (!email || !password) {
                alert('Please enter email and password');
                return;
            }
            
            console.log(`🔍 Looking for user: ${email}`);
            const users = Storage.getAllUsers();
            console.log('Available users:', users.map(u => u.email));
            
            const user = Storage.findUser(email);
            
            if (!user) {
                alert(`No account found for ${email}. Available users: ${users.map(u => u.email).join(', ')}`);
                return;
            }
            
            if (user.password !== password) {
                alert('Incorrect password');
                return;
            }
            
            // Success!
            Storage.saveSession(user);
            forceUpdateUI();
            
            alert(`Welcome back, ${user.name}!`);
            
            if (window.closeSignInModal) {
                window.closeSignInModal();
            }
            
            emailInput.value = '';
            passwordInput.value = '';
        }
        
        function finalSignUp(e) {
            console.log('📝 FINAL SIGN UP');
            if (e) e.preventDefault();
            
            const nameInput = document.getElementById('signUpName');
            const emailInput = document.getElementById('signUpEmail');
            const passwordInput = document.getElementById('signUpPassword');
            const confirmInput = document.getElementById('signUpConfirmPassword');
            
            if (!nameInput || !emailInput || !passwordInput || !confirmInput) {
                alert('Form not found');
                return;
            }
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmInput.value;
            
            if (!name || !email || !password || !confirmPassword) {
                alert('Please fill all fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // Check if user exists
            const existingUser = Storage.findUser(email);
            if (existingUser) {
                alert(`Account already exists for ${email}. Please sign in instead.`);
                return;
            }
            
            // Create new user
            const newUser = {
                id: `user-${Date.now()}`,
                name: name,
                firstName: name.split(' ')[0],
                lastName: name.split(' ').slice(1).join(' ') || '',
                email: email.toLowerCase(),
                password: password,
                orders: [],
                reviews: [],
                createdAt: new Date().toISOString()
            };
            
            // Save user
            const allUsers = [...Storage.getAllUsers(), newUser];
            localStorage.setItem('visualVibeUsers', JSON.stringify(allUsers));
            localStorage.setItem('visualVibeUsers_v3', JSON.stringify(allUsers));
            
            // Sign them in
            Storage.saveSession(newUser);
            forceUpdateUI();
            
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
        
        function finalSignOut() {
            console.log('🚪 FINAL SIGN OUT');
            Storage.clearSession();
            forceUpdateUI();
            alert('Signed out successfully');
        }
        
        // KILL ALL OTHER AUTH FUNCTIONS AND INSTALL OURS
        console.log('💀 Killing all other auth functions...');
        
        // Delete any existing auth functions
        delete window.handleSignIn;
        delete window.handleSignUp;
        delete window.signOut;
        delete window.updateAuthUI;
        
        // Install our functions
        window.handleSignIn = finalSignIn;
        window.handleSignUp = finalSignUp;
        window.signOut = finalSignOut;
        window.updateAuthUI = forceUpdateUI;
        
        // Make them non-configurable so they can't be overridden
        Object.defineProperty(window, 'handleSignIn', {
            value: finalSignIn,
            writable: false,
            configurable: false
        });
        
        Object.defineProperty(window, 'handleSignUp', {
            value: finalSignUp,
            writable: false,
            configurable: false
        });
        
        Object.defineProperty(window, 'signOut', {
            value: finalSignOut,
            writable: false,
            configurable: false
        });
        
        Object.defineProperty(window, 'updateAuthUI', {
            value: forceUpdateUI,
            writable: false,
            configurable: false
        });
        
        // Restore session if exists
        try {
            const saved = localStorage.getItem('visualVibeUser');
            if (saved) {
                window.currentUser = JSON.parse(saved);
                console.log('🔄 Session restored:', window.currentUser.name);
            }
        } catch (e) {}
        
        // Update UI
        forceUpdateUI();
        
        // Attach to forms (replace all existing listeners)
        setTimeout(() => {
            const signInForm = document.getElementById('signInForm');
            const signUpForm = document.getElementById('signUpForm');
            
            if (signInForm) {
                // Clone to remove ALL existing listeners
                const newSignInForm = signInForm.cloneNode(true);
                signInForm.parentNode.replaceChild(newSignInForm, signInForm);
                newSignInForm.addEventListener('submit', finalSignIn);
                console.log('✅ Final sign-in form attached');
            }
            
            if (signUpForm) {
                // Clone to remove ALL existing listeners
                const newSignUpForm = signUpForm.cloneNode(true);
                signUpForm.parentNode.replaceChild(newSignUpForm, signUpForm);
                newSignUpForm.addEventListener('submit', finalSignUp);
                console.log('✅ Final sign-up form attached');
            }
        }, 500);
        
        // Keep UI updated
        setInterval(forceUpdateUI, 3000);
        
        console.log('🚀 FINAL AUTH OVERRIDE - COMPLETE AND LOCKED');
        
        // Debug functions
        window.debugFinalAuth = function() {
            console.log('=== FINAL AUTH DEBUG ===');
            console.log('Current User:', window.currentUser);
            console.log('All Users:', Storage.getAllUsers());
            console.log('Auth Functions:', {
                handleSignIn: typeof window.handleSignIn,
                handleSignUp: typeof window.handleSignUp,
                signOut: typeof window.signOut,
                updateAuthUI: typeof window.updateAuthUI
            });
        };
        
        window.createDebugUser = function() {
            const testUser = {
                id: 'debug-user',
                name: 'Debug User',
                firstName: 'Debug',
                lastName: 'User',
                email: 'debug@test.com',
                password: 'debug123',
                orders: [],
                reviews: [],
                createdAt: new Date().toISOString()
            };
            
            const allUsers = [...Storage.getAllUsers(), testUser];
            localStorage.setItem('visualVibeUsers', JSON.stringify(allUsers));
            localStorage.setItem('visualVibeUsers_v3', JSON.stringify(allUsers));
            
            console.log('✅ Debug user created: debug@test.com / debug123');
        };
        
    }, 5000); // Wait 5 seconds for all other scripts to load first
    
})();
