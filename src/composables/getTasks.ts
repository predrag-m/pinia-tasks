import { useTaskStore } from "@/stores/TaskStore";
import { ref } from "vue";

export const getTasks = () => {
  const taskStore = useTaskStore();
  const isLoading = ref(false);
  const errorMsg = ref<null | string>(null);

  const fetchTasks = async () => {
    isLoading.value = true;
    // setTimeout is here just for demonstration
    setTimeout(async () => {
      try {
        let response = await fetch("http://localhost:3000/tasks/");
        if (!response.ok) throw new Error("Error: no data available");
        const data = await response.json();
        taskStore.tasks = data;
      } catch (e: any) {
        errorMsg.value = e.message;
      } finally {
        isLoading.value = false;
      }
    }, 1500);
  };

  return { isLoading, errorMsg, fetchTasks };
};
