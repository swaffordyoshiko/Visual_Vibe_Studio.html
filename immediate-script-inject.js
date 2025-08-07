// IMMEDIATE SCRIPT INJECTION - Use document.write to load before anything else
console.log('📝 IMMEDIATE SCRIPT INJECT: Starting...');

// Only run on mobile
if (window.innerWidth <= 767) {
  console.log('📱 Mobile detected, injecting direct override...');
  
  // Use document.write to inject script immediately
  document.write('<script src="direct-mobile-override.js"><\/script>');
  
  console.log('✅ Direct mobile override script injected');
}
