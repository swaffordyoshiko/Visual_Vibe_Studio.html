// Debug rating calculation accuracy
console.log('🔍 Loading rating accuracy debugger...');

function debugCurrentRatings() {
  console.log('🔍 === RATING ACCURACY DEBUG ===');
  
  // Get the testimonials grid
  const testimonialsGrid = document.getElementById('allCustomerReviews');
  if (!testimonialsGrid) {
    console.error('❌ Testimonials grid not found');
    return null;
  }
  
  console.log('📊 Found testimonials grid with', testimonialsGrid.children.length, 'children');
  
  // Analyze each review in detail
  const allReviews = Array.from(testimonialsGrid.children);
  let totalRatingSum = 0;
  let reviewCount = 0;
  let satisfiedCount = 0;
  
  console.log('📝 === INDIVIDUAL REVIEW ANALYSIS ===');
  
  allReviews.forEach((review, index) => {
    console.log(`\n📝 Review ${index + 1}:`);
    console.log('  HTML snippet:', review.outerHTML.substring(0, 200) + '...');
    
    let rating = 0;
    let reviewerName = 'Unknown';
    let reviewText = '';
    
    // Extract reviewer name
    const nameElement = review.querySelector('h4, .font-semibold');
    if (nameElement) {
      reviewerName = nameElement.textContent.trim();
    }
    
    // Extract review text
    const textElement = review.querySelector('p');
    if (textElement) {
      reviewText = textElement.textContent.trim().substring(0, 50) + '...';
    }
    
    // Try multiple methods to extract rating
    
    // Method 1: Look for star emoji in yellow text
    const yellowStars = review.querySelector('.text-yellow-400, .text-yellow-500');
    if (yellowStars) {
      const starsText = yellowStars.textContent || yellowStars.innerHTML;
      const starMatches = starsText.match(/⭐/g);
      if (starMatches) {
        rating = starMatches.length;
        console.log(`  ⭐ Method 1 (yellow stars): ${rating} stars from "${starsText}"`);
      }
    }
    
    // Method 2: Look for star classes or data attributes
    if (rating === 0) {
      const ratingElement = review.querySelector('[data-rating]');
      if (ratingElement) {
        rating = parseInt(ratingElement.getAttribute('data-rating')) || 0;
        console.log(`  ⭐ Method 2 (data-rating): ${rating} stars`);
      }
    }
    
    // Method 3: Look for any star content
    if (rating === 0) {
      const allText = review.textContent;
      const starMatches = allText.match(/⭐/g);
      if (starMatches) {
        rating = starMatches.length;
        console.log(`  ⭐ Method 3 (all text): ${rating} stars from text content`);
      }
    }
    
    // Method 4: Default to 5 for static reviews (assume high quality)
    if (rating === 0) {
      rating = 5;
      console.log(`  ⭐ Method 4 (default): ${rating} stars (assumed for static review)`);
    }
    
    console.log(`  👤 Name: ${reviewerName}`);
    console.log(`  📝 Text: ${reviewText}`);
    console.log(`  ⭐ Final Rating: ${rating} stars`);
    console.log(`  🎯 Is Dynamic: ${review.hasAttribute('data-dynamic-review')}`);
    
    totalRatingSum += rating;
    reviewCount++;
    
    if (rating >= 4) {
      satisfiedCount++;
    }
  });
  
  // Calculate metrics
  const avgRating = reviewCount > 0 ? (totalRatingSum / reviewCount).toFixed(1) : '5.0';
  const satisfactionPercent = reviewCount > 0 ? Math.round((satisfiedCount / reviewCount) * 100) : 98;
  
  console.log('\n📊 === CALCULATED METRICS ===');
  console.log(`Total reviews: ${reviewCount}`);
  console.log(`Total rating sum: ${totalRatingSum}`);
  console.log(`Average rating: ${avgRating}`);
  console.log(`Satisfied customers (4+ stars): ${satisfiedCount}`);
  console.log(`Satisfaction percentage: ${satisfactionPercent}%`);
  
  // Compare with current display
  console.log('\n🔍 === CURRENT DISPLAY COMPARISON ===');
  const currentElements = {
    happyCustomers: document.getElementById('happyCustomersCount'),
    customerRating: document.getElementById('customerRating1'),
    averageRating: document.getElementById('averageRating1'),
    satisfaction: document.getElementById('customerSatisfactionPercent')
  };
  
  Object.entries(currentElements).forEach(([key, element]) => {
    if (element) {
      const currentValue = element.textContent;
      console.log(`${key}: Current="${currentValue}" Element=`, element);
    } else {
      console.log(`${key}: ❌ Element not found`);
    }
  });
  
  // Check if values are accurate
  console.log('\n✅ === ACCURACY CHECK ===');
  const expectedValues = {
    happyCustomers: reviewCount.toString(),
    customerRating: avgRating,
    averageRating: avgRating,
    satisfaction: satisfactionPercent + '%'
  };
  
  Object.entries(expectedValues).forEach(([key, expectedValue]) => {
    const element = currentElements[key.replace('Rating', 'Rating')];
    if (element) {
      const currentValue = element.textContent;
      const isAccurate = currentValue === expectedValue;
      console.log(`${key}: Expected="${expectedValue}" Current="${currentValue}" ${isAccurate ? '✅' : '❌'}`);
    }
  });
  
  return {
    reviewCount,
    totalRatingSum,
    avgRating,
    satisfiedCount,
    satisfactionPercent,
    expectedValues
  };
}

