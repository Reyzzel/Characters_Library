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
    </div>
  </div>
</template>

<script setup lang="ts">
import RarityStars from '@/components/RarityStars.vue'
import ElementBadge from '@/components/ElementBadge.vue'
</script>
