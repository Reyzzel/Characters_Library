import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCharactersStore } from '@/stores/characters'

// Mock the API module so no real HTTP requests are made
vi.mock('@/services/api', () => ({
  charactersApi: {
    getAll:  vi.fn(),
    create:  vi.fn(),
    update:  vi.fn(),
    delete:  vi.fn(),
    getById: vi.fn(),
  },
  elementsApi: {
    getAll:  vi.fn(),
    getById: vi.fn(),
    create:  vi.fn(),
    update:  vi.fn(),
    delete:  vi.fn(),
  },
  weaponTypesApi: {
    getAll:  vi.fn(),
    getById: vi.fn(),
    create:  vi.fn(),
    update:  vi.fn(),
    delete:  vi.fn(),
  },
  default: {},
}))

import { charactersApi, elementsApi, weaponTypesApi } from '@/services/api'

const mockElements    = [{ id: 1, name: 'Pyro', color: '#ff0000' }, { id: 2, name: 'Hydro', color: '#0000ff' }]
const mockWeaponTypes = [{ id: 1, name: 'Sword' }, { id: 2, name: 'Polearm' }]
const mockCharacters  = [
  { id: 1, name: 'Hu Tao',  rarity: 5, elementId: 1, weaponTypeId: 2, talents: [] },
  { id: 2, name: 'Xingqiu', rarity: 4, elementId: 2, weaponTypeId: 1, talents: [] },
]

