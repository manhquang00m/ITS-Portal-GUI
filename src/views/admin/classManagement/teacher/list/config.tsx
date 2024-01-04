import { Button, IconButton, Tooltip } from "@chakra-ui/react";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { IFilter, IFilterInput } from "components/filter/types";
import { MdEdit, MdPhone, MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import { IDetailTeacher } from "types/class-management/teacher.type";
import { fetchStatusTeacher } from "utils/fetchOptions";

export const columns = (history: any): ColumnsType<IDetailTeacher> => {
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
      render: (_, record: IDetailTeacher) => (
        <Space size="middle">
          <Tooltip label="Chỉnh sửa">
            <IconButton
              variant="outline"
              aria-label="Call Sage"
              fontSize="20px"
              icon={<MdEdit />}
              onClick={() =>
                history?.push(`/admin/class/teacher/edit/${record?.teacherId}`)
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
                  `/admin/class/teacher/detail/${record?.teacherId}`
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
    getOptions: fetchStatusTeacher,
  },
];
