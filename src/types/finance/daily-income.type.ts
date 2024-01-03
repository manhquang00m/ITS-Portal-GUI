import { IFilterCommon, IResponseListCommon } from "types/base/base-api.type";

export interface IFilterDailyIncome extends IFilterCommon {
  createdAtStart?: string;
  createdAtEnd?: string;
  baseSalaryStart?: string;
  baseSalaryEnd?: string;
  status?: string;
}

export interface IDetailDailyIncome {
  dailyIncomeId: number;
  recipientId: number;
  baseSalary: number;
  createdAt: string;
  scheduleInstanceId: number;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  version: number;
  status: string;
  userName: string;
}

export interface IListDailyIncome {
  list: IDetailDailyIncome[];
  totalElements: number;
}

export interface IResponseDailyIncome extends IResponseListCommon {
  data: IListDailyIncome;
}

export interface IFormDailyIncome {
  dailyIncomeId: number;
  recipientId: number;
  baseSalary: number;
  scheduleInstanceId: number;
}

export interface IResponseDetailDailyIncome {
  code: number;
  message: string;
  data: IDetailDailyIncome;
}
