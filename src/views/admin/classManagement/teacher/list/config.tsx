import { Button, IconButton, Tooltip } from "@chakra-ui/react";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { IFilter, IFilterInput } from "components/filter/types";
import PopoverMore, {
  IPopoverMoreProps,
} from "components/popoverMore/PopoverMore";
import { MdEdit, MdPhone, MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import { IDetailTeacher } from "types/class-management/teacher.type";
import { fetchStatusTeacher } from "utils/fetchOptions";

export const columns = (
  setIdDelete: React.Dispatch<React.SetStateAction<number>>,
  onOpenDelete: () => void
): ColumnsType<IDetailTeacher> => {
  return [
    {
      title: "ID",
      dataIndex: "teacherId",
      key: "teacherId",
      width: 60,
    },
    {
      title: "Tên giáo viên",
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
      title: "Level",
      dataIndex: "level",
      key: "level",
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
    },
    {
      title: "Cơ quan",
      dataIndex: "institution",
      key: "institution",
    },
    {
      title: "Tác vụ",
      key: "action",
      fixed: "right",
      width: 120,
      render: (_, record: IDetailTeacher) => {
        const listButton: IPopoverMoreProps[] = [
          {
            type: "edit",
            urlNavigate: `/admin/class/teacher/edit/${record?.teacherId}`,
          },
          {
            type: "view",
            urlNavigate: `/admin/class/teacher/view/${record?.teacherId}`,
          },
          {
            type: "delete",
            handleCustom: () => {
              setIdDelete(record?.teacherId);
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
    getOptions: fetchStatusTeacher,
  },
];
