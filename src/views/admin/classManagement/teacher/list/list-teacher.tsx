import { Box } from '@chakra-ui/react'
import { Button, Table } from 'antd'
import { getTeachers } from 'api/teacher.api'
import { useGetTeachers } from 'hook/query/teacher/use-get-teachers'
import { columns, data } from './config'


export function ListTeacher() {
    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <Table columns={columns} dataSource={data} />
            <Button type='primary' >Test</Button>
        </Box>
    )
}
