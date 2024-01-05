import { Box, Divider } from "@chakra-ui/react";
import Card from "components/card/Card";
import DisplayHeadingDetail from "components/displayListItemDetail/displayHeadingDetail";
import DisplayListItemDetail from "components/displayListItemDetail/displayListItemDetail";
import { useGetDetailMonthlyIncome } from "hook/query-finance/monthly-income/use-get-monthly-income";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { IListItem } from "types/base/base-api.type";

export default function ViewDetailMonthlyIncome() {
  const { id }: { id: string } = useParams();
  const { data: detailMonthlyIncome } = useGetDetailMonthlyIncome(id, !!id);
  const inforMonthlyIncome: IListItem = useMemo(() => {
    return {
      heading: "Thông tin doanh thu theo tháng",
      list: [
        {
          title: "ID người dùng",
          children: detailMonthlyIncome?.data?.userId,
        },
        {
          title: "Lương cơ bản",
          children: detailMonthlyIncome?.data?.baseSalary,
        },
      ],
    };
  }, [detailMonthlyIncome]);
  const inforCommon: IListItem = useMemo(() => {
    return {
      heading: "Thông tin chung",
      list: [
        {
          title: "Ngày tạo",
          children: detailMonthlyIncome?.data?.createdAt,
        },
        {
          title: "Người tạo",
          children: detailMonthlyIncome?.data?.createdBy,
        },
        {
          title: "Người cập nhật",
          children: detailMonthlyIncome?.data?.updatedBy,
        },
      ],
    };
  }, [detailMonthlyIncome]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Card variant="elevated" className="p-4 pb-6">
        <DisplayHeadingDetail
          url_edit={`/admin/finance/monthly/edit/${id}`}
          heading={`Mã doanh thu theo tháng #${detailMonthlyIncome?.data?.monthlyId}`}
          updated_at={detailMonthlyIncome?.data?.updatedAt}
        />
        <DisplayListItemDetail
          data={inforMonthlyIncome}
        ></DisplayListItemDetail>
        <Divider className="my-4" />
        <DisplayListItemDetail data={inforCommon}></DisplayListItemDetail>
      </Card>
    </Box>
  );
}
