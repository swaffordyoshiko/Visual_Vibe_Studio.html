// Modern Toast Notification System
class ToastManager {
  constructor() {
    this.container = null;
    this.toasts = [];
    this.createContainer();
  }

  createContainer() {
    this.container = document.createElement('div');
    this.container.className = 'toast-container';
    document.body.appendChild(this.container);
  }

  show(message, type = 'success', options = {}) {
    const {
      title = this.getDefaultTitle(type),
      duration = 6000,
      actions = [],
      persistent = false
    } = options;

    const toast = this.createToast(message, type, title, actions, persistent, duration);
    this.container.appendChild(toast);
    this.toasts.push(toast);

    // Trigger animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    // Auto dismiss (unless persistent)
    if (!persistent && duration > 0) {
      this.startAutoDismiss(toast, duration);
    }

    return toast;
  }

  createToast(message, type, title, actions, persistent, duration) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = this.getIcon(type);
    const actionsHtml = actions.length > 0 ? 
      `<div class="toast-actions">
        ${actions.map(action => 
          `<button class="toast-button ${action.style || 'secondary'}" onclick="${action.onclick}">${action.text}</button>`
        ).join('')}
      </div>` : '';

    toast.innerHTML = `
      <div class="toast-header">
        <div class="toast-icon">${icon}</div>
        <h4 class="toast-title">${title}</h4>
        <button class="toast-close" onclick="toastManager.dismiss(this.closest('.toast'))">&times;</button>
      </div>
      <p class="toast-message">${message}</p>
      ${actionsHtml}
      ${!persistent && duration > 0 ? '<div class="toast-progress"></div>' : ''}
    `;

    return toast;
  }

  startAutoDismiss(toast, duration) {
    const progressBar = toast.querySelector('.toast-progress');
    if (progressBar) {
      progressBar.style.width = '100%';
      progressBar.style.transitionDuration = duration + 'ms';
      
      setTimeout(() => {
        progressBar.style.width = '0%';
      }, 10);
    }

    setTimeout(() => {
      this.dismiss(toast);
    }, duration);
  }

  dismiss(toast) {
    if (!toast || !toast.parentNode) return;

    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
        this.toasts = this.toasts.filter(t => t !== toast);
      }
    }, 400);
  }

  dismissAll() {
    this.toasts.forEach(toast => this.dismiss(toast));
  }

  getIcon(type) {
    const icons = {
      success: '✓',
      error: '✕',
      info: 'i',
      warning: '⚠'
    };
    return icons[type] || icons.info;
  }

  getDefaultTitle(type) {
    const titles = {
      success: 'Success!',
      error: 'Error',
      info: 'Information',
      warning: 'Warning'
    };
    return titles[type] || 'Notification';
  }

  // Convenience methods
  success(message, options = {}) {
    return this.show(message, 'success', options);
  }

  error(message, options = {}) {
    return this.show(message, 'error', options);
  }

  info(message, options = {}) {
    return this.show(message, 'info', options);
  }

  warning(message, options = {}) {
    return this.show(message, 'warning', options);
  }
}

// Create global instance
const toastManager = new ToastManager();

// Make it available globally
window.showToast = (message, type, options) => toastManager.show(message, type, options);
window.toastManager = toastManager;

console.log('Toast notification system loaded');
