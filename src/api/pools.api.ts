import { IResponseOptions } from "types/base/base-api.type";
import { IFilterPools, IResponseNetwork, IResponsePool } from "types/class-management/pool.type";
import http from "utils/http";

export const getPools = (params: IFilterPools): Promise<IResponsePool> =>
  http
    .get(`networks/${params.network}/pools`, { params: params })
    .then((response) => response?.data);

export const getNetwork = (): Promise<IResponseNetwork[]> =>
  http.get(`networks?page=1`).then((response) => response?.data?.data);
