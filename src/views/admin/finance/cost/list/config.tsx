import { IconButton, Tooltip } from "@chakra-ui/react";
import { Badge, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { IFilterInput } from "components/filter/types";
import PopoverMore, {
  IPopoverMoreProps,
} from "components/popoverMore/PopoverMore";
import { MdEdit, MdRemoveRedEye } from "react-icons/md";
import { IDetailCost } from "types/finance/cost.type";
import { fetchStatusCost } from "utils/fetchOptions";
import { colorStatusBadge } from "variables/colorStatus";

export const columns = (
  setIdDelete: React.Dispatch<React.SetStateAction<number>>,
  onOpenDelete: () => void
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
      render: (text, record) => (
        <Badge color={colorStatusBadge[record.status]} text={text} />
      )
    },
    {
      title: "Tác vụ",
      key: "action",
      fixed: "right",
      width: 80,
      render: (_, record: IDetailCost) => {
        const listButton: IPopoverMoreProps[] = [
          {
            type: "edit",
            urlNavigate: `/admin/finance/cost/edit/${record?.costId}`,
          },
          {
            type: "view",
            urlNavigate: `/admin/finance/cost/detail/${record?.costId}`,
          },
          {
            type: "delete",
            handleCustom: () => {
              setIdDelete(record?.costId);
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
    getOptions: fetchStatusCost,
    defaultValue: "active"
  },
];
