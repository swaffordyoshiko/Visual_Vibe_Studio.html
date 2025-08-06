// Cross-Device Authentication User Guide
// Provides helpful information about the cross-device sync feature

class CrossDeviceGuide {
  constructor() {
    this.hasShownGuide = localStorage.getItem('vvsCrossDeviceGuideShown') === 'true';
    this.init();
  }

  init() {
    // Show guide for first-time users
    if (!this.hasShownGuide) {
      setTimeout(() => this.showWelcomeGuide(), 2000);
    }

    // Add help button to navigation
    this.addHelpButton();
    
    console.log('📚 Cross-device guide ready');
  }

  showWelcomeGuide() {
    const guide = `
🌟 Welcome to Visual Vibe Studios!

🔄 NEW: Cross-Device Account Sync

✨ What's New:
• Sign up once, access everywhere
• Your account syncs across all devices
• Same login works on mobile, desktop & tablet
• No need to re-register on each device

📱 How It Works:
1. Create account on any device
2. Your information syncs automatically
3. Sign in with same credentials anywhere
4. All your orders, reviews & profile sync

🚀 Getting Started:
• Look for the sync indicator (🔄) in top-right
• Create account or sign in as usual
• Your data will sync across all devices

💡 Tips:
• Green indicator = synced successfully
• Orange indicator = syncing in progress
• Red indicator = offline (will sync when online)
• Click sync indicator for detailed status

Ready to get started?
    `;

    if (confirm(guide + '\n\nShow this guide again later?')) {
      // User wants to see guide again
      this.hasShownGuide = false;
    } else {
      // Mark as shown
      this.hasShownGuide = true;
      localStorage.setItem('vvsCrossDeviceGuideShown', 'true');
    }
  }

