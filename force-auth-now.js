// FORCE AUTH NOW - Load this script to make authentication work immediately
(function() {
    console.log('🔥 FORCE AUTH NOW - Starting immediate fix...');
    
    // Wait for DOM to be ready
    function forceAuthFix() {
        console.log('🔧 FORCE: Applying authentication fix...');
        
        // Get the actual DOM elements
        const signInModal = document.getElementById('signInModal');
        const signUpModal = document.getElementById('signUpModal');
        const signInForm = document.getElementById('signInForm');
        const signUpForm = document.getElementById('signUpForm');
        
        console.log('🔍 FORCE: Modal elements found:', {
            signInModal: !!signInModal,
            signUpModal: !!signUpModal,
            signInForm: !!signInForm,
            signUpForm: !!signUpForm
        });
        
        if (!signInModal || !signUpModal) {
            console.log('❌ FORCE: Modal elements not found, retrying...');
            setTimeout(forceAuthFix, 1000);
            return;
        }
        
        // NUCLEAR CLEAR - Remove all existing functions
        const functionsToDelete = [
            'openSignInModal', 'openSignUpModal', 'closeSignInModal', 'closeSignUpModal',
            'handleSignIn', 'handleSignUp', 'switchToSignIn', 'switchToSignUp', 'signOut'
        ];
        
        functionsToDelete.forEach(fn => {
            try {
                delete window[fn];
            } catch(e) {}
        });
        
        console.log('🧹 FORCE: Cleared all existing auth functions');
        
        // INSTALL WORKING FUNCTIONS
        window.openSignInModal = function() {
            console.log('🔑 FORCE: Opening Sign In Modal');
            signInModal.classList.remove('hidden');
            signInModal.style.display = 'flex';
            signInModal.style.opacity = '1';
            signInModal.style.visibility = 'visible';
            signInModal.style.position = 'fixed';
            signInModal.style.zIndex = '99999';
            signInModal.style.top = '0';
            signInModal.style.left = '0';
            signInModal.style.right = '0';
            signInModal.style.bottom = '0';
            
            setTimeout(() => {
                const emailInput = document.getElementById('signInEmail');
                if (emailInput) emailInput.focus();
            }, 200);
        };
        
        window.openSignUpModal = function() {
            console.log('📝 FORCE: Opening Sign Up Modal');
            signUpModal.classList.remove('hidden');
            signUpModal.style.display = 'flex';
            signUpModal.style.opacity = '1';
            signUpModal.style.visibility = 'visible';
            signUpModal.style.position = 'fixed';
            signUpModal.style.zIndex = '99999';
            signUpModal.style.top = '0';
            signUpModal.style.left = '0';
            signUpModal.style.right = '0';
            signUpModal.style.bottom = '0';
            
            setTimeout(() => {
                const nameInput = document.getElementById('signUpName');
                if (nameInput) nameInput.focus();
            }, 200);
        };
        
        window.closeSignInModal = function() {
            console.log('🔑 FORCE: Closing Sign In Modal');
            signInModal.classList.add('hidden');
            signInModal.style.display = 'none';
            if (signInForm) signInForm.reset();
        };
        
        window.closeSignUpModal = function() {
            console.log('📝 FORCE: Closing Sign Up Modal');
            signUpModal.classList.add('hidden');
            signUpModal.style.display = 'none';
            if (signUpForm) signUpForm.reset();
        };
        
        window.switchToSignUp = function() {
            window.closeSignInModal();
            setTimeout(window.openSignUpModal, 100);
        };
        
        window.switchToSignIn = function() {
            window.closeSignUpModal();
            setTimeout(window.openSignInModal, 100);
        };
        
        // AUTHENTICATION LOGIC
        window.handleSignIn = function(event) {
            if (event) event.preventDefault();
            console.log('🔑 FORCE: Processing Sign In');
            
            const email = document.getElementById('signInEmail')?.value?.trim()?.toLowerCase();
            const password = document.getElementById('signInPassword')?.value?.trim();
            
            console.log('🔍 FORCE: Sign in attempt for:', email);
            
            if (!email || !password) {
                alert('Please enter both email and password');
                return false;
            }
            
            try {
                const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
                console.log(`🔍 FORCE: Checking ${users.length} stored users`);
                
                const user = users.find(u => 
                    u.email && u.email.toLowerCase() === email && u.password === password
                );
                
                if (user) {
                    console.log('✅ FORCE: Sign in successful for', user.name);
                    
                    const sessionUser = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        firstName: user.firstName || user.name.split(' ')[0],
                        signedIn: true,
                        loginTime: new Date().toISOString()
                    };
                    
                    window.currentUser = sessionUser;
                    localStorage.setItem('visualVibeUser', JSON.stringify(sessionUser));
                    
                    updateAuthUI();
                    window.closeSignInModal();
                    alert(`Welcome back, ${sessionUser.firstName}!`);
                    
                } else {
                    const existingUser = users.find(u => u.email && u.email.toLowerCase() === email);
                    if (existingUser) {
                        console.log('❌ FORCE: Wrong password for', email);
                        alert('Incorrect password. Please try again.');
                    } else {
                        console.log('❌ FORCE: No account found for', email);
                        alert('No account found with this email. Please sign up first.');
                    }
                }
            } catch (error) {
                console.error('❌ FORCE: Sign in error:', error);
                alert('Sign in failed. Please try again.');
            }
            
            return false;
        };
        
        window.handleSignUp = function(event) {
            if (event) event.preventDefault();
            console.log('📝 FORCE: Processing Sign Up');
            
            const name = document.getElementById('signUpName')?.value?.trim();
            const email = document.getElementById('signUpEmail')?.value?.trim()?.toLowerCase();
            const password = document.getElementById('signUpPassword')?.value?.trim();
            const confirm = document.getElementById('signUpConfirmPassword')?.value?.trim();
            
            console.log('🔍 FORCE: Sign up attempt for:', name, email);
            
            if (!name || !email || !password || !confirm) {
                alert('Please fill in all fields');
                return false;
            }
            
            if (password.length < 6) {
                alert('Password must be at least 6 characters long');
                return false;
            }
            
            if (password !== confirm) {
                alert('Passwords do not match');
                return false;
            }
            
            try {
                const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
                console.log(`📝 FORCE: Checking ${users.length} existing users`);
                
                const existingUser = users.find(u => u.email && u.email.toLowerCase() === email);
                if (existingUser) {
                    console.log('❌ FORCE: Account already exists for', email);
                    alert('An account with this email already exists. Please sign in instead.');
                    return false;
                }
                
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
                console.log('✅ FORCE: New user created:', newUser.name);
                
                const sessionUser = {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    firstName: newUser.firstName,
                    signedIn: true,
                    loginTime: new Date().toISOString()
                };
                
                window.currentUser = sessionUser;
                localStorage.setItem('visualVibeUser', JSON.stringify(sessionUser));
                
                updateAuthUI();
                window.closeSignUpModal();
                alert(`Welcome, ${newUser.firstName}! Your account has been created successfully.`);
                
            } catch (error) {
                console.error('❌ FORCE: Sign up error:', error);
                alert('Sign up failed. Please try again.');
            }
            
            return false;
        };
        
        window.signOut = function() {
            console.log('🚪 FORCE: Signing out');
            window.currentUser = null;
            localStorage.removeItem('visualVibeUser');
            updateAuthUI();
            alert('You have been signed out successfully');
        };
        
        // UI UPDATE FUNCTION
        function updateAuthUI() {
            try {
                const user = window.currentUser;
                const signedOutState = document.getElementById('signedOutState');
                const signedInState = document.getElementById('signedInState');
                const userNameSpan = document.getElementById('userName');
                
                console.log('🎨 FORCE: Updating UI for user:', user?.name || 'not signed in');
                
                if (user) {
                    // Show signed in state
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
                    }
                    if (userNameSpan) {
                        userNameSpan.textContent = user.name;
                    }
                    
                    console.log('✅ FORCE: UI updated to signed in state');
                } else {
                    // Show signed out state
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
                    
                    console.log('✅ FORCE: UI updated to signed out state');
                }
            } catch (error) {
                console.error('❌ FORCE: UI update error:', error);
            }
        }
        
        window.updateAuthUI = updateAuthUI;
        
        // SETUP FORM LISTENERS
        if (signInForm) {
            signInForm.onsubmit = window.handleSignIn;
            console.log('✅ FORCE: Sign in form listener attached');
        }
        
        if (signUpForm) {
            signUpForm.onsubmit = window.handleSignUp;
            console.log('✅ FORCE: Sign up form listener attached');
        }
        
        // SETUP BUTTON LISTENERS
        setTimeout(() => {
            const signInButtons = document.querySelectorAll('button[onclick*="openSignInModal"]');
            const signUpButtons = document.querySelectorAll('button[onclick*="openSignUpModal"]');
            
            console.log('🔘 FORCE: Found buttons:', {
                signInButtons: signInButtons.length,
                signUpButtons: signUpButtons.length
            });
            
            signInButtons.forEach((btn, index) => {
                btn.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(`🔘 FORCE: Sign in button ${index} clicked`);
                    window.openSignInModal();
                };
                console.log(`✅ FORCE: Sign in button ${index} handler set`);
            });
            
            signUpButtons.forEach((btn, index) => {
                btn.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(`🔘 FORCE: Sign up button ${index} clicked`);
                    window.openSignUpModal();
                };
                console.log(`✅ FORCE: Sign up button ${index} handler set`);
            });
        }, 500);
        
        // RESTORE SESSION
        try {
            const savedUser = JSON.parse(localStorage.getItem('visualVibeUser') || 'null');
            if (savedUser && savedUser.signedIn) {
                window.currentUser = savedUser;
                updateAuthUI();
                console.log('🔄 FORCE: Session restored for', savedUser.name);
            } else {
                updateAuthUI();
            }
        } catch (error) {
            console.log('🔄 FORCE: No valid session to restore');
            updateAuthUI();
        }
        
        console.log('🔥 FORCE AUTH FIX COMPLETE!');
        console.log('📊 FORCE: Functions installed:', {
            openSignInModal: typeof window.openSignInModal,
            openSignUpModal: typeof window.openSignUpModal,
            handleSignIn: typeof window.handleSignIn,
            handleSignUp: typeof window.handleSignUp,
            signOut: typeof window.signOut
        });
    }
    
    // Start the fix
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceAuthFix);
    } else {
        forceAuthFix();
    }
    
    // Also try after a delay to ensure everything is loaded
    setTimeout(forceAuthFix, 2000);
    setTimeout(forceAuthFix, 5000);
})();
