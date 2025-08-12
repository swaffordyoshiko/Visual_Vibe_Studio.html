// Simple Zapier Fix - Direct webhook integration
console.log('🚀 Simple Zapier fix loaded');

// Zapier webhook URLs
const ZAPIER_CONTACT_WEBHOOK = 'https://hooks.zapier.com/hooks/catch/24056566/u4i7xid/';
const ZAPIER_ORDER_WEBHOOK = 'https://hooks.zapier.com/hooks/catch/24056566/u4a5f95/';

// Contact form submission to Zapier (SMS)
window.submitContactFormToZapier = async function(formData) {
  console.log('📱 Submitting contact form to Zapier for SMS...');
  
  try {
    const response = await fetch(ZAPIER_CONTACT_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_mobile: formData.customer_mobile,
        response_preference: formData.response_preference,
        project_type: formData.project_type,
        urgency: formData.urgency,
        customer_message: formData.customer_message,
        submission_type: 'Contact Form',
        timestamp: new Date().toISOString()
      })
    });

    if (response.ok) {
      console.log('✅ Contact form sent to Zapier successfully');
      return { success: true };
    } else {
      console.log('❌ Zapier contact webhook failed:', response.status);
      return { success: false, error: `HTTP ${response.status}` };
    }
  } catch (error) {
    console.log('❌ Contact form Zapier error:', error.message);
    return { success: false, error: error.message };
  }
};

// Order form submission to Zapier (Email)
window.submitOrderFormToZapier = async function(formData, serviceDetails) {
  console.log('📧 Submitting order form to Zapier for email...');
  
  try {
    const response = await fetch(ZAPIER_ORDER_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: formData.first_name,
        last_name: formData.last_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        business_name: formData.business_name,
        industry: formData.industry,
        services: serviceDetails.selectedServices.join(', '),
        total_amount: serviceDetails.totalAmount,
        due_date: formData.due_date,
        submission_type: 'Order Form',
        timestamp: new Date().toISOString(),
        full_order_details: serviceDetails.orderSummary
      })
    });

    if (response.ok) {
      console.log('✅ Order form sent to Zapier successfully');
      return { success: true };
    } else {
      console.log('❌ Zapier order webhook failed:', response.status);
      return { success: false, error: `HTTP ${response.status}` };
    }
  } catch (error) {
    console.log('❌ Order form Zapier error:', error.message);
    return { success: false, error: error.message };
  }
};

// Direct Zapier submission helper
window.directZapierSubmit = async function(webhookUrl, data) {
  console.log('🔗 Direct Zapier submission to:', webhookUrl);
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    return response.ok;
  } catch (error) {
    console.log('❌ Direct Zapier submission failed:', error.message);
    return false;
  }
};

console.log('✅ Zapier integration functions loaded successfully');
console.log('📱 Contact Form → SMS webhook ready');
console.log('📧 Order Form → Email webhook ready');
