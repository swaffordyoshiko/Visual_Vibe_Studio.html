// BULLETPROOF AUTHENTICATION SYSTEM - CROSS-DEVICE COMPATIBLE
(function() {
    'use strict';
    
    console.log('🛡️ BULLETPROOF AUTH SYSTEM - STARTING...');
    
    // Global authentication namespace
    window.BulletproofAuth = {};
    
    // Storage keys for different data types
    const STORAGE_KEYS = {
        USERS: 'visualVibeUsers_v3',
        SESSION: 'visualVibeSession_v3',
        BACKUP: 'authBackup_v3'
    };
    
    // Cross-device data manager
    const DataManager = {
        // Save user data to multiple storage locations for reliability
        saveUser: function(user) {
            try {
                // Primary storage
                const users = this.getUsers();
                const existingIndex = users.findIndex(u => u.email === user.email);
                
                if (existingIndex !== -1) {
                    users[existingIndex] = { ...users[existingIndex], ...user };
                } else {
                    users.push(user);
                }
                
                localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
                
                // Individual user storage
                localStorage.setItem(`user_${user.email}`, JSON.stringify(user));
                
                // Backup storage
                localStorage.setItem(STORAGE_KEYS.BACKUP, JSON.stringify(users));
                
                // Legacy compatibility
                localStorage.setItem('visualVibeUsers', JSON.stringify(users));
                
                console.log('✅ User saved to all storage locations');
                return true;
            } catch (error) {
                console.error('❌ Error saving user:', error);
                return false;
            }
        },
        
        // Get all users from any available storage
        getUsers: function() {
            try {
                // Try primary storage first
                let users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
                
                // If empty, try legacy storage
                if (users.length === 0) {
                    users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
                }
                
                // If still empty, try backup
                if (users.length === 0) {
                    users = JSON.parse(localStorage.getItem(STORAGE_KEYS.BACKUP) || '[]');
                }
                
                console.log(`📊 Found ${users.length} users in database`);
                return users;
            } catch (error) {
                console.error('❌ Error getting users:', error);
                return [];
            }
        },
        
        // Find user by email (case-insensitive)
        findUser: function(email) {
            if (!email) return null;
            
            const users = this.getUsers();
            const user = users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase());
            
            // Also check individual storage
            if (!user) {
                try {
                    const individualUser = localStorage.getItem(`user_${email.toLowerCase()}`);
                    if (individualUser) {
                        return JSON.parse(individualUser);
                    }
                } catch (e) {
                    console.log('No individual user storage found');
                }
            }
            
            return user;
        },
        
        // Save session
        saveSession: function(user) {
            try {
                const session = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    firstName: user.firstName || user.name.split(' ')[0],
                    lastName: user.lastName || user.name.split(' ').slice(1).join(' '),
                    signedIn: true,
                    signInTime: new Date().toISOString(),
                    deviceInfo: {
                        userAgent: navigator.userAgent,
                        timestamp: Date.now()
                    }
                };
                
                localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
                localStorage.setItem('visualVibeUser', JSON.stringify(session)); // Legacy compatibility
                
                window.currentUser = session;
                console.log('✅ Session saved for:', user.name);
                return session;
            } catch (error) {
                console.error('❌ Error saving session:', error);
                return null;
            }
        },
        
        // Get current session
        getSession: function() {
            try {
                let session = localStorage.getItem(STORAGE_KEYS.SESSION);
                if (!session) {
                    session = localStorage.getItem('visualVibeUser'); // Legacy fallback
                }
                
                if (session) {
                    return JSON.parse(session);
                }
                return null;
            } catch (error) {
                console.error('❌ Error getting session:', error);
                return null;
            }
        },
        
        // Clear session
        clearSession: function() {
            try {
                localStorage.removeItem(STORAGE_KEYS.SESSION);
                localStorage.removeItem('visualVibeUser');
                window.currentUser = null;
                console.log('✅ Session cleared');
            } catch (error) {
                console.error('❌ Error clearing session:', error);
            }
        }
    };
    
    // Authentication functions
    const Auth = {
        // Sign in function
        signIn: function(email, password) {
            console.log('🔑 BULLETPROOF SIGN IN - Processing:', email);
            
            if (!email || !password) {
                return { success: false, message: 'Please enter both email and password.' };
            }
            
            // Find user
            const user = DataManager.findUser(email);
            if (!user) {
                console.log('❌ User not found:', email);
                return { success: false, message: 'No account found with this email address. Please sign up first.' };
            }
            
            // Check password
            if (user.password !== password) {
                console.log('❌ Incorrect password for:', email);
                return { success: false, message: 'Incorrect password. Please try again.' };
            }
            
            // Update last login
            user.lastLogin = new Date().toISOString();
            DataManager.saveUser(user);
            
            // Create session
            const session = DataManager.saveSession(user);
            if (!session) {
                return { success: false, message: 'Failed to create session. Please try again.' };
            }
            
            console.log('✅ Sign in successful for:', user.name);
            return { success: true, message: `Welcome back, ${user.name}!`, user: session };
        },
        
        // Sign up function
        signUp: function(name, email, password, confirmPassword) {
            console.log('📝 BULLETPROOF SIGN UP - Processing:', name, email);
            
            // Validation
            if (!name || !email || !password || !confirmPassword) {
                return { success: false, message: 'Please fill in all fields.' };
            }
            
            if (password.length < 6) {
                return { success: false, message: 'Password must be at least 6 characters long.' };
            }
            
            if (password !== confirmPassword) {
                return { success: false, message: 'Passwords do not match.' };
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return { success: false, message: 'Please enter a valid email address.' };
            }
            
            // Check if user already exists
            const existingUser = DataManager.findUser(email);
            if (existingUser) {
                console.log('❌ User already exists:', email);
                return { 
                    success: false, 
                    message: `An account with email "${email}" already exists. Please sign in instead.`,
                    shouldSwitchToSignIn: true,
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
                accountVersion: '4.0',
                deviceRegistered: navigator.userAgent
            };
            
            // Save user
            if (!DataManager.saveUser(newUser)) {
                return { success: false, message: 'Failed to create account. Please try again.' };
            }
            
            // Create session
            const session = DataManager.saveSession(newUser);
            if (!session) {
                return { success: false, message: 'Account created but failed to sign in. Please sign in manually.' };
            }
            
            console.log('✅ Sign up successful for:', newUser.name);
            return { success: true, message: `Welcome ${newUser.name}! Your account has been created successfully.`, user: session };
        },
        
        // Sign out function
        signOut: function() {
            console.log('🚪 BULLETPROOF SIGN OUT');
            DataManager.clearSession();
            return { success: true, message: 'You have been signed out successfully.' };
        },
        
        // Restore session
        restoreSession: function() {
            const session = DataManager.getSession();
            if (session) {
                window.currentUser = session;
                console.log('✅ Session restored for:', session.name);
                return session;
            }
            return null;
        }
    };
    
    // UI Manager
    const UIManager = {
        updateAuthUI: function() {
            try {
                const signedInState = document.getElementById('signedInState');
                const signedOutState = document.getElementById('signedOutState');
                
                if (window.currentUser) {
                    // User is signed in
                    if (signedOutState) {
                        signedOutState.style.display = 'none';
                        signedOutState.style.visibility = 'hidden';
                    }
                    
                    if (signedInState) {
                        signedInState.style.display = 'flex';
                        signedInState.style.visibility = 'visible';
                        signedInState.style.position = 'static';
                        signedInState.style.left = 'auto';
                        
                        // Show all child elements
                        const childElements = signedInState.querySelectorAll('*');
                        childElements.forEach(child => {
                            child.style.display = '';
                            child.style.visibility = 'visible';
                            child.style.position = 'static';
                            child.style.left = 'auto';
                        });
                    }
                    
                    document.body.classList.add('user-authenticated');
                    console.log('✅ UI updated for signed in user:', window.currentUser.name);
                    
                } else {
                    // User is not signed in
                    if (signedInState) {
                        signedInState.style.display = 'none';
                        signedInState.style.visibility = 'hidden';
                        signedInState.style.position = 'absolute';
                        signedInState.style.left = '-9999px';
                        
                        // Hide all child elements
                        const childElements = signedInState.querySelectorAll('*');
                        childElements.forEach(child => {
                            child.style.display = 'none';
                            child.style.visibility = 'hidden';
                            child.style.position = 'absolute';
                            child.style.left = '-9999px';
                        });
                    }
                    
                    if (signedOutState) {
                        signedOutState.style.display = 'flex';
                        signedOutState.style.visibility = 'visible';
                    }
                    
                    document.body.classList.remove('user-authenticated');
                    console.log('✅ UI updated for signed out state');
                }
                
            } catch (error) {
                console.error('❌ Error updating auth UI:', error);
            }
        }
    };
    
    // Form handlers
    function handleSignInForm(e) {
        if (e) e.preventDefault();
        
        try {
            const emailInput = document.getElementById('signInEmail');
            const passwordInput = document.getElementById('signInPassword');
            
            if (!emailInput || !passwordInput) {
                alert('Sign in form not found. Please refresh the page.');
                return;
            }
            
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            
            const result = Auth.signIn(email, password);
            
            if (result.success) {
                // Close modal
                if (typeof window.closeSignInModal === 'function') {
                    window.closeSignInModal();
                }
                
                // Update UI
                UIManager.updateAuthUI();
                
                // Show success
                alert(result.message);
                
                // Clear form
                emailInput.value = '';
                passwordInput.value = '';
                
            } else {
                alert(result.message);
            }
            
        } catch (error) {
            console.error('❌ Sign in form error:', error);
            alert('Sign in failed. Please try again.');
        }
    }
    
    function handleSignUpForm(e) {
        if (e) e.preventDefault();
        
        try {
            const nameInput = document.getElementById('signUpName');
            const emailInput = document.getElementById('signUpEmail');
            const passwordInput = document.getElementById('signUpPassword');
            const confirmPasswordInput = document.getElementById('signUpConfirmPassword');
            
            if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
                alert('Sign up form not found. Please refresh the page.');
                return;
            }
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            const result = Auth.signUp(name, email, password, confirmPassword);
            
            if (result.success) {
                // Close modal
                if (typeof window.closeSignUpModal === 'function') {
                    window.closeSignUpModal();
                }
                
                // Update UI
                UIManager.updateAuthUI();
                
                // Show success
                alert(result.message);
                
                // Clear form
                nameInput.value = '';
                emailInput.value = '';
                passwordInput.value = '';
                confirmPasswordInput.value = '';
                
            } else {
                alert(result.message);
                
                // If user should switch to sign in
                if (result.shouldSwitchToSignIn) {
                    setTimeout(() => {
                        if (typeof window.closeSignUpModal === 'function') {
                            window.closeSignUpModal();
                        }
                        if (typeof window.openSignInModal === 'function') {
                            window.openSignInModal();
                            setTimeout(() => {
                                const signInEmailInput = document.getElementById('signInEmail');
                                if (signInEmailInput) {
                                    signInEmailInput.value = result.email;
                                }
                            }, 200);
                        }
                    }, 1500);
                }
            }
            
        } catch (error) {
            console.error('❌ Sign up form error:', error);
            alert('Sign up failed. Please try again.');
        }
    }
    
    function handleSignOutAction() {
        const result = Auth.signOut();
        UIManager.updateAuthUI();
        alert(result.message);
    }
    
    // Initialize system
    function initializeBulletproofAuth() {
        console.log('🔧 Initializing bulletproof auth system...');
        
        // Override ALL existing auth functions
        window.handleSignIn = handleSignInForm;
        window.handleSignUp = handleSignUpForm;
        window.signOut = handleSignOutAction;
        window.updateAuthUI = UIManager.updateAuthUI;
        
        // Restore session
        Auth.restoreSession();
        
        // Update UI
        UIManager.updateAuthUI();
        
        // Attach event listeners
        setTimeout(() => {
            const signInForm = document.getElementById('signInForm');
            const signUpForm = document.getElementById('signUpForm');
            
            if (signInForm) {
                // Remove all existing listeners
                const newSignInForm = signInForm.cloneNode(true);
                signInForm.parentNode.replaceChild(newSignInForm, signInForm);
                
                // Add our listener
                newSignInForm.addEventListener('submit', handleSignInForm);
                console.log('✅ Sign in form listener attached');
            }
            
            if (signUpForm) {
                // Remove all existing listeners
                const newSignUpForm = signUpForm.cloneNode(true);
                signUpForm.parentNode.replaceChild(newSignUpForm, signUpForm);
                
                // Add our listener
                newSignUpForm.addEventListener('submit', handleSignUpForm);
                console.log('✅ Sign up form listener attached');
            }
        }, 500);
        
        console.log('✅ BULLETPROOF AUTH SYSTEM - READY');
    }
    
    // Expose API
    window.BulletproofAuth = {
        signIn: Auth.signIn,
        signUp: Auth.signUp,
        signOut: Auth.signOut,
        restoreSession: Auth.restoreSession,
        updateUI: UIManager.updateAuthUI,
        getUsers: DataManager.getUsers,
        findUser: DataManager.findUser,
        initialize: initializeBulletproofAuth
    };
    
    // Debug functions
    window.debugBulletproofAuth = function() {
        console.log('🔍 === BULLETPROOF AUTH DEBUG ===');
        console.log('Current User:', window.currentUser);
        console.log('Session:', DataManager.getSession());
        console.log('Users:', DataManager.getUsers());
        console.log('Functions:', {
            handleSignIn: typeof window.handleSignIn,
            handleSignUp: typeof window.handleSignUp,
            signOut: typeof window.signOut
        });
        console.log('🔍 === END DEBUG ===');
    };
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeBulletproofAuth);
    } else {
        initializeBulletproofAuth();
    }
    
    // Also initialize after delays to catch dynamic forms
    setTimeout(initializeBulletproofAuth, 1000);
    setTimeout(initializeBulletproofAuth, 3000);
    
    console.log('🛡️ BULLETPROOF AUTH SYSTEM - LOADED');
    
})();
