// IMMEDIATE MOBILE HIDE - RUNS IMMEDIATELY
(function() {
    console.log('🔥 IMMEDIATE MOBILE HIDE - EXECUTING...');
    
    // Function to hide mobile elements
    function hideMobileElements() {
        try {
            // Update viewport immediately
            const viewport = document.querySelector('meta[name="viewport"]');
            if (viewport) {
                viewport.content = 'width=1024, initial-scale=0.5, minimum-scale=0.3, maximum-scale=1.0, user-scalable=yes';
                console.log('✅ Viewport updated');
            }
            
            // Hide mobile elements by ID
            const mobileIds = ['mobileMenu', 'mobileMenuBtn', 'mobileSignedOutState', 'mobileSignedInState'];
            mobileIds.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.style.display = 'none';
                    element.style.visibility = 'hidden';
                    element.style.position = 'absolute';
                    element.style.left = '-9999px';
                    console.log('✅ Hidden:', id);
                }
            });
            
            // Hide mobile elements by class
            const mobileClasses = document.querySelectorAll('.md\\:hidden');
            mobileClasses.forEach(element => {
                element.style.display = 'none';
                element.style.visibility = 'hidden';
                element.style.position = 'absolute';
                element.style.left = '-9999px';
            });
            
            // Show desktop navigation
            const desktopNavs = document.querySelectorAll('.hidden.md\\:flex');
            desktopNavs.forEach(element => {
                element.classList.remove('hidden');
                element.style.display = 'flex';
                element.style.visibility = 'visible';
                element.style.position = 'static';
                console.log('✅ Shown desktop nav');
            });
            
            // Force minimum width
            document.documentElement.style.minWidth = '1024px';
            document.body.style.minWidth = '1024px';
            document.documentElement.style.overflowX = 'auto';
            document.body.style.overflowX = 'auto';
            
        } catch (error) {
            console.error('❌ Error hiding mobile elements:', error);
        }
    }
    
    // Run immediately
    hideMobileElements();
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hideMobileElements);
    } else {
        setTimeout(hideMobileElements, 100);
    }
    
    // Run periodically to maintain state
    const intervalId = setInterval(hideMobileElements, 1000);
    
    // Stop after 10 seconds
    setTimeout(() => {
        clearInterval(intervalId);
        console.log('🔥 IMMEDIATE MOBILE HIDE - STOPPED INTERVAL');
    }, 10000);
    
    console.log('🔥 IMMEDIATE MOBILE HIDE - COMPLETE');
})();
