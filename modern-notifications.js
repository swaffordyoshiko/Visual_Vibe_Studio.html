// 🎨 MODERN TOAST NOTIFICATION SYSTEM
// Replaces all alert() calls with beautiful toast notifications

console.log('🎨 Loading modern notification system...');

// Modern Toast Notification Manager
class ModernNotificationManager {
    constructor() {
        this.notifications = [];
        this.container = null;
        this.createContainer();
        this.overrideAlerts();
    }
    
    createContainer() {
        // Remove existing container if present
        const existing = document.getElementById('modern-notifications-container');
        if (existing) existing.remove();
        
        // Create new container
        this.container = document.createElement('div');
        this.container.id = 'modern-notifications-container';
        this.container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
            max-width: 400px;
            width: 100%;
        `;
        document.body.appendChild(this.container);
    }
    
    show(message, type = 'info', duration = 4000) {
        const notification = this.createNotification(message, type, duration);
        this.container.appendChild(notification);
        this.notifications.push(notification);
        
        // Trigger entrance animation
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        });
        
        // Auto remove
        setTimeout(() => {
            this.remove(notification);
        }, duration);
        
        return notification;
    }
    
    createNotification(message, type, duration) {
        const notification = document.createElement('div');
        notification.className = 'modern-notification';
        
        // Get colors based on type
        const colors = this.getColors(type);
        const icon = this.getIcon(type);
        
        notification.style.cssText = `
            background: ${colors.bg};
            color: ${colors.text};
            border: 1px solid ${colors.border};
            border-radius: 12px;
            padding: 16px 20px;
            margin-bottom: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
            backdrop-filter: blur(10px);
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            pointer-events: all;
            max-width: 100%;
            word-wrap: break-word;
            display: flex;
            align-items: flex-start;
            gap: 12px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            line-height: 1.4;
        `;
        
        notification.innerHTML = `
            <div style="
                flex-shrink: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                margin-top: 1px;
            ">${icon}</div>
            <div style="flex: 1; min-width: 0;">
                <div style="font-weight: 500; margin-bottom: 2px;">${this.getTitle(type)}</div>
                <div style="opacity: 0.9;">${message}</div>
            </div>
            <button onclick="this.parentElement.remove()" style="
                flex-shrink: 0;
                background: none;
                border: none;
                color: ${colors.text};
                opacity: 0.6;
                cursor: pointer;
                padding: 0;
                margin-left: 8px;
                font-size: 18px;
                line-height: 1;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s ease;
            " onmouseover="this.style.opacity='1'; this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.opacity='0.6'; this.style.background='none'">×</button>
        `;
        
        // Add hover effects
        notification.addEventListener('mouseenter', () => {
            notification.style.transform = 'translateX(-4px) scale(1.02)';
            notification.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
        });
        
        notification.addEventListener('mouseleave', () => {
            notification.style.transform = 'translateX(0) scale(1)';
            notification.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12)';
        });
        
        return notification;
    }
    
    getColors(type) {
        const colorMap = {
            success: {
                bg: 'linear-gradient(135deg, #10b981, #059669)',
                text: '#ffffff',
                border: '#065f46'
            },
            error: {
                bg: 'linear-gradient(135deg, #ef4444, #dc2626)',
                text: '#ffffff', 
                border: '#991b1b'
            },
            warning: {
                bg: 'linear-gradient(135deg, #f59e0b, #d97706)',
                text: '#ffffff',
                border: '#92400e'
            },
            info: {
                bg: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                text: '#ffffff',
                border: '#1d4ed8'
            },
            welcome: {
                bg: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                text: '#ffffff',
                border: '#5b21b6'
            }
        };
        
        return colorMap[type] || colorMap.info;
    }
    
    getIcon(type) {
        const iconMap = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️',
            welcome: '👋'
        };
        
        return iconMap[type] || iconMap.info;
    }
    
    getTitle(type) {
        const titleMap = {
            success: 'Success',
            error: 'Error',
            warning: 'Warning',
            info: 'Info',
            welcome: 'Welcome'
        };
        
        return titleMap[type] || titleMap.info;
    }
    
    remove(notification) {
        if (notification && notification.parentElement) {
            notification.style.transform = 'translateX(100%) scale(0.95)';
            notification.style.opacity = '0';
            
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.parentElement.removeChild(notification);
                }
            }, 300);
            
            // Remove from array
            const index = this.notifications.indexOf(notification);
            if (index > -1) {
                this.notifications.splice(index, 1);
            }
        }
    }
    
    clear() {
        this.notifications.forEach(notification => {
            if (notification && notification.parentElement) {
                notification.parentElement.removeChild(notification);
            }
        });
        this.notifications = [];
    }
    
    // Override the global alert function
    overrideAlerts() {
        const originalAlert = window.alert;
        const originalConfirm = window.confirm;
        
        window.alert = (message) => {
            // Determine type based on message content
            let type = 'info';
            if (message.includes('✅') || message.includes('Welcome') || message.includes('success')) {
                type = 'success';
            } else if (message.includes('❌') || message.includes('Error') || message.includes('failed')) {
                type = 'error';
            } else if (message.includes('⚠️') || message.includes('Warning')) {
                type = 'warning';
            } else if (message.includes('Welcome back') || message.includes('Welcome to')) {
                type = 'welcome';
            }
            
            this.show(message, type);
        };
        
        // Enhanced confirm with modern styling
        window.confirm = (message) => {
            return new Promise((resolve) => {
                const confirmDiv = document.createElement('div');
                confirmDiv.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(4px);
                    z-index: 10001;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                `;
                
                confirmDiv.innerHTML = `
                    <div style="
                        background: white;
                        border-radius: 16px;
                        padding: 24px;
                        max-width: 400px;
                        width: 100%;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
                        transform: scale(0.9);
                        opacity: 0;
                        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                    ">
                        <div style="
                            color: #1f2937;
                            font-size: 18px;
                            font-weight: 600;
                            margin-bottom: 12px;
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        ">Confirm Action</div>
                        <div style="
                            color: #4b5563;
                            font-size: 14px;
                            line-height: 1.5;
                            margin-bottom: 24px;
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        ">${message}</div>
                        <div style="
                            display: flex;
                            gap: 12px;
                            justify-content: flex-end;
                        ">
                            <button onclick="this.closest('[style*=\"position: fixed\"]').style.opacity='0'; setTimeout(() => this.closest('[style*=\"position: fixed\"]').remove(), 300); arguments[0].resolve(false)" style="
                                background: #f3f4f6;
                                color: #374151;
                                border: none;
                                padding: 12px 24px;
                                border-radius: 8px;
                                font-size: 14px;
                                font-weight: 500;
                                cursor: pointer;
                                transition: all 0.2s ease;
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                            " onmouseover="this.style.background='#e5e7eb'" onmouseout="this.style.background='#f3f4f6'">Cancel</button>
                            <button onclick="this.closest('[style*=\"position: fixed\"]').style.opacity='0'; setTimeout(() => this.closest('[style*=\"position: fixed\"]').remove(), 300); arguments[0].resolve(true)" style="
                                background: linear-gradient(135deg, #ef4444, #dc2626);
                                color: white;
                                border: none;
                                padding: 12px 24px;
                                border-radius: 8px;
                                font-size: 14px;
                                font-weight: 500;
                                cursor: pointer;
                                transition: all 0.2s ease;
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                            " onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(239, 68, 68, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">Confirm</button>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(confirmDiv);
                
                // Animate in
                requestAnimationFrame(() => {
                    confirmDiv.style.opacity = '1';
                    const modal = confirmDiv.querySelector('div');
                    modal.style.transform = 'scale(1)';
                    modal.style.opacity = '1';
                });
                
                // Pass resolve function to buttons
                const buttons = confirmDiv.querySelectorAll('button');
                buttons.forEach(button => {
                    const originalOnClick = button.onclick;
                    button.onclick = function(e) {
                        const result = button.textContent.trim() === 'Confirm';
                        confirmDiv.style.opacity = '0';
                        setTimeout(() => {
                            if (confirmDiv.parentElement) {
                                confirmDiv.parentElement.removeChild(confirmDiv);
                            }
                            resolve(result);
                        }, 300);
                    };
                });
                
                // Close on backdrop click
                confirmDiv.onclick = function(e) {
                    if (e.target === confirmDiv) {
                        confirmDiv.style.opacity = '0';
                        setTimeout(() => {
                            if (confirmDiv.parentElement) {
                                confirmDiv.parentElement.removeChild(confirmDiv);
                            }
                            resolve(false);
                        }, 300);
                    }
                };
            });
        };
        
        console.log('✅ Alert and confirm functions modernized');
    }
    
    // Convenience methods
    success(message, duration = 4000) {
        return this.show(message, 'success', duration);
    }
    
    error(message, duration = 5000) {
        return this.show(message, 'error', duration);
    }
    
    warning(message, duration = 4000) {
        return this.show(message, 'warning', duration);
    }
    
    info(message, duration = 4000) {
        return this.show(message, 'info', duration);
    }
    
    welcome(message, duration = 5000) {
        return this.show(message, 'welcome', duration);
    }
}

// Create global instance
window.modernNotifications = new ModernNotificationManager();

// Export convenience functions to global scope
window.showToast = (message, type, duration) => window.modernNotifications.show(message, type, duration);
window.showSuccess = (message, duration) => window.modernNotifications.success(message, duration);
window.showError = (message, duration) => window.modernNotifications.error(message, duration);
window.showWarning = (message, duration) => window.modernNotifications.warning(message, duration);
window.showInfo = (message, duration) => window.modernNotifications.info(message, duration);
window.showWelcome = (message, duration) => window.modernNotifications.welcome(message, duration);

// Test notification on load
setTimeout(() => {
    window.modernNotifications.success('Modern notification system activated! 🎉', 3000);
}, 1000);

console.log('✅ Modern notification system loaded successfully!');
console.log('📱 Available methods: showToast(), showSuccess(), showError(), showWarning(), showInfo(), showWelcome()');
