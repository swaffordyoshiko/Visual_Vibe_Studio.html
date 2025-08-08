// DISABLE CONFLICTING SCRIPTS - PREVENT AUTH SCRIPT CONFLICTS
console.log('🚫 Disabling all conflicting authentication scripts...');

(function() {
  'use strict';

  // Prevent multiple executions
  if (window.conflictingScriptsDisabled) {
    console.log('✅ Conflicting scripts already disabled');
    return;
  }
  window.conflictingScriptsDisabled = true;

  console.log('🧹 Starting script conflict prevention...');

  // STEP 1: DISABLE CONFLICTING SCRIPT FLAGS
  const conflictingFlags = [
    'criticalFunctionsFixLoaded', 'masterFunctionalityFixLoaded', 'workingAuthFixLoaded',
    'definitiveFixInjected', 'comprehensiveAuthSystemLoaded', 'universalWebsiteFixLoaded',
    'profileModalExistenceFix', 'ordersModalReopenFix', 'profilePictureUploaderFix',
    'consolidatedFinalFix', 'ultimateFix', 'finalCheckLoaded', 'authDebugFixLoaded'
  ];

  conflictingFlags.forEach(flag => {
    window[flag] = true; // Set to true to prevent these scripts from running
  });

  console.log(`🚫 Disabled ${conflictingFlags.length} conflicting script flags`);

  // STEP 2: CLEAR EXISTING BROKEN FUNCTIONS
  const functionsToDelete = [
    'openSignInModal', 'openSignUpModal', 'closeSignInModal', 'closeSignUpModal',
    'handleSignIn', 'handleSignUp', 'switchToSignIn', 'switchToSignUp',
    'updateAuthUI', 'updateSignInUI', 'signOut', 'saveUserSession', 'restoreSession',
    'showSignInModal', 'showSignUpModal', 'hideSignInModal', 'hideSignUpModal'
  ];

  let deletedCount = 0;
  functionsToDelete.forEach(funcName => {
    if (window[funcName]) {
      try {
        delete window[funcName];
        deletedCount++;
      } catch(e) {
        // Function may be protected
        try {
          window[funcName] = function() {
            console.log(`🚫 ${funcName} is disabled due to conflicts`);
          };
        } catch(e2) {
          // Can't override
        }
      }
    }
  });

  console.log(`🧹 Cleared ${deletedCount} existing broken functions`);

  // STEP 3: PREVENT SCRIPT INJECTION
  const originalCreateElement = document.createElement;
  document.createElement = function(tagName) {
    const element = originalCreateElement.call(this, tagName);
    
    if (tagName.toLowerCase() === 'script') {
      const originalSetAttribute = element.setAttribute;
      element.setAttribute = function(name, value) {
        if (name === 'src' && typeof value === 'string') {
          // Block problematic scripts
          const blockedScripts = [
            'comprehensive-auth-system.js', 'auth-debug-fix.js', 'universal-website-fix.js',
            'critical-functions-fix.js', 'master-functionality-fix.js', 'definitive-button-fix.js',
            'emergency-signup-fix.js', 'final-check.js', 'working-auth-fix.js'
          ];
          
          if (blockedScripts.some(blocked => value.includes(blocked))) {
            console.log(`🚫 Blocked conflicting script: ${value}`);
            return; // Don't set the src
          }
        }
        originalSetAttribute.call(this, name, value);
      };
    }
    
    return element;
  };

  console.log('🛡️ Script injection protection enabled');

  // STEP 4: DISABLE INTERVALS THAT MIGHT INTERFERE
  const originalSetInterval = window.setInterval;
  window.setInterval = function(callback, delay, ...args) {
    if (typeof callback === 'function') {
      const callbackStr = callback.toString();
      
      // Block intervals that try to fix auth functions
      if (callbackStr.includes('openSignInModal') || 
          callbackStr.includes('openSignUpModal') ||
          callbackStr.includes('updateAuthUI') ||
          callbackStr.includes('fixButtons') ||
          callbackStr.includes('fixAllButtons')) {
        console.log('🚫 Blocked conflicting interval');
        return;
      }
    }
    return originalSetInterval.call(this, callback, delay, ...args);
  };

  console.log('🚫 Interval protection enabled');

  // STEP 5: CLEAR ANY EXISTING TIMERS
  for (let i = 1; i < 1000; i++) {
    try {
      clearTimeout(i);
      clearInterval(i);
    } catch(e) {
      // Timer might not exist
    }
  }

  console.log('🧹 Cleared existing timers');

  // STEP 6: PREVENT PROPERTY OVERRIDES
  const protectedProperties = ['currentUser'];
  protectedProperties.forEach(prop => {
    if (window[prop] !== undefined) {
      try {
        Object.defineProperty(window, prop, {
          writable: true,
          configurable: false
        });
      } catch(e) {
        // Property might already be defined
      }
    }
  });

  console.log('🛡️ Protected critical properties');

  // STEP 7: MONITOR FOR SCRIPT CONFLICTS
  const originalConsoleLog = console.log;
  console.log = function(...args) {
    const message = args.join(' ');
    
    // Detect conflicting script messages
    if (message.includes('Loading') && 
        (message.includes('Auth Fix') || 
         message.includes('Auth System') || 
         message.includes('Functionality Fix'))) {
      console.warn('🚫 CONFLICT DETECTED:', message);
    }
    
    originalConsoleLog.apply(console, args);
  };

  console.log('👁️ Conflict monitoring enabled');

  console.log('✅ CONFLICTING SCRIPTS DISABLED - Clean auth manager can now load safely');

})();
