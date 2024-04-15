import { IconButton, Tooltip } from "@chakra-ui/react";
import { Badge, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { IFilterInput } from "components/filter/types";
import PopoverMore, { IPopoverMoreProps } from "components/popoverMore/PopoverMore";
import { MdEdit, MdRemoveRedEye } from "react-icons/md";
import { IDetailScheduleConfig } from "types/class-management/schedule-config.type";
import { fetchStatusScheduleConfig } from "utils/fetchOptions";
import { colorStatusBadge } from "variables/colorStatus";

const weekDayName: Record<string, string> = {
  "1": "Thứ hai",
  "2": "Thứ ba",
  "3": "Thứ tư",
  "4": "Thứ năm",
  "5": "Thứ sáu",
  "6": "Thứ bảy",
  "7": "Chủ nhật",
};

export const columns = (
  setIdDelete: React.Dispatch<React.SetStateAction<number>>,
  onOpenDelete: () => void
): ColumnsType<IDetailScheduleConfig> => {
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
        return weekDayName[text];
      },
    },
    {
      title: "Vai trò giáo viên",
      dataIndex: "teacherRole",
      key: "teacherRole",
      render: (text, record) =>
        text === "assistant" || text === "instructor" ? (
          <Tag color={text === "instructor" ? "green" : "gold"} key={text}>
            {record?.teacherRoleName}
          </Tag>
        ) : (
          text
        ),
    },
    {
      title: "Trạng thái",
      dataIndex: "statusName",
      key: "statusName",
      render: (text, record) => (
        <Badge color={colorStatusBadge[record.status]} text={text} />
      )
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
      width: 80,
      render: (_, record: IDetailScheduleConfig) => {
        const listButton: IPopoverMoreProps[] = [
          {
            type: "edit",
            urlNavigate: `/admin/class/schedule-config/edit/${record?.scheduleConfigId}`,
          },
          {
            type: "view",
            urlNavigate: `/admin/class/schedule-config/detail/${record?.scheduleConfigId}`,
          },
          {
            type: "delete",
            handleCustom: () => {
              setIdDelete(record?.scheduleConfigId);
              onOpenDelete();
            },
          },
        ];
        return <PopoverMore listButton={listButton} />;
      },
    },
  ];
};

export const filterItems: IFilterInput[] = [
  {
    type: "selectRemote",
    label: "Mạng",
    controlName: "network",
    placeHolder: "Chọn giá trị",
    getOptions: fetchStatusScheduleConfig,
    defaultValue:"active"
  },
];
