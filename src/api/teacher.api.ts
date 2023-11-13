import { IFilterTeacher, IFormTeacher, IResponseDetailTeacher, IResponseTeacher } from "types/class-management/teacher.type";
import http from "utils/http";
export const createClass = (id: string) => http.post('/abcdef', { id: id })

export const getTeachers = (params: IFilterTeacher): Promise<IResponseTeacher> => http.get('teacher', { params: params }).then(response => response?.data)

export const createTeacher = (payload: IFormTeacher) => http.post('teacher', payload)

export const editTeacher = (payload: IFormTeacher, id: string) => http.put(`teacher/${id}`, payload)

export const getDetailTeacher = (id: string): Promise<IResponseDetailTeacher> => http.get(`teacher/${id}`).then(response => response?.data)

