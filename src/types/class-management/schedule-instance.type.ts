import { IFilterCommon, IResponseListCommon } from "types/base/base-api.type";

export interface IFilterScheduleInstance extends IFilterCommon {
    teacherId?: string;
    classId?: string;
    className?: string;
    teacherName?: string;
    status?: string;

}

export interface IDetailScheduleInstance {
    scheduleInstanceId: number;
    scheduleConfigId: number;
    date: string;
    classId: number;
    teacherId: number;
    teacherRole: string;
    currentLesson: string;
    nextLesson: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    version: number;
    status: string;
    className: string;
    teacherName: string;
    statusName: string;
}

export interface IListScheduleInstance {
    list: IDetailScheduleInstance[];
    totalElements: number;
}

export interface IResponseScheduleInstance extends IResponseListCommon {
    data: IListScheduleInstance;
}


export interface IFormScheduleInstance {
    scheduleInstanceId: number;
    scheduleConfigId: number;
    date: string;
    classId: number;
    teacherId: number;
    teacherRole: string;
    currentLesson: string;
    nextLesson: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    version: number;
    status: string;
}

export interface IResponseDetailScheduleInstance {
    code: number;
    message: string;
    data: IDetailScheduleInstance;
}
