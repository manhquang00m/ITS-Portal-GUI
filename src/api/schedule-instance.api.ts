
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
