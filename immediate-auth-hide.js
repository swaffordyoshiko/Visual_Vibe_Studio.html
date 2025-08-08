// IMMEDIATE AUTH HIDE - RUNS AS EARLY AS POSSIBLE
console.log('🚫 IMMEDIATE AUTH HIDE - EXECUTING...');

// Function to hide signed-in elements immediately
function hideSignedInElements() {
    // Hide by ID
    const signedInState = document.getElementById('signedInState');
    if (signedInState) {
        signedInState.style.display = 'none';
        signedInState.style.visibility = 'hidden';
        signedInState.style.position = 'absolute';
        signedInState.style.left = '-9999px';
    }
    
    // Hide by onclick handlers
    const selectors = [
        'button[onclick*="openProfileModal"]',
        'button[onclick*="showOrderHistory"]', 
        'button[onclick*="signOut"]',
        'a[onclick*="openProfileModal"]',
        'a[onclick*="showOrderHistory"]',
        'a[onclick*="signOut"]'
    ];
    
    selectors.forEach(selector => {
        try {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.display = 'none';
                el.style.visibility = 'hidden';
                el.style.position = 'absolute';
                el.style.left = '-9999px';
            });
        } catch (e) {}
    });
    
    // Hide by text content
    const allButtons = document.querySelectorAll('button, a');
    allButtons.forEach(btn => {
        const text = btn.textContent.toLowerCase().trim();
        if (text.includes('edit profile') || 
            text.includes('my orders') || 
            text.includes('sign out') ||
            text.includes('click to edit')) {
            btn.style.display = 'none';
            btn.style.visibility = 'hidden';
            btn.style.position = 'absolute';
            btn.style.left = '-9999px';
        }
    });
    
    console.log('🚫 Signed-in elements hidden');
}

// Run immediately
hideSignedInElements();

// Run when any new elements are added
const observer = new MutationObserver(hideSignedInElements);
observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});

// Run periodically for first 10 seconds
const intervalId = setInterval(hideSignedInElements, 500);
setTimeout(() => clearInterval(intervalId), 10000);

console.log('🚫 IMMEDIATE AUTH HIDE - COMPLETE');
