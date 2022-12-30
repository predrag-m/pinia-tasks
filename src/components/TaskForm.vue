<script setup lang="ts">
import { ref } from "vue";
import { useTaskStore } from "@/stores/TaskStore";
import { Task } from "@/classes/Task";

const taskStore = useTaskStore();
const newTaskTitle = ref("");
const handleSubmit = () => {
  if (newTaskTitle.value.length > 0)
    taskStore.addTask(new Task(newTaskTitle.value));
  newTaskTitle.value = "";
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="newTaskTitle" type="text" placeholder="I need to..." />
    <button>Add</button>
  </form>
</template>

<style scoped></style>
