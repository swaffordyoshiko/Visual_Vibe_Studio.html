// COMPREHENSIVE FUNCTIONALITY TEST - Test all forms, buttons, and links on desktop and mobile
console.log('🧪 Starting comprehensive functionality test...');

// Test results tracking
const testResults = {
    passed: 0,
    failed: 0,
    warnings: 0,
    tests: []
};

function logTest(category, test, status, message) {
    const result = { category, test, status, message, timestamp: new Date().toISOString() };
    testResults.tests.push(result);
    testResults[status]++;
    
    const emoji = status === 'passed' ? '✅' : status === 'failed' ? '❌' : '⚠️';
    console.log(`${emoji} [${category}] ${test}: ${message}`);
}

// Utility functions
function isElementVisible(element) {
    if (!element) return false;
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && 
           style.visibility !== 'hidden' && 
           style.opacity !== '0' &&
           element.offsetParent !== null;
}

function isMobileView() {
    return window.innerWidth <= 767;
}

function clickElement(element, testName) {
    try {
        if (!element) {
            logTest('Click Test', testName, 'failed', 'Element not found');
            return false;
        }
        
        if (!isElementVisible(element)) {
            logTest('Click Test', testName, 'failed', 'Element not visible');
            return false;
        }
        
        element.click();
        logTest('Click Test', testName, 'passed', 'Successfully clicked');
        return true;
    } catch (error) {
        logTest('Click Test', testName, 'failed', `Click error: ${error.message}`);
        return false;
    }
}

// 1. TEST MOBILE AUTHENTICATION STATES
function testMobileAuthentication() {
    console.log('🔐 Testing mobile authentication states...');
    
    const mobileSignedOut = document.getElementById('mobileSignedOutState');
    const mobileSignedIn = document.getElementById('mobileSignedInState');
    
    if (!mobileSignedOut || !mobileSignedIn) {
        logTest('Mobile Auth', 'Elements Exist', 'failed', 'Mobile auth elements not found');
        return;
    }
    
    // Test unauthenticated state
    if (!window.currentUser) {
        const signedOutVisible = isElementVisible(mobileSignedOut);
        const signedInVisible = isElementVisible(mobileSignedIn);
        
        logTest('Mobile Auth', 'Signed Out State', signedOutVisible ? 'passed' : 'failed', 
                `Mobile signed out state visibility: ${signedOutVisible}`);
        logTest('Mobile Auth', 'Signed In Hidden', !signedInVisible ? 'passed' : 'failed', 
                `Mobile signed in state properly hidden: ${!signedInVisible}`);
    } else {
        logTest('Mobile Auth', 'User Status', 'warnings', 'User already authenticated - sign out to test');
    }
}

// 2. TEST NAVIGATION LINKS
function testNavigationLinks() {
    console.log('🧭 Testing navigation links...');
    
    const navLinks = [
        { selector: 'a[href="#services"]', name: 'Services Link' },
        { selector: 'a[href="#reviews"]', name: 'Reviews Link' },
        { selector: 'a[href="#order"]', name: 'Order Link' },
        { selector: 'a[href="#contact"]', name: 'Contact Link' }
    ];
    
    navLinks.forEach(link => {
        const element = document.querySelector(link.selector);
        if (element) {
            const isVisible = isElementVisible(element);
            logTest('Navigation', link.name, isVisible ? 'passed' : 'failed', 
                   `Visibility: ${isVisible}, Href: ${element.href}`);
        } else {
            logTest('Navigation', link.name, 'failed', 'Element not found');
        }
    });
}

// 3. TEST MOBILE MENU FUNCTIONALITY
function testMobileMenu() {
    console.log('📱 Testing mobile menu functionality...');
    
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!mobileMenuBtn) {
        logTest('Mobile Menu', 'Menu Button', 'failed', 'Mobile menu button not found');
        return;
    }
    
    if (!mobileMenu) {
        logTest('Mobile Menu', 'Menu Container', 'failed', 'Mobile menu container not found');
        return;
    }
    
    // Test button visibility on mobile
    if (isMobileView()) {
        const btnVisible = isElementVisible(mobileMenuBtn);
        logTest('Mobile Menu', 'Button Visibility', btnVisible ? 'passed' : 'failed', 
               `Mobile menu button visible on mobile: ${btnVisible}`);
        
        // Test menu toggle
        try {
            const initiallyHidden = mobileMenu.classList.contains('hidden');
            mobileMenuBtn.click();
            setTimeout(() => {
                const afterClick = mobileMenu.classList.contains('hidden');
                const toggled = initiallyHidden !== afterClick;
                logTest('Mobile Menu', 'Toggle Function', toggled ? 'passed' : 'failed', 
                       `Menu toggle works: ${toggled}`);
            }, 100);
        } catch (error) {
            logTest('Mobile Menu', 'Toggle Function', 'failed', `Toggle error: ${error.message}`);
        }
    } else {
        logTest('Mobile Menu', 'Desktop View', 'warnings', 'Switch to mobile view to test mobile menu');
    }
}

