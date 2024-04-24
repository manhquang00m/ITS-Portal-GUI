import { IResponseOptions } from "types/base/base-api.type";
import {
  IFilterPools,
  IResponseNetwork,
  IResponsePool,
} from "types/class-management/pool.type";
import http from "utils/http";

export const getNetwork = (): Promise<IResponseNetwork[]> =>
  http.get(`networks?page=1`).then((response) => response?.data?.data);

export const getDex = (network: string): Promise<IResponseNetwork[]> =>
  http
    .get(`networks/${network}/dexes?page=1`)
    .then((response) => response?.data?.data);

const fetchPool = (params: IFilterPools): Promise<IResponsePool> => {
  if (!params.dex) {
    return http
      .get(`networks/${params.network}/pools?page=${params.page}`)
      .then((response) => response?.data);
  }
  return http
    .get(
      `networks/${params.network}/dexes/${params.dex}/pools?page=${params.page}`
    )
    .then((response) => response?.data);
};

export const getPools = async (
  params: IFilterPools
): Promise<IResponsePool> => {
  const promises: Promise<IResponsePool>[] = [];

  for (let page = 1; page <= 7; page++) {
    const { network, dex } = params;
    promises.push(fetchPool({ network, page: page, dex }));
  }

  const results = await Promise.all(promises);
  const mergedData = results.flatMap((data) => data.data);
  return { data: mergedData };
};
