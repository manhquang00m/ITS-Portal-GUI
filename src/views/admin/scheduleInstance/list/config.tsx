import { IconButton } from "@chakra-ui/react";
import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { IFilterInput } from "components/filter/types";
import { MdEdit, MdRemoveRedEye } from "react-icons/md";
import { IDetailScheduleInstance } from "types/class-management/schedule-instance.type";


export const columns = (history: any): ColumnsType<IDetailScheduleInstance> => {
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
          <IconButton
            variant="outline"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<MdEdit />}
            onClick={() =>
              history?.push(`/admin/schedule-instance/edit/${record?.scheduleInstanceId}`)
            }
          />
          {/* <IconButton
            variant="outline"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<MdRemoveRedEye />}
            onClick={() =>
              history?.push(`/admin/schedule-instance/detail/${record?.scheduleInstanceId}`)
            }
          /> */}
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
