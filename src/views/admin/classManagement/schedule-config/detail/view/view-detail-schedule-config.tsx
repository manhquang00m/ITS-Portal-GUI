import { Box, Divider } from "@chakra-ui/react";
import { Tag } from "antd";
import Card from "components/card/Card";
import DisplayHeadingDetail from "components/displayListItemDetail/displayHeadingDetail";
import DisplayListItemDetail from "components/displayListItemDetail/displayListItemDetail";
import { useGetDetailScheduleConfig } from "hook/query-class/schedule-config/use-schedule-config";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { IListItem } from "types/base/base-api.type";

export default function ViewDetailScheduleConfig() {
  const { id }: { id: string } = useParams();
  const { data: detailSchedule } = useGetDetailScheduleConfig(id, !!id);
  const inforTeacher: IListItem = useMemo(() => {
    return {
      heading: "Thông tin lịch dạy",
      list: [
        {
          title: "Lớp học",
          children: detailSchedule?.data?.className,
        },
        {
          title: "Giáo viên",
          children: detailSchedule?.data?.teacherName,
        },
        {
          title: "Ngày trong tuần",
          children: detailSchedule?.data?.weekDay,
        },
        {
          title: "Thời gian",
          children: detailSchedule?.data?.time,
        },
        {
          title: "Vai trò",
          children: (
            <Tag
              color={
                detailSchedule?.data?.teacherRole === "instructor"
                  ? "green"
                  : "gold"
              }
            >
              {detailSchedule?.data?.teacherRoleName}
            </Tag>
          ),
        },
      ],
    };
  }, [detailSchedule]);
  const inforCommon: IListItem = useMemo(() => {
    return {
      heading: "Thông tin chung",
      list: [
        {
          title: "Ngày tạo",
          children: detailSchedule?.data?.createdAt,
        },
        {
          title: "Người tạo",
          children: detailSchedule?.data?.createdBy,
        },
        {
          title: "Người cập nhật",
          children: detailSchedule?.data?.updatedBy,
        },
      ],
    };
  }, [detailSchedule]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Card variant="elevated" className="p-4 pb-6">
        <DisplayHeadingDetail
          url_edit={`/admin/class/schedule-config/edit/${id}`}
          heading={`Mã lịch dạy #${detailSchedule?.data?.teacherId}`}
          updated_at={detailSchedule?.data?.updatedAt}
        />
        <DisplayListItemDetail data={inforTeacher}></DisplayListItemDetail>
        <Divider className="my-4" />
        <DisplayListItemDetail data={inforCommon}></DisplayListItemDetail>
      </Card>
    </Box>
  );
}
