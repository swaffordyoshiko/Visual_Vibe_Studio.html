// Test All Profile Fields - Verification script
console.log('🧪 Loading profile fields test...');

// Test function to verify all fields save correctly
window.testAllProfileFields = function() {
  console.log('🧪 Testing all profile fields...');
  
  if (!window.currentUser) {
    console.log('❌ No current user - please sign in first');
    return false;
  }
  
  // Open the profile modal
  if (typeof window.openProfileModal === 'function') {
    window.openProfileModal();
    
    // Wait for modal to open and fields to be added
    setTimeout(() => {
      testFieldsExistence();
      populateTestData();
    }, 1000);
  } else {
    console.log('❌ openProfileModal function not available');
  }
};

function testFieldsExistence() {
  console.log('🧪 Testing field existence...');
  
  const requiredFields = [
    'profileFirstName',
    'profileLastName', 
    'profileEmail',
    'profilePhone',
    'profileCompanyName',
    'profileLocation',
    'emailNotifications',
    'smsNotifications',
    'marketingEmails',
    'designUpdates',
    'projectReminders'
  ];
  
  const results = requiredFields.map(fieldId => {
    const field = document.getElementById(fieldId);
    const exists = !!field;
    console.log(`${exists ? '✅' : '❌'} ${fieldId}: ${exists ? 'Found' : 'Missing'}`);
    return { fieldId, exists };
  });
  
  const existingCount = results.filter(r => r.exists).length;
  console.log(`🧪 Field Test Results: ${existingCount}/${requiredFields.length} fields found`);
  
  return results;
}

function populateTestData() {
  console.log('🧪 Populating test data...');
  
  try {
    // Set test values
    setFieldValue('profileFirstName', 'Test');
    setFieldValue('profileLastName', 'User');
    setFieldValue('profileEmail', 'test@example.com');
    setFieldValue('profilePhone', '(555) 123-4567');
    setFieldValue('profileCompanyName', 'Test Company Inc.');
    setFieldValue('profileLocation', 'Los Angeles, CA');
    
    // Set preferences
    setCheckboxValue('emailNotifications', true);
    setCheckboxValue('smsNotifications', false);
    setCheckboxValue('marketingEmails', true);
    setCheckboxValue('designUpdates', true);
    setCheckboxValue('projectReminders', false);
    
    console.log('✅ Test data populated');
    console.log('🧪 Click "Save Changes" to test saving all fields');
    
  } catch (error) {
    console.error('❌ Error populating test data:', error);
  }
}

function setFieldValue(fieldId, value) {
  const field = document.getElementById(fieldId);
  if (field) {
    field.value = value;
    console.log(`✅ Set ${fieldId} = ${value}`);
  } else {
    console.log(`❌ Field ${fieldId} not found`);
  }
}

function setCheckboxValue(fieldId, value) {
  const field = document.getElementById(fieldId);
  if (field) {
    field.checked = value;
    console.log(`✅ Set ${fieldId} = ${value}`);
  } else {
    console.log(`❌ Checkbox ${fieldId} not found`);
  }
}

// Auto-test when loaded
setTimeout(() => {
  console.log('🧪 Auto-testing profile fields...');
  
  const fieldTests = [
    'profileFirstName',
    'profileLastName', 
    'profileEmail',
    'profilePhone',
    'profileCompanyName'
  ];
  
  console.log('🧪 Checking basic fields...');
  fieldTests.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    console.log(`${field ? '✅' : '❌'} ${fieldId}: ${field ? 'Found' : 'Not found'}`);
  });
  
}, 5000);

console.log('🧪 Profile fields test loaded - use testAllProfileFields() to test everything');
