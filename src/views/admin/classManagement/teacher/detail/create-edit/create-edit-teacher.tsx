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
import { IFormTeacher } from "types/class-management/teacher.type";
import Card from "components/card/Card";
import {
  useCreateTeacher,
  useEditTeacher,
  useGetDetailTeacher,
} from "hook/query-class/teacher/use-get-teachers";
import { useHistory, useParams } from "react-router-dom";
import { Spin } from "antd";
import SelectComp from "components/fields/SelectField";
import { optionsGender } from "variables/option";
import { fetchTeacherLevel } from "utils/fetchOptions";
import SelectRemote from "components/fields/SelectRemote";

export default function CreateEditTeacher() {
  const { handleSubmit, control, getValues, reset } = useForm<IFormTeacher>({
    defaultValues: {
      name: undefined,
      gender: undefined,
      level: undefined,
      institution: undefined,
      address: undefined,
    },
    // resolver: yupResolver(schema),
  });

  const { id }: { id: string } = useParams();
  const { mutate: createTeacher, isLoading: loadingCreate } =
    useCreateTeacher();
  const { mutate: editTeacher, isLoading: loadingEdit } = useEditTeacher(id);
  const { data: detailTeacher, isFetching: isLoadingDetail } =
    useGetDetailTeacher(id, !!id);
  useEffect(() => {
    if (detailTeacher) {
      const {
        createdAt,
        createdBy,
        status,
        updatedAt,
        updatedBy,
        userId,
        version,
        ...restData
      } = detailTeacher.data;
      reset({ ...restData });
    }
  }, [detailTeacher]);

  const onSubmit = async (values: IFormTeacher) => {
    if (id) {
      await editTeacher(values);
      return;
    }
    await createTeacher(values);
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
            Thông tin giáo viên
          </Heading>
          <SimpleGrid columns={{ base: 1, "2xl": 2 }} spacing={4}>
            <Controller
              control={control}
              name="name"
              render={({ field: { ref, ...restField }, fieldState }) => (
                <FormControl isRequired isInvalid={!!fieldState?.error}>
                  <FormLabel>Tên giáo viên</FormLabel>
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
                  <SelectComp
                    options={optionsGender}
                    value={value}
                    onChange={onChange}
                    placeholder="Chọn giới tính"
                  />
                  <FormErrorMessage>
                    {fieldState?.error?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="level"
              render={({ field: { onChange, value}, fieldState }) => (
                <FormControl isRequired isInvalid={!!fieldState?.error}>
                  <FormLabel>Level</FormLabel>
                  <SelectRemote
                    placeholder="Chọn giá trị"
                    value={value}
                    onChange={onChange}
                    getOptions={() => fetchTeacherLevel()}
                  />
                  <FormErrorMessage>
                    {fieldState?.error?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="institution"
              render={({ field: { ref, ...restField }, fieldState }) => (
                <FormControl isRequired isInvalid={!!fieldState?.error}>
                  <FormLabel>Cơ quan</FormLabel>
                  <Input {...restField} placeholder="Nhập cơ quan ..." />
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
