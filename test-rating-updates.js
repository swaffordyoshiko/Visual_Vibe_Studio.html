// Manual test functions for rating updates
console.log('🧪 Loading rating update test functions...');

// Function to manually test rating updates
function testRatingUpdate() {
  console.log('🧪 MANUAL TEST: Testing rating update system...');
  
  if (typeof window.executeRatingUpdate === 'function') {
    window.executeRatingUpdate();
    console.log('✅ Manual rating update triggered');
  } else {
    console.error('❌ executeRatingUpdate function not available');
  }
}

// Function to simulate adding a test review
function addTestReview() {
  console.log('🧪 Adding test review...');
  
  const testReview = {
    name: 'Test Customer',
    businessType: 'Test Business',
    service: 'Website Design',
    text: 'This is a test review to check if ratings update properly.',
    rating: 4,
    timestamp: new Date().toISOString(),
    date: new Date().toLocaleDateString()
  };
  
  if (typeof window.addReviewToTestimonials === 'function') {
    window.addReviewToTestimonials(testReview);
    console.log('✅ Test review added');
  } else {
    console.error('❌ addReviewToTestimonials function not available');
  }
}

// Function to show current ratings info
function showCurrentRatings() {
  console.log('📊 CURRENT RATINGS INFO:');
  
  const elements = {
    customerRating: document.getElementById('customerRating1'),
    averageRating: document.getElementById('averageRating1'),
    happyCustomers: document.getElementById('happyCustomersCount'),
    satisfaction: document.getElementById('customerSatisfactionPercent')
  };
  
  console.log('DOM Elements found:');
  Object.entries(elements).forEach(([key, element]) => {
    if (element) {
      console.log(`  ${key}: "${element.textContent}" (updated: ${element.getAttribute('data-updated')})`);
    } else {
      console.log(`  ${key}: NOT FOUND`);
    }
  });
  
  const testimonialsGrid = document.getElementById('allCustomerReviews');
  if (testimonialsGrid) {
    console.log(`Total review elements: ${testimonialsGrid.children.length}`);
    
    const dynamicReviews = testimonialsGrid.querySelectorAll('[data-dynamic-review="true"]');
    console.log(`Dynamic reviews: ${dynamicReviews.length}`);
  } else {
    console.log('Testimonials grid: NOT FOUND');
  }
}

// Make functions globally available for console testing
window.testRatingUpdate = testRatingUpdate;
window.addTestReview = addTestReview;
window.showCurrentRatings = showCurrentRatings;

// Show available test functions
console.log('🧪 Rating update test functions available:');
console.log('  - testRatingUpdate() - Manually trigger rating update');
console.log('  - addTestReview() - Add a test review');
console.log('  - showCurrentRatings() - Show current rating values');
console.log('  - executeRatingUpdate() - Force complete rating recalculation');

// Auto-show current ratings on load
setTimeout(showCurrentRatings, 3000);
