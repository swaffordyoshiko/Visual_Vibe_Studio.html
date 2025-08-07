// QUICK REMOVE SYNC BUTTONS - Run this in console or load as script
console.log('🚀 QUICK SYNC BUTTON REMOVAL');

// Immediate removal function
(function removeSyncButtonsNow() {
  console.log('🗑️ Removing all sync buttons immediately...');
  
  // Remove sync status indicator
  document.querySelectorAll('.sync-status-indicator').forEach(el => {
    el.remove();
    console.log('✅ Removed sync status indicator');
  });
  
  // Remove sync help button
  document.querySelectorAll('.cross-device-help-btn').forEach(el => {
    el.remove();
    console.log('✅ Removed sync help button');
  });
  
  // Remove any button containing "Sync Help"
  document.querySelectorAll('button').forEach(button => {
    if (button.textContent.includes('Sync Help') || 
        button.innerHTML.includes('❓ Sync Help') ||
        button.innerHTML.includes('Synced')) {
      button.remove();
      console.log('✅ Removed sync button:', button.textContent || button.innerHTML);
    }
  });
  
  // Remove all sync-related elements
  document.querySelectorAll('[class*="sync"]').forEach(el => {
    if (el.className.includes('sync-status') || 
        el.className.includes('sync-indicator') ||
        el.className.includes('cross-device')) {
      el.remove();
      console.log('✅ Removed sync element');
    }
  });
  
  // Block future creation
  if (window.SyncStatusUI) {
    window.SyncStatusUI = function() { return { init: () => {} }; };
    console.log('🚫 Blocked SyncStatusUI');
  }
  
  console.log('✅ All sync buttons removed!');
})();

// Also prevent them from being recreated
setInterval(() => {
  const syncButtons = document.querySelectorAll('.sync-status-indicator, .cross-device-help-btn');
  if (syncButtons.length > 0) {
    syncButtons.forEach(btn => btn.remove());
    console.log('🗑️ Removed recreated sync buttons');
  }
}, 1000);
