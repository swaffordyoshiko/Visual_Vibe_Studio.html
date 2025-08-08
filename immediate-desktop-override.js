// IMMEDIATE DESKTOP OVERRIDE - Run as soon as possible
(function() {
    console.log('🖥️ IMMEDIATE Desktop Override - Starting...');
    
    // 1. Update viewport immediately
    function updateViewport() {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=1024, initial-scale=0.5, minimum-scale=0.3, maximum-scale=1.0, user-scalable=yes');
            console.log('✅ Viewport updated to force desktop width');
        }
    }
    
    // 2. Add immediate CSS override
    const style = document.createElement('style');
    style.innerHTML = `
        /* IMMEDIATE DESKTOP OVERRIDE */
        html, body {
            min-width: 1024px !important;
            overflow-x: auto !important;
        }
        
        /* Hide mobile elements immediately */
        .md\\:hidden,
        #mobileMenu,
        #mobileMenuBtn {
            display: none !important;
        }
        
        /* Show desktop elements immediately */
        .hidden.md\\:flex {
            display: flex !important;
        }
        
        .hidden.md\\:block {
            display: block !important;
        }
        
        /* Force desktop grid layouts */
        .grid-cols-1.md\\:grid-cols-3 {
            grid-template-columns: repeat(3, 1fr) !important;
        }
        
        .grid-cols-1.md\\:grid-cols-2 {
            grid-template-columns: repeat(2, 1fr) !important;
        }
        
        /* Force desktop text sizes */
        @media (max-width: 767px) {
            html, body {
                min-width: 1024px !important;
                overflow-x: auto !important;
            }
            
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
        }
    `;
    
    document.head.appendChild(style);
    
    // Run immediately if possible
    if (document.head) {
        updateViewport();
    } else {
        // If head doesn't exist yet, wait for it
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    const head = document.querySelector('head');
                    if (head) {
                        updateViewport();
                        observer.disconnect();
                    }
                }
            });
        });
        
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }
    
    console.log('✅ IMMEDIATE Desktop Override - Applied');
})();
