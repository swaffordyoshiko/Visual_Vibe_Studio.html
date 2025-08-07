// QUICK FUNCTIONALITY CHECK - Verify all key elements work
console.log('🔍 Quick functionality verification...');

function quickCheck() {
    const results = {
        mobile: {},
        desktop: {},
        forms: {},
        buttons: {},
        links: {}
    };
    
    // Check mobile authentication
    const mobileSignedOut = document.getElementById('mobileSignedOutState');
    const mobileSignedIn = document.getElementById('mobileSignedInState');
    results.mobile.authElementsExist = !!(mobileSignedOut && mobileSignedIn);
    results.mobile.signedOutVisible = mobileSignedOut ? getComputedStyle(mobileSignedOut).display !== 'none' : false;
    results.mobile.signedInVisible = mobileSignedIn ? getComputedStyle(mobileSignedIn).display !== 'none' : false;
    
    // Check navigation
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    results.links.navigationCount = navLinks.length;
    results.links.navigationWorking = Array.from(navLinks).every(link => link.href);
    
    // Check mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    results.mobile.menuButtonExists = !!mobileMenuBtn;
    results.mobile.menuExists = !!mobileMenu;
    
    // Check key buttons
    const signInBtn = document.querySelector('button[onclick*="openSignInModal"]');
    const signUpBtn = document.querySelector('button[onclick*="openSignUpModal"]');
    const contactBtn = document.querySelector('button[onclick*="submitContactForm"]');
    
    results.buttons.signIn = !!signInBtn;
    results.buttons.signUp = !!signUpBtn;
    results.buttons.contact = !!contactBtn;
    
    // Check forms
    const contactForm = document.getElementById('contactForm');
    const orderForm = document.getElementById('orderForm');
    results.forms.contact = !!contactForm;
    results.forms.order = !!orderForm;
    
    // Check modal functions
    results.functions = {
        openSignInModal: typeof window.openSignInModal === 'function',
        openSignUpModal: typeof window.openSignUpModal === 'function',
        showOrderHistory: typeof window.showOrderHistory === 'function',
        openProfileModal: typeof window.openProfileModal === 'function',
        handleEmailClick: typeof window.handleEmailClick === 'function',
        submitContactForm: typeof window.submitContactForm === 'function'
    };
    
    // Current state
    results.currentState = {
        userAuthenticated: !!(window.currentUser && window.currentUser.id),
        viewportWidth: window.innerWidth,
        isMobile: window.innerWidth <= 767
    };
    
    // Display results
    console.log('📱 MOBILE AUTHENTICATION CHECK:');
    console.log(`Auth elements exist: ${results.mobile.authElementsExist ? '✅' : '❌'}`);
    console.log(`Signed out state visible: ${results.mobile.signedOutVisible ? '✅' : '❌'}`);
    console.log(`Signed in state visible: ${results.mobile.signedInVisible ? '✅' : '❌'}`);
    
    console.log('\n🧭 NAVIGATION CHECK:');
    console.log(`Navigation links found: ${results.links.navigationCount} ${results.links.navigationCount > 0 ? '✅' : '❌'}`);
    console.log(`Navigation links working: ${results.links.navigationWorking ? '✅' : '❌'}`);
    
    console.log('\n📱 MOBILE MENU CHECK:');
    console.log(`Mobile menu button exists: ${results.mobile.menuButtonExists ? '✅' : '❌'}`);
    console.log(`Mobile menu exists: ${results.mobile.menuExists ? '✅' : '❌'}`);
    
    console.log('\n🔘 BUTTONS CHECK:');
    console.log(`Sign In button: ${results.buttons.signIn ? '✅' : '❌'}`);
    console.log(`Sign Up button: ${results.buttons.signUp ? '✅' : '❌'}`);
    console.log(`Contact button: ${results.buttons.contact ? '✅' : '❌'}`);
    
    console.log('\n📝 FORMS CHECK:');
    console.log(`Contact form: ${results.forms.contact ? '✅' : '❌'}`);
    console.log(`Order form: ${results.forms.order ? '✅' : '❌'}`);
    
    console.log('\n⚙️ FUNCTIONS CHECK:');
    Object.entries(results.functions).forEach(([func, exists]) => {
        console.log(`${func}: ${exists ? '✅' : '❌'}`);
    });
    
    console.log('\n📊 CURRENT STATE:');
    console.log(`User authenticated: ${results.currentState.userAuthenticated ? '✅' : '❌'}`);
    console.log(`Viewport: ${results.currentState.viewportWidth}px (${results.currentState.isMobile ? 'Mobile' : 'Desktop'})`);
    
    // Check if mobile authentication is working correctly
    if (!results.currentState.userAuthenticated && results.currentState.isMobile) {
        const authWorking = results.mobile.signedOutVisible && !results.mobile.signedInVisible;
        console.log(`\n🔑 MOBILE AUTH STATUS: ${authWorking ? '✅ WORKING' : '❌ NEEDS FIX'}`);
        
        if (!authWorking) {
            console.log('❌ Mobile authentication not working - Edit Profile/My Orders may be visible when they should be hidden');
        }
    }
    
    return results;
}

// Run check
setTimeout(quickCheck, 2000);

// Make available globally
window.quickFunctionalityCheck = quickCheck;
console.log('✅ Quick functionality check loaded. Run quickFunctionalityCheck() to verify functionality.');
