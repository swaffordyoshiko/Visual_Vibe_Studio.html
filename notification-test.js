// Direct notification test - inject immediately
console.log('🧪 NOTIFICATION TEST STARTING...');

// Test 1: Create a very basic notification immediately
function createTestNotification() {
  console.log('Creating test notification...');
  
  // Remove any existing test notifications
  const existing = document.querySelectorAll('.test-notification');
  existing.forEach(n => n.remove());
  
  // Create a very basic, highly visible notification
  const notification = document.createElement('div');
  notification.className = 'test-notification';
  notification.style.cssText = `
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    background: #ff0000 !important;
    color: white !important;
    padding: 30px !important;
    border-radius: 10px !important;
    font-size: 20px !important;
    font-weight: bold !important;
    z-index: 999999999 !important;
    box-shadow: 0 0 50px rgba(255,0,0,0.5) !important;
    border: 3px solid white !important;
    text-align: center !important;
    max-width: 400px !important;
    font-family: Arial, sans-serif !important;
  `;
  
  notification.innerHTML = `
    <div style="margin-bottom: 15px;">🚨 NOTIFICATION TEST 🚨</div>
    <div style="font-size: 16px; margin-bottom: 15px;">
      If you can see this red box, the notification system can work!
    </div>
    <button onclick="this.parentElement.remove()" style="
      background: white;
      color: red;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      font-weight: bold;
      cursor: pointer;
    ">Close Test</button>
  `;
  
  document.body.appendChild(notification);
  console.log('✅ Test notification created and should be visible');
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 10000);
}

// Test 2: Check what's currently happening with alerts
console.log('Current alert function:', window.alert.toString().substring(0, 200));
console.log('Current showAlert function:', typeof window.showAlert, window.showAlert?.toString().substring(0, 100));
console.log('Toast manager:', typeof window.toastManager, window.toastManager);

// Test 3: Override alert with our test notification
window.originalAlert = window.originalAlert || window.alert;
window.alert = function(message) {
  console.log('🧪 Alert called with:', message);
  createTestNotification();
  
  // Create a message-specific notification that follows viewport
  const msgNotification = document.createElement('div');

  // Calculate position relative to current viewport
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const viewportHeight = window.innerHeight;
  const notificationTop = scrollTop + 20; // 20px from top of current viewport

  msgNotification.style.cssText = `
    position: absolute !important;
    top: ${notificationTop}px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    background: #0066ff !important;
    color: white !important;
    padding: 15px 25px !important;
    border-radius: 8px !important;
    font-size: 16px !important;
    z-index: 999999999 !important;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3) !important;
    max-width: 500px !important;
    text-align: center !important;
    font-family: Arial, sans-serif !important;
  `;
  msgNotification.textContent = message;
  document.body.appendChild(msgNotification);
  
  setTimeout(() => {
    if (msgNotification.parentNode) {
      msgNotification.remove();
    }
  }, 5000);
};

// Test 4: Override showAlert too
window.showAlert = function(message, type) {
  console.log('🧪 ShowAlert called with:', message, type);
  window.alert(message);
};


console.log('✅ Notification test system loaded');
