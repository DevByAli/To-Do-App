import { ITask } from "../interfaces/ITask";
import APIClient from "./api-client";

export const UpdateTaskService = (task: ITask, callback: any) => {
  const apiClient = new APIClient("update-task");

  apiClient
    .update(task) // Pass the updated task to the API client
    .then((result: ITask) => {
      callback(null, result)
    })
    .catch((error) => {
      if (error.response) {
        callback(error.response.data.message)
      } else {
        callback("An error occurred. Please try again later.", null)
      }
    });
}