<script setup lang="ts">
import { useTasksStore } from "@/stores/TasksStore";
import { ref } from "vue";
import { TaskModel } from "@/models/TaskModel";

const tasksStore = useTasksStore();
const newTaskTitle = ref("");

const handleSubmit = () => {
  const newTask = new TaskModel(newTaskTitle.value);
  tasksStore.addTask(newTask);
  newTaskTitle.value = "";
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="newTaskTitle" type="text" placeholder="I need to do..." />
    <button>Add</button>
  </form>
</template>

<style scoped></style>
