import {
    IFilterMonthlyIncome,
    IFormMonthlyIncome,
    IResponseDetailMonthlyIncome,
    IResponseMonthlyIncome,
  } from "types/finance/monthly-income.type";
  import http from "utils/http";
  
  export const getMonthlyIncomes = (
    params: IFilterMonthlyIncome
  ): Promise<IResponseMonthlyIncome> =>
    http
      .get("monthly-income", { params: params })
      .then((response) => response?.data);
  
  export const createMonthlyIncome = (payload: IFormMonthlyIncome) =>
    http.post("monthly-income", payload);
  
  export const editMonthlyIncome = (payload: IFormMonthlyIncome, id: string) =>
    http.put(`monthly-income/${id}`, payload);
  
  export const getDetailMonthlyIncome = (
    id: string
  ): Promise<IResponseDetailMonthlyIncome> =>
    http.get(`monthly-income/${id}`).then((response) => response?.data);
  
  export const deleteMonthlyIncome = (
    id: number
  ): Promise<IResponseDetailMonthlyIncome> => http.put(`monthly-income/${id}`);
  
