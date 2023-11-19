import { Box, Button } from "@chakra-ui/react";
import { Table } from "antd";
import Filter from "components/filter/filter";
import { useGetScheduleInstance } from "hook/query/schedule-instance/use-schedule-instance";
import { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { IFilterScheduleConfig } from "types/class-management/schedule-config.type";
import { IFilterScheduleInstance } from "types/class-management/schedule-instance.type";
import { clearParamsObject } from "utils/helper";
import { columns, filterItems } from "./config";

export function ListScheduleInstance() {
  const [filter, setFilter] = useState<IFilterScheduleInstance>({ page: 1, limit: 10 });
  const { data, isLoading } = useGetScheduleInstance(filter);
  const history = useHistory();
  const initialValue = {
    name: "",
    level: "",
  }
  const onChangePagination = (page: number, pageSize: number) => {
    setFilter({
      ...filter,
      page: pageSize !== filter?.limit ? 1 : page,
      limit: pageSize,
    });
  };

  const handleSearch = (values: IFilterScheduleInstance) => {
    const clearValues = clearParamsObject(values)
    setFilter({
      page: 1,
      limit: 10,
      ...clearValues
    })
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "70px" }}>
      <Filter
        filterItems={filterItems}
        handleSearch={handleSearch}
        searchParams={filter}
        initialValue={initialValue}
      />
      <Table
        scroll={{ x: 800, y: 450 }}
        loading={isLoading}
        className="mt-2"
        columns={columns(history)}
        dataSource={data?.data?.list}
        rowKey="teacherId"
        pagination={{
          pageSizeOptions: [5, 10, 20, 50],
          showSizeChanger: true,
          total: data?.data?.totalElements,
          onChange: onChangePagination,
          current: filter?.page,
          pageSize: filter?.limit,
        }}
      />
    </Box>
  );
}
