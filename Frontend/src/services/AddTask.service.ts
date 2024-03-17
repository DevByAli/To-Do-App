import { ITodoItem } from "../interfaces/ITodoItem";
import { ISuccess } from "../interfaces/ISuccess";
import APIClient from "./api-client";

export interface IGetTask extends ISuccess {
  task: ITodoItem;
}

export const AddTaskService = (task: string, callback: any) => {
  const apiClient = new APIClient("create-task");

  apiClient
    .post({ task })
    .then((result: IGetTask) => {
      result.task.isEditing = false;
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