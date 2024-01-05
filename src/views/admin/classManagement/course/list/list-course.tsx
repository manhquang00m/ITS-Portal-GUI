import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { Table } from "antd";
import Filter from "components/filter/filter";
import DeleteModal from "components/modal/modalDelete/modalDelete";
import { useGetClass } from "hook/query-class/class/use-query-class";
import { useDeleteCourse, useGetCourse } from "hook/query-class/course/use-query-course";
import { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { IFilterClass } from "types/class-management/class.type";
import { IFilterCourse } from "types/class-management/course.type";
import { clearParamsObject } from "utils/helper";
import { columns, filterItems } from "./config";

export function ListCourse() {
  const initialValue = {
    courseName: "",
    courseCode: "",
  };
  const [filter, setFilter] = useState<IFilterCourse>({ page: 1, limit: 10 });
  const { data, isLoading,refetch } = useGetCourse(filter);
  const history = useHistory();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const { mutateAsync: mutateDelete } = useDeleteCourse();
  const [idDelete, setIdDelete] = useState(undefined);
  const handleDelete = async () => {
    await mutateDelete(idDelete, { onSuccess: () => refetch() });
  };
  const addCourse = () => {
    history.push("/admin/class/course/create");
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
      <Button onClick={addCourse} float={"right"} variant="brand">
        Tạo khoá học
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
        scroll={{ x: 600, y: 450 }}
        loading={isLoading}
        className="mt-2"
        columns={columns(setIdDelete,onOpenDelete)}
        dataSource={data?.data?.list}
        rowKey="courseId"
        pagination={{
          pageSizeOptions: [5, 10, 20, 50],
          showSizeChanger: true,
          total: data?.data?.totalElements,
          onChange: onChangePagination,
          current: filter?.page,
          pageSize: filter?.limit,
        }}
      />
      <DeleteModal
        callback={handleDelete}
        id={idDelete}
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
      />
    </Box>
  );
}
