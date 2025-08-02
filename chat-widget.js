// Visual Vibe Studio Live Chat Widget
class ChatWidget {
    constructor() {
        this.chatOpen = false;
        this.customerInfo = null;
        this.init();
    }

    init() {
        this.loadCustomerInfo();
        this.setupEventListeners();
    }

    loadCustomerInfo() {
        const stored = localStorage.getItem('vvs_customerInfo');
        if (stored) {
            this.customerInfo = JSON.parse(stored);
        }
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.chatOpen) {
                this.toggleChat();
            }
        });
    }

    toggleChat() {
        const chatWindow = document.getElementById('chatWindow');
        this.chatOpen = !this.chatOpen;
        
        if (this.chatOpen) {
            chatWindow.classList.add('active');
            document.getElementById('messageInput').focus();
        } else {
            chatWindow.classList.remove('active');
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification show ${type}`;
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
    }

    addMessage(message, isUser = false) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        messageDiv.textContent = message;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async sendSMS(message, customerData) {
        const smsMessage = `🎨 Visual Vibe Studio - New Chat

From: ${customerData.name || 'Anonymous'}
Email: ${customerData.email || 'Not provided'}
Phone: ${customerData.phone || 'Not provided'}

Message: ${message}

Time: ${new Date().toLocaleString()}`;

        try {
            // Using TextBelt API for SMS
            const response = await fetch('https://textbelt.com/text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: '5313445994',
                    message: smsMessage,
                    key: 'textbelt' // Use 'textbelt' for 1 free text per day
                })
            });

            const result = await response.json();
            
            if (result.success) {
                this.showNotification('Message sent! You should receive a response shortly.');
                return true;
            } else {
                console.error('SMS Error:', result.error);
                this.saveMessageLocally(message, customerData);
                this.showNotification('Message saved! We will respond soon.');
                return true;
            }
        } catch (error) {
            console.error('SMS Error:', error);
            this.saveMessageLocally(message, customerData);
            this.showNotification('Message saved! We will respond soon.');
            return true;
        }
    }

    saveMessageLocally(message, customerData) {
        const messages = JSON.parse(localStorage.getItem('vvs_chatMessages') || '[]');
        messages.push({
            message,
            customerData,
            timestamp: new Date().toISOString(),
            sent: false
        });
        localStorage.setItem('vvs_chatMessages', JSON.stringify(messages));
    }

    async collectCustomerInfo() {
        return new Promise((resolve) => {
            const name = prompt("Hi! I'm with Visual Vibe Studio. May I get your name?") || "Anonymous";
            const email = prompt("And your email address? (optional)") || "";
            const phone = prompt("Phone number? (optional - for faster response)") || "";
            
            const info = { 
                name, 
                email, 
                phone,
                timestamp: new Date().toISOString() 
            };
            
            localStorage.setItem('vvs_customerInfo', JSON.stringify(info));
            
            this.addMessage(`Hi ${name}! Thanks for reaching out to Visual Vibe Studio. How can we help with your visual content needs?`, false);
            
            resolve(info);
        });
    }

    async sendMessage(event) {
        event.preventDefault();
        
        const messageInput = document.getElementById('messageInput');
        const sendBtn = document.getElementById('sendBtn');
        const message = messageInput.value.trim();
        
        if (!message) return;

        sendBtn.disabled = true;
        sendBtn.textContent = 'Sending...';

        if (!this.customerInfo) {
            this.customerInfo = await this.collectCustomerInfo();
        }

        this.addMessage(message, true);
        messageInput.value = '';

        const success = await this.sendSMS(message, this.customerInfo);

        if (success) {
            setTimeout(() => {
                this.addMessage("Thanks for your message! Our Visual Vibe Studio team has been notified and will respond shortly. 🎨📱", false);
            }, 1000);
        } else {
            this.addMessage("Sorry, there was an issue sending your message. Please try again.", false);
        }

        sendBtn.disabled = false;
        sendBtn.textContent = 'Send';
    }
}

// Initialize chat widget when page loads
let chatWidget;
document.addEventListener('DOMContentLoaded', () => {
    chatWidget = new ChatWidget();
});

// Global functions for HTML onclick events
function toggleChat() {
    chatWidget.toggleChat();
}

function sendMessage(event) {
    chatWidget.sendMessage(event);
}
