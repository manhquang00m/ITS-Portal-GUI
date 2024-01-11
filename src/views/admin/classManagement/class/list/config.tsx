import { Badge } from "antd";
import { ColumnsType } from "antd/es/table";
import { IFilterInput } from "components/filter/types";
import PopoverMore, {
  IPopoverMoreProps,
} from "components/popoverMore/PopoverMore";
import { IDetailClass } from "types/class-management/class.type";
import { fetchStatusClass } from "utils/fetchOptions";
import { colorStatusBadge } from "variables/colorStatus";

export const columns = (
  setIdDelete: React.Dispatch<React.SetStateAction<number>>,
  onOpenDelete: () => void
): ColumnsType<IDetailClass> => {
  return [
    {
      title: "ID",
      dataIndex: "classId",
      key: "classId",
      width: 60,
    },
    {
      title: "Mã số khóa học",
      dataIndex: "courseCode",
      key: "courseCode",
      width: 140,
    },
    {
      title: "Tên khóa học",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Tên lớp",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Chi tiết",
      dataIndex: "detail",
      key: "detail",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Trạng thái",
      dataIndex: "statusName",
      key: "statusName",
      render: (text, record) => (
        <Badge color={colorStatusBadge[record.status]} text={text} />
      )
    },
    {
      title: "Danh sách học sinh",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "Tổng bài học",
      dataIndex: "totalLesson",
      key: "totalLesson",
    },
    {
      title: "Tác vụ",
      key: "action",
      fixed: "right",
      width: 80,
      render: (_, record: IDetailClass) => {
        const listButton: IPopoverMoreProps[] = [
          {
            type: "edit",
            urlNavigate: `/admin/class/zoom/edit/${record?.classId}`,
          },
          {
            type: "view",
            urlNavigate: `/admin/class/zoom/detail/${record?.classId}`,
          },
          {
            type: "delete",
            handleCustom: () => {
              setIdDelete(record?.classId);
              onOpenDelete();
            },
          },
        ];
        return <PopoverMore listButton={listButton} />;
      },
    },
  ];
};

export const filterItems: IFilterInput[] = [
  {
    type: "inputText",
    label: "Tên khoá học",
    controlName: "courseName",
    placeHolder: "Nhập khoá học",
  },
  {
    type: "inputText",
    label: "Tên lớp",
    controlName: "className",
    placeHolder: "Nhập tên lớp",
  },
  {
    type: "selectRemote",
    label: "Trạng thái",
    controlName: "status",
    placeHolder: "Chọn giá trị",
    defaultValue: "active",
    getOptions: fetchStatusClass,
  },
];
