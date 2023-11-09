import { IFilterTeacher, IFormTeacher, IResponseTeacher } from "types/class-management/teacher.type";
import http from "utils/http";
export const createClass = (id: string) => http.post('/abcdef', { id: id })

export const getTeachers = (params: IFilterTeacher): Promise<IResponseTeacher> => http.get('teacher', { params: params }).then(response => response?.data)

export const createTeacher = (payload: IFormTeacher) => http.post('teacher', payload)

