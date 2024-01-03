import { Box, Divider } from "@chakra-ui/react";
import Card from "components/card/Card";
import DisplayHeadingDetail from "components/displayListItemDetail/displayHeadingDetail";
import DisplayListItemDetail from "components/displayListItemDetail/displayListItemDetail";
import { useGetDetailLesson } from "hook/query-class/lesson/use-get-lesson";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { IListItem } from "types/base/base-api.type";

export default function ViewDetailLesson() {
  const { id }: { id: string } = useParams();
  const { data: detailLesson } = useGetDetailLesson(id, !!id);
  const inforLesson: IListItem = useMemo(() => {
    return {
      heading: "Thông tin bài giảng",
      list: [
        {
          title: "Tên bài giảng",
          children: detailLesson?.data?.lessonName,
        },
        {
          title: "STT bài giảng",
          children: detailLesson?.data?.lessonNumber,
        },
        {
          title: "Giá tiền",
          children: detailLesson?.data?.price,
        },
        {
          title: "Tên khoá học",
          children: detailLesson?.data?.courseName,
        },
        {
          title: "Mã khoá học",
          children: detailLesson?.data?.courseCode,
        },
      ],
    };
  }, [detailLesson]);
  const inforCommon: IListItem = useMemo(() => {
    return {
      heading: "Thông tin chung",
      list: [
        {
          title: "Ngày tạo",
          children: detailLesson?.data?.createdAt,
        },
        {
          title: "Người tạo",
          children: detailLesson?.data?.createdBy,
        },
        {
          title: "Người cập nhật",
          children: detailLesson?.data?.updatedBy,
        },
      ],
    };
  }, [detailLesson]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Card variant="elevated" className="p-4 pb-6">
        <DisplayHeadingDetail
          url_edit={`/admin/class/lesson/edit/${id}`}
          heading={`Mã bài giảng #${detailLesson?.data?.lessonId}`}
          updated_at={detailLesson?.data?.updatedAt}
        />
        <DisplayListItemDetail data={inforLesson}></DisplayListItemDetail>
        <Divider className="my-4" />
        <DisplayListItemDetail data={inforCommon}></DisplayListItemDetail>
      </Card>
    </Box>
  );
}
