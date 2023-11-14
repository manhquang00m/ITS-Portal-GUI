import { Box, Button } from '@chakra-ui/react'
import { Table } from 'antd'
import { getTeachers } from 'api/teacher.api'
import { useGetTeachers } from 'hook/query/teacher/use-get-teachers'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { IFilterTeacher } from 'types/class-management/teacher.type'
import { columns } from './config'


export function ListTeacher() {

    const [filter, setFilter] = useState<IFilterTeacher>({ page: 1, limit: 10 })
    const { data, isLoading } = useGetTeachers(filter)
    const history = useHistory();
    const addTeacher = () => {
        history.push('/admin/class/teacher/create');
    };

    const onChangePagination = (page: number, pageSize: number) => {
        setFilter({
            ...filter,
            page: pageSize !== filter?.limit ? 1 : page,
            limit: pageSize
        })
    }

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "7 0px" }}>
            <Button onClick={addTeacher} width={"160px"} float={"right"} mb={4} variant="brand" >
                Thêm giảng viên
            </Button>
            <Table scroll={{ x: 1500, y: 450 }} loading={isLoading} className='mt-2' columns={columns(history)} dataSource={data?.data?.list} rowKey="teacherId" pagination={{
                pageSizeOptions: [5, 10, 20, 50],
                showSizeChanger: true,
                total: data?.data?.totalElements,
                onChange: onChangePagination,
                current: filter?.page,
                pageSize: filter?.limit
            }} />
        </Box>
    )
}
