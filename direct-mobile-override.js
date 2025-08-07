// DIRECT MOBILE OVERRIDE - Bypass all conflicts and force desktop layout immediately
console.log('🚀 DIRECT MOBILE OVERRIDE: Starting...');

// Execute immediately - don't wait for anything
(function directOverride() {
  console.log('📱 Direct mobile override executing...');
  
  // Create and inject CSS immediately with highest priority
  const overrideCSS = `
    <style id="direct-mobile-override" type="text/css">
      /* DIRECT MOBILE OVERRIDE - Maximum specificity */
      @media screen and (max-width: 767px) {
        
        /* COMPLETELY HIDE MOBILE ELEMENTS */
        #mobileMenuBtn,
        button#mobileMenuBtn,
        [id="mobileMenuBtn"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          position: absolute !important;
          left: -99999px !important;
          width: 0 !important;
          height: 0 !important;
          pointer-events: none !important;
        }
        
        #mobileMenu,
        div#mobileMenu,
        [id="mobileMenu"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          position: absolute !important;
          left: -99999px !important;
          pointer-events: none !important;
        }
        
        #mobileSignedOutState,
        div#mobileSignedOutState,
        [id="mobileSignedOutState"],
        #mobileSignedInState,
        div#mobileSignedInState,
        [id="mobileSignedInState"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          position: absolute !important;
          left: -99999px !important;
          pointer-events: none !important;
        }
        
        /* FORCE SHOW DESKTOP NAVIGATION */
        nav.hidden,
        nav[class*="hidden"],
        .hidden.md\\:flex,
        nav.hidden.md\\:flex,
        header nav {
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          left: auto !important;
          right: auto !important;
          top: auto !important;
          width: auto !important;
          height: auto !important;
          overflow: visible !important;
          clip: auto !important;
          clip-path: none !important;
          transform: none !important;
          flex-wrap: wrap !important;
          justify-content: center !important;
          align-items: center !important;
          gap: 0.5rem !important;
          padding: 0.5rem !important;
          margin: 0 !important;
        }
        
        /* FORCE SHOW DESKTOP NAV LINKS */
        nav.hidden a,
        nav[class*="hidden"] a,
        .hidden.md\\:flex a,
        nav.hidden.md\\:flex a,
        header nav a {
          display: inline-flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          font-size: 14px !important;
          padding: 0.5rem 0.75rem !important;
          white-space: nowrap !important;
          color: rgb(55, 65, 81) !important;
          text-decoration: none !important;
          align-items: center !important;
          justify-content: center !important;
          transition: color 0.2s !important;
        }
        
        nav.hidden a:hover,
        nav[class*="hidden"] a:hover,
        .hidden.md\\:flex a:hover,
        nav.hidden.md\\:flex a:hover,
        header nav a:hover {
          color: rgb(79, 70, 229) !important;
        }
        
        /* FORCE SHOW DESKTOP AUTH STATES */
        #signedOutState,
        div#signedOutState,
        [id="signedOutState"],
        #signedInState,
        div#signedInState,
        [id="signedInState"] {
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          left: auto !important;
          right: auto !important;
          flex-direction: row !important;
          gap: 0.5rem !important;
          align-items: center !important;
          justify-content: center !important;
          flex-wrap: wrap !important;
        }
        
        /* FORCE SHOW ALL HIDDEN DESKTOP ELEMENTS */
        .hidden.md\\:block,
        .hidden.md\\:flex,
        .hidden.md\\:grid,
        .hidden.lg\\:block,
        .hidden.lg\\:flex,
        .hidden.lg\\:grid,
        [class*="hidden"][class*="md:block"],
        [class*="hidden"][class*="md:flex"],
        [class*="hidden"][class*="md:grid"],
        [class*="hidden"][class*="lg:block"],
        [class*="hidden"][class*="lg:flex"],
        [class*="hidden"][class*="lg:grid"] {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          left: auto !important;
          right: auto !important;
          width: auto !important;
          height: auto !important;
          overflow: visible !important;
          clip: auto !important;
          clip-path: none !important;
          transform: none !important;
        }
        
        /* SPECIFIC OVERRIDES FOR FLEX AND GRID */
        .hidden.md\\:flex,
        .hidden.lg\\:flex,
        [class*="hidden"][class*="md:flex"],
        [class*="hidden"][class*="lg:flex"] {
          display: flex !important;
        }
        
        .hidden.md\\:grid,
        .hidden.lg\\:grid,
        [class*="hidden"][class*="md:grid"],
        [class*="hidden"][class*="lg:grid"] {
          display: grid !important;
        }
        
        /* FORCE DESKTOP GRID LAYOUTS */
        .grid.grid-cols-1.md\\:grid-cols-2,
        .grid[class*="grid-cols-1"][class*="md:grid-cols-2"] {
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 1rem !important;
        }
        
        .grid.grid-cols-1.md\\:grid-cols-3,
        .grid.grid-cols-1.lg\\:grid-cols-3,
        .grid[class*="grid-cols-1"][class*="md:grid-cols-3"],
        .grid[class*="grid-cols-1"][class*="lg:grid-cols-3"] {
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 0.75rem !important;
        }
        
        /* 3 columns for larger mobile screens */
        @media screen and (min-width: 375px) and (max-width: 767px) {
          .grid.grid-cols-1.md\\:grid-cols-3,
          .grid.grid-cols-1.lg\\:grid-cols-3,
          .grid[class*="grid-cols-1"][class*="md:grid-cols-3"],
          .grid[class*="grid-cols-1"][class*="lg:grid-cols-3"] {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 0.5rem !important;
          }
        }
        
        /* FORCE HORIZONTAL LAYOUTS */
        .flex.flex-col.md\\:flex-row,
        .flex.flex-col.sm\\:flex-row,
        .flex[class*="flex-col"][class*="md:flex-row"],
        .flex[class*="flex-col"][class*="sm:flex-row"] {
          flex-direction: row !important;
          flex-wrap: wrap !important;
          gap: 0.75rem !important;
          justify-content: center !important;
          align-items: center !important;
        }
        
        /* HEADER LAYOUT */
        header .max-w-7xl,
        header > div {
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          flex-wrap: wrap !important;
          gap: 0.5rem !important;
          width: 100% !important;
        }
        
        /* PREVENT OVERFLOW */
        html, body {
          overflow-x: hidden !important;
          max-width: 100vw !important;
        }
        
        /* DESKTOP BUTTONS */
        button, .btn, a.btn {
          padding: 0.75rem 1.5rem !important;
          font-size: 14px !important;
          white-space: nowrap !important;
          border-radius: 0.375rem !important;
        }
      }
    </style>
  `;
  
  // Inject CSS immediately using document.write if possible, otherwise innerHTML
  if (document.readyState === 'loading' && document.write) {
    document.write(overrideCSS);
  } else {
    document.head.insertAdjacentHTML('beforeend', overrideCSS);
  }
  
  console.log('✅ Direct CSS override injected');
  
})();

