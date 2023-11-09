import { Box } from '@chakra-ui/react'
import { Button, Table } from 'antd'
import { getTeachers } from 'api/teacher.api'
import { useGetTeachers } from 'hook/query/teacher/use-get-teachers'
import { columns } from './config'


export function ListTeacher() {
    const { data } = useGetTeachers({ limit: 10, page: 1 })
    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <Table columns={columns} dataSource={data?.data?.list} rowKey="teacherId" />
        </Box>
    )
}
