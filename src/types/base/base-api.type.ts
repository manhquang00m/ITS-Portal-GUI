import { ReactNode } from "react";

export interface IFilterCommon {
    page?: number,
    limit?: number,
}

export interface IResponseListCommon {
    code?: number;
    message?: string;
    page?: number;
    size?: number;
    totalElements?: number;
    currentElements?: number;
}

export interface IItemDetail {
    title?: string;
    children?: string | number | ReactNode
}

export interface IListItem {
    heading?: string;
    list: IItemDetail[]
}
