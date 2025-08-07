// Remove sync buttons and test notifications
console.log('🧹 Removing sync buttons and test notifications...');

// Function to remove sync status indicator (green "synced" button at top right)
function removeSyncStatusIndicator() {
  const indicators = document.querySelectorAll('.sync-status-indicator');
  indicators.forEach(indicator => {
    if (indicator) {
      indicator.remove();
      console.log('✅ Removed sync status indicator');
    }
  });
}

// Function to remove help button (blue "sync help" button at bottom left)
function removeHelpButton() {
  const helpButtons = document.querySelectorAll('.cross-device-help-btn');
  helpButtons.forEach(button => {
    if (button) {
      button.remove();
      console.log('✅ Removed help button');
    }
  });
  
  // Also remove any button containing "help" text
  const allButtons = document.querySelectorAll('button');
  allButtons.forEach(button => {
    if (button.textContent && 
        (button.textContent.toLowerCase().includes('sync help') || 
         button.textContent.includes('❓'))) {
      button.remove();
      console.log('✅ Removed sync help button');
    }
  });
}

// Function to remove cross-device welcome messages
function removeCrossDeviceWelcome() {
  const welcomes = document.querySelectorAll('.cross-device-welcome');
  welcomes.forEach(welcome => {
    if (welcome) {
      welcome.remove();
      console.log('✅ Removed cross-device welcome message');
    }
  });
}

// Function to remove test notifications
function removeTestNotifications() {
  // Remove by common test notification classes
  const testSelectors = [
    '.toast-container',
    '.notification-test',
    '.test-notification',
    '[class*="test-"]',
    '[class*="notification"]',
    '.fixed.top-4.right-4',
    '.fixed.top-0.right-0',
    '.fixed.bottom-4.right-4'
  ];
  
  testSelectors.forEach(selector => {
    try {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        // Only remove if it looks like a test notification
        if (element.textContent && 
            (element.textContent.includes('Test') || 
             element.textContent.includes('DEBUG') ||
             element.textContent.includes('🧪') ||
             element.textContent.includes('notification'))) {
          element.remove();
          console.log(`✅ Removed test notification: ${selector}`);
        }
      });
    } catch (e) {
      // Ignore selector errors
    }
  });
}

// Function to disable cross-device sync UI creation
function disableSyncUI() {
  // Override the SyncStatusUI class to do nothing
  if (window.SyncStatusUI) {
    window.SyncStatusUI = function() {
      console.log('🚫 SyncStatusUI disabled');
      return {
        init: () => {},
        createSyncIndicator: () => {},
        updateSyncStatus: () => {},
        hide: () => {},
        show: () => {}
      };
    };
  }
  
  // Disable sync UI creation
  window.syncStatusUI = null;
  
  // Disable global sync functions
  window.updateSyncStatusUI = function() {
    console.log('🚫 Sync status UI updates disabled');
  };
}

// Function to remove auth form enhancements
function removeAuthFormEnhancements() {
  const authForms = document.querySelectorAll('.auth-form');
  authForms.forEach(form => {
    form.classList.remove('auth-form');
  });
  console.log('✅ Removed auth form sync enhancements');
}

// Function to clean up any remaining sync-related elements
function cleanupSyncElements() {
  // Remove elements with sync-related text content
  const allElements = document.querySelectorAll('*');
  allElements.forEach(element => {
    if (element.textContent && 
        (element.textContent.includes('Synced') ||
         element.textContent.includes('Syncing') ||
         element.textContent.includes('🔄') ||
         element.textContent.includes('✅')) &&
        element.textContent.length < 50) { // Avoid removing large content blocks
      
      // Check if it's a small UI element (likely a button or indicator)
      const rect = element.getBoundingClientRect();
      if (rect.width < 200 && rect.height < 100) {
        element.remove();
        console.log('✅ Removed sync element:', element.textContent.trim());
      }
    }
  });
}

// Main cleanup function
function cleanupAll() {
  console.log('🧹 Starting complete cleanup...');
  
  removeSyncStatusIndicator();
  removeHelpButton();
  removeCrossDeviceWelcome();
  removeTestNotifications();
  disableSyncUI();
  removeAuthFormEnhancements();
  cleanupSyncElements();
  
  console.log('✅ Cleanup complete!');
}

// Run cleanup immediately
cleanupAll();

// Run cleanup again after a short delay to catch dynamically created elements
setTimeout(cleanupAll, 1000);
setTimeout(cleanupAll, 3000);

// Run cleanup when DOM changes (for dynamically created elements)
const observer = new MutationObserver((mutations) => {
  let shouldCleanup = false;
  
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) { // Element node
        if (node.className && 
            (node.className.includes('sync-status-indicator') ||
             node.className.includes('cross-device-help-btn') ||
             node.className.includes('cross-device-welcome') ||
             node.className.includes('toast') ||
             node.className.includes('notification'))) {
          shouldCleanup = true;
        }
      }
    });
  });
  
  if (shouldCleanup) {
    setTimeout(cleanupAll, 100);
  }
});

// Start observing
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Make cleanup function globally available
window.removeSyncAndTests = cleanupAll;

console.log('✅ Sync and test removal script loaded');
console.log('💡 Run removeSyncAndTests() to manually trigger cleanup');
