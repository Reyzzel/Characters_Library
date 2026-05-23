<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      style="background: rgba(0,0,0,0.5)"
      @mousedown.self="$emit('close')"
    >
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-stone-200">
        <div class="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <h2 class="font-semibold text-stone-800 text-lg">
            {{ isEdit ? 'Edit' : 'New' }} Character
          </h2>
          <button @click="$emit('close')" class="text-stone-400 hover:text-stone-600">✕</button>
        </div>
        <form @submit.prevent="handleSubmit" class="px-6 py-5 space-y-4">
          <!-- Name -->
          <div>
            <label class="block text-xs font-medium text-stone-600 mb-1">Name *</label>
            <input v-model="form.name" @blur="touch('name')" type="text" placeholder="e.g. Hu Tao"
              class="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
              :class="errors.name && touched.name ? 'border-red-400' : 'border-stone-200'" />
            <p v-if="errors.name && touched.name" class="text-xs text-red-500 mt-1">{{ errors.name }}</p>
          </div>
          <!-- Title -->
          <div>
            <label class="block text-xs font-medium text-stone-600 mb-1">Title</label>
            <input v-model="form.title" type="text"
              class="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
          </div>
          <!-- Description -->
          <div>
            <label class="block text-xs font-medium text-stone-600 mb-1">Description</label>
            <textarea v-model="form.description" rows="3"
              class="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-300" />
          </div>
          <!-- Rarity + Date -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-medium text-stone-600 mb-1">Rarity *</label>
              <div class="flex gap-1">
                <button v-for="r in 5" :key="r" type="button" @click="form.rarity = r"
                  class="text-xl leading-none hover:scale-110 transition-all"
                  :class="r <= form.rarity ? 'text-amber-400' : 'text-stone-200'">★</button>
              </div>
            </div>
            <div>
              <label class="block text-xs font-medium text-stone-600 mb-1">Release Date</label>
              <input v-model="form.releaseDate" type="date"
                class="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300" />
            </div>
          </div>
          <!-- Element + Weapon -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-medium text-stone-600 mb-1">Element *</label>
              <select v-model="form.elementId" @change="touch('elementId')"
                class="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                :class="errors.elementId && touched.elementId ? 'border-red-400' : 'border-stone-200'">
                <option :value="0" disabled>Select element</option>
                <option v-for="el in elements" :key="el.id" :value="el.id">{{ el.name }}</option>
              </select>
              <p v-if="errors.elementId && touched.elementId" class="text-xs text-red-500 mt-1">{{ errors.elementId }}</p>
            </div>
            <div>
              <label class="block text-xs font-medium text-stone-600 mb-1">Weapon *</label>
              <select v-model="form.weaponTypeId" @change="touch('weaponTypeId')"
                class="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                :class="errors.weaponTypeId && touched.weaponTypeId ? 'border-red-400' : 'border-stone-200'">
                <option :value="0" disabled>Select weapon</option>
                <option v-for="wt in weaponTypes" :key="wt.id" :value="wt.id">{{ wt.name }}</option>
              </select>
              <p v-if="errors.weaponTypeId && touched.weaponTypeId" class="text-xs text-red-500 mt-1">{{ errors.weaponTypeId }}</p>
            </div>
          </div>
          <!-- Кнопки -->
          <div class="flex justify-end gap-2 pt-2">
            <button type="button" @click="$emit('close')"
              class="px-4 py-2 text-sm text-stone-600 hover:bg-stone-100 rounded-lg">Cancel</button>
            <button type="submit" :disabled="loading"
              class="px-5 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-50 rounded-lg">
              {{ isEdit ? 'Save' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useCharacterForm } from '@/composables/useCharacterForm'
import type { Element, WeaponType, Character } from '@/stores/characters'

const props = defineProps<{
  show: boolean
  character?: Character | null
  elements: Element[]
  weaponTypes: WeaponType[]
  loading?: boolean
}>()

const emit = defineEmits<{ close: []; submit: [payload: unknown] }>()

const isEdit = computed(() => !!props.character)

const { form, errors, touched, touch, validate, reset, toPayload } =
  useCharacterForm(props.character ?? undefined)
watch(() => props.show, v => { if (v) reset(props.character ?? undefined) })

function handleSubmit() { if (validate()) emit('submit', toPayload()) }
</script>