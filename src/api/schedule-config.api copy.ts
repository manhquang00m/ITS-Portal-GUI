import { IFilterScheduleInstance, IFormScheduleInstance, IResponseDetailScheduleInstance, IResponseScheduleInstance } from "types/class-management/schedule-instance.type";
import http from "utils/http";

export const getScheduleInstances = (params: IFilterScheduleInstance): Promise<IResponseScheduleInstance> =>
  http.get("schedule-config", { params: params }).then((response) => response?.data);

export const createScheduleInstance = (payload: IFormScheduleInstance) =>
  http.post("schedule-config", payload);

export const editScheduleInstance = (payload: IFormScheduleInstance, id: string) =>
  http.put(`schedule-config/${id}`, payload);

export const getDetailScheduleInstance = (id: string): Promise<IResponseDetailScheduleInstance> =>
  http.get(`schedule-config/${id}`).then((response) => response?.data);
