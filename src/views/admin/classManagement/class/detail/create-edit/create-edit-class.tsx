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
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Card from "components/card/Card";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { optionsGender } from "./config";
import SelectComp from "components/fields/SelectField";
import { IFormClass } from "types/class-management/class.type";
import {
  useCreateClass,
  useEditClass,
  useGetDetailClass,
} from "hook/query/class/use-query-class";

export default function CreateEditClass() {
  const { handleSubmit, control, getValues, reset } = useForm<IFormClass>({
    defaultValues: {},
    // resolver: yupResolver(schema),
  });

  const { id }: { id: string } = useParams();
  const { mutate: createClass, isLoading: loadingCreate } = useCreateClass();
  const { mutate: editClass, isLoading: loadingEdit } = useEditClass(id);
  const { data: detailClass, isFetching: isLoadingDetail } = useGetDetailClass(
    id,
    !!id
  );
  //   useEffect(() => {
  //     if (detailClass) {
  //       const {
  //         createdAt,
  //         createdBy,
  //         status,
  //         updatedAt,
  //         updatedBy,
  //         userId,
  //         version,
  //         ...restData
  //       } = detailClass.data;
  //       reset({ ...restData });
  //     }
  //   }, [detailClass]);

  const onSubmit = async (values: IFormClass) => {
    if (id) {
      await editClass(values);
      return;
    }
    await createClass(values);
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
            Thông tin lớp học
          </Heading>
          <SimpleGrid columns={{ base: 1, "2xl": 2 }} spacing={4}>
            <Controller
              control={control}
              name="name"
              render={({ field: { ref, ...restField }, fieldState }) => (
                <FormControl isRequired isInvalid={!!fieldState?.error}>
                  <FormLabel>Tên lớp học</FormLabel>
                  <Input {...restField} placeholder="Nhập tên ..." />
                  <FormErrorMessage>
                    {fieldState?.error?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="detail"
              render={({ field: { ref, ...restField }, fieldState }) => (
                <FormControl isRequired isInvalid={!!fieldState?.error}>
                  <FormLabel>Thông tin chi tiết</FormLabel>
                  <Input {...restField} placeholder="Nhập thông tin ..." />
                  <FormErrorMessage>
                    {fieldState?.error?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="totalLesson"
              render={({ field: { ref, ...restField }, fieldState }) => (
                <FormControl isRequired isInvalid={!!fieldState?.error}>
                  <FormLabel>Tổng bài học </FormLabel>
                  <Input {...restField} placeholder="Nhập tổng bài học" />
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
