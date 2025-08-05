// Final validation that everything is working
console.log('🔍 Final check script loading...');

document.addEventListener('DOMContentLoaded', function() {
  console.log('📋 Final validation checklist:');
  console.log('- Form element:', !!document.getElementById('orderForm'));
  console.log('- Submit button:', !!document.getElementById('submitOrderBtn'));
  console.log('- simpleOrderSubmit function:', typeof window.simpleOrderSubmit);
  console.log('- Toast manager:', typeof window.toastManager);
  
  if (typeof window.simpleOrderSubmit !== 'function') {
    console.error('❌ CRITICAL: simpleOrderSubmit function not found!');
  } else {
    console.log('✅ All systems ready for order submission');
  }
});

// Extra safety: prevent any form submissions
document.addEventListener('submit', function(e) {
  if (e.target.id === 'orderForm') {
    console.log('🛑 Form submission intercepted and prevented');
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
});
