// Contact Form Fix Script
// This script ensures submitContactForm is always available

(function() {
    console.log('🔧 Loading contact form fix...');
    
    // Define the working submitContactForm function
    window.submitContactForm = function() {
        console.log('📧 Contact form fix: submitContactForm called');
        
        try {
            // Get form elements - try multiple possible IDs
            let nameInput = document.getElementById('customerName');
            let phoneInput = document.getElementById('customerPhone');
            let emailInput = document.getElementById('customerEmail');
            let messageInput = document.getElementById('customerMessage');
            let submitBtn = document.getElementById('submitContactBtn') || document.getElementById('submitContactBtn2');

            if (!nameInput || !phoneInput || !emailInput || !messageInput) {
                console.error('Form elements not found');
                alert('Contact form elements not found. Please call (402) 979-7184 directly.');
                return;
            }

            const name = nameInput.value.trim();
            const phone = phoneInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            // Basic validation
            if (!name) {
                alert('Please enter your full name');
                nameInput.focus();
                return;
            }
            if (!phone) {
                alert('Please enter your mobile number');
                phoneInput.focus();
                return;
            }
            if (!email || !email.includes('@')) {
                alert('Please enter a valid email address');
                emailInput.focus();
                return;
            }
            if (!message) {
                alert('Please enter your message');
                messageInput.focus();
                return;
            }

            // Disable submit button
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }

            // Send SMS to phone via Zapier webhook
            console.log('📱 Sending SMS to (402) 979-7184');
            const timestamp = new Date().toLocaleString();
            
            // Get response preference
            const responsePreference = document.querySelector('input[name="responsePreference"]:checked');
            const preferredResponse = responsePreference ? responsePreference.value : 'text';
            
            // Create compact SMS format
            const compactFormat = `VVS:${name}|${phone.replace(/[^\d]/g, '')}|${email}|R:${preferredResponse === 'email' ? 'E' : 'T'}|MSG:${message}`;

            // Create form for webhook submission
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'https://hooks.zapier.com/hooks/catch/24056566/u4i7xid/';
            form.style.display = 'none';
            form.target = 'contact-fix-' + Date.now();

            const iframe = document.createElement('iframe');
            iframe.name = form.target;
            iframe.style.display = 'none';

            const fields = {
                'phone': '4029797184',
                'message': compactFormat,
                'type': 'contact_form_fix',
                'provider': 'bandwidth',
                'timestamp': timestamp,
                'customer_name': name,
                'customer_mobile': phone,
                'customer_email': email,
                'customer_message': message,
                'response_preference': preferredResponse,
                'source': 'website_contact_form_fix'
            };

            Object.keys(fields).forEach(key => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = fields[key];
                form.appendChild(input);
            });

            document.body.appendChild(iframe);
            document.body.appendChild(form);
            form.submit();

            console.log('✅ SMS sent to phone via fix script:', compactFormat);

            // Show success message
            alert(`Thank you ${name}! Your message has been sent to Yoshiko. You'll hear back within 2-4 hours.`);

            // Clear form
            nameInput.value = '';
            phoneInput.value = '';
            emailInput.value = '';
            messageInput.value = '';

            // Re-enable button
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = '📧 Send Message';
            }

            // Clean up
            setTimeout(() => {
                if (document.body.contains(form)) document.body.removeChild(form);
                if (document.body.contains(iframe)) document.body.removeChild(iframe);
            }, 5000);

        } catch (error) {
            console.error('❌ Error in contact form fix:', error);
            alert('There was an error submitting your message. Please call (402) 979-7184 directly.');
            
            // Re-enable button on error
            const submitBtn = document.getElementById('submitContactBtn') || document.getElementById('submitContactBtn2');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = '📧 Send Message';
            }
        }
    };
    
    // Also make it directly accessible
    submitContactForm = window.submitContactForm;
    
    console.log('✅ Contact form fix loaded successfully');
})();
