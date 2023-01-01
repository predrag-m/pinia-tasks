<script setup lang="ts">
import type { TaskFilter } from "@/types/TaskFilter";
import type { PropType } from "vue";
import { useTasksStore } from "@/stores/TasksStore";
import { storeToRefs } from "pinia";
import TaskItem from "@/components/TaskItem.vue";

defineProps({
  taskFilter: {
    type: String as PropType<TaskFilter>,
    required: true,
  },
});
const tasksStore = useTasksStore();
const { tasks, tasksCount, favTasks, favTasksCount } = storeToRefs(tasksStore);
</script>

<template>
  <div v-if="taskFilter === 'all'" class="task-list">
    <p>You have {{ tasksCount }} tasks left to do:</p>
    <div v-for="task in tasks" :key="task.id">
      <task-item :task="task" />
    </div>
  </div>
  <div v-else class="task-list">
    <p>
      You have {{ favTasksCount }} favorite
      {{ favTasksCount !== 1 ? "tasks" : "task" }} left to do:
    </p>
    <div v-for="task in favTasks" :key="task.id">
      <task-item :task="task" />
    </div>
  </div>
</template>

<style scoped></style>
