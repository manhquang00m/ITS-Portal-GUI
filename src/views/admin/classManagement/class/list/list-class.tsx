import { Box, Button } from "@chakra-ui/react";
import { Table } from "antd";
import Filter from "components/filter/filter";
import { useGetClass } from "hook/query/class/use-query-class";
import { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { IFilterClass } from "types/class-management/class.type";
import { clearParamsObject } from "utils/helper";
import { columns, filterItems } from "./config";

export function ListClass() {
  const initialValue = {
    courseName: "",
    className: "",
  };
  const [filter, setFilter] = useState<IFilterClass>({ page: 1, limit: 10 });
  const { data, isLoading } = useGetClass(filter);
  const history = useHistory();
  const addClass = () => {
    history.push("/admin/class/zoom/create");
  };

  const onChangePagination = (page: number, pageSize: number) => {
    setFilter({
      ...filter,
      page: pageSize !== filter?.limit ? 1 : page,
      limit: pageSize,
    });
  };
  const handleSearch = (values: IFilterClass) => {
    const clearValues = clearParamsObject(values);
    setFilter({
      page: 1,
      limit: 10,
      ...clearValues,
    });
  };
  const rightButton = useMemo(
    () => (
      <Button
        onClick={addClass}
        float={"right"}
        variant="brand"
      >
        Tạo lớp học
      </Button>
    ),
    []
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
        rowKey="classId"
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
