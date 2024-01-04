import { IconButton, Tooltip } from "@chakra-ui/react";
import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { IFilterInput } from "components/filter/types";
import { MdEdit, MdRemoveRedEye } from "react-icons/md";
import { IDetailCost } from "types/finance/cost.type";
import { fetchStatusCost } from "utils/fetchOptions";

export const columns = (
  history: any,
): ColumnsType<IDetailCost> => {
  return [
    {
      title: "ID",
      dataIndex: "costId",
      key: "costId",
      width: 60,
    },
    {
      title: "Tên người dùng",
      dataIndex: "userFullName",
      key: "userFullName",
    },
    {
      title: "Tổng chi phí",
      dataIndex: "costAmount",
      key: "costAmount",
    },
    {
      title: "Ngày thanh toán",
      dataIndex: "paymentDate",
      key: "paymentDate",
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
      width: 180,
      render: (_, record: IDetailCost) => (
        <Space size="middle">
          <Tooltip label="Chỉnh sửa">
            <IconButton
              variant="outline"
              aria-label="Call Sage"
              fontSize="20px"
              icon={<MdEdit />}
              onClick={() =>
                history?.push(`/admin/finance/cost/edit/${record?.costId}`)
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
                  `/admin/finance/cost/detail/${record?.costId}`
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
    getOptions: fetchStatusCost,
  },
];
