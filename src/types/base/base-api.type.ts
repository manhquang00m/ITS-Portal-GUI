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
