import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { IFormStudent } from 'types/class-management/student.type';
import Card from "components/card/Card";
import { useCreateStudent, useEditStudent, useGetDetailStudent } from 'hook/query/student/use-student';
import { useHistory, useParams } from 'react-router-dom';
import { Spin } from 'antd';
import SelectComp from 'components/fields/SelectField';
import { optionsGender, optionsGradeLevel } from 'variables/option';


export default function CreateEditStudent() {
    const { handleSubmit, control, getValues, reset } = useForm<IFormStudent>({
        defaultValues: {
            name: undefined,
            gender: undefined,
            gradeLevel: undefined,
            phoneNumber: undefined,
            address: undefined,
            parentPhone: undefined,
            parentName: undefined,
        },
        // resolver: yupResolver(schema),
    });

    const { id }: { id: string } = useParams();
    const { mutate: createStudent, isLoading: loadingCreate } = useCreateStudent();
    const { mutate: editStudent, isLoading: loadingEdit } = useEditStudent(id);
    const { data: detailStudent, isFetching: isLoadingDetail } = useGetDetailStudent(id, !!id)
    useEffect(() => {
        if (detailStudent) {
            const { createdAt, createdBy, status, updatedAt, updatedBy, version, ...restData } = detailStudent.data
            reset({ ...restData })
        }
    }, [detailStudent])

    const onSubmit = async (values: IFormStudent) => {
        if (id) {
            await editStudent(values)
            return
        }
        await createStudent(values)
    };
    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <Spin spinning={isLoadingDetail || loadingCreate || loadingEdit} fullscreen />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card variant="elevated" className="p-4 ">
                    <Heading size="md" mb={6} color={useColorModeValue('navy.700', 'white')}>
                        Thông tin học sinh
                    </Heading>
                    <SimpleGrid columns={{ base: 1, "2xl": 2 }} spacing={4}>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { ref, ...restField }, fieldState }) => (
                                <FormControl isRequired isInvalid={!!fieldState?.error}>
                                    <FormLabel>Tên học sinh</FormLabel>
                                    <Input {...restField} placeholder="Nhập tên ..." />
                                    <FormErrorMessage>
                                        {fieldState?.error?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name="address"
                            render={({ field: { ref, ...restField }, fieldState }) => (
                                <FormControl isRequired isInvalid={!!fieldState?.error}>
                                    <FormLabel>Địa chỉ</FormLabel>
                                    <Input {...restField} placeholder="Nhập địa chỉ ..." />
                                    <FormErrorMessage>
                                        {fieldState?.error?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name="gender"
                            render={({ field: { ref, value, onChange }, fieldState }) => (
                                <FormControl isRequired isInvalid={!!fieldState?.error}>
                                    <FormLabel>Giới tính</FormLabel>
                                    <SelectComp options={optionsGender} value={value} onChange={onChange} placeholder="Chọn giới tính" />
                                    <FormErrorMessage>
                                        {fieldState?.error?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name="gradeLevel"
                            render={({ field: { ref, value, onChange }, fieldState }) => (
                                <FormControl isRequired isInvalid={!!fieldState?.error}>
                                    <FormLabel>Trình độ</FormLabel>
                                    <SelectComp options={optionsGradeLevel} value={value} onChange={onChange} placeholder="Chọn lớp" />
                                    <FormErrorMessage>
                                        {fieldState?.error?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name="phoneNumber"
                            render={({ field: { ref, ...restField }, fieldState }) => (
                                <FormControl isRequired isInvalid={!!fieldState?.error}>
                                    <FormLabel>Số điện thoại</FormLabel>
                                    <Input {...restField} placeholder="Nhập sđt ..." />
                                    <FormErrorMessage>
                                        {fieldState?.error?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name="parentName"
                            render={({ field: { ref, ...restField }, fieldState }) => (
                                <FormControl isRequired isInvalid={!!fieldState?.error}>
                                    <FormLabel>Tên phụ huynh</FormLabel>
                                    <Input {...restField} placeholder="Nhập tên ..." />
                                    <FormErrorMessage>
                                        {fieldState?.error?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        />
                         <Controller
                            control={control}
                            name="parentPhone"
                            render={({ field: { ref, ...restField }, fieldState }) => (
                                <FormControl isRequired isInvalid={!!fieldState?.error}>
                                    <FormLabel>Số điện thoại phụ huynh</FormLabel>
                                    <Input {...restField} placeholder="Nhập sđt ..." />
                                    <FormErrorMessage>
                                        {fieldState?.error?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        />
                    </SimpleGrid>
                </Card>
                <Button width={{ base: "100%", lg: "max-content" }} float={"right"} mt={4} variant="brand" type="submit">
                    Lưu dữ liệu
                </Button>
            </form>
        </Box>

    )
}
