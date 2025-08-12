// Simple Zapier Fix - Direct webhook integration
console.log('🚀 Simple Zapier fix loaded');

// Zapier webhook URLs
const ZAPIER_CONTACT_WEBHOOK = 'https://hooks.zapier.com/hooks/catch/24056566/u4i7xid/';
const ZAPIER_ORDER_WEBHOOK = 'https://hooks.zapier.com/hooks/catch/24056566/u4a5f95/';

// Contact form submission to Zapier using direct POST (works around CORS)
window.submitContactFormToZapier = async function(formData) {
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
      tempForm.submit();

      // Clean up after a short delay
      setTimeout(() => {
        if (tempForm.parentNode) document.body.removeChild(tempForm);
        if (iframe.parentNode) document.body.removeChild(iframe);
      }, 3000);

      console.log('✅ Contact form submitted to Zapier via direct POST');
      resolve({ success: true });

    } catch (error) {
      console.log('❌ Contact form Zapier error:', error.message);
      resolve({ success: false, error: error.message });
    }
  });
};

// Order form submission to Zapier using direct POST (works around CORS)
window.submitOrderFormToZapier = async function(formData, serviceDetails) {
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
      tempForm.submit();

      // Clean up after a short delay
      setTimeout(() => {
        if (tempForm.parentNode) document.body.removeChild(tempForm);
        if (iframe.parentNode) document.body.removeChild(iframe);
      }, 3000);

      console.log('✅ Order form submitted to Zapier via direct POST');
      resolve({ success: true });

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
