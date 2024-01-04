import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box, IconButton, Tooltip, Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { IFilter, IFilterInput } from "components/filter/types";
import { MdAssignmentAdd, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { IDetailStudent } from "types/class-management/student.type";
import { fetchStatusStudent } from "utils/fetchOptions";

export const columns = (
  history: any,
  setIdStudent: React.Dispatch<React.SetStateAction<number>>,
  onOpen: () => void
): ColumnsType<IDetailStudent> => {
  return [
    {
      title: "ID",
      dataIndex: "studentId",
      key: "studentId",
      width: 60,
    },
    {
      title: "Tên học sinh",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (text) =>
        text === "Nam" || text === "Nữ" ? (
          <Tag color={text === "Nam" ? "blue" : "magenta"} key={text}>
            {text}
          </Tag>
        ) : (
          text
        ),
    },
    {
      title: "Trình độ",
      dataIndex: "gradeLevel",
      key: "gradeLevel",
    },
    {
      title: "Lớp học",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Trạng thái",
      dataIndex: "statusName",
      key: "statusName",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: 200,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Tên phụ huynh",
      dataIndex: "parentName",
      key: "parentName",
    },
    {
      title: "Số điện thoại phụ huynh",
      dataIndex: "parentPhone",
      key: "parentPhone",
    },
    {
      title: "Tác vụ",
      key: "action",
      fixed: "right",
      render: (_, record: IDetailStudent) => {

        return (<>
          <Box display={{ base: "none", xl: "block" }}>
            <Space size="small">
              <Tooltip label="Chỉnh sửa">
                <IconButton
                  variant="outline"
                  aria-label="Call Sage"
                  fontSize="20px"
                  icon={<MdEdit />}
                  onClick={() =>
                    history?.push(`/admin/class/student/edit/${record?.studentId}`)
                  }
                />
              </Tooltip>
              <Tooltip label="Xem chi tiết">
                <IconButton
                  variant="outline"
                  aria-label="Call Sage"
                  fontSize="20px"
                  icon={<MdRemoveRedEye />}
                  onClick={() =>
                    history?.push(
                      `/admin/class/student/detail/${record?.studentId}`
                    )
                  }
                />
              </Tooltip>
              <Tooltip label="Gán vào lớp">
                <IconButton
                  variant="outline"
                  aria-label="Call Sage"
                  fontSize="20px"
                  icon={<MdAssignmentAdd />}
                  onClick={() => {
                    setIdStudent(record?.studentId)
                    onOpen()
                  }}
                />
              </Tooltip>
            </Space>
          </Box>
          <Box display={{ base: "block", xl: "none" }}>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='outline'
              />
              <MenuList>
                <MenuItem icon={<MdEdit />} command='⌘T'>
                  Chỉnh sửa
                </MenuItem>
                <MenuItem icon={<MdRemoveRedEye />} command='⌘N'>
                  Xem chi tiết
                </MenuItem>
                <MenuItem icon={<MdAssignmentAdd />} command='⌘⇧N'>
                  Gán vào lớp
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </>)
      },
    },
  ];
};

export const filterItems: IFilterInput[] = [
  {
    type: "inputText",
    label: "Tên giáo viên",
    controlName: "name",
    placeHolder: "Nhập tên",
  },
  {
    type: "inputText",
    label: "Level",
    controlName: "level",
    placeHolder: "Nhập level",
  },
  {
    type: "selectRemote",
    label: "Trạng thái",
    controlName: "status",
    placeHolder: "Chọn giá trị",
    getOptions: fetchStatusStudent,
  },
];