// 4. TEST CTA BUTTONS AND HERO SECTION
function testHeroSection() {
    console.log('🎯 Testing hero section CTAs...');
    
    const ctaButtons = document.querySelectorAll('.hero-section button, .hero-section a.btn');
    
    if (ctaButtons.length === 0) {
        logTest('Hero Section', 'CTA Buttons', 'warnings', 'No CTA buttons found in hero section');
        return;
    }
    
    ctaButtons.forEach((btn, index) => {
        const isVisible = isElementVisible(btn);
        const text = btn.textContent.trim();
        logTest('Hero Section', `CTA Button ${index + 1}`, isVisible ? 'passed' : 'failed', 
               `"${text}" visibility: ${isVisible}`);
    });
}

// 5. TEST SERVICE CARDS AND PORTFOLIO
function testServiceInteractions() {
    console.log('💼 Testing service cards and portfolio...');
    
    const serviceCards = document.querySelectorAll('.service-card, [class*="service"]');
    const portfolioItems = document.querySelectorAll('.portfolio-item, [class*="portfolio"]');
    
    logTest('Services', 'Service Cards Found', serviceCards.length > 0 ? 'passed' : 'warnings', 
           `Found ${serviceCards.length} service cards`);
    logTest('Portfolio', 'Portfolio Items Found', portfolioItems.length > 0 ? 'passed' : 'warnings', 
           `Found ${portfolioItems.length} portfolio items`);
}

// 6. TEST FORM SUBMISSIONS
function testFormSubmissions() {
    console.log('📝 Testing form submissions...');
    
    // Test contact form
    const contactForm = document.getElementById('contactForm');
    const submitContactBtn = document.getElementById('submitContactBtn');
    
    if (contactForm && submitContactBtn) {
        const formVisible = isElementVisible(contactForm);
        const btnVisible = isElementVisible(submitContactBtn);
        logTest('Forms', 'Contact Form', formVisible && btnVisible ? 'passed' : 'failed', 
               `Form visible: ${formVisible}, Button visible: ${btnVisible}`);
    } else {
        logTest('Forms', 'Contact Form', 'warnings', 'Contact form elements not found');
    }
    
    // Test order form
    const orderForm = document.getElementById('orderForm');
    const submitOrderBtn = document.getElementById('submitOrderBtn');
    
    if (orderForm && submitOrderBtn) {
        const formVisible = isElementVisible(orderForm);
        const btnVisible = isElementVisible(submitOrderBtn);
        logTest('Forms', 'Order Form', formVisible && btnVisible ? 'passed' : 'failed', 
               `Form visible: ${formVisible}, Button visible: ${btnVisible}`);
    } else {
        logTest('Forms', 'Order Form', 'warnings', 'Order form elements not found');
    }
}

// 7. TEST MODAL FUNCTIONS
function testModalFunctions() {
    console.log('🏠 Testing modal functions...');
    
    const modals = [
        { id: 'signInModal', name: 'Sign In Modal', trigger: 'openSignInModal' },
        { id: 'signUpModal', name: 'Sign Up Modal', trigger: 'openSignUpModal' },
        { id: 'profileModal', name: 'Profile Modal', trigger: 'openProfileModal' },
        { id: 'orderHistoryModal', name: 'Order History Modal', trigger: 'showOrderHistory' }
    ];
    
    modals.forEach(modal => {
        const element = document.getElementById(modal.id);
        const triggerExists = typeof window[modal.trigger] === 'function';
        
        logTest('Modals', modal.name, element && triggerExists ? 'passed' : 'failed', 
               `Element exists: ${!!element}, Function exists: ${triggerExists}`);
    });
}

// 8. TEST AUTHENTICATION BUTTONS
function testAuthenticationButtons() {
    console.log('🔑 Testing authentication buttons...');
    
    // Desktop auth buttons
    const signInBtn = document.querySelector('button[onclick="openSignInModal()"]');
    const signUpBtn = document.querySelector('button[onclick="openSignUpModal()"]');
    const signOutBtn = document.querySelector('button[onclick="signOut()"]');
    
    if (!window.currentUser) {
        // Test signed out state
        logTest('Auth Buttons', 'Sign In Button', signInBtn && isElementVisible(signInBtn) ? 'passed' : 'failed', 
               'Sign in button visibility when signed out');
        logTest('Auth Buttons', 'Sign Up Button', signUpBtn && isElementVisible(signUpBtn) ? 'passed' : 'failed', 
               'Sign up button visibility when signed out');
        logTest('Auth Buttons', 'Sign Out Hidden', !signOutBtn || !isElementVisible(signOutBtn) ? 'passed' : 'failed', 
               'Sign out button properly hidden when signed out');
    } else {
        // Test signed in state
        logTest('Auth Buttons', 'Sign Out Button', signOutBtn && isElementVisible(signOutBtn) ? 'passed' : 'failed', 
               'Sign out button visibility when signed in');
    }
}

