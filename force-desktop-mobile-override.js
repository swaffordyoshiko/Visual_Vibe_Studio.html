// Force Desktop View on Mobile Devices - JavaScript Override
(function() {
    'use strict';
    
    console.log('🖥️ Force Desktop View - Loading...');
    
    // 1. Update viewport meta tag to force desktop width
    function updateViewport() {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=1024, initial-scale=0.5, minimum-scale=0.3, maximum-scale=1.0, user-scalable=yes');
            console.log('✅ Viewport updated to force desktop width');
        }
    }
    
    // 2. Inject desktop-only CSS
    function injectDesktopCSS() {
        const style = document.createElement('style');
        style.id = 'force-desktop-override';
        style.innerHTML = `
            /* FORCE DESKTOP VIEW ON ALL DEVICES */
            
            /* Force minimum desktop width */
            html, body {
                min-width: 1024px !important;
                overflow-x: auto !important;
                width: 100% !important;
            }
            
            /* Force desktop navigation - hide mobile elements */
            #mobileMenu,
            #mobileMenuBtn,
            .md\\:hidden {
                display: none !important;
            }
            
            /* Force desktop navigation - show desktop elements */
            .hidden.md\\:flex,
            nav.hidden.md\\:flex {
                display: flex !important;
            }
            
            /* Force desktop grid layouts on all screen sizes */
            .grid-cols-1.sm\\:grid-cols-2,
            .grid-cols-1.md\\:grid-cols-2 {
                grid-template-columns: repeat(2, 1fr) !important;
            }
            
            .grid-cols-1.sm\\:grid-cols-3,
            .grid-cols-1.md\\:grid-cols-3,
            .grid-cols-1.lg\\:grid-cols-3 {
                grid-template-columns: repeat(3, 1fr) !important;
            }
            
            .grid-cols-1.xl\\:grid-cols-4 {
                grid-template-columns: repeat(4, 1fr) !important;
            }
            
            /* Force desktop flex layouts */
            .flex-col.sm\\:flex-row,
            .flex-col.md\\:flex-row {
                flex-direction: row !important;
            }
            
            /* Force desktop text sizes */
            .text-6xl {
                font-size: 3.75rem !important;
                line-height: 1 !important;
            }
            
            .text-5xl {
                font-size: 3rem !important;
                line-height: 1 !important;
            }
            
            .text-4xl {
                font-size: 2.25rem !important;
                line-height: 2.5rem !important;
            }
            
            .text-3xl {
                font-size: 1.875rem !important;
                line-height: 2.25rem !important;
            }
            
            .text-2xl {
                font-size: 1.5rem !important;
                line-height: 2rem !important;
            }
            
            .text-xl {
                font-size: 1.25rem !important;
                line-height: 1.75rem !important;
            }
            
            /* Force desktop spacing */
            .py-20 {
                padding-top: 5rem !important;
                padding-bottom: 5rem !important;
            }
            
            .py-16 {
                padding-top: 4rem !important;
                padding-bottom: 4rem !important;
            }
            
            .py-12 {
                padding-top: 3rem !important;
                padding-bottom: 3rem !important;
            }
            
            .px-4 {
                padding-left: 2rem !important;
                padding-right: 2rem !important;
            }
            
            /* Force desktop containers */
            .container,
            .max-w-7xl,
            .max-w-6xl,
            .max-w-5xl,
            .max-w-4xl {
                max-width: none !important;
                padding-left: 2rem !important;
                padding-right: 2rem !important;
                margin-left: auto !important;
                margin-right: auto !important;
            }
            
            /* Override ALL mobile media queries */
            @media (max-width: 767px) {
                html, body {
                    min-width: 1024px !important;
                    overflow-x: auto !important;
                }
                
                /* Force desktop navigation */
                #mobileMenu,
                #mobileMenuBtn,
                #mobileSignedOutState,
                #mobileSignedInState {
                    display: none !important;
                }
                
                nav.hidden.md\\:flex {
                    display: flex !important;
                }
                
                .md\\:hidden {
                    display: none !important;
                }
                
                /* Force desktop grids */
                .grid-cols-1 {
                    grid-template-columns: repeat(3, 1fr) !important;
                    gap: 1.5rem !important;
                }
                
                .grid-cols-1.md\\:grid-cols-2 {
                    grid-template-columns: repeat(2, 1fr) !important;
                }
                
                .grid-cols-1.md\\:grid-cols-3 {
                    grid-template-columns: repeat(3, 1fr) !important;
                }
                
                /* Force desktop flex */
                .flex-col {
                    flex-direction: row !important;
                }
                
                .flex {
                    flex-wrap: nowrap !important;
                }
                
                /* Force desktop text sizes */
                h1, .text-6xl {
                    font-size: 3.75rem !important;
                    line-height: 1 !important;
                }
                
                h2, .text-5xl {
                    font-size: 3rem !important;
                    line-height: 1 !important;
                }
                
                h3, .text-4xl {
                    font-size: 2.25rem !important;
                    line-height: 2.5rem !important;
                }
                
                /* Force desktop spacing */
                .py-20 {
                    padding-top: 5rem !important;
                    padding-bottom: 5rem !important;
                }
                
                .py-16 {
                    padding-top: 4rem !important;
                    padding-bottom: 4rem !important;
                }
                
                .px-4 {
                    padding-left: 2rem !important;
                    padding-right: 2rem !important;
                }
                
                /* Force desktop buttons */
                button, .btn {
                    width: auto !important;
                    padding: 0.5rem 1rem !important;
                    font-size: 0.875rem !important;
                    min-height: auto !important;
                }
                
                /* Force desktop forms */
                input, select, textarea {
                    font-size: 0.875rem !important;
                    padding: 0.5rem 0.75rem !important;
                    width: auto !important;
                }
                
                /* Force desktop layout components */
                .hero-section {
                    padding: 4rem 2rem !important;
                    min-height: 60vh !important;
                }
                
                /* Force desktop card layouts */
                .services-grid,
                .testimonials-grid,
                .features-grid {
                    display: grid !important;
                    grid-template-columns: repeat(3, 1fr) !important;
                    gap: 2rem !important;
                }
                
                #allCustomerReviews {
                    display: grid !important;
                    grid-template-columns: repeat(3, 1fr) !important;
                    gap: 1.5rem !important;
                }
                
                /* Force desktop modals */
                .modal,
                .fixed.inset-0 {
                    position: fixed !important;
                    top: 50% !important;
                    left: 50% !important;
                    transform: translate(-50%, -50%) !important;
                    width: 600px !important;
                    max-width: 90vw !important;
                    height: auto !important;
                    inset: auto !important;
                }
            }
            
            @media (max-width: 640px) {
                html, body {
                    min-width: 1024px !important;
                    overflow-x: auto !important;
                }
            }
            
            @media (max-width: 480px) {
                html, body {
                    min-width: 1024px !important;
                    overflow-x: auto !important;
                }
            }
            
            /* Ensure specific elements always show desktop version */
            .block.md\\:hidden {
                display: none !important;
            }
            
            .hidden.md\\:block {
                display: block !important;
            }
            
            .hidden.md\\:flex {
                display: flex !important;
            }
            
            .hidden.lg\\:flex {
                display: flex !important;
            }
        `;
        
        document.head.appendChild(style);
        console.log('✅ Desktop-only CSS injected');
    }
    
    // 3. Force display of desktop navigation and hide mobile elements
    function forceDesktopElements() {
        // Hide mobile menu and button
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileSignedOutState = document.getElementById('mobileSignedOutState');
        const mobileSignedInState = document.getElementById('mobileSignedInState');
        
        if (mobileMenu) mobileMenu.style.display = 'none';
        if (mobileMenuBtn) mobileMenuBtn.style.display = 'none';
        if (mobileSignedOutState) mobileSignedOutState.style.display = 'none';
        if (mobileSignedInState) mobileSignedInState.style.display = 'none';
        
        // Force show desktop navigation
        const desktopNav = document.querySelector('nav.hidden.md\\:flex');
        if (desktopNav) {
            desktopNav.classList.remove('hidden');
            desktopNav.style.display = 'flex';
        }
        
        // Find and show all hidden desktop elements
        const hiddenDesktopElements = document.querySelectorAll('.hidden.md\\:flex, .hidden.md\\:block, .hidden.lg\\:flex');
        hiddenDesktopElements.forEach(element => {
            element.classList.remove('hidden');
            if (element.classList.contains('md:flex') || element.classList.contains('lg:flex')) {
                element.style.display = 'flex';
            } else {
                element.style.display = 'block';
            }
        });
        
        console.log('✅ Desktop elements forced to show');
    }
    
    // 4. Override any existing mobile CSS
    function overrideMobileCSS() {
        // Remove mobile-first CSS files
        const mobileCSS = document.querySelectorAll('link[href*="mobile"]');
        mobileCSS.forEach(link => {
            if (link.href.includes('mobile-first') || 
                link.href.includes('mobile-glitch') || 
                link.href.includes('responsive-critical')) {
                link.disabled = true;
                console.log('🚫 Disabled mobile CSS:', link.href);
            }
        });
    }
    
    // 5. Set up mutation observer to maintain desktop view
    function maintainDesktopView() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' || mutation.type === 'childList') {
                    // Re-apply desktop view if elements change
                    setTimeout(forceDesktopElements, 100);
                }
            });
        });
        
        observer.observe(document.body, {
            attributes: true,
            childList: true,
            subtree: true,
            attributeFilter: ['class', 'style']
        });
        
        console.log('👁️ Desktop view maintenance observer active');
    }
    
    // 6. Main execution
    function initialize() {
        updateViewport();
        injectDesktopCSS();
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                forceDesktopElements();
                overrideMobileCSS();
                maintainDesktopView();
            });
        } else {
            forceDesktopElements();
            overrideMobileCSS();
            maintainDesktopView();
        }
        
        // Also run after a delay to catch any dynamically loaded content
        setTimeout(() => {
            forceDesktopElements();
            overrideMobileCSS();
        }, 1000);
        
        console.log('🖥️ Force Desktop View - Initialized');
    }
    
    // Start immediately
    initialize();
    
    // Also run on window resize to maintain desktop view
    window.addEventListener('resize', () => {
        setTimeout(forceDesktopElements, 100);
    });
    
    // Add to global scope for debugging
    window.forceDesktopView = {
        updateViewport,
        injectDesktopCSS,
        forceDesktopElements,
        overrideMobileCSS,
        maintainDesktopView
    };
    
})();