describe('useCharactersStore', () => {
  beforeEach(() => {
    // Reset pinia state before each test
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  // Initial state
  it('has empty initial state', () => {
    const store = useCharactersStore()
    expect(store.characters).toEqual([])
    expect(store.elements).toEqual([])
    expect(store.weaponTypes).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('hasFilters is false initially', () => {
    const store = useCharactersStore()
    expect(store.hasFilters).toBe(false)
  })

  it('totalCount is 0 initially', () => {
    const store = useCharactersStore()
    expect(store.totalCount).toBe(0)
  })

  // fetchAll
  it('fetchAll loads characters, elements and weaponTypes', async () => {
    vi.mocked(charactersApi.getAll).mockResolvedValue({ data: mockCharacters } as any)
    vi.mocked(elementsApi.getAll).mockResolvedValue({ data: mockElements } as any)
    vi.mocked(weaponTypesApi.getAll).mockResolvedValue({ data: mockWeaponTypes } as any)

    const store = useCharactersStore()
    await store.fetchAll()

    expect(store.characters.length).toBe(2)
    expect(store.elements.length).toBe(2)
    expect(store.weaponTypes.length).toBe(2)
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('fetchAll joins element and weaponType onto each character', async () => {
    vi.mocked(charactersApi.getAll).mockResolvedValue({ data: mockCharacters } as any)
    vi.mocked(elementsApi.getAll).mockResolvedValue({ data: mockElements } as any)
    vi.mocked(weaponTypesApi.getAll).mockResolvedValue({ data: mockWeaponTypes } as any)

    const store = useCharactersStore()
    await store.fetchAll()

    const huTao = store.characters.find(c => c.id === 1)!
    expect(huTao.element?.name).toBe('Pyro')
    expect(huTao.weaponType?.name).toBe('Polearm')
  })

  it('fetchAll sets error and clears loading on failure', async () => {
    vi.mocked(charactersApi.getAll).mockRejectedValue(new Error('Network error'))
    vi.mocked(elementsApi.getAll).mockResolvedValue({ data: [] } as any)
    vi.mocked(weaponTypesApi.getAll).mockResolvedValue({ data: [] } as any)

    const store = useCharactersStore()
    await store.fetchAll()

    expect(store.error).toBe('Network error')
    expect(store.loading).toBe(false)
  })

  // createCharacter
  it('createCharacter adds new character to the store', async () => {
    const newChar = { id: 3, name: 'Zhongli', rarity: 5, elementId: 2, weaponTypeId: 1, talents: [] }
    vi.mocked(charactersApi.create).mockResolvedValue({ data: newChar } as any)

    const store = useCharactersStore()
    store.elements = mockElements
    store.weaponTypes = mockWeaponTypes

    await store.createCharacter(newChar)

    expect(store.characters.length).toBe(1)
    expect(store.characters[0]!.name).toBe('Zhongli')
    expect(store.characters[0]!.element?.name).toBe('Hydro')
    expect(store.characters[0]!.weaponType?.name).toBe('Sword')
  })

  // updateCharacter
  it('updateCharacter modifies the character in the store', async () => {
    vi.mocked(charactersApi.update).mockResolvedValue({ data: {} } as any)

    const store = useCharactersStore()
    store.characters = [{ id: 1, name: 'Hu Tao', rarity: 5, elementId: 1, weaponTypeId: 2, talents: [] }]
    store.elements = mockElements
    store.weaponTypes = mockWeaponTypes

    await store.updateCharacter(1, { name: 'Hu Tao (Updated)', rarity: 5, elementId: 1, weaponTypeId: 2 })

    expect(store.characters[0]!.name).toBe('Hu Tao (Updated)')
  })

  it('updateCharacter does nothing when character id not found', async () => {
    vi.mocked(charactersApi.update).mockResolvedValue({ data: {} } as any)

    const store = useCharactersStore()
    store.characters = [{ id: 1, name: 'Hu Tao', rarity: 5, elementId: 1, weaponTypeId: 2, talents: [] }]

    await store.updateCharacter(999, { name: 'Ghost' })

    // Original character should be unchanged
    expect(store.characters[0]!.name).toBe('Hu Tao')
  })

  // deleteCharacter
  it('deleteCharacter removes character by id', async () => {
    vi.mocked(charactersApi.delete).mockResolvedValue({} as any)

    const store = useCharactersStore()
    store.characters = [
      { id: 1, name: 'Hu Tao',  rarity: 5, elementId: 1, weaponTypeId: 2, talents: [] },
      { id: 2, name: 'Xingqiu', rarity: 4, elementId: 2, weaponTypeId: 1, talents: [] },
    ]

    await store.deleteCharacter(1)

    expect(store.characters.length).toBe(1)
    expect(store.characters[0]!.name).toBe('Xingqiu')
  })


  // filteredCharacters
  it('filteredCharacters returns all when no filters set', () => {
    const store = useCharactersStore()
    store.characters = [
      { id: 1, name: 'Hu Tao',  rarity: 5, elementId: 1, weaponTypeId: 2, talents: [] },
      { id: 2, name: 'Xingqiu', rarity: 4, elementId: 2, weaponTypeId: 1, talents: [] },
    ]
    expect(store.filteredCharacters.length).toBe(2)
  })

  it('filteredCharacters filters by name search (case-insensitive)', () => {
    const store = useCharactersStore()
    store.characters = [
      { id: 1, name: 'Hu Tao',  rarity: 5, elementId: 1, weaponTypeId: 2, talents: [] },
      { id: 2, name: 'Xingqiu', rarity: 4, elementId: 2, weaponTypeId: 1, talents: [] },
    ]
    store.searchQuery = 'hu'
    expect(store.filteredCharacters.length).toBe(1)
    expect(store.filteredCharacters[0]!.name).toBe('Hu Tao')
  })

  it('filteredCharacters filters by elementId', () => {
    const store = useCharactersStore()
    store.characters = [
      { id: 1, name: 'Hu Tao',  rarity: 5, elementId: 1, weaponTypeId: 2, talents: [] },
      { id: 2, name: 'Xingqiu', rarity: 4, elementId: 2, weaponTypeId: 1, talents: [] },
    ]
    store.selectedElement = 2
    expect(store.filteredCharacters.length).toBe(1)
    expect(store.filteredCharacters[0]!.name).toBe('Xingqiu')
  })

  it('filteredCharacters filters by weaponTypeId', () => {
    const store = useCharactersStore()
    store.characters = [
      { id: 1, name: 'Hu Tao',  rarity: 5, elementId: 1, weaponTypeId: 2, talents: [] },
      { id: 2, name: 'Xingqiu', rarity: 4, elementId: 2, weaponTypeId: 1, talents: [] },
    ]
    store.selectedWeapon = 1
    expect(store.filteredCharacters.length).toBe(1)
    expect(store.filteredCharacters[0]!.name).toBe('Xingqiu')
  })

  it('filteredCharacters filters by rarity', () => {
    const store = useCharactersStore()
    store.characters = [
      { id: 1, name: 'Hu Tao',  rarity: 5, elementId: 1, weaponTypeId: 2, talents: [] },
      { id: 2, name: 'Xingqiu', rarity: 4, elementId: 2, weaponTypeId: 1, talents: [] },
    ]
    store.selectedRarity = 5
    expect(store.filteredCharacters.length).toBe(1)
    expect(store.filteredCharacters[0]!.name).toBe('Hu Tao')
  })

  it('filteredCharacters returns empty when no match', () => {
    const store = useCharactersStore()
    store.characters = [
      { id: 1, name: 'Hu Tao', rarity: 5, elementId: 1, weaponTypeId: 2, talents: [] },
    ]
    store.searchQuery = 'Noelle'
    expect(store.filteredCharacters.length).toBe(0)
  })

  // hasFilters / resetFilters
  it('hasFilters is true when searchQuery is set', () => {
    const store = useCharactersStore()
    store.searchQuery = 'Xiao'
    expect(store.hasFilters).toBe(true)
  })

  it('hasFilters is true when selectedElement is set', () => {
    const store = useCharactersStore()
    store.selectedElement = 1
    expect(store.hasFilters).toBe(true)
  })

  it('hasFilters is true when selectedRarity is set', () => {
    const store = useCharactersStore()
    store.selectedRarity = 5
    expect(store.hasFilters).toBe(true)
  })

  it('resetFilters clears all filters', () => {
    const store = useCharactersStore()
    store.searchQuery = 'Test'
    store.selectedElement = 1
    store.selectedWeapon = 2
    store.selectedRarity = 5

    store.resetFilters()

    expect(store.searchQuery).toBe('')
    expect(store.selectedElement).toBeNull()
    expect(store.selectedWeapon).toBeNull()
    expect(store.selectedRarity).toBeNull()
    expect(store.hasFilters).toBe(false)
  })

  // totalCount / filteredCount
  it('totalCount reflects total characters regardless of filters', () => {
    const store = useCharactersStore()
    store.characters = [
      { id: 1, name: 'Hu Tao',  rarity: 5, elementId: 1, weaponTypeId: 2, talents: [] },
      { id: 2, name: 'Xingqiu', rarity: 4, elementId: 2, weaponTypeId: 1, talents: [] },
    ]
    store.searchQuery = 'hu'
    expect(store.totalCount).toBe(2)
    expect(store.filteredCount).toBe(1)
  })
})
