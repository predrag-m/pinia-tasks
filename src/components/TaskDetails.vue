<script setup lang="ts">
import type { Task } from "@/types/Task";
import { defineProps, type PropType } from "vue";

const props = defineProps({
  task: {
    required: true,
    type: Object as PropType<Task>,
  },
});
</script>

<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <!-- Inside index.html we created a linked to material icons -->
    <!-- Icon for trash can is 'delete' -->
    <div class="icons">
      <i class="material-icons">delete</i>
      <i class="material-icons">favorite</i>
    </div>
  </div>
</template>

<style scoped></style>
