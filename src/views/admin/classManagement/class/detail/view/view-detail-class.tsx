import { Box, Divider } from "@chakra-ui/react";
import Card from "components/card/Card";
import DisplayHeadingDetail from "components/displayListItemDetail/displayHeadingDetail";
import DisplayListItemDetail from "components/displayListItemDetail/displayListItemDetail";
import { useGetDetailClass } from "hook/query/class/use-query-class";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { IListItem } from "types/base/base-api.type";

export default function ViewDetailClass() {
    const { id }: { id: string } = useParams();
    const { data: detailClass } = useGetDetailClass(id, !!id)
    const inforClass: IListItem = useMemo(() => {
        return {
            heading: "Thông tin lớp học",
            list: [
                {
                    title: "Tên lớp học",
                    children: detailClass?.data?.name,
                },
                {
                    title: "Chi tiết",
                    children: detailClass?.data?.detail,
                },
                {
                    title: "Tên môn học",
                    children: detailClass?.data?.courseName,
                },
                {
                    title: "Mã môn học",
                    children: detailClass?.data?.courseId,
                },

            ],
        };
    }, [detailClass]);
    const inforCommon: IListItem = useMemo(() => {
        return {
            heading: "Thông tin chung",
            list: [
                {
                    title: 'Ngày tạo',
                    children: detailClass?.data?.createdAt
                },
                {
                    title: 'Người tạo',
                    children: detailClass?.data?.createdBy
                },
                {
                    title: 'Người cập nhật',
                    children: detailClass?.data?.updatedBy
                },
            ]
        }
    }, [detailClass])
    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }} >
            <Card variant="elevated" className="p-4 pb-6">
                <DisplayHeadingDetail
                    url_edit={`/admin/class/zoom/edit/${id}`}
                    heading={`Mã lớp học #${detailClass?.data?.classId}`}
                    updated_at={detailClass?.data?.updatedAt}
                />
                <DisplayListItemDetail data={inforClass}></DisplayListItemDetail>
                <Divider className="my-4" />
                <DisplayListItemDetail data={inforCommon}></DisplayListItemDetail>
            </Card>
        </Box>
    )
}
