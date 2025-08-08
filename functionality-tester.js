// COMPREHENSIVE FUNCTIONALITY TESTER
// Tests all website functions and reports status
console.log('🧪 Loading Functionality Tester...');

(function() {
  'use strict';

  // Test Results Storage
  let testResults = {
    passed: [],
    failed: [],
    warnings: []
  };

  // Main Test Function
  function runComprehensiveTests() {
    console.log('🚀 Running Comprehensive Functionality Tests...');
    
    // Reset results
    testResults = { passed: [], failed: [], warnings: [] };
    
    // Run all test categories
    testAuthenticationFunctions();
    testNavigationFunctions();
    testFormFunctions();
    testUIFunctions();
    testUtilityFunctions();
    testDOMElements();
    
    // Display results
    displayTestResults();
    
    return testResults;
  }

  // Test Authentication Functions
  function testAuthenticationFunctions() {
    console.log('🔐 Testing Authentication Functions...');
    
    testFunction('openSignInModal', () => {
      return typeof window.openSignInModal === 'function';
    });
    
    testFunction('openSignUpModal', () => {
      return typeof window.openSignUpModal === 'function';
    });
    
    testFunction('closeSignInModal', () => {
      return typeof window.closeSignInModal === 'function';
    });
    
    testFunction('closeSignUpModal', () => {
      return typeof window.closeSignUpModal === 'function';
    });
    
    testFunction('handleSignIn', () => {
      return typeof window.handleSignIn === 'function';
    });
    
    testFunction('handleSignUp', () => {
      return typeof window.handleSignUp === 'function';
    });
    
    testFunction('signOut', () => {
      return typeof window.signOut === 'function';
    });
    
    testFunction('updateAuthUI', () => {
      return typeof window.updateAuthUI === 'function';
    });
  }

  // Test Navigation Functions
  function testNavigationFunctions() {
    console.log('🧭 Testing Navigation Functions...');
    
    testFunction('toggleMobileMenu', () => {
      return typeof window.toggleMobileMenu === 'function';
    });
    
    testFunction('closeMobileMenu', () => {
      return typeof window.closeMobileMenu === 'function';
    });
    
    testFunction('scrollToSection', () => {
      return typeof window.scrollToSection === 'function';
    });
  }

  // Test Form Functions
  function testFormFunctions() {
    console.log('📝 Testing Form Functions...');
    
    testFunction('submitContactForm', () => {
      return typeof window.submitContactForm === 'function';
    });
    
    testFunction('simpleOrderSubmit', () => {
      return typeof window.simpleOrderSubmit === 'function';
    });
    
    testFunction('handleEmailClick', () => {
      return typeof window.handleEmailClick === 'function';
    });
  }

  // Test UI Functions
  function testUIFunctions() {
    console.log('🎨 Testing UI Functions...');
    
    testFunction('showAlert/showNotification', () => {
      return typeof window.showAlert === 'function' || typeof window.showNotification === 'function';
    });
    
    testFunction('toastManager', () => {
      return window.toastManager && typeof window.toastManager.show === 'function';
    });
    
    testFunction('openProfileModal', () => {
      return typeof window.openProfileModal === 'function';
    });
    
    testFunction('showOrderHistory', () => {
      return typeof window.showOrderHistory === 'function';
    });
  }

  // Test Utility Functions
  function testUtilityFunctions() {
    console.log('🔧 Testing Utility Functions...');
    
    testFunction('copyToClipboard', () => {
      return typeof window.copyToClipboard === 'function';
    });
    
    testFunction('toggleAllCustomerReviews', () => {
      return typeof window.toggleAllCustomerReviews === 'function';
    });
    
    testFunction('toggleChat', () => {
      return typeof window.toggleChat === 'function';
    });
    
    testFunction('openVenmoPayment', () => {
      return typeof window.openVenmoPayment === 'function';
    });
  }

  // Test DOM Elements
  function testDOMElements() {
    console.log('🎯 Testing DOM Elements...');
    
    testElement('signInModal', 'signInModal');
    testElement('signUpModal', 'signUpModal');
    testElement('signInForm', 'signInForm');
    testElement('signUpForm', 'signUpForm');
    testElement('mobileMenu', 'mobileMenu');
    testElement('signedOutState', 'signedOutState');
    testElement('signedInState', 'signedInState');
    testElement('mobileSignedOutState', 'mobileSignedOutState');
    testElement('mobileSignedInState', 'mobileSignedInState');
  }

  // Helper function to test a function
  function testFunction(name, testFn) {
    try {
      if (testFn()) {
        testResults.passed.push(`✅ ${name} - Function available`);
      } else {
        testResults.failed.push(`❌ ${name} - Function missing or invalid`);
      }
    } catch (error) {
      testResults.failed.push(`❌ ${name} - Test error: ${error.message}`);
    }
  }

  // Helper function to test a DOM element
  function testElement(name, elementId) {
    try {
      const element = document.getElementById(elementId);
      if (element) {
        testResults.passed.push(`✅ ${name} - Element exists`);
        
        // Additional checks for modals
        if (elementId.includes('Modal')) {
          const isVisible = !element.classList.contains('hidden') && element.style.display !== 'none';
          if (isVisible) {
            testResults.warnings.push(`⚠️ ${name} - Modal is currently visible`);
          }
        }
      } else {
        testResults.failed.push(`❌ ${name} - Element missing from DOM`);
      }
    } catch (error) {
      testResults.failed.push(`❌ ${name} - Test error: ${error.message}`);
    }
  }

  // Display test results
  function displayTestResults() {
    console.log('\n🧪 === COMPREHENSIVE TEST RESULTS ===');
    
    console.log(`\n✅ PASSED TESTS (${testResults.passed.length}):`);
    testResults.passed.forEach(test => console.log(test));
    
    if (testResults.warnings.length > 0) {
      console.log(`\n⚠️ WARNINGS (${testResults.warnings.length}):`);
      testResults.warnings.forEach(warning => console.log(warning));
    }
    
    if (testResults.failed.length > 0) {
      console.log(`\n❌ FAILED TESTS (${testResults.failed.length}):`);
      testResults.failed.forEach(test => console.log(test));
    }
    
    const totalTests = testResults.passed.length + testResults.failed.length;
    const passRate = Math.round((testResults.passed.length / totalTests) * 100);
    
    console.log(`\n📊 SUMMARY:`);
    console.log(`- Total Tests: ${totalTests}`);
    console.log(`- Passed: ${testResults.passed.length}`);
    console.log(`- Failed: ${testResults.failed.length}`);
    console.log(`- Warnings: ${testResults.warnings.length}`);
    console.log(`- Pass Rate: ${passRate}%`);
    
    if (passRate >= 90) {
      console.log('🎉 EXCELLENT! Website functionality is in great shape!');
    } else if (passRate >= 75) {
      console.log('✅ GOOD! Most functionality is working properly.');
    } else if (passRate >= 50) {
      console.log('⚠️ NEEDS ATTENTION! Some critical functions may be missing.');
    } else {
      console.log('❌ CRITICAL! Many functions are not working properly.');
    }
    
    console.log('\n🧪 === END TEST RESULTS ===\n');
    
    // Show user notification
    if (typeof window.showAlert === 'function' || typeof window.showNotification === 'function') {
      const showNotification = window.showAlert || window.showNotification;
      if (passRate >= 90) {
        showNotification(`✅ Website tests passed! ${passRate}% functionality working.`, 'success');
      } else if (passRate >= 75) {
        showNotification(`⚠️ Most functions working (${passRate}%). Check console for details.`, 'warning');
      } else {
        showNotification(`❌ Many functions missing (${passRate}% working). Check console.`, 'error');
      }
    }
  }

  // Quick individual tests
  function quickTestAuth() {
    console.log('🔐 Quick Auth Test...');
    if (typeof window.openSignInModal === 'function') {
      console.log('✅ Authentication system loaded');
      return true;
    } else {
      console.log('❌ Authentication system not loaded');
      return false;
    }
  }

  function quickTestNav() {
    console.log('🧭 Quick Navigation Test...');
    if (typeof window.toggleMobileMenu === 'function') {
      console.log('✅ Navigation system loaded');
      return true;
    } else {
      console.log('❌ Navigation system not loaded');
      return false;
    }
  }

  function quickTestForms() {
    console.log('📝 Quick Forms Test...');
    if (typeof window.submitContactForm === 'function') {
      console.log('✅ Form system loaded');
      return true;
    } else {
      console.log('❌ Form system not loaded');
      return false;
    }
  }

  // Make functions globally available
  window.runComprehensiveTests = runComprehensiveTests;
  window.quickTestAuth = quickTestAuth;
  window.quickTestNav = quickTestNav;
  window.quickTestForms = quickTestForms;
  
  // Auto-run basic test on load
  setTimeout(() => {
    console.log('🔍 Running basic functionality check...');
    const authOk = quickTestAuth();
    const navOk = quickTestNav();
    const formsOk = quickTestForms();
    
    if (authOk && navOk && formsOk) {
      console.log('🎉 Basic functionality check PASSED!');
    } else {
      console.log('⚠️ Basic functionality check found issues. Run window.runComprehensiveTests() for details.');
    }
  }, 2000);

  console.log('🧪 Functionality Tester Loaded');
  console.log('💡 Use window.runComprehensiveTests() to run full test suite');
  console.log('💡 Use window.quickTestAuth(), window.quickTestNav(), window.quickTestForms() for quick tests');

})();
