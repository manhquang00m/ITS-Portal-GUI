import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { IFormDailyIncome } from "types/finance/daily-income.type";
import Card from "components/card/Card";
import {
  useCreateDailyIncome,
  useEditDailyIncome,
  useGetDetailDailyIncome,
} from "hook/query-finance/daily-income/use-get-daily-income";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import SelectRemote from "components/fields/SelectRemote";
import { fetchScheduleInstance, fetchTeacher } from "utils/fetchOptions";

export default function CreateEditDailyIncome() {
  const { handleSubmit, control, reset } = useForm<IFormDailyIncome>({
    defaultValues: {
      dailyIncomeId: undefined,
      recipientId: undefined,
      baseSalary: undefined,
      scheduleInstanceId: undefined,
    },
    // resolver: yupResolver(schema),
  });

  const { id }: { id: string } = useParams();
  const { mutate: createDailyIncome, isLoading: loadingCreate } =
    useCreateDailyIncome();
  const { mutate: editDailyIncome, isLoading: loadingEdit } =
    useEditDailyIncome(id);
  const { data: detailDailyIncome, isFetching: isLoadingDetail } =
    useGetDetailDailyIncome(id, !!id);
  useEffect(() => {
    if (detailDailyIncome) {
      const {
        createdAt,
        createdBy,
        status,
        updatedAt,
        updatedBy,
        version,
        ...restData
      } = detailDailyIncome.data;
      reset({
        ...restData,
      });
    }
  }, [detailDailyIncome]);

  const onSubmit = async (values: IFormDailyIncome) => {
    if (id) {
      await editDailyIncome(values);
      return;
    }
    await createDailyIncome(values);
  };
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Spin
        spinning={isLoadingDetail || loadingCreate || loadingEdit}
        fullscreen
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card variant="elevated" className="p-4 ">
          <Heading
            size="md"
            mb={6}
            color={useColorModeValue("navy.700", "white")}
          >
            Thông tin doanh thu theo ngày
          </Heading>
          <SimpleGrid columns={{ base: 1, "2xl": 2 }} spacing={4}>
            <Controller
              control={control}
              name="scheduleInstanceId"
              render={({ field, fieldState }) => (
                <FormControl isRequired isInvalid={!!fieldState?.error}>
                  <FormLabel>Ngày dạy</FormLabel>
                  <SelectRemote
                    placeholder="Chọn giá trị"
                    value={field.value}
                    onChange={field.onChange}
                    getOptions={fetchScheduleInstance}
                  />
                  <FormErrorMessage>
                    {fieldState?.error?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="baseSalary"
              render={({ field: { ref, ...restField }, fieldState }) => (
                <FormControl isRequired isInvalid={!!fieldState?.error}>
                  <FormLabel>Lương cơ bản</FormLabel>
                  <Input type={"number"} {...restField} placeholder="Nhập lương..." />
                  <FormErrorMessage>
                    {fieldState?.error?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="recipientId"
              render={({ field, fieldState }) => (
                <FormControl isRequired isInvalid={!!fieldState?.error}>
                  <FormLabel>Người nhận</FormLabel>
                  <SelectRemote
                    placeholder="Chọn giá trị"
                    value={field.value}
                    onChange={field.onChange}
                    getOptions={fetchTeacher}
                  />
                  <FormErrorMessage>
                    {fieldState?.error?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
          </SimpleGrid>
        </Card>
        <Button
          width={{ base: "100%", lg: "max-content" }}
          float={"right"}
          mt={4}
          variant="brand"
          type="submit"
        >
          Lưu dữ liệu
        </Button>
      </form>
    </Box>
  );
}
