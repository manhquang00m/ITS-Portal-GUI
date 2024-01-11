import { Button, IconButton, Tooltip } from "@chakra-ui/react";
import { Badge, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { IFilter, IFilterInput } from "components/filter/types";
import PopoverMore, { IPopoverMoreProps } from "components/popoverMore/PopoverMore";
import { MdEdit, MdPhone, MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import { IDetailLesson } from "types/class-management/lesson.type";
import { fetchStatusLesson } from "utils/fetchOptions";
import { colorStatusBadge } from "variables/colorStatus";

export const columns = (
  setIdDelete: React.Dispatch<React.SetStateAction<number>>,
  onOpenDelete: () => void
): ColumnsType<IDetailLesson> => {
  return [
    {
      title: "ID",
      dataIndex: "lessonId",
      key: "lessonId",
      width: 60,
    },
    {
      title: "Tên bài giảng",
      dataIndex: "lessonName",
      key: "lessonName",
    },
    {
      title: "STT bài giảng",
      dataIndex: "lessonNumber",
      key: "lessonNumber",
    },
    {
      title: "Tên khoá học",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Mã khoá học",
      dataIndex: "courseCode",
      key: "courseCode",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
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
      title: "Tác vụ",
      key: "action",
      fixed: "right",
      width: 80,
      render: (_, record: IDetailLesson) => {
        const listButton: IPopoverMoreProps[] = [
          {
            type: "edit",
            urlNavigate: `/admin/class/lesson/edit/${record?.lessonId}`,
          },
          {
            type: "view",
            urlNavigate: `/admin/class/lesson/detail/${record?.lessonId}`,
          },
          {
            type: "delete",
            handleCustom: () => {
              setIdDelete(record?.lessonId);
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
    getOptions: fetchStatusLesson,
    defaultValue: "active",
  },
];
