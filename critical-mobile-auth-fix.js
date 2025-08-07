// CRITICAL MOBILE AUTH FIX - Aggressive CSS overrides to force proper authentication behavior
console.log('🚨 CRITICAL: Applying mobile authentication fix...');

// Inject aggressive CSS with maximum specificity
function injectCriticalCSS() {
    const css = `
    /* CRITICAL: Maximum specificity CSS to override all conflicting mobile CSS */
    @media screen and (max-width: 767px) {
        /* Force hide mobile signed-in state when not authenticated - maximum specificity */
        html body div#mobileSignedInState,
        html body.user-not-authenticated div#mobileSignedInState,
        html body:not(.user-authenticated) div#mobileSignedInState,
        html body div[id="mobileSignedInState"],
        html body:not(.user-authenticated) div[id="mobileSignedInState"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            position: absolute !important;
            left: -99999px !important;
            top: -99999px !important;
            width: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
            pointer-events: none !important;
            z-index: -999 !important;
            transform: scale(0) !important;
            clip: rect(0, 0, 0, 0) !important;
            clip-path: polygon(0 0, 0 0, 0 0, 0 0) !important;
        }
        
        /* Force show mobile signed-out state when not authenticated */
        html body div#mobileSignedOutState,
        html body.user-not-authenticated div#mobileSignedOutState,
        html body:not(.user-authenticated) div#mobileSignedOutState,
        html body div[id="mobileSignedOutState"],
        html body:not(.user-authenticated) div[id="mobileSignedOutState"] {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: relative !important;
            left: auto !important;
            top: auto !important;
            right: auto !important;
            bottom: auto !important;
            width: auto !important;
            height: auto !important;
            overflow: visible !important;
            pointer-events: auto !important;
            z-index: auto !important;
            transform: none !important;
            clip: auto !important;
            clip-path: none !important;
        }
        
        /* When user IS authenticated, reverse the visibility */
        html body.user-authenticated div#mobileSignedOutState,
        html body.user-authenticated div[id="mobileSignedOutState"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            position: absolute !important;
            left: -99999px !important;
            top: -99999px !important;
            width: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
            pointer-events: none !important;
            z-index: -999 !important;
            transform: scale(0) !important;
            clip: rect(0, 0, 0, 0) !important;
            clip-path: polygon(0 0, 0 0, 0 0, 0 0) !important;
        }
        
        html body.user-authenticated div#mobileSignedInState,
        html body.user-authenticated div[id="mobileSignedInState"] {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: relative !important;
            left: auto !important;
            top: auto !important;
            right: auto !important;
            bottom: auto !important;
            width: auto !important;
            height: auto !important;
            overflow: visible !important;
            pointer-events: auto !important;
            z-index: auto !important;
            transform: none !important;
            clip: auto !important;
            clip-path: none !important;
        }
        
        /* Force hide individual buttons in signed-in state when not authenticated */
        html body:not(.user-authenticated) div#mobileSignedInState button,
        html body:not(.user-authenticated) div[id="mobileSignedInState"] button,
        html body:not(.user-authenticated) button[onclick*="openProfileModal"],
        html body:not(.user-authenticated) button[onclick*="showOrderHistory"],
        html body:not(.user-authenticated) button[onclick*="signOut"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            position: absolute !important;
            left: -99999px !important;
            pointer-events: none !important;
            z-index: -999 !important;
        }
    }
    
    /* Also apply for larger screens if needed */
    @media screen and (min-width: 768px) {
        /* Desktop auth states should also respect authentication */
        html body:not(.user-authenticated) div#signedInState,
        html body:not(.user-authenticated) div[id="signedInState"] {
            display: none !important;
            visibility: hidden !important;
        }
        
        html body:not(.user-authenticated) div#signedOutState,
        html body:not(.user-authenticated) div[id="signedOutState"] {
            display: flex !important;
            visibility: visible !important;
        }
    }`;
    
    const styleElement = document.createElement('style');
    styleElement.textContent = css;
    styleElement.id = 'critical-mobile-auth-fix';
    
    // Remove any existing fix
    const existing = document.getElementById('critical-mobile-auth-fix');
    if (existing) existing.remove();
    
    // Insert as last element to ensure highest priority
    document.head.appendChild(styleElement);
    console.log('✅ CRITICAL: Aggressive CSS injected');
}

// Force update authentication state
function forceUpdateAuthState() {
    try {
        // Remove any existing auth classes
        document.body.classList.remove('user-authenticated', 'user-not-authenticated');
        
        // Check current authentication state
        const isAuthenticated = !!(window.currentUser && window.currentUser.id);
        
        if (isAuthenticated) {
            document.body.classList.add('user-authenticated');
            console.log('✅ CRITICAL: User is authenticated - showing signed-in elements');
        } else {
            document.body.classList.add('user-not-authenticated');
            console.log('✅ CRITICAL: User NOT authenticated - hiding signed-in elements');
        }
        
        // Force style recalculation on mobile elements
        const mobileSignedOut = document.getElementById('mobileSignedOutState');
        const mobileSignedIn = document.getElementById('mobileSignedInState');
        
        if (mobileSignedOut && mobileSignedIn) {
            // Force reflow
            mobileSignedOut.style.display = isAuthenticated ? 'none' : 'block';
            mobileSignedIn.style.display = isAuthenticated ? 'block' : 'none';
            
            // Force layout recalculation
            mobileSignedOut.offsetHeight;
            mobileSignedIn.offsetHeight;
        }
        
    } catch (error) {
        console.error('🚨 CRITICAL: Error updating auth state:', error);
    }
}

// Override critical authentication functions
function setupCriticalOverrides() {
    // Store originals
    const originalUpdateAuthUI = window.updateAuthUI;
    const originalSignOut = window.signOut;
    
    // Override updateAuthUI
    window.updateAuthUI = function() {
        console.log('🔧 CRITICAL: updateAuthUI called');
        
        // Call original
        if (typeof originalUpdateAuthUI === 'function') {
            originalUpdateAuthUI.apply(this, arguments);
        }
        
        // Force our critical update
        setTimeout(forceUpdateAuthState, 10);
    };
    
    // Override signOut to ensure proper cleanup
    if (typeof originalSignOut === 'function') {
        window.signOut = function() {
            console.log('🔧 CRITICAL: signOut called');
            originalSignOut.apply(this, arguments);
            
            // Force immediate update
            setTimeout(() => {
                window.currentUser = null;
                forceUpdateAuthState();
            }, 50);
        };
    }
    
    console.log('✅ CRITICAL: Function overrides installed');
}

// Monitor authentication changes aggressively
function startAuthMonitoring() {
    let lastAuthState = null;
    
    setInterval(() => {
        const currentAuthState = !!(window.currentUser && window.currentUser.id);
        
        if (currentAuthState !== lastAuthState) {
            console.log('🔧 CRITICAL: Auth state change detected:', currentAuthState);
            forceUpdateAuthState();
            lastAuthState = currentAuthState;
        }
    }, 500); // Check every 500ms
}

// Initialize critical fix
function initializeCriticalFix() {
    console.log('🚨 CRITICAL: Initializing mobile auth fix...');
    
    // Inject CSS immediately
    injectCriticalCSS();
    
    // Setup overrides
    setupCriticalOverrides();
    
    // Force initial state
    setTimeout(forceUpdateAuthState, 100);
    
    // Start monitoring
    startAuthMonitoring();
    
    console.log('✅ CRITICAL: Mobile auth fix initialized');
}

// Run immediately
initializeCriticalFix();

// Backup initialization
setTimeout(initializeCriticalFix, 1000);
setTimeout(initializeCriticalFix, 3000);
