import { IconButton, Tooltip } from "@chakra-ui/react";
import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { IFilterInput } from "components/filter/types";
import {
  MdAddPhotoAlternate,
  MdComment,
  MdEdit,
  MdRemoveRedEye,
} from "react-icons/md";
import { IDetailScheduleInstance } from "types/class-management/schedule-instance.type";

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
      title: "Thời gian dạy",
      dataIndex: "date",
      key: "date",
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
      width: 140,

    },
    {
      title: "Bài học tiếp theo",
      dataIndex: "nextLesson",
      key: "nextLesson",
      width: 140,

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
              onClick={() => changeIdSchedule(record?.scheduleInstanceId)}
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
