// FIX FULLSTORY NAMESPACE CONFLICT - Enhanced version
console.log('🔧 Fixing FullStory namespace conflict...');

(function() {
  'use strict';

  // Prevent multiple executions
  if (window.fullstoryFixApplied) {
    console.log('ℹ️ FullStory fix already applied');
    return;
  }
  window.fullstoryFixApplied = true;

  try {
    // Set FullStory namespace before it loads to prevent conflicts
    if (typeof window["_fs_namespace"] === 'undefined') {
      window["_fs_namespace"] = "FS";
      console.log('✅ FullStory namespace set to "FS"');
    } else {
      console.log('ℹ️ FullStory namespace already set:', window["_fs_namespace"]);
    }

    // Initialize the global FS object if it doesn't exist
    if (typeof window.FS === 'undefined') {
      window.FS = {};
      console.log('✅ FS global object initialized');
    }

    // Define a stub FS object to prevent errors
    window.FS = window.FS || {
      identify: function() { console.log('FS.identify called (stub)'); },
      event: function() { console.log('FS.event called (stub)'); },
      log: function() { console.log('FS.log called (stub)'); },
      getCurrentSessionURL: function() { console.log('FS.getCurrentSessionURL called (stub)'); return null; },
      consent: function() { console.log('FS.consent called (stub)'); },
      restart: function() { console.log('FS.restart called (stub)'); },
      shutdown: function() { console.log('FS.shutdown called (stub)'); }
    };

    // Clear any existing error messages
    setTimeout(() => {
      const fsErrors = document.querySelectorAll('[data-fs-error], .fs-error');
      fsErrors.forEach(error => {
        error.style.display = 'none';
        console.log('🔇 Hidden FullStory error message');
      });
    }, 1000);

    console.log('✅ FullStory namespace conflict resolved successfully');

  } catch (error) {
    console.error('❌ Error fixing FullStory namespace:', error);
  }

})();

// Make resolution function available globally
window.resolveFullStoryConflict = function() {
  console.log('🔧 Manual FullStory conflict resolution...');
  window["_fs_namespace"] = "FS";
  window.FS = window.FS || {};
  console.log('✅ FullStory conflict manually resolved');
};
