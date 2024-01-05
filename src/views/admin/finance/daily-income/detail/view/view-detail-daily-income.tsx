import { Box, Divider } from "@chakra-ui/react";
import Card from "components/card/Card";
import DisplayHeadingDetail from "components/displayListItemDetail/displayHeadingDetail";
import DisplayListItemDetail from "components/displayListItemDetail/displayListItemDetail";
import { useGetDetailDailyIncome } from "hook/query-finance/daily-income/use-get-daily-income";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { IListItem } from "types/base/base-api.type";

export default function ViewDetailDailyIncome() {
  const { id }: { id: string } = useParams();
  const { data: detailDailyIncome } = useGetDetailDailyIncome(id, !!id);
  const inforDailyIncome: IListItem = useMemo(() => {
    return {
      heading: "Thông tin doanh thu theo ngày",
      list: [
        {
          title: "ID người nhận",
          children: detailDailyIncome?.data?.recipientId,
        },
        {
          title: "ID lịch trình",
          children: detailDailyIncome?.data?.scheduleInstanceId,
        },
        {
          title: "Lương cơ bản",
          children: detailDailyIncome?.data?.baseSalary,
        },
      ],
    };
  }, [detailDailyIncome]);
  const inforCommon: IListItem = useMemo(() => {
    return {
      heading: "Thông tin chung",
      list: [
        {
          title: "Ngày tạo",
          children: detailDailyIncome?.data?.createdAt,
        },
        {
          title: "Người tạo",
          children: detailDailyIncome?.data?.createdBy,
        },
        {
          title: "Người cập nhật",
          children: detailDailyIncome?.data?.updatedBy,
        },
      ],
    };
  }, [detailDailyIncome]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Card variant="elevated" className="p-4 pb-6">
        <DisplayHeadingDetail
          url_edit={`/admin/finance/daily/edit/${id}`}
          heading={`Mã doanh thu theo ngày #${detailDailyIncome?.data?.dailyIncomeId}`}
          updated_at={detailDailyIncome?.data?.updatedAt}
        />
        <DisplayListItemDetail
          data={inforDailyIncome}
        ></DisplayListItemDetail>
        <Divider className="my-4" />
        <DisplayListItemDetail data={inforCommon}></DisplayListItemDetail>
      </Card>
    </Box>
  );
}
