import { Button, IconButton } from "@chakra-ui/react";
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
          <IconButton
            variant="outline"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<MdEdit />}
            onClick={() =>
              history?.push(`/admin/class/schedule-config/edit/${record?.scheduleConfigId}`)
            }
          />
          <IconButton
            variant="outline"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<MdRemoveRedEye />}
            onClick={() =>
              history?.push(`/admin/class/schedule-config/detail/${record?.scheduleConfigId}`)
            }
          />
        </Space>
      ),
    },
  ];
};

export const filterItems: IFilterInput[] = [
  {
    type: "inputText",
    label: "Tên giáo viên",
    controlName: "name",
    placeHolder: "Nhập tên",
  },
  {
    type: "inputText",
    label: "Level",
    controlName: "level",
    placeHolder: "Nhập level",
  },
];
