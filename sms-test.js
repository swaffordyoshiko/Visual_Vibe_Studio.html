// DIRECT SMS TEST - Copy and paste this into browser console
function directSMSTest() {
  console.log('📱 DIRECT SMS TEST STARTING...');
  
  var testMessage = 'DIRECT TEST: ' + new Date().toLocaleTimeString() + ' - Check if you receive this text!';
  
  // Test Verizon gateway (most common)
  var form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://formspree.io/f/xwpejpvk';
  form.style.display = 'none';
  form.target = 'direct-sms-test';
  
  var iframe = document.createElement('iframe');
  iframe.name = 'direct-sms-test';
  iframe.style.display = 'none';
  
  var fields = {
    'email': '4029797184@vtext.com',
    'subject': 'DIRECT-TEST',
    'message': testMessage,
    '_replyto': 'noreply@visualvibestudio.store'
  };
  
  Object.keys(fields).forEach(function(key) {
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = fields[key];
    form.appendChild(input);
  });
  
  document.body.appendChild(iframe);
  document.body.appendChild(form);
  form.submit();
  
  console.log('✅ Direct SMS test sent to Verizon gateway');
  alert('📱 DIRECT SMS TEST SENT!\n\nSent to: (402) 979-7184\nCarrier: Verizon\nMessage: ' + testMessage + '\n\nCheck your phone in 1-2 minutes!');
  
  // Cleanup
  setTimeout(function() {
    if (document.body.contains(form)) document.body.removeChild(form);
    if (document.body.contains(iframe)) document.body.removeChild(iframe);
  }, 3000);
  
  return 'Direct SMS test completed';
}

// Test all carriers
function testAllCarriersNow() {
  console.log('📱 TESTING ALL CARRIERS NOW...');
  
  var carriers = [
    { name: 'Verizon', email: '4029797184@vtext.com' },
    { name: 'AT&T', email: '4029797184@txt.att.net' },
    { name: 'T-Mobile', email: '4029797184@tmomail.net' },
    { name: 'Sprint', email: '4029797184@messaging.sprintpcs.com' }
  ];
  
  var testMessage = 'CARRIER TEST: ' + new Date().toLocaleTimeString();
  
  carriers.forEach(function(carrier, index) {
    setTimeout(function() {
      var form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://formspree.io/f/xwpejpvk';
      form.style.display = 'none';
      form.target = 'carrier-test-' + index;
      
      var iframe = document.createElement('iframe');
      iframe.name = 'carrier-test-' + index;
      iframe.style.display = 'none';
      
      var fields = {
        'email': carrier.email,
        'subject': carrier.name + '-TEST',
        'message': testMessage + ' via ' + carrier.name,
        '_replyto': 'noreply@visualvibestudio.store'
      };
      
      Object.keys(fields).forEach(function(key) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = fields[key];
        form.appendChild(input);
      });
      
      document.body.appendChild(iframe);
      document.body.appendChild(form);
      form.submit();
      
      console.log('📱 Testing ' + carrier.name + ' carrier');
      
      setTimeout(function() {
        if (document.body.contains(form)) document.body.removeChild(form);
        if (document.body.contains(iframe)) document.body.removeChild(iframe);
      }, 3000);
      
    }, index * 2000); // 2 second intervals
  });
  
  alert('📱 TESTING ALL CARRIERS!\n\nSending test to:\n• Verizon\n• AT&T\n• T-Mobile\n• Sprint\n\nCheck phone (402) 979-7184 in 2-3 minutes!');
  
  return 'All carrier test initiated';
}

console.log('📱 SMS TEST FUNCTIONS READY:');
console.log('  directSMSTest() - Quick SMS test');
console.log('  testAllCarriersNow() - Test all carriers');
