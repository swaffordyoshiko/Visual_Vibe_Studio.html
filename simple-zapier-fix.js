// Simple Zapier Fix - Direct webhook integration
console.log('🚀 Simple Zapier fix loaded');

// Zapier webhook URLs
const ZAPIER_CONTACT_WEBHOOK = 'https://hooks.zapier.com/hooks/catch/24056566/u4i7xid/';
const ZAPIER_ORDER_WEBHOOK = 'https://hooks.zapier.com/hooks/catch/24056566/u4a5f95/';

// Contact form submission to Zapier (SMS) using URLSearchParams
window.submitContactFormToZapier = async function(formData) {
  console.log('📱 Submitting contact form to Zapier for SMS...');

  try {
    // Prepare form data in URL-encoded format (what Zapier expects)
    const params = new URLSearchParams();
    params.append('customer_name', formData.customer_name || '');
    params.append('customer_email', formData.customer_email || '');
    params.append('customer_mobile', formData.customer_mobile || '');
    params.append('response_preference', formData.response_preference || '');
    params.append('project_type', formData.project_type || '');
    params.append('urgency', formData.urgency || '');
    params.append('customer_message', formData.customer_message || '');
    params.append('submission_type', 'Contact Form');
    params.append('timestamp', new Date().toISOString());

    // Submit to Zapier using fetch with form data
    await fetch(ZAPIER_CONTACT_WEBHOOK, {
      method: 'POST',
      body: params,
      mode: 'no-cors' // Required for Zapier webhooks
    });

    console.log('✅ Contact form submitted to Zapier');
    return { success: true };
  } catch (error) {
    console.log('❌ Contact form Zapier error:', error.message);
    return { success: false, error: error.message };
  }
};

// Order form submission to Zapier (Email) using URLSearchParams
window.submitOrderFormToZapier = async function(formData, serviceDetails) {
  console.log('📧 Submitting order form to Zapier for email...');

  try {
    // Prepare form data in URL-encoded format (what Zapier expects)
    const params = new URLSearchParams();
    params.append('first_name', formData.first_name || '');
    params.append('last_name', formData.last_name || '');
    params.append('customer_email', formData.customer_email || '');
    params.append('customer_phone', formData.customer_phone || '');
    params.append('business_name', formData.business_name || '');
    params.append('industry', formData.industry || '');
    params.append('services', serviceDetails.selectedServices.join(', '));
    params.append('total_amount', serviceDetails.totalAmount || '0');
    params.append('due_date', formData.due_date || '');
    params.append('submission_type', 'Order Form');
    params.append('timestamp', new Date().toISOString());
    params.append('full_order_details', serviceDetails.orderSummary || '');

    // Submit to Zapier using fetch with form data
    await fetch(ZAPIER_ORDER_WEBHOOK, {
      method: 'POST',
      body: params,
      mode: 'no-cors' // Required for Zapier webhooks
    });

    console.log('✅ Order form submitted to Zapier');
    return { success: true };
  } catch (error) {
    console.log('❌ Order form Zapier error:', error.message);
    return { success: false, error: error.message };
  }
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
