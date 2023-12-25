import { Box, Button } from "@chakra-ui/react";
import { Table } from "antd";
import Filter from "components/filter/filter";
import { useGetScheduleConfig } from "hook/query/schedule-config/use-schedule-config";
import { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { IFilterScheduleConfig } from "types/class-management/schedule-config.type";
import { clearParamsObject } from "utils/helper";
import { columns, filterItems } from "./config";

export function ListScheduleConfig() {
  const [filter, setFilter] = useState<IFilterScheduleConfig>({
    page: 1,
    limit: 10,
  });
  const { data, isLoading } = useGetScheduleConfig(filter);
  const history = useHistory();
  const initialValue = {
    teacherName: "",
    className: "",
  };
  const addScheduleConfig = () => {
    history.push("/admin/class/schedule-config/create");
  };

  const onChangePagination = (page: number, pageSize: number) => {
    setFilter({
      ...filter,
      page: pageSize !== filter?.limit ? 1 : page,
      limit: pageSize,
    });
  };

  const handleSearch = (values: IFilterScheduleConfig) => {
    const clearValues = clearParamsObject(values);
    setFilter({
      page: 1,
      limit: 10,
      ...clearValues,
    });
  };
  const rightButton = useMemo(
    () => (
      <Button onClick={addScheduleConfig} float={"right"} variant="brand">
        Đặt lịch dạy
      </Button>
    ),
    [addScheduleConfig]
  );

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "70px" }}>
      <Filter
        filterItems={filterItems}
        handleSearch={handleSearch}
        rightButton={rightButton}
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
