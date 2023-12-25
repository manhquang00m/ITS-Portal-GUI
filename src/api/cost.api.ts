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
