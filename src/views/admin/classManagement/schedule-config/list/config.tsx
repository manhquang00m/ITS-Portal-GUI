import { IconButton, Tooltip } from "@chakra-ui/react";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { IFilterInput } from "components/filter/types";
import { MdEdit, MdRemoveRedEye } from "react-icons/md";
import { IDetailScheduleConfig } from "types/class-management/schedule-config.type";
import { fetchStatusScheduleConfig } from "utils/fetchOptions";

const weekDayName: Record<string, string> = {
  '1': "Thứ hai",
  '2': "Thứ ba",
  '3': "Thứ tư",
  '4': "Thứ năm",
  '5': "Thứ sáu",
  '6': "Thứ bảy",
  '7': "Chủ nhật",

}

export const columns = (history: any): ColumnsType<IDetailScheduleConfig> => {
  return [
    {
      title: "ID",
      dataIndex: "scheduleConfigId",
      key: "scheduleConfigId",
      width: 60,
    },
    {
      title: "Giáo viên",
      dataIndex: "teacherName",
      key: "teacherName",
    },
    {
      title: "Lớp học",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Ngày dạy trong tuần",
      dataIndex: "weekDay",
      key: "weekDay",
      render: (text: string) => {
        return weekDayName[text]
      }
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
      title: "Trạng thái",
      dataIndex: "statusName",
      key: "statusName",
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
    label: "Giáo viên",
    controlName: "teacherName",
    placeHolder: "Nhập tên giáo viên",
  },
  {
    type: "inputText",
    label: "Lớp học",
    controlName: "className",
    placeHolder: "Nhập tên lớp học",
  },
  {
    type: "selectRemote",
    label: "Trạng thái",
    controlName: "status",
    placeHolder: "Chọn giá trị",
    getOptions: fetchStatusScheduleConfig,
  },
];
