// Simple Zapier Fix - Direct webhook integration
console.log('🚀 Simple Zapier fix loaded');

// Zapier webhook URLs - Contact form uses u4i7xid, Order form uses u4a5f95
const ZAPIER_CONTACT_WEBHOOK = 'https://hooks.zapier.com/hooks/catch/24056566/u4i7xid/';
const ZAPIER_ORDER_WEBHOOK = 'https://hooks.zapier.com/hooks/catch/24056566/u4a5f95/';

// Validate webhook URLs
function validateZapierWebhooks() {
  console.log('🔍 Validating Zapier webhook URLs...');

  const webhooks = {
    'Contact Form (SMS)': ZAPIER_CONTACT_WEBHOOK,
    'Order Form (Email)': ZAPIER_ORDER_WEBHOOK
  };

  Object.entries(webhooks).forEach(([name, url]) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === 'hooks.zapier.com' && urlObj.pathname.includes('/hooks/catch/')) {
        console.log(`✅ ${name}: URL format valid - ${url}`);
      } else {
        console.log(`❌ ${name}: Invalid URL format - ${url}`);
      }
    } catch (error) {
      console.log(`❌ ${name}: Malformed URL - ${url}`);
    }
  });
}

// Run validation on load
validateZapierWebhooks();

// Contact form submission to Zapier using SAME IFRAME METHOD AS ORDER FORM
let lastContactSubmission = 0;
window.submitContactFormToZapier = async function(formData) {
  console.log('🚀 ZAPIER FUNCTION: submitContactFormToZapier called with:', formData);

  // Prevent duplicate submissions within 5 seconds
  const now = Date.now();
  if (now - lastContactSubmission < 5000) {
    console.log('⚠️ ZAPIER FUNCTION: Contact form submission blocked - too soon since last submission');
    return { success: false, error: 'Duplicate submission prevented' };
  }
  lastContactSubmission = now;

  console.log('📱 ZAPIER FUNCTION: Submitting contact form to Zapier for SMS using IFRAME METHOD...');
  console.log('📊 ZAPIER FUNCTION: Contact form data to submit:', formData);
  console.log('🔗 ZAPIER FUNCTION: Webhook URL:', ZAPIER_CONTACT_WEBHOOK);

  // Use EXACT SAME IFRAME METHOD as the working order form
  return new Promise((resolve) => {
    try {
      // Create a temporary form that submits to Zapier - SAME AS ORDER FORM
      console.log('🏗️ ZAPIER FUNCTION: Creating temporary form...');
      const tempForm = document.createElement('form');
      tempForm.method = 'POST';
      tempForm.action = ZAPIER_CONTACT_WEBHOOK;
      tempForm.style.display = 'none';

      // Add all form fields as hidden inputs - ENSURE ALL ZAPIER FIELDS HAVE VALUES
      const fields = {
        customer_name: formData.customer_name || 'Not Provided',
        customer_email: formData.customer_email || 'not-provided@example.com',
        customer_mobile: formData.customer_mobile || 'Not Provided',
        response_preference: formData.response_preference || 'text',
        project_type: formData.project_type || 'general_inquiry',
        urgency: formData.urgency || 'medium',
        customer_message: formData.customer_message || 'No additional message provided',
        submission_type: 'Contact Form',
        timestamp: new Date().toISOString(),
        source: formData.source || 'Visual Vibe Studio Website'
      };

      console.log('📝 ZAPIER FUNCTION: Adding fields to form:', fields);

      Object.keys(fields).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = fields[key];
        tempForm.appendChild(input);
        console.log(`  ✅ Added field: ${key} = ${fields[key]}`);
      });

      // Create a hidden iframe to capture the submission - SAME AS ORDER FORM
      console.log('🖼️ ZAPIER FUNCTION: Creating iframe...');
      const iframe = document.createElement('iframe');
      iframe.name = 'zapier_contact_submit_' + Date.now();
      iframe.style.display = 'none';
      tempForm.target = iframe.name;

      console.log('🔗 ZAPIER FUNCTION: Appending iframe and form to DOM...');
      document.body.appendChild(iframe);
      document.body.appendChild(tempForm);

      // Submit the form - SAME AS ORDER FORM
      console.log('📤 ZAPIER FUNCTION: Submitting form to Zapier webhook:', ZAPIER_CONTACT_WEBHOOK);
      console.log('📤 ZAPIER FUNCTION: Form action:', tempForm.action);
      console.log('📤 ZAPIER FUNCTION: Form method:', tempForm.method);
      console.log('📤 ZAPIER FUNCTION: Form target iframe:', tempForm.target);

      tempForm.submit();
      console.log('🚀 ZAPIER FUNCTION: Form submitted!');

      // Set up tracking for submission completion - SAME AS ORDER FORM
      let submissionCompleted = false;

      // Listen for iframe events (limited due to CORS but helps with cleanup)
      iframe.onload = () => {
        if (!submissionCompleted) {
          submissionCompleted = true;
          console.log('✅ Contact form iframe loaded - submission likely successful');
        }
      };

      // Clean up after a delay and resolve - SAME AS ORDER FORM
      setTimeout(() => {
        if (tempForm.parentNode) document.body.removeChild(tempForm);
        if (iframe.parentNode) document.body.removeChild(iframe);

        if (!submissionCompleted) {
          console.log('⚠️ Contact form submission completed (no iframe confirmation)');
        }
        console.log('✅ Contact form submitted to Zapier via iframe POST');
        resolve({ success: true });
      }, 3000);

    } catch (error) {
      console.log('❌ Contact form Zapier iframe error:', error.message);
      resolve({ success: false, error: error.message });
    }
  });
};

