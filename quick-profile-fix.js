// QUICK PROFILE SAVE FIX - Run this in console or load as script
console.log('🚀 QUICK PROFILE SAVE FIX - Fixing save button now...');

// Direct fix for profile save button
(function() {
  
  // Override handleProfileUpdate with working version
  window.handleProfileUpdate = function(event) {
    console.log('💾 Profile save triggered (FIXED VERSION)...');
    
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    if (!window.currentUser) {
      alert('Please sign in to update your profile.');
      return false;
    }
    
    // Get form values
    const firstName = document.getElementById('profileFirstName')?.value?.trim() || '';
    const lastName = document.getElementById('profileLastName')?.value?.trim() || '';
    const companyName = document.getElementById('profileCompanyName')?.value?.trim() || '';
    const phone = document.getElementById('profilePhone')?.value?.trim() || '';
    const email = document.getElementById('profileEmail')?.value?.trim() || '';
    
    // Quick validation
    if (!firstName || !lastName || !email) {
      alert('Please fill in First Name, Last Name, and Email.');
      return false;
    }
    
    // Get save button and show loading
    const saveBtn = document.querySelector('button[form="profileForm"]');
    if (saveBtn) {
      saveBtn.textContent = 'Saving...';
      saveBtn.disabled = true;
    }
    
    try {
      // Get users array
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.id === window.currentUser.id);
      
      if (userIndex !== -1) {
        // Update user data
        users[userIndex] = {
          ...users[userIndex],
          firstName,
          lastName,
          companyName,
          phone,
          email,
          name: `${firstName} ${lastName}`,
          updatedAt: new Date().toISOString()
        };
        
        // Save everything
        localStorage.setItem('visualVibeUsers', JSON.stringify(users));
        localStorage.setItem('visualVibeProfileData', JSON.stringify({
          firstName, lastName, companyName, phone, email,
          name: `${firstName} ${lastName}`,
          lastUpdated: new Date().toISOString()
        }));
        
        // Update current session
        window.currentUser = {
          id: users[userIndex].id,
          name: users[userIndex].name,
          email: users[userIndex].email,
          lastActivity: new Date().toISOString()
        };
        localStorage.setItem('visualVibeUser', JSON.stringify(window.currentUser));
        
        // Success feedback
        alert('✅ Profile saved successfully!');
        console.log('✅ Profile data saved');
        
        // Update UI and close modal
        if (window.updateAuthUI) window.updateAuthUI();
        setTimeout(() => {
          if (window.closeProfileModal) window.closeProfileModal();
        }, 1000);
        
      } else {
        alert('❌ User not found. Please sign in again.');
      }
      
    } catch (error) {
      console.error('❌ Save error:', error);
      alert('❌ Error saving profile. Please try again.');
    }
    
    // Restore button
    if (saveBtn) {
      saveBtn.textContent = 'Save Changes';
      saveBtn.disabled = false;
    }
    
    return false;
  };
  
  // Attach handlers immediately
  const form = document.getElementById('profileForm');
  if (form) {
    form.onsubmit = window.handleProfileUpdate;
    form.addEventListener('submit', window.handleProfileUpdate);
  }
  
  const saveBtn = document.querySelector('button[form="profileForm"]');
  if (saveBtn) {
    saveBtn.onclick = function(e) {
      e.preventDefault();
      window.handleProfileUpdate(e);
    };
  }
  
  console.log('✅ Profile save button FIXED! Try saving your profile now.');
  
})();
