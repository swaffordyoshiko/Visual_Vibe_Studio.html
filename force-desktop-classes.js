// FORCE DESKTOP CLASSES - Direct DOM manipulation to force mobile to mirror desktop
console.log('🚀 FORCE DESKTOP CLASSES: Starting direct class manipulation...');

// Only run on mobile devices
if (window.innerWidth <= 767) {
  console.log('📱 Mobile detected - forcing desktop classes...');
  
  function forceDesktopClasses() {
    console.log('🔧 Forcing desktop classes...');
    
    try {
      // STEP 1: Remove mobile menu button by removing md:hidden class and hiding it
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      if (mobileMenuBtn) {
        mobileMenuBtn.classList.remove('md:hidden');
        mobileMenuBtn.classList.add('hidden');
        mobileMenuBtn.style.display = 'none';
        console.log('✅ Mobile menu button hidden');
      }
      
      // STEP 2: Show desktop navigation by removing hidden class and adding flex
      const desktopNav = document.querySelector('nav.hidden.md\\:flex');
      if (desktopNav) {
        desktopNav.classList.remove('hidden');
        desktopNav.classList.remove('md:flex');
        desktopNav.classList.add('flex');
        desktopNav.classList.add('items-center');
        desktopNav.classList.add('space-x-4');
        desktopNav.style.display = 'flex';
        console.log('✅ Desktop navigation shown');
      }
      
      // STEP 3: Hide mobile menu by adding hidden class
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu) {
        mobileMenu.classList.remove('md:hidden');
        mobileMenu.classList.add('hidden');
        mobileMenu.style.display = 'none';
        console.log('✅ Mobile menu hidden');
      }
      
      // STEP 4: Hide mobile auth states
      const mobileSignedOutState = document.getElementById('mobileSignedOutState');
      if (mobileSignedOutState) {
        mobileSignedOutState.classList.add('hidden');
        mobileSignedOutState.style.display = 'none';
        console.log('✅ Mobile signed out state hidden');
      }
      
      const mobileSignedInState = document.getElementById('mobileSignedInState');
      if (mobileSignedInState) {
        mobileSignedInState.classList.add('hidden');
        mobileSignedInState.style.display = 'none';
        console.log('✅ Mobile signed in state hidden');
      }
      
      // STEP 5: Ensure desktop auth states are visible
      const signedOutState = document.getElementById('signedOutState');
      if (signedOutState) {
        signedOutState.classList.remove('hidden');
        signedOutState.style.display = 'flex';
        console.log('✅ Desktop signed out state visible');
      }
      
      const signedInState = document.getElementById('signedInState');
      if (signedInState) {
        signedInState.classList.remove('hidden');
        // Keep the current display style (should be none if not signed in)
        console.log('✅ Desktop signed in state ready');
      }
      
      // STEP 6: Fix grid layouts - change single column to multi-column
      const grids = document.querySelectorAll('.grid');
      grids.forEach((grid, index) => {
        const classList = Array.from(grid.classList);
        
        // Handle 2-column grids
        if (classList.includes('grid-cols-1') && classList.includes('md:grid-cols-2')) {
          grid.classList.remove('grid-cols-1');
          grid.classList.add('grid-cols-2');
          console.log(`✅ Grid ${index + 1} changed to 2 columns`);
        }
        
        // Handle 3-column grids
        if (classList.includes('grid-cols-1') && (classList.includes('md:grid-cols-3') || classList.includes('lg:grid-cols-3'))) {
          grid.classList.remove('grid-cols-1');
          const cols = window.innerWidth >= 375 ? 3 : 2;
          grid.classList.add(`grid-cols-${cols}`);
          console.log(`✅ Grid ${index + 1} changed to ${cols} columns`);
        }
        
        // Handle 4-column grids
        if (classList.includes('grid-cols-1') && (classList.includes('lg:grid-cols-4') || classList.includes('xl:grid-cols-4'))) {
          grid.classList.remove('grid-cols-1');
          const cols = window.innerWidth >= 425 ? 4 : window.innerWidth >= 375 ? 3 : 2;
          grid.classList.add(`grid-cols-${cols}`);
          console.log(`✅ Grid ${index + 1} changed to ${cols} columns`);
        }
        
        // Handle 5-column grids
        if (classList.includes('grid-cols-1') && classList.includes('xl:grid-cols-5')) {
          grid.classList.remove('grid-cols-1');
          const cols = window.innerWidth >= 425 ? 3 : 2;
          grid.classList.add(`grid-cols-${cols}`);
          console.log(`✅ Grid ${index + 1} changed to ${cols} columns (from 5-col)`);
        }
      });
      
      // STEP 7: Show all hidden desktop elements
      const hiddenElements = document.querySelectorAll('.hidden.md\\:block, .hidden.md\\:flex, .hidden.md\\:grid, .hidden.lg\\:block, .hidden.lg\\:flex, .hidden.lg\\:grid');
      hiddenElements.forEach((el, index) => {
        el.classList.remove('hidden');
        console.log(`✅ Hidden desktop element ${index + 1} shown`);
      });
      
      // STEP 8: Transform flex layouts from column to row
      const flexLayouts = document.querySelectorAll('.flex-col.sm\\:flex-row, .flex-col.md\\:flex-row');
      flexLayouts.forEach((el, index) => {
        el.classList.remove('flex-col');
        el.classList.add('flex-row');
        console.log(`✅ Flex layout ${index + 1} changed to row`);
      });
      
      // STEP 9: Fix logo sizing issue
      const logo = document.querySelector('img[alt*="Visual Vibe Studio Logo"]');
      if (logo) {
        logo.classList.remove('h-8', 'w-8', 'sm:h-10', 'sm:w-10');
        logo.classList.add('h-8', 'w-8'); // Force consistent small size
        logo.style.height = '2rem';
        logo.style.width = '2rem';
        logo.style.maxHeight = '2rem';
        logo.style.maxWidth = '2rem';
        console.log('✅ Logo sizing fixed');
      }
      
      // STEP 10: Fix title sizing
      const title = document.querySelector('h1.text-lg');
      if (title) {
        title.classList.remove('sm:text-2xl');
        title.style.fontSize = '1.25rem'; // Force consistent size
        title.style.lineHeight = '1.75rem';
        console.log('✅ Title sizing fixed');
      }
      
      console.log('✅ Desktop classes forced successfully');
      
    } catch (error) {
      console.error('❌ Error forcing desktop classes:', error);
    }
  }
  
  // Apply additional CSS for layout fixes
  function addDesktopCSS() {
    const css = document.createElement('style');
    css.id = 'force-desktop-css';
    css.innerHTML = `
      @media screen and (max-width: 767px) {
        /* Ensure navigation is properly visible */
        nav.flex {
          display: flex !important;
          flex-wrap: wrap !important;
          justify-content: center !important;
          align-items: center !important;
          gap: 1rem !important;
          padding: 0.5rem !important;
        }
        
        nav.flex a {
          font-size: 14px !important;
          padding: 0.5rem 0.75rem !important;
          white-space: nowrap !important;
          border-radius: 0.375rem !important;
        }
        
        /* Ensure header layout */
        header .max-w-7xl {
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          flex-wrap: wrap !important;
          gap: 1rem !important;
        }
        
        /* Fix grid gaps */
        .grid-cols-2 {
          gap: 1rem !important;
        }
        
        .grid-cols-3 {
          gap: 0.75rem !important;
        }
        
        .grid-cols-4 {
          gap: 0.5rem !important;
        }
        
        /* Ensure flex layouts work */
        .flex-row {
          flex-direction: row !important;
          flex-wrap: wrap !important;
          gap: 0.75rem !important;
          justify-content: center !important;
        }
        
        /* Desktop section spacing */
        section {
          padding: 3rem 1rem !important;
        }
        
        /* Desktop button styling */
        button {
          padding: 0.75rem 1.5rem !important;
          font-size: 14px !important;
        }
        
        /* Prevent overflow */
        html, body {
          overflow-x: hidden !important;
        }
      }
      
      /* Larger mobile screens */
      @media screen and (min-width: 375px) and (max-width: 767px) {
        nav.flex a {
          font-size: 15px !important;
          padding: 0.5rem 1rem !important;
        }
      }
      
      /* Large mobile screens */
      @media screen and (min-width: 425px) and (max-width: 767px) {
        nav.flex a {
          font-size: 16px !important;
          padding: 0.75rem 1.25rem !important;
        }
        
        section {
          padding: 4rem 1.5rem !important;
        }
      }
    `;
    
    document.head.appendChild(css);
    console.log('✅ Desktop CSS added');
  }
  
  // Execute immediately
  forceDesktopClasses();
  addDesktopCSS();
  
  // Execute after small delays to catch any late changes
  setTimeout(forceDesktopClasses, 100);
  setTimeout(forceDesktopClasses, 500);
  setTimeout(forceDesktopClasses, 1000);
  
  // Execute when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceDesktopClasses);
  }
  
  // Execute when page is fully loaded
  window.addEventListener('load', forceDesktopClasses);
  
  // Monitor for any changes that might restore mobile classes
  const classObserver = new MutationObserver((mutations) => {
    let shouldReapply = false;
    
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const target = mutation.target;
        
        // Check if mobile elements got their classes back
        if ((target.id === 'mobileMenuBtn' && target.classList.contains('md:hidden')) ||
            (target.tagName === 'NAV' && target.classList.contains('hidden')) ||
            (target.id === 'mobileMenu' && !target.classList.contains('hidden'))) {
          shouldReapply = true;
          console.log('🚨 Mobile classes detected, reapplying desktop classes');
        }
      }
    });
    
    if (shouldReapply) {
      setTimeout(forceDesktopClasses, 50);
    }
  });
  
  if (document.body) {
    classObserver.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ['class']
    });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      classObserver.observe(document.body, {
        attributes: true,
        subtree: true,
        attributeFilter: ['class']
      });
    });
  }
  
  // Periodic maintenance
  setInterval(forceDesktopClasses, 3000);
  
  // Make function globally available
  window.forceDesktopClassesNow = forceDesktopClasses;
  
  console.log('🚀 FORCE DESKTOP CLASSES: Active and monitoring');
  
} else {
  console.log('⚠️ Desktop detected, skipping class forcing');
}
