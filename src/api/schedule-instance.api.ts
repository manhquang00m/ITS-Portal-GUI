import {
  IResponseAfterClass,
  IResponseStudentProgressInstance,
  IStudentProgressInstance,
} from "types/class-management/after-class.type";
import {
  IFilterScheduleInstance,
  IFormScheduleInstance,
  IResponseDetailScheduleInstance,
  IResponseScheduleInstance,
} from "types/class-management/schedule-instance.type";
import http from "utils/http";

export const getScheduleInstances = (
  params: IFilterScheduleInstance
): Promise<IResponseScheduleInstance> =>
  http
    .get("schedule-instance", { params: params })
    .then((response) => response?.data);

export const createScheduleInstance = (payload: IFormScheduleInstance) =>
  http.post("schedule-instance", payload);

export const editScheduleInstance = (
  payload: IFormScheduleInstance,
  id: string
) => http.put(`schedule-instance/${id}`, payload);

export const getDetailScheduleInstance = (
  id: string
): Promise<IResponseDetailScheduleInstance> =>
  http.get(`schedule-instance/${id}`).then((response) => response?.data);

export const getAfterClass = (
  scheduleInstanceId: number
): Promise<IResponseAfterClass> =>
  http
    .get(`schedule-instance/${scheduleInstanceId}/generate-after-class`)
    .then((response) => response?.data);

export const getStudentProgress = (
  id: string
): Promise<IResponseStudentProgressInstance> =>
  http
    .get(`/student/student-progress/${id}`)
    .then((response) => response?.data);

export const teacherReview = (
  payload: IResponseStudentProgressInstance,
  id: string
) => http.put(`/student/student-progress/${id}`, payload);
