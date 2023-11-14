import { Button, IconButton } from "@chakra-ui/react";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { MdEdit, MdPhone, MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import { IDetailTeacher } from "types/class-management/teacher.type";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export const columns = (history: any): ColumnsType<IDetailTeacher> => {
  return [
    {
      title: 'ID',
      dataIndex: 'teacherId',
      key: 'teacherId',
      width: 60,
    },
    {
      title: 'Tên giáo viên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Cơ quan',
      dataIndex: 'institution',
      key: 'institution',
    },
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (tags: string[]) => (
    //     <span>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </span>
    //   ),
    // },
    {
      title: 'Tác vụ',
      key: 'action',
      fixed: 'right',
      width: 120,
      render: (_, record: IDetailTeacher) => (
        <Space size="middle">
          <IconButton
            variant='outline'
            aria-label='Call Sage'
            fontSize='20px'
            icon={<MdEdit />}
            onClick={() => history?.push(`/admin/class/teacher/edit/${record?.teacherId}`)}
          />
          <IconButton
            variant='outline'
            aria-label='Call Sage'
            fontSize='20px'
            icon={<MdRemoveRedEye />}
            onClick={() => history?.push(`/admin/class/teacher/detail/${record?.teacherId}`)}
          />
        </Space>
      ),
    },
  ]
}

