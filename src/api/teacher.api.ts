import { IResponseOptions } from "types/base/base-api.type";
import {
  IFilterTeacher,
  IFormTeacher,
  IResponseDetailTeacher,
  IResponseTeacher,
} from "types/class-management/teacher.type";
import http from "utils/http";

export const getTeachers = (
  params: IFilterTeacher
): Promise<IResponseTeacher> =>
  http.get("teacher", { params: params }).then((response) => response?.data);

export const createTeacher = (payload: IFormTeacher) =>
  http.post("teacher", payload);

export const editTeacher = (payload: IFormTeacher, id: string) =>
  http.put(`teacher/${id}`, payload);

export const getDetailTeacher = (id: string): Promise<IResponseDetailTeacher> =>
  http.get(`teacher/${id}`).then((response) => response?.data);

export const getStatusTeacher = (): Promise<IResponseOptions[]> =>
  http.get(`teacher/statuses`).then((response) => response?.data);

export const deleteTeacher = (id: string): Promise<IResponseDetailTeacher> =>
  http.delete(`teacher/${id}`);

  export const getRoleTeacher = (): Promise<IResponseOptions[]> =>
  http.get(`teacher/teacherRole`).then((response) => response?.data);

  export const getLevelTeacher = (): Promise<IResponseOptions[]> =>
  http.get(`teacher/teacherLevel`).then((response) => response?.data);

  