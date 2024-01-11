import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { Table } from "antd";
import Filter from "components/filter/filter";
import DeleteModal from "components/modal/modalDelete/modalDelete";
import {
  useDeleteLesson,
  useGetLessons,
} from "hook/query-class/lesson/use-get-lesson";
import { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { IFilterLesson } from "types/class-management/lesson.type";
import { clearParamsObject } from "utils/helper";
import { columns, filterItems } from "./config";

export function ListLesson() {
  const [filter, setFilter] = useState<IFilterLesson>({ page: 1, limit: 10 , status: "active"});
  const { data, isLoading, refetch } = useGetLessons(filter);
  const history = useHistory();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const { mutateAsync: mutateDelete } = useDeleteLesson();
  const [idDelete, setIdDelete] = useState(undefined);
  const handleDelete = async () => {
    await mutateDelete(idDelete, { onSuccess: () => refetch() });
  };
  const initialValue = {
    name: "",
    level: "",
    status: "",
  };
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
    const clearValues = clearParamsObject(values);
    setFilter({
      page: 1,
      limit: 10,
      ...clearValues,
    });
  };
  const rightButton = useMemo(
    () => (
      <Button onClick={addLesson} float={"right"} variant="brand">
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
        columns={columns(setIdDelete, onOpenDelete)}
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
      <DeleteModal
        callback={handleDelete}
        id={idDelete}
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
      />
    </Box>
  );
}
