import { IconButton, Link, Tooltip } from "@chakra-ui/react";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { IFilterInput } from "components/filter/types";
import dayjs from "dayjs";
import { MdAddPhotoAlternate, MdComment } from "react-icons/md";
import { IDetailScheduleInstance } from "types/class-management/schedule-instance.type";
import {
  fetchDex,
  fetchNetwork,
  fetchStable,
  fetchStatusScheduleInstance,
} from "utils/fetchOptions";
import { toast } from "react-toastify";
import {
  IDataRelationshipsPools,
  IDetailPool,
  IDetailPoolCustom,
} from "types/class-management/pool.type";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const colorStatusScheduleInstance: Record<string, string> = {
  "Đã nhận xét": "green",
  "Vô hiêu hoá": "red",
  "Khởi tạo": "blue",
};

export const columns = (network: string): ColumnsType<IDetailPoolCustom> => {
  return [
    // {
    //   title: "Địa chỉ",
    //   dataIndex: "address",
    //   key: "address",
    //   width: 120,
    //   render: (text: string) => {
    //     return (
    //       <Link
    //         href={`https://www.geckoterminal.com/vi/${network}/pools/${text}`}
    //         isExternal
    //       >
    //         {text} <ExternalLinkIcon ml="2px" pb="2px" />
    //       </Link>
    //     );
    //   },
    // },

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
      width: 90,
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
      title: "Sàn",
      dataIndex: "dex",
      key: "dex",
      width: 100,
      render: (dex: IDataRelationshipsPools) => {
        return dex?.data?.id || "--";
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
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: 120,
    },
    {
      title: "--",
      key: "action",
      fixed: "right",
      width: 40,
      render: (_, record: IDetailPoolCustom) => (
        <>
          <Link
            href={`https://www.geckoterminal.com/vi/${network}/pools/${record?.address}`}
            isExternal
          >
            <ExternalLinkIcon ml="2px" pb="2px" fontSize={24} />
          </Link>
        </>
      ),
    },
  ];
};

export const filterItems = (network: string): IFilterInput[] => {
  return [
    {
      type: "selectRemote",
      label: "Mạng",
      controlName: "network",
      placeHolder: "Chọn giá trị",
      getOptions: fetchNetwork,
    },
    {
      type: "selectRemote",
      label: "Sàn DEX V2",
      controlName: "dex",
      placeHolder: "Chọn giá trị",
      getOptions: () => fetchDex(network),
      keyRefetch: network
    },
    {
      type: "selectRemote",
      label: "Thể loại pool",
      controlName: "isStable",
      placeHolder: "Chọn giá trị",
      getOptions: fetchStable,
    },
  ];
};
