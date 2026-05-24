import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ElementBadge from '@/components/ElementBadge.vue'

describe('ElementBadge.vue', () => {
  it('renders Pyro icon correctly', () => {
    const wrapper = mount(ElementBadge, {
      props: {
        element: { name: 'Pyro', color: '#ff0000' }
      }
    })
    // Expect it to render fa-fire icon
    expect(wrapper.html()).toContain('fa-fire')
    // Expect it not to show name if showName is false/undefined
    expect(wrapper.text()).not.toContain('Pyro')
    // Expect colors to be correctly applied
    const spanStyle = wrapper.attributes('style')
    expect(spanStyle).toContain('background-color')
    expect(spanStyle).toContain('border-color')
    expect(spanStyle).toContain('color: rgb(255, 0, 0)') // #ff0000 should be parsed or left as is
  })

  it('renders element name if showName is true', () => {
    const wrapper = mount(ElementBadge, {
      props: {
        element: { name: 'Hydro' },
        showName: true
      }
    })
    expect(wrapper.html()).toContain('fa-droplet')
    expect(wrapper.text()).toContain('Hydro')
  })

  it('renders default icon and color when not matched', () => {
    const wrapper = mount(ElementBadge, {
      props: {
        element: { name: 'Unknown' },
        showName: true
      }
    })
    expect(wrapper.text()).toContain('✨')
    expect(wrapper.text()).toContain('Unknown')
  })
})
