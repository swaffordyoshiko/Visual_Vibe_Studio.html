// Remove Sync Help and Synced Buttons
console.log('🗑️ Removing sync help and synced buttons...');

(function() {
  'use strict';
  
  function removeSyncButtons() {
    console.log('🔍 Looking for sync buttons to remove...');
    
    // Remove sync status indicator (the "Synced" button/indicator)
    const syncIndicator = document.querySelector('.sync-status-indicator');
    if (syncIndicator) {
      syncIndicator.remove();
      console.log('✅ Removed sync status indicator');
    }
    
    // Remove sync help button
    const syncHelpButton = document.querySelector('.cross-device-help-btn');
    if (syncHelpButton) {
      syncHelpButton.remove();
      console.log('✅ Removed sync help button');
    }
    
    // Also remove any buttons that contain sync help text
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      if (button.textContent.includes('Sync Help') || 
          button.textContent.includes('❓ Sync Help') ||
          button.innerHTML.includes('❓ Sync Help')) {
        button.remove();
        console.log('✅ Removed sync help button by text content');
      }
    });
    
    // Remove any divs or elements with sync status classes
    const syncElements = document.querySelectorAll('[class*="sync-status"], [class*="sync-indicator"]');
    syncElements.forEach(element => {
      element.remove();
      console.log('✅ Removed sync status element');
    });
    
    // Prevent future sync UI creation by overriding the classes
    if (window.SyncStatusUI) {
      window.SyncStatusUI = function() {
        console.log('🚫 Sync status UI creation blocked');
        return {
          init: () => {},
          createSyncIndicator: () => {},
          setupEventListeners: () => {},
          startStatusUpdates: () => {},
          enhanceAuthForms: () => {},
          show: () => {},
          hide: () => {},
          updateStatus: () => {}
        };
      };
    }
    
    // Block sync help button creation
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName) {
      const element = originalCreateElement.call(document, tagName);
      
      // If it's a button and gets sync help content, prevent it
      if (tagName.toLowerCase() === 'button') {
        const originalSetInnerHTML = element.innerHTML;
        Object.defineProperty(element, 'innerHTML', {
          set: function(value) {
            if (typeof value === 'string' && 
                (value.includes('❓ Sync Help') || value.includes('Sync Help'))) {
              console.log('🚫 Blocked sync help button creation');
              return; // Don't set the content
            }
            originalSetInnerHTML = value;
            this.innerHTML = value;
          },
          get: function() {
            return originalSetInnerHTML;
          }
        });
      }
      
      return element;
    };
    
    console.log('✅ Sync buttons removal complete');
  }
  
  // Run immediately
  removeSyncButtons();
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeSyncButtons);
  }
  
  // Run periodically to catch any dynamically created sync buttons
  setInterval(removeSyncButtons, 2000);
  
  // Also run when new content is added
  const observer = new MutationObserver(function(mutations) {
    let shouldCheck = false;
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) { // Element node
            if (node.classList.contains('sync-status-indicator') ||
                node.classList.contains('cross-device-help-btn') ||
                (node.tagName === 'BUTTON' && 
                 (node.textContent.includes('Sync Help') || node.innerHTML.includes('❓ Sync Help')))) {
              shouldCheck = true;
            }
          }
        });
      }
    });
    
    if (shouldCheck) {
      console.log('🔍 New sync button detected, removing...');
      setTimeout(removeSyncButtons, 100);
    }
  });
  
  // Start observing
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
})();

console.log('🗑️ Sync buttons removal script loaded and active');
