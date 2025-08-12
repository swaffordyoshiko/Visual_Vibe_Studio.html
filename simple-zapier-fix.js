// Simple Zapier Fix - Direct webhook integration
console.log('🚀 Simple Zapier fix loaded');

// Zapier webhook URLs - Contact form uses u4i7xid, Order form uses u4a5f95
const ZAPIER_CONTACT_WEBHOOK = 'https://hooks.zapier.com/hooks/catch/24056566/u4i7xid/';
const ZAPIER_ORDER_WEBHOOK = 'https://hooks.zapier.com/hooks/catch/24056566/u4a5f95/';

// Contact form submission to Zapier using direct POST (works around CORS)
let lastContactSubmission = 0;
window.submitContactFormToZapier = async function(formData) {
  // Prevent duplicate submissions within 5 seconds
  const now = Date.now();
  if (now - lastContactSubmission < 5000) {
    console.log('⚠️ Contact form submission blocked - too soon since last submission');
    return { success: false, error: 'Duplicate submission prevented' };
  }
  lastContactSubmission = now;

  console.log('📱 Submitting contact form to Zapier for SMS...');

  return new Promise((resolve) => {
    try {
      // Create a temporary form that submits to Zapier
      const tempForm = document.createElement('form');
      tempForm.method = 'POST';
      tempForm.action = ZAPIER_CONTACT_WEBHOOK;
      tempForm.style.display = 'none';

      // Add all form fields as hidden inputs
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
      console.log('📤 Sending contact form to Zapier webhook:', ZAPIER_CONTACT_WEBHOOK);
      tempForm.submit();

      // Set up tracking for submission completion
      let submissionCompleted = false;

      // Listen for iframe events (limited due to CORS but helps with cleanup)
      iframe.onload = () => {
        if (!submissionCompleted) {
          submissionCompleted = true;
          console.log('✅ Contact form iframe loaded - submission likely successful');
        }
      };

      // Clean up after a delay and resolve
      setTimeout(() => {
        if (tempForm.parentNode) document.body.removeChild(tempForm);
        if (iframe.parentNode) document.body.removeChild(iframe);

        if (!submissionCompleted) {
          console.log('⚠️ Contact form submission completed (no iframe confirmation)');
        }
        console.log('✅ Contact form submitted to Zapier via direct POST');
        resolve({ success: true });
      }, 3000);

    } catch (error) {
      console.log('❌ Contact form Zapier error:', error.message);
      resolve({ success: false, error: error.message });
    }
  });
};

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
        timestamp: new Date().toISOString(),
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
        console.log('✅ Order form submitted to Zapier via direct POST');
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

console.log('✅ Zapier integration functions loaded successfully');
console.log('📱 Contact Form → SMS webhook ready');
console.log('📧 Order Form → Email webhook ready');
