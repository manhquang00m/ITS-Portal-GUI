import { IFilterCommon, IResponseListCommon } from "types/base/base-api.type";

export interface IFilterLesson extends IFilterCommon {
  lessonName?: string;
  courseId?: number;
  priceMin?: number;
  priceMax?: number;
  status?: string;
  courseCode?: string;
}

export interface IDetailLesson {
  lessonId: number;
  lessonNumber: number;
  lessonName: string;
  courseId: number;
  price: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  version: number;
  status: string;
  courseCode: string;
  courseName: string;
}

export interface IListLesson {
  list: IDetailLesson[];
  totalElements: number;
}

export interface IResponseLesson extends IResponseListCommon {
  data: IListLesson;
}

export interface IFormLesson {
    lessonNumber: number;
    lessonName: string;
    courseId: number;
    price: number;
}

export interface IResponseDetailLesson {
  code: number;
  message: string;
  data: IDetailLesson;
}