import { Box, Divider } from "@chakra-ui/react";
import Card from "components/card/Card";
import DisplayHeadingDetail from "components/displayListItemDetail/displayHeadingDetail";
import DisplayListItemDetail from "components/displayListItemDetail/displayListItemDetail";
import { useGetDetailCost } from "hook/query-finance/cost/use-get-cost";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { IListItem } from "types/base/base-api.type";

export default function ViewDetailCost() {
  const { id }: { id: string } = useParams();
  const { data: detailCost } = useGetDetailCost(id, !!id);
  const inforCost: IListItem = useMemo(() => {
    return {
      heading: "Thông tin chi phí",
      list: [
        {
          title: "Tên người dùng",
          children: detailCost?.data?.userFullName,
        },
        {
          title: "ID người dùng",
          children: detailCost?.data?.userId,
        },
        {
          title: "Ngày thanh toán",
          children: detailCost?.data?.paymentDate,
        },
        {
          title: "Tổng chi phí",
          children: detailCost?.data?.costAmount,
        },
        {
          title: "Mô tả",
          children: detailCost?.data?.description,
        },
      ],
    };
  }, [detailCost]);
  const inforCommon: IListItem = useMemo(() => {
    return {
      heading: "Thông tin chung",
      list: [
        {
          title: "Ngày tạo",
          children: detailCost?.data?.createdAt,
        },
        {
          title: "Người tạo",
          children: detailCost?.data?.createdBy,
        },
        {
          title: "Người cập nhật",
          children: detailCost?.data?.updatedBy,
        },
      ],
    };
  }, [detailCost]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Card variant="elevated" className="p-4 pb-6">
        <DisplayHeadingDetail
          url_edit={`/admin/finance/cost/edit/${id}`}
          heading={`Mã chi phí #${detailCost?.data?.costId}`}
          updated_at={detailCost?.data?.updatedAt}
        />
        <DisplayListItemDetail data={inforCost}></DisplayListItemDetail>
        <Divider className="my-4" />
        <DisplayListItemDetail data={inforCommon}></DisplayListItemDetail>
      </Card>
    </Box>
  );
}
