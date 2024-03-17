
import { ISuccess } from "../interfaces/ISuccess";
import APIClient from "./api-client";

interface IDeleteTask extends ISuccess {
  message: string;
}

export const DeleteTaskService = (id: string, callback: any) => {
  const apiClient = new APIClient(`delete-task`);

  apiClient
    .delete(id)
    .then((result: IDeleteTask) => {
      callback(null, result.message)
    })
    .catch((error) => {
      if (error.response) {
        callback(error.response.data.message)
      } else {
        callback("An error occurred. Please try again later.", null)
      }
    });
}