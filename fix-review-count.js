// Fix incorrect review count display
console.log('📊 Loading review count fix...');

function getActualReviewCount() {
  console.log('🔍 Counting actual reviews in display...');
  
  const testimonialsGrid = document.getElementById('allCustomerReviews');
  if (!testimonialsGrid) {
    console.error('❌ Testimonials grid not found');
    return 0;
  }
  
  const allElements = Array.from(testimonialsGrid.children);
  console.log(`📋 Found ${allElements.length} total elements in testimonials grid`);
  
  let validReviewCount = 0;
  let staticReviewCount = 0;
  let dynamicReviewCount = 0;
  
  allElements.forEach((element, index) => {
    console.log(`\n📝 Analyzing element ${index + 1}:`);
    
    // Check if element has actual content
    const hasContent = element.textContent && element.textContent.trim().length > 10;
    const hasReviewStructure = element.querySelector('h4, .font-semibold') || element.querySelector('p');
    const isDynamic = element.hasAttribute('data-dynamic-review');
    
    console.log(`  Has content: ${hasContent}`);
    console.log(`  Has review structure: ${!!hasReviewStructure}`);
    console.log(`  Is dynamic: ${isDynamic}`);
    console.log(`  Classes: ${element.className}`);
    console.log(`  Text preview: "${element.textContent.substring(0, 50)}..."`);
    
    if (hasContent && hasReviewStructure) {
      validReviewCount++;
      
      if (isDynamic) {
        dynamicReviewCount++;
        console.log(`  ✅ Valid DYNAMIC review #${dynamicReviewCount}`);
      } else {
        staticReviewCount++;
        console.log(`  ✅ Valid STATIC review #${staticReviewCount}`);
      }
    } else {
      console.log(`  ⏭️ Skipping invalid element`);
    }
  });
  
  console.log(`\n📊 REVIEW COUNT SUMMARY:`);
  console.log(`  Total valid reviews: ${validReviewCount}`);
  console.log(`  Static reviews: ${staticReviewCount}`);
  console.log(`  Dynamic reviews: ${dynamicReviewCount}`);
  
  return {
    total: validReviewCount,
    static: staticReviewCount,
    dynamic: dynamicReviewCount
  };
}

function calculateCorrectRatingsFromCount() {
  console.log('🎯 Calculating correct ratings based on actual review count...');
  
  const reviewCount = getActualReviewCount();
  if (reviewCount.total === 0) {
    console.warn('⚠️ No valid reviews found');
    return null;
  }
  
  const testimonialsGrid = document.getElementById('allCustomerReviews');
  const allElements = Array.from(testimonialsGrid.children);
  
  let totalRatingSum = 0;
  let satisfiedCount = 0;
  let processedCount = 0;
  
  allElements.forEach((element, index) => {
    // Only process valid review elements
    const hasContent = element.textContent && element.textContent.trim().length > 10;
    const hasReviewStructure = element.querySelector('h4, .font-semibold') || element.querySelector('p');
    
    if (!hasContent || !hasReviewStructure) {
      return; // Skip invalid elements
    }
    
    let rating = 5; // Default for static reviews
    
    // Try to extract actual rating
    const yellowStars = element.querySelector('.text-yellow-400, .text-yellow-500');
    if (yellowStars) {
      const starsText = yellowStars.textContent || yellowStars.innerHTML;
      const starMatches = starsText.match(/⭐/g);
      if (starMatches && starMatches.length > 0) {
        rating = starMatches.length;
        console.log(`⭐ Review ${processedCount + 1}: ${rating} stars (extracted from stars)`);
      }
    } else {
      console.log(`📄 Review ${processedCount + 1}: ${rating} stars (default)`);
    }
    
    totalRatingSum += rating;
    processedCount++;
    
    if (rating >= 4) {
      satisfiedCount++;
    }
  });
  
  const avgRating = processedCount > 0 ? (totalRatingSum / processedCount).toFixed(1) : '5.0';
  const satisfactionPercent = processedCount > 0 ? Math.round((satisfiedCount / processedCount) * 100) : 100;
  
  console.log(`📊 CORRECT CALCULATIONS:`);
  console.log(`  Processed reviews: ${processedCount}`);
  console.log(`  Total rating sum: ${totalRatingSum}`);
  console.log(`  Average rating: ${avgRating}`);
  console.log(`  Satisfied customers: ${satisfiedCount}`);
  console.log(`  Satisfaction percentage: ${satisfactionPercent}%`);
  
  return {
    totalReviews: processedCount,
    avgRating: parseFloat(avgRating),
    avgRatingString: avgRating,
    satisfaction: satisfactionPercent,
    rawCounts: reviewCount
  };
}