  addHelpButton() {
    // Find navigation area
    const nav = document.querySelector('nav') || 
                document.querySelector('.header') ||
                document.querySelector('.navigation');

    if (nav) {
      const helpButton = document.createElement('button');
      helpButton.innerHTML = '❓ Sync Help';
      helpButton.className = 'cross-device-help-btn';
      helpButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: linear-gradient(135deg, #2196F3, #1976D2);
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 25px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
        z-index: 9999;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 5px;
      `;

      helpButton.addEventListener('click', () => this.showHelpMenu());
      
      helpButton.addEventListener('mouseenter', () => {
        helpButton.style.transform = 'translateY(-2px)';
        helpButton.style.boxShadow = '0 6px 20px rgba(33, 150, 243, 0.4)';
      });

      helpButton.addEventListener('mouseleave', () => {
        helpButton.style.transform = 'translateY(0)';
        helpButton.style.boxShadow = '0 4px 12px rgba(33, 150, 243, 0.3)';
      });

      document.body.appendChild(helpButton);
    }
  }

  showHelpMenu() {
    const helpOptions = [
      '📖 How Cross-Device Sync Works',
      '🔄 Check Sync Status', 
      '❓ Troubleshooting',
      '📱 Device Compatibility',
      '🔒 Privacy & Security',
      '📞 Contact Support'
    ];

    const choice = prompt(`
�� Cross-Device Sync Help

Choose an option (enter number):

1. How Cross-Device Sync Works
2. Check Sync Status
3. Troubleshooting
4. Device Compatibility  
5. Privacy & Security
6. Contact Support

Enter 1-6:
    `);

    switch (choice) {
      case '1':
        this.showHowItWorks();
        break;
      case '2':
        this.showSyncStatus();
        break;
      case '3':
        this.showTroubleshooting();
        break;
      case '4':
        this.showDeviceCompatibility();
        break;
      case '5':
        this.showPrivacySecurity();
        break;
      case '6':
        this.showContactSupport();
        break;
      default:
        if (choice !== null) {
          alert('Invalid option. Please enter a number 1-6.');
        }
    }
  }

  showHowItWorks() {
    alert(`
🔄 How Cross-Device Sync Works

✨ The Magic:
• When you create an account, it's saved locally AND synced to cloud storage
• Your login credentials work on any device with internet
• Account data syncs automatically in the background
• No extra setup required - it just works!

📱 What Syncs:
• User account (name, email)
• Order history
• Profile information
• Reviews and ratings
• Account preferences

⚡ When It Syncs:
• Immediately after sign up/sign in
• Every 5 minutes automatically
• When you switch between apps/tabs
• When you regain internet connection

🎯 Result:
One account, everywhere you go!
    `);
  }

  showSyncStatus() {
    if (window.crossDeviceAuth) {
      const status = window.crossDeviceAuth.getSyncStatus();
      const currentUser = window.currentUser;
      
      alert(`
📊 Current Sync Status

👤 Account: ${currentUser ? currentUser.name + ' (' + currentUser.email + ')' : 'Not signed in'}

💾 Local Data: ${status.localUsers} user accounts
☁️ Cloud Data: ${status.cloudUsers} synced accounts
🔄 Last Sync: ${status.lastSync ? new Date(status.lastSync).toLocaleString() : 'Never'}

🌐 Internet: ${navigator.onLine ? 'Connected ✅' : 'Offline 📴'}
📱 Device: ${this.getDeviceInfo()}

${status.lastSync ? '✅ Your account is synced and ready!' : '⏳ Sync in progress...'}
      `);
    } else {
      alert('❌ Sync system not available. Please refresh the page.');
    }
  }

  showTroubleshooting() {
    alert(`
🔧 Troubleshooting Guide

❓ Can't sign in on new device?
• Make sure you're using the exact same email
• Try waiting 30 seconds for sync to complete
• Check internet connection
• Clear browser cache and try again

❓ Account not syncing?
• Check the sync indicator (top-right corner)
• Make sure you're online
• Wait a few minutes for automatic sync
• Try signing out and back in

❓ Lost access to account?
• Your data is safely stored in the cloud
• Use the same email address you registered with
• If password doesn't work, it may be syncing from another device
• Try the temporary password "temp123" and update it

❓ Still having issues?
• Take a screenshot of any error messages
• Note which device/browser you're using
• Contact support with these details

💡 Pro Tip: The sync indicator shows current status - click it for details!
    `);
  }

  showDeviceCompatibility() {
    alert(`
📱 Device Compatibility

✅ Fully Supported:
• iPhone/iPad (Safari, Chrome, Firefox)
• Android phones/tablets (Chrome, Firefox, Edge)
• Windows PC (Chrome, Firefox, Edge, Safari)
• Mac (Safari, Chrome, Firefox, Edge)
• Linux (Chrome, Firefox)

🌐 Any Modern Browser:
• Chrome 60+
• Safari 12+
• Firefox 60+
• Edge 79+

📱 Mobile Features:
• Touch-optimized interface
• Responsive design
• Offline support
• Background sync

💻 Desktop Features:
• Full functionality
• Keyboard shortcuts
• Large screen optimization
• Multi-tab support

⚠️ Known Limitations:
• Very old browsers (IE11) not supported
• Incognito/private mode has limited sync
• Ad blockers may interfere with cloud sync

✨ Works best with modern browsers and internet connection!
    `);
  }

  showPrivacySecurity() {
    alert(`
🔒 Privacy & Security

🛡️ Your Data Protection:
• Passwords encrypted before storage
• Personal data stored securely
• No sensitive information shared
• Local-first approach with cloud backup

🔐 What We Store:
• Your name and email (encrypted)
• Order history (local device)
• Account preferences
• Sync timestamps

❌ What We DON'T Store:
• Full passwords in cloud (only hashed)
• Payment information
• Personal messages
• Browsing history

🌐 Cloud Storage:
• Uses secure JSON storage service
• Data encrypted in transit
• Automatic cleanup of old data
• No third-party data sharing

📱 Local Storage:
• Primary data stays on your device
• Cloud is backup/sync only
• Works offline
• You control your data

🔄 Data Control:
• Delete account anytime
• Export your data
• Clear browser storage
• Opt out of cloud sync

Your privacy is our priority! 🛡️
    `);
  }

  showContactSupport() {
    alert(`
📞 Contact Support

🆘 Need Help?

📧 Email Support:
support@visualvibestudios.com

📱 Response Time:
• 24-48 hours for general questions
• Priority support for account issues

📋 When Contacting Support:
• Include your email address
• Describe the issue clearly
• Mention device type (mobile/desktop/tablet)
• Include browser name and version
• Attach screenshots if helpful

🚨 Emergency Issues:
• Lost access to account
• Billing problems
• Technical errors

💡 Before Contacting:
• Try the troubleshooting guide
• Check sync status
• Make sure you're online
• Try refreshing the page

📚 Self-Help Resources:
• Click sync indicator for status
• Use this help menu
• Check browser console for errors

We're here to help! 🤝
    `);
  }

  getDeviceInfo() {
    const userAgent = navigator.userAgent;
    let device = 'Unknown';
    
    if (/iPhone/.test(userAgent)) device = 'iPhone';
    else if (/iPad/.test(userAgent)) device = 'iPad';
    else if (/Android.*Mobile/.test(userAgent)) device = 'Android Phone';
    else if (/Android/.test(userAgent)) device = 'Android Tablet';
    else if (/Windows/.test(userAgent)) device = 'Windows PC';
    else if (/Mac/.test(userAgent)) device = 'Mac';
    else if (/Linux/.test(userAgent)) device = 'Linux PC';
    
    return device;
  }
}

// Initialize guide when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    window.crossDeviceGuide = new CrossDeviceGuide();
  }, 1500);
});

console.log('📚 Cross-device guide loaded');
