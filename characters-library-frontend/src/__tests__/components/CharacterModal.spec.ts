import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CharacterModal from '@/components/CharacterModal.vue'

describe('CharacterModal.vue', () => {
  const elements = [{ id: 1, name: 'Pyro' }, { id: 2, name: 'Hydro' }]
  const weaponTypes = [{ id: 1, name: 'Sword' }, { id: 2, name: 'Polearm' }]
  
  const mockCharacter = {
    id: 1, name: 'Hu Tao', title: 'Director', description: 'desc', 
    rarity: 5, elementId: 1, weaponTypeId: 2, releaseDate: '2021-03-02', imageUrl: '', talents: []
  }

  it('renders "New Character" when character prop is empty', () => {
    const wrapper = mount(CharacterModal, {
      global: { stubs: { teleport: true } },
      props: {
        show: true,
        elements,
        weaponTypes
      }
    })
    expect(wrapper.text()).toContain('New Character')
    const buttons = wrapper.findAll('button')
    // Submit button should say "Create"
    expect(buttons[buttons.length - 1].text()).toBe('Create')
  })

  it('renders "Edit Character" when character prop is provided', () => {
    const wrapper = mount(CharacterModal, {
      global: { stubs: { teleport: true } },
      props: {
        show: true,
        character: mockCharacter,
        elements,
        weaponTypes
      }
    })
    expect(wrapper.text()).toContain('Edit Character')
    const buttons = wrapper.findAll('button')
    // Submit button should say "Save"
    expect(buttons[buttons.length - 1].text()).toBe('Save')
    
    const inputName = wrapper.find('input[type="text"]').element as HTMLInputElement
    expect(inputName.value).toBe('Hu Tao')
  })

  it('emits "close" when cancel is clicked', async () => {
    const wrapper = mount(CharacterModal, {
      global: { stubs: { teleport: true } },
      props: { show: true, elements, weaponTypes }
    })
    
    const cancelBtn = wrapper.findAll('button').find(b => b.text() === 'Cancel')
    await cancelBtn!.trigger('click')
    
    expect(wrapper.emitted()).toHaveProperty('close')
  })

  it('emits "submit" with form payload when valid form is submitted', async () => {
    const wrapper = mount(CharacterModal, {
      global: { stubs: { teleport: true } },
      props: { show: true, elements, weaponTypes }
    })
    
    // Fill required fields
    const inputs = wrapper.findAll('input')
    const selects = wrapper.findAll('select')
    
    await inputs[0].setValue('Zhongli')
    // Rarity is pre-set to 5 or 1
    // Element
    await selects[0].setValue(2) // Hydro
    // Weapon
    await selects[1].setValue(2) // Polearm
    
    await wrapper.find('form').trigger('submit.prevent')
    
    expect(wrapper.emitted()).toHaveProperty('submit')
    const payload = wrapper.emitted('submit')![0][0] as any
    expect(payload.name).toBe('Zhongli')
    expect(payload.elementId).toBe(2)
    expect(payload.weaponTypeId).toBe(2)
  })
})
