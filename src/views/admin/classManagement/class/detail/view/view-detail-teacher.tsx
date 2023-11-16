import { Box, Button, Center, Divider, Flex, Heading, IconButton, Spacer, Text } from "@chakra-ui/react";
import Card from "components/card/Card";
import DisplayListItemDetail from "components/displayListItemDetail/displayListItemDetail";
import { useGetDetailTeacher } from "hook/query/teacher/use-get-teachers";
import { useMemo } from "react";
import { MdEdit } from "react-icons/md";
import { useHistory, useParams } from "react-router-dom";
import { IListItem } from "types/base/base-api.type";

export default function ViewDetailTeacher() {
    const { id }: { id: string } = useParams();
    const history = useHistory()
    const { data: detailTeacher } = useGetDetailTeacher(id, !!id)
    const inforTeacher: IListItem = useMemo(() => {
        return {
            heading: "Thông tin giảng viên",
            list: [
                {
                    title: 'Tên giảng viên',
                    children: detailTeacher?.data?.name
                },
                {
                    title: 'Giới tính',
                    children: detailTeacher?.data?.gender
                }, {
                    title: 'Level',
                    children: detailTeacher?.data?.level
                }, {
                    title: 'Địa chỉ',
                    children: detailTeacher?.data?.address
                },
                {
                    title: 'Cơ quan',
                    children: detailTeacher?.data?.institution
                },
                {
                    title: 'Địa chỉ',
                    children: detailTeacher?.data?.address
                }
            ]
        }
    }, [detailTeacher])
    const inforCommon: IListItem = useMemo(() => {
        return {
            heading: "Thông tin chung",
            list: [
                {
                    title: 'Ngày tạo',
                    children: detailTeacher?.data?.createdAt
                },
                {
                    title: 'Người tạo',
                    children: detailTeacher?.data?.createdBy
                },
                {
                    title: 'Người cập nhật',
                    children: detailTeacher?.data?.updatedBy
                },
            ]
        }
    }, [detailTeacher])

    const linkToEdit = () => {
        history?.push(`/admin/class/teacher/edit/${id}`)
    }
    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }} >
            <Card variant="elevated" className="p-4 pb-6">
                <Card variant="elevated" px={{ base: "16px", xl: "32px" }} className="py-10 mb-8" backgroundImage={"linear-gradient(to bottom, #7551FF,#3311DB)"}>
                    <Flex>
                        <Box w="500px" >
                            <Heading color={'white'} as="h2" fontSize={{ base: "24px" }}>
                                Mã giảng viên #09746
                            </Heading>
                            <Text marginTop={'8px'} fontSize={{ base: "md", xl: "lg" }} color={'white'}>Ngày cập nhật: July 27, 2022 at 09:44 AM</Text>
                        </Box>
                        <Spacer />
                        <Center w="124px" >

                            <Button variant={"unstyled"} width={"160px"} onClick={linkToEdit} color={"white"} rightIcon={<MdEdit />} background={"linear-gradient(293.45deg, rgb(250, 112, 154) 0%, rgb(254, 225, 64) 92.27%)"}>
                                Chỉnh sửa
                            </Button>
                        </Center>
                    </Flex>
                </Card>
                <DisplayListItemDetail data={inforTeacher}></DisplayListItemDetail>
                <Divider className="my-4" />
                <DisplayListItemDetail data={inforCommon}></DisplayListItemDetail>
            </Card>
        </Box>
    )
}
