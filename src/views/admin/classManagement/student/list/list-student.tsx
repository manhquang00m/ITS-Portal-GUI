import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { Table } from "antd";
import Filter from "components/filter/filter";
import DeleteModal from "components/modal/modalDelete/modalDelete";
import {
  useDeleteStudent,
  useGetStudents,
} from "hook/query-class/student/use-student";
import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { IFilterStudent } from "types/class-management/student.type";
import { clearParamsObject } from "utils/helper";
import StudentEnrollModal from "../component/enroll/student-enroll";
import { columns, filterItems } from "./config";

export function ListStudent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const [filter, setFilter] = useState<IFilterStudent>({ page: 1, limit: 10 });
  const { data, isLoading, refetch } = useGetStudents(filter);

  const [idStudent, setIdStudent] = useState(undefined);
  const { mutateAsync: mutateDelete } = useDeleteStudent();
  const [idDelete, setIdDelete] = useState(undefined);
  const handleDelete = async () => {
    await mutateDelete(idDelete, { onSuccess: () => refetch() });
  };

  const history = useHistory();
  const initialValue = {
    name: "",
    level: "",
  };
  const addStudent = () => {
    history.push("/admin/class/student/create");
  };

  const onChangePagination = (page: number, pageSize: number) => {
    setFilter({
      ...filter,
      page: pageSize !== filter?.limit ? 1 : page,
      limit: pageSize,
    });
  };

  const handleSearch = (values: IFilterStudent) => {
    const clearValues = clearParamsObject(values);
    setFilter({
      page: 1,
      limit: 10,
      ...clearValues,
    });
  };
  const rightButton = useMemo(
    () => (
      <Button onClick={addStudent} float={"right"} variant="brand">
        Thêm học sinh
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
        scroll={{ x: 1400, y: 450 }}
        loading={isLoading}
        className="mt-2"
        columns={columns(setIdStudent, setIdDelete, onOpen, onOpenDelete)}
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
      <StudentEnrollModal
        refetch={refetch}
        isOpen={isOpen}
        onClose={onClose}
        idStudent={idStudent}
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
