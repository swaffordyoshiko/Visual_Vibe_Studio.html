// FORCE MOBILE TO DESKTOP NOW - Nuclear approach
console.log('🚀 FORCE MOBILE DESKTOP: Nuclear approach starting...');

// Immediately inject styles before anything else loads
(function forceDesktopNow() {
  // Only run on mobile
  if (window.innerWidth > 767) {
    console.log('⚠️ Not mobile, skipping force desktop');
    return;
  }
  
  console.log('📱 FORCING mobile to desktop layout NOW...');
  
  // NUCLEAR CSS - Override everything with maximum specificity
  const nuclearCSS = document.createElement('style');
  nuclearCSS.id = 'nuclear-mobile-desktop';
  nuclearCSS.innerHTML = `
    /* NUCLEAR MOBILE DESKTOP OVERRIDE */
    @media screen and (max-width: 767px) {
      
      /* CRITICAL: Completely remove mobile menu button */
      #mobileMenuBtn,
      button[id="mobileMenuBtn"],
      [onclick="toggleMobileMenu()"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        position: absolute !important;
        left: -9999px !important;
        width: 0 !important;
        height: 0 !important;
      }
      
      /* CRITICAL: Hide mobile menu */
      #mobileMenu,
      div[id="mobileMenu"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        position: absolute !important;
        left: -9999px !important;
      }
      
      /* CRITICAL: Force show desktop navigation with maximum specificity */
      nav.hidden.md\\:flex,
      nav[class*="hidden"][class*="md:flex"],
      .hidden.md\\:flex,
      nav.hidden,
      header nav {
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
        clip: unset !important;
        clip-path: unset !important;
        transform: none !important;
        flex-wrap: wrap !important;
        justify-content: center !important;
        align-items: center !important;
        gap: 0.5rem !important;
        padding: 0.5rem !important;
        margin: 0 !important;
      }
      
      /* CRITICAL: Force desktop navigation links to show */
      nav.hidden.md\\:flex a,
      nav[class*="hidden"][class*="md:flex"] a,
      .hidden.md\\:flex a,
      nav.hidden a,
      header nav a {
        display: inline-flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        font-size: 14px !important;
        padding: 0.5rem 0.75rem !important;
        white-space: nowrap !important;
        color: inherit !important;
        text-decoration: none !important;
        align-items: center !important;
        justify-content: center !important;
      }
      
      /* CRITICAL: Force show desktop auth states */
      #signedOutState,
      div[id="signedOutState"],
      #signedInState,
      div[id="signedInState"] {
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
      
      /* CRITICAL: Force hide mobile auth states */
      #mobileSignedOutState,
      div[id="mobileSignedOutState"],
      #mobileSignedInState,
      div[id="mobileSignedInState"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        position: absolute !important;
        left: -9999px !important;
        width: 0 !important;
        height: 0 !important;
      }
      
      /* CRITICAL: Header layout to match desktop */
      header .max-w-7xl,
      header > div {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        flex-wrap: wrap !important;
        gap: 0.5rem !important;
        width: 100% !important;
      }
      
      /* CRITICAL: Force desktop grid layouts */
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
      
      .grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3,
      .grid[class*="grid-cols-1"][class*="sm:grid-cols-2"][class*="lg:grid-cols-3"] {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 0.75rem !important;
      }
      
      /* CRITICAL: For larger mobile screens, use 3 columns */
      @media screen and (min-width: 375px) and (max-width: 767px) {
        .grid.grid-cols-1.md\\:grid-cols-3,
        .grid.grid-cols-1.lg\\:grid-cols-3,
        .grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3,
        .grid[class*="grid-cols-1"][class*="md:grid-cols-3"],
        .grid[class*="grid-cols-1"][class*="lg:grid-cols-3"],
        .grid[class*="grid-cols-1"][class*="sm:grid-cols-2"][class*="lg:grid-cols-3"] {
          grid-template-columns: repeat(3, 1fr) !important;
          gap: 0.5rem !important;
        }
      }
      
      /* CRITICAL: Force all hidden desktop elements to show */
      .hidden.md\\:block,
      .hidden.md\\:flex,
      .hidden.md\\:grid,
      .hidden.md\\:inline,
      .hidden.md\\:inline-block,
      .hidden.lg\\:block,
      .hidden.lg\\:flex,
      .hidden.lg\\:grid,
      [class*="hidden"][class*="md:block"],
      [class*="hidden"][class*="md:flex"],
      [class*="hidden"][class*="md:grid"],
      [class*="hidden"][class*="lg:block"],
      [class*="hidden"][class*="lg:flex"] {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: relative !important;
        left: auto !important;
        right: auto !important;
        width: auto !important;
        height: auto !important;
      }
      
      /* CRITICAL: Force flex elements to show as flex */
      .hidden.md\\:flex,
      .hidden.lg\\:flex,
      [class*="hidden"][class*="md:flex"],
      [class*="hidden"][class*="lg:flex"] {
        display: flex !important;
      }
      
      /* CRITICAL: Force grid elements to show as grid */
      .hidden.md\\:grid,
      .hidden.lg\\:grid,
      [class*="hidden"][class*="md:grid"],
      [class*="hidden"][class*="lg:grid"] {
        display: grid !important;
      }
      
      /* CRITICAL: Force horizontal flex layouts */
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
      
      /* CRITICAL: Prevent any overflow issues */
      html, body {
        overflow-x: hidden !important;
        max-width: 100vw !important;
      }
      
      /* CRITICAL: Override any mobile-specific hiding */
      .md\\:hidden {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
      
      /* CRITICAL: Ensure buttons look desktop-like */
      button, .btn, a.btn {
        padding: 0.75rem 1.5rem !important;
        font-size: 14px !important;
        white-space: nowrap !important;
        border-radius: 0.375rem !important;
      }
      
      /* CRITICAL: Desktop section spacing */
      section {
        padding: 3rem 1rem !important;
      }
      
      /* CRITICAL: Desktop text sizes */
      .text-xs { font-size: 0.75rem !important; }
      .text-sm { font-size: 0.875rem !important; }
      .text-base { font-size: 1rem !important; }
      .text-lg { font-size: 1.125rem !important; }
      .text-xl { font-size: 1.25rem !important; }
      .text-2xl { font-size: 1.5rem !important; }
      .text-3xl { font-size: 1.875rem !important; }
      .text-4xl { font-size: 2.25rem !important; }
      
      /* CRITICAL: Contact methods layout */
      .contact-methods {
        display: flex !important;
        flex-direction: row !important;
        flex-wrap: wrap !important;
        gap: 1rem !important;
        justify-content: center !important;
      }
      
      .contact-methods > * {
        flex: 0 1 calc(50% - 0.5rem) !important;
        min-width: 200px !important;
      }
      
      @media screen and (min-width: 375px) and (max-width: 767px) {
        .contact-methods > * {
          flex: 0 1 calc(33.333% - 0.667rem) !important;
        }
      }
      
      /* CRITICAL: Form layouts */
      form .grid.grid-cols-1.md\\:grid-cols-2,
      form .grid[class*="grid-cols-1"][class*="md:grid-cols-2"] {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 0.75rem !important;
      }
    }
  `;
  
  // Inject immediately
  if (document.head) {
    document.head.appendChild(nuclearCSS);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      document.head.appendChild(nuclearCSS);
    });
  }
  
  console.log('✅ Nuclear CSS injected');
})();

