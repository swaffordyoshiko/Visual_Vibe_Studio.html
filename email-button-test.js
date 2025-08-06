// Simple Email Button Test - Quick verification script
console.log('🧪 Loading email button test script...');

// Override email buttons on page load for immediate testing
function testEmailButtonsImmediately() {
  console.log('🧪 Running immediate email button test...');
  
  // Find main email button
  const mainEmailBtn = document.getElementById('mainSendEmailBtn');
  if (mainEmailBtn) {
    console.log('✅ Found main email button');
    
    // Add a test click handler
    mainEmailBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('🧪 Test: Main email button clicked');
      
      // Try direct mailto
      const email = 'support@visualvibestudio.store';
      const subject = 'Test Email from Visual Vibe Studio';
      const body = 'This is a test email to verify functionality.';
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      console.log('📧 Test mailto link:', mailtoLink);
      
      // Try the most reliable method
      try {
        const link = document.createElement('a');
        link.href = mailtoLink;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('✅ Test: Email client should open');
        
        if (window.toastManager) {
          window.toastManager.success('Test: Opening email client...', { duration: 3000 });
        }
      } catch (error) {
        console.error('❌ Test failed:', error);
      }
    });
  } else {
    console.log('❌ Main email button not found');
  }
  
  // Find email links
  const emailLinks = document.querySelectorAll('a[href*="mailto:support@visualvibestudio.store"]');
  console.log(`Found ${emailLinks.length} email links`);
  
  emailLinks.forEach((link, index) => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      console.log(`🧪 Test: Email link ${index + 1} clicked`);
      
      // Direct mailto
      const href = link.getAttribute('href');
      console.log('📧 Original href:', href);
      
      try {
        window.location.href = href;
        console.log('✅ Test: Email client should open via location.href');
      } catch (error) {
        console.error('❌ Test failed:', error);
      }
    });
  });
}

// Test function to manually trigger
window.manualEmailTest = function() {
  console.log('🧪 Manual email test triggered');
  
  const email = 'support@visualvibestudio.store';
  const subject = 'Manual Test Email';
  const body = 'This is a manual test of the email functionality.';
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  console.log('📧 Manual test mailto:', mailtoLink);
  
  // Create and click link
  const testLink = document.createElement('a');
  testLink.href = mailtoLink;
  testLink.style.display = 'none';
  document.body.appendChild(testLink);
  testLink.click();
  document.body.removeChild(testLink);
  
  console.log('✅ Manual test completed');
};

// Initialize after a delay
setTimeout(testEmailButtonsImmediately, 2000);

console.log('🧪 Email button test script loaded - use manualEmailTest() to test manually');
