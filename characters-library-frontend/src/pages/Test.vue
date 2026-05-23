<template>
  <div class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-stone-900 mb-2">Test components</h1>
    </div>

    <div class="space-y-12">
      <!-- RarityStars Test -->
        <h2 class="text-xl font-semibold text-stone-800 mb-4 border-b border-stone-200 pb-2">RarityStars</h2>
        
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 space-y-8">
          <!-- Test Rarity Values -->
          <div v-for="n in 5" :key="`rarity-${n}`" class="flex items-center gap-4">
            <RarityStars :rarity="n" />
          </div>
        </div>

      <!-- ElementBadge Test -->
        <h2 class="text-xl font-semibold text-stone-800 mb-4 border-b border-stone-200 pb-2 mt-8">ElementBadge</h2>
        
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-wrap gap-4">
          <!-- Test Elements -->
          <ElementBadge :element="{ name: 'Pyro', color: '#ef4444' }" :showName="true" />
          <ElementBadge :element="{ name: 'Hydro', color: '#3b82f6' }" :showName="true" />
          <ElementBadge :element="{ name: 'Anemo', color: '#10b981' }" :showName="true" />
          <ElementBadge :element="{ name: 'Electro', color: '#8b5cf6' }" :showName="true" />
          <ElementBadge :element="{ name: 'Dendro', color: '#84cc16' }" :showName="true" />
          <ElementBadge :element="{ name: 'Cryo', color: '#06b6d4' }" :showName="true" />
          <ElementBadge :element="{ name: 'Geo', color: '#eab308' }" :showName="true" />
          <ElementBadge :element="{ name: 'Pyro', color: '#ef4444' }" :showName="false" />
        </div>

      <!-- CharacterCard Test with Modal and Dialog integration -->
        <h2 class="text-xl font-semibold text-stone-800 mb-4 border-b border-stone-200 pb-2 mt-8">CharacterCard Integration Test</h2>
        
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <CharacterCard 
            :character="{
              id: 1,
              name: 'Hu Tao',
              title: 'Fragrance in Thaw',
              description: 'The 77th Director of the Wangsheng Funeral Parlor, a young woman managing the parlor\'s operations.',
              rarity: 5,
              elementId: 1,
              element: { id: 1, name: 'Pyro', color: '#ef4444' },
              weaponTypeId: 1,
              weaponType: { id: 1, name: 'Polearm' },
              talents: []
            }"
            @view="console.log('View character', $event)"
            @edit="handleEdit"
            @delete="handleDelete"
          />
          <CharacterCard 
            :character="{
              id: 2,
              name: 'Xingqiu',
              title: 'Juvenile Galant',
              description: 'Second son of the Feiyun Commerce Guild, an industrious and studious young man.',
              rarity: 4,
              elementId: 2,
              element: { id: 2, name: 'Hydro', color: '#3b82f6' },
              weaponTypeId: 2,
              weaponType: { id: 2, name: 'Sword' },
              talents: []
            }"
            @view="console.log('View character', $event)"
            @edit="handleEdit"
            @delete="handleDelete"
          />
        </div>

        <!-- Integrated Modal -->
        <CharacterModal
          :show="showModal"
          :character="selectedCharacter"
          :elements="mockElements"
          :weaponTypes="mockWeaponTypes"
          @close="closeModal"
          @submit="handleSubmit"
        />

        <!-- Integrated Dialog -->
        <ConfirmDialog
          :show="showDialog"
          title="Delete Character?"
          :message="`Are you sure you want to delete ${characterToDelete?.name}? This action cannot be undone.`"
          @cancel="closeDialog"
          @confirm="confirmDelete"
        />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RarityStars from '@/components/RarityStars.vue'
import ElementBadge from '@/components/ElementBadge.vue'
import CharacterCard from '@/components/CharacterCard.vue'
import CharacterModal from '@/components/CharacterModal.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

import type { Character } from '@/stores/characters'

const showModal = ref(false)
const showDialog = ref(false)
const selectedCharacter = ref<Character | null>(null)
const characterToDelete = ref<Character | null>(null)

const handleEdit = (character: Character) => {
  selectedCharacter.value = character
  showModal.value = true
}

const handleDelete = (character: Character) => {
  characterToDelete.value = character
  showDialog.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedCharacter.value = null
}

const handleSubmit = (payload: any) => {
  console.log('Submit', payload)
  closeModal()
}

const closeDialog = () => {
  showDialog.value = false
  characterToDelete.value = null
}

const confirmDelete = () => {
  console.log('Confirmed delete', characterToDelete.value)
  closeDialog()
}

const mockElements = [
  { id: 1, name: 'Pyro', color: '#ef4444' },
  { id: 2, name: 'Hydro', color: '#3b82f6' },
  { id: 3, name: 'Anemo', color: '#10b981' },
  { id: 4, name: 'Electro', color: '#8b5cf6' },
  { id: 5, name: 'Dendro', color: '#84cc16' },
  { id: 6, name: 'Cryo', color: '#06b6d4' },
  { id: 7, name: 'Geo', color: '#eab308' }
]

const mockWeaponTypes = [
  { id: 1, name: 'Sword' },
  { id: 2, name: 'Claymore' },
  { id: 3, name: 'Polearm' },
  { id: 4, name: 'Catalyst' },
  { id: 5, name: 'Bow' }
]
</script>