// DOM manipulation function that runs aggressively
function forceDesktopDOM() {
  if (window.innerWidth > 767) return;
  
  console.log('🔧 Forcing desktop DOM layout...');
  
  try {
    // REMOVE mobile menu button completely
    const mobileBtn = document.getElementById('mobileMenuBtn');
    if (mobileBtn) {
      if (mobileBtn.parentNode) {
        mobileBtn.parentNode.removeChild(mobileBtn);
      }
      console.log('✅ Mobile menu button removed');
    }
    
    // HIDE mobile menu
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
      mobileMenu.style.cssText = 'display: none !important; visibility: hidden !important; position: absolute !important; left: -99999px !important;';
      console.log('✅ Mobile menu hidden');
    }
    
    // SHOW desktop navigation
    const desktopNavs = document.querySelectorAll('nav.hidden, nav[class*="hidden"], .hidden.md\\:flex, header nav');
    desktopNavs.forEach((nav, index) => {
      nav.classList.remove('hidden');
      nav.style.cssText = `
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: relative !important;
        left: auto !important;
        right: auto !important;
        width: auto !important;
        height: auto !important;
        overflow: visible !important;
        clip: auto !important;
        clip-path: none !important;
        transform: none !important;
        flex-wrap: wrap !important;
        justify-content: center !important;
        align-items: center !important;
        gap: 0.5rem !important;
        padding: 0.5rem !important;
      `;
      console.log(`✅ Desktop nav ${index + 1} shown`);
    });
    
    // SHOW desktop auth states
    const signedOutState = document.getElementById('signedOutState');
    if (signedOutState) {
      signedOutState.style.cssText = `
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: relative !important;
        flex-direction: row !important;
        gap: 0.5rem !important;
        align-items: center !important;
      `;
      console.log('✅ Desktop signed out state shown');
    }
    
    const signedInState = document.getElementById('signedInState');
    if (signedInState) {
      signedInState.style.cssText = `
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: relative !important;
        flex-direction: row !important;
        gap: 0.5rem !important;
        align-items: center !important;
      `;
      console.log('✅ Desktop signed in state shown');
    }
    
    // HIDE mobile auth states
    const mobileAuthElements = ['mobileSignedOutState', 'mobileSignedInState'];
    mobileAuthElements.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.style.cssText = 'display: none !important; visibility: hidden !important; position: absolute !important; left: -99999px !important;';
        console.log(`✅ Mobile ${id} hidden`);
      }
    });
    
    // SHOW all hidden desktop elements
    const hiddenElements = document.querySelectorAll('.hidden.md\\:block, .hidden.md\\:flex, .hidden.md\\:grid, .hidden.lg\\:block, .hidden.lg\\:flex, .hidden.lg\\:grid');
    hiddenElements.forEach((el, index) => {
      el.classList.remove('hidden');
      const classes = el.className;
      const displayType = classes.includes('flex') ? 'flex' :
                        classes.includes('grid') ? 'grid' : 'block';
      el.style.cssText = `
        display: ${displayType} !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: relative !important;
        left: auto !important;
        right: auto !important;
        width: auto !important;
        height: auto !important;
      `;
      console.log(`✅ Hidden desktop element ${index + 1} shown as ${displayType}`);
    });
    
    console.log('✅ Desktop DOM layout forced successfully');
    
  } catch (error) {
    console.error('❌ Error forcing desktop DOM:', error);
  }
}

