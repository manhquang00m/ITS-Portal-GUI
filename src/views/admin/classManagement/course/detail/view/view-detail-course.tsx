import { Box, Divider } from "@chakra-ui/react";
import Card from "components/card/Card";
import DisplayHeadingDetail from "components/displayListItemDetail/displayHeadingDetail";
import DisplayListItemDetail from "components/displayListItemDetail/displayListItemDetail";
import { useGetDetailCourse } from "hook/query/course/use-query-course";
import { useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IListItem } from "types/base/base-api.type";

export default function ViewDetailCourse() {
  const { id }: { id: string } = useParams();
  const { data: detailCourse } = useGetDetailCourse(id, !!id);
  const inforCourse: IListItem = useMemo(() => {
    return {
      heading: "Thông tin khoá học",
      list: [
        {
          title: "Tên khoá học",
          children: detailCourse?.data?.name,
        },
        {
          title: "Mã số khoá học",
          children: detailCourse?.data?.code,
        },
        {
          title: "Mô tả",
          children: detailCourse?.data?.description,
        },
      ],
    };
  }, [detailCourse]);
  const inforCommon: IListItem = useMemo(() => {
    return {
      heading: "Thông tin chung",
      list: [
        {
          title: "Ngày tạo",
          children: detailCourse?.data?.createdAt,
        },
        {
          title: "Người tạo",
          children: detailCourse?.data?.createdBy,
        },
        {
          title: "Người cập nhật",
          children: detailCourse?.data?.updatedBy,
        },
      ],
    };
  }, [detailCourse]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Card variant="elevated" className="p-4 pb-6">
        <DisplayHeadingDetail
          url_edit={`/admin/class/course/edit/${id}`}
          heading={`Mã khóa học #${detailCourse?.data?.courseId}`}
          updated_at={detailCourse?.data?.updatedAt}
        />
        <DisplayListItemDetail data={inforCourse}></DisplayListItemDetail>
        <Divider className="my-4" />
        <DisplayListItemDetail data={inforCommon}></DisplayListItemDetail>
      </Card>
    </Box>
  );
}
