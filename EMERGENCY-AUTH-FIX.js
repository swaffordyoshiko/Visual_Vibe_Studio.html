// EMERGENCY AUTH FIX - FINAL SOLUTION
console.log('🚨 EMERGENCY AUTH FIX LOADING...');

// Force clear EVERYTHING immediately
setTimeout(() => {
    console.log('🔥 EMERGENCY: Clearing all auth conflicts and installing working system...');
    
    // NUCLEAR OPTION: Clear all existing auth functions
    const authProps = ['handleSignIn', 'handleSignUp', 'openSignInModal', 'openSignUpModal', 
                      'closeSignInModal', 'closeSignUpModal', 'switchToSignUp', 'switchToSignIn',
                      'signOut', 'updateAuthUI'];
    
    authProps.forEach(prop => {
        try {
            delete window[prop];
        } catch(e) {}
    });
    
    // WORKING AUTH SYSTEM
    let processing = false;
    
    // Show message function
    function msg(text, type) {
        console.log(`${type}: ${text}`);
        if (window.toastManager && window.toastManager.show) {
            window.toastManager.show(text, type);
        } else {
            alert(text);
        }
    }
    
    // Email validation
    function validEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // MODAL FUNCTIONS
    window.openSignInModal = function() {
        console.log('🔑 EMERGENCY: Opening Sign In Modal');
        const modal = document.getElementById('signInModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
            setTimeout(() => {
                const emailField = document.getElementById('signInEmail');
                if (emailField) emailField.focus();
            }, 100);
        } else {
            msg('Sign in form not available', 'error');
        }
    };
    
    window.openSignUpModal = function() {
        console.log('📝 EMERGENCY: Opening Sign Up Modal');
        const modal = document.getElementById('signUpModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
            setTimeout(() => {
                const nameField = document.getElementById('signUpName');
                if (nameField) nameField.focus();
            }, 100);
        } else {
            msg('Sign up form not available', 'error');
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
    
    // AUTHENTICATION HANDLERS
    window.handleSignIn = function(event) {
        if (event) event.preventDefault();
        if (processing) return;
        processing = true;
        
        console.log('🔑 EMERGENCY: Processing Sign In');
        
        try {
            const email = document.getElementById('signInEmail')?.value?.trim()?.toLowerCase();
            const password = document.getElementById('signInPassword')?.value?.trim();
            
            if (!email || !password) {
                msg('Please enter email and password', 'error');
                return;
            }
            
            if (!validEmail(email)) {
                msg('Please enter a valid email', 'error');
                return;
            }
            
            // Get users from storage
            const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
            console.log(`🔍 EMERGENCY: Checking ${users.length} users for ${email}`);
            
            // Find matching user
            const user = users.find(u => 
                u.email && u.email.toLowerCase() === email && u.password === password
            );
            
            if (user) {
                // SUCCESS
                console.log('✅ EMERGENCY: Sign in successful for', user.name);
                
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
                
                window.updateAuthUI();
                window.closeSignInModal();
                msg(`Welcome back, ${sessionUser.firstName}!`, 'success');
                
            } else {
                // FAILED
                const existingUser = users.find(u => u.email && u.email.toLowerCase() === email);
                if (existingUser) {
                    console.log('❌ EMERGENCY: Wrong password for', email);
                    msg('Incorrect password', 'error');
                } else {
                    console.log('❌ EMERGENCY: No account found for', email);
                    msg('No account found. Please sign up first.', 'error');
                }
            }
            
        } catch (error) {
            console.error('❌ EMERGENCY: Sign in error:', error);
            msg('Sign in failed. Please try again.', 'error');
        } finally {
            processing = false;
        }
    };
    
    window.handleSignUp = function(event) {
        if (event) event.preventDefault();
        if (processing) return;
        processing = true;
        
        console.log('📝 EMERGENCY: Processing Sign Up');
        
        try {
            const name = document.getElementById('signUpName')?.value?.trim();
            const email = document.getElementById('signUpEmail')?.value?.trim()?.toLowerCase();
            const password = document.getElementById('signUpPassword')?.value?.trim();
            const confirm = document.getElementById('signUpConfirmPassword')?.value?.trim();
            
            // Validation
            if (!name || !email || !password || !confirm) {
                msg('Please fill in all fields', 'error');
                return;
            }
            
            if (!validEmail(email)) {
                msg('Please enter a valid email', 'error');
                return;
            }
            
            if (password.length < 6) {
                msg('Password must be at least 6 characters', 'error');
                return;
            }
            
            if (password !== confirm) {
                msg('Passwords do not match', 'error');
                return;
            }
            
            // Check existing users
            const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
            console.log(`📝 EMERGENCY: Checking ${users.length} users for duplicate ${email}`);
            
            const existingUser = users.find(u => u.email && u.email.toLowerCase() === email);
            if (existingUser) {
                console.log('❌ EMERGENCY: Account already exists for', email);
                msg('Account already exists. Please sign in instead.', 'error');
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
            
            // Save user
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
            
            window.currentUser = sessionUser;
            localStorage.setItem('visualVibeUser', JSON.stringify(sessionUser));
            
            window.updateAuthUI();
            window.closeSignUpModal();
            msg(`Welcome, ${newUser.firstName}! Account created successfully.`, 'success');
            
        } catch (error) {
            console.error('❌ EMERGENCY: Sign up error:', error);
            msg('Sign up failed. Please try again.', 'error');
        } finally {
            processing = false;
        }
    };
    
    // SIGN OUT
    window.signOut = function() {
        console.log('🚪 EMERGENCY: Signing out');
        window.currentUser = null;
        localStorage.removeItem('visualVibeUser');
        window.updateAuthUI();
        msg('Signed out successfully', 'success');
    };
    
    // UPDATE UI
    window.updateAuthUI = function() {
        try {
            const user = window.currentUser;
            const signedOut = document.getElementById('signedOutState');
            const signedIn = document.getElementById('signedInState');
            const userName = document.getElementById('userName');
            
            if (user) {
                if (signedOut) signedOut.style.display = 'none';
                if (signedIn) signedIn.style.display = 'flex';
                if (userName) userName.textContent = user.name;
                console.log('✅ EMERGENCY: UI updated - signed in as', user.name);
            } else {
                if (signedOut) signedOut.style.display = 'flex';
                if (signedIn) signedIn.style.display = 'none';
                console.log('✅ EMERGENCY: UI updated - signed out');
            }
        } catch (error) {
            console.error('❌ EMERGENCY: UI update error:', error);
        }
    };
    
    // RESTORE SESSION
    try {
        const savedUser = JSON.parse(localStorage.getItem('visualVibeUser') || 'null');
        if (savedUser && savedUser.signedIn) {
            window.currentUser = savedUser;
            window.updateAuthUI();
            console.log('🔄 EMERGENCY: Session restored for', savedUser.name);
        }
    } catch (error) {
        console.log('🔄 EMERGENCY: No session to restore');
    }
    
    // SETUP FORM LISTENERS
    function setupListeners() {
        const signInForm = document.getElementById('signInForm');
        const signUpForm = document.getElementById('signUpForm');
        
        if (signInForm) {
            signInForm.onsubmit = window.handleSignIn;
            console.log('✅ EMERGENCY: Sign in form listener attached');
        }
        
        if (signUpForm) {
            signUpForm.onsubmit = window.handleSignUp;
            console.log('✅ EMERGENCY: Sign up form listener attached');
        }
        
        // Fix button handlers
        document.querySelectorAll('button[onclick*="openSignInModal"]').forEach(btn => {
            btn.onclick = window.openSignInModal;
        });
        
        document.querySelectorAll('button[onclick*="openSignUpModal"]').forEach(btn => {
            btn.onclick = window.openSignUpModal;
        });
        
        console.log('✅ EMERGENCY: Button handlers fixed');
    }
    
    setupListeners();
    
    // Test the functions
    console.log('🧪 EMERGENCY: Function test:', {
        openSignInModal: typeof window.openSignInModal,
        openSignUpModal: typeof window.openSignUpModal,
        handleSignIn: typeof window.handleSignIn,
        handleSignUp: typeof window.handleSignUp,
        signOut: typeof window.signOut,
        updateAuthUI: typeof window.updateAuthUI
    });
    
    console.log('🚨 EMERGENCY AUTH FIX COMPLETE - AUTHENTICATION SHOULD NOW WORK!');
    
}, 5000); // Wait 5 seconds for all other scripts to load first
