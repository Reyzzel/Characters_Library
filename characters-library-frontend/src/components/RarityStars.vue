<template>
  <div class="flex items-center gap-0.5">
    <span
      v-for="i in 5" :key="i"
      class="leading-none transition-all"
      :class="[
        i <= rarity ? 'text-amber-400' : 'text-stone-200',
        size === 'lg' ? 'text-lg' : size === 'sm' ? 'text-xs' : 'text-sm'
      ]"><i class="fa-solid fa-star"></i></span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ rarity: number; size?: 'sm' | 'md' | 'lg' }>()
</script>