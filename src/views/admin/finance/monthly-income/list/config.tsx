import { IconButton, Tooltip } from "@chakra-ui/react";
import { Badge, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { IFilterInput } from "components/filter/types";
import PopoverMore, { IPopoverMoreProps } from "components/popoverMore/PopoverMore";
import dayjs from "dayjs";
import { MdEdit, MdRemoveRedEye } from "react-icons/md";
import { IDetailMonthlyIncome } from "types/finance/monthly-income.type";
import { fetchStatusMonthlyIncome } from "utils/fetchOptions";
import { colorStatusBadge } from "variables/colorStatus";

export const columns = (
  setIdDelete: React.Dispatch<React.SetStateAction<number>>,
  onOpenDelete: () => void
): ColumnsType<IDetailMonthlyIncome> => {
  return [
    {
      title: "ID",
      dataIndex: "monthlyId",
      key: "monthlyId",
      width: 60,
    },
    {
      title: "ID người dùng",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Tên người dùng",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Lương cơ bản",
      dataIndex: "baseSalary",
      key: "baseSalary",
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
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => {
        return dayjs(text).format("DD/MM/YYYY HH:mm:ss");
      },
    },
    {
      title: "Tác vụ",
      key: "action",
      fixed: "right",
      width: 80,
      render: (_, record: IDetailMonthlyIncome) => {
        const listButton: IPopoverMoreProps[] = [
          {
            type: "edit",
            urlNavigate: `/admin/finance/monthly/edit/${record?.monthlyId}`,
          },
          {
            type: "view",
            urlNavigate: `/admin/finance/monthly/detail/${record?.monthlyId}`,
          },
          {
            type: "delete",
            handleCustom: () => {
              setIdDelete(record?.monthlyId);
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
    getOptions: fetchStatusMonthlyIncome,
  },
];
