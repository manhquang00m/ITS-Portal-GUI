import { IResponseOptions } from "types/base/base-api.type";
import {
  IFilterCourse,
  IFormCourse,
  IResponseCourse,
  IResponseDetailCourse,
} from "types/class-management/course.type";
import http from "utils/http";

export const getCourses = (params: IFilterCourse): Promise<IResponseCourse> =>
  http.get("course", { params: params }).then((response) => response?.data);

export const createCourse = (payload: IFormCourse) =>
  http.post("course", payload);

export const editCourse = (payload: IFormCourse, id: string) =>
  http.put(`course/${id}`, payload);

export const getDetailCourse = (id: string): Promise<IResponseDetailCourse> =>
  http.get(`course/${id}`).then((response) => response?.data);

export const getStatusCourse = (): Promise<IResponseOptions[]> =>
  http.get(`course/statuses`).then((response) => response?.data);

export const deleteCourse = (id: string): Promise<IResponseDetailCourse> =>
  http.delete(`course/${id}`);