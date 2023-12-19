import {
  IFilterStudent,
  IFormStudent,
  IResponseDetailStudent,
  IResponseStudent,
} from "types/class-management/student.type";
import http from "utils/http";

export const getStudents = (
  params: IFilterStudent
): Promise<IResponseStudent> =>
  http.get("student", { params: params }).then((response) => response?.data);

export const createStudent = (payload: IFormStudent) =>
  http.post("student", payload);

export const editStudent = (payload: IFormStudent, id: string) =>
  http.put(`student/${id}`, payload);

export const getDetailStudent = (id: string): Promise<IResponseDetailStudent> =>
  http.get(`student/${id}`).then((response) => response?.data);
