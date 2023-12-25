import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { Table } from "antd";
import Filter from "components/filter/filter";
import { useGetStudents } from "hook/query/student/use-student";
import { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { IFilterStudent } from "types/class-management/student.type";
import { clearParamsObject } from "utils/helper";
import StudentEnrollModal from "../component/enroll/student-enroll";
import { columns, filterItems } from "./config";

export function ListStudent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filter, setFilter] = useState<IFilterStudent>({ page: 1, limit: 10 });
  const { data, isLoading } = useGetStudents(filter);
  const [idStudent, setIdStudent] = useState(undefined);
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
        scroll={{ x: 800, y: 450 }}
        loading={isLoading}
        className="mt-2"
        columns={columns(history, setIdStudent,onOpen)}
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
        isOpen={isOpen}
        onClose={onClose}
        idStudent={idStudent}
      />
    </Box>
  );
}
