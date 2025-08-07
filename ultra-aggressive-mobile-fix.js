// ULTRA AGGRESSIVE MOBILE MIRROR FIX - Nuclear option
console.log('💥 ULTRA AGGRESSIVE MOBILE MIRROR: Starting nuclear option...');

(function ultraAggressiveMobileFix() {
  
  function executeNuclearMobileFix() {
    console.log('☢️ Executing nuclear mobile fix...');
    
    // Only run on mobile screens
    if (window.innerWidth > 767) {
      console.log('⚠️ Not mobile screen, skipping');
      return;
    }
    
    // NUCLEAR CSS - Ultra aggressive with maximum specificity
    const nuclearCSS = document.createElement('style');
    nuclearCSS.id = 'nuclear-mobile-fix';
    nuclearCSS.innerHTML = `
      /* NUCLEAR MOBILE MIRROR - Maximum force approach */
      
      @media (max-width: 767px) {
        
        /* NUCLEAR HIDE MOBILE ELEMENTS - All possible selectors */
        #mobileMenuBtn,
        button#mobileMenuBtn,
        .md\\:hidden,
        header button.md\\:hidden,
        [id="mobileMenuBtn"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          position: absolute !important;
          left: -99999px !important;
          top: -99999px !important;
          width: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
          z-index: -9999 !important;
        }
        
        #mobileMenu,
        div#mobileMenu,
        .md\\:hidden#mobileMenu,
        [id="mobileMenu"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          position: absolute !important;
          left: -99999px !important;
          top: -99999px !important;
        }
        
        #mobileSignedOutState,
        div#mobileSignedOutState,
        [id="mobileSignedOutState"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          position: absolute !important;
          left: -99999px !important;
        }
        
        #mobileSignedInState,
        div#mobileSignedInState,
        [id="mobileSignedInState"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          position: absolute !important;
          left: -99999px !important;
        }
        
        /* NUCLEAR SHOW DESKTOP NAVIGATION - Maximum force */
        nav.hidden,
        nav.hidden.md\\:flex,
        .hidden.md\\:flex,
        nav[class*="hidden"][class*="md:flex"],
        header nav.hidden.md\\:flex {
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          left: auto !important;
          right: auto !important;
          top: auto !important;
          bottom: auto !important;
          width: auto !important;
          height: auto !important;
          overflow: visible !important;
          z-index: auto !important;
          flex-wrap: wrap !important;
          justify-content: center !important;
          align-items: center !important;
          gap: 0.5rem !important;
          padding: 0.5rem !important;
        }
        
        /* Navigation links styling */
        nav.hidden.md\\:flex a,
        nav[class*="hidden"][class*="md:flex"] a,
        header nav.hidden.md\\:flex a {
          display: inline-block !important;
          visibility: visible !important;
          opacity: 1 !important;
          font-size: 14px !important;
          padding: 0.4rem 0.6rem !important;
          white-space: nowrap !important;
          color: rgb(55 65 81) !important;
          text-decoration: none !important;
          transition: color 0.3s !important;
        }
        
        nav.hidden.md\\:flex a:hover,
        nav[class*="hidden"][class*="md:flex"] a:hover {
          color: rgb(79 70 229) !important;
        }
        
        /* NUCLEAR SHOW DESKTOP AUTH STATES */
        #signedOutState,
        div#signedOutState,
        [id="signedOutState"] {
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 0.5rem !important;
          left: auto !important;
          right: auto !important;
          top: auto !important;
          bottom: auto !important;
        }
        
        #signedInState,
        div#signedInState,
        [id="signedInState"] {
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 0.5rem !important;
          left: auto !important;
          right: auto !important;
          top: auto !important;
          bottom: auto !important;
        }
        
        /* Auth buttons styling */
        #signedOutState button,
        #signedInState button {
          font-size: 12px !important;
          padding: 0.5rem 0.75rem !important;
          white-space: nowrap !important;
          border-radius: 0.375rem !important;
        }
        
        /* NUCLEAR GRID LAYOUTS - Force multi-column */
        .grid.grid-cols-1.md\\:grid-cols-2,
        .grid[class*="grid-cols-1"][class*="md:grid-cols-2"] {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 1rem !important;
        }
        
        .grid.grid-cols-1.md\\:grid-cols-3,
        .grid.grid-cols-1.lg\\:grid-cols-3,
        .grid[class*="grid-cols-1"][class*="md:grid-cols-3"],
        .grid[class*="grid-cols-1"][class*="lg:grid-cols-3"] {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 0.75rem !important;
        }
        
        .grid.grid-cols-1.lg\\:grid-cols-4,
        .grid.grid-cols-1.xl\\:grid-cols-5,
        .grid[class*="grid-cols-1"][class*="lg:grid-cols-4"],
        .grid[class*="grid-cols-1"][class*="xl:grid-cols-5"] {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 0.75rem !important;
        }
        
        /* Services grid specific */
        #services .grid.grid-cols-1.sm\\:grid-cols-2.md\\:grid-cols-3.lg\\:grid-cols-4.xl\\:grid-cols-5 {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 0.75rem !important;
        }
        
        /* Larger mobile screens get 3 columns */
        @media (min-width: 375px) and (max-width: 767px) {
          .grid.grid-cols-1.md\\:grid-cols-3,
          .grid.grid-cols-1.lg\\:grid-cols-3,
          .grid.grid-cols-1.lg\\:grid-cols-4,
          .grid.grid-cols-1.xl\\:grid-cols-5,
          #services .grid.grid-cols-1.sm\\:grid-cols-2.md\\:grid-cols-3.lg\\:grid-cols-4.xl\\:grid-cols-5 {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 0.5rem !important;
          }
        }
        
        /* NUCLEAR FLEX LAYOUTS - Force horizontal */
        .flex.flex-col.sm\\:flex-row,
        .flex.flex-col.md\\:flex-row,
        .flex[class*="flex-col"][class*="sm:flex-row"],
        .flex[class*="flex-col"][class*="md:flex-row"] {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: wrap !important;
          gap: 0.75rem !important;
          justify-content: center !important;
          align-items: center !important;
        }
        
        /* NUCLEAR SHOW HIDDEN DESKTOP ELEMENTS */
        .hidden.md\\:block,
        .hidden.md\\:flex,
        .hidden.md\\:grid,
        .hidden.md\\:inline,
        .hidden.md\\:inline-block,
        [class*="hidden"][class*="md:block"],
        [class*="hidden"][class*="md:flex"],
        [class*="hidden"][class*="md:grid"] {
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          left: auto !important;
          right: auto !important;
          top: auto !important;
          bottom: auto !important;
          width: auto !important;
          height: auto !important;
          overflow: visible !important;
          z-index: auto !important;
        }
        
        .hidden.md\\:block,
        [class*="hidden"][class*="md:block"] {
          display: block !important;
        }
        
        .hidden.md\\:flex,
        [class*="hidden"][class*="md:flex"] {
          display: flex !important;
        }
        
        .hidden.md\\:grid,
        [class*="hidden"][class*="md:grid"] {
          display: grid !important;
        }
        
        .hidden.md\\:inline {
          display: inline !important;
        }
        
        .hidden.md\\:inline-block {
          display: inline-block !important;
        }
        
        /* HEADER LAYOUT */
        header .max-w-7xl {
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          flex-wrap: wrap !important;
          gap: 0.5rem !important;
        }
        
        /* RESPONSIVE TEXT SIZES */
        .text-lg.sm\\:text-xl.md\\:text-2xl { font-size: 1.25rem !important; }
        .text-3xl.sm\\:text-4xl.md\\:text-5xl.lg\\:text-6xl { font-size: 2.5rem !important; }
        
        /* CONTAINERS */
        .max-w-7xl {
          width: 100% !important;
          padding-left: 1rem !important;
          padding-right: 1rem !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }
        
        /* PREVENT OVERFLOW */
        html, body {
          overflow-x: hidden !important;
        }
        
        /* BUTTONS */
        button, .btn, a.btn {
          padding: 0.75rem 1.5rem !important;
          font-size: 14px !important;
          border-radius: 6px !important;
          white-space: nowrap !important;
        }
      }
    `;
    
    // Remove any existing nuclear styles
    const existing = document.getElementById('nuclear-mobile-fix');
    if (existing) existing.remove();
    
    // Add nuclear styles with highest priority
    document.head.insertBefore(nuclearCSS, document.head.firstChild);
    console.log('☢️ Nuclear CSS deployed');
    
    // NUCLEAR DOM MANIPULATION - Immediate and direct
    setTimeout(() => {
      nuclearDOMManipulation();
    }, 10);
  }
  
  function nuclearDOMManipulation() {
    console.log('☢️ Executing nuclear DOM manipulation...');
    
    // NUCLEAR REMOVAL - Physically remove mobile elements
    const mobileElementsToDestroy = [
      '#mobileMenuBtn',
      'button#mobileMenuBtn',
      '#mobileMenu',
      '#mobileSignedOutState', 
      '#mobileSignedInState'
    ];
    
    mobileElementsToDestroy.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        console.log(`☢️ Destroying: ${selector}`);
        el.remove();
      });
    });
    
    // NUCLEAR FORCE SHOW - Desktop navigation
    const desktopNavSelectors = [
      'nav.hidden.md\\:flex',
      'nav.hidden',
      '.hidden.md\\:flex'
    ];
    
    desktopNavSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(nav => {
        console.log(`���️ Forcing show: ${selector}`);
        nav.classList.remove('hidden');
        nav.style.cssText = `
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          flex-wrap: wrap !important;
          justify-content: center !important;
          align-items: center !important;
          gap: 0.5rem !important;
          padding: 0.5rem !important;
        `;
      });
    });
    
    // NUCLEAR FORCE SHOW - Desktop auth states
    const signedOutState = document.getElementById('signedOutState');
    if (signedOutState) {
      console.log('☢️ Forcing show: signedOutState');
      signedOutState.style.cssText = `
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: relative !important;
        flex-direction: row !important;
        align-items: center !important;
        gap: 0.5rem !important;
      `;
    }
    
    const signedInState = document.getElementById('signedInState');
    if (signedInState) {
      console.log('☢️ Forcing show: signedInState');
      signedInState.style.cssText = `
        visibility: visible !important;
        opacity: 1 !important;
        position: relative !important;
        flex-direction: row !important;
        align-items: center !important;
        gap: 0.5rem !important;
      `;
    }
    
    // NUCLEAR GRID FORCING - Multi-column layouts
    const grids = document.querySelectorAll('.grid');
    grids.forEach(grid => {
      if (grid.classList.contains('grid-cols-1')) {
        let columns = 2;
        
        // Determine column count based on classes
        if (grid.classList.contains('md:grid-cols-3') || 
            grid.classList.contains('lg:grid-cols-3') ||
            grid.classList.contains('lg:grid-cols-4') ||
            grid.classList.contains('xl:grid-cols-5')) {
          columns = window.innerWidth >= 375 ? 3 : 2;
        }
        
        console.log(`☢️ Forcing grid to ${columns} columns`);
        grid.style.cssText = `
          display: grid !important;
          grid-template-columns: repeat(${columns}, 1fr) !important;
          gap: 0.75rem !important;
        `;
      }
    });
    
    // NUCLEAR FLEX FORCING - Horizontal layouts
    const flexLayouts = document.querySelectorAll('.flex.flex-col.sm\\:flex-row, .flex.flex-col.md\\:flex-row');
    flexLayouts.forEach(flex => {
      console.log('☢️ Forcing flex to horizontal');
      flex.style.cssText = `
        display: flex !important;
        flex-direction: row !important;
        flex-wrap: wrap !important;
        gap: 0.75rem !important;
        justify-content: center !important;
        align-items: center !important;
      `;
    });
    
    // NUCLEAR SHOW HIDDEN - All desktop elements
    const hiddenDesktopElements = document.querySelectorAll('.hidden.md\\:block, .hidden.md\\:flex, .hidden.md\\:grid, .hidden.md\\:inline, .hidden.md\\:inline-block');
    hiddenDesktopElements.forEach(el => {
      console.log('☢️ Forcing show hidden desktop element');
      el.classList.remove('hidden');
      
      let displayType = 'block';
      if (el.classList.contains('md:flex')) displayType = 'flex';
      else if (el.classList.contains('md:grid')) displayType = 'grid';
      else if (el.classList.contains('md:inline')) displayType = 'inline';
      else if (el.classList.contains('md:inline-block')) displayType = 'inline-block';
      
      el.style.cssText = `
        display: ${displayType} !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: relative !important;
      `;
    });
    
    console.log('☢️ Nuclear DOM manipulation complete');
  }
  
  // EXECUTE NUCLEAR OPTION
  executeNuclearMobileFix();
  
  // Re-execute at multiple intervals to catch any dynamic content
  const intervals = [100, 500, 1000, 2000, 5000];
  intervals.forEach(delay => {
    setTimeout(() => {
      if (window.innerWidth <= 767) {
        executeNuclearMobileFix();
      }
    }, delay);
  });
  
  // Monitor for changes and re-execute
  const observer = new MutationObserver(() => {
    if (window.innerWidth <= 767) {
      setTimeout(nuclearDOMManipulation, 50);
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style']
  });
  
  // Re-execute on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 767) {
      setTimeout(executeNuclearMobileFix, 100);
    }
  });
  
  // Make nuclear function globally available for debugging
  window.executeNuclearMobileFix = executeNuclearMobileFix;
  
  console.log('💥 ULTRA AGGRESSIVE MOBILE MIRROR: Nuclear option deployed');
  
})();
