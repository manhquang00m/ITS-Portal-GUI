import { IconButton, Button, VStack } from "@chakra-ui/react";
import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { IFilterInput } from "components/filter/types";
import PopoverMore, {
  IPopoverMoreProps,
} from "components/popoverMore/PopoverMore";
import {
  MdAssignmentAdd,
  
} from "react-icons/md";
import { IDetailStudent } from "types/class-management/student.type";
import { fetchStatusStudent } from "utils/fetchOptions";

export const columns = (
  setIdStudent: React.Dispatch<React.SetStateAction<number>>,
  setIdDelete: React.Dispatch<React.SetStateAction<number>>,
  onOpen: () => void,
  onOpenDelete: () => void
): ColumnsType<IDetailStudent> => {
  return [
    {
      title: "ID",
      dataIndex: "studentId",
      key: "studentId",
      width: 60,
    },
    {
      title: "Tên học sinh",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (text) =>
        text === "Nam" || text === "Nữ" ? (
          <Tag color={text === "Nam" ? "blue" : "magenta"} key={text}>
            {text}
          </Tag>
        ) : (
          text
        ),
    },
    {
      title: "Trình độ",
      dataIndex: "gradeLevel",
      key: "gradeLevel",
    },
    {
      title: "Lớp học",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Trạng thái",
      dataIndex: "statusName",
      key: "statusName",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: 200,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Tên phụ huynh",
      dataIndex: "parentName",
      key: "parentName",
    },
    {
      title: "Số điện thoại phụ huynh",
      dataIndex: "parentPhone",
      key: "parentPhone",
    },
    {
      title: "Tác vụ",
      key: "action",
      fixed: "right",
      width: 80,
      render: (_, record: IDetailStudent) => {
        const listButton: IPopoverMoreProps[] = [
          {
            type: "edit",
            urlNavigate: `/admin/class/student/edit/${record?.studentId}`,
          },
          {
            type: "view",
            urlNavigate: `/admin/class/student/view/${record?.studentId}`,
          },
          {
            type: "delete",
            handleCustom: () => {
              setIdDelete(record?.studentId);
              onOpenDelete();
            },
          },
          {
            type: "custom",
            name: "Gán vào lớp",
            icon: <MdAssignmentAdd />,
            handleCustom: () => {
              setIdStudent(record?.studentId);
              onOpen();
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
  {
    type: "selectRemote",
    label: "Trạng thái",
    controlName: "status",
    placeHolder: "Chọn giá trị",
    getOptions: fetchStatusStudent,
  },
];
