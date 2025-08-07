// FINAL MOBILE DESKTOP ENFORCER - Ultimate override that runs last and takes complete control
console.log('🚀 FINAL MOBILE DESKTOP ENFORCER: Starting ultimate override...');

// Only run on mobile devices
if (window.innerWidth <= 767) {
  console.log('📱 Mobile detected - executing final enforcement...');
  
  // Function to completely enforce desktop layout
  function enforceDesktopLayout() {
    console.log('🔧 ENFORCING desktop layout with maximum authority...');
    
    try {
      // STEP 1: NUCLEAR REMOVAL of mobile elements
      console.log('💣 Nuclear removal of mobile elements...');
      
      // Remove mobile menu button - multiple approaches
      const mobileBtns = document.querySelectorAll('#mobileMenuBtn, button[onclick*="toggleMobileMenu"], .md\\:hidden button, button.md\\:hidden');
      mobileBtns.forEach((btn, index) => {
        if (btn && btn.parentNode) {
          btn.parentNode.removeChild(btn);
          console.log(`✅ Mobile button ${index + 1} DESTROYED`);
        }
      });
      
      // Remove mobile menu - multiple approaches
      const mobileMenus = document.querySelectorAll('#mobileMenu, .md\\:hidden.absolute, div[class*="md:hidden"][class*="absolute"]');
      mobileMenus.forEach((menu, index) => {
        if (menu && menu.parentNode) {
          menu.parentNode.removeChild(menu);
          console.log(`✅ Mobile menu ${index + 1} DESTROYED`);
        }
      });
      
      // Remove mobile auth states - complete destruction
      const mobileAuthStates = document.querySelectorAll('#mobileSignedOutState, #mobileSignedInState, div[id*="mobileSignedOut"], div[id*="mobileSignedIn"]');
      mobileAuthStates.forEach((state, index) => {
        if (state && state.parentNode) {
          state.parentNode.removeChild(state);
          console.log(`✅ Mobile auth state ${index + 1} DESTROYED`);
        }
      });
      
      // STEP 2: FORCE SHOW desktop navigation with extreme prejudice
      console.log('💪 Force showing desktop navigation...');
      
      const desktopNavs = document.querySelectorAll('nav.hidden, nav[class*="hidden"], .hidden.md\\:flex, nav.md\\:flex');
      desktopNavs.forEach((nav, index) => {
        // Remove ALL hiding classes
        nav.classList.remove('hidden', 'md:flex');
        nav.classList.add('flex', 'items-center', 'space-x-4');
        
        // FORCE styles with maximum specificity
        nav.setAttribute('style', `
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          flex-wrap: wrap !important;
          justify-content: center !important;
          align-items: center !important;
          gap: 1rem !important;
          padding: 0.5rem !important;
          z-index: 1000 !important;
        `);
        
        // Make all nav links visible
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
          link.setAttribute('style', `
            display: inline-flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            font-size: 14px !important;
            padding: 0.5rem 0.75rem !important;
            white-space: nowrap !important;
            color: rgb(55, 65, 81) !important;
          `);
        });
        
        console.log(`✅ Desktop nav ${index + 1} FORCED VISIBLE`);
      });
      
      // STEP 3: FORCE SHOW desktop auth states
      console.log('🔐 Force showing desktop auth states...');
      
      const desktopAuthStates = document.querySelectorAll('#signedOutState, #signedInState');
      desktopAuthStates.forEach((state, index) => {
        if (state) {
          // Remove any hiding classes
          state.classList.remove('hidden');
          
          // FORCE visible with inline styles
          state.setAttribute('style', `
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: relative !important;
            flex-direction: row !important;
            gap: 0.5rem !important;
            align-items: center !important;
            z-index: 1000 !important;
          `);
          
          console.log(`✅ Desktop auth state ${index + 1} FORCED VISIBLE`);
        }
      });
      
      // STEP 4: TRANSFORM ALL GRIDS to desktop layout
      console.log('📊 Transforming grids to desktop layout...');
      
      const grids = document.querySelectorAll('.grid');
      grids.forEach((grid, index) => {
        const classList = Array.from(grid.classList);
        
        // Force desktop grid layouts
        if (classList.includes('grid-cols-1')) {
          let newCols = 2; // Default to 2 columns
          
          // Determine appropriate column count
          if (classList.some(cls => cls.includes('md:grid-cols-3') || cls.includes('lg:grid-cols-3'))) {
            newCols = window.innerWidth >= 375 ? 3 : 2;
          } else if (classList.some(cls => cls.includes('xl:grid-cols-5'))) {
            newCols = window.innerWidth >= 425 ? 3 : 2;
          } else if (classList.some(cls => cls.includes('lg:grid-cols-4'))) {
            newCols = window.innerWidth >= 425 ? 4 : window.innerWidth >= 375 ? 3 : 2;
          }
          
          // Remove mobile classes and add desktop ones
          grid.classList.remove('grid-cols-1');
          grid.classList.add(`grid-cols-${newCols}`);
          
          // FORCE with inline styles
          grid.setAttribute('style', `
            grid-template-columns: repeat(${newCols}, 1fr) !important;
            gap: ${newCols >= 3 ? '0.75rem' : '1rem'} !important;
          `);
          
          console.log(`✅ Grid ${index + 1} FORCED to ${newCols} columns`);
        }
      });
      
      // STEP 5: SHOW ALL hidden desktop elements
      console.log('👁️ Showing all hidden desktop elements...');
      
      const hiddenSelectors = [
        '.hidden.md\\:block',
        '.hidden.md\\:flex', 
        '.hidden.md\\:grid',
        '.hidden.lg\\:block',
        '.hidden.lg\\:flex',
        '.hidden.lg\\:grid'
      ];
      
      hiddenSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
          // Remove hidden class
          el.classList.remove('hidden');
          
          // Determine display type
          const displayType = selector.includes('flex') ? 'flex' :
                            selector.includes('grid') ? 'grid' : 'block';
          
          // FORCE visible
          el.setAttribute('style', `
            display: ${displayType} !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: relative !important;
          `);
          
          console.log(`✅ Hidden ${displayType} element ${index + 1} FORCED VISIBLE`);
        });
      });
      
      // STEP 6: FORCE horizontal flex layouts
      console.log('↔️ Forcing horizontal flex layouts...');
      
      const flexLayouts = document.querySelectorAll('.flex.flex-col.md\\:flex-row, .flex.flex-col.sm\\:flex-row');
      flexLayouts.forEach((el, index) => {
        // Change classes
        el.classList.remove('flex-col');
        el.classList.add('flex-row');
        
        // FORCE styles
        el.setAttribute('style', `
          flex-direction: row !important;
          flex-wrap: wrap !important;
          gap: 0.75rem !important;
          justify-content: center !important;
          align-items: center !important;
        `);
        
        console.log(`✅ Flex layout ${index + 1} FORCED horizontal`);
      });
      
      console.log('✅ DESKTOP LAYOUT ENFORCEMENT COMPLETE');
      
    } catch (error) {
      console.error('❌ Error in desktop enforcement:', error);
    }
  }
  
  // Function to apply nuclear CSS that overrides everything
  function applyNuclearCSS() {
    console.log('☢️ Applying nuclear CSS override...');
    
    // Remove any existing override styles
    const existingStyles = document.querySelectorAll('#nuclear-mobile-override, #force-mobile-desktop, #mobile-mirror-fix');
    existingStyles.forEach(style => style.remove());
    
    const nuclearCSS = document.createElement('style');
    nuclearCSS.id = 'nuclear-mobile-override';
    nuclearCSS.innerHTML = `
      /* NUCLEAR MOBILE OVERRIDE - Maximum specificity and authority */
      @media screen and (max-width: 767px) {
        
        /* DESTROY any mobile elements that might appear */
        #mobileMenuBtn,
        button[onclick*="toggleMobileMenu"],
        .md\\:hidden button,
        button.md\\:hidden {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          position: absolute !important;
          left: -99999px !important;
          width: 0 !important;
          height: 0 !important;
          pointer-events: none !important;
          z-index: -1 !important;
        }
        
        #mobileMenu,
        .md\\:hidden.absolute,
        div[class*="md:hidden"][class*="absolute"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          position: absolute !important;
          left: -99999px !important;
          pointer-events: none !important;
          z-index: -1 !important;
        }
        
        #mobileSignedOutState,
        #mobileSignedInState,
        div[id*="mobileSignedOut"],
        div[id*="mobileSignedIn"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          position: absolute !important;
          left: -99999px !important;
          pointer-events: none !important;
          z-index: -1 !important;
        }
        
        /* FORCE desktop navigation with maximum authority */
        nav,
        nav.hidden,
        nav[class*="hidden"],
        .hidden.md\\:flex,
        nav.md\\:flex,
        header nav {
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          flex-wrap: wrap !important;
          justify-content: center !important;
          align-items: center !important;
          gap: 1rem !important;
          padding: 0.5rem !important;
          z-index: 1000 !important;
        }
        
        nav a,
        nav.hidden a,
        nav[class*="hidden"] a,
        .hidden.md\\:flex a,
        nav.md\\:flex a,
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
          z-index: 1000 !important;
        }
        
        /* FORCE desktop auth states */
        #signedOutState,
        #signedInState {
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          flex-direction: row !important;
          gap: 0.5rem !important;
          align-items: center !important;
          z-index: 1000 !important;
        }
        
        /* FORCE all hidden desktop elements */
        .hidden.md\\:block,
        .hidden.md\\:flex,
        .hidden.md\\:grid,
        .hidden.lg\\:block,
        .hidden.lg\\:flex,
        .hidden.lg\\:grid {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
        }
        
        .hidden.md\\:flex,
        .hidden.lg\\:flex {
          display: flex !important;
        }
        
        .hidden.md\\:grid,
        .hidden.lg\\:grid {
          display: grid !important;
        }
        
        /* FORCE desktop grid layouts */
        .grid.grid-cols-1 {
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 1rem !important;
        }
        
        /* 3+ columns for larger mobile screens */
        @media screen and (min-width: 375px) {
          .grid.grid-cols-1 {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 0.75rem !important;
          }
        }
        
        /* FORCE horizontal layouts */
        .flex.flex-col,
        .flex-col {
          flex-direction: row !important;
          flex-wrap: wrap !important;
          gap: 0.75rem !important;
          justify-content: center !important;
          align-items: center !important;
        }
        
        /* FORCE desktop spacing */
        section {
          padding: 3rem 1rem !important;
        }
        
        /* PREVENT overflow */
        html, body {
          overflow-x: hidden !important;
        }
        
        /* FORCE desktop button sizing */
        button {
          padding: 0.75rem 1.5rem !important;
          font-size: 14px !important;
          white-space: nowrap !important;
        }
        
        /* OVERRIDE any md:hidden elements */
        .md\\:hidden {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          position: absolute !important;
          left: -99999px !important;
          pointer-events: none !important;
          z-index: -1 !important;
        }
      }
    `;
    
    document.head.appendChild(nuclearCSS);
    console.log('✅ Nuclear CSS applied with maximum authority');
  }
  
  // Function to disable any conflicting scripts
  function disableConflictingScripts() {
    console.log('🚫 Disabling conflicting scripts...');
    
    // Override any functions that might interfere
    const conflictingFunctions = [
      'toggleMobileMenu',
      'closeMobileMenu',
      'openMobileMenu',
      'updateAuthUI',
      'refreshMobileLayout'
    ];
    
    conflictingFunctions.forEach(funcName => {
      if (window[funcName]) {
        const originalFunc = window[funcName];
        window[funcName] = function(...args) {
          console.log(`🚫 Blocked call to ${funcName}`);
          // Run our enforcement after any conflicting function call
          setTimeout(enforceDesktopLayout, 50);
          // Don't execute the original function
          return false;
        };
        console.log(`✅ Disabled ${funcName}`);
      }
    });
  }
  
  // Main enforcement function
  function executeCompleteEnforcement() {
    console.log('🚀 EXECUTING COMPLETE DESKTOP ENFORCEMENT...');
    
    disableConflictingScripts();
    applyNuclearCSS();
    enforceDesktopLayout();
    
    console.log('✅ COMPLETE ENFORCEMENT EXECUTED');
  }
  
  // Execute enforcement immediately
  executeCompleteEnforcement();
  
  // Execute after small delays to catch any interference
  setTimeout(executeCompleteEnforcement, 100);
  setTimeout(executeCompleteEnforcement, 500);
  setTimeout(executeCompleteEnforcement, 1000);
  setTimeout(executeCompleteEnforcement, 2000);
  
  // Execute when DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', executeCompleteEnforcement);
  }
  
  // Execute when page is fully loaded
  window.addEventListener('load', executeCompleteEnforcement);
  
  // Monitor for any attempts to restore mobile elements
  const nuclearObserver = new MutationObserver((mutations) => {
    let shouldEnforce = false;
    
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        // Check for re-added mobile elements
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            if (node.id === 'mobileMenuBtn' || 
                node.id === 'mobileMenu' || 
                node.id === 'mobileSignedOutState' || 
                node.id === 'mobileSignedInState' ||
                node.className.includes('md:hidden')) {
              shouldEnforce = true;
              console.log('🚨 Mobile element detected, enforcing desktop layout');
            }
          }
        });
      } else if (mutation.type === 'attributes') {
        // Check for class changes that might hide desktop elements
        const target = mutation.target;
        if (target.classList && target.classList.contains('hidden') && 
            (target.classList.contains('md:flex') || target.classList.contains('md:block'))) {
          shouldEnforce = true;
          console.log('🚨 Desktop element hidden, enforcing desktop layout');
        }
      }
    });
    
    if (shouldEnforce) {
      setTimeout(executeCompleteEnforcement, 50);
    }
  });
  
  if (document.body) {
    nuclearObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      nuclearObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style']
      });
    });
  }
  
  // Periodic enforcement to ensure desktop layout stays
  setInterval(executeCompleteEnforcement, 5000);
  
  // Make enforcement function globally available
  window.enforceDesktopLayoutNow = executeCompleteEnforcement;
  
  console.log('🚀 FINAL MOBILE DESKTOP ENFORCER: Loaded and actively enforcing');
  
} else {
  console.log('⚠️ Desktop device detected, skipping enforcement');
}
