import { IFilterCommon, IResponseListCommon } from "types/base/base-api.type";

export interface IFilterCost extends IFilterCommon {
  nampaymentDateEnde?: string;
  paymentDateStart?: string;
  username?: string;
  userFullName?: string;
  costAmountStart?: number;
  costAmountEnd?: number;
  status?: string;
}

export interface IDetailCost {
  costId: number;
  paymentDate: string;
  userId: number;
  userName: string;
  userFullName: string;
  costAmount: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  version: number;
  status: string;
  statusName: string;
  description: string;
}

export interface IListCost {
  list: IDetailCost[];
  totalElements: number;
}

export interface IResponseCost extends IResponseListCommon {
  data: IListCost;
}

export interface IFormCost {
  costId: number;
  paymentDateString: string;
  paymentDate: Date;
  userId: number;
  costAmount: number;
  status: string;
  description: string;
}

export interface IResponseDetailCost {
  code: number;
  message: string;
  data: IDetailCost;
}


