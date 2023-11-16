import { Button, IconButton } from "@chakra-ui/react";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
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
          <IconButton
            variant="outline"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<MdEdit />}
            onClick={() =>
              history?.push(`/admin/class/course/edit/${record?.courseId}`)
            }
          />
          <IconButton
            variant="outline"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<MdRemoveRedEye />}
            onClick={() =>
              history?.push(`/admin/class/course/detail/${record?.courseId}`)
            }
          />
        </Space>
      ),
    },
  ];
};
