// IMMEDIATE DOM TRANSFORMATION - Force mobile to mirror desktop layout exactly
console.log('🚀 IMMEDIATE DOM TRANSFORM: Starting...');

// Only run on mobile devices
if (window.innerWidth <= 767) {
  console.log('📱 Mobile detected - transforming DOM to mirror desktop...');
  
  // Function to transform header immediately
  function transformHeader() {
    console.log('🔧 Transforming header...');
    
    try {
      // STEP 1: Remove mobile menu button completely
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      if (mobileMenuBtn) {
        mobileMenuBtn.remove();
        console.log('✅ Mobile menu button removed');
      }
      
      // STEP 2: Remove mobile menu completely
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu) {
        mobileMenu.remove();
        console.log('✅ Mobile menu removed');
      }
      
      // STEP 3: Force show desktop navigation
      const desktopNav = document.querySelector('nav.hidden.md\\:flex');
      if (desktopNav) {
        desktopNav.classList.remove('hidden');
        desktopNav.classList.remove('md:flex');
        desktopNav.classList.add('flex');
        desktopNav.style.display = 'flex';
        desktopNav.style.visibility = 'visible';
        desktopNav.style.opacity = '1';
        console.log('✅ Desktop navigation shown');
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
      
      // STEP 5: Ensure desktop auth states are visible
      const desktopSignedOut = document.getElementById('signedOutState');
      const desktopSignedIn = document.getElementById('signedInState');
      
      if (desktopSignedOut) {
        desktopSignedOut.style.display = 'flex';
        desktopSignedOut.style.visibility = 'visible';
        desktopSignedOut.style.opacity = '1';
        console.log('✅ Desktop signed out state visible');
      }
      
      if (desktopSignedIn) {
        desktopSignedIn.style.display = 'flex';
        desktopSignedIn.style.visibility = 'visible';
        desktopSignedIn.style.opacity = '1';
        console.log('✅ Desktop signed in state visible');
      }
      
    } catch (error) {
      console.error('❌ Error transforming header:', error);
    }
  }
  
  // Function to transform all grid layouts to desktop style
  function transformGrids() {
    console.log('🔧 Transforming grids to desktop layout...');
    
    try {
      // Find all grid elements
      const grids = document.querySelectorAll('.grid');
      
      grids.forEach((grid, index) => {
        const classes = grid.className;
        
        // Transform single column grids to multi-column
        if (classes.includes('grid-cols-1')) {
          // For 2-column desktop layouts
          if (classes.includes('md:grid-cols-2')) {
            grid.classList.remove('grid-cols-1');
            grid.classList.add('grid-cols-2');
            grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            grid.style.gap = '1rem';
            console.log(`✅ Grid ${index + 1} changed to 2 columns`);
          }
          
          // For 3-column desktop layouts
          if (classes.includes('md:grid-cols-3') || classes.includes('lg:grid-cols-3')) {
            grid.classList.remove('grid-cols-1');
            const cols = window.innerWidth >= 375 ? 3 : 2;
            grid.classList.add(`grid-cols-${cols}`);
            grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
            grid.style.gap = '0.75rem';
            console.log(`✅ Grid ${index + 1} changed to ${cols} columns`);
          }
          
          // For 4-column desktop layouts
          if (classes.includes('lg:grid-cols-4') || classes.includes('xl:grid-cols-4')) {
            grid.classList.remove('grid-cols-1');
            const cols = window.innerWidth >= 425 ? 4 : window.innerWidth >= 375 ? 3 : 2;
            grid.classList.add(`grid-cols-${cols}`);
            grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
            grid.style.gap = '0.75rem';
            console.log(`✅ Grid ${index + 1} changed to ${cols} columns`);
          }
          
          // For 5-column desktop layouts
          if (classes.includes('xl:grid-cols-5')) {
            grid.classList.remove('grid-cols-1');
            const cols = window.innerWidth >= 425 ? 3 : 2; // Use 3 or 2 columns on mobile for 5-col desktop
            grid.classList.add(`grid-cols-${cols}`);
            grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
            grid.style.gap = '0.5rem';
            console.log(`✅ Grid ${index + 1} changed to ${cols} columns (from 5-col desktop)`);
          }
        }
      });
      
    } catch (error) {
      console.error('❌ Error transforming grids:', error);
    }
  }
  
  // Function to show all hidden desktop elements
  function showHiddenElements() {
    console.log('🔧 Showing hidden desktop elements...');
    
    try {
      // Show md:block elements
      const mdBlocks = document.querySelectorAll('.hidden.md\\:block');
      mdBlocks.forEach((el, index) => {
        el.classList.remove('hidden');
        el.style.display = 'block';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        console.log(`✅ MD block element ${index + 1} shown`);
      });
      
      // Show md:flex elements
      const mdFlexes = document.querySelectorAll('.hidden.md\\:flex');
      mdFlexes.forEach((el, index) => {
        el.classList.remove('hidden');
        el.style.display = 'flex';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        console.log(`✅ MD flex element ${index + 1} shown`);
      });
      
      // Show lg:block elements
      const lgBlocks = document.querySelectorAll('.hidden.lg\\:block');
      lgBlocks.forEach((el, index) => {
        el.classList.remove('hidden');
        el.style.display = 'block';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        console.log(`✅ LG block element ${index + 1} shown`);
      });
      
      // Show lg:flex elements
      const lgFlexes = document.querySelectorAll('.hidden.lg\\:flex');
      lgFlexes.forEach((el, index) => {
        el.classList.remove('hidden');
        el.style.display = 'flex';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        console.log(`✅ LG flex element ${index + 1} shown`);
      });
      
    } catch (error) {
      console.error('❌ Error showing hidden elements:', error);
    }
  }
  
  // Function to transform flex layouts to horizontal
  function transformFlexLayouts() {
    console.log('🔧 Transforming flex layouts to horizontal...');
    
    try {
      // Transform flex-col to flex-row for responsive layouts
      const flexCols = document.querySelectorAll('.flex.flex-col.sm\\:flex-row, .flex.flex-col.md\\:flex-row');
      flexCols.forEach((el, index) => {
        el.classList.remove('flex-col');
        el.classList.add('flex-row');
        el.style.flexDirection = 'row';
        el.style.flexWrap = 'wrap';
        el.style.gap = '0.75rem';
        el.style.justifyContent = 'center';
        el.style.alignItems = 'center';
        console.log(`✅ Flex layout ${index + 1} changed to horizontal`);
      });
      
    } catch (error) {
      console.error('❌ Error transforming flex layouts:', error);
    }
  }
  
  // Function to add desktop-style CSS
  function addDesktopCSS() {
    console.log('🔧 Adding desktop-style CSS...');
    
    const desktopCSS = document.createElement('style');
    desktopCSS.id = 'mobile-desktop-mirror';
    desktopCSS.innerHTML = `
      @media screen and (max-width: 767px) {
        /* Hide any remaining mobile elements */
        .md\\:hidden {
          display: none !important;
        }
        
        /* Force desktop navigation */
        nav {
          display: flex !important;
          flex-wrap: wrap !important;
          justify-content: center !important;
          gap: 0.5rem !important;
          padding: 0.5rem !important;
        }
        
        nav a {
          font-size: 14px !important;
          padding: 0.5rem 0.75rem !important;
          white-space: nowrap !important;
        }
        
        /* Prevent column layouts */
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
        
        /* Desktop button styling */
        button {
          padding: 0.75rem 1.5rem !important;
          font-size: 14px !important;
        }
      }
    `;
    
    document.head.appendChild(desktopCSS);
    console.log('✅ Desktop CSS added');
  }
  
  // Main transformation function
  function executeTransformation() {
    console.log('🚀 Executing complete transformation...');
    
    transformHeader();
    transformGrids();
    showHiddenElements();
    transformFlexLayouts();
    addDesktopCSS();
    
    console.log('✅ Transformation complete - mobile now mirrors desktop');
  }
  
  // Execute immediately
  executeTransformation();
  
  // Execute after short delays to catch any late-loading elements
  setTimeout(executeTransformation, 100);
  setTimeout(executeTransformation, 500);
  setTimeout(executeTransformation, 1000);
  
  // Execute when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', executeTransformation);
  }
  
  // Execute when page is fully loaded
  window.addEventListener('load', executeTransformation);
  
  // Monitor for changes and re-execute if needed
  const transformObserver = new MutationObserver((mutations) => {
    let shouldTransform = false;
    
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        // Check if mobile elements were re-added
        const target = mutation.target;
        if (target.querySelector && (
          target.querySelector('#mobileMenuBtn') ||
          target.querySelector('#mobileMenu') ||
          target.querySelector('#mobileSignedOutState') ||
          target.querySelector('#mobileSignedInState')
        )) {
          shouldTransform = true;
        }
      }
    });
    
    if (shouldTransform) {
      console.log('🔄 Mobile elements detected, re-transforming...');
      setTimeout(executeTransformation, 100);
    }
  });
  
  if (document.body) {
    transformObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      transformObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }
  
  // Make transformation function globally available
  window.forceMobileDesktopMirror = executeTransformation;
  
  console.log('🚀 IMMEDIATE DOM TRANSFORM: Ready and monitoring');
  
} else {
  console.log('⚠️ Desktop detected, skipping mobile transformation');
}
