<template>
  <div class="min-h-screen bg-stone-50">
    <nav class="bg-white border-b border-stone-200 px-6 py-3 flex items-center gap-4">
      <span class="font-bold text-stone-800"><i class="fa-solid fa-book text-amber-600"></i> Characters Library</span>
      <RouterLink
        to="/"
        class="text-sm text-stone-600 hover:text-amber-600 transition-colors"
      >Characters</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<script setup lang="ts"></script>
