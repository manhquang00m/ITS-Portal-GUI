import { Box, Button } from "@chakra-ui/react";
import { Table } from "antd";
import Filter from "components/filter/filter";
import { useGetDailyIncomes } from "hook/query-finance/daily-income/use-get-daily-income";
import { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { IFilterDailyIncome } from "types/finance/daily-income.type";
import { clearParamsObject } from "utils/helper";
import { columns, filterItems } from "./config";

export function ListDailyIncome() {
  const [filter, setFilter] = useState<IFilterDailyIncome>({
    page: 1,
    limit: 10,
  });
  const { data, isLoading } = useGetDailyIncomes(filter);
  const history = useHistory();
  const initialValue = {
    name: "",
    level: "",
  };
  const addDailyIncome = () => {
    history.push("/admin/finance/daily/create");
  };

  const onChangePagination = (page: number, pageSize: number) => {
    setFilter({
      ...filter,
      page: pageSize !== filter?.limit ? 1 : page,
      limit: pageSize,
    });
  };

  const handleSearch = (values: IFilterDailyIncome) => {
    const clearValues = clearParamsObject(values);
    setFilter({
      page: 1,
      limit: 10,
      ...clearValues,
    });
  };
  const rightButton = useMemo(
    () => (
      <Button onClick={addDailyIncome} float={"right"} variant="brand">
        Tạo doanh thu
      </Button>
    ),
    [addDailyIncome]
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
