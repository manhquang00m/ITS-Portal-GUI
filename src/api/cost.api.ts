import { IResponseOptions } from "types/base/base-api.type";
import {
  IFilterCost,
  IFormCost,
  IResponseDetailCost,
  IResponseCost,
} from "types/finance/cost.type";
import http from "utils/http";

export const getCosts = (params: IFilterCost): Promise<IResponseCost> =>
  http.get("cost", { params: params }).then((response) => response?.data);

export const createCost = (payload: IFormCost) => http.post("cost", payload);

export const editCost = (payload: IFormCost, id: string) =>
  http.put(`cost/${id}`, payload);

export const getDetailCost = (id: string): Promise<IResponseDetailCost> =>
  http.get(`cost/${id}`).then((response) => response?.data);

export const getStatusCost = (): Promise<IResponseOptions[]> =>
  http.get(`cost/statuses`).then((response) => response?.data);

export const deleteCost = (id: string): Promise<IResponseDetailCost> =>
  http.delete(`cost/${id}`);

