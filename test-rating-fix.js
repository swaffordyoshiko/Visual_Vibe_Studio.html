// Test function for rating conflict fix
console.log('🧪 Loading rating conflict fix test...');

function testRatingConflictFix() {
  console.log('🧪 Testing rating conflict fix...');
  
  // Check if our unified system is working
  if (typeof window.executeUnifiedRatingUpdate === 'function') {
    console.log('✅ Unified rating system found');
    
    // Test the update
    console.log('🔄 Testing manual update...');
    const result = window.executeUnifiedRatingUpdate();
    
    if (result) {
      console.log('✅ Manual update successful');
      return true;
    } else {
      console.error('❌ Manual update failed');
      return false;
    }
  } else {
    console.error('❌ Unified rating system not found');
    return false;
  }
}

// Check current rating element states
function checkRatingElementStates() {
  console.log('���� Checking current rating element states...');
  
  const elements = [
    'customerRating1',
    'averageRating1', 
    'happyCustomersCount',
    'customerSatisfactionPercent'
  ];
  
  elements.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      console.log(`📊 ${id}:`, {
        value: element.textContent,
        isProtected: element.getAttribute('data-protected'),
        protectedValue: element.getAttribute('data-protected-value'),
        isUpdated: element.getAttribute('data-updated'),
        dataValue: element.getAttribute('data-value')
      });
    } else {
      console.warn(`⚠️ Element ${id} not found`);
    }
  });
}

// Make functions globally available
window.testRatingConflictFix = testRatingConflictFix;
window.checkRatingElementStates = checkRatingElementStates;

// Auto-run check on load
setTimeout(() => {
  console.log('🔍 Auto-checking rating element states...');
  checkRatingElementStates();
}, 3000);

console.log('🧪 Rating conflict fix test loaded. Use testRatingConflictFix() to test manually.');
