// Immediate Mobile Authentication Fix
// This script fixes mobile authentication display issues caused by CSS conflicts

console.log('🔧 Applying mobile authentication fix...');

// Inject CSS fix immediately
const css = `
@media screen and (max-width: 767px) {
    /* Override all CSS files that force hide mobile auth states */
    html body #mobileSignedOutState {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: relative !important;
        left: auto !important;
        right: auto !important;
        top: auto !important;
        pointer-events: auto !important;
        z-index: auto !important;
        width: auto !important;
        height: auto !important;
        transform: none !important;
        clip: auto !important;
        clip-path: none !important;
    }
    
    html body #mobileSignedInState {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        position: relative !important;
        left: auto !important;
        right: auto !important;
        top: auto !important;
        pointer-events: none !important;
        z-index: auto !important;
        width: auto !important;
        height: auto !important;
        transform: none !important;
        clip: auto !important;
        clip-path: none !important;
    }
    
    /* When user is authenticated */
    html body.user-authenticated #mobileSignedOutState {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
    }
    
    html body.user-authenticated #mobileSignedInState {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        pointer-events: auto !important;
    }
    
    /* Ensure mobile menu works properly */
    html body #mobileMenu {
        position: absolute !important;
        top: 100% !important;
        left: 0 !important;
        right: 0 !important;
        background: white !important;
        border-top: 1px solid rgb(229, 231, 235) !important;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
        z-index: 50 !important;
        padding: 1rem !important;
        width: auto !important;
        height: auto !important;
        clip: auto !important;
        clip-path: none !important;
        transform: none !important;
        overflow: visible !important;
    }
    
    html body #mobileMenu.hidden {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
    }
    
    html body #mobileMenu:not(.hidden) {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        pointer-events: auto !important;
    }
}`;

const styleElement = document.createElement('style');
styleElement.textContent = css;
styleElement.id = 'mobile-auth-fix-critical';
document.head.appendChild(styleElement);

// Function to update mobile authentication state
function updateMobileAuthState() {
    try {
        const mobileSignedOutState = document.getElementById('mobileSignedOutState');
        const mobileSignedInState = document.getElementById('mobileSignedInState');
        
        if (!mobileSignedOutState || !mobileSignedInState) {
            return;
        }
        
        if (window.currentUser) {
            // User is signed in - show Edit Profile and My Orders
            document.body.classList.add('user-authenticated');
            console.log('✅ Mobile: User authenticated - showing Edit Profile and My Orders');
        } else {
            // User is signed out - hide Edit Profile and My Orders  
            document.body.classList.remove('user-authenticated');
            console.log('✅ Mobile: User signed out - hiding Edit Profile and My Orders');
        }
        
    } catch (error) {
        console.error('❌ Mobile auth state update error:', error);
    }
}

// Override the updateAuthUI function to include mobile fixes
function setupMobileAuthFix() {
    const originalUpdateAuthUI = window.updateAuthUI;
    
    window.updateAuthUI = function() {
        // Call original function
        if (typeof originalUpdateAuthUI === 'function') {
            originalUpdateAuthUI.apply(this, arguments);
        }
        
        // Apply mobile-specific fixes
        setTimeout(updateMobileAuthState, 10);
    };
    
    // Also hook into sign in/out functions
    const originalSignOut = window.signOut;
    if (typeof originalSignOut === 'function') {
        window.signOut = function() {
            originalSignOut.apply(this, arguments);
            setTimeout(updateMobileAuthState, 50);
        };
    }
    
    console.log('✅ Mobile authentication fix installed');
}

// Initialize when DOM is ready
function initializeMobileAuthFix() {
    setupMobileAuthFix();
    
    // Update state immediately
    setTimeout(updateMobileAuthState, 100);
    
    // Monitor for authentication changes
    setInterval(updateMobileAuthState, 2000);
}

// Run immediately or when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMobileAuthFix);
} else {
    initializeMobileAuthFix();
}

console.log('✅ Mobile authentication fix script loaded');
