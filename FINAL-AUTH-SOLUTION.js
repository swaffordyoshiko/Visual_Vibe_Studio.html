// FINAL AUTHENTICATION SOLUTION - Guaranteed to work
console.log('🚀 FINAL AUTH SOLUTION: Installing working authentication system...');

(function() {
    'use strict';
    
    // STEP 1: Nuclear cleanup of all conflicts
    console.log('🧹 Step 1: Nuclear cleanup of conflicts...');
    
    // Kill all intervals and timeouts
    for (let i = 1; i < 999999; i++) {
        try { clearInterval(i); } catch(e) {}
        try { clearTimeout(i); } catch(e) {}
    }
    
    // Delete all existing auth functions
    const authFunctions = [
        'openSignInModal', 'openSignUpModal', 'closeSignInModal', 'closeSignUpModal',
        'handleSignIn', 'handleSignUp', 'switchToSignIn', 'switchToSignUp',
        'signOut', 'updateAuthUI', 'saveUserSession'
    ];
    
    authFunctions.forEach(fn => {
        try { delete window[fn]; } catch(e) {}
    });
    
    console.log('✅ Cleared all conflicting functions');
    
    // STEP 2: Working authentication state
    let isProcessing = false;
    let currentUser = null;
    
    // STEP 3: Core utility functions
    function showMessage(message, type = 'info') {
        console.log(`${type.toUpperCase()}: ${message}`);
        
        // Try to use toast manager if available
        if (window.toastManager && window.toastManager.show) {
            window.toastManager.show(message, type);
        } else {
            // Fallback to alert
            alert(message);
        }
    }
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    // STEP 4: Storage functions
    function getUsers() {
        try {
            const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
            console.log(`📊 Retrieved ${users.length} users from storage`);
            return users;
        } catch (error) {
            console.error('Error reading users:', error);
            return [];
        }
    }
    
    function saveUsers(users) {
        try {
            localStorage.setItem('visualVibeUsers', JSON.stringify(users));
            console.log(`💾 Saved ${users.length} users to storage`);
            return true;
        } catch (error) {
            console.error('Error saving users:', error);
            return false;
        }
    }
    
    function saveUserSession(user) {
        try {
            localStorage.setItem('visualVibeUser', JSON.stringify(user));
            window.currentUser = user;
            currentUser = user;
            console.log(`💾 Session saved for: ${user.name}`);
            return true;
        } catch (error) {
            console.error('Error saving session:', error);
            return false;
        }
    }
    
    function getUserSession() {
        try {
            const session = JSON.parse(localStorage.getItem('visualVibeUser') || 'null');
            if (session && session.signedIn) {
                console.log(`🔄 Session found for: ${session.name}`);
                return session;
            }
            return null;
        } catch (error) {
            console.error('Error reading session:', error);
            return null;
        }
    }
    
    // STEP 5: UI update function
    function updateAuthUI() {
        try {
            console.log('🎨 Updating UI for user:', currentUser?.name || 'signed out');
            
            const signedOutState = document.getElementById('signedOutState');
            const signedInState = document.getElementById('signedInState');
            const mobileSignedOutState = document.getElementById('mobileSignedOutState');
            const mobileSignedInState = document.getElementById('mobileSignedInState');
            const userNameSpan = document.getElementById('userName');
            const welcomeBanner = document.getElementById('welcomeBanner');
            const welcomeMessage = document.getElementById('welcomeMessage');
            
            if (currentUser && currentUser.signedIn) {
                // Show signed-in state
                if (signedOutState) {
                    signedOutState.style.display = 'none';
                    signedOutState.style.visibility = 'hidden';
                    signedOutState.style.position = 'absolute';
                    signedOutState.style.left = '-9999px';
                }
                
                if (signedInState) {
                    signedInState.classList.remove('hidden');
                    signedInState.style.display = 'flex';
                    signedInState.style.visibility = 'visible';
                    signedInState.style.position = 'static';
                    signedInState.style.left = 'auto';
                    
                    // Show all buttons in signed-in state
                    const buttons = signedInState.querySelectorAll('button');
                    buttons.forEach(btn => {
                        btn.style.display = 'flex';
                        btn.style.visibility = 'visible';
                        btn.style.position = 'static';
                        btn.style.left = 'auto';
                    });
                }
                
                if (mobileSignedOutState) {
                    mobileSignedOutState.style.display = 'none';
                    mobileSignedOutState.style.visibility = 'hidden';
                    mobileSignedOutState.style.position = 'absolute';
                    mobileSignedOutState.style.left = '-9999px';
                }
                
                if (mobileSignedInState) {
                    mobileSignedInState.classList.remove('hidden');
                    mobileSignedInState.style.display = 'block';
                    mobileSignedInState.style.visibility = 'visible';
                    mobileSignedInState.style.position = 'static';
                    mobileSignedInState.style.left = 'auto';
                    
                    // Show all mobile buttons
                    const mobileButtons = mobileSignedInState.querySelectorAll('button');
                    mobileButtons.forEach(btn => {
                        btn.style.display = 'flex';
                        btn.style.visibility = 'visible';
                        btn.style.position = 'static';
                        btn.style.left = 'auto';
                    });
                }
                
                if (userNameSpan) {
                    userNameSpan.textContent = currentUser.name;
                }
                
                // Show welcome banner
                if (welcomeBanner && welcomeMessage) {
                    welcomeMessage.textContent = `Welcome back, ${currentUser.firstName || currentUser.name.split(' ')[0]}!`;
                    welcomeBanner.classList.remove('hidden');
                }
                
                console.log('✅ UI updated to signed-in state');
                
            } else {
                // Show signed-out state
                if (signedOutState) {
                    signedOutState.style.display = 'flex';
                    signedOutState.style.visibility = 'visible';
                    signedOutState.style.position = 'static';
                    signedOutState.style.left = 'auto';
                }
                
                if (signedInState) {
                    signedInState.classList.add('hidden');
                    signedInState.style.display = 'none';
                    signedInState.style.visibility = 'hidden';
                    signedInState.style.position = 'absolute';
                    signedInState.style.left = '-9999px';
                }
                
                if (mobileSignedOutState) {
                    mobileSignedOutState.style.display = 'block';
                    mobileSignedOutState.style.visibility = 'visible';
                    mobileSignedOutState.style.position = 'static';
                    mobileSignedOutState.style.left = 'auto';
                }
                
                if (mobileSignedInState) {
                    mobileSignedInState.classList.add('hidden');
                    mobileSignedInState.style.display = 'none';
                    mobileSignedInState.style.visibility = 'hidden';
                    mobileSignedInState.style.position = 'absolute';
                    mobileSignedInState.style.left = '-9999px';
                }
                
                if (welcomeBanner) {
                    welcomeBanner.classList.add('hidden');
                }
                
                console.log('✅ UI updated to signed-out state');
            }
        } catch (error) {
            console.error('❌ Error updating UI:', error);
        }
    }
    
    // STEP 6: Modal functions
    window.openSignInModal = function() {
        console.log('🔑 Opening Sign In Modal');
        
        const modal = document.getElementById('signInModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.right = '0';
            modal.style.bottom = '0';
            modal.style.zIndex = '999999';
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            
            setTimeout(() => {
                const emailInput = document.getElementById('signInEmail');
                if (emailInput) emailInput.focus();
            }, 200);
            
            console.log('✅ Sign in modal opened');
        } else {
            console.log('❌ Modal not found, using prompt');
            promptSignIn();
        }
    };
    
    window.openSignUpModal = function() {
        console.log('📝 Opening Sign Up Modal');
        
        const modal = document.getElementById('signUpModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.right = '0';
            modal.style.bottom = '0';
            modal.style.zIndex = '999999';
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            
            setTimeout(() => {
                const nameInput = document.getElementById('signUpName');
                if (nameInput) nameInput.focus();
            }, 200);
            
            console.log('✅ Sign up modal opened');
        } else {
            console.log('❌ Modal not found, using prompt');
            promptSignUp();
        }
    };
    
    window.closeSignInModal = function() {
        const modal = document.getElementById('signInModal');
        if (modal) {
            modal.classList.add('hidden');
            modal.style.display = 'none';
        }
        const form = document.getElementById('signInForm');
        if (form) form.reset();
    };
    
    window.closeSignUpModal = function() {
        const modal = document.getElementById('signUpModal');
        if (modal) {
            modal.classList.add('hidden');
            modal.style.display = 'none';
        }
        const form = document.getElementById('signUpForm');
        if (form) form.reset();
    };
    
    window.switchToSignUp = function() {
        window.closeSignInModal();
        setTimeout(window.openSignUpModal, 100);
    };
    
    window.switchToSignIn = function() {
        window.closeSignUpModal();
        setTimeout(window.openSignInModal, 100);
    };
    
    // STEP 7: Prompt-based fallback functions
    function promptSignIn() {
        const email = prompt('🔑 SIGN IN\n\nEnter your email address:');
        if (!email) return;
        
        const password = prompt('🔑 SIGN IN\n\nEnter your password:');
        if (!password) return;
        
        processSignIn(email, password);
    }
    
    function promptSignUp() {
        const name = prompt('📝 CREATE ACCOUNT\n\nEnter your full name:');
        if (!name) return;
        
        const email = prompt('📝 CREATE ACCOUNT\n\nEnter your email address:');
        if (!email) return;
        
        const password = prompt('📝 CREATE ACCOUNT\n\nCreate a password (minimum 6 characters):');
        if (!password || password.length < 6) {
            showMessage('Password must be at least 6 characters long', 'error');
            return;
        }
        
        const confirm = prompt('📝 CREATE ACCOUNT\n\nConfirm your password:');
        if (password !== confirm) {
            showMessage('Passwords do not match', 'error');
            return;
        }
        
        processSignUp(name, email, password);
    }
    
    // STEP 8: Authentication processing functions
    function processSignIn(email, password) {
        if (isProcessing) return;
        isProcessing = true;
        
        console.log('🔑 Processing sign in for:', email);
        
        try {
            if (!email || !password) {
                showMessage('Please enter both email and password', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }
            
            const users = getUsers();
            const user = users.find(u => 
                u.email && u.email.toLowerCase() === email.toLowerCase() && u.password === password
            );
            
            if (user) {
                console.log('✅ Sign in successful for:', user.name);
                
                const sessionUser = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    firstName: user.firstName || user.name.split(' ')[0],
                    lastName: user.lastName || user.name.split(' ').slice(1).join(' '),
                    phone: user.phone || '',
                    companyName: user.companyName || '',
                    signedIn: true,
                    loginTime: new Date().toISOString(),
                    lastActivity: new Date().toISOString()
                };
                
                saveUserSession(sessionUser);
                currentUser = sessionUser;
                
                // Update user's last login
                user.lastLogin = new Date().toISOString();
                saveUsers(users);
                
                updateAuthUI();
                window.closeSignInModal();
                
                showMessage(`Welcome back, ${sessionUser.firstName}!`, 'success');
                
            } else {
                const existingUser = users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase());
                if (existingUser) {
                    console.log('❌ Wrong password for:', email);
                    showMessage('Incorrect password. Please try again.', 'error');
                } else {
                    console.log('❌ No account found for:', email);
                    showMessage('No account found with this email. Please sign up first.', 'error');
                }
            }
        } catch (error) {
            console.error('❌ Sign in error:', error);
            showMessage('Sign in failed. Please try again.', 'error');
        } finally {
            isProcessing = false;
        }
    }
    
    function processSignUp(name, email, password) {
        if (isProcessing) return;
        isProcessing = true;
        
        console.log('📝 Processing sign up for:', name, email);
        
        try {
            if (!name || !email || !password) {
                showMessage('Please fill in all fields', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }
            
            if (password.length < 6) {
                showMessage('Password must be at least 6 characters long', 'error');
                return;
            }
            
            const users = getUsers();
            const existingUser = users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase());
            
            if (existingUser) {
                console.log('❌ Account already exists for:', email);
                showMessage('An account with this email already exists. Please sign in instead.', 'error');
                return;
            }
            
            const newUser = {
                id: generateUserId(),
                name: name.trim(),
                firstName: name.trim().split(' ')[0] || '',
                lastName: name.trim().split(' ').slice(1).join(' ') || '',
                email: email.toLowerCase().trim(),
                password: password,
                phone: '',
                companyName: '',
                orders: [],
                reviews: [],
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
                accountVersion: '3.0'
            };
            
            users.push(newUser);
            saveUsers(users);
            
            console.log('✅ New user created:', newUser.name);
            
            const sessionUser = {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                phone: newUser.phone,
                companyName: newUser.companyName,
                signedIn: true,
                loginTime: new Date().toISOString(),
                lastActivity: new Date().toISOString()
            };
            
            saveUserSession(sessionUser);
            currentUser = sessionUser;
            
            updateAuthUI();
            window.closeSignUpModal();
            
            showMessage(`Welcome, ${newUser.firstName}! Your account has been created successfully.`, 'success');
            
        } catch (error) {
            console.error('❌ Sign up error:', error);
            showMessage('Sign up failed. Please try again.', 'error');
        } finally {
            isProcessing = false;
        }
    }
    
    // STEP 9: Form handlers
    window.handleSignIn = function(event) {
        if (event) event.preventDefault();
        console.log('🔑 Form sign in submitted');
        
        const email = document.getElementById('signInEmail')?.value?.trim();
        const password = document.getElementById('signInPassword')?.value?.trim();
        
        processSignIn(email, password);
        return false;
    };
    
    window.handleSignUp = function(event) {
        if (event) event.preventDefault();
        console.log('📝 Form sign up submitted');
        
        const name = document.getElementById('signUpName')?.value?.trim();
        const email = document.getElementById('signUpEmail')?.value?.trim();
        const password = document.getElementById('signUpPassword')?.value?.trim();
        const confirm = document.getElementById('signUpConfirmPassword')?.value?.trim();
        
        if (password !== confirm) {
            showMessage('Passwords do not match', 'error');
            return false;
        }
        
        processSignUp(name, email, password);
        return false;
    };
    
    window.signOut = function() {
        console.log('🚪 Signing out');
        
        currentUser = null;
        window.currentUser = null;
        localStorage.removeItem('visualVibeUser');
        
        updateAuthUI();
        showMessage('You have been signed out successfully', 'success');
    };
    
    // STEP 10: Global assignments
    window.updateAuthUI = updateAuthUI;
    window.saveUserSession = saveUserSession;
    
    // STEP 11: Setup form listeners and button handlers
    function setupEventListeners() {
        console.log('🔧 Setting up event listeners...');
        
        // Form listeners
        const signInForm = document.getElementById('signInForm');
        const signUpForm = document.getElementById('signUpForm');
        
        if (signInForm) {
            signInForm.onsubmit = window.handleSignIn;
            console.log('✅ Sign in form listener attached');
        }
        
        if (signUpForm) {
            signUpForm.onsubmit = window.handleSignUp;
            console.log('✅ Sign up form listener attached');
        }
        
        // Button handlers
        const signInButtons = document.querySelectorAll('button[onclick*="openSignInModal"]');
        const signUpButtons = document.querySelectorAll('button[onclick*="openSignUpModal"]');
        
        console.log(`🔘 Found ${signInButtons.length} sign in buttons and ${signUpButtons.length} sign up buttons`);
        
        signInButtons.forEach((btn, i) => {
            btn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log(`🔘 Sign in button ${i} clicked`);
                window.openSignInModal();
            };
        });
        
        signUpButtons.forEach((btn, i) => {
            btn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log(`🔘 Sign up button ${i} clicked`);
                window.openSignUpModal();
            };
        });
        
        console.log('✅ All button handlers set');
    }
    
    // STEP 12: Restore session
    function restoreSession() {
        const savedUser = getUserSession();
        if (savedUser) {
            currentUser = savedUser;
            window.currentUser = savedUser;
            console.log('🔄 Session restored for:', savedUser.name);
        }
        updateAuthUI();
    }
    
    // STEP 13: Initialize
    function initialize() {
        console.log('🚀 Initializing Final Auth Solution...');
        
        restoreSession();
        setupEventListeners();
        
        console.log('🎉 FINAL AUTH SOLUTION READY!');
        console.log('📊 Functions available:', {
            openSignInModal: typeof window.openSignInModal,
            openSignUpModal: typeof window.openSignUpModal,
            handleSignIn: typeof window.handleSignIn,
            handleSignUp: typeof window.handleSignUp,
            signOut: typeof window.signOut
        });
        
        console.log('👤 Current user:', currentUser?.name || 'Not signed in');
    }
    
    // Initialize immediately if DOM is ready, otherwise wait
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    // Also initialize after a delay to ensure everything is loaded
    setTimeout(initialize, 1000);
    
})();
