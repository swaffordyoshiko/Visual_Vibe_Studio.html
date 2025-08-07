// DIRECT INLINE MOBILE FIX - Force mobile to mirror desktop layout immediately
console.log('🚀 DIRECT INLINE MOBILE FIX: Starting immediate transformation...');

// Execute immediately without any conditions or delays
(function() {
  console.log('📱 Executing immediate mobile layout transformation...');
  
  // Function to force desktop layout
  function forceDesktopLayout() {
    console.log('🔧 Forcing desktop layout...');
    
    try {
      // STEP 1: Remove mobile menu button completely from DOM
      const mobileBtn = document.querySelector('#mobileMenuBtn, button[onclick*="toggleMobileMenu"]');
      if (mobileBtn) {
        mobileBtn.remove();
        console.log('✅ Mobile menu button removed from DOM');
      }
      
      // STEP 2: Remove mobile menu completely from DOM
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu) {
        mobileMenu.remove();
        console.log('✅ Mobile menu removed from DOM');
      }
      
      // STEP 3: Force show desktop navigation
      const desktopNav = document.querySelector('nav.hidden.md\\:flex, nav[class*="hidden"][class*="md:flex"]');
      if (desktopNav) {
        // Remove all hiding classes
        desktopNav.classList.remove('hidden');
        desktopNav.classList.remove('md:flex');
        // Add visible classes
        desktopNav.classList.add('flex');
        desktopNav.classList.add('items-center');
        desktopNav.classList.add('space-x-4');
        // Force styles
        desktopNav.style.cssText = `
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
          flex-wrap: wrap !important;
          justify-content: center !important;
          align-items: center !important;
          gap: 1rem !important;
          padding: 0.5rem !important;
        `;
        console.log('✅ Desktop navigation shown and styled');
      }
      
      // STEP 4: Remove mobile auth states completely
      const mobileSignedOut = document.getElementById('mobileSignedOutState');
      const mobileSignedIn = document.getElementById('mobileSignedInState');
      
      if (mobileSignedOut) {
        mobileSignedOut.remove();
        console.log('✅ Mobile signed out state removed');
      }
      
      if (mobileSignedIn) {
        mobileSignedIn.remove();
        console.log('✅ Mobile signed in state removed');
      }
      
      // STEP 5: Force desktop auth states to be visible
      const desktopSignedOut = document.getElementById('signedOutState');
      const desktopSignedIn = document.getElementById('signedInState');
      
      if (desktopSignedOut) {
        desktopSignedOut.style.cssText = `
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
        `;
        console.log('✅ Desktop signed out state visible');
      }
      
      if (desktopSignedIn) {
        desktopSignedIn.style.cssText = `
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
        `;
        console.log('✅ Desktop signed in state visible');
      }
      
      // STEP 6: Transform all grid layouts to desktop style
      const grids = document.querySelectorAll('.grid');
      grids.forEach((grid, index) => {
        const classList = Array.from(grid.classList);
        
        // Check for different grid configurations
        if (classList.includes('grid-cols-1')) {
          // 2-column layouts
          if (classList.some(cls => cls.includes('md:grid-cols-2'))) {
            grid.classList.remove('grid-cols-1');
            grid.classList.add('grid-cols-2');
            grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            grid.style.gap = '1rem';
            console.log(`✅ Grid ${index + 1} changed to 2 columns`);
          }
          
          // 3-column layouts
          if (classList.some(cls => cls.includes('md:grid-cols-3') || cls.includes('lg:grid-cols-3'))) {
            grid.classList.remove('grid-cols-1');
            const cols = window.innerWidth >= 375 ? 3 : 2;
            grid.classList.add(`grid-cols-${cols}`);
            grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
            grid.style.gap = '0.75rem';
            console.log(`✅ Grid ${index + 1} changed to ${cols} columns`);
          }
          
          // 4-column layouts
          if (classList.some(cls => cls.includes('lg:grid-cols-4') || cls.includes('xl:grid-cols-4'))) {
            grid.classList.remove('grid-cols-1');
            const cols = window.innerWidth >= 425 ? 4 : window.innerWidth >= 375 ? 3 : 2;
            grid.classList.add(`grid-cols-${cols}`);
            grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
            grid.style.gap = '0.75rem';
            console.log(`✅ Grid ${index + 1} changed to ${cols} columns (from 4-col)`);
          }
          
          // 5-column layouts
          if (classList.some(cls => cls.includes('xl:grid-cols-5'))) {
            grid.classList.remove('grid-cols-1');
            const cols = window.innerWidth >= 425 ? 3 : 2;
            grid.classList.add(`grid-cols-${cols}`);
            grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
            grid.style.gap = '0.5rem';
            console.log(`✅ Grid ${index + 1} changed to ${cols} columns (from 5-col)`);
          }
        }
      });
      
      // STEP 7: Show all hidden desktop elements
      const hiddenElements = document.querySelectorAll('.hidden.md\\:block, .hidden.md\\:flex, .hidden.md\\:grid, .hidden.lg\\:block, .hidden.lg\\:flex, .hidden.lg\\:grid');
      hiddenElements.forEach((el, index) => {
        // Remove hidden class
        el.classList.remove('hidden');
        
        // Determine display type from classes
        const classList = Array.from(el.classList);
        let displayType = 'block';
        
        if (classList.some(cls => cls.includes('flex'))) {
          displayType = 'flex';
        } else if (classList.some(cls => cls.includes('grid'))) {
          displayType = 'grid';
        }
        
        // Force show
        el.style.cssText = `
          display: ${displayType} !important;
          visibility: visible !important;
          opacity: 1 !important;
          position: relative !important;
        `;
        
        console.log(`✅ Hidden element ${index + 1} shown as ${displayType}`);
      });
      
      // STEP 8: Transform flex layouts to horizontal
      const flexLayouts = document.querySelectorAll('.flex.flex-col.sm\\:flex-row, .flex.flex-col.md\\:flex-row');
      flexLayouts.forEach((el, index) => {
        el.classList.remove('flex-col');
        el.classList.add('flex-row');
        el.style.cssText = `
          flex-direction: row !important;
          flex-wrap: wrap !important;
          gap: 0.75rem !important;
          justify-content: center !important;
          align-items: center !important;
        `;
        console.log(`✅ Flex layout ${index + 1} changed to horizontal`);
      });
      
      console.log('✅ Desktop layout transformation complete');
      
    } catch (error) {
      console.error('❌ Error in desktop layout transformation:', error);
    }
  }
  
  // Apply desktop CSS styles
  function applyDesktopCSS() {
    console.log('🎨 Applying desktop CSS...');
    
    const css = `
      <style id="force-mobile-desktop">
        @media screen and (max-width: 767px) {
          /* Force hide any remaining mobile elements */
          .md\\:hidden {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
          }
          
          /* Force show desktop navigation */
          nav {
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            align-items: center !important;
            gap: 1rem !important;
            padding: 0.5rem !important;
          }
          
          nav a {
            font-size: 14px !important;
            padding: 0.5rem 0.75rem !important;
            white-space: nowrap !important;
            display: inline-flex !important;
            align-items: center !important;
          }
          
          /* Force horizontal layouts */
          .flex-col {
            flex-direction: row !important;
            flex-wrap: wrap !important;
            gap: 0.75rem !important;
            justify-content: center !important;
          }
          
          /* Force multi-column grids */
          .grid-cols-1 {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
          
          /* 3 columns for larger mobile screens */
          @media screen and (min-width: 375px) {
            .grid-cols-1 {
              grid-template-columns: repeat(3, 1fr) !important;
              gap: 0.75rem !important;
            }
          }
          
          /* Desktop spacing */
          section {
            padding: 3rem 1rem !important;
          }
          
          /* Prevent overflow */
          html, body {
            overflow-x: hidden !important;
          }
          
          /* Desktop button sizing */
          button {
            padding: 0.75rem 1.5rem !important;
            font-size: 14px !important;
            white-space: nowrap !important;
          }
        }
      </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', css);
    console.log('✅ Desktop CSS applied');
  }
  
  // Execute transformation immediately
  if (window.innerWidth <= 767) {
    console.log('📱 Mobile device detected, applying transformation...');
    
    // Apply CSS first
    applyDesktopCSS();
    
    // Apply DOM changes
    forceDesktopLayout();
    
    // Apply again after small delays to catch any late elements
    setTimeout(forceDesktopLayout, 100);
    setTimeout(forceDesktopLayout, 500);
    
    // Monitor for any new mobile elements and remove them
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // Element node
              // Remove any newly added mobile elements
              if (node.id === 'mobileMenuBtn' || node.id === 'mobileMenu' || 
                  node.id === 'mobileSignedOutState' || node.id === 'mobileSignedInState') {
                node.remove();
                console.log('✅ Removed newly added mobile element:', node.id);
              }
              
              // Check for mobile elements in child nodes
              const mobileElements = node.querySelectorAll && node.querySelectorAll('#mobileMenuBtn, #mobileMenu, #mobileSignedOutState, #mobileSignedInState');
              if (mobileElements) {
                mobileElements.forEach(el => {
                  el.remove();
                  console.log('✅ Removed newly added mobile child element:', el.id);
                });
              }
            }
          });
        }
      });
    });
    
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        observer.observe(document.body, { childList: true, subtree: true });
      });
    }
    
    console.log('✅ Mobile to desktop transformation complete and monitoring active');
  } else {
    console.log('⚠️ Desktop device detected, skipping mobile transformation');
  }
  
  // Make function globally available
  window.forceMobileDesktopMirror = forceDesktopLayout;
  
})();
