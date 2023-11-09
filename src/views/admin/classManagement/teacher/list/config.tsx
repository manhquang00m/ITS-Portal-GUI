import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { IDetailTeacher } from "types/class-management/teacher.type";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export const columns: ColumnsType<IDetailTeacher> = [
  {
    title: 'ID',
    dataIndex: 'teacherId',
    key: 'teacherId',
  },
  {
    title: 'Tên giáo viên',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <Link className="text-[#422AFB]" to={"/view"}>{text}</Link>,
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
    title: 'Action',
    key: 'action',
    render: (text: any, record: any) => (
      <Space size="middle">
        <a>Invite {record?.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

