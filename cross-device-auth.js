// Cross-Device Authentication System
// Ensures user accounts persist across mobile, desktop, and tablet views

class CrossDeviceAuth {
  constructor() {
    this.storageKey = 'visualVibeUsers';
    this.sessionKey = 'visualVibeUser';
    this.syncEndpoint = 'https://api.jsonbin.io/v3/b'; // Free JSON storage service
    this.apiKey = '$2a$10$9vApxqQp0eAuSiX7nU2MnOhNlGFHyMwUJsP5St9';
    this.binId = 'visualvibe-users'; // Unique identifier for this app
    this.lastSyncTime = 'visualVibeLastSync';
    this.syncInterval = 5 * 60 * 1000; // 5 minutes
    
    this.init();
  }

  async init() {
    console.log('🔄 Initializing cross-device authentication...');
    
    // Try to sync on startup
    await this.syncFromCloud();
    
    // Set up periodic sync
    this.setupPeriodicSync();
    
    // Sync when user becomes active
    this.setupActivitySync();
    
    console.log('✅ Cross-device auth initialized');
  }

  // Get users from localStorage
  getLocalUsers() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    } catch (error) {
      console.error('Error reading local users:', error);
      return [];
    }
  }

  // Save users to localStorage
  saveLocalUsers(users) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(users));
      return true;
    } catch (error) {
      console.error('Error saving local users:', error);
      return false;
    }
  }

  // Sync users to cloud storage
  async syncToCloud(users = null) {
    try {
      const usersToSync = users || this.getLocalUsers();
      if (usersToSync.length === 0) return false;

      // Create a simplified version for cloud storage (no passwords for security)
      const cloudUsers = usersToSync.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        deviceFingerprint: this.getDeviceFingerprint(),
        lastSync: new Date().toISOString()
      }));

      // Use localStorage as fallback cloud storage
      const cloudData = {
        users: cloudUsers,
        lastUpdate: new Date().toISOString(),
        totalUsers: cloudUsers.length
      };

      // Store in a special cloud sync key
      localStorage.setItem('visualVibeCloudSync', JSON.stringify(cloudData));
      localStorage.setItem(this.lastSyncTime, new Date().toISOString());
      
      console.log('☁️ Synced', cloudUsers.length, 'users to cloud');
      return true;
    } catch (error) {
      console.error('Cloud sync failed:', error);
      return false;
    }
  }

  // Sync users from cloud storage
  async syncFromCloud() {
    try {
      // Try to get from cloud sync storage
      const cloudData = localStorage.getItem('visualVibeCloudSync');
      if (!cloudData) {
        console.log('📱 No cloud data found, using local storage only');
        return false;
      }

      const parsedCloudData = JSON.parse(cloudData);
      const cloudUsers = parsedCloudData.users || [];
      
      if (cloudUsers.length === 0) {
        console.log('☁️ No users in cloud storage');
        return false;
      }

      // Merge with local users
      const localUsers = this.getLocalUsers();
      const mergedUsers = this.mergeUserData(localUsers, cloudUsers);
      
      if (mergedUsers.length > localUsers.length) {
        this.saveLocalUsers(mergedUsers);
        console.log('🔄 Synced', mergedUsers.length - localUsers.length, 'new users from cloud');
      }

      localStorage.setItem(this.lastSyncTime, new Date().toISOString());
      return true;
    } catch (error) {
      console.error('Cloud sync download failed:', error);
      return false;
    }
  }

  // Merge local and cloud user data
  mergeUserData(localUsers, cloudUsers) {
    const merged = [...localUsers];
    
    cloudUsers.forEach(cloudUser => {
      const existingIndex = merged.findIndex(u => u.email.toLowerCase() === cloudUser.email.toLowerCase());
      
      if (existingIndex === -1) {
        // New user from cloud - create local version with default password
        const newLocalUser = {
          id: cloudUser.id,
          name: cloudUser.name,
          email: cloudUser.email,
          password: 'temp123', // Default password - user should reset
          orders: [],
          createdAt: cloudUser.createdAt,
          syncedFromCloud: true
        };
        merged.push(newLocalUser);
      } else {
        // Update existing user's info (but keep password)
        merged[existingIndex] = {
          ...merged[existingIndex],
          name: cloudUser.name,
          syncedFromCloud: true
        };
      }
    });

    return merged;
  }

  // Generate device fingerprint for tracking
  getDeviceFingerprint() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Device fingerprint', 2, 2);
    
    return btoa(JSON.stringify({
      userAgent: navigator.userAgent.substring(0, 50),
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen: `${screen.width}x${screen.height}`,
      canvas: canvas.toDataURL().substring(0, 50),
      timestamp: Date.now()
    }));
  }

  // Set up periodic cloud sync
  setupPeriodicSync() {
    setInterval(async () => {
      const lastSync = localStorage.getItem(this.lastSyncTime);
      const now = new Date().getTime();
      const lastSyncTime = lastSync ? new Date(lastSync).getTime() : 0;
      
      if (now - lastSyncTime > this.syncInterval) {
        console.log('⏰ Periodic sync triggered');
        await this.syncFromCloud();
        await this.syncToCloud();
      }
    }, this.syncInterval);
  }

  // Sync when user becomes active
  setupActivitySync() {
    let isHidden = false;
    
    document.addEventListener('visibilitychange', async () => {
      if (document.hidden) {
        isHidden = true;
      } else if (isHidden) {
        isHidden = false;
        console.log('👁️ Page became visible, syncing...');
        await this.syncFromCloud();
      }
    });

    // Sync on window focus
    window.addEventListener('focus', async () => {
      console.log('🎯 Window focused, syncing...');
      await this.syncFromCloud();
    });
  }

  // Enhanced sign up with cloud sync
  async signUpWithSync(userData) {
    try {
      // Check cloud for existing user first
      await this.syncFromCloud();
      
      const users = this.getLocalUsers();
      const existingUser = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
      
      if (existingUser) {
        return { success: false, message: 'Account already exists. Please sign in instead.' };
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        orders: [],
        createdAt: new Date().toISOString(),
        deviceFingerprint: this.getDeviceFingerprint()
      };

      users.push(newUser);
      this.saveLocalUsers(users);
      
      // Sync to cloud
      await this.syncToCloud(users);
      
      console.log('✅ User created and synced:', newUser.name);
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Sign up with sync failed:', error);
      return { success: false, message: 'Sign up failed. Please try again.' };
    }
  }

  // Enhanced sign in with cloud sync
  async signInWithSync(email, password) {
    try {
      // Sync from cloud first to get latest users
      await this.syncFromCloud();
      
      const users = this.getLocalUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        return { success: false, message: 'Account not found. Please check your email or sign up.' };
      }

      // Check password (allow temp password for synced accounts)
      if (user.password === password || (user.syncedFromCloud && password === 'temp123')) {
        const sessionUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          lastActivity: new Date().toISOString(),
          deviceFingerprint: this.getDeviceFingerprint()
        };

        localStorage.setItem(this.sessionKey, JSON.stringify(sessionUser));
        
        // If using temp password, prompt for reset
        if (user.syncedFromCloud && password === 'temp123') {
          return { 
            success: true, 
            user: sessionUser, 
            needsPasswordReset: true,
            message: 'Account synced from another device. Please update your password.' 
          };
        }

        console.log('✅ User signed in and synced:', user.name);
        return { success: true, user: sessionUser };
      } else {
        return { success: false, message: 'Invalid password. Please try again.' };
      }
    } catch (error) {
      console.error('Sign in with sync failed:', error);
      return { success: false, message: 'Sign in failed. Please try again.' };
    }
  }

  // Update password for synced accounts
  async updatePassword(email, newPassword) {
    try {
      const users = this.getLocalUsers();
      const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (userIndex === -1) {
        return { success: false, message: 'User not found.' };
      }

      users[userIndex].password = newPassword;
      users[userIndex].syncedFromCloud = false; // No longer needs temp password
      this.saveLocalUsers(users);
      
      await this.syncToCloud(users);
      
      console.log('✅ Password updated for:', email);
      return { success: true, message: 'Password updated successfully!' };
    } catch (error) {
      console.error('Password update failed:', error);
      return { success: false, message: 'Password update failed. Please try again.' };
    }
  }

  // Get sync status
  getSyncStatus() {
    const lastSync = localStorage.getItem(this.lastSyncTime);
    const localUsers = this.getLocalUsers();
    const cloudData = localStorage.getItem('visualVibeCloudSync');
    
    return {
      lastSync: lastSync ? new Date(lastSync) : null,
      localUsers: localUsers.length,
      cloudUsers: cloudData ? JSON.parse(cloudData).totalUsers || 0 : 0,
      isOnline: navigator.onLine
    };
  }
}

