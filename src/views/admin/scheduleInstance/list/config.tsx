import { IconButton, Tooltip } from "@chakra-ui/react";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { IFilterInput } from "components/filter/types";
import dayjs from "dayjs";
import { MdAddPhotoAlternate, MdComment } from "react-icons/md";
import { IDetailScheduleInstance } from "types/class-management/schedule-instance.type";
import { fetchStatusScheduleInstance } from "utils/fetchOptions";
import { toast } from "react-toastify";

const colorStatusScheduleInstance: Record<string, string> = {
  "Đã nhận xét": "green",
  "Vô hiêu hoá": "red",
  "Khởi tạo": "blue",

};

export const columns = (
  history: any,
  changeIdSchedule: (id: number) => void
): ColumnsType<IDetailScheduleInstance> => {
  return [
    {
      title: "ID",
      dataIndex: "scheduleInstanceId",
      key: "scheduleInstanceId",
      width: 60,
    },
    {
      title: "Lớp học",
      dataIndex: "className",
      key: "className",
      width: 120,
    },
    {
      title: "Giáo viên",
      dataIndex: "teacherName",
      key: "teacherName",
      width: 120,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Tag color={colorStatusScheduleInstance[text]} key={text}>
          {text}
        </Tag>
      ),
    },
    {
      title: "Thời gian dạy",
      dataIndex: "date",
      key: "date",
      render: (text: string) => {
        return dayjs(text).format("DD/MM/YYYY h:mm A");
      },
    },
    {
      title: "Vai trò giáo viên",
      dataIndex: "teacherRole",
      key: "teacherRole",
    },
    {
      title: "Bài học hôm nay",
      dataIndex: "currentLesson",
      key: "currentLesson",
    },
    {
      title: "Bài học tiếp theo",
      dataIndex: "nextLesson",
      key: "nextLesson",
    },
    {
      title: "Tác vụ",
      key: "action",
      fixed: "right",
      width: 120,
      render: (_, record: IDetailScheduleInstance) => (
        <Space size="middle">
          {/* <Tooltip label="Chỉnh sửa">
            <IconButton
              variant="outline"
              aria-label="Call Sage"
              fontSize="20px"
              icon={<MdEdit />}
              onClick={() =>
                history?.push(
                  `/admin/schedule-instance/edit/${record?.scheduleInstanceId}`
                )
              }
            />
          </Tooltip> */}
          <Tooltip label="Nhận xét">
            <IconButton
              variant="outline"
              aria-label="Call Sage"
              fontSize="20px"
              icon={<MdComment />}
              onClick={() =>
                history?.push(
                  `/admin/schedule-instance/review/${record?.scheduleInstanceId}`
                )
              }
            />
          </Tooltip>
          <Tooltip label="Tạo after class">
            <IconButton
              variant="outline"
              aria-label="Call Sage"
              fontSize="20px"
              icon={<MdAddPhotoAlternate />}
              onClick={() => {
                if (record?.status === "Đã nhận xét") {
                  changeIdSchedule(record?.scheduleInstanceId);
                } else {
                  toast.warning("Vui lòng nhận xét trước khi tạo after class");
                }
              }}
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
    getOptions: fetchStatusScheduleInstance,
  },
];
