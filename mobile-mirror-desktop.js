// Mobile Mirror Desktop - JavaScript enhancements
console.log('📱 Mobile Mirror Desktop: Initializing...');

class MobileMirrorDesktop {
  constructor() {
    this.init();
  }
  
  init() {
    this.forceDesktopNavigation();
    this.enhanceResponsiveLayouts();
    this.setupResizeHandler();
    this.fixMobileQuirks();
    console.log('✅ Mobile Mirror Desktop: Ready');
  }
  
  forceDesktopNavigation() {
    // Force desktop navigation to show on mobile
    const desktopNav = document.querySelector('nav.hidden.md\\:flex');
    if (desktopNav) {
      desktopNav.classList.remove('hidden');
      desktopNav.style.display = 'flex';
      console.log('✅ Desktop navigation forced on mobile');
    }
    
    // Hide mobile menu button
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
      mobileMenuBtn.style.display = 'none';
    }
    
    // Hide mobile menu
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
      mobileMenu.style.display = 'none';
    }
    
    // Show desktop auth states, hide mobile ones
    const signedOutState = document.getElementById('signedOutState');
    const signedInState = document.getElementById('signedInState');
    const mobileSignedOutState = document.getElementById('mobileSignedOutState');
    const mobileSignedInState = document.getElementById('mobileSignedInState');
    
    if (window.innerWidth <= 767) {
      if (signedOutState) signedOutState.style.display = 'flex';
      if (signedInState) signedInState.style.display = 'flex';
      if (mobileSignedOutState) mobileSignedOutState.style.display = 'none';
      if (mobileSignedInState) mobileSignedInState.style.display = 'none';
    }
  }
  
  enhanceResponsiveLayouts() {
    // Force desktop-like grid layouts on mobile
    const grids = document.querySelectorAll('.grid');
    grids.forEach(grid => {
      if (window.innerWidth <= 767) {
        // Convert single column grids to multi-column on mobile
        if (grid.classList.contains('grid-cols-1')) {
          if (grid.classList.contains('md:grid-cols-2') || grid.classList.contains('lg:grid-cols-2')) {
            grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
          }
          if (grid.classList.contains('md:grid-cols-3') || grid.classList.contains('lg:grid-cols-3')) {
            grid.style.gridTemplateColumns = window.innerWidth >= 375 ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)';
          }
          grid.style.gap = '1rem';
        }
      }
    });
    
    // Force flex layouts to be horizontal like desktop
    const flexLayouts = document.querySelectorAll('.flex.flex-col.md\\:flex-row, .flex.flex-col.sm\\:flex-row');
    flexLayouts.forEach(flex => {
      if (window.innerWidth <= 767) {
        flex.style.flexDirection = 'row';
        flex.style.flexWrap = 'wrap';
        flex.style.gap = '0.75rem';
      }
    });
    
    console.log('✅ Responsive layouts enhanced for desktop-like mobile');
  }
  
  setupResizeHandler() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.forceDesktopNavigation();
        this.enhanceResponsiveLayouts();
      }, 100);
    });
  }
  
  fixMobileQuirks() {
    // Fix viewport issues
    if (window.innerWidth <= 767) {
      document.body.style.overflowX = 'hidden';
      
      // Fix touch scrolling
      document.body.style.webkitOverflowScrolling = 'touch';
      
      // Prevent zoom on form focus
      const inputs = document.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        if (parseInt(getComputedStyle(input).fontSize) < 16) {
          input.style.fontSize = '16px';
        }
      });
    }
    
    // Fix modal positioning on mobile
    const modals = document.querySelectorAll('.fixed.inset-0');
    modals.forEach(modal => {
      if (window.innerWidth <= 767) {
        modal.style.padding = '1rem';
        const modalContent = modal.querySelector('div');
        if (modalContent) {
          modalContent.style.maxWidth = '500px';
          modalContent.style.margin = 'auto';
          modalContent.style.maxHeight = '80vh';
          modalContent.style.overflowY = 'auto';
        }
      }
    });
    
    console.log('✅ Mobile quirks fixed');
  }
  
  // Public method to refresh layouts
  refresh() {
    this.forceDesktopNavigation();
    this.enhanceResponsiveLayouts();
    this.fixMobileQuirks();
  }
}

// Initialize when DOM is ready
function initMobileMirror() {
  if (window.innerWidth <= 767) {
    window.mobileMirrorDesktop = new MobileMirrorDesktop();
    
    // Refresh periodically to catch dynamic content
    setInterval(() => {
      if (window.mobileMirrorDesktop) {
        window.mobileMirrorDesktop.refresh();
      }
    }, 5000);
  }
}

// Initialize immediately if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileMirror);
} else {
  initMobileMirror();
}

// Also initialize after a delay to catch any late-loading content
setTimeout(initMobileMirror, 1000);

// Make refresh function globally available
window.refreshMobileMirror = function() {
  if (window.mobileMirrorDesktop) {
    window.mobileMirrorDesktop.refresh();
  } else {
    initMobileMirror();
  }
};

console.log('✅ Mobile Mirror Desktop script loaded');
