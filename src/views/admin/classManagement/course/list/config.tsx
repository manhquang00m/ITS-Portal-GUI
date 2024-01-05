import { Button, IconButton, Tooltip } from "@chakra-ui/react";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { IFilterInput } from "components/filter/types";
import PopoverMore, {
  IPopoverMoreProps,
} from "components/popoverMore/PopoverMore";
import { MdEdit, MdPhone, MdRemoveRedEye } from "react-icons/md";
import { IDetailClass } from "types/class-management/class.type";
import { IDetailCourse } from "types/class-management/course.type";
import { fetchStatusCourse } from "utils/fetchOptions";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export const columns = (
  setIdDelete: React.Dispatch<React.SetStateAction<number>>,
  onOpenDelete: () => void
): ColumnsType<IDetailCourse> => {
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
      title: "Trạng thái",
      dataIndex: "statusName",
      key: "statusName",
    },
    {
      title: "Tác vụ",
      key: "action",
      fixed: "right",
      width: 80,
      render: (_, record: IDetailCourse) => {
        const listButton: IPopoverMoreProps[] = [
          {
            type: "edit",
            urlNavigate: `/admin/class/course/edit/${record?.courseId}`,
          },
          {
            type: "view",
            urlNavigate: `/admin/class/course/detail/${record?.courseId}`,
          },
          {
            type: "delete",
            handleCustom: () => {
              setIdDelete(record?.courseId);
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
  {
    type: "selectRemote",
    label: "Trạng thái",
    controlName: "status",
    placeHolder: "Chọn giá trị",
    getOptions: fetchStatusCourse,
  },
];
