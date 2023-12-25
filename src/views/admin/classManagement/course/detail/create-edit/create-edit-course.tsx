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
import { Controller, useForm } from "react-hook-form";
import Card from "components/card/Card";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { IFormClass } from "types/class-management/class.type";
import {
  useCreateCourse,
  useEditCourse,
  useGetDetailCourse,
} from "hook/query-class/course/use-query-course";
import { IFormCourse } from "types/class-management/course.type";
import { useEffect } from "react";

export default function CreateEditCourse() {
  const { handleSubmit, control, getValues, reset } = useForm<IFormCourse>({
    defaultValues: {
      name: undefined,
      code: undefined,
      description: undefined,
    },
    // resolver: yupResolver(schema),
  });

  const { id }: { id: string } = useParams();
  const { mutate: createCourse, isLoading: loadingCreate } = useCreateCourse();
  const { mutate: editCourse, isLoading: loadingEdit } = useEditCourse(id);
  const { data: detailCourse, isFetching: isLoadingDetail } =
    useGetDetailCourse(id, !!id);

  useEffect(() => {
    if (detailCourse) {
      const { name, description, code, courseId } = detailCourse.data;
      reset({ name, description, code, courseId });
    }
  }, [detailCourse]);

  const onSubmit = async (values: IFormCourse) => {
    if (id) {
      await editCourse(values);
      return;
    }
    await createCourse(values);
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
            Thông tin khoá học
          </Heading>
          <SimpleGrid columns={{ base: 1, "2xl": 2 }} spacing={4}>
            <Controller
              control={control}
              name="name"
              render={({ field: { ref, ...restField }, fieldState }) => (
                <FormControl isRequired isInvalid={!!fieldState?.error}>
                  <FormLabel>Tên khoá học</FormLabel>
                  <Input {...restField} placeholder="Nhập tên ..." />
                  <FormErrorMessage>
                    {fieldState?.error?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="code"
              render={({ field: { ref, ...restField }, fieldState }) => (
                <FormControl isRequired isInvalid={!!fieldState?.error}>
                  <FormLabel>Mã số khoá học</FormLabel>
                  <Input {...restField} placeholder="Nhập mã số ..." />
                  <FormErrorMessage>
                    {fieldState?.error?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field: { ref, ...restField }, fieldState }) => (
                <FormControl isRequired isInvalid={!!fieldState?.error}>
                  <FormLabel>Mô tả</FormLabel>
                  <Input {...restField} placeholder="Nhập mô tả..." />
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
