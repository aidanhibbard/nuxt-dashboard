import { ref, readonly } from 'vue'

export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info' | 'loading'
  message: string
  duration?: number
}

const toasts = ref<Toast[]>([])

export const useToast = () => {

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString()
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? (toast.type === 'loading' ? 0 : 5000),
    }

    toasts.value.push(newToast)

    // Auto remove non-loading toasts
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }

    return id
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const showSuccess = (message: string, duration?: number) => {
    return addToast({ type: 'success', message, duration })
  }

  const showError = (message: string, duration?: number) => {
    return addToast({ type: 'error', message, duration })
  }

  const showWarning = (message: string, duration?: number) => {
    return addToast({ type: 'warning', message, duration })
  }

  const showInfo = (message: string, duration?: number) => {
    return addToast({ type: 'info', message, duration })
  }

  const showLoading = (message: string) => {
    return addToast({ type: 'loading', message, duration: 0 })
  }

  const dismiss = (id: string) => {
    removeToast(id)
  }

  return {
    toasts: readonly(toasts),
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    dismiss,
    removeToast,
  }
}
