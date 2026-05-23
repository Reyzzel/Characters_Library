<template>
  <article
    @click="$emit('view', character)"
    class="group relative bg-white rounded-lg border border-stone-200 overflow-hidden
           cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
  >
    <!-- Colored line of rarity -->
    <div class="h-0.5 w-full"
      :class="character.rarity === 5
        ? 'bg-gradient-to-r from-amber-400 to-yellow-300'
        : character.rarity === 4 ? 'bg-purple-400' : 'bg-blue-400'"
    />
    <div class="p-5">
      <!-- name and rarity -->
      <div class="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 class="font-semibold text-stone-800 text-base truncate">{{ character.name }}</h3>
          <p v-if="character.title" class="text-xs text-stone-500 italic truncate">
            {{ character.title }}
          </p>
        </div>
        <RarityStars :rarity="character.rarity" size="sm" class="shrink-0" />
      </div>
      
      <!-- element and weapon badge -->
      <div class="flex items-center gap-2 flex-wrap mb-3">
        <ElementBadge v-if="character.element" :element="character.element" :show-name="true" />
        <span
          v-if="character.weaponType"
          class="text-xs px-2 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200"
        >{{ character.weaponType.name }}</span>
      </div>
      <!-- description -->
      <p class="text-sm text-stone-600 line-clamp-2">
        {{ character.description ?? 'No description.' }}
      </p>
      <!-- buttons -->
      <div
        class="flex justify-end gap-1 mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
        @click.stop
      >
        <button @click="$emit('edit', character)"
          class="p-1.5 rounded text-stone-400 hover:text-amber-600 hover:bg-amber-50"><i class="fa-solid fa-pen"></i></button>
        <button @click="$emit('delete', character)"
          class="p-1.5 rounded text-stone-400 hover:text-red-600 hover:bg-red-50"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import RarityStars from './RarityStars.vue'
import ElementBadge from './ElementBadge.vue'
import type { Character } from '@/stores/characters'
defineProps<{ character: Character }>()
defineEmits<{ view: [c: Character]; edit: [c: Character]; 'delete': [c: Character] }>()
</script>