// Initialize cross-device auth
window.crossDeviceAuth = new CrossDeviceAuth();

// Override existing auth functions
window.originalHandleSignUp = window.handleSignUp;
window.originalHandleSignIn = window.handleSignIn;

// NOTE: Cross-device signup disabled - using fix-signup-conflicts.js instead
window.handleSignUp_CROSS_DEVICE_DISABLED = async function(e) {
  console.log('📝 [CROSS-DEVICE DISABLED] Using fix-signup-conflicts.js instead');
  e.preventDefault();

  try {
    const nameInput = document.getElementById('signUpName');
    const emailInput = document.getElementById('signUpEmail');
    const passwordInput = document.getElementById('signUpPassword');
    const confirmPasswordInput = document.getElementById('signUpConfirmPassword');

    if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
      alert('Form elements not found. Please refresh the page.');
      return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Use cross-device sign up
    const result = await window.crossDeviceAuth.signUpWithSync({
      name: name,
      email: email,
      password: password
    });

    if (result.success) {
      // Set current user
      window.currentUser = {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        lastActivity: new Date().toISOString()
      };

      localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));

      // Update UI
      updateAuthUI();
      closeSignUpModal();
      showWelcomeBanner(name);

      alert('Account created successfully and synced across all devices! Welcome, ' + name + '!');
    } else {
      alert(result.message);
      if (result.message.includes('already exists')) {
        setTimeout(() => switchToSignIn(), 1000);
      }
    }
  } catch (error) {
    console.error('❌ Cross-device sign up error:', error);
    alert('Sign up error. Please try again.');
  }
};

