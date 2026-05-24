import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import RarityStars from '@/components/RarityStars.vue'

describe('RarityStars.vue', () => {
  it('renders exactly 5 star icons', () => {
    const wrapper = mount(RarityStars, { props: { rarity: 3 } })
    const stars = wrapper.findAll('i.fa-star')
    expect(stars.length).toBe(5)
  })

  it('active stars have amber color class for rarity 5', () => {
    const wrapper = mount(RarityStars, { props: { rarity: 5 } })
    const spans = wrapper.findAll('span')
    // All 5 stars should be amber
    spans.forEach(span => {
      expect(span.classes()).toContain('text-amber-400')
    })
  })

  it('only first N stars are amber for rarity N', () => {
    const wrapper = mount(RarityStars, { props: { rarity: 3 } })
    const spans = wrapper.findAll('span')
    // First 3 — amber, last 2 — stone
    for (let i = 0; i < 3; i++) {
      expect(spans[i]!.classes()).toContain('text-amber-400')
    }
    for (let i = 3; i < 5; i++) {
      expect(spans[i]!.classes()).toContain('text-stone-200')
    }
  })

  it('uses text-xs class when size is sm', () => {
    const wrapper = mount(RarityStars, { props: { rarity: 4, size: 'sm' } })
    const spans = wrapper.findAll('span')
    spans.forEach(span => {
      expect(span.classes()).toContain('text-xs')
    })
  })

  it('uses text-lg class when size is lg', () => {
    const wrapper = mount(RarityStars, { props: { rarity: 4, size: 'lg' } })
    const spans = wrapper.findAll('span')
    spans.forEach(span => {
      expect(span.classes()).toContain('text-lg')
    })
  })

  it('uses text-sm class when size is md or not provided', () => {
    const wrapper = mount(RarityStars, { props: { rarity: 4, size: 'md' } })
    const spans = wrapper.findAll('span')
    spans.forEach(span => {
      expect(span.classes()).toContain('text-sm')
    })
  })

  it('renders 1 amber star for rarity 1', () => {
    const wrapper = mount(RarityStars, { props: { rarity: 1 } })
    const spans = wrapper.findAll('span')
    expect(spans[0]!.classes()).toContain('text-amber-400')
    for (let i = 1; i < 5; i++) {
      expect(spans[i]!.classes()).toContain('text-stone-200')
    }
  })
})
