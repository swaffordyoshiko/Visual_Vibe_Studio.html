// FORCE MOBILE TO DESKTOP - IMMEDIATE EXECUTION
console.log('🖥️ FORCING MOBILE TO DESKTOP VIEW...');

(function() {
    'use strict';
    
    // 1. IMMEDIATE VIEWPORT UPDATE
    function forceDesktopViewport() {
        // Update existing viewport meta tag
        let viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.remove();
        }
        
        // Create new viewport meta tag with desktop settings
        const newViewport = document.createElement('meta');
        newViewport.name = 'viewport';
        newViewport.content = 'width=1024, initial-scale=0.5, minimum-scale=0.3, maximum-scale=1.0, user-scalable=yes';
        document.head.appendChild(newViewport);
        
        console.log('✅ Viewport updated to force desktop width');
    }
    
    // 2. INJECT CRITICAL DESKTOP CSS IMMEDIATELY
    function injectDesktopCSS() {
        const style = document.createElement('style');
        style.id = 'force-desktop-override';
        style.innerHTML = `
            /* CRITICAL DESKTOP OVERRIDE - HIGHEST PRIORITY */
            html, body {
                min-width: 1024px !important;
                overflow-x: auto !important;
                width: 100% !important;
            }
            
            /* HIDE ALL MOBILE ELEMENTS IMMEDIATELY */
            .md\\:hidden,
            #mobileMenu,
            #mobileMenuBtn,
            #mobileSignedOutState,
            #mobileSignedInState,
            .block.md\\:hidden {
                display: none !important;
                visibility: hidden !important;
            }
            
            /* SHOW ALL DESKTOP ELEMENTS IMMEDIATELY */
            .hidden.md\\:flex {
                display: flex !important;
                visibility: visible !important;
            }
            
            .hidden.md\\:block {
                display: block !important;
                visibility: visible !important;
            }
            
            .hidden.lg\\:flex {
                display: flex !important;
                visibility: visible !important;
            }
            
            /* FORCE DESKTOP GRIDS ON ALL SCREENS */
            .grid-cols-1.md\\:grid-cols-2 {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 1rem !important;
            }
            
            .grid-cols-1.md\\:grid-cols-3,
            .grid-cols-1.lg\\:grid-cols-3 {
                grid-template-columns: repeat(3, 1fr) !important;
                gap: 1rem !important;
            }
            
            .grid-cols-1.xl\\:grid-cols-4 {
                grid-template-columns: repeat(4, 1fr) !important;
                gap: 1rem !important;
            }
            
            /* FORCE DESKTOP FLEX LAYOUTS */
            .flex-col.md\\:flex-row,
            .flex-col.sm\\:flex-row {
                flex-direction: row !important;
            }
            
            /* FORCE DESKTOP TEXT SIZES */
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
            
            /* FORCE DESKTOP SPACING */
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
            
            /* OVERRIDE ALL MOBILE MEDIA QUERIES */
            @media (max-width: 767px) {
                html, body {
                    min-width: 1024px !important;
                    overflow-x: auto !important;
                }
                
                /* Hide mobile navigation */
                #mobileMenu,
                #mobileMenuBtn,
                #mobileSignedOutState,
                #mobileSignedInState,
                .md\\:hidden {
                    display: none !important;
                    visibility: hidden !important;
                }
                
                /* Show desktop navigation */
                .hidden.md\\:flex {
                    display: flex !important;
                    visibility: visible !important;
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
                
                /* Force desktop containers */
                .container,
                .max-w-7xl,
                .max-w-6xl,
                .max-w-5xl,
                .max-w-4xl {
                    max-width: none !important;
                    padding-left: 2rem !important;
                    padding-right: 2rem !important;
                }
                
                /* Force desktop buttons */
                button, .btn {
                    width: auto !important;
                    padding: 0.5rem 1rem !important;
                    font-size: 0.875rem !important;
                }
                
                /* Force desktop forms */
                input, select, textarea {
                    font-size: 0.875rem !important;
                    padding: 0.5rem 0.75rem !important;
                    width: auto !important;
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
        `;
        
        // Insert at the beginning of head for highest priority
        document.head.insertBefore(style, document.head.firstChild);
        console.log('✅ Desktop CSS injected with highest priority');
    }
    
    // 3. FORCE HIDE MOBILE ELEMENTS AND SHOW DESKTOP ELEMENTS
    function forceMobileToDesktop() {
        // Hide mobile navigation elements
        const mobileElements = [
            '#mobileMenu',
            '#mobileMenuBtn', 
            '#mobileSignedOutState',
            '#mobileSignedInState',
            '.md\\:hidden'
        ];
        
        mobileElements.forEach(selector => {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    el.style.display = 'none';
                    el.style.visibility = 'hidden';
                    el.classList.add('force-hidden');
                });
            } catch (e) {
                // Ignore selector errors
            }
        });
        
        // Show desktop navigation elements
        const desktopElements = [
            '.hidden.md\\:flex',
            '.hidden.md\\:block',
            '.hidden.lg\\:flex'
        ];
        
        desktopElements.forEach(selector => {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    el.classList.remove('hidden');
                    if (selector.includes('flex')) {
                        el.style.display = 'flex';
                    } else {
                        el.style.display = 'block';
                    }
                    el.style.visibility = 'visible';
                });
            } catch (e) {
                // Ignore selector errors
            }
        });
        
        console.log('�� Mobile elements hidden, desktop elements shown');
    }
    
    // 4. MUTATION OBSERVER TO MAINTAIN DESKTOP VIEW
    function maintainDesktopView() {
        const observer = new MutationObserver((mutations) => {
            let needsUpdate = false;
            
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'attributes') {
                    // Check if mobile elements became visible
                    const mobileBtn = document.getElementById('mobileMenuBtn');
                    const mobileMenu = document.getElementById('mobileMenu');
                    
                    if (mobileBtn && mobileBtn.style.display !== 'none') {
                        needsUpdate = true;
                    }
                    if (mobileMenu && mobileMenu.style.display !== 'none') {
                        needsUpdate = true;
                    }
                }
            });
            
            if (needsUpdate) {
                setTimeout(forceMobileToDesktop, 100);
            }
        });
        
        observer.observe(document.body, {
            attributes: true,
            childList: true,
            subtree: true,
            attributeFilter: ['class', 'style']
        });
        
        console.log('✅ Desktop view maintenance observer active');
    }
    
    // 5. MAIN EXECUTION
    function initialize() {
        // Run immediately
        forceDesktopViewport();
        injectDesktopCSS();
        
        // Run when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                forceMobileToDesktop();
                maintainDesktopView();
            });
        } else {
            forceMobileToDesktop();
            maintainDesktopView();
        }
        
        // Also run after a delay to catch late-loading elements
        setTimeout(() => {
            forceMobileToDesktop();
        }, 1000);
        
        setTimeout(() => {
            forceMobileToDesktop();
        }, 3000);
        
        console.log('🖥️ DESKTOP OVERRIDE INITIALIZED');
    }
    
    // Start immediately
    initialize();
    
    // Make functions available globally for debugging
    window.forceDesktopView = {
        forceDesktopViewport,
        injectDesktopCSS,
        forceMobileToDesktop,
        maintainDesktopView
    };
    
})();

// Additional check to ensure mobile elements stay hidden
setInterval(() => {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileBtn && mobileBtn.style.display !== 'none') {
        mobileBtn.style.display = 'none';
        mobileBtn.style.visibility = 'hidden';
    }
    
    if (mobileMenu && mobileMenu.style.display !== 'none') {
        mobileMenu.style.display = 'none';
        mobileMenu.style.visibility = 'hidden';
    }
    
    // Ensure desktop navigation is visible
    const desktopNav = document.querySelector('nav.hidden.md\\:flex');
    if (desktopNav) {
        desktopNav.classList.remove('hidden');
        desktopNav.style.display = 'flex';
        desktopNav.style.visibility = 'visible';
    }
}, 2000);

console.log('🖥️ FORCE MOBILE TO DESKTOP - LOADED');
