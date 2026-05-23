import { ref } from 'vue'
export interface Toast {
  id: number; message: string; type: 'success' | 'error' | 'info'; exiting: boolean
}
const toasts = ref<Toast[]>([])
let idCounter = 0
export function useToast() {
  function addToast(message: string, type: Toast['type'] = 'info', duration = 3500) {
    const id = ++idCounter
    toasts.value.push({ id, message, type, exiting: false })
    setTimeout(() => {
      const t = toasts.value.find(x => x.id === id)
      if (t) t.exiting = true
      setTimeout(() => { toasts.value = toasts.value.filter(x => x.id !== id) }, 300)
    }, duration)
  }
  const success = (msg: string) => addToast(msg, 'success')
  const error   = (msg: string) => addToast(msg, 'error', 5000)
  const info    = (msg: string) => addToast(msg, 'info')
  const remove  = (id: number)  => { toasts.value = toasts.value.filter(x => x.id !== id) }
  return { toasts, success, error, info, remove }
}