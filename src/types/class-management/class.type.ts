import { IFilterCommon, IResponseListCommon } from "types/base/base-api.type";

export interface IFilterClass extends IFilterCommon {
  courseName?: string;
  courseCode?: string;
  status?: string;
  className?: string;
}

export interface IDetailClass {
  classId: number;
  courseId: number;
  name: string;
  detail: string;
  totalLesson: number;
  courseName: string;
  courseCode: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  version: number;
  status: string;
}

export interface IListClass {
  list: IDetailClass[];
  totalElements: number;
}

export interface IResponseClass extends IResponseListCommon {
  data: IListClass;
}

export interface IFormClass {
  classId?: number;
  courseId?: number;
  name?: string;
  detail?: string;
  totalLesson?: number;
  courseName?: string;
  courseCode?: string;
  status?: string;
}

export interface IResponseDetailClass {
  code: number;
  message: string;
  data: IListClass;
}
