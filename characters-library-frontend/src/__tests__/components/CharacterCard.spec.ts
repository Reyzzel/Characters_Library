import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CharacterCard from '@/components/CharacterCard.vue'
import type { Character } from '@/stores/characters'

const mockCharacter: Character = {
  id: 1,
  name: 'Hu Tao',
  title: 'Director of the Wangsheng Funeral Parlor',
  description: 'The 77th Director of the Wangsheng Funeral Parlor.',
  rarity: 5,
  elementId: 1,
  weaponTypeId: 2,
  talents: [],
  element: { id: 1, name: 'Pyro', color: '#ff6b35' },
  weaponType: { id: 2, name: 'Polearm' },
}

describe('CharacterCard.vue', () => {
  it('renders character name', () => {
    const wrapper = mount(CharacterCard, { props: { character: mockCharacter } })
    expect(wrapper.text()).toContain('Hu Tao')
  })

  it('renders character title if provided', () => {
    const wrapper = mount(CharacterCard, { props: { character: mockCharacter } })
    expect(wrapper.text()).toContain('Director of the Wangsheng Funeral Parlor')
  })

  it('does NOT render title if title is absent', () => {
    const noTitle: Character = { ...mockCharacter, title: undefined }
    const wrapper = mount(CharacterCard, { props: { character: noTitle } })
    const p = wrapper.find('p.italic')
    expect(p.exists()).toBe(false)
  })

  it('renders character description', () => {
    const wrapper = mount(CharacterCard, { props: { character: mockCharacter } })
    expect(wrapper.text()).toContain('The 77th Director')
  })

  it('renders fallback "No description." when description is absent', () => {
    const noDesc: Character = { ...mockCharacter, description: undefined }
    const wrapper = mount(CharacterCard, { props: { character: noDesc } })
    expect(wrapper.text()).toContain('No description.')
  })

  it('renders image when imageUrl is provided', () => {
    const withImage: Character = { ...mockCharacter, imageUrl: 'https://example.com/hu-tao.jpg' }
    const wrapper = mount(CharacterCard, { props: { character: withImage } })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/hu-tao.jpg')
    expect(img.attributes('alt')).toBe('Hu Tao')
  })

  it('does NOT render image block when imageUrl is absent', () => {
    const noImage: Character = { ...mockCharacter, imageUrl: undefined }
    const wrapper = mount(CharacterCard, { props: { character: noImage } })
    expect(wrapper.find('img').exists()).toBe(false)
  })

  it('renders weapon type badge', () => {
    const wrapper = mount(CharacterCard, { props: { character: mockCharacter } })
    expect(wrapper.text()).toContain('Polearm')
  })

  it('shows amber gradient top line for rarity 5', () => {
    const wrapper = mount(CharacterCard, { props: { character: mockCharacter } })
    const div = wrapper.find('div.h-0\\.5')
    expect(div.classes().join(' ')).toContain('from-amber-400')
  })

  it('shows purple top line for rarity 4', () => {
    const rarity4: Character = { ...mockCharacter, rarity: 4 }
    const wrapper = mount(CharacterCard, { props: { character: rarity4 } })
    const div = wrapper.find('div.h-0\\.5')
    expect(div.classes()).toContain('bg-purple-400')
  })

  it('shows blue top line for rarity below 4', () => {
    const rarity3: Character = { ...mockCharacter, rarity: 3 }
    const wrapper = mount(CharacterCard, { props: { character: rarity3 } })
    const div = wrapper.find('div.h-0\\.5')
    expect(div.classes()).toContain('bg-blue-400')
  })

  it('emits "view" event when card is clicked', async () => {
    const wrapper = mount(CharacterCard, { props: { character: mockCharacter } })
    await wrapper.find('article').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('view')
    expect(wrapper.emitted('view')![0][0]).toMatchObject({ id: 1, name: 'Hu Tao' })
  })

  it('emits "edit" event when edit button is clicked', async () => {
    const wrapper = mount(CharacterCard, { props: { character: mockCharacter } })
    const editBtn = wrapper.findAll('button')[0]!
    await editBtn.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('edit')
    expect(wrapper.emitted('edit')![0][0]).toMatchObject({ id: 1 })
  })

  it('emits "delete" event when delete button is clicked', async () => {
    const wrapper = mount(CharacterCard, { props: { character: mockCharacter } })
    const deleteBtn = wrapper.findAll('button')[1]!
    await deleteBtn.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('delete')
    expect(wrapper.emitted('delete')![0][0]).toMatchObject({ id: 1 })
  })

  it('delete button click does NOT bubble to trigger "view"', async () => {
    const wrapper = mount(CharacterCard, { props: { character: mockCharacter } })
    const deleteBtn = wrapper.findAll('button')[1]!
    await deleteBtn.trigger('click')
    // "view" should NOT be emitted because @click.stop is applied on the button container
    expect(wrapper.emitted('view')).toBeUndefined()
  })
})
