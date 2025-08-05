// Fix copy button notifications to use modern toast instead of embedded alerts
console.log('🔧 Fixing copy button notifications...');

// Override the copyToClipboard function to use modern toast notifications
window.copyToClipboard = function(text, msg) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        // Use modern toast notification if available
        if (window.toastManager) {
          toastManager.success(msg || "Copied to clipboard!");
        } else {
          alert(msg || "Copied!");
        }
      }).catch(() => {
        // Fallback for older browsers
        fallbackCopyToClipboard(text, msg);
      });
    } else {
      // Use fallback for non-secure contexts
      fallbackCopyToClipboard(text, msg);
    }
  } catch(e) {
    console.error('Copy failed:', e);
    if (window.toastManager) {
      toastManager.error("Copy failed");
    } else {
      alert("Copy failed");
    }
  }
};

// Fallback copy function using document.execCommand
function fallbackCopyToClipboard(text, msg) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
    if (window.toastManager) {
      toastManager.success(msg || "Copied to clipboard!");
    } else {
      alert(msg || "Copied!");
    }
  } catch (err) {
    console.error('Fallback copy failed:', err);
    if (window.toastManager) {
      toastManager.error('Copy failed. Please manually copy the text.');
    } else {
      alert('Copy failed. Please manually copy the text.');
    }
  }

  document.body.removeChild(textArea);
}

console.log('✅ Copy button notifications fixed - now using modern toast system');