function updateDisplayWithCorrectCounts() {
  console.log('🔄 Updating display with correct review counts...');
  
  const correct = calculateCorrectRatingsFromCount();
  if (!correct) {
    console.error('❌ Could not calculate correct ratings');
    return false;
  }
  
  const updates = [
    { 
      id: 'happyCustomersCount', 
      value: correct.totalReviews.toString(), 
      description: 'Happy Customers Count'
    },
    { 
      id: 'customerRating1', 
      value: correct.avgRatingString, 
      description: 'Customer Rating'
    },
    { 
      id: 'averageRating1', 
      value: correct.avgRatingString, 
      description: 'Average Rating'
    },
    { 
      id: 'customerSatisfactionPercent', 
      value: correct.satisfaction + '%', 
      description: 'Customer Satisfaction'
    }
  ];
  
  let updatedCount = 0;
  
  updates.forEach(({ id, value, description }) => {
    const element = document.getElementById(id);
    if (element) {
      const oldValue = element.textContent;
      
      if (oldValue !== value) {
        element.textContent = value;
        element.setAttribute('data-correct-count', 'true');
        element.setAttribute('data-correct-value', value);
        
        // Purple highlighting for count corrections
        element.style.transition = 'all 0.6s ease';
        element.style.backgroundColor = '#8B5CF6';
        element.style.color = 'white';
        element.style.padding = '3px 8px';
        element.style.borderRadius = '6px';
        element.style.fontWeight = 'bold';
        element.style.boxShadow = '0 2px 8px rgba(139, 92, 246, 0.3)';
        
        setTimeout(() => {
          element.style.backgroundColor = '';
          element.style.color = '';
          element.style.padding = '';
          element.style.borderRadius = '';
          element.style.fontWeight = '';
          element.style.boxShadow = '';
        }, 3000);
        
        console.log(`🔢 CORRECTED ${description}: "${oldValue}" → "${value}"`);
        updatedCount++;
      } else {
        console.log(`✅ ${description} already correct: "${value}"`);
      }
    } else {
      console.error(`❌ Element ${id} not found`);
    }
  });
  
  if (updatedCount > 0) {
    console.log(`🎯 Fixed ${updatedCount} incorrect counts`);
    
    if (window.toastManager) {
      window.toastManager.info(`Review counts corrected! Now showing ${correct.avgRatingString}/5 from ${correct.totalReviews} reviews`, { 
        duration: 5000 
      });
    }
    
    // Log detailed breakdown
    console.log(`📋 FINAL BREAKDOWN:`);
    console.log(`  Static reviews: ${correct.rawCounts.static}`);
    console.log(`  Dynamic reviews: ${correct.rawCounts.dynamic}`);
    console.log(`  Total valid: ${correct.rawCounts.total}`);
  } else {
    console.log('✅ All counts were already correct');
  }
  
  return updatedCount > 0;
}

// Override other counting functions to use this accurate method
function overrideCountingFunctions() {
  console.log('🔧 Overriding counting functions with accurate count method...');
  
  // Override unified rating calculation
  const originalUnified = window.executeUnifiedRatingUpdate;
  window.executeUnifiedRatingUpdate = function() {
    console.log('🔢 Using correct count method in unified update');
    return updateDisplayWithCorrectCounts();
  };
  
  // Override other rating functions
  window.calculateAndShowCurrentRatings = function() {
    console.log('🔢 Using correct count method in current ratings');
    return updateDisplayWithCorrectCounts();
  };
  
  window.updateCurrentRatings = function() {
    console.log('🔢 Using correct count method in update current');
    return updateDisplayWithCorrectCounts();
  };
  
  console.log('✅ Count method overrides installed');
}

// Initialize correct review counting
function initializeCorrectCounting() {
  console.log('🚀 Initializing correct review counting system...');
  
  setTimeout(() => {
    // Override functions to use correct counting
    overrideCountingFunctions();
    
    // Update display with correct counts
    updateDisplayWithCorrectCounts();
    
    // Set up monitoring for changes
    const testimonialsGrid = document.getElementById('allCustomerReviews');
    if (testimonialsGrid) {
      const observer = new MutationObserver(() => {
        console.log('📝 Reviews changed, recounting...');
        setTimeout(updateDisplayWithCorrectCounts, 500);
      });
      
      observer.observe(testimonialsGrid, {
        childList: true,
        subtree: true
      });
      
      console.log('👁️ Review count monitoring active');
    }
    
    console.log('✅ Correct review counting system active');
  }, 1500);
}

// Make functions globally available
window.getActualReviewCount = getActualReviewCount;
window.calculateCorrectRatingsFromCount = calculateCorrectRatingsFromCount;
window.updateDisplayWithCorrectCounts = updateDisplayWithCorrectCounts;

// Test function
window.testReviewCounting = function() {
  console.log('🧪 Testing review counting system...');
  
  const counts = getActualReviewCount();
  const ratings = calculateCorrectRatingsFromCount();
  
  console.log('📊 Test results:', { counts, ratings });
  
  updateDisplayWithCorrectCounts();
  
  return { counts, ratings };
};

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCorrectCounting);
} else {
  initializeCorrectCounting();
}

setTimeout(initializeCorrectCounting, 2000);

console.log('📊 Review count fix loaded - will display accurate review counts');
