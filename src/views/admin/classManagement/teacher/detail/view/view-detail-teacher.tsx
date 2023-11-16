import { Box, Divider } from "@chakra-ui/react";
import Card from "components/card/Card";
import DisplayHeadingDetail from "components/displayListItemDetail/displayHeadingDetail";
import DisplayListItemDetail from "components/displayListItemDetail/displayListItemDetail";
import { useGetDetailTeacher } from "hook/query/teacher/use-get-teachers";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { IListItem } from "types/base/base-api.type";

export default function ViewDetailTeacher() {
  const { id }: { id: string } = useParams();
  const { data: detailTeacher } = useGetDetailTeacher(id, !!id);
  const inforTeacher: IListItem = useMemo(() => {
    return {
      heading: "Thông tin giảng viên",
      list: [
        {
          title: "Tên giảng viên",
          children: detailTeacher?.data?.name,
        },
        {
          title: "Giới tính",
          children: detailTeacher?.data?.gender,
        },
        {
          title: "Level",
          children: detailTeacher?.data?.level,
        },
        {
          title: "Địa chỉ",
          children: detailTeacher?.data?.address,
        },
        {
          title: "Cơ quan",
          children: detailTeacher?.data?.institution,
        },
        {
          title: "Địa chỉ",
          children: detailTeacher?.data?.address,
        },
      ],
    };
  }, [detailTeacher]);
  const inforCommon: IListItem = useMemo(() => {
    return {
      heading: "Thông tin chung",
      list: [
        {
          title: "Ngày tạo",
          children: detailTeacher?.data?.createdAt,
        },
        {
          title: "Người tạo",
          children: detailTeacher?.data?.createdBy,
        },
        {
          title: "Người cập nhật",
          children: detailTeacher?.data?.updatedBy,
        },
      ],
    };
  }, [detailTeacher]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Card variant="elevated" className="p-4 pb-6">
        <DisplayHeadingDetail
          url_edit={`/admin/class/teacher/edit/${id}`}
          heading={`Mã giảng viên #${detailTeacher?.data?.teacherId}`}
          updated_at={detailTeacher?.data?.updatedAt}
        />
        <DisplayListItemDetail data={inforTeacher}></DisplayListItemDetail>
        <Divider className="my-4" />
        <DisplayListItemDetail data={inforCommon}></DisplayListItemDetail>
      </Card>
    </Box>
  );
}