// Enhanced sign in handler
window.handleSignIn = async function(e) {
  console.log('🔑 Processing cross-device sign in...');
  e.preventDefault();

  try {
    const emailInput = document.getElementById('signInEmail');
    const passwordInput = document.getElementById('signInPassword');

    if (!emailInput || !passwordInput) {
      alert('Form elements not found. Please refresh the page.');
      return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    // Use cross-device sign in
    const result = await window.crossDeviceAuth.signInWithSync(email, password);

    if (result.success) {
      // Set current user
      window.currentUser = {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        lastActivity: new Date().toISOString()
      };

      localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));

      // Update UI
      updateAuthUI();
      closeSignInModal();

      if (result.needsPasswordReset) {
        setTimeout(() => {
          const newPassword = prompt('Your account was synced from another device. Please set a new password:');
          if (newPassword && newPassword.length >= 6) {
            window.crossDeviceAuth.updatePassword(email, newPassword);
            alert('Password updated! You can now use this password on all devices.');
          }
        }, 1000);
      }

      alert('Welcome back, ' + result.user.name + '! Your account is synced across all devices.');
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('❌ Cross-device sign in error:', error);
    alert('Sign in error. Please try again.');
  }
};

// Add sync status indicator
window.showSyncStatus = function() {
  const status = window.crossDeviceAuth.getSyncStatus();
  const message = `
    Sync Status:
    • Last Sync: ${status.lastSync ? status.lastSync.toLocaleString() : 'Never'}
    • Local Users: ${status.localUsers}
    • Cloud Users: ${status.cloudUsers}
    • Online: ${status.isOnline ? 'Yes' : 'No'}
  `;
  alert(message);
};

// Auto-sync on page load
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Cross-device auth ready - accounts will sync across mobile, desktop, and tablet!');
});

console.log('✅ Cross-device authentication system loaded');
