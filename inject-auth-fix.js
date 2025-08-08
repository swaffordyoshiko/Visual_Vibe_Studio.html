// INJECT AUTH FIX - Dynamically loads the auth system override
console.log('💉 Injecting Auth Fix...');

// Create and inject the auth system override script
const script = document.createElement('script');
script.src = 'auth-system-override.js';
script.onload = function() {
    console.log('✅ Auth System Override loaded successfully');
};
script.onerror = function() {
    console.error('❌ Failed to load Auth System Override');
};

// Inject into head
document.head.appendChild(script);

// Also run inline version as backup
setTimeout(() => {
    if (!window.openSignInModal || !window.handleSignIn) {
        console.log('🔄 Running inline auth fix as backup...');
        
        // Mini auth fix inline
        let isProcessing = false;

        function showMessage(msg, type) {
            console.log(`${type}: ${msg}`);
            alert(msg);
        }

        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        window.openSignInModal = function() {
            const modal = document.getElementById('signInModal');
            if (modal) {
                modal.classList.remove('hidden');
                modal.style.display = 'flex';
            }
        };

        window.openSignUpModal = function() {
            const modal = document.getElementById('signUpModal');
            if (modal) {
                modal.classList.remove('hidden');
                modal.style.display = 'flex';
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

        window.handleSignIn = function(e) {
            if (e) e.preventDefault();
            if (isProcessing) return;
            isProcessing = true;

            try {
                const email = document.getElementById('signInEmail')?.value?.trim()?.toLowerCase();
                const password = document.getElementById('signInPassword')?.value?.trim();

                if (!email || !password) {
                    showMessage('Please enter email and password', 'error');
                    return;
                }

                const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
                const user = users.find(u => u.email?.toLowerCase() === email && u.password === password);

                if (user) {
                    const sessionUser = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        firstName: user.firstName || user.name.split(' ')[0],
                        signedIn: true
                    };
                    
                    window.currentUser = sessionUser;
                    localStorage.setItem('visualVibeUser', JSON.stringify(sessionUser));
                    
                    if (window.updateAuthUI) window.updateAuthUI();
                    window.closeSignInModal();
                    showMessage(`Welcome back, ${sessionUser.firstName}!`, 'success');
                } else {
                    showMessage('Invalid email or password', 'error');
                }
            } catch (error) {
                showMessage('Sign in failed', 'error');
            } finally {
                isProcessing = false;
            }
        };

        window.handleSignUp = function(e) {
            if (e) e.preventDefault();
            if (isProcessing) return;
            isProcessing = true;

            try {
                const name = document.getElementById('signUpName')?.value?.trim();
                const email = document.getElementById('signUpEmail')?.value?.trim()?.toLowerCase();
                const password = document.getElementById('signUpPassword')?.value?.trim();
                const confirm = document.getElementById('signUpConfirmPassword')?.value?.trim();

                if (!name || !email || !password || !confirm) {
                    showMessage('Please fill all fields', 'error');
                    return;
                }

                if (password !== confirm) {
                    showMessage('Passwords do not match', 'error');
                    return;
                }

                const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
                
                if (users.find(u => u.email?.toLowerCase() === email)) {
                    showMessage('Account already exists', 'error');
                    return;
                }

                const newUser = {
                    id: 'user_' + Date.now(),
                    name: name,
                    firstName: name.split(' ')[0],
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
                    signedIn: true
                };

                window.currentUser = sessionUser;
                localStorage.setItem('visualVibeUser', JSON.stringify(sessionUser));

                if (window.updateAuthUI) window.updateAuthUI();
                window.closeSignUpModal();
                showMessage(`Welcome, ${newUser.firstName}!`, 'success');
            } catch (error) {
                showMessage('Sign up failed', 'error');
            } finally {
                isProcessing = false;
            }
        };

        // Setup form listeners
        setTimeout(() => {
            const signInForm = document.getElementById('signInForm');
            const signUpForm = document.getElementById('signUpForm');
            
            if (signInForm) {
                signInForm.onsubmit = window.handleSignIn;
            }
            if (signUpForm) {
                signUpForm.onsubmit = window.handleSignUp;
            }
        }, 100);

        console.log('✅ Inline auth fix ready');
    }
}, 3000);
