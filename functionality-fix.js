// COMPREHENSIVE FUNCTIONALITY FIX - Ensure all buttons, links, and forms work properly
console.log('🔧 Applying comprehensive functionality fix...');

(function() {
    'use strict';
    
    // Fix mobile menu toggle
    function fixMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuBtn && mobileMenu) {
            // Remove existing event listeners
            mobileMenuBtn.removeEventListener('click', window.toggleMobileMenu);
            
            // Add working toggle function
            mobileMenuBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const isHidden = mobileMenu.classList.contains('hidden');
                if (isHidden) {
                    mobileMenu.classList.remove('hidden');
                    mobileMenuBtn.setAttribute('aria-expanded', 'true');
                } else {
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
                
                console.log('📱 Mobile menu toggled:', !isHidden ? 'opened' : 'closed');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            });
            
            console.log('✅ Mobile menu functionality fixed');
        }
    }
    
    // Fix modal positioning and functionality
    function fixModals() {
        const modals = ['signInModal', 'signUpModal', 'profileModal', 'orderHistoryModal'];
        
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal) {
                // Ensure proper modal structure
                modal.style.position = 'fixed';
                modal.style.top = '0';
                modal.style.left = '0';
                modal.style.right = '0';
                modal.style.bottom = '0';
                modal.style.zIndex = '9999';
                modal.style.display = modal.classList.contains('hidden') ? 'none' : 'flex';
                modal.style.alignItems = 'center';
                modal.style.justifyContent = 'center';
                modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                modal.style.padding = '1rem';
                
                console.log(`✅ Fixed modal positioning: ${modalId}`);
            }
        });
    }
    
    // Fix navigation links
    function fixNavigationLinks() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobileMenu');
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                    
                    // Smooth scroll to target
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    console.log(`🧭 Navigated to: ${targetId}`);
                }
            });
        });
        
        console.log(`✅ Fixed ${navLinks.length} navigation links`);
    }
    
    // Fix form submissions
    function fixFormSubmissions() {
        // Fix contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                if (typeof window.submitContactForm === 'function') {
                    window.submitContactForm();
                } else {
                    console.warn('⚠️ submitContactForm function not found');
                }
            });
        }
        
        // Fix order form
        const orderForm = document.getElementById('orderForm');
        if (orderForm) {
            orderForm.addEventListener('submit', function(e) {
                e.preventDefault();
                if (typeof window.simpleOrderSubmit === 'function') {
                    window.simpleOrderSubmit(e);
                } else {
                    console.warn('⚠️ simpleOrderSubmit function not found');
                }
            });
        }
        
        console.log('✅ Form submissions fixed');
    }
    
    // Fix authentication UI updates
    function fixAuthenticationUI() {
        // Enhanced updateAuthUI function
        const originalUpdateAuthUI = window.updateAuthUI;
        
        window.updateAuthUI = function() {
            try {
                // Call original function if it exists
                if (typeof originalUpdateAuthUI === 'function') {
                    originalUpdateAuthUI.apply(this, arguments);
                }
                
                // Force update mobile authentication states
                const isAuthenticated = !!(window.currentUser && window.currentUser.id);
                
                if (isAuthenticated) {
                    document.body.classList.add('user-authenticated');
                    document.body.classList.remove('user-not-authenticated');
                } else {
                    document.body.classList.remove('user-authenticated');
                    document.body.classList.add('user-not-authenticated');
                }
                
                // Force style updates on mobile
                if (window.innerWidth <= 767) {
                    const mobileSignedOut = document.getElementById('mobileSignedOutState');
                    const mobileSignedIn = document.getElementById('mobileSignedInState');
                    
                    if (mobileSignedOut && mobileSignedIn) {
                        if (isAuthenticated) {
                            mobileSignedOut.style.display = 'none';
                            mobileSignedIn.style.display = 'block';
                        } else {
                            mobileSignedOut.style.display = 'block';
                            mobileSignedIn.style.display = 'none';
                        }
                    }
                }
                
                console.log('🔐 Authentication UI updated:', isAuthenticated ? 'signed in' : 'signed out');
                
            } catch (error) {
                console.error('❌ Error updating auth UI:', error);
            }
        };
        
        // Initial auth state update
        setTimeout(() => {
            window.updateAuthUI();
        }, 100);
        
        console.log('✅ Authentication UI fixed');
    }
    
    // Fix button click handlers
    function fixButtonHandlers() {
        // Ensure all onclick handlers work
        const buttonsWithOnclick = document.querySelectorAll('button[onclick]');
        
        buttonsWithOnclick.forEach(button => {
            const onclick = button.getAttribute('onclick');
            
            // Add fallback event listener if onclick fails
            button.addEventListener('click', function(e) {
                try {
                    // Prevent default to ensure control
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Execute the onclick code
                    const func = new Function(onclick);
                    func.call(this);
                    
                } catch (error) {
                    console.error(`❌ Button onclick error (${onclick}):`, error);
                }
            });
        });
        
        console.log(`✅ Fixed ${buttonsWithOnclick.length} button handlers`);
    }
    
    // Fix email and phone links
    function fixContactLinks() {
        // Fix email buttons
        const emailButtons = document.querySelectorAll('button[onclick*="handleEmailClick"]');
        emailButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const emailAddress = 'support@visualvibestudio.store';
                if (typeof window.handleEmailClick === 'function') {
                    window.handleEmailClick(e, emailAddress);
                } else {
                    window.location.href = `mailto:${emailAddress}`;
                }
            });
        });
        
        // Fix phone links
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Phone links should work naturally, just ensure they're not prevented
                console.log('📞 Phone link clicked:', this.href);
            });
        });
        
        console.log('✅ Contact links fixed');
    }
    
    // Fix responsive behavior
    function fixResponsiveBehavior() {
        function updateViewport() {
            const isMobile = window.innerWidth <= 767;
            document.body.setAttribute('data-viewport', isMobile ? 'mobile' : 'desktop');
            
            // Update authentication display
            if (typeof window.updateAuthUI === 'function') {
                window.updateAuthUI();
            }
        }
        
        // Update on resize
        window.addEventListener('resize', updateViewport);
        updateViewport();
        
        console.log('✅ Responsive behavior fixed');
    }
    
    // Initialize all fixes
    function initializeAllFixes() {
        console.log('🚀 Initializing comprehensive fixes...');
        
        fixMobileMenu();
        fixModals();
        fixNavigationLinks();
        fixFormSubmissions();
        fixAuthenticationUI();
        fixButtonHandlers();
        fixContactLinks();
        fixResponsiveBehavior();
        
        console.log('✅ All functionality fixes applied');
    }
    
    // Run fixes when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAllFixes);
    } else {
        initializeAllFixes();
    }
    
    // Backup initialization
    setTimeout(initializeAllFixes, 1000);
    
})();

console.log('✅ Comprehensive functionality fix script loaded');
