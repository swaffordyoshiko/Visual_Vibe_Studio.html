// Inline handleEmailClick fix - to be loaded immediately
// This script should be loaded as early as possible in the page

// Create the handleEmailClick function immediately - no waiting
window.handleEmailClick = window.handleEmailClick || function(event, emailAddress) {
  console.log('📧 handleEmailClick called for:', emailAddress);
  
  // Prevent default behavior
  if (event && typeof event.preventDefault === 'function') {
    event.preventDefault();
  }
  
  // Simple mailto action
  const email = emailAddress || 'support@visualvibestudio.store';
  
  try {
    // Direct mailto open
    window.location.href = 'mailto:' + email;
    console.log('✅ Opened mailto for:', email);
  } catch (error) {
    // Fallback to alert
    console.error('❌ Mailto failed:', error);
    alert('Please email us at: ' + email);
  }
};

// Also create backup function
window.emailSupport = window.emailSupport || function() {
  window.location.href = 'mailto:support@visualvibestudio.store';
};

// Log that function is ready
console.log('✅ handleEmailClick function ready');
console.log('  Type:', typeof window.handleEmailClick);

// Export to global scope (in case of strict mode issues)
try {
  if (typeof handleEmailClick === 'undefined') {
    window.handleEmailClick = window.handleEmailClick;
  }
} catch (e) {
  // Ignore errors in strict mode
}

// Immediate test
try {
  if (typeof window.handleEmailClick === 'function') {
    console.log('✅ handleEmailClick function is available and ready');
  } else {
    console.error('❌ handleEmailClick function failed to create');
  }
} catch (error) {
  console.error('❌ Error testing handleEmailClick:', error);
}