// NUCLEAR DOM FIXES - Run immediately and repeatedly
function nuclearDOMFixes() {
  if (window.innerWidth > 767) return;
  
  console.log('🔧 Applying nuclear DOM fixes...');
  
  try {
    // NUCLEAR: Completely remove mobile menu button
    const mobileBtns = document.querySelectorAll('#mobileMenuBtn, button[onclick*="toggleMobileMenu"]');
    mobileBtns.forEach(btn => {
      if (btn && btn.parentNode) {
        btn.parentNode.removeChild(btn);
      }
    });
    
    // NUCLEAR: Hide mobile menu
    const mobileMenus = document.querySelectorAll('#mobileMenu');
    mobileMenus.forEach(menu => {
      if (menu) {
        menu.style.display = 'none';
        menu.style.visibility = 'hidden';
        menu.style.opacity = '0';
        menu.style.position = 'absolute';
        menu.style.left = '-9999px';
      }
    });
    
    // NUCLEAR: Force show desktop navigation
    const desktopNavs = document.querySelectorAll('nav.hidden, nav[class*="hidden"], .hidden.md\\:flex, header nav');
    desktopNavs.forEach(nav => {
      if (nav) {
        nav.classList.remove('hidden');
        nav.style.display = 'flex';
        nav.style.visibility = 'visible';
        nav.style.opacity = '1';
        nav.style.position = 'relative';
        nav.style.left = 'auto';
        nav.style.right = 'auto';
        nav.style.width = 'auto';
        nav.style.height = 'auto';
        nav.style.overflow = 'visible';
        nav.style.clipPath = 'unset';
        nav.style.clip = 'unset';
        nav.style.transform = 'none';
      }
    });
    
    // NUCLEAR: Force show desktop auth states
    const desktopAuthStates = document.querySelectorAll('#signedOutState, #signedInState');
    desktopAuthStates.forEach(state => {
      if (state) {
        state.style.display = 'flex';
        state.style.visibility = 'visible';
        state.style.opacity = '1';
        state.style.position = 'relative';
        state.style.left = 'auto';
        state.style.right = 'auto';
      }
    });
    
    // NUCLEAR: Force hide mobile auth states
    const mobileAuthStates = document.querySelectorAll('#mobileSignedOutState, #mobileSignedInState');
    mobileAuthStates.forEach(state => {
      if (state) {
        state.style.display = 'none';
        state.style.visibility = 'hidden';
        state.style.opacity = '0';
        state.style.position = 'absolute';
        state.style.left = '-9999px';
      }
    });
    
    // NUCLEAR: Force all hidden desktop elements to show
    const hiddenElements = document.querySelectorAll('.hidden.md\\:block, .hidden.md\\:flex, .hidden.md\\:grid, .hidden.lg\\:block, .hidden.lg\\:flex');
    hiddenElements.forEach(el => {
      if (el) {
        el.classList.remove('hidden');
        const classes = el.className;
        const displayType = classes.includes('flex') ? 'flex' :
                          classes.includes('grid') ? 'grid' :
                          classes.includes('inline') ? 'inline' : 'block';
        el.style.display = displayType;
        el.style.visibility = 'visible';
        el.style.opacity = '1';
      }
    });
    
    // NUCLEAR: Force grid layouts
    const grids = document.querySelectorAll('.grid');
    grids.forEach(grid => {
      if (grid && grid.classList.contains('grid-cols-1')) {
        let columns = 1;
        
        if (grid.classList.contains('md:grid-cols-2') || grid.classList.contains('sm:grid-cols-2')) {
          columns = 2;
        }
        
        if (grid.classList.contains('md:grid-cols-3') || grid.classList.contains('lg:grid-cols-3')) {
          columns = window.innerWidth >= 375 ? 3 : 2;
        }
        
        if (columns > 1) {
          grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
          grid.style.gap = columns === 3 ? '0.75rem' : '1rem';
        }
      }
    });
    
    // NUCLEAR: Force horizontal flex layouts
    const flexLayouts = document.querySelectorAll('.flex.flex-col.md\\:flex-row, .flex.flex-col.sm\\:flex-row');
    flexLayouts.forEach(flex => {
      if (flex) {
        flex.style.flexDirection = 'row';
        flex.style.flexWrap = 'wrap';
        flex.style.gap = '0.75rem';
        flex.style.justifyContent = 'center';
      }
    });
    
    console.log('✅ Nuclear DOM fixes applied successfully');
    
  } catch (error) {
    console.error('❌ Error in nuclear DOM fixes:', error);
  }
}

// Run nuclear fixes immediately
nuclearDOMFixes();

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', nuclearDOMFixes);
} else {
  setTimeout(nuclearDOMFixes, 100);
}

// Run after page is fully loaded
window.addEventListener('load', nuclearDOMFixes);

// Run periodically to catch dynamic content
setInterval(() => {
  if (window.innerWidth <= 767) {
    nuclearDOMFixes();
  }
}, 2000);

// Monitor for changes and reapply
const nuclearObserver = new MutationObserver((mutations) => {
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
      setTimeout(nuclearDOMFixes, 200);
    }
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

// Make function globally available
window.forceDesktopNow = nuclearDOMFixes;

console.log('🚀 FORCE MOBILE DESKTOP: Nuclear approach loaded and active');
