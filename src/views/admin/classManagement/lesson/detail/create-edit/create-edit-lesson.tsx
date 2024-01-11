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
import { IFormLesson } from "types/class-management/lesson.type";
import Card from "components/card/Card";
import {
  useCreateLesson,
  useEditLesson,
  useGetDetailLesson,
} from "hook/query-class/lesson/use-get-lesson";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import SelectRemote from "components/fields/SelectRemote";
import { fetchCourse } from "utils/fetchOptions";

export default function CreateEditLesson() {
  const { handleSubmit, control, reset } = useForm<IFormLesson>({
    defaultValues: {
      lessonName: undefined,
      lessonNumber: undefined,
      price: undefined,
      courseId: undefined,
    },
    // resolver: yupResolver(schema),
  });

  const { id }: { id: string } = useParams();
  const { mutate: createLesson, isLoading: loadingCreate } = useCreateLesson();
  const { mutate: editLesson, isLoading: loadingEdit } = useEditLesson(id);
  const { data: detailLesson, isFetching: isLoadingDetail } =
    useGetDetailLesson(id, !!id);
  useEffect(() => {
    if (detailLesson) {
      const {
        createdAt,
        createdBy,
        status,
        updatedAt,
        updatedBy,
        version,
        ...restData
      } = detailLesson.data;
      reset({ ...restData });
    }
  }, [detailLesson]);

  const onSubmit = async (values: IFormLesson) => {
    if (id) {
      await editLesson(values);
      return;
    }
    await createLesson(values);
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
            Thông tin bài giảng
          </Heading>
          <SimpleGrid columns={{ base: 1, "2xl": 2 }} spacing={4}>
            <Controller
              control={control}
              name="lessonName"
              render={({ field: { ref, ...restField }, fieldState }) => (
                <FormControl isRequired isInvalid={!!fieldState?.error}>
                  <FormLabel>Tên bài giảng</FormLabel>
                  <Input {...restField} placeholder="Nhập tên ..." />
                  <FormErrorMessage>
                    {fieldState?.error?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="lessonNumber"
              render={({ field: { ref, ...restField }, fieldState }) => (
                <FormControl isRequired isInvalid={!!fieldState?.error}>
                  <FormLabel>STT bài giảng</FormLabel>
                  <Input
                    type={"number"}
                    {...restField}
                    placeholder="Nhập STT ..."
                  />
                  <FormErrorMessage>
                    {fieldState?.error?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="price"
              render={({ field: { ref, ...restField }, fieldState }) => (
                <FormControl isRequired isInvalid={!!fieldState?.error}>
                  <FormLabel>Giá tiền</FormLabel>
                  <Input
                    type={"number"}
                    {...restField}
                    placeholder="Nhập giá tiền ..."
                  />
                  <FormErrorMessage>
                    {fieldState?.error?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="courseId"
              render={({ field, fieldState }) => (
                <FormControl isRequired isInvalid={!!fieldState?.error}>
                  <FormLabel>Khoá học</FormLabel>
                  <SelectRemote
                    placeholder="Chọn giá trị"
                    value={field.value}
                    onChange={field.onChange}
                    getOptions={() => fetchCourse(true)}
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
