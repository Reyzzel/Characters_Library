<template>
  <Teleport to="body">
    <div class="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
      <TransitionGroup name="toast">
        <div
          v-for="t in toasts" :key="t.id"
          class="pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-lg shadow-lg border max-w-xs text-sm"
          :class="
            t.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
            t.type === 'error'   ? 'bg-red-50   border-red-200   text-red-800'   :
                                   'bg-blue-50  border-blue-200  text-blue-800'
          "
        >
          <span>{{ t.type === 'success' ? '<i class="fa-solid fa-square-check text-green-600"></i>' : t.type === 'error' ? '<i class="fa-solid fa-xmark text-red-600"></i>' : '<i class="fa-solid fa-info-circle text-blue-600"></i>' }}</span>
          <span class="flex-1">{{ t.message }}</span>
          <button class="opacity-60 hover:opacity-100" @click="remove(t.id)">✕</button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
import { useToast } from '@/composables/useToast'
const { toasts, remove } = useToast()
</script>
<style scoped>
.toast-enter-from,
.toast-leave-to  { transform: translateX(120%); opacity: 0; }
.toast-enter-active,
.toast-leave-active { transition: all 0.3s ease; }
.toast-move { transition: transform 0.3s ease; }
</style>
