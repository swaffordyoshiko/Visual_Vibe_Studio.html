// Fix Email Buttons - Ensure reliable email functionality
console.log('📧 Loading email buttons fix...');

(function() {
  'use strict';
  
  function initializeEmailButtonFix() {
    console.log('🔧 Initializing email button fixes...');
    
    // Override handleEmailClick with a more reliable version
    setupReliableEmailHandling();
    
    // Fix any existing broken email buttons
    fixExistingEmailButtons();
    
    console.log('✅ Email button fixes initialized');
  }
  
  function setupReliableEmailHandling() {
    console.log('📧 Setting up reliable email handling...');
    
    // Override the handleEmailClick function with a more robust version
    window.handleEmailClick = function(event, emailAddress) {
      console.log('📧 Email button clicked:', emailAddress);
      
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      try {
        const email = emailAddress || 'support@visualvibestudio.store';
        
        // Check if this is the main "Send Email" button
        const isMainButton = event.target && (
          event.target.id === 'mainSendEmailBtn' || 
          event.target.closest('#mainSendEmailBtn') ||
          event.target.textContent.includes('Send Email')
        );
        
        console.log('📧 Is main button:', isMainButton);
        
        // Create pre-filled email content for main button
        const subject = isMainButton ? 'Inquiry from Visual Vibe Studio Website' : 'Contact from Visual Vibe Studio';
        const body = isMainButton ? 
          `Hi Yoshiko,

I'm interested in your design services. Please get back to me when you have a chance.

Thanks!` : 
          `Hi,

I'd like to get in touch regarding your services.

Thank you!`;
        
        // Try to open email client directly first
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        console.log('📧 Opening email client with:', mailtoLink);
        
        // Use window.open for better compatibility
        const emailWindow = window.open(mailtoLink, '_self');
        
        // Fallback: show email options modal if direct email doesn't work
        setTimeout(() => {
          showSimpleEmailOptions(email, subject, body);
        }, 1000);
        
        // Show success message
        if (window.toastManager) {
          window.toastManager.success('Opening your email client...', { duration: 3000 });
        }
        
        return true;
        
      } catch (error) {
        console.error('❌ Error handling email click:', error);
        
        // Fallback: basic mailto
        window.location.href = `mailto:${emailAddress || 'support@visualvibestudio.store'}`;
        
        return false;
      }
    };
    
    // Also create a simple direct email function
    window.openEmailClient = function(emailAddress, subject = '', body = '') {
      const email = emailAddress || 'support@visualvibestudio.store';
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      console.log('📧 Direct email link:', mailtoLink);
      window.open(mailtoLink, '_self');
    };
  }
  
  function showSimpleEmailOptions(emailAddress, subject, body) {
    console.log('📧 Showing simple email options...');
    
    // Remove any existing modal
    const existingModal = document.getElementById('emailOptionsModal');
    if (existingModal) {
      existingModal.remove();
    }
    
    // Create simple options modal
    const modal = document.createElement('div');
    modal.id = 'emailOptionsModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4';
    
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const outlookLink = `https://outlook.live.com/mail/0/deeplink/compose?to=${emailAddress}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    modal.innerHTML = `
      <div class="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-gray-800">Choose Email Option</h3>
          <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="space-y-3">
          <div class="bg-gray-50 rounded-lg p-3 text-sm">
            <strong>To:</strong> ${emailAddress}<br>
            <strong>Subject:</strong> ${subject}
          </div>
          
          <button onclick="window.open('${mailtoLink}', '_self')" class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
            <span>📧</span>
            <span>Open Default Email App</span>
          </button>
          
          <button onclick="window.open('${gmailLink}', '_blank')" class="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2">
            <span>📧</span>
            <span>Open Gmail</span>
          </button>
          
          <button onclick="window.open('${outlookLink}', '_blank')" class="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
            <span>📧</span>
            <span>Open Outlook</span>
          </button>
          
          <button onclick="navigator.clipboard.writeText('${emailAddress}').then(() => { if(window.toastManager) window.toastManager.success('Email copied!'); }); this.closest('.fixed').remove();" class="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2">
            <span>📋</span>
            <span>Copy Email Address</span>
          </button>
          
          <button onclick="this.closest('.fixed').remove()" class="w-full bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.remove();
      }
    });
    
    console.log('✅ Email options modal shown');
  }
  
  function fixExistingEmailButtons() {
    console.log('🔧 Fixing existing email buttons...');
    
    // Find and fix the main "Send Email" button
    const mainEmailBtn = document.getElementById('mainSendEmailBtn');
    if (mainEmailBtn) {
      // Remove existing onclick and add new one
      mainEmailBtn.onclick = null;
      mainEmailBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.handleEmailClick(e, 'support@visualvibestudio.store');
      });
      console.log('✅ Fixed main Send Email button');
    }
    
    // Find and fix email links in "Get in Touch" section
    const emailLinks = document.querySelectorAll('a[href*="mailto:support@visualvibestudio.store"]');
    emailLinks.forEach((link, index) => {
      link.onclick = null;
      link.addEventListener('click', function(e) {
        e.preventDefault();
        window.handleEmailClick(e, 'support@visualvibestudio.store');
      });
      console.log(`✅ Fixed email link ${index + 1}`);
    });
    
    // Also fix any buttons with email click handlers
    const emailButtons = document.querySelectorAll('button[onclick*="handleEmailClick"]');
    emailButtons.forEach((button, index) => {
      button.onclick = null;
      button.addEventListener('click', function(e) {
        e.preventDefault();
        window.handleEmailClick(e, 'support@visualvibestudio.store');
      });
      console.log(`✅ Fixed email button ${index + 1}`);
    });
  }
  
  // Test function
  window.testEmailButtons = function() {
    console.log('🧪 Testing email buttons...');
    
    const tests = [
      {
        name: 'handleEmailClick function exists',
        test: () => typeof window.handleEmailClick === 'function'
      },
      {
        name: 'openEmailClient function exists',
        test: () => typeof window.openEmailClient === 'function'
      },
      {
        name: 'Main send email button exists',
        test: () => !!document.getElementById('mainSendEmailBtn')
      },
      {
        name: 'Email links exist',
        test: () => document.querySelectorAll('a[href*="mailto:support@visualvibestudio.store"]').length > 0
      }
    ];
    
    console.log('🧪 Running email button tests...');
    
    tests.forEach(test => {
      const passed = test.test();
      console.log(`${passed ? '✅' : '❌'} ${test.name}: ${passed}`);
    });
    
    // Test clicking the main button
    console.log('🧪 Testing main email button click...');
    window.handleEmailClick({ preventDefault: () => {}, target: { id: 'mainSendEmailBtn' } }, 'support@visualvibestudio.store');
  };
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEmailButtonFix);
  } else {
    initializeEmailButtonFix();
  }
  
  // Also initialize with delays
  setTimeout(initializeEmailButtonFix, 1000);
  setTimeout(initializeEmailButtonFix, 3000);
  
})();

console.log('📧 Email buttons fix loaded - Email functionality should now work properly');
