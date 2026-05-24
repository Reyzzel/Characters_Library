import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import ToastContainer from '@/components/ToastContainer.vue'
import { useToast } from '@/composables/useToast'

describe('ToastContainer.vue', () => {
  beforeEach(() => {
    const { toasts } = useToast()
    toasts.value = []
  })

  it('renders nothing when there are no toasts', () => {
    const wrapper = mount(ToastContainer, {
      global: { stubs: { teleport: true, transitiongroup: false } }
    })
    // Vue Test Utils renders Teleport contents as child elements by default
    const toastItems = wrapper.findAll('div.pointer-events-auto')
    expect(toastItems.length).toBe(0)
  })

  it('renders toasts correctly', async () => {
    const { success, error } = useToast()
    success('Saved successfully!')
    error('Failed to save!')

    const wrapper = mount(ToastContainer, {
      global: { stubs: { teleport: true, transitiongroup: false } }
    })
    // wait for DOM to update after composable change
    await wrapper.vm.$nextTick()
    
    const toastItems = wrapper.findAll('div.pointer-events-auto')
    expect(toastItems.length).toBe(2)
    
    // First toast (success)
    expect(toastItems[0].text()).toContain('Saved successfully!')
    expect(toastItems[0].classes()).toContain('bg-green-50')
    expect(toastItems[0].find('i').classes()).toContain('fa-square-check')
    
    // Second toast (error)
    expect(toastItems[1].text()).toContain('Failed to save!')
    expect(toastItems[1].classes()).toContain('bg-red-50')
    expect(toastItems[1].find('i').classes()).toContain('fa-xmark')
  })

  it('removes toast when close button is clicked', async () => {
    const { info, toasts } = useToast()
    info('Some info toast')
    
    const wrapper = mount(ToastContainer, {
      global: { stubs: { teleport: true, transitiongroup: false } }
    })
    await wrapper.vm.$nextTick()
    
    const closeBtn = wrapper.find('button')
    await closeBtn.trigger('click')
    
    // Should remove the toast from the state
    expect(toasts.value.length).toBe(0)
  })
})
