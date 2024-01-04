import { IFilterCommon, IResponseListCommon } from "types/base/base-api.type";

export interface IFilterCourse extends IFilterCommon {
  courseName?: string;
  courseCode?: string;
  status?: string;
}

export interface IDetailCourse {
  courseId: number;
  name: string;
  code: string;
  description: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  version: number;
  status: string;
  statusName: string;
}

export interface IListCourse {
  list: IDetailCourse[];
  totalElements: number;
}

export interface IResponseCourse extends IResponseListCommon {
  data: IListCourse;
}

export interface IFormCourse {
  courseId: number;
  name: string;
  code: string;
  description: string;
  status: string;
}

export interface IResponseDetailCourse {
  code: number;
  message: string;
  data: IDetailCourse;
}
