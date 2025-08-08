// INJECT FINAL AUTH OVERRIDE INTO ANY PAGE
(function() {
  console.log('🚀 Injecting Final Auth Override...');
  
  // Create and inject the final auth script
  const script = document.createElement('script');
  script.src = 'FINAL-AUTH-OVERRIDE.js';
  script.onload = function() {
    console.log('✅ Final Auth Override injected successfully!');
  };
  script.onerror = function() {
    console.error('❌ Failed to inject Final Auth Override');
  };
  
  // Inject at the end of head or body
  const target = document.head || document.body || document.documentElement;
  if (target) {
    target.appendChild(script);
  }
  
  // Also try direct injection if file loading fails
  setTimeout(() => {
    if (typeof window.openSignInModal !== 'function' || !window.openSignInModal.toString().includes('FINAL:')) {
      console.log('🔄 Loading auth override via fetch...');
      
      fetch('FINAL-AUTH-OVERRIDE.js')
        .then(response => response.text())
        .then(code => {
          const scriptEl = document.createElement('script');
          scriptEl.textContent = code;
          document.head.appendChild(scriptEl);
          console.log('✅ Final Auth Override loaded via fetch');
        })
        .catch(error => {
          console.error('❌ Failed to fetch auth override:', error);
        });
    }
  }, 1000);
})();
