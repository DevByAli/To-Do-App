
import APIClient from "./api-client";
import { IUser } from "../interfaces/IUser";

interface ILogin {
  success: boolean;
  message: string;
  token: string;
}

export const LoginService = (data: IUser, callback: any) => {
  const apiClient = new APIClient("login");
  apiClient
    .post(data)
    .then((result: ILogin) => {

      // store the access token
      localStorage.setItem("token", result.token);

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