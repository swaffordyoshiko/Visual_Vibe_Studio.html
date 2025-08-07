// AGGRESSIVE DOM REWRITER - Completely restructure mobile DOM to match desktop
console.log('🚀 AGGRESSIVE DOM REWRITER: Starting complete restructure...');

// Only run on mobile devices
if (window.innerWidth <= 767) {
  console.log('📱 Mobile detected - starting aggressive DOM restructure...');
  
  // Function to completely rewrite the header structure
  function rewriteHeaderForDesktop() {
    console.log('🔧 Rewriting header structure...');
    
    try {
      const header = document.querySelector('header');
      if (!header) {
        console.log('❌ Header not found');
        return;
      }
      
      // Get the logo elements
      const logo = header.querySelector('img[alt*="Visual Vibe Studio"]');
      const title = header.querySelector('h1');
      
      if (!logo || !title) {
        console.log('❌ Logo or title not found');
        return;
      }
      
      // Create new desktop header structure
      const newHeaderContent = `
        <div class="max-w-7xl mx-auto flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <img
              src="${logo.src}"
              alt="Visual Vibe Studio Logo"
              class="h-8 w-8 sm:h-10 sm:w-10 object-contain"
              loading="eager"
            />
            <h1 class="text-lg sm:text-2xl font-bold text-indigo-600">Visual Vibe Studio</h1>
          </div>
          
          <!-- FORCE DESKTOP NAVIGATION - NO MOBILE CLASSES -->
          <nav class="flex items-center space-x-4">
            <a href="#services" class="text-gray-700 hover:text-indigo-600 transition-colors">Services</a>
            <a href="#reviews" class="text-gray-700 hover:text-indigo-600 transition-colors">Reviews</a>
            <a href="#order" class="text-gray-700 hover:text-indigo-600 transition-colors">Order</a>
            <a href="#contact" class="text-gray-700 hover:text-indigo-600 transition-colors">Contact</a>
            
            <!-- FORCE DESKTOP AUTH STATES -->
            <div id="userAccountSection" class="flex items-center space-x-3">
              <!-- Signed Out State -->
              <div id="signedOutState" class="flex items-center space-x-2" style="display: flex;">
                <button onclick="openSignInModal()" class="bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                  Sign In
                </button>
                <button onclick="openSignUpModal()" class="border border-indigo-600 text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors text-sm font-medium">
                  Sign Up
                </button>
              </div>
              
              <!-- Signed In State -->
              <div id="signedInState" class="flex items-center space-x-3 hidden" style="display: none;">
                <button onclick="openProfileModal()" class="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded-lg transition-colors group">
                  <div class="bg-indigo-100 p-2 rounded-full group-hover:bg-indigo-200 transition-colors">
                    <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                  <div class="text-left hidden lg:block">
                    <span class="text-xs text-gray-500">Click to edit profile</span>
                  </div>
                  <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <button onclick="showOrderHistory()" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors">
                  My Orders
                </button>
                <button onclick="signOut()" class="text-gray-500 hover:text-gray-700 text-sm">
                  Sign Out
                </button>
              </div>
            </div>
          </nav>
        </div>
      `;
      
      // Replace the entire header content
      header.innerHTML = newHeaderContent;
      
      console.log('✅ Header rewritten with desktop structure');
      
    } catch (error) {
      console.error('❌ Error rewriting header:', error);
    }
  }
  
  // Function to force desktop grid layouts
  function forceDesktopGrids() {
    console.log('🔧 Forcing desktop grid layouts...');
    
    try {
      // Find all grids and force desktop layouts
      const grids = document.querySelectorAll('.grid');
      
      grids.forEach((grid, index) => {
        // Remove mobile grid classes and add desktop ones
        const classes = grid.className;
        
        // Replace mobile single-column with desktop multi-column
        if (classes.includes('grid-cols-1')) {
          let newClasses = classes;
          
          // Force 2-column layout for md:grid-cols-2
          if (classes.includes('md:grid-cols-2')) {
            newClasses = newClasses.replace(/grid-cols-1/g, 'grid-cols-2');
          }
          
          // Force 2-3 column layout for md:grid-cols-3
          if (classes.includes('md:grid-cols-3') || classes.includes('lg:grid-cols-3')) {
            const columns = window.innerWidth >= 375 ? 3 : 2;
            newClasses = newClasses.replace(/grid-cols-1/g, `grid-cols-${columns}`);
          }
          
          // Apply new classes
          grid.className = newClasses;
          
          // Also add direct styles as backup
          if (classes.includes('md:grid-cols-2')) {
            grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            grid.style.gap = '1rem';
          } else if (classes.includes('md:grid-cols-3') || classes.includes('lg:grid-cols-3')) {
            const columns = window.innerWidth >= 375 ? 3 : 2;
            grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
            grid.style.gap = '0.75rem';
          }
          
          console.log(`✅ Grid ${index + 1} converted to desktop layout`);
        }
      });
      
    } catch (error) {
      console.error('❌ Error forcing grids:', error);
    }
  }
  
  // Function to show all hidden desktop elements
  function showHiddenDesktopElements() {
    console.log('🔧 Showing hidden desktop elements...');
    
    try {
      // Find and show all hidden desktop elements
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
          
          // Determine correct display type
          const displayType = selector.includes('flex') ? 'flex' :
                            selector.includes('grid') ? 'grid' : 'block';
          
          // Force show with styles
          el.style.display = displayType;
          el.style.visibility = 'visible';
          el.style.opacity = '1';
          
          console.log(`✅ Shown hidden ${displayType} element ${index + 1}`);
        });
      });
      
    } catch (error) {
      console.error('❌ Error showing hidden elements:', error);
    }
  }
  
  // Function to force horizontal flex layouts
  function forceHorizontalLayouts() {
    console.log('🔧 Forcing horizontal flex layouts...');
    
    try {
      const flexSelectors = [
        '.flex.flex-col.md\\:flex-row',
        '.flex.flex-col.sm\\:flex-row'
      ];
      
      flexSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
          // Remove flex-col and add flex-row
          el.classList.remove('flex-col');
          el.classList.add('flex-row');
          
          // Force styles
          el.style.flexDirection = 'row';
          el.style.flexWrap = 'wrap';
          el.style.gap = '0.75rem';
          el.style.justifyContent = 'center';
          el.style.alignItems = 'center';
          
          console.log(`✅ Flex layout ${index + 1} converted to horizontal`);
        });
      });
      
    } catch (error) {
      console.error('❌ Error forcing horizontal layouts:', error);
    }
  }
  
  // Main function to apply all desktop changes
  function applyDesktopLayout() {
    console.log('🚀 Applying complete desktop layout...');
    
    rewriteHeaderForDesktop();
    forceDesktopGrids();
    showHiddenDesktopElements();
    forceHorizontalLayouts();
    
    // Add custom CSS to ensure everything stays desktop-like
    const desktopCSS = document.createElement('style');
    desktopCSS.id = 'aggressive-desktop-override';
    desktopCSS.innerHTML = `
      @media screen and (max-width: 767px) {
        /* Ensure no mobile-specific hiding */
        .md\\:hidden { display: none !important; }
        .lg\\:hidden { display: none !important; }
        
        /* Force desktop navigation visible */
        nav { display: flex !important; }
        
        /* Prevent any flex column layouts */
        .flex-col { flex-direction: row !important; }
        
        /* Force all grids to be multi-column */
        .grid-cols-1 { 
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 1rem !important;
        }
        
        /* Larger screens get 3 columns */
        @media screen and (min-width: 375px) {
          .grid-cols-1 { 
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 0.75rem !important;
          }
        }
        
        /* Prevent horizontal scroll */
        html, body { overflow-x: hidden !important; }
        
        /* Desktop-like spacing */
        section { padding: 3rem 1rem !important; }
        
        /* Desktop button sizes */
        button { 
          padding: 0.75rem 1.5rem !important;
          font-size: 14px !important;
        }
      }
    `;
    
    document.head.appendChild(desktopCSS);
    
    console.log('✅ Complete desktop layout applied');
  }
  
  // Apply immediately
  applyDesktopLayout();
  
  // Apply after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyDesktopLayout);
  } else {
    setTimeout(applyDesktopLayout, 100);
  }
  
  // Apply after page load
  window.addEventListener('load', applyDesktopLayout);
  
  // Reapply periodically to handle dynamic content
  setInterval(applyDesktopLayout, 3000);
  
  // Monitor for changes and reapply
  const aggressiveObserver = new MutationObserver((mutations) => {
    let shouldReapply = false;
    
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' || 
          (mutation.type === 'attributes' && 
           (mutation.attributeName === 'class' || mutation.attributeName === 'style'))) {
        shouldReapply = true;
      }
    });
    
    if (shouldReapply) {
      setTimeout(applyDesktopLayout, 200);
    }
  });
  
  if (document.body) {
    aggressiveObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      aggressiveObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style']
      });
    });
  }
  
  // Make function globally available
  window.forceDesktopLayoutNow = applyDesktopLayout;
  
  console.log('🚀 AGGRESSIVE DOM REWRITER: Loaded and monitoring');
  
} else {
  console.log('⚠️ Not mobile device, skipping DOM rewriter');
}
