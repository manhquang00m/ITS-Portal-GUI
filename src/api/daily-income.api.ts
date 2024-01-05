import { IResponseOptions } from "types/base/base-api.type";
import {
  IFilterDailyIncome,
  IFormDailyIncome,
  IResponseDetailDailyIncome,
  IResponseDailyIncome,
} from "types/finance/daily-income.type";
import http from "utils/http";

export const getDailyIncomes = (
  params: IFilterDailyIncome
): Promise<IResponseDailyIncome> =>
  http
    .get("daily-income", { params: params })
    .then((response) => response?.data);

export const createDailyIncome = (payload: IFormDailyIncome) =>
  http.post("daily-income", payload);

export const editDailyIncome = (payload: IFormDailyIncome, id: string) =>
  http.put(`daily-income/${id}`, payload);

export const getDetailDailyIncome = (
  id: string
): Promise<IResponseDetailDailyIncome> =>
  http.get(`daily-income/${id}`).then((response) => response?.data);

export const deleteDailyIncome = (
  id: number
): Promise<IResponseDetailDailyIncome> => http.delete(`daily-income/${id}`);


export const getStatusDailyIncome = (): Promise<IResponseOptions[]> =>
  http.get(`daily-income/statuses`).then((response) => response?.data);


