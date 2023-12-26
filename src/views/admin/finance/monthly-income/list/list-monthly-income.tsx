import { Box, Button } from "@chakra-ui/react";
import { Table } from "antd";
import Filter from "components/filter/filter";
import { useGetMonthlyIncomes } from "hook/query-finance/monthly-income/use-get-monthly-income";
import { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { IFilterMonthlyIncome } from "types/finance/monthly-income.type";
import { clearParamsObject } from "utils/helper";
import { columns, filterItems } from "./config";

export function ListMonthlyIncome() {
  const [filter, setFilter] = useState<IFilterMonthlyIncome>({
    page: 1,
    limit: 10,
  });
  const { data, isLoading } = useGetMonthlyIncomes(filter);
  const history = useHistory();
  const initialValue = {
    name: "",
    level: "",
  };
  const addMonthlyIncome = () => {
    history.push("/admin/finance/monthly/create");
  };

  const onChangePagination = (page: number, pageSize: number) => {
    setFilter({
      ...filter,
      page: pageSize !== filter?.limit ? 1 : page,
      limit: pageSize,
    });
  };

  const handleSearch = (values: IFilterMonthlyIncome) => {
    const clearValues = clearParamsObject(values);
    setFilter({
      page: 1,
      limit: 10,
      ...clearValues,
    });
  };
  const rightButton = useMemo(
    () => (
      <Button onClick={addMonthlyIncome} float={"right"} variant="brand">
        Tạo doanh thu
      </Button>
    ),
    [addMonthlyIncome]
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
