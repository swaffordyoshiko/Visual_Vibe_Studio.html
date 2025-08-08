// SIMPLE BUTTON FIX - Direct replacement
console.log('🔧 SIMPLE FIX: Replacing broken button functions...');

// Wait a moment for page to load
setTimeout(() => {
    
    // Find the actual buttons in the DOM
    const signInButtons = document.querySelectorAll('button[onclick*="openSignInModal"]');
    const signUpButtons = document.querySelectorAll('button[onclick*="openSignUpModal"]');
    
    console.log(`Found ${signInButtons.length} sign in buttons and ${signUpButtons.length} sign up buttons`);
    
    // Simple modal functions
    function createSimpleSignInModal() {
        // Remove any existing modal
        const existing = document.getElementById('simpleSignInModal');
        if (existing) existing.remove();
        
        const modal = document.createElement('div');
        modal.id = 'simpleSignInModal';
        modal.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.8); z-index: 999999; display: flex; align-items: center; justify-content: center; padding: 20px;">
                <div style="background: white; border-radius: 12px; padding: 30px; max-width: 400px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3 style="margin: 0; font-size: 24px; font-weight: bold; color: #333;">Sign In</h3>
                        <button onclick="document.getElementById('simpleSignInModal').remove()" style="background: none; border: none; font-size: 28px; cursor: pointer; color: #666; padding: 5px;">&times;</button>
                    </div>
                    
                    <form onsubmit="handleSimpleSignIn(event)">
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #333;">Email</label>
                            <input type="email" id="simpleSignInEmail" required style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 6px; font-size: 16px; box-sizing: border-box;" placeholder="your@email.com">
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #333;">Password</label>
                            <input type="password" id="simpleSignInPassword" required style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 6px; font-size: 16px; box-sizing: border-box;" placeholder="Enter your password">
                        </div>
                        
                        <button type="submit" style="width: 100%; background: #6366f1; color: white; border: none; padding: 12px; border-radius: 6px; font-size: 16px; font-weight: bold; cursor: pointer; margin-bottom: 15px;">Sign In</button>
                    </form>
                    
                    <p style="text-align: center; margin: 0; color: #666;">
                        Don't have an account?
                        <button onclick="document.getElementById('simpleSignInModal').remove(); createSimpleSignUpModal();" style="background: none; border: none; color: #6366f1; cursor: pointer; text-decoration: underline; font-weight: bold;">Sign up</button>
                    </p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Focus on email input
        setTimeout(() => {
            document.getElementById('simpleSignInEmail').focus();
        }, 100);
        
        // Close on outside click
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        };
    }
    
    function createSimpleSignUpModal() {
        // Remove any existing modal
        const existing = document.getElementById('simpleSignUpModal');
        if (existing) existing.remove();
        
        const modal = document.createElement('div');
        modal.id = 'simpleSignUpModal';
        modal.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.8); z-index: 999999; display: flex; align-items: center; justify-content: center; padding: 20px;">
                <div style="background: white; border-radius: 12px; padding: 30px; max-width: 400px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.3); max-height: 90vh; overflow-y: auto;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3 style="margin: 0; font-size: 24px; font-weight: bold; color: #333;">Create Account</h3>
                        <button onclick="document.getElementById('simpleSignUpModal').remove()" style="background: none; border: none; font-size: 28px; cursor: pointer; color: #666; padding: 5px;">&times;</button>
                    </div>
                    
                    <form onsubmit="handleSimpleSignUp(event)">
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #333;">Full Name</label>
                            <input type="text" id="simpleSignUpName" required style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 6px; font-size: 16px; box-sizing: border-box;" placeholder="Enter your full name">
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #333;">Email</label>
                            <input type="email" id="simpleSignUpEmail" required style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 6px; font-size: 16px; box-sizing: border-box;" placeholder="your@email.com">
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #333;">Password</label>
                            <input type="password" id="simpleSignUpPassword" required style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 6px; font-size: 16px; box-sizing: border-box;" placeholder="Create a password" minlength="6">
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #333;">Confirm Password</label>
                            <input type="password" id="simpleSignUpConfirm" required style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 6px; font-size: 16px; box-sizing: border-box;" placeholder="Confirm your password">
                        </div>
                        
                        <button type="submit" style="width: 100%; background: #6366f1; color: white; border: none; padding: 12px; border-radius: 6px; font-size: 16px; font-weight: bold; cursor: pointer; margin-bottom: 15px;">Create Account</button>
                    </form>
                    
                    <p style="text-align: center; margin: 0; color: #666;">
                        Already have an account?
                        <button onclick="document.getElementById('simpleSignUpModal').remove(); createSimpleSignInModal();" style="background: none; border: none; color: #6366f1; cursor: pointer; text-decoration: underline; font-weight: bold;">Sign in</button>
                    </p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Focus on name input
        setTimeout(() => {
            document.getElementById('simpleSignUpName').focus();
        }, 100);
        
        // Close on outside click
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        };
    }
    
    // Make functions globally available
    window.createSimpleSignInModal = createSimpleSignInModal;
    window.createSimpleSignUpModal = createSimpleSignUpModal;
    
    // Auth handlers
    window.handleSimpleSignIn = function(event) {
        event.preventDefault();
        
        const email = document.getElementById('simpleSignInEmail').value.trim();
        const password = document.getElementById('simpleSignInPassword').value.trim();
        
        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }
        
        // Check localStorage for user
        const userData = localStorage.getItem('vvs_user_' + email);
        if (!userData) {
            alert('No account found with this email. Please sign up first.');
            return;
        }
        
        try {
            const user = JSON.parse(userData);
            if (user.password !== password) {
                alert('Incorrect password');
                return;
            }
            
            // Success
            localStorage.setItem('vvs_user', userData);
            document.getElementById('simpleSignInModal').remove();
            alert(`Welcome back, ${user.name}!`);
        } catch (e) {
            alert('Error signing in. Please try again.');
        }
    };
    
    window.handleSimpleSignUp = function(event) {
        event.preventDefault();
        
        const name = document.getElementById('simpleSignUpName').value.trim();
        const email = document.getElementById('simpleSignUpEmail').value.trim();
        const password = document.getElementById('simpleSignUpPassword').value.trim();
        const confirm = document.getElementById('simpleSignUpConfirm').value.trim();
        
        if (!name || !email || !password || !confirm) {
            alert('Please fill in all fields');
            return;
        }
        
        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }
        
        if (password !== confirm) {
            alert('Passwords do not match');
            return;
        }
        
        // Check if user exists
        if (localStorage.getItem('vvs_user_' + email)) {
            alert('Account already exists with this email. Please sign in instead.');
            return;
        }
        
        // Create user
        const userData = {
            name: name,
            email: email,
            password: password,
            createdAt: new Date().toISOString()
        };
        
        try {
            localStorage.setItem('vvs_user_' + email, JSON.stringify(userData));
            localStorage.setItem('vvs_user', JSON.stringify(userData));
            document.getElementById('simpleSignUpModal').remove();
            alert(`Welcome to Visual Vibe Studio, ${name}!`);
        } catch (e) {
            alert('Error creating account. Please try again.');
        }
    };
    
    // Replace all sign in buttons
    signInButtons.forEach((button, index) => {
        // Remove the broken onclick
        button.removeAttribute('onclick');
        
        // Add working click handler
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log(`✅ Sign in button ${index + 1} clicked`);
            createSimpleSignInModal();
        });
        
        console.log(`✅ Fixed sign in button ${index + 1}`);
    });
    
    // Replace all sign up buttons
    signUpButtons.forEach((button, index) => {
        // Remove the broken onclick
        button.removeAttribute('onclick');
        
        // Add working click handler
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log(`✅ Sign up button ${index + 1} clicked`);
            createSimpleSignUpModal();
        });
        
        console.log(`✅ Fixed sign up button ${index + 1}`);
    });
    
    console.log('🎉 SIMPLE FIX: All buttons have been fixed!');
    console.log('💡 Try clicking the Sign In or Sign Up buttons now!');
    
}, 1000);

console.log('🔧 SIMPLE BUTTON FIX: Script loaded and will run in 1 second...');