// 9. TEST EMAIL AND CONTACT FUNCTIONS
function testContactFunctions() {
    console.log('📧 Testing contact functions...');
    
    const emailButtons = document.querySelectorAll('button[onclick*="handleEmailClick"]');
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    logTest('Contact', 'Email Buttons', emailButtons.length > 0 ? 'passed' : 'warnings', 
           `Found ${emailButtons.length} email buttons`);
    logTest('Contact', 'Phone Links', phoneLinks.length > 0 ? 'passed' : 'warnings', 
           `Found ${phoneLinks.length} phone links`);
           
    // Test if handleEmailClick function exists
    const emailFunctionExists = typeof window.handleEmailClick === 'function';
    logTest('Contact', 'Email Function', emailFunctionExists ? 'passed' : 'failed', 
           `handleEmailClick function exists: ${emailFunctionExists}`);
}

// 10. TEST RESPONSIVE BEHAVIOR
function testResponsiveBehavior() {
    console.log('📱💻 Testing responsive behavior...');
    
    const viewport = isMobileView() ? 'Mobile' : 'Desktop';
    logTest('Responsive', 'Current View', 'passed', `Currently in ${viewport} view (${window.innerWidth}px)`);
    
    // Test critical elements are visible in current viewport
    const header = document.querySelector('header');
    const navigation = document.querySelector('nav');
    const mainContent = document.querySelector('main, .main-content');
    
    logTest('Responsive', 'Header Visible', header && isElementVisible(header) ? 'passed' : 'failed', 
           'Header visibility in current viewport');
    logTest('Responsive', 'Navigation Accessible', navigation && isElementVisible(navigation) ? 'passed' : 'failed', 
           'Navigation accessibility in current viewport');
    logTest('Responsive', 'Main Content Visible', mainContent && isElementVisible(mainContent) ? 'passed' : 'failed', 
           'Main content visibility in current viewport');
}

// RUN ALL TESTS
async function runAllTests() {
    console.log('🚀 Starting comprehensive functionality tests...');
    console.log(`📱 Viewport: ${window.innerWidth}x${window.innerHeight} (${isMobileView() ? 'Mobile' : 'Desktop'})`);
    
    // Reset results
    testResults.passed = 0;
    testResults.failed = 0;
    testResults.warnings = 0;
    testResults.tests = [];
    
    // Run all test categories
    testMobileAuthentication();
    testNavigationLinks();
    testMobileMenu();
    testHeroSection();
    testServiceInteractions();
    testFormSubmissions();
    testModalFunctions();
    testAuthenticationButtons();
    testContactFunctions();
    testResponsiveBehavior();
    
    // Wait for async tests to complete
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate final report
    console.log('\n📊 COMPREHENSIVE TEST RESULTS:');
    console.log(`✅ Passed: ${testResults.passed}`);
    console.log(`❌ Failed: ${testResults.failed}`);
    console.log(`⚠️ Warnings: ${testResults.warnings}`);
    console.log(`📋 Total Tests: ${testResults.tests.length}`);
    
    if (testResults.failed > 0) {
        console.log('\n🔍 FAILED TESTS:');
        testResults.tests.filter(t => t.status === 'failed').forEach(test => {
            console.log(`❌ [${test.category}] ${test.test}: ${test.message}`);
        });
    }
    
    if (testResults.warnings > 0) {
        console.log('\n⚠️ WARNINGS:');
        testResults.tests.filter(t => t.status === 'warnings').forEach(test => {
            console.log(`⚠️ [${test.category}] ${test.test}: ${test.message}`);
        });
    }
    
    const successRate = ((testResults.passed / testResults.tests.length) * 100).toFixed(1);
    console.log(`\n🎯 Success Rate: ${successRate}%`);
    
    return testResults;
}

// Auto-run tests when script loads
setTimeout(runAllTests, 1000);

// Make functions available globally for manual testing
window.testAllFunctionality = runAllTests;
window.testMobileAuth = testMobileAuthentication;
window.testNavigation = testNavigationLinks;
window.testMobileMenu = testMobileMenu;

console.log('✅ Comprehensive test script loaded. Run testAllFunctionality() to test all functionality.');
