// Emergency script loader for handleEmailClick fix
console.log('🚨 Emergency email loader starting...');

// Load the inline fix immediately
(function() {
  // First, create the function inline right here
  window.handleEmailClick = function(event, emailAddress) {
    console.log('🚨 Emergency handleEmailClick executed');
    
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    
    const email = emailAddress || 'support@visualvibestudio.store';
    window.location.href = 'mailto:' + email;
  };
  
  console.log('✅ Emergency handleEmailClick created inline');
})();

// Try to load the more complete fix
function loadEmailFix() {
  try {
    const script = document.createElement('script');
    script.src = 'inline-email-fix.js';
    script.async = false; // Load synchronously
    script.onload = function() {
      console.log('✅ Inline email fix loaded successfully');
    };
    script.onerror = function() {
      console.warn('⚠️ Could not load inline email fix - using emergency version');
    };
    
    // Insert at the very beginning of head
    const head = document.head || document.getElementsByTagName('head')[0];
    if (head.firstChild) {
      head.insertBefore(script, head.firstChild);
    } else {
      head.appendChild(script);
    }
    
  } catch (error) {
    console.error('❌ Error loading email fix script:', error);
  }
}

// Load immediately
loadEmailFix();

// Also create a manual fix function
window.fixEmailButtonNow = function() {
  console.log('🔧 Manual email button fix...');
  
  // Find the problematic button
  const button = document.getElementById('mainSendEmailBtn');
  if (button) {
    console.log('🎯 Found mainSendEmailBtn - fixing onclick');
    
    // Remove the problematic onclick
    button.removeAttribute('onclick');
    
    // Add safe onclick handler
    button.onclick = function(event) {
      console.log('📧 Safe click handler for email button');
      if (event) event.preventDefault();
      window.location.href = 'mailto:support@visualvibestudio.store';
    };
    
    console.log('✅ Email button fixed manually');
  } else {
    console.warn('⚠️ Email button not found yet');
  }
};

// Try to fix the button as soon as DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', window.fixEmailButtonNow);
} else {
  window.fixEmailButtonNow();
}

// Also try after a short delay
setTimeout(window.fixEmailButtonNow, 100);
setTimeout(window.fixEmailButtonNow, 500);
setTimeout(window.fixEmailButtonNow, 1000);

console.log('🚨 Emergency email loader complete');
