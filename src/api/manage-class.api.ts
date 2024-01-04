import { IResponseOptions } from "types/base/base-api.type";
import {
  IFilterClass,
  IFormClass,
  IResponseClass,
  IResponseDetailClass,
} from "types/class-management/class.type";
import http from "utils/http";

export const getClass = (params: IFilterClass): Promise<IResponseClass> =>
  http.get("class", { params: params }).then((response) => response?.data);

export const createClass = (payload: IFormClass) => http.post("class", payload);

export const editClass = (payload: IFormClass, id: string) =>
  http.put(`class/${id}`, payload);

export const getDetailClass = (id: string): Promise<IResponseDetailClass> =>
  http.get(`class/${id}`).then((response) => response?.data);

export const getStatusClass = (): Promise<IResponseOptions[]> =>
  http.get(`class/statuses`).then((response) => response?.data);

export const deleteClass = (id: string): Promise<IResponseDetailClass> =>
  http.delete(`class/${id}`);
