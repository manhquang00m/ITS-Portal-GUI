import { IFilterCommon, IResponseListCommon } from "types/base/base-api.type";

export interface IFilterScheduleConfig extends IFilterCommon {
    teacherId?: string;
    classId?: string;
    status?: string;
}

export interface IDetailScheduleConfig {
    scheduleConfigId: number;
    classId: number;
    teacherId: number;
    weekDay: number;
    time: string;
    teacherRole: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    version: number;
    status: string;
    className: string;
    teacherName: string;
    statusName: string;
    teacherRoleName: string;
}

export interface IListScheduleConfig {
    list: IDetailScheduleConfig[];
    totalElements: number;
}

export interface IResponseScheduleConfig extends IResponseListCommon {
    data: IListScheduleConfig;
}


export interface IFormScheduleConfig {
    scheduleConfigId: number;
    classId: number | string;
    teacherId: number | string;
    weekDay: number | string;
    time: string;
    teacherRole: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    version: number;
    status: string;
}

export interface IResponseDetailScheduleConfig {
    code: number;
    message: string;
    data: IDetailScheduleConfig;
}
