// INJECT DEFINITIVE FIX - LOADS THE DEFINITIVE BUTTON FIX FOR ANY PAGE
console.log('💉 Injecting Definitive Button Fix...');

(function() {
  'use strict';

  // Check if already loaded
  if (window.definitiveFixInjected) {
    console.log('✅ Definitive fix already injected');
    return;
  }
  window.definitiveFixInjected = true;

  // Load the definitive fix script
  function loadDefinitiveFix() {
    const script = document.createElement('script');
    script.src = 'definitive-button-fix.js';
    script.onload = function() {
      console.log('✅ Definitive button fix script loaded successfully');
    };
    script.onerror = function() {
      console.error('❌ Failed to load definitive button fix script');
      // Fallback: Apply basic fix directly
      applyBasicFix();
    };
    document.head.appendChild(script);
  }

  // Fallback basic fix if script loading fails
  function applyBasicFix() {
    console.log('🔧 Applying basic fallback fix...');
    
    window.openSignInModal = function() {
      alert('Sign In functionality is being restored. Please refresh the page and try again.');
    };
    
    window.openSignUpModal = function() {
      alert('Sign Up functionality is being restored. Please refresh the page and try again.');
    };
    
    // Try to fix buttons
    setTimeout(() => {
      const signInButtons = document.querySelectorAll('button[onclick*="openSignInModal"], a[onclick*="openSignInModal"]');
      const signUpButtons = document.querySelectorAll('button[onclick*="openSignUpModal"], a[onclick*="openSignUpModal"]');
      
      signInButtons.forEach(btn => {
        btn.onclick = function(e) {
          e.preventDefault();
          openSignInModal();
        };
      });
      
      signUpButtons.forEach(btn => {
        btn.onclick = function(e) {
          e.preventDefault();
          openSignUpModal();
        };
      });
      
      console.log(`🔧 Basic fix applied to ${signInButtons.length + signUpButtons.length} buttons`);
    }, 1000);
  }

  // Load the script immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadDefinitiveFix);
  } else {
    loadDefinitiveFix();
  }

})();
