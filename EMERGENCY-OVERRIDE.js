// EMERGENCY OVERRIDE - Works despite HTML errors and script conflicts
console.log('🚨 EMERGENCY OVERRIDE: Forcing authentication to work...');

// IMMEDIATE EXECUTION - Don't wait for anything
(function() {
    'use strict';
    
    // Kill all intervals and timeouts that might interfere
    for (let i = 1; i < 999999; i++) {
        try { clearInterval(i); } catch(e) {}
        try { clearTimeout(i); } catch(e) {}
    }
    
    console.log('🔥 EMERGENCY: Cleared all timers and intervals');
    
    // Force define working functions immediately
    function forceDefineAuthFunctions() {
        console.log('🔧 EMERGENCY: Force defining auth functions...');
        
        // Nuclear option - completely redefine everything
        window.openSignInModal = function() {
            console.log('🔑 EMERGENCY: Force opening sign in modal');
            
            // Try to find and show the modal
            const modal = document.getElementById('signInModal');
            if (modal) {
                console.log('✅ Found sign in modal, showing it');
                modal.classList.remove('hidden');
                modal.style.display = 'flex';
                modal.style.position = 'fixed';
                modal.style.top = '0';
                modal.style.left = '0';
                modal.style.right = '0';
                modal.style.bottom = '0';
                modal.style.zIndex = '999999';
                modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
                
                // Focus email input
                setTimeout(() => {
                    const emailInput = document.getElementById('signInEmail');
                    if (emailInput) emailInput.focus();
                }, 200);
            } else {
                console.log('❌ Modal not found, using prompt fallback');
                // Fallback to prompt
                emergencySignInPrompt();
            }
        };
        
        window.openSignUpModal = function() {
            console.log('📝 EMERGENCY: Force opening sign up modal');
            
            // Try to find and show the modal
            const modal = document.getElementById('signUpModal');
            if (modal) {
                console.log('✅ Found sign up modal, showing it');
                modal.classList.remove('hidden');
                modal.style.display = 'flex';
                modal.style.position = 'fixed';
                modal.style.top = '0';
                modal.style.left = '0';
                modal.style.right = '0';
                modal.style.bottom = '0';
                modal.style.zIndex = '999999';
                modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
                
                // Focus name input
                setTimeout(() => {
                    const nameInput = document.getElementById('signUpName');
                    if (nameInput) nameInput.focus();
                }, 200);
            } else {
                console.log('❌ Modal not found, using prompt fallback');
                // Fallback to prompt
                emergencySignUpPrompt();
            }
        };
        
        window.closeSignInModal = function() {
            const modal = document.getElementById('signInModal');
            if (modal) {
                modal.classList.add('hidden');
                modal.style.display = 'none';
            }
        };
        
        window.closeSignUpModal = function() {
            const modal = document.getElementById('signUpModal');
            if (modal) {
                modal.classList.add('hidden');
                modal.style.display = 'none';
            }
        };
        
        // Emergency prompt-based authentication
        function emergencySignInPrompt() {
            const email = prompt('🔑 SIGN IN\n\nEnter your email address:');
            if (!email) return;
            
            const password = prompt('🔑 SIGN IN\n\nEnter your password:');
            if (!password) return;
            
            processSignIn(email, password);
        }
        
        function emergencySignUpPrompt() {
            const name = prompt('📝 CREATE ACCOUNT\n\nEnter your full name:');
            if (!name) return;
            
            const email = prompt('📝 CREATE ACCOUNT\n\nEnter your email address:');
            if (!email) return;
            
            const password = prompt('📝 CREATE ACCOUNT\n\nCreate a password (minimum 6 characters):');
            if (!password || password.length < 6) {
                alert('Password must be at least 6 characters long');
                return;
            }
            
            const confirm = prompt('📝 CREATE ACCOUNT\n\nConfirm your password:');
            if (password !== confirm) {
                alert('Passwords do not match');
                return;
            }
            
            processSignUp(name, email, password);
        }
        
        // Processing functions
        function processSignIn(email, password) {
            console.log('🔑 EMERGENCY: Processing sign in for', email);
            
            try {
                const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
                console.log(`🔍 Found ${users.length} users in storage`);
                
                const user = users.find(u => 
                    u.email && u.email.toLowerCase() === email.toLowerCase() && u.password === password
                );
                
                if (user) {
                    console.log('✅ EMERGENCY: Sign in successful for', user.name);
                    
                    const sessionUser = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        firstName: user.firstName || user.name.split(' ')[0],
                        signedIn: true,
                        loginTime: new Date().toISOString()
                    };
                    
                    // Save session
                    window.currentUser = sessionUser;
                    localStorage.setItem('visualVibeUser', JSON.stringify(sessionUser));
                    
                    // Update UI immediately
                    forceUpdateUI();
                    window.closeSignInModal();
                    
                    alert(`🎉 Welcome back, ${sessionUser.firstName}!\n\nYou are now signed in to your account.`);
                    
                } else {
                    const existingUser = users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase());
                    if (existingUser) {
                        alert('❌ Incorrect password\n\nPlease check your password and try again.');
                    } else {
                        alert('❌ No account found\n\nNo account exists with this email address. Please sign up first.');
                    }
                }
            } catch (error) {
                console.error('❌ EMERGENCY: Sign in error:', error);
                alert('❌ Sign in failed\n\nThere was an error signing you in. Please try again.');
            }
        }
        
        function processSignUp(name, email, password) {
            console.log('📝 EMERGENCY: Processing sign up for', name, email);
            
            try {
                const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
                
                // Check if user already exists
                const existingUser = users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase());
                if (existingUser) {
                    alert('❌ Account already exists\n\nAn account with this email already exists. Please sign in instead.');
                    return;
                }
                
                // Create new user
                const newUser = {
                    id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 8),
                    name: name,
                    firstName: name.split(' ')[0] || '',
                    lastName: name.split(' ').slice(1).join(' ') || '',
                    email: email,
                    password: password,
                    orders: [],
                    reviews: [],
                    createdAt: new Date().toISOString()
                };
                
                users.push(newUser);
                localStorage.setItem('visualVibeUsers', JSON.stringify(users));
                console.log('✅ EMERGENCY: New user created:', newUser.name);
                
                // Create session
                const sessionUser = {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    firstName: newUser.firstName,
                    signedIn: true,
                    loginTime: new Date().toISOString()
                };
                
                // Save session
                window.currentUser = sessionUser;
                localStorage.setItem('visualVibeUser', JSON.stringify(sessionUser));
                
                // Update UI immediately
                forceUpdateUI();
                window.closeSignUpModal();
                
                alert(`🎉 Welcome, ${newUser.firstName}!\n\nYour account has been created successfully. You are now signed in.`);
                
            } catch (error) {
                console.error('❌ EMERGENCY: Sign up error:', error);
                alert('❌ Sign up failed\n\nThere was an error creating your account. Please try again.');
            }
        }
        
        // Form handlers
        window.handleSignIn = function(event) {
            if (event) event.preventDefault();
            console.log('🔑 EMERGENCY: Form sign in submitted');
            
            const email = document.getElementById('signInEmail')?.value?.trim();
            const password = document.getElementById('signInPassword')?.value?.trim();
            
            if (!email || !password) {
                alert('Please enter both email and password');
                return false;
            }
            
            processSignIn(email, password);
            return false;
        };
        
        window.handleSignUp = function(event) {
            if (event) event.preventDefault();
            console.log('📝 EMERGENCY: Form sign up submitted');
            
            const name = document.getElementById('signUpName')?.value?.trim();
            const email = document.getElementById('signUpEmail')?.value?.trim();
            const password = document.getElementById('signUpPassword')?.value?.trim();
            const confirm = document.getElementById('signUpConfirmPassword')?.value?.trim();
            
            if (!name || !email || !password || !confirm) {
                alert('Please fill in all fields');
                return false;
            }
            
            if (password !== confirm) {
                alert('Passwords do not match');
                return false;
            }
            
            if (password.length < 6) {
                alert('Password must be at least 6 characters long');
                return false;
            }
            
            processSignUp(name, email, password);
            return false;
        };
        
        window.signOut = function() {
            console.log('🚪 EMERGENCY: Signing out');
            window.currentUser = null;
            localStorage.removeItem('visualVibeUser');
            forceUpdateUI();
            alert('✅ Signed out successfully');
        };
        
        // Force UI update
        function forceUpdateUI() {
            console.log('🎨 EMERGENCY: Force updating UI');
            
            try {
                const user = window.currentUser;
                const signedOutState = document.getElementById('signedOutState');
                const signedInState = document.getElementById('signedInState');
                const userNameSpan = document.getElementById('userName');
                
                console.log('🎨 EMERGENCY: UI update for user:', user?.name || 'signed out');
                
                if (user && user.signedIn) {
                    // Force show signed in state
                    if (signedOutState) {
                        signedOutState.style.display = 'none !important';
                        signedOutState.style.visibility = 'hidden';
                        signedOutState.style.position = 'absolute';
                        signedOutState.style.left = '-99999px';
                    }
                    
                    if (signedInState) {
                        signedInState.classList.remove('hidden');
                        signedInState.style.display = 'flex !important';
                        signedInState.style.visibility = 'visible';
                        signedInState.style.position = 'static';
                        signedInState.style.left = 'auto';
                    }
                    
                    if (userNameSpan) {
                        userNameSpan.textContent = user.name;
                    }
                    
                    console.log('✅ EMERGENCY: UI updated to signed in state');
                } else {
                    // Force show signed out state
                    if (signedOutState) {
                        signedOutState.style.display = 'flex !important';
                        signedOutState.style.visibility = 'visible';
                        signedOutState.style.position = 'static';
                        signedOutState.style.left = 'auto';
                    }
                    
                    if (signedInState) {
                        signedInState.classList.add('hidden');
                        signedInState.style.display = 'none';
                        signedInState.style.visibility = 'hidden';
                        signedInState.style.position = 'absolute';
                        signedInState.style.left = '-99999px';
                    }
                    
                    console.log('✅ EMERGENCY: UI updated to signed out state');
                }
            } catch (error) {
                console.error('❌ EMERGENCY: UI update error:', error);
            }
        }
        
        window.updateAuthUI = forceUpdateUI;
        
        console.log('✅ EMERGENCY: All auth functions defined');
        return true;
    }
    
    // Force execute immediately
    forceDefineAuthFunctions();
    
    // Set up form listeners after a brief delay
    setTimeout(() => {
        console.log('🔧 EMERGENCY: Setting up form listeners');
        
        const signInForm = document.getElementById('signInForm');
        const signUpForm = document.getElementById('signUpForm');
        
        if (signInForm) {
            signInForm.onsubmit = window.handleSignIn;
            console.log('✅ EMERGENCY: Sign in form listener set');
        }
        
        if (signUpForm) {
            signUpForm.onsubmit = window.handleSignUp;
            console.log('✅ EMERGENCY: Sign up form listener set');
        }
        
        // Force set button handlers
        const signInButtons = document.querySelectorAll('button[onclick*="openSignInModal"]');
        const signUpButtons = document.querySelectorAll('button[onclick*="openSignUpModal"]');
        
        console.log(`🔘 EMERGENCY: Found ${signInButtons.length} sign in buttons and ${signUpButtons.length} sign up buttons`);
        
        signInButtons.forEach((btn, i) => {
            btn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log(`🔘 EMERGENCY: Sign in button ${i} clicked`);
                window.openSignInModal();
            };
        });
        
        signUpButtons.forEach((btn, i) => {
            btn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log(`🔘 EMERGENCY: Sign up button ${i} clicked`);
                window.openSignUpModal();
            };
        });
        
        console.log('✅ EMERGENCY: Button handlers set');
    }, 100);
    
    // Restore session if exists
    setTimeout(() => {
        try {
            const savedUser = JSON.parse(localStorage.getItem('visualVibeUser') || 'null');
            if (savedUser && savedUser.signedIn) {
                window.currentUser = savedUser;
                window.updateAuthUI();
                console.log('🔄 EMERGENCY: Session restored for', savedUser.name);
            } else {
                window.updateAuthUI();
                console.log('🔄 EMERGENCY: No session to restore, showing signed out state');
            }
        } catch (error) {
            console.log('🔄 EMERGENCY: Session restore error:', error);
            window.updateAuthUI();
        }
    }, 200);
    
    console.log('🚨 EMERGENCY OVERRIDE COMPLETE!');
    console.log('📊 EMERGENCY: Functions ready:', {
        openSignInModal: typeof window.openSignInModal,
        openSignUpModal: typeof window.openSignUpModal,
        handleSignIn: typeof window.handleSignIn,
        handleSignUp: typeof window.handleSignUp
    });
    
})();
