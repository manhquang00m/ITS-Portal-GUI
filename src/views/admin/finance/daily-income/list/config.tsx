import { IconButton, Tooltip } from "@chakra-ui/react";
import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { IFilterInput } from "components/filter/types";
import dayjs from "dayjs";
import { MdEdit, MdRemoveRedEye } from "react-icons/md";
import { IDetailDailyIncome } from "types/finance/daily-income.type";
import { fetchStatusDailyIncome } from "utils/fetchOptions";

export const columns = (history: any): ColumnsType<IDetailDailyIncome> => {
  return [
    {
      title: "ID",
      dataIndex: "dailyIncomeId",
      key: "dailyIncomeId",
      width: 60,
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
      width: 180,
      render: (_, record: IDetailDailyIncome) => (
        <Space size="middle">
          <Tooltip label="Chỉnh sửa">
            <IconButton
              variant="outline"
              aria-label="Call Sage"
              fontSize="20px"
              icon={<MdEdit />}
              onClick={() =>
                history?.push(`/admin/finance/daily/edit/${record?.dailyIncomeId}`)
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
                history?.push(`/admin/finance/daily/detail/${record?.dailyIncomeId}`)
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
    getOptions: fetchStatusDailyIncome,
  },
];
