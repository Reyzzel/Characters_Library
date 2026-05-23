<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      style="background: rgba(0,0,0,0.5)"
      @mousedown.self="$emit('cancel')"
    >
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm border border-stone-200 p-6">
        <div class="flex items-start gap-4 mb-5">
          <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-xl">
            <i class="fa-solid fa-triangle-exclamation"></i>
          </div>
          <div>
            <h3 class="font-semibold text-stone-800 mb-1">{{ title ?? 'Confirm' }}</h3>
            <p class="text-sm text-stone-600">{{ message }}</p>
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <button @click="$emit('cancel')"
            class="px-4 py-2 text-sm text-stone-600 hover:bg-stone-100 rounded-lg"
          >Cancel</button>
          <button @click="$emit('confirm')" :disabled="loading"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700
                   disabled:opacity-50 rounded-lg"
          >{{ confirmLabel ?? 'Delete' }}</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
defineProps<{ show: boolean; title?: string; message?: string; confirmLabel?: string; loading?: boolean }>()
defineEmits<{ confirm: []; cancel: [] }>()
</script>