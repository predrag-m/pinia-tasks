export const enum ErrorMsg {
  getTasks = "ERROR: No data available.",
  postTask = "ERROR: Couldn't POST the task to the DB.",
  deleteTask = "ERROR: Couldn't DELETE the task from the DB.",
  patchTask = "ERROR: Couldn't PATCH the task in the DB.",
  notInStore = "ERROR: Pinia store can't find the task with id:",
}