// Execute immediately and repeatedly
forceDesktopDOM();

// Execute after minimal delay
setTimeout(forceDesktopDOM, 50);
setTimeout(forceDesktopDOM, 100);
setTimeout(forceDesktopDOM, 250);
setTimeout(forceDesktopDOM, 500);
setTimeout(forceDesktopDOM, 1000);

// Execute on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', forceDesktopDOM);
} else {
  setTimeout(forceDesktopDOM, 100);
}

// Execute on window load
window.addEventListener('load', forceDesktopDOM);

// Execute on resize
window.addEventListener('resize', () => {
  if (window.innerWidth <= 767) {
    forceDesktopDOM();
  }
});

// Execute periodically to override any resets
setInterval(() => {
  if (window.innerWidth <= 767) {
    forceDesktopDOM();
  }
}, 1000);

// Monitor for any changes that might revert our fixes
const forceObserver = new MutationObserver((mutations) => {
  if (window.innerWidth <= 767) {
    let shouldReapply = false;
    
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' || 
          (mutation.type === 'attributes' && 
           (mutation.attributeName === 'class' || mutation.attributeName === 'style'))) {
        shouldReapply = true;
      }
    });
    
    if (shouldReapply) {
      setTimeout(forceDesktopDOM, 100);
    }
  }
});

// Start observing when body is available
if (document.body) {
  forceObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style']
  });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    forceObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });
  });
}

// Make function globally available for manual triggering
window.forceDesktopNow = forceDesktopDOM;

console.log('🚀 DIRECT MOBILE OVERRIDE: Loaded and actively monitoring');