// Fix inaccurate ratings
function fixInaccurateRatings() {
  console.log('🔧 Fixing inaccurate ratings...');
  
  const debug = debugCurrentRatings();
  if (!debug) {
    console.error('❌ Could not debug ratings');
    return false;
  }
  
  // Update elements with correct values
  const updates = [
    { id: 'happyCustomersCount', value: debug.reviewCount.toString() },
    { id: 'customerRating1', value: debug.avgRating },
    { id: 'averageRating1', value: debug.avgRating },
    { id: 'customerSatisfactionPercent', value: debug.satisfactionPercent + '%' }
  ];
  
  console.log('🔄 Applying corrections...');
  
  updates.forEach(({ id, value }) => {
    const element = document.getElementById(id);
    if (element) {
      const oldValue = element.textContent;
      element.textContent = value;
      
      // Visual feedback
      element.style.transition = 'all 0.5s ease';
      element.style.backgroundColor = '#F59E0B';
      element.style.color = 'white';
      element.style.padding = '2px 6px';
      element.style.borderRadius = '4px';
      
      setTimeout(() => {
        element.style.backgroundColor = '';
        element.style.color = '';
        element.style.padding = '';
        element.style.borderRadius = '';
      }, 2000);
      
      console.log(`✅ Corrected ${id}: "${oldValue}" → "${value}"`);
    } else {
      console.error(`❌ Element ${id} not found`);
    }
  });
  
  // Show success message
  if (window.toastManager) {
    window.toastManager.success(`Ratings corrected! ${debug.avgRating}/5 from ${debug.reviewCount} reviews`, { 
      duration: 4000 
    });
  }
  
  return true;
}

// Check for localStorage reviews
function checkLocalStorageReviews() {
  console.log('💾 Checking localStorage reviews...');
  
  try {
    const storedReviews = JSON.parse(localStorage.getItem('visualVibeReviews') || '[]');
    console.log(`📱 Found ${storedReviews.length} reviews in localStorage`);
    
    storedReviews.forEach((review, index) => {
      console.log(`  Review ${index + 1}: ${review.name} - ${review.rating} stars - "${review.text.substring(0, 30)}..."`);
    });
    
    return storedReviews;
  } catch (error) {
    console.error('❌ Error reading localStorage reviews:', error);
    return [];
  }
}

// Make functions globally available
window.debugCurrentRatings = debugCurrentRatings;
window.fixInaccurateRatings = fixInaccurateRatings;
window.checkLocalStorageReviews = checkLocalStorageReviews;

// Auto-run debug on load
setTimeout(() => {
  console.log('🔍 Auto-running rating accuracy debug...');
  debugCurrentRatings();
  checkLocalStorageReviews();
}, 3000);

console.log('🔍 Rating accuracy debugger loaded. Use fixInaccurateRatings() to correct values.');
