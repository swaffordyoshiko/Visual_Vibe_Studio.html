// Emoji fix script to replace broken emoji patterns with proper emojis

// Define broken emoji patterns and their replacements
const emojiReplacements = {
  '\ufffd\ufffd\ufffd': '\ud83d\udcf1', // Phone/SMS
  '\ufffd\ufffd': '\ud83d\udce7', // Email 
  '\ufffd\ufffd\ufffd\ufffd': '\ud83d\udea8', // Alert
  '\ufffd\ufffd\ufffd\ufffd\ufffd': '\u2705', // Success
  '\u06e3\u06e3\u06e3': '\u274c', // Error
  'console.log(\'\ufffd\ufffd\ufffd': 'console.log(\'\u2705', // Success logs
  'console.log(\'\ufffd\ufffd\ufffd\ufffd': 'console.log(\'\ud83d\udd27', // Tool logs
  'console.log(\'\ufffd\ufffd\ufffd\ufffd\ufffd': 'console.log(\'\ud83d\udcf1', // Phone logs
  'console.error(\'\ufffd\ufffd\ufffd': 'console.error(\'\u274c', // Error logs
  'alert(\'\ufffd\ufffd\ufffd': 'alert(\'\u2705', // Success alerts
  '\ufffd\ufffd\ufffd Pay with Venmo': '\ud83d\udcb3 Pay with Venmo', // Venmo button
  '<span>\ufffd\ufffd</span>': '<span>\ud83d\udce7</span>', // Email span
  'Call (402) 979-7184': '\ud83d\udcde Call (402) 979-7184', // Phone call
  'Email Support': '\ud83d\udce7 Email Support' // Email support
};

console.log('Emoji Fix Script - This script will replace broken emoji patterns');
console.log('To apply fixes, copy the replacement patterns above and use them in the HTML file');

// Function to show all broken patterns found
function findBrokenEmojis(text) {
  const brokenPatterns = [];
  for (const pattern in emojiReplacements) {
    if (text.includes(pattern)) {
      brokenPatterns.push(pattern);
    }
  }
  return brokenPatterns;
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { emojiReplacements, findBrokenEmojis };
}
