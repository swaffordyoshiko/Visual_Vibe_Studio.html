// Cross-Device Sync UI Components
// Provides visual feedback about account synchronization across devices

class SyncStatusUI {
  constructor() {
    this.indicator = null;
    this.isVisible = false;
    this.lastStatus = null;
    this.init();
  }

  init() {
    this.createSyncIndicator();
    this.setupEventListeners();
    this.startStatusUpdates();
    this.enhanceAuthForms();
    console.log('🎨 Sync status UI initialized');
  }

  createSyncIndicator() {
    // Create sync status indicator
    this.indicator = document.createElement('div');
    this.indicator.className = 'sync-status-indicator';
    this.indicator.innerHTML = `
      <span class="sync-status-icon">🔄</span>
      <span class="sync-status-text">Synced</span>
      <div class="sync-tooltip">
        <div>✅ Account synced across all devices</div>
        <div>📱 Mobile • 💻 Desktop • 📱 Tablet</div>
        <div style="margin-top: 4px; font-size: 10px; opacity: 0.8;">Click for details</div>
      </div>
    `;

    // Add click handler
    this.indicator.addEventListener('click', () => this.showSyncDetails());

    // Add to page
    document.body.appendChild(this.indicator);
    
    // Show after a brief delay
    setTimeout(() => {
      this.indicator.style.opacity = '0';
      this.indicator.style.transform = 'translateY(-20px)';
      this.indicator.style.transition = 'all 0.3s ease';
      
      setTimeout(() => {
        this.indicator.style.opacity = '1';
        this.indicator.style.transform = 'translateY(0)';
        this.isVisible = true;
      }, 100);
    }, 1000);
  }

  updateSyncStatus() {
    if (!this.indicator || !window.crossDeviceAuth) return;

    const status = window.crossDeviceAuth.getSyncStatus();
    const icon = this.indicator.querySelector('.sync-status-icon');
    const text = this.indicator.querySelector('.sync-status-text');
    const tooltip = this.indicator.querySelector('.sync-tooltip');

    // Determine status
    let statusClass = '';
    let statusIcon = '';
    let statusText = '';
    let tooltipContent = '';

    if (!navigator.onLine) {
      statusClass = 'offline';
      statusIcon = '📴';
      statusText = 'Offline';
      tooltipContent = `
        <div>📴 Offline Mode</div>
        <div>Changes will sync when online</div>
        <div style="margin-top: 4px; font-size: 10px; opacity: 0.8;">Local: ${status.localUsers} users</div>
      `;
    } else if (status.lastSync && (Date.now() - new Date(status.lastSync).getTime()) < 60000) {
      statusClass = '';
      statusIcon = '✅';
      statusText = 'Synced';
      tooltipContent = `
        <div>✅ Recently synced (${this.getTimeAgo(status.lastSync)})</div>
        <div>📱 Mobile • 💻 Desktop • 📱 Tablet</div>
        <div style="margin-top: 4px; font-size: 10px; opacity: 0.8;">${status.localUsers} users • Last: ${status.lastSync ? new Date(status.lastSync).toLocaleTimeString() : 'Never'}</div>
      `;
    } else {
      statusClass = 'syncing';
      statusIcon = '🔄';
      statusText = 'Syncing';
      tooltipContent = `
        <div>🔄 Syncing accounts...</div>
        <div>Ensuring access across all devices</div>
        <div style="margin-top: 4px; font-size: 10px; opacity: 0.8;">Local: ${status.localUsers} • Cloud: ${status.cloudUsers}</div>
      `;
    }

    // Update indicator
    this.indicator.className = `sync-status-indicator ${statusClass}`;
    icon.textContent = statusIcon;
    text.textContent = statusText;
    tooltip.innerHTML = tooltipContent;

    this.lastStatus = status;
  }

  getTimeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);

    if (diffSeconds < 30) return 'just now';
    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    return `${Math.floor(diffMinutes / 60)}h ago`;
  }

  showSyncDetails() {
    if (!window.crossDeviceAuth) return;

    const status = window.crossDeviceAuth.getSyncStatus();
    const currentUser = window.currentUser;
    
    const details = `
📊 Cross-Device Sync Status

🔐 Current User: ${currentUser ? currentUser.name : 'Not signed in'}
📧 Email: ${currentUser ? currentUser.email : 'N/A'}

💾 Local Storage: ${status.localUsers} accounts
☁️ Cloud Sync: ${status.cloudUsers} accounts  
🔄 Last Sync: ${status.lastSync ? status.lastSync.toLocaleString() : 'Never'}

🌐 Connection: ${navigator.onLine ? 'Online ✅' : 'Offline 📴'}
📱 Device Type: ${this.getDeviceType()}

✨ Your account works on:
• 📱 Mobile phones
• ���� Desktop computers  
• 📱 Tablets
• 🌐 Any web browser

${currentUser ? 
  '✅ You can sign in with the same credentials on any device!' : 
  '💡 Sign up once, access everywhere!'}
    `.trim();

    alert(details);
  }

  getDeviceType() {
    const userAgent = navigator.userAgent;
    if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
      return /iPad/.test(userAgent) ? '📱 Tablet' : '📱 Mobile';
    }
    return '💻 Desktop';
  }

  enhanceAuthForms() {
    // Add sync indicators to auth forms
    const signInForm = document.querySelector('#signInForm');
    const signUpForm = document.querySelector('#signUpForm');

    if (signInForm && !signInForm.classList.contains('auth-form')) {
      signInForm.classList.add('auth-form');
    }

    if (signUpForm && !signUpForm.classList.contains('auth-form')) {
      signUpForm.classList.add('auth-form');
    }

    // Monitor for successful authentication
    this.monitorAuthSuccess();
  }

  monitorAuthSuccess() {
    // Override the original welcome banner to show cross-device info
    const originalShowWelcomeBanner = window.showWelcomeBanner;
    
    window.showWelcomeBanner = (userName) => {
      if (originalShowWelcomeBanner) {
        originalShowWelcomeBanner(userName);
      }
      
      // Add cross-device welcome message
      setTimeout(() => {
        this.showCrossDeviceWelcome(userName);
      }, 500);
    };

    // Monitor sign in success
    const originalUpdateAuthUI = window.updateAuthUI;
    window.updateAuthUI = () => {
      if (originalUpdateAuthUI) {
        originalUpdateAuthUI();
      }
      
      // Update sync status when auth state changes
      setTimeout(() => {
        this.updateSyncStatus();
      }, 100);
    };
  }

  showCrossDeviceWelcome(userName) {
    // Create welcome message element
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'cross-device-welcome';
    welcomeDiv.innerHTML = `
      <h3>🎉 Welcome ${userName}!</h3>
      <div class="device-icons">
        <span>📱</span>
        <span>💻</span>
        <span>📱</span>
      </div>
      <p>Your account is now synced across all devices.<br>
      Sign in anywhere with the same credentials!</p>
    `;

    // Find a good place to insert it
    const heroSection = document.querySelector('.hero-section') || 
                       document.querySelector('main') || 
                       document.body;
    
    if (heroSection) {
      heroSection.insertBefore(welcomeDiv, heroSection.firstChild);
      
      // Auto-remove after 10 seconds
      setTimeout(() => {
        welcomeDiv.style.transition = 'all 0.5s ease';
        welcomeDiv.style.opacity = '0';
        welcomeDiv.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
          if (welcomeDiv.parentNode) {
            welcomeDiv.parentNode.removeChild(welcomeDiv);
          }
        }, 500);
      }, 10000);
    }
  }

  startStatusUpdates() {
    // Update immediately
    setTimeout(() => this.updateSyncStatus(), 500);
    
    // Update every 30 seconds
    setInterval(() => this.updateSyncStatus(), 30000);

    // Update on visibility change
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        setTimeout(() => this.updateSyncStatus(), 1000);
      }
    });

    // Update on online/offline
    window.addEventListener('online', () => {
      setTimeout(() => this.updateSyncStatus(), 1000);
    });

    window.addEventListener('offline', () => {
      this.updateSyncStatus();
    });
  }

  setupEventListeners() {
    // Hide indicator on scroll (mobile)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (window.innerWidth <= 768) {
        this.indicator.style.opacity = '0.5';
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          this.indicator.style.opacity = '1';
        }, 1000);
      }
    });

    // Show sync animation on form submissions
    document.addEventListener('submit', (e) => {
      if (e.target.id === 'signInForm' || e.target.id === 'signUpForm') {
        this.showSyncAnimation();
      }
    });
  }

  showSyncAnimation() {
    if (!this.indicator) return;

    this.indicator.classList.add('syncing');
    
    setTimeout(() => {
      this.indicator.classList.remove('syncing');
      this.updateSyncStatus();
    }, 3000);
  }

  hide() {
    if (this.indicator && this.isVisible) {
      this.indicator.style.opacity = '0';
      this.indicator.style.transform = 'translateY(-20px)';
      this.isVisible = false;
    }
  }

  show() {
    if (this.indicator && !this.isVisible) {
      this.indicator.style.opacity = '1';
      this.indicator.style.transform = 'translateY(0)';
      this.isVisible = true;
    }
  }
}

// Initialize sync status UI when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Wait for cross-device auth to initialize
  setTimeout(() => {
    if (window.crossDeviceAuth) {
      window.syncStatusUI = new SyncStatusUI();
      console.log('🎨 Cross-device sync UI ready');
    }
  }, 1000);
});

// Global function to manually trigger sync status update
window.updateSyncStatusUI = function() {
  if (window.syncStatusUI) {
    window.syncStatusUI.updateSyncStatus();
  }
};

console.log('✅ Cross-device sync UI loaded');
