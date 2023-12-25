import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { IFormCost } from 'types/finance/cost.type';
import Card from "components/card/Card";
import { useCreateCost, useEditCost, useGetDetailCost } from 'hook/query-finance/cost/use-get-cost';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';
import SelectRemote from 'components/fields/SelectRemote';
import { fetchTeacher } from 'utils/fetchOptions';


export default function CreateEditCost() {
    const { handleSubmit, control, getValues, reset } = useForm<IFormCost>({
        defaultValues: {
            paymentDate: undefined,
            userId: undefined,
            costAmount: undefined,
        },
        // resolver: yupResolver(schema),
    });

    const { id }: { id: string } = useParams();
    const { mutate: createCost, isLoading: loadingCreate } = useCreateCost();
    const { mutate: editCost, isLoading: loadingEdit } = useEditCost(id);
    const { data: detailCost, isFetching: isLoadingDetail } = useGetDetailCost(id, !!id)
    useEffect(() => {
        if (detailCost) {
            const { createdAt, createdBy, status, updatedAt, updatedBy, version, ...restData } = detailCost.data
            reset({ ...restData })
        }
    }, [detailCost])

    const onSubmit = async (values: IFormCost) => {
        if (id) {
            await editCost(values)
            return
        }
        await createCost(values)
    };
    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <Spin spinning={isLoadingDetail || loadingCreate || loadingEdit} fullscreen />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card variant="elevated" className="p-4 ">
                    <Heading size="md" mb={6} color={useColorModeValue('navy.700', 'white')}>
                        Thông tin chi phí
                    </Heading>
                    <SimpleGrid columns={{ base: 1, "2xl": 2 }} spacing={4}>
                        <Controller
                            control={control}
                            name="userId"
                            render={({ field, fieldState }) => (
                                <FormControl isRequired isInvalid={!!fieldState?.error}>
                                    <FormLabel>Tên nguời dùng</FormLabel>
                                    <SelectRemote placeholder='Chọn giá trị' value={field.value} onChange={field.onChange} getOptions={fetchTeacher} />
                                    <FormErrorMessage>
                                        {fieldState?.error?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name="paymentDate"
                            render={({ field: { ref, ...restField }, fieldState }) => (
                                <FormControl isRequired isInvalid={!!fieldState?.error}>
                                    <FormLabel>Ngày thanh toán</FormLabel>
                                    <Input type={"date"} {...restField} placeholder="Chọn ngày ..." />
                                    <FormErrorMessage>
                                        {fieldState?.error?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name="costAmount"
                            render={({ field: { ref, ...restField }, fieldState }) => (
                                <FormControl isRequired isInvalid={!!fieldState?.error}>
                                    <FormLabel>Tổng chi phí</FormLabel>
                                    <Input {...restField} placeholder="Nhập chi phí..." />
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
