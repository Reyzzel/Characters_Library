import { describe, it, expect } from 'vitest'
import { useCharacterForm }     from '@/composables/useCharacterForm'

describe('useCharacterForm', () => {

  it('initializes with empty values when no data passed', () => {
    const { form } = useCharacterForm()
    expect(form.name).toBe('')
    expect(form.rarity).toBe(4)
    expect(form.weaponTypeId).toBe(0)
    expect(form.elementId).toBe(0)
  })

  it('initializes with provided character data', () => {
    const { form } = useCharacterForm({ name: 'Hu Tao', rarity: 5, elementId: 1, weaponTypeId: 5 })
    expect(form.name).toBe('Hu Tao')
    expect(form.rarity).toBe(5)
  })

  it('strips time part from releaseDate on init', () => {
    const { form } = useCharacterForm({ releaseDate: '2021-03-02T00:00:00' })
    expect(form.releaseDate).toBe('2021-03-02')
  })

  it('validate returns false when name is empty', () => {
    const { form, validate, errors } = useCharacterForm()
    form.weaponTypeId = 1; form.elementId = 1
    expect(validate()).toBe(false)
    expect(errors.name).toBeDefined()
  })

  it('validate returns false when name is too short', () => {
    const { form, validate, errors } = useCharacterForm()
    form.name = 'A'; form.weaponTypeId = 1; form.elementId = 1
    expect(validate()).toBe(false)
    expect(errors.name).toContain('2')
  })

  it('validate returns false when elementId is 0', () => {
    const { form, validate, errors } = useCharacterForm()
    form.name = 'Test'; form.weaponTypeId = 1
    expect(validate()).toBe(false)
    expect(errors.elementId).toBeDefined()
  })

  it('validate returns false when weaponTypeId is 0', () => {
    const { form, validate, errors } = useCharacterForm()
    form.name = 'Test'; form.elementId = 1
    expect(validate()).toBe(false)
    expect(errors.weaponTypeId).toBeDefined()
  })

  it('validate returns true with all required fields', () => {
    const { validate } = useCharacterForm({ name: 'Zhongli', rarity: 5, elementId: 7, weaponTypeId: 5 })
    expect(validate()).toBe(true)
  })

  it('isValid is false with empty form', () => {
    expect(useCharacterForm().isValid.value).toBe(false)
  })

  it('isValid is true when all required fields are filled', () => {
    const { isValid } = useCharacterForm({ name: 'Xiao', rarity: 5, weaponTypeId: 5, elementId: 3 })
    expect(isValid.value).toBe(true)
  })

  it('reset clears form back to defaults', () => {
    const { form, reset } = useCharacterForm({ name: 'Test' })
    reset()
    expect(form.name).toBe('')
    expect(form.rarity).toBe(4)
  })

  it('toPayload trims name whitespace', () => {
    const { form, toPayload } = useCharacterForm()
    form.name = '  Hu Tao  '
    expect(toPayload().name).toBe('Hu Tao')
  })

  it('toPayload converts empty title to null', () => {
    const { form, toPayload } = useCharacterForm({ name: 'Test' })
    form.title = ''
    expect(toPayload().title).toBeNull()
  })

  it('toPayload converts releaseDate string to ISO format', () => {
    const { form, toPayload } = useCharacterForm({ name: 'Test' })
    form.releaseDate = '2021-03-02'
    expect(toPayload().releaseDate).toMatch(/^\d{4}-\d{2}-\d{2}T/)
  })

})
