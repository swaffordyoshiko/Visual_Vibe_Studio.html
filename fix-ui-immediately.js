// IMMEDIATE UI FIX - Force show hidden signed-in buttons
console.log('🚨 IMMEDIATE UI FIX: Forcing signed-in buttons to show...');

(function immediateUIFix() {
    // Check if user is signed in (look for welcome banner or currentUser)
    const isSignedIn = window.currentUser || 
                      document.getElementById('welcomeBanner')?.textContent?.includes('Welcome') ||
                      localStorage.getItem('visualVibeUser') ||
                      localStorage.getItem('currentUser');
    
    console.log('👤 User signed in status:', !!isSignedIn);
    
    if (isSignedIn) {
        console.log('🔧 User is signed in, forcing UI to show signed-in state...');
        
        // Force show signed-in elements and hide signed-out elements
        const signedInElements = [
            'signedInState',
            'mobileSignedInState'
        ];
        
        const signedOutElements = [
            'signedOutState', 
            'mobileSignedOutState'
        ];
        
        // Show signed-in elements
        signedInElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = element.id.includes('mobile') ? 'block' : 'flex';
                element.classList.remove('hidden');
                element.style.visibility = 'visible';
                element.style.opacity = '1';
                console.log(`✅ Showed ${id}`);
            } else {
                console.warn(`⚠️ Element ${id} not found`);
            }
        });
        
        // Hide signed-out elements
        signedOutElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = 'none';
                element.classList.add('hidden');
                console.log(`🔒 Hid ${id}`);
            }
        });
        
        // Force show welcome banner if it exists
        const welcomeBanner = document.getElementById('welcomeBanner');
        if (welcomeBanner) {
            welcomeBanner.classList.remove('hidden');
            welcomeBanner.style.display = 'block';
            welcomeBanner.style.visibility = 'visible';
            console.log('✅ Showed welcome banner');
        }
        
        console.log('✅ IMMEDIATE UI FIX: Signed-in UI forced to show');
        
    } else {
        console.log('🔓 User appears to be signed out');
        
        // Show signed-out UI
        const signedOutState = document.getElementById('signedOutState');
        const mobileSignedOutState = document.getElementById('mobileSignedOutState');
        
        if (signedOutState) {
            signedOutState.style.display = 'flex';
            signedOutState.classList.remove('hidden');
        }
        
        if (mobileSignedOutState) {
            mobileSignedOutState.style.display = 'block';
            mobileSignedOutState.classList.remove('hidden');
        }
    }
    
    // Fix sign-in button handlers
    const signInButtons = document.querySelectorAll('button[onclick*="openSignInModal"]');
    console.log(`🔘 Found ${signInButtons.length} sign-in buttons to fix`);
    
    signInButtons.forEach((button, index) => {
        button.onclick = function(e) {
            e.preventDefault();
            console.log(`🔘 Fixed sign-in button ${index + 1} clicked`);
            
            // Simple modal show logic
            const modal = document.getElementById('signInModal');
            if (modal) {
                modal.style.display = 'flex';
                modal.classList.remove('hidden');
                modal.style.opacity = '1';
                modal.style.visibility = 'visible';
                
                // Focus email input
                const emailInput = document.getElementById('signInEmail');
                if (emailInput) {
                    setTimeout(() => emailInput.focus(), 100);
                }
                
                console.log('✅ Sign-in modal opened');
            } else {
                alert('Sign-in form not found. Please refresh the page.');
            }
        };
        console.log(`✅ Fixed sign-in button ${index + 1}`);
    });
    
})();

// Keep trying to fix UI every few seconds in case of dynamic content
let fixAttempts = 0;
const maxAttempts = 10;

function retryFix() {
    if (fixAttempts < maxAttempts) {
        fixAttempts++;
        console.log(`🔄 UI Fix attempt ${fixAttempts}/${maxAttempts}`);
        
        // Re-run the fix
        try {
            immediateUIFix();
        } catch (e) {
            console.error('❌ Error in retry fix:', e);
        }
        
        // Schedule next attempt
        setTimeout(retryFix, 2000);
    } else {
        console.log('⏹️ Max fix attempts reached');
    }
}

// Start retry cycle
setTimeout(retryFix, 1000);

console.log('🚨 IMMEDIATE UI FIX: Complete - signed-in buttons should now be visible');

// Expose utility function
window.forceShowSignedInUI = function() {
    console.log('🔧 Manual UI fix triggered...');
    immediateUIFix();
};

console.log('💡 Run forceShowSignedInUI() to manually trigger UI fix');
