// Mobile Authentication Override - JavaScript solution to fix CSS conflicts
// This script ensures mobile authentication states work correctly despite CSS overrides

(function() {
    'use strict';
    
    console.log('🔧 Mobile Auth Override: Initializing...');
    
    // Create high-priority CSS to override the conflicting mobile CSS files
    function createAuthenticationCSS() {
        const css = `
        /* CRITICAL: Override all mobile CSS that prevents authentication states */
        @media screen and (max-width: 767px) {
            /* Mobile auth states - use higher specificity than existing CSS */
            body #mobileSignedOutState {
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
            
            body #mobileSignedInState {
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
            
            /* When user is signed in */
            body.user-authenticated #mobileSignedOutState {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
            }
            
            body.user-authenticated #mobileSignedInState {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                pointer-events: auto !important;
            }
            
            /* Ensure mobile menu is not forcefully hidden when authentication toggles */
            body #mobileMenu {
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
            
            body #mobileMenu.hidden {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
            }
            
            body #mobileMenu:not(.hidden) {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                pointer-events: auto !important;
            }
        }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.textContent = css;
        styleElement.id = 'mobile-auth-override';
        
        // Insert as last stylesheet to ensure highest priority
        document.head.appendChild(styleElement);
        console.log('✅ Mobile Auth Override: CSS injected');
    }
    
    // Enhanced authentication UI updater that uses body classes
    function updateMobileAuthUI() {
        try {
            const mobileSignedOutState = document.getElementById('mobileSignedOutState');
            const mobileSignedInState = document.getElementById('mobileSignedInState');
            
            if (!mobileSignedOutState || !mobileSignedInState) {
                console.warn('🔧 Mobile Auth Override: Mobile auth state elements not found');
                return;
            }
            
            if (window.currentUser) {
                // User is signed in
                document.body.classList.add('user-authenticated');
                console.log('✅ Mobile Auth Override: User authenticated state applied');
            } else {
                // User is signed out
                document.body.classList.remove('user-authenticated');
                console.log('✅ Mobile Auth Override: User signed out state applied');
            }
            
            // Force style recalculation
            mobileSignedOutState.style.display = window.currentUser ? 'none' : 'block';
            mobileSignedInState.style.display = window.currentUser ? 'block' : 'none';
            
        } catch (error) {
            console.error('🔧 Mobile Auth Override: Error updating auth UI:', error);
        }
    }
    
    // Override the original updateAuthUI function
    function setupAuthUIOverride() {
        // Store original function
        const originalUpdateAuthUI = window.updateAuthUI;
        
        // Create enhanced version
        window.updateAuthUI = function() {
            // Call original function first
            if (typeof originalUpdateAuthUI === 'function') {
                originalUpdateAuthUI.apply(this, arguments);
            }
            
            // Then apply our mobile-specific fixes
            updateMobileAuthUI();
        };
        
        console.log('✅ Mobile Auth Override: updateAuthUI function enhanced');
    }
    
    // Initialize when DOM is ready
    function initialize() {
        console.log('🔧 Mobile Auth Override: DOM ready, initializing...');
        
        // Inject CSS immediately
        createAuthenticationCSS();
        
        // Setup auth UI override
        setupAuthUIOverride();
        
        // Update UI immediately if user is already logged in
        setTimeout(() => {
            updateMobileAuthUI();
        }, 100);
        
        // Monitor for authentication changes
        const originalSaveUserSession = window.saveUserSession;
        if (typeof originalSaveUserSession === 'function') {
            window.saveUserSession = function() {
                originalSaveUserSession.apply(this, arguments);
                setTimeout(updateMobileAuthUI, 50);
            };
        }
        
        console.log('✅ Mobile Auth Override: Initialization complete');
    }
    
    // Initialize based on document state
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    // Fallback initialization after a delay
    setTimeout(() => {
        if (!document.getElementById('mobile-auth-override')) {
            console.log('🔧 Mobile Auth Override: Fallback initialization...');
            initialize();
        }
    }, 1000);
    
})();
