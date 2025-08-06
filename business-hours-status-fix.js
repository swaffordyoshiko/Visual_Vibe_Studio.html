// Business Hours Status Fix
// This script ensures the "Online now" indicator only shows during business hours

(function() {
  'use strict';
  
  function initializeBusinessHoursStatus() {
    // Find the Quick Response section and add IDs to the status elements
    const quickResponseSection = document.querySelector('h4:contains("⚡ Quick Response")');
    if (!quickResponseSection) {
      // Try alternative selector
      const headings = document.querySelectorAll('h4');
      let targetSection = null;
      
      for (let heading of headings) {
        if (heading.textContent && heading.textContent.includes('Quick Response')) {
          targetSection = heading;
          break;
        }
      }
      
      if (targetSection) {
        // Find the status elements within this section
        const container = targetSection.closest('div');
        if (container) {
          const statusIndicator = container.querySelector('.bg-green-400.rounded-full');
          const statusText = container.querySelector('span');
          
          if (statusIndicator && statusText) {
            statusIndicator.id = 'statusIndicator';
            statusText.id = 'statusText';
            console.log('✅ Business hours status elements initialized');
            
            // Force update the status immediately
            if (window.updateOnlineStatus) {
              window.updateOnlineStatus();
            }
          }
        }
      }
    }
  }
  
  // Alternative business hours function that works without specific IDs
  function updateBusinessHoursDisplay() {
    try {
      const now = new Date();
      const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTime = currentHour + (currentMinutes / 60);
      
      // Business hours: Monday-Friday 9AM-6PM
      const isWeekday = currentDay >= 1 && currentDay <= 5;
      const isDuringBusinessHours = currentTime >= 9.0 && currentTime < 18.0;
      const isOnline = isWeekday && isDuringBusinessHours;
      
      // Find status elements by content and class
      const headings = document.querySelectorAll('h4');
      let quickResponseSection = null;
      
      for (let heading of headings) {
        if (heading.textContent && heading.textContent.includes('Quick Response')) {
          quickResponseSection = heading;
          break;
        }
      }
      
      if (quickResponseSection) {
        const container = quickResponseSection.closest('div');
        if (container) {
          const statusIndicator = container.querySelector('.rounded-full') || container.querySelector('#statusIndicator');
          const statusText = container.querySelector('span:not(.italic)') || container.querySelector('#statusText');
          
          if (statusIndicator && statusText) {
            if (isOnline) {
              statusIndicator.className = 'w-2 h-2 bg-green-400 rounded-full animate-pulse';
              statusText.textContent = 'Online now';
              statusText.className = 'text-sm text-indigo-200';
            } else {
              statusIndicator.className = 'w-2 h-2 bg-gray-400 rounded-full';
              statusText.textContent = 'Offline - Business hours: Mon-Fri 9AM-6PM';
              statusText.className = 'text-sm text-indigo-300';
            }
            
            console.log('📅 Business hours status updated:', {
              day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][currentDay],
              time: `${currentHour}:${currentMinutes.toString().padStart(2, '0')}`,
              isOnline: isOnline
            });
          }
        }
      }
    } catch (error) {
      console.error('❌ Error updating business hours status:', error);
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initializeBusinessHoursStatus();
      updateBusinessHoursDisplay();
    });
  } else {
    initializeBusinessHoursStatus();
    updateBusinessHoursDisplay();
  }
  
  // Update every minute
  setInterval(updateBusinessHoursDisplay, 60000);
  
  // Make globally available
  window.updateBusinessHoursDisplay = updateBusinessHoursDisplay;
  
  console.log('🕒 Business hours status system loaded');
})();
