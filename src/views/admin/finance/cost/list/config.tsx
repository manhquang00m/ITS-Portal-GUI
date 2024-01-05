import { IconButton, Tooltip } from "@chakra-ui/react";
import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { IFilterInput } from "components/filter/types";
import PopoverMore, {
  IPopoverMoreProps,
} from "components/popoverMore/PopoverMore";
import { MdEdit, MdRemoveRedEye } from "react-icons/md";
import { IDetailCost } from "types/finance/cost.type";
import { fetchStatusCost } from "utils/fetchOptions";

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
    },
    {
      title: "Tác vụ",
      key: "action",
      fixed: "right",
      width: 180,
      render: (_, record: IDetailCost) => {
        const listButton: IPopoverMoreProps[] = [
          {
            type: "edit",
            urlNavigate: `/admin/finance/cost/edit/${record?.costId}`,
          },
          {
            type: "view",
            urlNavigate: `/admin/finance/cost/view/${record?.costId}`,
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
  },
];
