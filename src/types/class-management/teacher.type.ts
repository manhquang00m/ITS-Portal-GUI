import { IFilterCommon, IResponseListCommon } from "types/base/base-api.type";

export interface IFilterTeacher extends IFilterCommon {
    name?: string;
    level?: string;
    status?: string;
}

export interface IDetailTeacher {
    teacherId: number;
    userId: string;
    name: string;
    gender: string;
    level: string;
    institution: string;
    address: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    version: number;
    status: string;
}


export interface IListTeacher {
    list: IDetailTeacher[]
}

export interface IResponseTeacher extends IResponseListCommon {
    data: IListTeacher
}
