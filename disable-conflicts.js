// DISABLE CONFLICTING SCRIPTS IMMEDIATELY
console.log('🛑 Disabling conflicting scripts...');

// Disable previous script flags
window.profileModalExistenceFix = false;
window.ordersModalReopenFix = false; 
window.profilePictureUploaderFix = false;
window.profileComprehensiveFix = false;
window.simpleOrderFix = false;

// Override any problematic functions immediately
const oldSetTimeout = window.setTimeout;
const oldSetInterval = window.setInterval;

// Prevent auto-opening
window.setTimeout = function(callback, delay, ...args) {
  if (typeof callback === 'function') {
    const callbackStr = callback.toString();
    if (callbackStr.includes('openProfileModal') || 
        callbackStr.includes('openPictureUpload') ||
        callbackStr.includes('showOrderHistory')) {
      console.log('🚫 BLOCKED: Auto-opening function prevented');
      return;
    }
  }
  return oldSetTimeout.call(this, callback, delay, ...args);
};

window.setInterval = function(callback, delay, ...args) {
  if (typeof callback === 'function') {
    const callbackStr = callback.toString();
    if (callbackStr.includes('openProfileModal') || 
        callbackStr.includes('openPictureUpload') ||
        callbackStr.includes('showOrderHistory')) {
      console.log('🚫 BLOCKED: Auto-opening function prevented');
      return;
    }
  }
  return oldSetInterval.call(this, callback, delay, ...args);
};

console.log('✅ Conflicts disabled');
