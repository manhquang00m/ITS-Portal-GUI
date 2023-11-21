import { Button, IconButton, Tooltip } from "@chakra-ui/react";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { IFilterInput } from "components/filter/types";
import { MdEdit, MdPhone, MdRemoveRedEye } from "react-icons/md";
import { IDetailClass } from "types/class-management/class.type";
import { IDetailCourse } from "types/class-management/course.type";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export const columns = (history: any): ColumnsType<IDetailCourse> => {
  return [
    {
      title: "ID",
      dataIndex: "courseId",
      key: "courseId",
      width: 60,
    },
    {
      title: "Tên khoá học",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mã số khoá học",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Tác vụ",
      key: "action",
      fixed: "right",
      width: 120,
      render: (_, record: IDetailCourse) => (
        <Space size="middle">
          <Tooltip label="Chỉnh sửa">
            <IconButton
              variant="outline"
              aria-label="Call Sage"
              fontSize="20px"
              icon={<MdEdit />}
              onClick={() =>
                history?.push(`/admin/class/course/edit/${record?.courseId}`)
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
                history?.push(`/admin/class/course/detail/${record?.courseId}`)
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
    label: "Mã số khoá học",
    controlName: "courseCode",
    placeHolder: "Nhập mã khoá học",
  },
];
