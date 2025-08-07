// Fix Contact Support Button in My Orders
console.log('🔧 Fixing contact support button in My Orders...');

(function() {
  'use strict';
  
  // Override the contactSupport function with a working version
  window.contactSupport = function(orderNumber) {
    console.log(`💬 Contact support clicked for order: ${orderNumber || 'general'}`);
    
    try {
      // Close the order history modal first
      if (window.closeOrderHistory) {
        window.closeOrderHistory();
      } else {
        // Fallback: manually close modal
        const modal = document.getElementById('orderHistoryModal');
        if (modal) {
          modal.classList.add('hidden');
          modal.style.display = 'none';
          document.body.style.overflow = '';
        }
      }
      
      // Wait a moment for modal to close, then scroll to contact
      setTimeout(() => {
        // Try to find the contact section
        const contactSection = document.getElementById('contact') || 
                              document.querySelector('[id*="contact"]') ||
                              document.querySelector('section[id*="contact"]');
        
        if (contactSection) {
          // Scroll to contact section
          contactSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
          
          console.log('✅ Scrolled to contact section');
          
          // Show success message
          if (window.toastManager) {
            window.toastManager.success('Redirected to contact section', { duration: 2000 });
          }
          
          // Optional: highlight contact form if it exists
          setTimeout(() => {
            const contactForm = document.querySelector('#contact form, form[id*="contact"]');
            if (contactForm) {
              contactForm.style.border = '2px solid #3b82f6';
              contactForm.style.borderRadius = '8px';
              setTimeout(() => {
                contactForm.style.border = '';
                contactForm.style.borderRadius = '';
              }, 3000);
            }
          }, 500);
          
        } else {
          console.warn('❌ Contact section not found, trying alternative method');
          
          // Alternative: look for contact link and click it
          const contactLink = document.querySelector('a[href="#contact"]');
          if (contactLink) {
            contactLink.click();
            console.log('✅ Clicked contact link');
          } else {
            // Last resort: scroll to bottom of page where contact usually is
            window.scrollTo({ 
              top: document.body.scrollHeight, 
              behavior: 'smooth' 
            });
            console.log('✅ Scrolled to bottom of page');
          }
          
          if (window.toastManager) {
            window.toastManager.info('Please scroll down to find the contact section', { duration: 3000 });
          } else {
            alert('Please scroll down to find the contact form to get in touch with support.');
          }
        }
      }, 300);
      
    } catch (error) {
      console.error('❌ Error in contactSupport function:', error);
      
      // Fallback: just close modal and alert user
      const modal = document.getElementById('orderHistoryModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
      
      alert('Please scroll down to the contact section to get in touch with support.');
    }
  };
  
  // Also create a general contact support function (without order number)
  window.openContactSupport = function() {
    console.log('💬 Opening contact support (general)');
    window.contactSupport(); // Call with no order number
  };
  
  // Fix any existing contact support buttons in the My Orders modal
  function fixContactSupportButtons() {
    // Wait for modal to be created/opened
    setTimeout(() => {
      const modal = document.getElementById('orderHistoryModal');
      if (modal) {
        // Find all contact support buttons
        const contactButtons = modal.querySelectorAll('button[onclick*="contactSupport"]');
        
        contactButtons.forEach(button => {
          // Get the order number from the onclick attribute
          const onclickAttr = button.getAttribute('onclick');
          const orderMatch = onclickAttr.match(/contactSupport\('([^']+)'\)/);
          const orderNumber = orderMatch ? orderMatch[1] : null;
          
          // Replace the onclick handler
          button.onclick = function(e) {
            e.preventDefault();
            window.contactSupport(orderNumber);
          };
          
          console.log(`✅ Fixed contact support button for order: ${orderNumber || 'general'}`);
        });
      }
    }, 500);
  }
  
  // Monitor for when the My Orders modal is opened
  const originalShowOrderHistory = window.showOrderHistory;
  if (typeof originalShowOrderHistory === 'function') {
    window.showOrderHistory = function() {
      // Call original function
      originalShowOrderHistory();
      
      // Fix contact support buttons after modal loads
      fixContactSupportButtons();
    };
  }
  
  // Also fix buttons when DOM changes (in case modal is dynamically created)
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1 && 
              (node.id === 'orderHistoryModal' || 
               node.querySelector && node.querySelector('#orderHistoryModal'))) {
            fixContactSupportButtons();
          }
        });
      }
    });
  });
  
  // Start observing
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  console.log('✅ Contact support button fix loaded');
  
})();

console.log('🔧 Contact support button fix ready!');
