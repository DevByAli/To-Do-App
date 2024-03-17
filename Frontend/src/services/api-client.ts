import axios, { AxiosRequestConfig } from "axios";

import { ITask } from "../interfaces/ITask";
import { IUser } from "../interfaces/IUser";
import { IActivation } from "../interfaces/IActivation";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:50001/api/v1'
});

const config = {
  headers: {
    token: localStorage.getItem('token')
  }
} as AxiosRequestConfig<ITask | IUser | IActivation>

class APIClient {
  endPoint;

  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }

  post = (data: any) => {
    return axiosInstance
      .post(`/${this.endPoint}`, data, config)
      .then((res) => res.data)
  };

  get = () => {
    return axiosInstance
      .get(`/${this.endPoint}`, config)
      .then((res) => res.data)
  };

  delete = (id: string) => {
    return axiosInstance
      .delete(`/${this.endPoint}/${id}`, config)
      .then((res) => res.data)
  };

  update = (data: ITask) => {
    return axiosInstance
      .patch(`/${this.endPoint}/${data.id}`, data, config)
      .then((res) => res.data)
  };
}

export default APIClient;