import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

describe('ConfirmDialog.vue', () => {
  it('renders nothing when show is false', () => {
    const wrapper = mount(ConfirmDialog, {
      global: { stubs: { teleport: true } },
      props: { show: false, message: 'Are you sure?' }
    })
    expect(wrapper.find('div[class*="fixed"]').exists()).toBe(false)
  })

  it('renders dialog when show is true', () => {
    const wrapper = mount(ConfirmDialog, {
      global: { stubs: { teleport: true } },
      props: { show: true, message: 'Are you sure?' }
    })
    expect(wrapper.find('div[class*="fixed"]').exists()).toBe(true)
  })

  it('renders default title "Confirm" when no title prop given', () => {
    const wrapper = mount(ConfirmDialog, {
      global: { stubs: { teleport: true } },
      props: { show: true, message: 'Delete this?' }
    })
    expect(wrapper.text()).toContain('Confirm')
  })

  it('renders custom title when provided', () => {
    const wrapper = mount(ConfirmDialog, {
      global: { stubs: { teleport: true } },
      props: { show: true, title: 'Remove Character', message: 'Are you sure?' }
    })
    expect(wrapper.text()).toContain('Remove Character')
  })

  it('renders message text', () => {
    const wrapper = mount(ConfirmDialog, {
      global: { stubs: { teleport: true } },
      props: { show: true, message: 'This action cannot be undone.' }
    })
    expect(wrapper.text()).toContain('This action cannot be undone.')
  })

  it('renders default confirm button label "Delete"', () => {
    const wrapper = mount(ConfirmDialog, {
      global: { stubs: { teleport: true } },
      props: { show: true, message: 'Delete?' }
    })
    const buttons = wrapper.findAll('button')
    const confirmBtn = buttons.find(b => b.text() !== 'Cancel')
    expect(confirmBtn!.text()).toBe('Delete')
  })

  it('renders custom confirm button label', () => {
    const wrapper = mount(ConfirmDialog, {
      global: { stubs: { teleport: true } },
      props: { show: true, message: 'Remove?', confirmLabel: 'Yes, remove' }
    })
    const buttons = wrapper.findAll('button')
    const confirmBtn = buttons.find(b => b.text() !== 'Cancel')
    expect(confirmBtn!.text()).toBe('Yes, remove')
  })

  it('emits "confirm" when confirm button is clicked', async () => {
    const wrapper = mount(ConfirmDialog, {
      global: { stubs: { teleport: true } },
      props: { show: true, message: 'Sure?' }
    })
    const buttons = wrapper.findAll('button')
    const confirmBtn = buttons.find(b => b.text() !== 'Cancel')!
    await confirmBtn.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('confirm')
  })

  it('emits "cancel" when cancel button is clicked', async () => {
    const wrapper = mount(ConfirmDialog, {
      global: { stubs: { teleport: true } },
      props: { show: true, message: 'Sure?' }
    })
    const cancelBtn = wrapper.findAll('button').find(b => b.text() === 'Cancel')!
    await cancelBtn.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('cancel')
  })

  it('emits "cancel" when overlay backdrop is clicked', async () => {
    const wrapper = mount(ConfirmDialog, {
      global: { stubs: { teleport: true } },
      props: { show: true, message: 'Sure?' }
    })
    const overlay = wrapper.find('div[class*="fixed"]')
    await overlay.trigger('mousedown')
    expect(wrapper.emitted()).toHaveProperty('cancel')
  })

  it('disables confirm button when loading is true', () => {
    const wrapper = mount(ConfirmDialog, {
      global: { stubs: { teleport: true } },
      props: { show: true, message: 'Sure?', loading: true }
    })
    const buttons = wrapper.findAll('button')
    const confirmBtn = buttons.find(b => b.text() !== 'Cancel')!
    expect((confirmBtn.element as HTMLButtonElement).disabled).toBe(true)
  })

  it('confirm button is enabled when loading is false', () => {
    const wrapper = mount(ConfirmDialog, {
      global: { stubs: { teleport: true } },
      props: { show: true, message: 'Sure?', loading: false }
    })
    const buttons = wrapper.findAll('button')
    const confirmBtn = buttons.find(b => b.text() !== 'Cancel')!
    expect((confirmBtn.element as HTMLButtonElement).disabled).toBe(false)
  })

  it('renders warning icon', () => {
    const wrapper = mount(ConfirmDialog, {
      global: { stubs: { teleport: true } },
      props: { show: true, message: 'Sure?' }
    })
    expect(wrapper.find('i.fa-triangle-exclamation').exists()).toBe(true)
  })
})
