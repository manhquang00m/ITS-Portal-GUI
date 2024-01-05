
import { IResponseOptions } from "types/base/base-api.type";
import { IResponseAfterClass } from "types/class-management/after-class.type";
import { IFilterScheduleConfig, IFormScheduleConfig, IResponseDetailScheduleConfig, IResponseScheduleConfig } from "types/class-management/schedule-config.type";
import http from "utils/http";

export const getScheduleConfigs = (params: IFilterScheduleConfig): Promise<IResponseScheduleConfig> =>
  http.get("schedule-config", { params: params }).then((response) => response?.data);

export const createScheduleConfig = (payload: IFormScheduleConfig) =>
  http.post("schedule-config", payload);

export const editScheduleConfig = (payload: IFormScheduleConfig, id: string) =>
  http.put(`schedule-config/${id}`, payload);

export const getDetailScheduleConfig = (id: string): Promise<IResponseDetailScheduleConfig> =>
  http.get(`schedule-config/${id}`).then((response) => response?.data);

export const getStatusScheduleConfig = (): Promise<IResponseOptions[]> =>
  http.get(`schedule-config/statuses`).then((response) => response?.data);

export const deleteScheduleConfig = (id: string): Promise<IResponseDetailScheduleConfig> =>
  http.delete(`schedule-config/${id}`);

