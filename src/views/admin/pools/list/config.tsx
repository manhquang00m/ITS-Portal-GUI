import { IconButton, Link, Tooltip } from "@chakra-ui/react";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { IFilterInput } from "components/filter/types";
import dayjs from "dayjs";
import { MdAddPhotoAlternate, MdComment } from "react-icons/md";
import { IDetailScheduleInstance } from "types/class-management/schedule-instance.type";
import { fetchNetwork, fetchStatusScheduleInstance } from "utils/fetchOptions";
import { toast } from "react-toastify";
import {
  IDetailPool,
  IDetailPoolCustom,
} from "types/class-management/pool.type";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const colorStatusScheduleInstance: Record<string, string> = {
  "Đã nhận xét": "green",
  "Vô hiêu hoá": "red",
  "Khởi tạo": "blue",
};

export const columns = (): ColumnsType<IDetailPoolCustom> => {
  return [
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: 120,
      render: (text: string) => {
        return (
          <Link href={`https://www.geckoterminal.com/vi/base/pools/${text}`} isExternal>
            {text} <ExternalLinkIcon ml="2px" pb="2px"/>
          </Link>
        );
      },
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 120,
    },
    {
      title: "Tỉ lệ bú",
      dataIndex: "ratio",
      key: "ratio",
      width: 120,
      render: (text: number | null) => {
        if (text === 0 || isNaN(text)) {
          return <Tag color={"error"}>{"Tạch"}</Tag>;
        }
        let color;
        if (text > 0 && text < 1) {
          color = "default";
        }
        if (text > 1 && text <= 3) {
          color = "warning";
        }
        if (text > 3 && text <= 5) {
          color = "processing";
        }
        if (text > 5) {
          color = "success";
        }
        return <Tag color={color}>{`1 - ${text.toFixed(2)}`}</Tag>;
      },
    },
    {
      title: "Ngày tạo pool",
      dataIndex: "pool_created_at",
      key: "pool_created_at",
      render: (text: string) => {
        return dayjs(text).format("DD/MM/YYYY");
      },
      width: 120,
    },
    {
      title: "Fee",
      dataIndex: "fee",
      key: "fee",
      width: 120,
      render: (text: number | null) => {
        return text === null ? "--" : text;
      },
    },
    {
      title: "Volumn 24h",
      dataIndex: "volume",
      key: "volume",
      width: 120,
      render: (text: number | null) => {
        let USDollar = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });

        return text === null ? "--" : USDollar.format(text);
      },
    },

    {
      title: "Liquidity",
      dataIndex: "reserve_in_usd",
      key: "reserve_in_usd",
      width: 120,
      render: (text: number | null) => {
        let USDollar = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });

        return text === null ? "--" : USDollar.format(text);
      },
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
    },
  ];
};

export const filterItems: IFilterInput[] = [
  {
    type: "selectRemote",
    label: "Mạng",
    controlName: "network",
    placeHolder: "Chọn giá trị",
    getOptions: fetchNetwork,
  },
];
