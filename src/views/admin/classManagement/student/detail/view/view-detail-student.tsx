import { Box, Divider } from "@chakra-ui/react";
import Card from "components/card/Card";
import DisplayHeadingDetail from "components/displayListItemDetail/displayHeadingDetail";
import DisplayListItemDetail from "components/displayListItemDetail/displayListItemDetail";
import { useGetDetailStudent } from "hook/query-class/student/use-student";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { IListItem } from "types/base/base-api.type";

export default function ViewDetailStudent() {
  const { id }: { id: string } = useParams();
  const { data: detailStudent } = useGetDetailStudent(id, !!id);
  const inforStudent: IListItem = useMemo(() => {
    return {
      heading: "Thông tin học sinh",
      list: [
        {
          title: "Tên học sinh",
          children: detailStudent?.data?.name,
        },
        {
          title: "Giới tính",
          children: detailStudent?.data?.gender,
        },
        {
          title: "Trình độ",
          children: detailStudent?.data?.gradeLevel,
        },
        {
          title: "Địa chỉ",
          children: detailStudent?.data?.address,
        },
        {
          title: "Số điện thoại",
          children: detailStudent?.data?.phoneNumber,
        },
        {
          title: "Địa chỉ",
          children: detailStudent?.data?.address,
        },
        {
          title: "Tên phụ huynh",
          children: detailStudent?.data?.parentName,
        },
        {
          title: "Số điện thoại phụ huynh",
          children: detailStudent?.data?.parentPhone,
        },
      ],
    };
  }, [detailStudent]);
  const inforCommon: IListItem = useMemo(() => {
    return {
      heading: "Thông tin chung",
      list: [
        {
          title: "Ngày tạo",
          children: detailStudent?.data?.createdAt,
        },
        {
          title: "Người tạo",
          children: detailStudent?.data?.createdBy,
        },
        {
          title: "Người cập nhật",
          children: detailStudent?.data?.updatedBy,
        },
      ],
    };
  }, [detailStudent]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Card variant="elevated" className="p-4 pb-6">
        <DisplayHeadingDetail
          url_edit={`/admin/class/student/edit/${id}`}
          heading={`Mã học sinh #${detailStudent?.data?.studentId}`}
          updated_at={detailStudent?.data?.updatedAt}
        />
        <DisplayListItemDetail data={inforStudent}></DisplayListItemDetail>
        <Divider className="my-4" />
        <DisplayListItemDetail data={inforCommon}></DisplayListItemDetail>
      </Card>
    </Box>
  );
}
