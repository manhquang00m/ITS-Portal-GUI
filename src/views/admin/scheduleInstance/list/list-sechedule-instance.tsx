import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Spin, Table } from "antd";
import Filter from "components/filter/filter";
import {
  useGetAfterClass,
  useGetScheduleInstance,
} from "hook/query/schedule-instance/use-schedule-instance";
import { useEffect, useMemo, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { IFilterScheduleConfig } from "types/class-management/schedule-config.type";
import { IFilterScheduleInstance } from "types/class-management/schedule-instance.type";
import { clearParamsObject } from "utils/helper";
import { AfterClassCanvas } from "../components/AfterClassCanvas";
import { columns, filterItems } from "./config";
interface AfterClassCanvasRef {
  exportAfterClass: () => void;
  shareImage: () => void;
}
export function ListScheduleInstance() {
  const [filter, setFilter] = useState<IFilterScheduleInstance>({
    page: 1,
    limit: 10,
  });
  const [scheduleID, setScheduleID] = useState<number>(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const childRef = useRef<AfterClassCanvasRef>(null);
  const { data, isLoading } = useGetScheduleInstance(filter);
  const { data: dataAfterClass, isFetching: loadingAfterClass } =
    useGetAfterClass(scheduleID, !!scheduleID);

  const changeIdSchedule = (id: number) => {
    setScheduleID(id);
  };

  useEffect(() => {
    if (!isOpen) {
      setScheduleID(undefined);
    }
  }, [isOpen]);

  useEffect(() => {
    if (dataAfterClass && scheduleID) onOpen();
  }, [dataAfterClass]);

  const history = useHistory();
  const initialValue = {
    teacherName: "",
    className: "",
    status: "",
  };
  const onChangePagination = (page: number, pageSize: number) => {
    setFilter({
      ...filter,
      page: pageSize !== filter?.limit ? 1 : page,
      limit: pageSize,
    });
  };

  const handleSearch = (values: IFilterScheduleInstance) => {
    const clearValues = clearParamsObject(values);
    setFilter({
      page: 1,
      limit: 10,
      ...clearValues,
    });
  };

  const handleButtonClick = () => {
    if (childRef.current) {
      childRef.current.exportAfterClass();
    }
  };

  const handleShareImage = () => {
    if (childRef.current) {
      childRef.current.shareImage();
    }
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "70px" }}>
      <Spin spinning={loadingAfterClass} fullscreen />

      <Filter
        filterItems={filterItems}
        handleSearch={handleSearch}
        searchParams={filter}
        initialValue={initialValue}
      />
      <Table
        scroll={{ x: 1000, y: 450 }}
        loading={isLoading}
        className="mt-2"
        columns={columns(history, changeIdSchedule)}
        dataSource={data?.data?.list}
        rowKey="scheduleInstanceId"
        pagination={{
          pageSizeOptions: [5, 10, 20, 50],
          showSizeChanger: true,
          total: data?.data?.totalElements,
          onChange: onChangePagination,
          current: filter?.page,
          pageSize: filter?.limit,
        }}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay p={4} />
        <ModalContent
          mt={"30px"}
          mx={"10px"}
          p={{ base: "0", md: "2", xl: "4" }}
          minWidth={"90%"}
        >
          <ModalHeader paddingBottom={0}>Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AfterClassCanvas
              data={dataAfterClass?.data}
              onClose={onClose}
              ref={childRef}
            ></AfterClassCanvas>
          </ModalBody>
          <ModalFooter>
            <Button mx={3} variant="brandOutline" onClick={handleShareImage}>
              Chia sẻ
            </Button>
            <Button onClick={handleButtonClick} variant="brand">
              Tải ảnh xuống
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
