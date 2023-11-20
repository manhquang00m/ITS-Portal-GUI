import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form';
import Card from "components/card/Card";
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { optionRole, optionWeekDay } from './config';
import SelectComp from 'components/fields/SelectField';
import { useGetOptionsClass, useGetOptionsCourse, useGetOptionsScheduleConfig, useGetOptionsTeacher } from 'hook/data-list/use-get-options';
import { useEffect } from 'react';
import { IFormScheduleInstance } from 'types/class-management/schedule-instance.type';
import { useCreateScheduleInstance, useEditScheduleInstance, useGetDetailScheduleInstance } from 'hook/query/schedule-instance/use-schedule-instance';


export default function CreateEditScheduleInstance() {
    const { handleSubmit, control, getValues, reset } = useForm<IFormScheduleInstance>({
        defaultValues: {
            classId: undefined,
            teacherId: undefined,
            scheduleConfigId: undefined,
            date: undefined,
            teacherRole: undefined,
            currentLesson: undefined,
            nextLesson: undefined,
        },
        // resolver: yupResolver(schema),
    });
    const optionClass = useGetOptionsClass()
    const optionTeacher = useGetOptionsTeacher()
    const optionSchedule = useGetOptionsScheduleConfig()



    const { id }: { id: string } = useParams();
    const { mutate: createScheduleInstance, isLoading: loadingCreate } = useCreateScheduleInstance();
    const { mutate: editScheduleInstance, isLoading: loadingEdit } = useEditScheduleInstance(id);
    const { data: detailScheduleInstance, isFetching: isLoadingDetail } = useGetDetailScheduleInstance(id, false)


    useEffect(() => {
        if (detailScheduleInstance) {
            const { classId, teacherId, scheduleConfigId, date, teacherRole, currentLesson, nextLesson } = detailScheduleInstance.data
            reset({ classId, teacherId, scheduleConfigId, date, teacherRole, currentLesson, nextLesson })
        }
    }, [detailScheduleInstance])

    const onSubmit = async (values: IFormScheduleInstance) => {
        if (id) {
            await editScheduleInstance(values)
            return
        }
        await createScheduleInstance(values)
    };
    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <Spin spinning={isLoadingDetail || loadingCreate || loadingEdit} fullscreen />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card variant="elevated" className="p-4 ">
                    <Heading size="md" mb={6} color={useColorModeValue('navy.700', 'white')}>
                        Cài đặt lịch dạy
                    </Heading>
                    <SimpleGrid columns={{ base: 1, "2xl": 2 }} spacing={4}>
                        <Controller
                            control={control}
                            name="scheduleConfigId"
                            render={({ field: { onChange, value }, fieldState }) => (
                                <FormControl isRequired isInvalid={!!fieldState?.error}>
                                    <FormLabel>Chọn lịch dạy</FormLabel>
                                    <SelectComp options={optionSchedule} value={value} onChange={onChange} placeholder="Chọn lịch dạy" />
                                    <FormErrorMessage>
                                        {fieldState?.error?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name="classId"
                            render={({ field: { onChange, value }, fieldState }) => (
                                <FormControl isRequired isInvalid={!!fieldState?.error}>
                                    <FormLabel>Lớp học</FormLabel>
                                    <SelectComp options={optionClass} value={value} onChange={onChange} placeholder="Chọn lớp học" />
                                    <FormErrorMessage>
                                        {fieldState?.error?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name="teacherId"
                            render={({ field: { onChange, value }, fieldState }) => (
                                <FormControl isRequired isInvalid={!!fieldState?.error}>
                                    <FormLabel>Giáo viên</FormLabel>
                                    <SelectComp options={optionTeacher} value={value} onChange={onChange} placeholder="Chọn giáo viên" />
                                    <FormErrorMessage>
                                        {fieldState?.error?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name="teacherRole"
                            render={({ field: { onChange, value }, fieldState }) => (
                                <FormControl isRequired isInvalid={!!fieldState?.error}>
                                    <FormLabel>Vai trò giáo viên</FormLabel>
                                    <SelectComp options={optionRole} value={value} onChange={onChange} placeholder="Chọn vai trò" />
                                    <FormErrorMessage>
                                        {fieldState?.error?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name="date"
                            render={({ field: { ref, ...restField }, fieldState }) => (
                                <FormControl isRequired isInvalid={!!fieldState?.error}>
                                    <FormLabel>Ngày dạy</FormLabel>
                                    <Input type={"date"} {...restField} placeholder="Chọn ngày" />
                                    <FormErrorMessage>
                                        {fieldState?.error?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name="currentLesson"
                            render={({ field: { ref, ...restField }, fieldState }) => (
                                <FormControl isRequired isInvalid={!!fieldState?.error}>
                                    <FormLabel>Bài học hôm nay</FormLabel>
                                    <Input type={"text"} {...restField} placeholder="Nhập bài học" />
                                    <FormErrorMessage>
                                        {fieldState?.error?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name="nextLesson"
                            render={({ field: { ref, ...restField }, fieldState }) => (
                                <FormControl isRequired isInvalid={!!fieldState?.error}>
                                    <FormLabel>Bài học tiếp theo</FormLabel>
                                    <Input type={"text"} {...restField} placeholder="Nhập bài học" />
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
