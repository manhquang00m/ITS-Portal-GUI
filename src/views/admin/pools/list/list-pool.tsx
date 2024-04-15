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
  });
  const { data, isLoading } = useGetPools(filter);

  const initialValue = {
    network: "base",
  };
  const onChangePagination = (page: number, pageSize: number) => {
    setFilter({
      ...filter,
      page: page,
    });
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
  const pools: IDetailPoolCustom[] = useMemo(() => {
    if (!data?.data) return [];
    const { data: listPool } = data;
    const newPools = listPool?.map((item) => {
      const { ...restAttr } = item.attributes;
      const fee = getFee(restAttr.name);
      const vv = (0.3 / fee) * Number(restAttr?.reserve_in_usd);
      const ratio = Number(item?.attributes?.volume_usd?.h24) / vv;
      return {
        id: item?.id,
        volume: item?.attributes?.volume_usd?.h24,
        fee: fee,
        ratio: isNaN(fee) ? 0 : ratio,
        ...restAttr,
      };
    });
    return newPools.sort((a, b) => b.ratio - a.ratio);;
  }, [data]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "70px" }}>
      <Spin spinning={false} fullscreen />

      <Filter
        filterItems={filterItems}
        handleSearch={handleSearch}
        searchParams={filter}
        initialValue={initialValue}
      />
      <Table
        scroll={{ x: 1600, y: 450 }}
        loading={isLoading}
        className="mt-2"
        columns={columns()}
        dataSource={pools || []}
        rowKey="id"
        pagination={{
          // pageSizeOptions: [5, 10, 20, 50],
          showSizeChanger: false,
          total: 200,
          onChange: onChangePagination,
          current: filter?.page,
          pageSize: 20,
        }}
      />
    </Box>
  );
}
