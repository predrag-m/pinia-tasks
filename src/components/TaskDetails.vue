<script setup lang="ts">
import { useTaskStore } from "@/stores/TaskStore";
import type { Task } from "@/types/Task";
import { defineProps, type PropType } from "vue";

defineProps({
  task: {
    required: true,
    type: Object as PropType<Task>,
  },
});
const taskStore = useTaskStore();
</script>

<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <!-- Inside index.html we created a linked to material icons -->
    <!-- Icon for trash can is 'delete' -->
    <div class="icons">
      <i @click="taskStore.deleteTask(task.id)" class="material-icons"
        >delete</i
      >
      <i
        @click="taskStore.toggleFavTask(task.id)"
        class="material-icons"
        :class="{ active: task.isFav }"
        >favorite</i
      >
    </div>
  </div>
</template>

<style scoped>
.red {
  color: red;
}
</style>
