import { IResponseOptions } from "types/base/base-api.type";
import {
  IFilterLesson,
  IFormLesson,
  IResponseDetailLesson,
  IResponseLesson,
} from "types/class-management/lesson.type";
import http from "utils/http";

export const getLessons = (
  params: IFilterLesson
): Promise<IResponseLesson> =>
  http.get("lesson", { params: params }).then((response) => response?.data);

export const createLesson = (payload: IFormLesson) =>
  http.post("lesson", payload);

export const editLesson = (payload: IFormLesson, id: string) =>
  http.put(`lesson/${id}`, payload);

export const getDetailLesson = (id: string): Promise<IResponseDetailLesson> =>
  http.get(`lesson/${id}`).then((response) => response?.data);

export const getStatusLesson = (): Promise<IResponseOptions[]> =>
  http.get(`lesson/statuses`).then((response) => response?.data);

export const deleteLesson = (id: string): Promise<IResponseDetailLesson> =>
  http.delete(`lesson/${id}`);
