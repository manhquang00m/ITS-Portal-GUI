import { IFilterCommon, IResponseListCommon } from "types/base/base-api.type";

export interface IFilterStudent extends IFilterCommon {
  name?: string;
  gradeLevel?: string;
  status?: string;
}

export interface IDetailStudent {
  studentId: number;
  name: string;
  gradeLevel: string;
  gender: string;
  address: string;
  phoneNumber: string;
  parentName: string;
  parentPhone: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  version: number;
  status: string;
  className: string;
  statusName: string;
}

export interface IListStudent {
  list: IDetailStudent[];
  totalElements: number;
}

export interface IResponseStudent extends IResponseListCommon {
  data: IListStudent;
}

export interface IFormStudent {
  studentId?: number;
  name: string;
  gradeLevel: string;
  gender: string;
  address: string;
  phoneNumber: string;
  parentName: string;
  parentPhone: string;
}

export interface IResponseDetailStudent {
  code: number;
  message: string;
  data: IDetailStudent;
}

export interface IFormStudentEnroll {
  classId: number;
  studentId: number;
}
