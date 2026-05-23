<template>
  <div class="min-h-screen bg-stone-50">

    <!-- Title -->
    <div class="bg-white border-b border-stone-100 px-6 py-6">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-stone-800">Character Library</h1>
          <p class="text-stone-500 text-sm mt-0.5">
            <span class="text-amber-600 font-medium">{{ store.totalCount }}</span> characters
          </p>
        </div>
        <button @click="openCreate"
          class="px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 transition-colors">
          + Add Character
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white border-b border-stone-100 px-6 py-3">
      <div class="max-w-7xl mx-auto flex flex-wrap gap-2">
        <input v-model="store.searchQuery" placeholder="Search..." type="text"
          class="px-3 py-2 text-sm rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-300 min-w-48" />
        <select v-model="store.selectedElement"
          class="px-3 py-2 text-sm rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-300">
          <option :value="null">All Elements</option>
          <option v-for="el in store.elements" :key="el.id" :value="el.id">{{ el.name }}</option>
        </select>
        <select v-model="store.selectedWeapon"
          class="px-3 py-2 text-sm rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-300">
          <option :value="null">All Weapons</option>
          <option v-for="wt in store.weaponTypes" :key="wt.id" :value="wt.id">{{ wt.name }}</option>
        </select>
        <select v-model="store.selectedRarity"
          class="px-3 py-2 text-sm rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-300">
          <option :value="null">All Rarities</option>
          <option v-for="r in [5,4,3,2,1]" :key="r" :value="r">{{ '★'.repeat(r) }}</option>
        </select>
        <button v-if="store.hasFilters" @click="store.resetFilters()"
          class="px-3 py-2 text-sm text-stone-500 hover:bg-stone-100 rounded-lg">✕ Clear</button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-6">
      <!-- Loading error -->
      <div v-if="store.error"
        class="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
        {{ store.error }}
        <button @click="store.fetchAll()" class="ml-2 underline">Retry</button>
      </div>

      <!-- Loading skeleton -->
      <div v-if="store.loading && !store.characters.length"
           class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div v-for="i in 8" :key="i"
          class="bg-white rounded-lg border border-stone-100 p-5 space-y-3 animate-pulse">
          <div class="h-4 bg-stone-100 rounded w-3/4" />
          <div class="h-3 bg-stone-100 rounded w-1/2" />
          <div class="h-16 bg-stone-100 rounded" />
        </div>
      </div>

      <!-- Empty -->
      <div v-else-if="!store.loading && !store.filteredCharacters.length"
           class="text-center py-20">
        <div class="text-6xl mb-4">📜</div>
        <h3 class="text-xl font-semibold text-stone-800 mb-2">
          {{ store.hasFilters ? 'No matches' : 'Library is empty' }}
        </h3>
        <button v-if="!store.hasFilters" @click="openCreate"
          class="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-amber-600 hover:bg-amber-700">
          + Add First Character
        </button>
      </div>

      <!-- Cards grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <CharacterCard
          v-for="c in store.filteredCharacters" :key="c.id" :character="c"
          @view="() => {}" @edit="editChar" @delete="confirmDelete"
        />
      </div>
    </div>

    <CharacterModal
      :show="showModal" :character="editingChar"
      :elements="store.elements" :weapon-types="store.weaponTypes" :loading="modalLoading"
      @close="closeModal" @submit="handleSubmit"
    />
    <ConfirmDialog
      :show="showConfirm" title="Delete Character"
      :message="`Delete '${deletingChar?.name}'? This cannot be undone.`"
      confirm-label="Delete" :loading="deleteLoading"
      @confirm="handleDelete" @cancel="showConfirm = false"
    />
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCharactersStore } from '@/stores/characters'
import { useToast }           from '@/composables/useToast'
import CharacterCard          from '@/components/CharacterCard.vue'
import CharacterModal         from '@/components/CharacterModal.vue'
import ConfirmDialog          from '@/components/ConfirmDialog.vue'
import ToastContainer         from '@/components/ToastContainer.vue'
import type { Character }     from '@/stores/characters'

const store = useCharactersStore()
const toast = useToast()
onMounted(() => store.fetchAll())

const showModal    = ref(false)
const editingChar  = ref<Character | null>(null)
const modalLoading = ref(false)
const showConfirm  = ref(false)
const deletingChar = ref<Character | null>(null)
const deleteLoading = ref(false)

function openCreate()           { editingChar.value = null; showModal.value = true }
function editChar(c: Character) { editingChar.value = c;    showModal.value = true }
function closeModal()           { showModal.value = false;   editingChar.value = null }

async function handleSubmit(payload: unknown) {
  const p = payload as { id?: number; name: string }
  modalLoading.value = true
  try {
    if (p.id) { await store.updateCharacter(p.id, p); toast.success(`"${p.name}" updated!`) }
    else      { await store.createCharacter(p);        toast.success(`"${p.name}" added!`)   }
    closeModal()
  } catch (e: unknown) { toast.error((e as Error).message)
  } finally { modalLoading.value = false }
}

function confirmDelete(c: Character) { deletingChar.value = c; showConfirm.value = true }

async function handleDelete() {
  if (!deletingChar.value) return
  deleteLoading.value = true
  try {
    const name = deletingChar.value.name
    await store.deleteCharacter(deletingChar.value.id)
    toast.success(`"${name}" removed.`)
    showConfirm.value = false
  } catch (e: unknown) { toast.error((e as Error).message)
  } finally { deleteLoading.value = false }
}
</script>