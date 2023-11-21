import { Button, IconButton, Tooltip } from "@chakra-ui/react";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { IFilterInput } from "components/filter/types";
import { MdEdit, MdPhone, MdRemoveRedEye } from "react-icons/md";
import { IDetailClass } from "types/class-management/class.type";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export const columns = (history: any): ColumnsType<IDetailClass> => {
  return [
    {
      title: "ID",
      dataIndex: "classId",
      key: "classId",
      width: 60,
    },
    {
      title: "ID khóa học",
      dataIndex: "courseId",
      key: "courseId",
      width: 120,
    },
    {
      title: "Tên lớp",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Chi tiết",
      dataIndex: "detail",
      key: "detail",
    },
    {
      title: "Tổng bài học",
      dataIndex: "totalLesson",
      key: "totalLesson",
    },
    {
      title: "Tên khóa học",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Tác vụ",
      key: "action",
      fixed: "right",
      width: 120,
      render: (_, record: IDetailClass) => (
        <Space size="middle">
          <Tooltip label="Chỉnh sửa">
            <IconButton
              variant="outline"
              aria-label="Call Sage"
              fontSize="20px"
              icon={<MdEdit />}
              onClick={() =>
                history?.push(`/admin/class/zoom/edit/${record?.classId}`)
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
                history?.push(`/admin/class/zoom/detail/${record?.classId}`)
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
    label: "Tên khoá học",
    controlName: "courseName",
    placeHolder: "Nhập khoá học",
  },
  {
    type: "inputText",
    label: "Tên lớp",
    controlName: "className",
    placeHolder: "Nhập tên lớp",
  },
];
