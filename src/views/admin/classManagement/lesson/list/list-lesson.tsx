import { Box, Button } from "@chakra-ui/react";
import { Table } from "antd";
import Filter from "components/filter/filter";
import { useGetLessons } from "hook/query-class/lesson/use-get-lesson";
import { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { IFilterLesson } from "types/class-management/lesson.type";
import { clearParamsObject } from "utils/helper";
import { columns, filterItems } from "./config";

export function ListLesson() {
  const [filter, setFilter] = useState<IFilterLesson>({ page: 1, limit: 10 });
  const { data, isLoading } = useGetLessons(filter);
  const history = useHistory();
  const initialValue = {
    name: "",
    level: "",
  }
  const addLesson = () => {
    history.push("/admin/class/lesson/create");
  };

  const onChangePagination = (page: number, pageSize: number) => {
    setFilter({
      ...filter,
      page: pageSize !== filter?.limit ? 1 : page,
      limit: pageSize,
    });
  };

  const handleSearch = (values: IFilterLesson) => {
    const clearValues = clearParamsObject(values)
    setFilter({
      page: 1,
      limit: 10,
      ...clearValues
    })
  };
  const rightButton = useMemo(
    () => (
      <Button
        onClick={addLesson}
        float={"right"}
        variant="brand"
      >
        Thêm bài giảng
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
        rowKey="lessonId"
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
