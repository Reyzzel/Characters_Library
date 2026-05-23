import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { charactersApi, elementsApi, weaponTypesApi } from '@/services/api'

export interface Element    { id: number; name: string; color?: string }
export interface WeaponType { id: number; name: string }
export interface Talent     { id: number; name: string; description?: string; talentType?: string; characterId: number }
export interface Character  {
  id: number; name: string; title?: string; description?: string; rarity: number
  releaseDate?: string; weaponTypeId: number; weaponType?: WeaponType
  elementId: number; element?: Element; talents: Talent[]
}

export const useCharactersStore = defineStore('characters', () => {
  const characters  = ref<Character[]>([])
  const elements    = ref<Element[]>([])
  const weaponTypes = ref<WeaponType[]>([])
  const loading = ref(false)
  const error   = ref<string | null>(null)
  const searchQuery     = ref('')
  const selectedElement = ref<number | null>(null)
  const selectedWeapon  = ref<number | null>(null)
  const selectedRarity  = ref<number | null>(null)

  const filteredCharacters = computed(() => {
    let r = characters.value
    if (searchQuery.value.trim())
      r = r.filter(c => c.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    if (selectedElement.value !== null) r = r.filter(c => c.elementId    === selectedElement.value)
    if (selectedWeapon.value  !== null) r = r.filter(c => c.weaponTypeId === selectedWeapon.value)
    if (selectedRarity.value  !== null) r = r.filter(c => c.rarity       === selectedRarity.value)
    return r
  })
  const totalCount    = computed(() => characters.value.length)
  const filteredCount = computed(() => filteredCharacters.value.length)
  const hasFilters    = computed(() =>
    searchQuery.value.trim() !== '' || selectedElement.value !== null ||
    selectedWeapon.value !== null || selectedRarity.value !== null)

  async function fetchAll() {
    loading.value = true; error.value = null
    try {
      const [ch, el, wt] = await Promise.all([
        charactersApi.getAll(), elementsApi.getAll(), weaponTypesApi.getAll()])
      elements.value = el.data; weaponTypes.value = wt.data
      
      characters.value = ch.data.map((c: Character) => ({
        ...c,
        element: el.data.find((e: Element) => e.id === c.elementId),
        weaponType: wt.data.find((w: WeaponType) => w.id === c.weaponTypeId)
      }))
    } catch (e: unknown) { error.value = (e as Error).message
    } finally { loading.value = false }
  }
  async function createCharacter(data: unknown) {
    const r = await charactersApi.create(data);
    const newChar = r.data as Character;
    newChar.element = elements.value.find(e => e.id === newChar.elementId);
    newChar.weaponType = weaponTypes.value.find(w => w.id === newChar.weaponTypeId);
    characters.value.push(newChar);
    return newChar;
  }
  async function updateCharacter(id: number, data: unknown) {
    await charactersApi.update(id, data)
    const i = characters.value.findIndex(c => c.id === id)
    if (i !== -1) {
      const partial = data as Partial<Character>;
      const merged = { ...characters.value[i], ...partial } as Character;
      if (partial.elementId) merged.element = elements.value.find(e => e.id === merged.elementId) || merged.element;
      if (partial.weaponTypeId) merged.weaponType = weaponTypes.value.find(w => w.id === merged.weaponTypeId) || merged.weaponType;
      characters.value[i] = merged;
    }
  }
  async function deleteCharacter(id: number) {
    await charactersApi.delete(id)
    characters.value = characters.value.filter(c => c.id !== id)
  }
  function resetFilters() {
    searchQuery.value = ''; selectedElement.value = null
    selectedWeapon.value = null; selectedRarity.value = null
  }
  return { characters, elements, weaponTypes, loading, error,
    searchQuery, selectedElement, selectedWeapon, selectedRarity,
    filteredCharacters, totalCount, filteredCount, hasFilters,
    fetchAll, createCharacter, updateCharacter, deleteCharacter, resetFilters }
})