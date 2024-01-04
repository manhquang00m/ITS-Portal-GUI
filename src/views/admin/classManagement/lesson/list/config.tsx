import { Button, IconButton, Tooltip } from "@chakra-ui/react";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { IFilter, IFilterInput } from "components/filter/types";
import { MdEdit, MdPhone, MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import { IDetailLesson } from "types/class-management/lesson.type";
import { fetchStatusLesson } from "utils/fetchOptions";

export const columns = (history: any): ColumnsType<IDetailLesson> => {
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
    },
    {
      title: "Tác vụ",
      key: "action",
      fixed: "right",
      width: 120,
      render: (_, record: IDetailLesson) => (
        <Space size="middle">
          <Tooltip label="Chỉnh sửa">
            <IconButton
              variant="outline"
              aria-label="Call Sage"
              fontSize="20px"
              icon={<MdEdit />}
              onClick={() =>
                history?.push(`/admin/class/lesson/edit/${record?.lessonId}`)
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
                history?.push(
                  `/admin/class/lesson/detail/${record?.lessonId}`
                )
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
  },
];
