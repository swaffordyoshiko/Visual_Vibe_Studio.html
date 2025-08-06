// Profile Conflict Disabler - Runs after other scripts to disable conflicts
console.log('🚫 Disabling profile conflicts and loading unified system...');

(function() {
  'use strict';
  
  function disableConflictingScripts() {
    console.log('🧹 Disabling conflicting profile scripts...');
    
    try {
      // List of conflicting functions to disable
      const conflictingFunctions = [
        'bulletproofFormHandler',
        'enhancedProfileFormHandler', 
        'comprehensiveProfileHandler',
        'definitiveProfileHandler',
        'autoSaveProfile',
        'initializeBulletproofSystem',
        'initializeComprehensiveProfileSystem',
        'setupCompleteProfileSystem',
        'enhancedOpenProfileModal',
        'bulletproofOpenModal'
      ];
      
      // Disable conflicting functions
      conflictingFunctions.forEach(funcName => {
        if (window[funcName]) {
          window[funcName] = function() {
            console.log(`🚫 Disabled conflicting function: ${funcName}`);
            return false;
          };
        }
      });
      
      // Clear conflicting timers and intervals
      if (window.profileIntervals) {
        window.profileIntervals.forEach(interval => clearInterval(interval));
        window.profileIntervals = [];
      }
      
      if (window.autoSaveTimer) {
        clearTimeout(window.autoSaveTimer);
        window.autoSaveTimer = null;
      }
      
      // Disable conflicting global flags
      window.isComprehensiveSystemActive = false;
      window.profileSystemInitialized = false;
      window.bulletproofSystemActive = false;
      
      console.log('✅ Conflicting profile scripts disabled');
      
    } catch (error) {
      console.error('❌ Error disabling conflicts:', error);
    }
  }
  
  function loadUnifiedProfileSystem() {
    console.log('📥 Loading unified profile system...');
    
    // Create script element for unified profile system
    const script = document.createElement('script');
    script.src = 'unified-profile-save.js';
    script.onload = function() {
      console.log('✅ Unified profile system loaded successfully');
    };
    script.onerror = function() {
      console.error('❌ Failed to load unified profile system');
    };
    
    document.head.appendChild(script);
  }
  
  // Run immediately
  disableConflictingScripts();
  loadUnifiedProfileSystem();
  
  // Also run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        disableConflictingScripts();
        // Unified system should already be loaded, just ensure it's initialized
        if (window.initializeUnifiedProfileSystem) {
          window.initializeUnifiedProfileSystem();
        }
      }, 100);
    });
  }
  
  // Run with delays to override any scripts that load later
  setTimeout(() => {
    disableConflictingScripts();
    if (window.initializeUnifiedProfileSystem) {
      window.initializeUnifiedProfileSystem();
    }
  }, 1000);
  
  setTimeout(() => {
    disableConflictingScripts();
    if (window.initializeUnifiedProfileSystem) {
      window.initializeUnifiedProfileSystem();
    }
  }, 3000);
  
  setTimeout(() => {
    disableConflictingScripts();
    if (window.initializeUnifiedProfileSystem) {
      window.initializeUnifiedProfileSystem();
    }
  }, 6000);
  
})();

console.log('🚫 Profile conflict disabler loaded and active');
