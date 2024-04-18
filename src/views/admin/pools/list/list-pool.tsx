import { Box, useDisclosure } from "@chakra-ui/react";
import { Spin, Table } from "antd";
import Filter from "components/filter/filter";
import {
  useGetAfterClass,
  useGetPools,
  useGetScheduleInstance,
} from "hook/query-class/schedule-instance/use-schedule-instance";
import { useEffect, useMemo, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IDetailPoolCustom,
  IFilterPools,
} from "types/class-management/pool.type";
import { IFilterScheduleInstance } from "types/class-management/schedule-instance.type";
import { clearParamsObject } from "utils/helper";
import { columns, filterItems } from "./config";
interface AfterClassCanvasRef {
  exportAfterClass: () => void;
  shareImage: () => void;
}
export function ListPools() {
  const [filter, setFilter] = useState<IFilterPools>({
    page: 1,
    network: "base",
    sort: "h24_volume_usd_desc",
    isStable: 0,
  });
  const { data, isLoading } = useGetPools(filter);
  console.log(filter);
  const initialValue = {
    network: "base",
    dex: "",
    isStable: 0,
  };

  const handleSearch = (values: IFilterPools) => {
    const clearValues = clearParamsObject(values);
    setFilter({
      page: 1,
      ...clearValues,
    });
  };

  const getFee = (name: string) => {
    const regex = /(\d+(\.\d+)?)%/;
    const match = name.match(regex);

    if (match) {
      return parseFloat(match[1]);
    }
    return null;
  };

  const isStable = (token: string) => {
    return Number(token) > 0.99 && Number(token) < 1.009;
  };

  const pools: IDetailPoolCustom[] = useMemo(() => {
    if (!data?.data) return [];
    const { data: listPool } = data;
    const newPools = listPool
      ?.map((item) => {
        const { ...restAttr } = item.attributes;
        const { ...restRelation } = item.relationships;

        const fee = getFee(restAttr.name);
        const vv = (0.3 / fee) * Number(restAttr?.reserve_in_usd);
        const ratio = Number(item?.attributes?.volume_usd?.h24) / vv;
        return {
          id: item?.id,
          volume: item?.attributes?.volume_usd?.h24,
          fee: fee,
          ratio: isNaN(fee) ? 0 : ratio,
          ...restAttr,
          ...restRelation,
        };
      })
      .filter((pool) => {
        if (filter.isStable === 1) {
          return pool.ratio > 1 && Number(pool?.reserve_in_usd) > 10000;
        } else {
          return (
            pool.ratio > 1 &&
            Number(pool?.reserve_in_usd) > 10000 &&
            (isStable(pool.base_token_price_usd) ||
              isStable(pool.quote_token_price_usd))
          );
        }
      });
    return newPools.sort((a, b) => b.ratio - a.ratio);
  }, [data, filter.isStable]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "70px" }}>
      <Spin spinning={false} fullscreen />

      <Filter
        filterItems={filterItems(filter.network)}
        handleSearch={handleSearch}
        searchParams={filter}
        initialValue={initialValue}
      />
      <Table
        scroll={{ x: 1600, y: 450 }}
        loading={isLoading}
        className="mt-2"
        columns={columns(filter.network)}
        dataSource={pools || []}
        rowKey="address"
        pagination={false}
        // pagination={{
        //   // pageSizeOptions: [5, 10, 20, 50],
        //   showSizeChanger: false,
        //   total: 200,
        //   onChange: onChangePagination,
        //   current: filter?.page,
        //   pageSize: 20,
        // }}
      />
    </Box>
  );
}
