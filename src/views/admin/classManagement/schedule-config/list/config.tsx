import { Button, IconButton, Tooltip } from "@chakra-ui/react";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { IFilterInput } from "components/filter/types";
import { MdEdit, MdRemoveRedEye } from "react-icons/md";
import { IDetailScheduleConfig } from "types/class-management/schedule-config.type";

export const columns = (history: any): ColumnsType<IDetailScheduleConfig> => {
  return [
    {
      title: "ID",
      dataIndex: "teacherId",
      key: "teacherId",
      width: 60,
    },
    {
      title: "ID lớp học",
      dataIndex: "classId",
      key: "classId",
      width: 120,
    },
    {
      title: "ID giáo viên",
      dataIndex: "teacherId",
      key: "teacherId",
      width: 120,
    },
    {
      title: "Ngày dạy",
      dataIndex: "weekDay",
      key: "weekDay",
    },
    {
      title: "Vai trò giáo viên",
      dataIndex: "teacherRole",
      key: "teacherRole",
      render: (text) =>
        text === "Chủ nhiệm" || text === "Trợ giảng" ? (
          <Tag color={text === "Chủ nhiệm" ? "green" : "gold"} key={text}>
            {text}
          </Tag>
        ) : (
          text
        ),
    },
    {
      title: "Thời gian dạy",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Tác vụ",
      key: "action",
      fixed: "right",
      width: 120,
      render: (_, record: IDetailScheduleConfig) => (
        <Space size="middle">
          <Tooltip label="Chỉnh sửa">
            <IconButton
              variant="outline"
              aria-label="Call Sage"
              fontSize="20px"
              icon={<MdEdit />}
              onClick={() =>
                history?.push(
                  `/admin/class/schedule-config/edit/${record?.scheduleConfigId}`
                )
              }
            />
          </Tooltip>
          <Tooltip label="Xem chi tiết">
            <IconButton
              variant="outline"
              aria-label="Call Sage"
              fontSize="20px"
              icon={<MdRemoveRedEye />}
              onClick={() =>
                history?.push(
                  `/admin/class/schedule-config/detail/${record?.scheduleConfigId}`
                )
              }
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
};

export const filterItems: IFilterInput[] = [
  {
    type: "inputText",
    label: "ID giáo viên",
    controlName: "teacherId",
    placeHolder: "Nhập id",
  },
  {
    type: "inputText",
    label: "ID lớp học",
    controlName: "classId",
    placeHolder: "Nhập id",
  },
];
