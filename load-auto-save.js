// Loader for auto-save profile functionality
console.log('🔄 Loading auto-save profile script...');

function loadAutoSaveScript() {
  console.log('📥 Dynamically loading auto-save functionality...');
  
  const script = document.createElement('script');
  script.src = 'auto-save-profile.js';
  script.onload = function() {
    console.log('✅ Auto-save profile script loaded successfully');
  };
  script.onerror = function() {
    console.error('❌ Failed to load auto-save profile script');
  };
  
  document.head.appendChild(script);
}

// Load immediately
loadAutoSaveScript();

console.log('🔄 Auto-save loader initialized');
