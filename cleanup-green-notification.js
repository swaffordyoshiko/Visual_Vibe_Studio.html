// Remove any lingering green test/backup notifications
console.log('🧹 Starting green notification cleanup...');

function removeGreenNotifications() {
  let removedCount = 0;
  
  // Check all div elements for green background and test/backup content
  document.querySelectorAll('div').forEach(div => {
    const style = window.getComputedStyle(div);
    const bgColor = style.backgroundColor;
    const content = (div.textContent || div.innerHTML || '').toLowerCase();
    
    // Check for green background colors
    const isGreen = bgColor.includes('rgb(0, 255, 0)') || 
                    bgColor.includes('#00ff00') || 
                    bgColor.includes('#0f0') ||
                    bgColor === 'green';
    
    // Check for test/backup content
    const isTestContent = content.includes('backup test') || 
                         content.includes('test') || 
                         content.includes('backup') || 
                         content.includes('loading') ||
                         content.includes('notification system');
    
    if (isGreen && isTestContent) {
      console.log('🗑️ Removing green test notification:', content.substring(0, 50));
      div.remove();
      removedCount++;
    }
  });
  
  // Also check elements with fixed positioning that might be notifications
  document.querySelectorAll('[style*="position: fixed"], [style*="position:fixed"]').forEach(el => {
    const style = window.getComputedStyle(el);
    const content = (el.textContent || el.innerHTML || '').toLowerCase();
    
    const isGreen = style.backgroundColor.includes('rgb(0, 255, 0)') || 
                    style.backgroundColor.includes('#00ff00');
    const isTestContent = content.includes('backup') || content.includes('test');
    
    if (isGreen && isTestContent) {
      console.log('🗑️ Removing fixed green notification:', content.substring(0, 50));
      el.remove();
      removedCount++;
    }
  });
  
  if (removedCount > 0) {
    console.log(`✅ Removed ${removedCount} green test notification(s)`);
  }
  
  return removedCount;
}

// Run cleanup immediately
removeGreenNotifications();

// Run cleanup repeatedly to catch delayed notifications
setTimeout(removeGreenNotifications, 100);
setTimeout(removeGreenNotifications, 500);
setTimeout(removeGreenNotifications, 1000);
setTimeout(removeGreenNotifications, 2000);
setTimeout(removeGreenNotifications, 3000);

// Set up a periodic cleanup every 5 seconds for 30 seconds
let cleanupAttempts = 0;
const periodicCleanup = setInterval(() => {
  removeGreenNotifications();
  cleanupAttempts++;
  if (cleanupAttempts >= 6) { // 30 seconds total
    clearInterval(periodicCleanup);
    console.log('🏁 Green notification cleanup completed');
  }
}, 5000);

console.log('✅ Green notification cleanup script loaded');
