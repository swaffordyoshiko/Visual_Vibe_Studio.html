// Profile Photo Display and Modal Control Fix
console.log('🖼️ Loading profile photo display and modal control fix...');

(function() {
  'use strict';
  
  function initProfilePhotoFix() {
    console.log('🎯 Initializing profile photo display and modal control...');
    
    // 1. Prevent automatic modal opening
    preventAutoModalOpen();
    
    // 2. Set up profile photo display functionality
    setupProfilePhotoDisplay();
    
    // 3. Add profile photo to modal when it opens
    enhanceProfileModal();
    
    console.log('✅ Profile photo display and modal control fix ready');
  }
  
  function preventAutoModalOpen() {
    console.log('🚫 Preventing automatic modal opening...');
    
    // Store original function but ensure it only opens on user click
    const originalOpenProfileModal = window.openProfileModal;
    
    window.openProfileModal = function(userInitiated = true) {
      // Only allow if user actually clicked the button
      if (!userInitiated) {
        console.log('🚫 Prevented automatic profile modal opening');
        return;
      }
      
      console.log('👤 Opening profile modal (user-initiated)...');
      
      try {
        const modal = document.getElementById('profileModal');
        if (!modal) {
          alert('Profile editor not available. Please refresh the page.');
          return;
        }
        
        if (!window.currentUser) {
          alert('Please sign in to edit your profile.');
          return;
        }
        
        // Load user data
        loadUserDataIntoForm();
        
        // Add profile photo to modal
        addProfilePhotoToModal();
        
        // Show modal
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Ensure form handlers work
        setTimeout(attachFormHandlers, 200);
        
        console.log('✅ Profile modal opened successfully');
        
      } catch (error) {
        console.error('❌ Error opening profile modal:', error);
        alert('Error opening profile editor. Please try again.');
      }
    };
    
    // Override any automatic triggers
    document.addEventListener('click', function(e) {
      // Only allow profile modal to open if user clicked the actual profile button
      if (e.target.closest('button[onclick*="openProfileModal"]')) {
        console.log('✅ Profile button clicked by user');
      }
    });
  }
  
  function setupProfilePhotoDisplay() {
    console.log('🖼️ Setting up profile photo display...');
    
    // Function to update profile button with photo
    function updateProfileButton() {
      const savedPhoto = localStorage.getItem('visualVibeProfilePicture');
      const profileButton = document.querySelector('button[onclick*="openProfileModal"]');
      
      if (profileButton) {
        const iconContainer = profileButton.querySelector('.bg-indigo-100, .bg-gradient-to-r');
        
        if (savedPhoto && iconContainer) {
          // Replace with profile photo
          iconContainer.innerHTML = `
            <img src="${savedPhoto}" alt="Profile Photo" 
                 class="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm">
          `;
          iconContainer.className = 'p-0 rounded-full overflow-hidden group-hover:opacity-90 transition-opacity';
          console.log('✅ Profile button updated with photo');
          
        } else if (iconContainer && window.currentUser) {
          // Show initials if no photo
          const initials = getInitials(window.currentUser.name || 'User');
          iconContainer.innerHTML = `
            <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              ${initials}
            </div>
          `;
          iconContainer.className = 'p-0 rounded-full group-hover:opacity-90 transition-opacity';
          console.log('✅ Profile button updated with initials');
        }
      }
      
      // Also update mobile profile button
      const mobileButton = document.querySelector('button[onclick*="openProfileModal(); closeMobileMenu()"]');
      if (mobileButton && savedPhoto) {
        const iconContainer = mobileButton.querySelector('svg')?.parentElement;
        if (iconContainer) {
          iconContainer.innerHTML = `
            <img src="${savedPhoto}" alt="Profile Photo" 
                 class="w-6 h-6 rounded-full object-cover border border-gray-300">
          `;
        }
      }
    }
    
    // Function to get initials from name
    function getInitials(name) {
      if (!name) return 'U';
      return name.split(' ')
        .filter(n => n.length > 0)
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    
    // Update immediately and on page load
    updateProfileButton();
    
    // Make function globally available
    window.updateProfilePhotoDisplay = updateProfileButton;
    
    // Monitor for photo changes
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          updateProfileButton();
        }
      });
    });
    
    // Start observing
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }
  
  function addProfilePhotoToModal() {
    console.log('🖼️ Adding profile photo to modal...');
    
    const modal = document.getElementById('profileModal');
    const form = document.getElementById('profileForm');
    
    if (!modal || !form) return;
    
    // Check if profile photo section already exists
    let photoSection = modal.querySelector('#profilePhotoSection');
    
    if (!photoSection) {
      // Create profile photo section
      photoSection = document.createElement('div');
      photoSection.id = 'profilePhotoSection';
      photoSection.className = 'text-center mb-6 pb-6 border-b border-gray-200';
      
      const savedPhoto = localStorage.getItem('visualVibeProfilePicture');
      const initials = window.currentUser ? getInitials(window.currentUser.name || 'User') : 'U';
      
      photoSection.innerHTML = `
        <div class="flex flex-col items-center">
          <div id="modalProfilePhoto" class="relative group cursor-pointer">
            ${savedPhoto ? `
              <img src="${savedPhoto}" alt="Profile Photo" 
                   class="w-20 h-20 rounded-full object-cover border-4 border-gray-200 shadow-lg group-hover:opacity-90 transition-opacity">
            ` : `
              <div class="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold border-4 border-gray-200 shadow-lg group-hover:opacity-90 transition-opacity">
                ${initials}
              </div>
            `}
            <div class="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
          </div>
          <p class="text-sm text-gray-500 mt-2">Click to change profile photo</p>
          <input type="file" id="profilePhotoInput" accept="image/*" class="hidden">
        </div>
      `;
      
      // Insert at the beginning of the form
      form.insertBefore(photoSection, form.firstChild);
      
      // Setup photo upload functionality
      setupPhotoUpload(photoSection);
    }
    
    console.log('✅ Profile photo section added to modal');
  }
  
  function setupPhotoUpload(photoSection) {
    const photoDisplay = photoSection.querySelector('#modalProfilePhoto');
    const fileInput = photoSection.querySelector('#profilePhotoInput');
    
    if (!photoDisplay || !fileInput) return;
    
    // Handle photo click
    photoDisplay.addEventListener('click', function() {
      fileInput.click();
    });
    
    // Handle file selection
    fileInput.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image must be smaller than 5MB');
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = function(e) {
        const imageData = e.target.result;
        
        // Save to localStorage
        localStorage.setItem('visualVibeProfilePicture', imageData);
        
        // Update modal display
        photoDisplay.innerHTML = `
          <img src="${imageData}" alt="Profile Photo" 
               class="w-20 h-20 rounded-full object-cover border-4 border-gray-200 shadow-lg group-hover:opacity-90 transition-opacity">
          <div class="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
        `;
        
        // Update profile button
        if (window.updateProfilePhotoDisplay) {
          window.updateProfilePhotoDisplay();
        }
        
        // Show success message
        if (window.toastManager) {
          window.toastManager.success('Profile photo updated!', { duration: 2000 });
        }
        
        console.log('✅ Profile photo updated');
      };
      
      reader.readAsDataURL(file);
    });
  }
  
  function loadUserDataIntoForm() {
    console.log('📋 Loading user data into form...');
    
    try {
      // Get user data
      const users = JSON.parse(localStorage.getItem('visualVibeUsers') || '[]');
      const userIndex = users.findIndex(u => u.id === window.currentUser.id);
      const userData = users[userIndex];
      
      if (!userData) {
        alert('User data not found. Please sign in again.');
        return;
      }
      
      // Populate form fields
      const fields = [
        { id: 'profileFirstName', value: userData.firstName || '' },
        { id: 'profileLastName', value: userData.lastName || '' },
        { id: 'profileCompanyName', value: userData.companyName || '' },
        { id: 'profilePhone', value: userData.phone || '' },
        { id: 'profileEmail', value: userData.email || '' }
      ];
      
      fields.forEach(field => {
        const element = document.getElementById(field.id);
        if (element) {
          element.value = field.value;
        }
      });
      
      console.log('✅ User data loaded into form');
      
    } catch (error) {
      console.error('❌ Error loading user data:', error);
    }
  }
  
  function attachFormHandlers() {
    // Use the existing fixed profile save handler
    if (typeof window.handleProfileUpdate === 'function') {
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
    }
  }
  
  function enhanceProfileModal() {
    console.log('🔧 Enhancing profile modal...');
    
    // Override openProfileModal to add photo functionality
    const originalOpen = window.openProfileModal;
    
    window.openProfileModal = function() {
      // Call our enhanced version
      if (typeof originalOpen === 'function') {
        originalOpen(true); // Pass true to indicate user-initiated
      }
      
      // Add photo section after modal opens
      setTimeout(() => {
        addProfilePhotoToModal();
      }, 100);
    };
  }
  
  function getInitials(name) {
    if (!name) return 'U';
    return name.split(' ')
      .filter(n => n.length > 0)
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
  
  // Initialize when ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfilePhotoFix);
  } else {
    initProfilePhotoFix();
  }
  
  // Initialize with delay to override other scripts
  setTimeout(initProfilePhotoFix, 1000);
  
})();

console.log('🖼️ Profile photo display and modal control fix loaded!');
