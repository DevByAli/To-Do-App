import { ITodoItem } from "../interfaces/ITodoItem";
import { ISuccess } from "../interfaces/ISuccess";
import APIClient from "./api-client";


export interface IGetAllTask extends ISuccess {
  tasks: ITodoItem[];
}

export const GetAllTasksService = (callback: any) => {
  const apiClient = new APIClient("get-all-task");
  apiClient
    .get()
    .then((result: IGetAllTask) => {
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