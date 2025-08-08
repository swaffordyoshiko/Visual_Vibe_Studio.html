// MINIMAL AUTH FIX - Simple, working authentication
console.log('🔧 MINIMAL AUTH FIX: Starting...');

(function() {
    // Wait for DOM to be ready
    function initAuth() {
        console.log('🚀 Initializing minimal auth system...');
        
        // Clear any existing broken functions
        window.openSignInModal = undefined;
        window.openSignUpModal = undefined;
        window.handleSignIn = undefined;
        window.handleSignUp = undefined;
        
        // Simple working functions
        window.openSignInModal = function() {
            console.log('🔑 Opening Sign In Modal');
            const modal = document.getElementById('signInModal');
            if (modal) {
                modal.classList.remove('hidden');
                modal.style.display = 'flex';
                modal.style.zIndex = '99999';
                console.log('✅ Sign in modal opened');
            } else {
                // Create a simple sign in prompt if modal doesn't exist
                const email = prompt('Enter your email:');
                const password = prompt('Enter your password:');
                if (email && password) {
                    handleSignInData(email, password);
                }
            }
        };
        
        window.openSignUpModal = function() {
            console.log('📝 Opening Sign Up Modal');
            const modal = document.getElementById('signUpModal');
            if (modal) {
                modal.classList.remove('hidden');
                modal.style.display = 'flex';
                modal.style.zIndex = '99999';
                console.log('✅ Sign up modal opened');
            } else {
                // Create a simple sign up prompt if modal doesn't exist
                const name = prompt('Enter your full name:');
                const email = prompt('Enter your email:');
                const password = prompt('Create a password (min 6 characters):');
                const confirm = prompt('Confirm your password:');
                if (name && email && password && confirm) {
                    handleSignUpData(name, email, password, confirm);
                }
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
        
        function handleSignInData(email, password) {
            console.log('🔑 Processing sign in for:', email);
            
            if (!email || !password) {
                alert('Please enter both email and password');
                return;
            }
            
            try {
                const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
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
                        signedIn: true,
                        loginTime: new Date().toISOString()
                    };
                    
                    window.currentUser = sessionUser;
                    localStorage.setItem('visualVibeUser', JSON.stringify(sessionUser));
                    updateUI();
                    window.closeSignInModal();
                    alert(`Welcome back, ${sessionUser.firstName}!`);
                } else {
                    alert('Invalid email or password. Please try again.');
                }
            } catch (error) {
                console.error('Sign in error:', error);
                alert('Sign in failed. Please try again.');
            }
        }
        
        function handleSignUpData(name, email, password, confirm) {
            console.log('📝 Processing sign up for:', name, email);
            
            if (!name || !email || !password || !confirm) {
                alert('Please fill in all fields');
                return;
            }
            
            if (password !== confirm) {
                alert('Passwords do not match');
                return;
            }
            
            if (password.length < 6) {
                alert('Password must be at least 6 characters');
                return;
            }
            
            try {
                const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
                
                if (users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase())) {
                    alert('Account already exists with this email. Please sign in instead.');
                    return;
                }
                
                const newUser = {
                    id: 'user_' + Date.now(),
                    name: name,
                    firstName: name.split(' ')[0],
                    lastName: name.split(' ').slice(1).join(' ') || '',
                    email: email,
                    password: password,
                    orders: [],
                    createdAt: new Date().toISOString()
                };
                
                users.push(newUser);
                localStorage.setItem('visualVibeUsers', JSON.stringify(users));
                
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
                updateUI();
                window.closeSignUpModal();
                alert(`Welcome, ${newUser.firstName}! Account created successfully.`);
                
            } catch (error) {
                console.error('Sign up error:', error);
                alert('Sign up failed. Please try again.');
            }
        }
        
        window.handleSignIn = function(event) {
            if (event) event.preventDefault();
            const email = document.getElementById('signInEmail')?.value?.trim();
            const password = document.getElementById('signInPassword')?.value?.trim();
            handleSignInData(email, password);
            return false;
        };
        
        window.handleSignUp = function(event) {
            if (event) event.preventDefault();
            const name = document.getElementById('signUpName')?.value?.trim();
            const email = document.getElementById('signUpEmail')?.value?.trim();
            const password = document.getElementById('signUpPassword')?.value?.trim();
            const confirm = document.getElementById('signUpConfirmPassword')?.value?.trim();
            handleSignUpData(name, email, password, confirm);
            return false;
        };
        
        window.signOut = function() {
            console.log('🚪 Signing out');
            window.currentUser = null;
            localStorage.removeItem('visualVibeUser');
            updateUI();
            alert('Signed out successfully');
        };
        
        function updateUI() {
            const user = window.currentUser;
            const signedOutState = document.getElementById('signedOutState');
            const signedInState = document.getElementById('signedInState');
            const userNameSpan = document.getElementById('userName');
            
            console.log('🎨 Updating UI for user:', user?.name || 'signed out');
            
            if (user && user.signedIn) {
                // Show signed in state
                if (signedOutState) {
                    signedOutState.style.display = 'none';
                    signedOutState.style.visibility = 'hidden';
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
                
                // Show signed in buttons
                const profileBtn = signedInState?.querySelector('button[onclick*="openProfileModal"]');
                const ordersBtn = signedInState?.querySelector('button[onclick*="showOrderHistory"]');
                const signOutBtn = signedInState?.querySelector('button[onclick*="signOut"]');
                
                [profileBtn, ordersBtn, signOutBtn].forEach(btn => {
                    if (btn) {
                        btn.style.display = 'flex';
                        btn.style.visibility = 'visible';
                        btn.style.position = 'static';
                        btn.style.left = 'auto';
                    }
                });
                
                console.log('✅ UI updated to signed in state');
            } else {
                // Show signed out state
                if (signedOutState) {
                    signedOutState.style.display = 'flex';
                    signedOutState.style.visibility = 'visible';
                }
                if (signedInState) {
                    signedInState.classList.add('hidden');
                    signedInState.style.display = 'none';
                }
                console.log('✅ UI updated to signed out state');
            }
        }
        
        window.updateAuthUI = updateUI;
        
        // Set up form listeners
        setTimeout(() => {
            const signInForm = document.getElementById('signInForm');
            const signUpForm = document.getElementById('signUpForm');
            
            if (signInForm) {
                signInForm.onsubmit = window.handleSignIn;
                console.log('✅ Sign in form listener set');
            }
            
            if (signUpForm) {
                signUpForm.onsubmit = window.handleSignUp;
                console.log('✅ Sign up form listener set');
            }
            
            // Fix button handlers
            document.querySelectorAll('button[onclick*="openSignInModal"]').forEach(btn => {
                btn.onclick = window.openSignInModal;
            });
            
            document.querySelectorAll('button[onclick*="openSignUpModal"]').forEach(btn => {
                btn.onclick = window.openSignUpModal;
            });
            
            console.log('✅ Button handlers set');
        }, 500);
        
        // Restore session if exists
        try {
            const savedUser = JSON.parse(localStorage.getItem('visualVibeUser') || 'null');
            if (savedUser && savedUser.signedIn) {
                window.currentUser = savedUser;
                console.log('🔄 Session restored for:', savedUser.name);
            }
        } catch (error) {
            console.log('🔄 No session to restore');
        }
        
        updateUI();
        
        console.log('🎉 MINIMAL AUTH SYSTEM READY!');
        console.log('📊 Functions available:', {
            openSignInModal: typeof window.openSignInModal,
            openSignUpModal: typeof window.openSignUpModal,
            handleSignIn: typeof window.handleSignIn,
            handleSignUp: typeof window.handleSignUp
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAuth);
    } else {
        initAuth();
    }
    
    // Also try after delay
    setTimeout(initAuth, 1000);
})();