// Simplified fetch with no-cors mode (most reliable for webhooks)
async function tryFetchNoCors(formData) {
  console.log('📤 Submitting to Zapier webhook via fetch no-cors...');

  const fields = {
    customer_name: formData.customer_name || '',
    customer_email: formData.customer_email || '',
    customer_mobile: formData.customer_mobile || '',
    response_preference: formData.response_preference || '',
    project_type: formData.project_type || '',
    urgency: formData.urgency || '',
    customer_message: formData.customer_message || '',
    submission_type: 'Contact Form',
    timestamp: new Date().toISOString()
  };

  const submitData = new FormData();
  Object.keys(fields).forEach(key => {
    submitData.append(key, fields[key]);
  });

  try {
    const response = await fetch(ZAPIER_CONTACT_WEBHOOK, {
      method: 'POST',
      mode: 'no-cors',
      body: submitData
    });

    // no-cors mode doesn't allow reading response, so we assume success if no error thrown
    console.log('✅ Zapier webhook fetch completed without error');
    return { success: true };
  } catch (error) {
    console.log('❌ Zapier webhook fetch failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Order form submission to Zapier using direct POST (works around CORS)
let lastOrderSubmission = 0;
window.submitOrderFormToZapier = async function(formData, serviceDetails) {
  // Prevent duplicate submissions within 5 seconds
  const now = Date.now();
  if (now - lastOrderSubmission < 5000) {
    console.log('⚠️ Order form submission blocked - too soon since last submission');
    return { success: false, error: 'Duplicate submission prevented' };
  }
  lastOrderSubmission = now;

  console.log('📧 Submitting order form to Zapier for email...');

  return new Promise((resolve) => {
    try {
      // Create a temporary form that submits to Zapier
      const tempForm = document.createElement('form');
      tempForm.method = 'POST';
      tempForm.action = ZAPIER_ORDER_WEBHOOK;
      tempForm.style.display = 'none';

      // Add all form fields as hidden inputs
      const fields = {
        first_name: formData.first_name || '',
        last_name: formData.last_name || '',
        customer_email: formData.customer_email || '',
        customer_phone: formData.customer_phone || '',
        business_name: formData.business_name || '',
        industry: formData.industry || '',
        services: serviceDetails.selectedServices.join(', '),
        total_amount: serviceDetails.totalAmount || '0',
        deposit_amount: serviceDetails.depositAmount || '0',
        due_date: formData.due_date || '',
        submission_type: 'Order Form',
        timestamp: formData.timestamp || new Date().toLocaleDateString('en-US', {
          timeZone: 'America/Chicago',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }) + ' ' + new Date().toLocaleTimeString('en-US', {
          timeZone: 'America/Chicago',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }) + ' CST',
        full_order_details: serviceDetails.orderSummary || ''
      };

      Object.keys(fields).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = fields[key];
        tempForm.appendChild(input);
      });

      // Create a hidden iframe to capture the submission
      const iframe = document.createElement('iframe');
      iframe.name = 'zapier_submit_' + Date.now();
      iframe.style.display = 'none';
      tempForm.target = iframe.name;

      document.body.appendChild(iframe);
      document.body.appendChild(tempForm);

      // Submit the form
      console.log('📤 Sending order form to Zapier webhook:', ZAPIER_ORDER_WEBHOOK);
      tempForm.submit();

      // Set up tracking for submission completion
      let submissionCompleted = false;

      // Listen for iframe events (limited due to CORS but helps with cleanup)
      iframe.onload = () => {
        if (!submissionCompleted) {
          submissionCompleted = true;
          console.log('✅ Order form iframe loaded - submission likely successful');
        }
      };

      // Clean up after a delay and resolve
      setTimeout(() => {
        if (tempForm.parentNode) document.body.removeChild(tempForm);
        if (iframe.parentNode) document.body.removeChild(iframe);

        if (!submissionCompleted) {
          console.log('⚠️ Order form submission completed (no iframe confirmation)');
        }
        console.log('�� Order form submitted to Zapier via direct POST');
        resolve({ success: true });
      }, 3000);

    } catch (error) {
      console.log('❌ Order form Zapier error:', error.message);
      resolve({ success: false, error: error.message });
    }
  });
};

// Direct Zapier submission helper using URLSearchParams
window.directZapierSubmit = async function(webhookUrl, data) {
  console.log('🔗 Direct Zapier submission to:', webhookUrl);

  try {
    // Prepare form data in URL-encoded format
    const params = new URLSearchParams();
    Object.keys(data).forEach(key => {
      params.append(key, data[key] || '');
    });

    // Submit to Zapier using fetch with form data
    await fetch(webhookUrl, {
      method: 'POST',
      body: params,
      mode: 'no-cors'
    });

    return true;
  } catch (error) {
    console.log('❌ Direct Zapier submission failed:', error.message);
    return false;
  }
};

// Network connectivity test
window.testNetworkConnectivity = async function() {
  console.log('🌐 Testing network connectivity...');

  try {
    const response = await fetch('https://hooks.zapier.com/', {
      method: 'HEAD',
      mode: 'no-cors'
    });
    console.log('✅ Zapier.com is reachable');
    return true;
  } catch (error) {
    console.log('❌ Zapier.com is not reachable:', error.message);
    return false;
  }
};

// Test function to manually test Zapier webhook
window.testZapierWebhook = async function() {
  console.log('🧪 Testing Zapier webhook with sample data...');

  const testData = {
    customer_name: 'Test User',
    customer_email: 'test@example.com',
    customer_mobile: '(555) 123-4567',
    response_preference: 'text',
    project_type: 'website',
    urgency: 'medium',
    customer_message: 'This is a test message to verify webhook connectivity',
    timestamp: new Date().toISOString(),
    test_submission: true
  };

  console.log('📤 Sending test data to Zapier...');
  const result = await window.submitContactFormToZapier(testData);

  console.log('✅ Zapier webhook test completed!');
  console.log('📱 Check your phone for SMS delivery in the next 1-2 minutes.');
  alert('✅ Zapier webhook test sent! Check your phone for SMS delivery in 1-2 minutes.');

  return result;
};

// Test function specifically for floating contact form
window.testFloatingContactForm = async function() {
  console.log('🧪 Testing FLOATING CONTACT FORM submission...');

  // Simulate exact data format from floating contact form
  const testData = {
    customer_name: 'Floating Form Test User',
    customer_email: 'floatingtest@example.com',
    customer_mobile: '(555) 987-6543',
    response_preference: 'text',
    project_type: 'business_cards_premium',
    urgency: 'high',
    customer_message: 'This is a test from the floating contact form system',
    timestamp: new Date().toISOString(),
    source: 'Visual Vibe Studio Website'
  };

  console.log('📤 Testing floating contact form with data:', testData);

  try {
    const result = await window.submitContactFormToZapier(testData);
    console.log('✅ Floating contact form test completed!', result);
    console.log('📱 Check your phone for SMS delivery in the next 1-2 minutes.');
    alert('✅ Floating contact form test sent! Check your phone for SMS delivery.');
    return result;
  } catch (error) {
    console.error('❌ Floating contact form test failed:', error);
    alert('❌ Floating contact form test failed. Check console for details.');
    return { success: false, error: error.message };
  }
};

// Test function with EXACT Zapier SMS field format
window.testZapierSMSFields = async function() {
  console.log('📱 Testing with EXACT Zapier SMS field format...');

  // Data that matches exactly what your Zapier SMS expects
  const exactZapierData = {
    customer_name: 'ZAPIER SMS TEST',
    customer_mobile: '(555) 123-4567',
    customer_email: 'zapiertest@example.com',
    response_preference: 'text',
    project_type: 'website',
    urgency: 'urgent',
    customer_message: 'ZAPIER SMS TEST - This should trigger SMS to your phone!'
  };

  console.log('📊 Exact Zapier SMS data:', exactZapierData);
  console.log('📋 This matches your Zapier template:');
  console.log('{{customer_name}}|{{customer_mobile}}|{{customer_email}}|{{response_preference}}|{{project_type}}|{{urgency}}|{{customer_message}}');

  try {
    const result = await window.submitContactFormToZapier(exactZapierData);
    console.log('✅ Zapier SMS field test completed!', result);
    console.log('📱 Check your phone for SMS with format: ZAPIER SMS TEST|(555) 123-4567|zapiertest@example.com|text|website|urgent|ZAPIER SMS TEST - This should trigger SMS to your phone!');
    alert('📱 Zapier SMS field test sent!\nCheck your phone for SMS with all field data!');
    return result;
  } catch (error) {
    console.error('❌ Zapier SMS field test failed:', error);
    alert('❌ Zapier SMS field test failed. Check console for details.');
    return { success: false, error: error.message };
  }
};

// Test Zapier webhook connectivity first
window.testZapierConnectivity = async function() {
  console.log('🌐 Testing Zapier webhook connectivity...');
  console.log('🔗 URL:', ZAPIER_CONTACT_WEBHOOK);

  // Test 1: Try HEAD request to see if URL is reachable
  try {
    console.log('🔄 Testing HEAD request...');
    const headResponse = await fetch(ZAPIER_CONTACT_WEBHOOK, {
      method: 'HEAD',
      mode: 'no-cors'
    });
    console.log('✅ HEAD request completed');
  } catch (error) {
    console.log('❌ HEAD request failed:', error.message);
  }

  // Test 2: Try GET request
  try {
    console.log('🔄 Testing GET request...');
    const getResponse = await fetch(ZAPIER_CONTACT_WEBHOOK, {
      method: 'GET',
      mode: 'no-cors'
    });
    console.log('✅ GET request completed');
  } catch (error) {
    console.log('❌ GET request failed:', error.message);
  }

  // Test 3: Try simple POST with minimal data
  try {
    console.log('🔄 Testing minimal POST...');
    const minimalResponse = await fetch(ZAPIER_CONTACT_WEBHOOK, {
      method: 'POST',
      body: 'test=connectivity',
      mode: 'no-cors'
    });
    console.log('✅ Minimal POST completed');
  } catch (error) {
    console.log('❌ Minimal POST failed:', error.message);
  }

  console.log('🔍 Connectivity tests complete. Check network tab for actual HTTP status codes.');
};

// Direct Zapier webhook test using fetch POST (bypassing iframe) with enhanced monitoring
window.testZapierDirectly = async function() {
  console.log('🧪 Testing Zapier webhook DIRECTLY with fetch...');

  // First test connectivity
  await window.testZapierConnectivity();

  const testData = {
    customer_name: 'DIRECT TEST USER',
    customer_email: 'directtest@example.com',
    customer_mobile: '(555) 999-8888',
    response_preference: 'text',
    project_type: 'website',
    urgency: 'urgent',
    customer_message: 'DIRECT ZAPIER TEST - If you receive this SMS, the webhook works!',
    submission_type: 'Direct Test',
    timestamp: new Date().toISOString(),
    source: 'Direct Zapier Test Function'
  };

  console.log('📤 Sending direct test to:', ZAPIER_CONTACT_WEBHOOK);
  console.log('📊 Test data:', testData);

  // Monitor network requests
  const startTime = Date.now();

  // Method 1: Try with FormData and detailed monitoring
  try {
    const formData = new FormData();
    Object.keys(testData).forEach(key => {
      formData.append(key, testData[key]);
    });

    console.log('🔄 Trying FormData POST with monitoring...');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(ZAPIER_CONTACT_WEBHOOK, {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    const endTime = Date.now();

    console.log(`✅ FormData POST completed in ${endTime - startTime}ms (no-cors mode)`);
    console.log('📊 Response type:', response.type);
    console.log('📊 Response status:', response.status || 'N/A (no-cors)');
  } catch (error) {
    const endTime = Date.now();
    console.log(`❌ FormData POST failed after ${endTime - startTime}ms:`, error.message);

    if (error.name === 'AbortError') {
      console.log('⏰ Request timed out after 10 seconds');
    }
  }

  alert('🧪 Enhanced Zapier test completed!\n\nCheck console for detailed connectivity info.\nCheck Network tab in DevTools for HTTP status codes.\nCheck your phone for SMS in 1-2 minutes.');

  return { success: true, message: 'Enhanced connectivity test completed' };
};

// Verify Zapier webhook URL and test domain accessibility
window.verifyZapierSetup = async function() {
  console.log('🔍 ZAPIER VERIFICATION: Starting comprehensive checks...');

  // Check URL format
  console.log('📋 ZAPIER VERIFICATION: Checking webhook URL format...');
  console.log('🔗 Contact webhook URL:', ZAPIER_CONTACT_WEBHOOK);

  const urlPattern = /^https:\/\/hooks\.zapier\.com\/hooks\/catch\/\d+\/[a-zA-Z0-9]+\/$/;
  const isValidFormat = urlPattern.test(ZAPIER_CONTACT_WEBHOOK);

  if (isValidFormat) {
    console.log('✅ ZAPIER VERIFICATION: Webhook URL format is valid');
  } else {
    console.log('❌ ZAPIER VERIFICATION: Webhook URL format is INVALID');
    console.log('💡 ZAPIER VERIFICATION: Expected format: https://hooks.zapier.com/hooks/catch/[numbers]/[letters]/');
  }

  // Test Zapier domain accessibility
  console.log('🌐 ZAPIER VERIFICATION: Testing Zapier domain accessibility...');
  try {
    const domainTest = await fetch('https://hooks.zapier.com/', {
      method: 'HEAD',
      mode: 'no-cors'
    });
    console.log('✅ ZAPIER VERIFICATION: Zapier domain is accessible');
  } catch (error) {
    console.log('❌ ZAPIER VERIFICATION: Cannot reach Zapier domain:', error.message);
  }

  // Extract webhook components
  const match = ZAPIER_CONTACT_WEBHOOK.match(/\/catch\/(\d+)\/([a-zA-Z0-9]+)\//);
  if (match) {
    const [, accountId, hookId] = match;
    console.log('📊 ZAPIER VERIFICATION: Webhook components:');
    console.log('  • Account ID:', accountId);
    console.log('  • Hook ID:', hookId);
    console.log('  • Full URL:', ZAPIER_CONTACT_WEBHOOK);
  }

  // Test with a simple ping
  console.log('📡 ZAPIER VERIFICATION: Testing webhook endpoint with ping...');
  try {
    const pingResponse = await fetch(ZAPIER_CONTACT_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'ping=test&timestamp=' + new Date().toISOString(),
      mode: 'no-cors'
    });
    console.log('✅ ZAPIER VERIFICATION: Webhook endpoint responded to ping');
  } catch (error) {
    console.log('❌ ZAPIER VERIFICATION: Webhook ping failed:', error.message);
  }

  alert('🔍 Zapier verification complete! Check console for detailed results.');
  return {
    urlValid: isValidFormat,
    url: ZAPIER_CONTACT_WEBHOOK,
    timestamp: new Date().toISOString()
  };
};

console.log('✅ Zapier integration functions loaded successfully');
console.log('📱 Contact Form → SMS webhook ready');
console.log('📧 Order Form → Email webhook ready');
console.log('🧪 Use testZapierWebhook() in console to test SMS delivery');
console.log('🔬 Use testZapierDirectly() to test webhook with multiple methods');
console.log('🔍 Use verifyZapierSetup() to verify webhook URL and connectivity');
console.log('🌐 Use testZapierConnectivity() to test basic connectivity');
