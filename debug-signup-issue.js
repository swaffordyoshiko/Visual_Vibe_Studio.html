// DEBUG AND FIX SIGNUP CONFLICTS
console.log('🔍 Debugging signup conflicts...');

// Function to inspect all localStorage data
window.debugSignUpIssue = function(emailToCheck) {
  console.log('=== SIGNUP DEBUG REPORT ===');
  
  // Check visualVibeUsers
  try {
    const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    console.log('📊 Total users in visualVibeUsers:', users.length);
    
    if (emailToCheck) {
      const matchingUsers = users.filter(u => u.email && u.email.toLowerCase() === emailToCheck.toLowerCase());
      console.log(`🔍 Users matching email "${emailToCheck}":`, matchingUsers.length);
      
      matchingUsers.forEach((user, index) => {
        console.log(`👤 User ${index + 1}:`, {
          email: user.email,
          name: user.name,
          password: user.password ? '[EXISTS]' : '[MISSING]',
          createdAt: user.createdAt,
          realAccount: user.realAccount,
          signUpMethod: user.signUpMethod,
          syncedFromCloud: user.syncedFromCloud,
          accountVersion: user.accountVersion
        });
      });
    } else {
      // Show all users
      users.forEach((user, index) => {
        console.log(`👤 User ${index + 1}:`, {
          email: user.email,
          name: user.name,
          password: user.password ? '[EXISTS]' : '[MISSING]',
          createdAt: user.createdAt,
          realAccount: user.realAccount,
          signUpMethod: user.signUpMethod,
          syncedFromCloud: user.syncedFromCloud
        });
      });
    }
  } catch (error) {
    console.error('❌ Error reading visualVibeUsers:', error);
  }
  
  // Check individual user records
  console.log('\n📁 Individual user records in localStorage:');
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('user_')) {
      try {
        const userData = JSON.parse(localStorage.getItem(key));
        console.log(`🔑 ${key}:`, {
          email: userData.email,
          name: userData.name,
          realAccount: userData.realAccount,
          signUpMethod: userData.signUpMethod
        });
      } catch (error) {
        console.log(`🔑 ${key}: [CORRUPTED DATA]`);
      }
    }
  }
  
  // Check current user
  try {
    const currentUser = JSON.parse(localStorage.getItem('visualVibeUser') || 'null');
    console.log('\n👤 Current signed-in user:', currentUser ? {
      email: currentUser.email,
      name: currentUser.name,
      signedIn: currentUser.signedIn
    } : 'None');
  } catch (error) {
    console.log('\n👤 Current user: [CORRUPTED DATA]');
  }
  
  console.log('=== END DEBUG REPORT ===');
};

// Function to completely clear all user data
window.clearAllUserData = function() {
  console.log('🧹 CLEARING ALL USER DATA...');
  
  // Clear main users array
  localStorage.removeItem('visualVibeUsers');
  
  // Clear individual user records
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith('user_') || key === 'visualVibeUser')) {
      keysToRemove.push(key);
    }
  }
  
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
    console.log('🗑️ Removed:', key);
  });
  
  // Clear sync-related data
  localStorage.removeItem('visualVibeCloudSync');
  localStorage.removeItem('crossDeviceUsers');
  localStorage.removeItem('deviceFingerprint');
  
  console.log('✅ All user data cleared. You can now sign up fresh.');
  alert('All user data cleared. Please try signing up again.');
};

// Function to clear data for specific email
window.clearUserByEmail = function(email) {
  if (!email) {
    console.log('❌ Please provide an email address');
    return;
  }
  
  console.log(`🧹 Clearing data for email: ${email}`);
  
  try {
    // Clear from main users array
    const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
    const filteredUsers = users.filter(u => !u.email || u.email.toLowerCase() !== email.toLowerCase());
    localStorage.setItem('visualVibeUsers', JSON.stringify(filteredUsers));
    
    // Clear individual user record
    localStorage.removeItem(`user_${email}`);
    
    console.log(`✅ Cleared data for: ${email}`);
    alert(`Cleared data for ${email}. Please try signing up again.`);
  } catch (error) {
    console.error('❌ Error clearing user data:', error);
  }
};

// Auto-run debug for current signup attempt
if (typeof window !== 'undefined') {
  console.log('🔧 Debug functions loaded. Usage:');
  console.log('- debugSignUpIssue() - Show all user data');
  console.log('- debugSignUpIssue("email@example.com") - Show data for specific email');
  console.log('- clearUserByEmail("email@example.com") - Clear data for specific email');
  console.log('- clearAllUserData() - Clear all user data (nuclear option)');
}
