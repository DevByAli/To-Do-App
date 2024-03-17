
import APIClient from "./api-client";

interface ILogout {
  success: boolean;
  message: string;
}

export const LogoutService = (callback: any) => {
  const apiClient = new APIClient("logout");
  apiClient
    .get()
    .then((result: ILogout) => {
      localStorage.removeItem('token')
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