// CONSOLE FIX - Copy and paste this entire code block into the browser console
// This will fix the handleEmailClick error immediately

console.log('🚨 APPLYING IMMEDIATE CONSOLE FIX...');

// 1. Define the missing function immediately
window.handleEmailClick = function(event, emailAddress) {
  console.log('📧 handleEmailClick executed via console fix');
  if (event && event.preventDefault) event.preventDefault();
  const email = emailAddress || 'support@visualvibestudio.store';
  window.location.href = 'mailto:' + email;
};

// 2. Find and fix the problematic button right now
const button = document.getElementById('mainSendEmailBtn');
if (button) {
  console.log('🎯 Found problematic button - fixing now...');
  
  // Remove the bad onclick
  button.removeAttribute('onclick');
  button.onclick = null;
  
  // Add safe click handler
  button.addEventListener('click', function(event) {
    console.log('📧 Safe email button clicked');
    event.preventDefault();
    window.location.href = 'mailto:support@visualvibestudio.store';
  });
  
  console.log('✅ Button fixed successfully');
} else {
  console.log('⚠️ Button not found yet');
}

// 3. Fix all email buttons with handleEmailClick
document.querySelectorAll('[onclick*="handleEmailClick"]').forEach((element, index) => {
  console.log(`🔧 Fixing email element ${index + 1}`);
  
  const onclickAttr = element.getAttribute('onclick');
  const emailMatch = onclickAttr.match(/['"]([^'"]*@[^'"]*)['"]/) || ['', 'support@visualvibestudio.store'];
  const email = emailMatch[1];
  
  element.removeAttribute('onclick');
  element.onclick = null;
  
  element.addEventListener('click', function(event) {
    console.log('📧 Fixed email element clicked:', email);
    event.preventDefault();
    window.location.href = 'mailto:' + email;
  });
  
  console.log(`✅ Fixed element ${index + 1} for email: ${email}`);
});

console.log('✅ CONSOLE FIX COMPLETE - Error should be resolved');

// Test the fix
if (typeof window.handleEmailClick === 'function') {
  console.log('✅ handleEmailClick function is now available');
} else {
  console.error('❌ Fix failed - function still not available');
}
