// IMMEDIATE MOBILE MIRROR LOADER - Load and apply ultimate mobile mirror fix
console.log('🚀 IMMEDIATE MOBILE MIRROR LOADER: Starting...');

(function immediateLoader() {
  // Only run on mobile
  if (window.innerWidth > 767) {
    console.log('⚠️ Not mobile, skipping');
    return;
  }
  
  console.log('📱 Mobile detected, loading ultimate mirror fix...');
  
  // Load the ultimate mobile mirror fix script dynamically
  const script = document.createElement('script');
  script.src = 'ultimate-mobile-mirror-fix.js';
  script.onload = function() {
    console.log('✅ Ultimate mobile mirror fix loaded');
    // Trigger the fix immediately
    if (window.refreshUltimateMobileMirror) {
      window.refreshUltimateMobileMirror();
    }
  };
  script.onerror = function() {
    console.log('⚠️ Failed to load ultimate mobile mirror, applying inline fix');
    applyInlineMobileMirror();
  };
  
  document.head.appendChild(script);
  
  // Apply basic inline fix immediately as backup
  applyInlineMobileMirror();
})();

function applyInlineMobileMirror() {
  console.log('🔧 Applying inline mobile mirror fix...');
  
  // Create immediate mobile mirror styles
  const mobileStyles = document.createElement('style');
  mobileStyles.id = 'immediate-mobile-mirror';
  mobileStyles.innerHTML = `
    @media (max-width: 767px) {
      /* CRITICAL: Hide mobile elements */
      #mobileMenuBtn {
        display: none !important;
        visibility: hidden !important;
      }
      
      #mobileMenu {
        display: none !important;
        visibility: hidden !important;
      }
      
      #mobileSignedOutState,
      #mobileSignedInState {
        display: none !important;
        visibility: hidden !important;
      }
      
      /* CRITICAL: Show desktop navigation */
      nav.hidden,
      nav.md\\:flex,
      .hidden.md\\:flex {
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        flex-wrap: wrap !important;
        justify-content: center !important;
        gap: 0.5rem !important;
        padding: 0.5rem !important;
      }
      
      nav.hidden.md\\:flex a,
      nav.md\\:flex a {
        font-size: 14px !important;
        padding: 0.5rem 0.75rem !important;
        white-space: nowrap !important;
      }
      
      /* CRITICAL: Show desktop auth states */
      #signedOutState,
      #signedInState {
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        flex-direction: row !important;
        gap: 0.5rem !important;
      }
      
      /* CRITICAL: Force desktop grids */
      .grid.grid-cols-1.md\\:grid-cols-2 {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 1rem !important;
      }
      
      .grid.grid-cols-1.md\\:grid-cols-3,
      .grid.grid-cols-1.lg\\:grid-cols-3 {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 0.75rem !important;
      }
      
      /* CRITICAL: Show hidden desktop elements */
      .hidden.md\\:block {
        display: block !important;
        visibility: visible !important;
      }
      
      .hidden.md\\:flex {
        display: flex !important;
        visibility: visible !important;
      }
      
      /* CRITICAL: Header layout */
      header .max-w-7xl {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        flex-wrap: wrap !important;
        gap: 0.5rem !important;
      }
      
      /* CRITICAL: Prevent overflow */
      html, body {
        overflow-x: hidden !important;
      }
    }
  `;
  
  document.head.appendChild(mobileStyles);
  
  // Apply immediate DOM fixes
  setTimeout(() => {
    if (window.innerWidth <= 767) {
      // Hide mobile elements
      const mobileBtn = document.getElementById('mobileMenuBtn');
      if (mobileBtn) {
        mobileBtn.style.display = 'none';
        mobileBtn.style.visibility = 'hidden';
      }
      
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu) {
        mobileMenu.style.display = 'none';
        mobileMenu.style.visibility = 'hidden';
      }
      
      // Show desktop navigation
      const desktopNavs = document.querySelectorAll('nav.hidden, nav.md\\:flex');
      desktopNavs.forEach(nav => {
        nav.classList.remove('hidden');
        nav.style.display = 'flex';
        nav.style.visibility = 'visible';
      });
      
      // Show desktop auth states
      const signedOutState = document.getElementById('signedOutState');
      if (signedOutState) {
        signedOutState.style.display = 'flex';
        signedOutState.style.visibility = 'visible';
      }
      
      const signedInState = document.getElementById('signedInState');
      if (signedInState) {
        signedInState.style.display = 'flex';
        signedInState.style.visibility = 'visible';
      }
      
      // Hide mobile auth states
      const mobileSignedOut = document.getElementById('mobileSignedOutState');
      if (mobileSignedOut) {
        mobileSignedOut.style.display = 'none';
        mobileSignedOut.style.visibility = 'hidden';
      }
      
      const mobileSignedIn = document.getElementById('mobileSignedInState');
      if (mobileSignedIn) {
        mobileSignedIn.style.display = 'none';
        mobileSignedIn.style.visibility = 'hidden';
      }
    }
  }, 50);
  
  console.log('✅ Inline mobile mirror applied');
}
