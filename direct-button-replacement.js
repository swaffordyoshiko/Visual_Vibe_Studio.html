// DIRECT BUTTON REPLACEMENT - Bypass all conflicts
console.log('🎯 DIRECT FIX: Replacing buttons with direct event listeners...');

// Wait for DOM to be ready
function directFix() {
    console.log('🔧 Starting direct button replacement...');
    
    // Find all buttons that have broken onclick handlers
    const signInButtons = Array.from(document.querySelectorAll('button')).filter(btn => 
        btn.getAttribute('onclick') && btn.getAttribute('onclick').includes('openSignInModal')
    );
    
    const signUpButtons = Array.from(document.querySelectorAll('button')).filter(btn => 
        btn.getAttribute('onclick') && btn.getAttribute('onclick').includes('openSignUpModal')
    );
    
    console.log(`Found ${signInButtons.length} sign in buttons and ${signUpButtons.length} sign up buttons`);
    
    // Authentication storage functions
    const auth = {
        saveUser: (userData) => {
            localStorage.setItem('vvs_user', JSON.stringify(userData));
            localStorage.setItem('vvs_user_' + userData.email, JSON.stringify(userData));
        },
        
        getUser: (email) => {
            if (email) {
                const userData = localStorage.getItem('vvs_user_' + email);
                return userData ? JSON.parse(userData) : null;
            }
            const userData = localStorage.getItem('vvs_user');
            return userData ? JSON.parse(userData) : null;
        },
        
        removeUser: () => {
            localStorage.removeItem('vvs_user');
        }
    };
    
    // Create modal functions
    function showSignInModal() {
        console.log('📱 Creating sign in modal...');
        
        // Remove any existing modals
        const existingModal = document.getElementById('directSignInModal');
        if (existingModal) existingModal.remove();
        
        // Create modal HTML
        const modalHTML = `
            <div id="directSignInModal" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0,0,0,0.8);
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            ">
                <div style="
                    background: white;
                    border-radius: 12px;
                    padding: 30px;
                    max-width: 400px;
                    width: 100%;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                ">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3 style="margin: 0; font-size: 24px; font-weight: bold; color: #333;">Sign In</h3>
                        <button id="directCloseSignIn" style="
                            background: none;
                            border: none;
                            font-size: 24px;
                            cursor: pointer;
                            color: #666;
                            padding: 5px;
                        ">&times;</button>
                    </div>
                    
                    <form id="directSignInForm">
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #333;">Email</label>
                            <input type="email" id="directSignInEmail" required style="
                                width: 100%;
                                padding: 12px;
                                border: 2px solid #ddd;
                                border-radius: 6px;
                                font-size: 16px;
                                box-sizing: border-box;
                            " placeholder="your@email.com">
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #333;">Password</label>
                            <input type="password" id="directSignInPassword" required style="
                                width: 100%;
                                padding: 12px;
                                border: 2px solid #ddd;
                                border-radius: 6px;
                                font-size: 16px;
                                box-sizing: border-box;
                            " placeholder="Enter your password">
                        </div>
                        
                        <button type="submit" style="
                            width: 100%;
                            background: #6366f1;
                            color: white;
                            border: none;
                            padding: 12px;
                            border-radius: 6px;
                            font-size: 16px;
                            font-weight: bold;
                            cursor: pointer;
                            margin-bottom: 15px;
                        ">Sign In</button>
                    </form>
                    
                    <p style="text-align: center; margin: 0; color: #666;">
                        Don't have an account?
                        <button id="directSwitchToSignUp" style="
                            background: none;
                            border: none;
                            color: #6366f1;
                            cursor: pointer;
                            text-decoration: underline;
                            font-weight: bold;
                        ">Sign up</button>
                    </p>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add event listeners
        document.getElementById('directCloseSignIn').onclick = () => {
            document.getElementById('directSignInModal').remove();
        };
        
        document.getElementById('directSwitchToSignUp').onclick = () => {
            document.getElementById('directSignInModal').remove();
            showSignUpModal();
        };
        
        document.getElementById('directSignInForm').onsubmit = (e) => {
            e.preventDefault();
            
            const email = document.getElementById('directSignInEmail').value.trim();
            const password = document.getElementById('directSignInPassword').value.trim();
            
            if (!email || !password) {
                alert('Please enter both email and password');
                return;
            }
            
            const user = auth.getUser(email);
            if (!user) {
                alert('No account found with this email. Please sign up first.');
                return;
            }
            
            if (user.password !== password) {
                alert('Incorrect password');
                return;
            }
            
            auth.saveUser(user);
            document.getElementById('directSignInModal').remove();
            alert(`Welcome back, ${user.name}!`);
        };
        
        // Focus on email field
        setTimeout(() => {
            document.getElementById('directSignInEmail').focus();
        }, 100);
        
        // Close on click outside
        document.getElementById('directSignInModal').onclick = (e) => {
            if (e.target.id === 'directSignInModal') {
                document.getElementById('directSignInModal').remove();
            }
        };
    }
    
    function showSignUpModal() {
        console.log('📱 Creating sign up modal...');
        
        // Remove any existing modals
        const existingModal = document.getElementById('directSignUpModal');
        if (existingModal) existingModal.remove();
        
        // Create modal HTML
        const modalHTML = `
            <div id="directSignUpModal" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0,0,0,0.8);
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            ">
                <div style="
                    background: white;
                    border-radius: 12px;
                    padding: 30px;
                    max-width: 400px;
                    width: 100%;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    max-height: 90vh;
                    overflow-y: auto;
                ">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3 style="margin: 0; font-size: 24px; font-weight: bold; color: #333;">Create Account</h3>
                        <button id="directCloseSignUp" style="
                            background: none;
                            border: none;
                            font-size: 24px;
                            cursor: pointer;
                            color: #666;
                            padding: 5px;
                        ">&times;</button>
                    </div>
                    
                    <form id="directSignUpForm">
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #333;">Full Name</label>
                            <input type="text" id="directSignUpName" required style="
                                width: 100%;
                                padding: 12px;
                                border: 2px solid #ddd;
                                border-radius: 6px;
                                font-size: 16px;
                                box-sizing: border-box;
                            " placeholder="Enter your full name">
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #333;">Email</label>
                            <input type="email" id="directSignUpEmail" required style="
                                width: 100%;
                                padding: 12px;
                                border: 2px solid #ddd;
                                border-radius: 6px;
                                font-size: 16px;
                                box-sizing: border-box;
                            " placeholder="your@email.com">
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #333;">Password</label>
                            <input type="password" id="directSignUpPassword" required style="
                                width: 100%;
                                padding: 12px;
                                border: 2px solid #ddd;
                                border-radius: 6px;
                                font-size: 16px;
                                box-sizing: border-box;
                            " placeholder="Create a password" minlength="6">
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #333;">Confirm Password</label>
                            <input type="password" id="directSignUpConfirm" required style="
                                width: 100%;
                                padding: 12px;
                                border: 2px solid #ddd;
                                border-radius: 6px;
                                font-size: 16px;
                                box-sizing: border-box;
                            " placeholder="Confirm your password">
                        </div>
                        
                        <button type="submit" style="
                            width: 100%;
                            background: #6366f1;
                            color: white;
                            border: none;
                            padding: 12px;
                            border-radius: 6px;
                            font-size: 16px;
                            font-weight: bold;
                            cursor: pointer;
                            margin-bottom: 15px;
                        ">Create Account</button>
                    </form>
                    
                    <p style="text-align: center; margin: 0; color: #666;">
                        Already have an account?
                        <button id="directSwitchToSignIn" style="
                            background: none;
                            border: none;
                            color: #6366f1;
                            cursor: pointer;
                            text-decoration: underline;
                            font-weight: bold;
                        ">Sign in</button>
                    </p>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add event listeners
        document.getElementById('directCloseSignUp').onclick = () => {
            document.getElementById('directSignUpModal').remove();
        };
        
        document.getElementById('directSwitchToSignIn').onclick = () => {
            document.getElementById('directSignUpModal').remove();
            showSignInModal();
        };
        
        document.getElementById('directSignUpForm').onsubmit = (e) => {
            e.preventDefault();
            
            const name = document.getElementById('directSignUpName').value.trim();
            const email = document.getElementById('directSignUpEmail').value.trim();
            const password = document.getElementById('directSignUpPassword').value.trim();
            const confirm = document.getElementById('directSignUpConfirm').value.trim();
            
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
            
            if (auth.getUser(email)) {
                alert('Account already exists with this email. Please sign in instead.');
                return;
            }
            
            const userData = {
                name: name,
                email: email,
                password: password,
                createdAt: new Date().toISOString()
            };
            
            auth.saveUser(userData);
            document.getElementById('directSignUpModal').remove();
            alert(`Welcome to Visual Vibe Studio, ${name}!`);
        };
        
        // Focus on name field
        setTimeout(() => {
            document.getElementById('directSignUpName').focus();
        }, 100);
        
        // Close on click outside
        document.getElementById('directSignUpModal').onclick = (e) => {
            if (e.target.id === 'directSignUpModal') {
                document.getElementById('directSignUpModal').remove();
            }
        };
    }
    
    // Replace all sign in buttons
    signInButtons.forEach((btn, index) => {
        // Remove the broken onclick attribute
        btn.removeAttribute('onclick');
        
        // Add new event listener that bypasses everything
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            console.log(`🔴 Sign in button ${index + 1} clicked - showing modal`);
            showSignInModal();
        });
        
        console.log(`✅ Fixed sign in button ${index + 1}`);
    });
    
    // Replace all sign up buttons
    signUpButtons.forEach((btn, index) => {
        // Remove the broken onclick attribute
        btn.removeAttribute('onclick');
        
        // Add new event listener that bypasses everything
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            console.log(`🔴 Sign up button ${index + 1} clicked - showing modal`);
            showSignUpModal();
        });
        
        console.log(`✅ Fixed sign up button ${index + 1}`);
    });
    
    console.log('🎯 DIRECT FIX: All buttons have been replaced with working versions!');
    console.log('💡 Try clicking the Sign In or Sign Up buttons now - they should work!');
}

// Run the direct fix immediately and after DOM changes
directFix();

// Also run after a delay to catch any dynamically added buttons
setTimeout(directFix, 1000);
setTimeout(directFix, 3000);

// Re-run the fix if new buttons are added
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            setTimeout(directFix, 100);
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

console.log('🎯 DIRECT BUTTON REPLACEMENT: Ready to fix buttons!');
