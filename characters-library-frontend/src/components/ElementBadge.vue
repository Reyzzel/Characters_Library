<template>
  <span
    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border"
    :style="badgeStyle"
  >
    <span class="text-base leading-none" v-html="icon"></span>
    <span v-if="showName">{{ element.name }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const ICONS: Record<string, string> = {
  Pyro: '<i class="fa-solid fa-fire"></i>', Hydro: '<i class="fa-solid fa-droplet"></i>', Anemo: '<i class="fa-solid fa-wind"></i>',
  Electro: '<i class="fa-solid fa-bolt"></i>', Dendro: '<i class="fa-solid fa-leaf"></i>', Cryo: '<i class="fa-solid fa-snowflake"></i>', Geo: '<i class="fa-solid fa-gem"></i>',
}

const props = defineProps<{ element: { name: string; color?: string }; showName?: boolean }>()
const icon = computed(() => ICONS[props.element.name] ?? '✨')
const badgeStyle = computed(() => {
  const c = props.element.color ?? '#888'
  return { backgroundColor: `${c}18`, borderColor: `${c}50`, color: c }
})
</script>