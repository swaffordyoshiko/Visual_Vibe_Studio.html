// AUTHENTICATION DEBUG HELPER
(function() {
    'use strict';
    
    console.log('🔍 AUTH DEBUG HELPER - LOADING...');
    
    // Debug function to check user database
    window.debugAuth = function() {
        console.log('🔍 === AUTHENTICATION DEBUG ===');
        
        // Check current user
        console.log('Current User:', window.currentUser);
        
        // Check localStorage
        const savedUser = localStorage.getItem('visualVibeUser');
        console.log('Saved Session:', savedUser ? JSON.parse(savedUser) : 'None');
        
        // Check users database
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        console.log(`Users Database: ${users.length} total users`);
        
        users.forEach((user, index) => {
            console.log(`User ${index + 1}:`, {
                name: user.name,
                email: user.email,
                id: user.id,
                createdAt: user.createdAt,
                hasPassword: !!user.password
            });
        });
        
        // Check UI state
        const signedInState = document.getElementById('signedInState');
        const signedOutState = document.getElementById('signedOutState');
        
        console.log('UI States:', {
            signedInVisible: signedInState ? signedInState.style.display !== 'none' : false,
            signedOutVisible: signedOutState ? signedOutState.style.display !== 'none' : false
        });
        
        // Check auth functions
        console.log('Auth Functions:', {
            handleSignIn: typeof window.handleSignIn,
            handleSignUp: typeof window.handleSignUp,
            signOut: typeof window.signOut,
            updateAuthUI: typeof window.updateAuthUI
        });
        
        console.log('🔍 === END DEBUG ===');
    };
    
    // Function to test sign in with a specific user
    window.testSignIn = function(email, password) {
        console.log(`🧪 Testing sign in for: ${email}`);
        
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        const user = users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase());
        
        if (!user) {
            console.log('❌ User not found');
            return false;
        }
        
        if (user.password !== password) {
            console.log('❌ Incorrect password');
            return false;
        }
        
        console.log('✅ Credentials valid for user:', user.name);
        return true;
    };
    
    // Function to manually create a test user
    window.createTestUser = function(name = 'Test User', email = 'test@example.com', password = 'test123') {
        console.log(`🧪 Creating test user: ${name} (${email})`);
        
        const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
        
        // Check if user already exists
        const existingUser = users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase());
        if (existingUser) {
            console.log('❌ User already exists with this email');
            return false;
        }
        
        // Create new user
        const newUser = {
            id: `test-${Date.now()}`,
            name: name,
            firstName: name.split(' ')[0],
            lastName: name.split(' ').slice(1).join(' ') || '',
            email: email.toLowerCase(),
            password: password,
            orders: [],
            reviews: [],
            createdAt: new Date().toISOString(),
            accountVersion: '3.0'
        };
        
        users.push(newUser);
        localStorage.setItem('visualVibeUsers', JSON.stringify(users));
        
        console.log('✅ Test user created successfully');
        return true;
    };
    
    // Function to clear all users (for testing)
    window.clearAllUsers = function() {
        if (confirm('⚠️ This will delete ALL user accounts. Are you sure?')) {
            localStorage.removeItem('visualVibeUsers');
            localStorage.removeItem('visualVibeUser');
            window.currentUser = null;
            console.log('🧹 All users cleared');
            if (typeof window.updateAuthUI === 'function') {
                window.updateAuthUI();
            }
        }
    };
    
    // Auto-run debug on load
    setTimeout(() => {
        console.log('🔍 Auto-running auth debug...');
        window.debugAuth();
    }, 2000);
    
    console.log('🔍 AUTH DEBUG HELPER - READY');
    console.log('Available commands: debugAuth(), testSignIn(email, password), createTestUser(), clearAllUsers()');
    
})();
