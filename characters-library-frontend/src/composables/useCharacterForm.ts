import { reactive, computed, ref } from 'vue'
export interface CharacterForm {
  name: string; title: string; description: string; rarity: number
  releaseDate: string; weaponTypeId: number; elementId: number
}
export function useCharacterForm(initial?: Partial<CharacterForm> & { id?: number }) {
  const currentId = ref(initial?.id ?? 0)
  const form = reactive<CharacterForm>({
    name: initial?.name ?? '', title: initial?.title ?? '',
    description: initial?.description ?? '', rarity: initial?.rarity ?? 4,
    releaseDate: initial?.releaseDate ? (initial.releaseDate.split('T')[0] ?? '') : '',
    weaponTypeId: initial?.weaponTypeId ?? 0, elementId: initial?.elementId ?? 0,
  })
  const errors  = reactive<Record<string, string>>({})
  const touched = reactive<Record<string, boolean>>({})
  function validateField(f: string) {
    delete errors[f]
    if (f === 'name') {
      if (!form.name.trim())                errors.name = 'Name is required'
      else if (form.name.trim().length < 2) errors.name = 'Min 2 characters'
    }
    if (f === 'elementId'    && !form.elementId)    errors.elementId    = 'Element is required'
    if (f === 'weaponTypeId' && !form.weaponTypeId) errors.weaponTypeId = 'Weapon type is required'
    if (f === 'rarity' && (form.rarity < 1 || form.rarity > 5)) errors.rarity = '1-5'
  }
  function touch(f: string) { touched[f] = true; validateField(f) }
  function validate() {
    ;['name','rarity','elementId','weaponTypeId'].forEach(f => { touched[f] = true; validateField(f) })
    return Object.keys(errors).length === 0
  }
  const isValid = computed(() =>
    form.name.trim().length >= 2 && form.rarity >= 1 && form.rarity <= 5 &&
    form.weaponTypeId > 0 && form.elementId > 0)
  function reset(d?: Partial<CharacterForm> & { id?: number }) {
    currentId.value = d?.id ?? 0
    form.name = d?.name ?? ''; form.title = d?.title ?? ''
    form.description = d?.description ?? ''; form.rarity = d?.rarity ?? 4
    form.releaseDate = d?.releaseDate ? (d.releaseDate.split('T')[0] ?? '') : ''
    form.weaponTypeId = d?.weaponTypeId ?? 0; form.elementId = d?.elementId ?? 0
    Object.keys(errors).forEach(k => delete errors[k])
    Object.keys(touched).forEach(k => delete touched[k])
  }
  function toPayload() {
    return {
      id: currentId.value,
      name: form.name.trim(),
      title: form.title.trim() || null,
      description: form.description.trim() || null,
      rarity: Number(form.rarity),
      weaponTypeId: Number(form.weaponTypeId),
      elementId: Number(form.elementId),
      releaseDate: form.releaseDate ? new Date(form.releaseDate).toISOString() : null,
    }
  }
  return { form, errors, touched, touch, validate, isValid, reset, toPayload }
}