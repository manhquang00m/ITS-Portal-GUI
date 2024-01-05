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
import { IFormMonthlyIncome } from "types/finance/monthly-income.type";
import Card from "components/card/Card";
import {
  useCreateMonthlyIncome,
  useEditMonthlyIncome,
  useGetDetailMonthlyIncome,
} from "hook/query-finance/monthly-income/use-get-monthly-income";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import SelectRemote from "components/fields/SelectRemote";
import { fetchTeacher } from "utils/fetchOptions";

export default function CreateEditMonthlyIncome() {
  const { handleSubmit, control, reset } = useForm<IFormMonthlyIncome>({
    defaultValues: {
      monthlyId: undefined,
      userId: undefined,
      baseSalary: undefined,
    },
    // resolver: yupResolver(schema),
  });

  const { id }: { id: string } = useParams();
  const { mutate: createMonthlyIncome, isLoading: loadingCreate } =
    useCreateMonthlyIncome();
  const { mutate: editMonthlyIncome, isLoading: loadingEdit } =
    useEditMonthlyIncome(id);
  const { data: detailMonthlyIncome, isFetching: isLoadingDetail } =
    useGetDetailMonthlyIncome(id, !!id);
  useEffect(() => {
    if (detailMonthlyIncome) {
      const {
        createdAt,
        createdBy,
        status,
        updatedAt,
        updatedBy,
        version,
        ...restData
      } = detailMonthlyIncome.data;
      reset({
        ...restData,
      });
    }
  }, [detailMonthlyIncome]);

  const onSubmit = async (values: IFormMonthlyIncome) => {
    if (id) {
      await editMonthlyIncome(values);
      return;
    }
    await createMonthlyIncome(values);
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
            Thông tin doanh thu theo tháng
          </Heading>
          <SimpleGrid columns={{ base: 1, "2xl": 2 }} spacing={4}>
            <Controller
              control={control}
              name="userId"
              render={({ field, fieldState }) => (
                <FormControl isRequired isInvalid={!!fieldState?.error}>
                  <FormLabel>Tên nguời dùng</FormLabel>
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
