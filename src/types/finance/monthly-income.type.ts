import { IFilterCommon, IResponseListCommon } from "types/base/base-api.type";

export interface IFilterMonthlyIncome extends IFilterCommon {
  createdAtStart?: string;
  createdAtEnd?: string;
  baseSalaryStart?: string;
  baseSalaryEnd?: string;
  status?: string;
}

export interface IDetailMonthlyIncome {
  monthlyId: number;
  userId: number;
  userName:string;
  baseSalary: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  version: number;
  status: string;
}

export interface IListMonthlyIncome {
  list: IDetailMonthlyIncome[];
  totalElements: number;
}

export interface IResponseMonthlyIncome extends IResponseListCommon {
  data: IListMonthlyIncome;
}

export interface IFormMonthlyIncome {
    monthlyId: number;
    userId: number;
    baseSalary: number;
}

export interface IResponseDetailMonthlyIncome {
  code: number;
  message: string;
  data: IDetailMonthlyIncome;
}
