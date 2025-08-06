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
        
        // Show email options modal directly for better user experience
        console.log('📧 Showing email options modal for user choice...');

        // Direct show modal instead of trying direct email first
        showSimpleEmailOptions(email, subject, body);
        
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

    // Prepare email links
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const outlookLink = `https://outlook.live.com/mail/0/deeplink/compose?to=${emailAddress}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    modal.innerHTML = `
      <div class="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-gray-800">Choose Email Option</h3>
          <button id="closeEmailModal" class="text-gray-500 hover:text-gray-700">
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

          <button id="openDefaultEmail" class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
            <span>📧</span>
            <span>Open Default Email App</span>
          </button>

          <button id="openGmail" class="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2">
            <span>📧</span>
            <span>Open Gmail</span>
          </button>

          <button id="openOutlook" class="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
            <span>📧</span>
            <span>Open Outlook</span>
          </button>

          <button id="copyEmailAddress" class="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2">
            <span>📋</span>
            <span>Copy Email Address</span>
          </button>

          <button id="cancelEmailModal" class="w-full bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Add event listeners for all buttons
    setupModalEventListeners(modal, emailAddress, gmailLink, outlookLink, mailtoLink);

    console.log('✅ Email options modal shown with working buttons');
  }

  function setupModalEventListeners(modal, emailAddress, gmailLink, outlookLink, mailtoLink) {
    console.log('🔧 Setting up modal event listeners...');

    // Close button
    const closeBtn = modal.querySelector('#closeEmailModal');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        console.log('📧 Close button clicked');
        modal.remove();
      });
    }

    // Default email app button
    const defaultEmailBtn = modal.querySelector('#openDefaultEmail');
    if (defaultEmailBtn) {
      defaultEmailBtn.addEventListener('click', function() {
        console.log('📧 Default email button clicked:', mailtoLink);

        // Try multiple methods for maximum compatibility
        let emailOpened = false;

        try {
          // Method 1: Try creating a temporary link and clicking it
          const tempLink = document.createElement('a');
          tempLink.href = mailtoLink;
          tempLink.style.display = 'none';
          document.body.appendChild(tempLink);
          tempLink.click();
          document.body.removeChild(tempLink);
          emailOpened = true;
          console.log('✅ Email opened via temporary link method');
        } catch (error) {
          console.log('⚠️ Temporary link method failed:', error);
        }

        if (!emailOpened) {
          try {
            // Method 2: Try window.open with _top target
            window.open(mailtoLink, '_top');
            emailOpened = true;
            console.log('✅ Email opened via window.open method');
          } catch (error) {
            console.log('⚠️ Window.open method failed:', error);
          }
        }

        if (!emailOpened) {
          try {
            // Method 3: Direct location change
            window.location.href = mailtoLink;
            emailOpened = true;
            console.log('✅ Email opened via location.href method');
          } catch (error) {
            console.log('⚠️ Location.href method failed:', error);
          }
        }

        if (!emailOpened) {
          try {
            // Method 4: Try location.assign
            window.location.assign(mailtoLink);
            emailOpened = true;
            console.log('✅ Email opened via location.assign method');
          } catch (error) {
            console.log('⚠️ Location.assign method failed:', error);
          }
        }

        if (emailOpened) {
          if (window.toastManager) {
            window.toastManager.success('Opening your default email app...', { duration: 3000 });
          } else {
            console.log('✅ Default email app should be opening...');
          }
        } else {
          console.error('❌ All methods failed to open default email app');

          // Final fallback: Show manual instructions
          if (window.toastManager) {
            window.toastManager.error('Unable to open email app automatically. Please copy the email address and compose manually.', { duration: 5000 });
          } else {
            alert('Unable to open email app automatically. Email: support@visualvibestudio.store');
          }
        }

        modal.remove();
      });
    }

    // Gmail button
    const gmailBtn = modal.querySelector('#openGmail');
    if (gmailBtn) {
      gmailBtn.addEventListener('click', function() {
        console.log('📧 Gmail button clicked:', gmailLink);
        try {
          window.open(gmailLink, '_blank');
          if (window.toastManager) {
            window.toastManager.success('Opening Gmail...', { duration: 3000 });
          }
        } catch (error) {
          console.error('❌ Error opening Gmail:', error);
        }
        modal.remove();
      });
    }

    // Outlook button
    const outlookBtn = modal.querySelector('#openOutlook');
    if (outlookBtn) {
      outlookBtn.addEventListener('click', function() {
        console.log('📧 Outlook button clicked:', outlookLink);
        try {
          window.open(outlookLink, '_blank');
          if (window.toastManager) {
            window.toastManager.success('Opening Outlook...', { duration: 3000 });
          }
        } catch (error) {
          console.error('❌ Error opening Outlook:', error);
        }
        modal.remove();
      });
    }

    // Copy email button
    const copyBtn = modal.querySelector('#copyEmailAddress');
    if (copyBtn) {
      copyBtn.addEventListener('click', function() {
        console.log('📧 Copy email button clicked');
        try {
          navigator.clipboard.writeText(emailAddress).then(() => {
            console.log('✅ Email address copied to clipboard');
            if (window.toastManager) {
              window.toastManager.success('Email address copied to clipboard!', { duration: 3000 });
            } else {
              alert('Email address copied to clipboard!');
            }
          }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = emailAddress;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);

            if (window.toastManager) {
              window.toastManager.success('Email address copied!', { duration: 3000 });
            } else {
              alert('Email address copied!');
            }
          });
        } catch (error) {
          console.error('❌ Error copying email:', error);
        }
        modal.remove();
      });
    }

    // Cancel button
    const cancelBtn = modal.querySelector('#cancelEmailModal');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', function() {
        console.log('📧 Cancel button clicked');
        modal.remove();
      });
    }

    // Close on outside click
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        console.log('📧 Clicked outside modal, closing');
        modal.remove();
      }
    });

    console.log('✅ All modal event listeners set up');
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

    // Test showing the email modal
    console.log('🧪 Testing email modal display...');
    showSimpleEmailOptions('support@visualvibestudio.store', 'Test Subject', 'Test body message');
  };

  // Quick test function for modal
  window.testEmailModal = function() {
    console.log('🧪 Testing email modal...');
    showSimpleEmailOptions('support@visualvibestudio.store', 'Test Email Modal', 'This is a test of the email modal functionality.');
  };

  // Test function specifically for default email app
  window.testDefaultEmailApp = function() {
    console.log('🧪 Testing default email app functionality...');

    const email = 'support@visualvibestudio.store';
    const subject = 'Test from Visual Vibe Studio';
    const body = 'This is a test email to verify the default email app functionality.';

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    console.log('📧 Testing mailto link:', mailtoLink);

    // Test all methods
    let methodsToTry = [
      {
        name: 'Temporary Link Method',
        func: () => {
          const tempLink = document.createElement('a');
          tempLink.href = mailtoLink;
          tempLink.style.display = 'none';
          document.body.appendChild(tempLink);
          tempLink.click();
          document.body.removeChild(tempLink);
        }
      },
      {
        name: 'Window Open Method',
        func: () => window.open(mailtoLink, '_top')
      },
      {
        name: 'Location Href Method',
        func: () => window.location.href = mailtoLink
      },
      {
        name: 'Location Assign Method',
        func: () => window.location.assign(mailtoLink)
      }
    ];

    // Just test the first method for now to avoid opening multiple email clients
    try {
      console.log('🧪 Trying temporary link method...');
      methodsToTry[0].func();
      console.log('✅ Test completed - check if email client opened');
    } catch (error) {
      console.error('❌ Test failed:', error);
    }
  };
  
  // Create immediate backup email function available globally
  window.immediateEmailFallback = function(emailAddress) {
    const email = emailAddress || 'support@visualvibestudio.store';
    const subject = 'Inquiry from Visual Vibe Studio Website';
    const body = `Hi Yoshiko,

I'm interested in your design services. Please get back to me when you have a chance.

Thanks!`;

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    console.log('🔧 Using immediate email fallback:', mailtoLink);

    // Try the most reliable method first
    try {
      const tempLink = document.createElement('a');
      tempLink.href = mailtoLink;
      tempLink.target = '_top';
      tempLink.style.display = 'none';
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      return true;
    } catch (error) {
      console.error('❌ Immediate email fallback failed:', error);
      return false;
    }
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
