// DISABLE ALL CONFLICTING AUTHENTICATION SYSTEMS
(function() {
    'use strict';
    
    console.log('🚫 DISABLING ALL AUTH CONFLICTS...');
    
    // List of conflicting scripts/functions to disable
    const conflictingFunctions = [
        'handleSignUp_DISABLED_BY_SIMPLE_OVERRIDE',
        'handleSignUp_EMERGENCY_DISABLED', 
        'handleSignUp_DISABLED_FROM_FINAL_CHECK',
        'handleSignUp_AUTH_SYSTEM_DISABLED',
        'handleSignUp_CROSS_DEVICE_DISABLED',
        'originalHandleSignUp',
        'originalHandleSignIn'
    ];
    
    // Disable conflicting functions
    conflictingFunctions.forEach(funcName => {
        if (window[funcName]) {
            window[funcName] = null;
            delete window[funcName];
        }
    });
    
    // Disable problematic objects
    if (window.CrossDeviceAuth) {
        window.CrossDeviceAuth = null;
        delete window.CrossDeviceAuth;
    }
    
    // Block certain scripts from running
    const originalSetTimeout = window.setTimeout;
    const originalSetInterval = window.setInterval;
    
    window.setTimeout = function(callback, delay, ...args) {
        if (typeof callback === 'function') {
            const callbackStr = callback.toString();
            
            // Block callbacks that try to override auth functions
            if (callbackStr.includes('handleSignUp') && 
                (callbackStr.includes('override') || 
                 callbackStr.includes('conflict') || 
                 callbackStr.includes('delete window.handleSignUp'))) {
                console.log('🚫 BLOCKED: Auth override setTimeout prevented');
                return;
            }
        }
        return originalSetTimeout.call(this, callback, delay, ...args);
    };
    
    window.setInterval = function(callback, delay, ...args) {
        if (typeof callback === 'function') {
            const callbackStr = callback.toString();
            
            // Block intervals that try to override auth functions
            if (callbackStr.includes('handleSignUp') && 
                (callbackStr.includes('override') || 
                 callbackStr.includes('conflict'))) {
                console.log('🚫 BLOCKED: Auth override setInterval prevented');
                return;
            }
        }
        return originalSetInterval.call(this, callback, delay, ...args);
    };
    
    // Monitor for auth function overwrites and prevent them
    let protectedFunctions = {};
    
    function protectAuthFunctions() {
        // Only protect after bulletproof auth is loaded
        if (window.BulletproofAuth) {
            const functionsToProtect = ['handleSignIn', 'handleSignUp', 'signOut', 'updateAuthUI'];
            
            functionsToProtect.forEach(funcName => {
                if (window[funcName] && !protectedFunctions[funcName]) {
                    protectedFunctions[funcName] = window[funcName];
                    
                    // Use a getter/setter to prevent overwrites
                    Object.defineProperty(window, funcName, {
                        get: function() {
                            return protectedFunctions[funcName];
                        },
                        set: function(value) {
                            // Only allow bulletproof auth to set these
                            if (window.BulletproofAuth) {
                                console.log(`✅ ${funcName} updated by bulletproof auth`);
                                protectedFunctions[funcName] = value;
                            } else {
                                console.log(`🚫 BLOCKED: Attempted override of ${funcName}`);
                            }
                        },
                        configurable: false,
                        enumerable: true
                    });
                }
            });
        }
    }
    
    // Protect functions after bulletproof auth loads
    setTimeout(protectAuthFunctions, 1000);
    setTimeout(protectAuthFunctions, 3000);
    setTimeout(protectAuthFunctions, 5000);
    
    console.log('✅ AUTH CONFLICTS DISABLED');
})();
