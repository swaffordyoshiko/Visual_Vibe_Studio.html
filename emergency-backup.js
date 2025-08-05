// Emergency backup for order submission
console.log('Loading emergency backup script...');

// Ensure function exists even if main script fails
if (typeof window.simpleOrderSubmit === 'undefined') {
  console.log('Main script not loaded, creating emergency backup');
  
  window.simpleOrderSubmit = function(event) {
    console.log('Emergency backup function called');
    
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    try {
      const form = document.getElementById('orderForm');
      if (!form) {
        alert('Form not found. Please refresh the page.');
        return false;
      }

      // Get form values
      const firstName = form.querySelector('input[name="firstName"]')?.value?.trim() || '';
      const lastName = form.querySelector('input[name="lastName"]')?.value?.trim() || '';
      const businessName = form.querySelector('input[name="businessName"]')?.value?.trim() || '';
      const industry = form.querySelector('input[name="industry"]')?.value?.trim() || '';
      const email = form.querySelector('input[name="email"]')?.value?.trim() || '';
      const phone = form.querySelector('input[name="phone"]')?.value?.trim() || 'Not provided';
      const dueDateInput = form.querySelector('input[name="dueDate"]')?.value || '';
      const services = form.querySelector('select[name="services"]');

      // Basic validation
      if (!firstName) { alert('Please enter your first name'); form.querySelector('input[name="firstName"]').focus(); return false; }
      if (!lastName) { alert('Please enter your last name'); form.querySelector('input[name="lastName"]').focus(); return false; }
      if (!businessName) { alert('Please enter your business name'); form.querySelector('input[name="businessName"]').focus(); return false; }
      if (!industry) { alert('Please enter your business industry'); form.querySelector('input[name="industry"]').focus(); return false; }
      if (!email || !email.includes('@')) { alert('Please enter a valid email address'); form.querySelector('input[name="email"]').focus(); return false; }
      if (!services || services.selectedOptions.length === 0) { alert('Please select at least one service'); services.focus(); return false; }
      if (!dueDateInput) { alert('Please select a preferred completion date'); form.querySelector('input[name="dueDate"]').focus(); return false; }

      // Calculate costs
      const selectedServices = Array.from(services.selectedOptions).map(opt => opt.text);
      const totalAmount = Array.from(services.selectedOptions).reduce((total, opt) => {
        return total + (parseInt(opt.getAttribute('data-price')) || 50);
      }, 0);
      const depositAmount = (totalAmount * 0.5).toFixed(2);

      console.log('Order details:', { businessName, selectedServices, totalAmount, depositAmount });

      // Update button
      const btn = document.getElementById('submitOrderBtn');
      const btnText = document.getElementById('submitBtnText');
      if (btn && btnText) {
        btnText.textContent = 'Processing...';
        btn.disabled = true;
      }

      // Show Venmo payment section
      const container = document.getElementById('paypal-button-container');
      if (container) {
        container.innerHTML = '<div class="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6"><div class="text-center"><h3 class="text-xl font-bold mb-4">💳 Payment Required</h3><p class="mb-4">50% deposit to start your project</p><div class="bg-white rounded-lg p-4 mb-4"><p class="text-lg font-semibold">Deposit Amount: $' + depositAmount + '</p><p class="text-sm text-gray-500">Remaining $' + (totalAmount - parseFloat(depositAmount)).toFixed(2) + ' due on completion</p></div><p class="text-sm mb-4">Send payment via Venmo to: <strong>@Yoshiko-Swafford</strong><br>Include "' + businessName + '" in payment note</p><button onclick="window.open(\'https://venmo.com/u/Yoshiko-Swafford\', \'_blank\')" class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">💰 Pay with Venmo</button><p class="text-xs text-gray-500 mt-2">We will contact you within 24 hours after payment</p></div></div>';
        container.classList.remove('hidden');
        container.scrollIntoView({ behavior: 'smooth' });
      }

      // Send email via webhook
      try {
        const webhookForm = document.createElement('form');
        webhookForm.method = 'POST';
        webhookForm.action = 'https://hooks.zapier.com/hooks/catch/24056566/u4a5f95/';
        webhookForm.style.display = 'none';

        const data = {
          type: 'order_confirmation',
          first_name: firstName,
          last_name: lastName,
          business_name: businessName,
          industry: industry,
          customer_email: email,
          customer_phone: phone,
          services: selectedServices.join(', '),
          total_amount: totalAmount,
          deposit_amount: depositAmount,
          due_date: new Date(dueDateInput).toLocaleDateString(),
          subject: 'New Order from ' + firstName + ' ' + lastName,
          message: 'Emergency backup order from ' + businessName + ' - Services: ' + selectedServices.join(', ') + ' - Total: $' + totalAmount,
          to_email: 'support@visualvibestudio.store'
        };

        Object.entries(data).forEach(([name, value]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = name;
          input.value = value;
          webhookForm.appendChild(input);
        });

        document.body.appendChild(webhookForm);
        webhookForm.submit();
        setTimeout(() => {
          if (webhookForm.parentNode) webhookForm.remove();
        }, 2000);

        console.log('Email sent via emergency backup');
      } catch (emailError) {
        console.error('Email error:', emailError);
      }

      // Update button
      if (btn && btnText) {
        btnText.textContent = 'Order Submitted ✅';
      }

      // Show success message
      setTimeout(() => {
        alert('Order submitted successfully!\n\nBusiness: ' + businessName + '\nServices: ' + selectedServices.join(', ') + '\nTotal: $' + totalAmount + '\nDeposit: $' + depositAmount + '\n\nPlease complete payment via Venmo @Yoshiko-Swafford and include your business name in the payment note.');
      }, 500);

    } catch (error) {
      console.error('Emergency backup error:', error);
      alert('There was an error processing your order. Please contact (402) 979-7184');
    }

    return false;
  };
}

console.log('Emergency backup script ready');
