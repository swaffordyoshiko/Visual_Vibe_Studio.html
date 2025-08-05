// Simple order submission function
console.log('Loading simple order function...');

if (window.simpleOrderSubmit) delete window.simpleOrderSubmit;

let processing = false;

window.simpleOrderSubmit = function(event) {
  console.log('Order function called');
  
  if (processing) return false;
  processing = true;

  try {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const form = document.getElementById('orderForm');
    if (!form) {
      if (window.toastManager) {
        toastManager.error('Order form not found. Please refresh the page and try again.', {
          title: 'Form Error',
          duration: 6000
        });
      } else {
        alert('Form not found');
      }
      processing = false;
      return false;
    }

    // Get values
    const firstName = form.querySelector('input[name="firstName"]').value.trim();
    const lastName = form.querySelector('input[name="lastName"]').value.trim();
    const businessName = form.querySelector('input[name="businessName"]').value.trim();
    const industry = form.querySelector('input[name="industry"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const phone = form.querySelector('input[name="phone"]').value.trim() || 'Not provided';
    const dueDateInput = form.querySelector('input[name="dueDate"]').value;
    const services = form.querySelector('select[name="services"]');

    // Validate with modern notifications
    if (!firstName) {
      if (window.toastManager) {
        toastManager.error('Please enter your first name', { title: 'Required Field Missing', duration: 4000 });
      } else {
        alert('Enter first name');
      }
      form.querySelector('input[name="firstName"]').focus();
      processing = false;
      return false;
    }
    if (!lastName) {
      if (window.toastManager) {
        toastManager.error('Please enter your last name', { title: 'Required Field Missing', duration: 4000 });
      } else {
        alert('Enter last name');
      }
      form.querySelector('input[name="lastName"]').focus();
      processing = false;
      return false;
    }
    if (!businessName) {
      if (window.toastManager) {
        toastManager.error('Please enter your business name', { title: 'Required Field Missing', duration: 4000 });
      } else {
        alert('Enter business name');
      }
      form.querySelector('input[name="businessName"]').focus();
      processing = false;
      return false;
    }
    if (!industry) {
      if (window.toastManager) {
        toastManager.error('Please enter your business industry', { title: 'Required Field Missing', duration: 4000 });
      } else {
        alert('Enter industry');
      }
      form.querySelector('input[name="industry"]').focus();
      processing = false;
      return false;
    }
    if (!email || !email.includes('@')) {
      if (window.toastManager) {
        toastManager.error('Please enter a valid email address', { title: 'Invalid Email', duration: 4000 });
      } else {
        alert('Enter valid email');
      }
      form.querySelector('input[name="email"]').focus();
      processing = false;
      return false;
    }
    if (!services || services.selectedOptions.length === 0) {
      if (window.toastManager) {
        toastManager.error('Please select at least one service', { title: 'No Services Selected', duration: 4000 });
      } else {
        alert('Select services');
      }
      services.focus();
      processing = false;
      return false;
    }
    if (!dueDateInput) {
      if (window.toastManager) {
        toastManager.error('Please select a preferred completion date', { title: 'Date Required', duration: 4000 });
      } else {
        alert('Select date');
      }
      form.querySelector('input[name="dueDate"]').focus();
      processing = false;
      return false;
    }

    // Calculate
    const selectedServices = Array.from(services.selectedOptions).map(opt => opt.text);
    const totalAmount = Array.from(services.selectedOptions).reduce((total, opt) => {
      return total + (parseInt(opt.getAttribute('data-price')) || 50);
    }, 0);
    const depositAmount = (totalAmount * 0.5).toFixed(2);
    const dueDate = new Date(dueDateInput).toLocaleDateString();

    console.log('Order:', businessName, totalAmount, depositAmount);

    // Update button
    const btn = document.getElementById('submitOrderBtn');
    const btnText = document.getElementById('submitBtnText');
    if (btn && btnText) {
      btnText.textContent = 'Processing...';
      btn.disabled = true;
    }

    // Show Venmo
    const container = document.getElementById('paypal-button-container');
    if (container) {
      container.innerHTML = '<div class="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6"><div class="text-center"><h3 class="text-xl font-bold mb-4">💳 Payment Required</h3><p class="mb-4">50% deposit to start</p><div class="bg-white rounded-lg p-4 mb-4"><p class="text-lg font-semibold">Deposit: $' + depositAmount + '</p><p class="text-sm text-gray-500">Remaining: $' + (totalAmount - parseFloat(depositAmount)).toFixed(2) + ' due on completion</p></div><p class="text-sm mb-4">Send payment via Venmo to: <strong>@Yoshiko-Swafford</strong><br>Include "' + businessName + '" in note</p><button onclick="window.open(\'https://venmo.com/u/Yoshiko-Swafford\', \'_blank\')" class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">💰 Pay with Venmo</button><p class="text-xs text-gray-500 mt-2">Contact within 24 hours after payment</p></div></div>';
      container.classList.remove('hidden');
      container.scrollIntoView({ behavior: 'smooth' });

      // Show payment reminder toast
      if (window.toastManager) {
        setTimeout(() => {
          toastManager.info(
            `Please scroll down to complete your $${depositAmount} deposit payment via Venmo`,
            {
              title: '💳 Payment Section Ready',
              duration: 5000
            }
          );
        }, 1000);
      }
    }

    // Send email
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
        due_date: dueDate,
        subject: 'New Order from ' + firstName + ' ' + lastName,
        message: 'Order from ' + businessName + ' - Services: ' + selectedServices.join(', ') + ' - Total: $' + totalAmount,
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
      webhookForm.remove();

      console.log('Email sent');
    } catch (emailError) {
      console.error('Email error:', emailError);
    }

    // Success
    if (btn && btnText) {
      btnText.textContent = 'Order Submitted ✅';
    }

    setTimeout(() => {
      if (window.toastManager) {
        toastManager.success(
          `Business: ${businessName}\nServices: ${selectedServices.join(', ')}\nTotal: $${totalAmount}\nDeposit: $${depositAmount}\n\nPlease complete payment via Venmo @Yoshiko-Swafford and include your business name in the payment note.`,
          {
            title: 'Order Submitted Successfully! 🎉',
            duration: 8000,
            actions: [
              {
                text: '💰 Pay with Venmo',
                style: 'primary',
                onclick: "window.open('https://venmo.com/u/Yoshiko-Swafford', '_blank')"
              }
            ]
          }
        );
      } else {
        alert('Order submitted!\n\nBusiness: ' + businessName + '\nTotal: $' + totalAmount + '\nDeposit: $' + depositAmount + '\n\nPay via Venmo @Yoshiko-Swafford');
      }
    }, 500);

  } catch (error) {
    console.error('Error:', error);
    if (window.toastManager) {
      toastManager.error(
        'There was an error processing your order. Please try again or contact support.',
        {
          title: 'Order Processing Failed',
          duration: 8000,
          actions: [
            {
              text: '📞 Call Support',
              style: 'primary',
              onclick: "window.open('tel:+14029797184', '_self')"
            }
          ]
        }
      );
    } else {
      alert('Error. Contact (402) 979-7184');
    }
    
    const btn = document.getElementById('submitOrderBtn');
    const btnText = document.getElementById('submitBtnText');
    if (btn && btnText) {
      btnText.textContent = 'Start My Project Now';
      btn.disabled = false;
    }
  } finally {
    processing = false;
  }

  return false;
};

console.log('Simple order function ready!');
