import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Heading,
  Input,
  Grid,
  useColorModeValue,
  Avatar,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { Spin } from "antd";
import Card from "components/card/Card";
import SelectComp from "components/fields/SelectField";
import SelectRemote from "components/fields/SelectRemote";
import { SliderThumbWithTooltip } from "components/slider/SliderThumbWithTooltip";
import {
  useEditScheduleInstance,
  useGetDetailScheduleInstance,
  useGetStudentProgress,
  useTeacherReview,
} from "hook/query-class/schedule-instance/use-schedule-instance";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { IResponseStudentProgressInstance } from "types/class-management/after-class.type";
import { IFormScheduleInstance } from "types/class-management/schedule-instance.type";
import { fetchStatusStudentProgress } from "utils/fetchOptions";
import { optionsStatusStudent } from "../create-edit/config";

export default function TeacherReview() {
  const { handleSubmit, control, setValue, reset } =
    useForm<IResponseStudentProgressInstance>({
      defaultValues: {
        data: undefined,
        currentLesson: undefined,
      },
      // resolver: yupResolver(schema),
    });
  const { id }: { id: string } = useParams();
  const { fields } = useFieldArray({
    control,
    name: "data",
  });
  const { mutate: teacherReview, isLoading: loadingReview } =
    useTeacherReview(id);
  const {
    mutate: editScheduleInstance,
    isLoading: loadingEditScheduleInstance,
  } = useEditScheduleInstance(id);

  const { data: detailStudentProgress, isFetching: isLoadingDetail } =
    useGetStudentProgress(id, !!id);
  const {
    data: detailScheduleInstance,
    isFetching: isLoadingScheduleInstance,
  } = useGetDetailScheduleInstance(id, !!id);

  useEffect(() => {
    if (detailStudentProgress) {
      const { data } = detailStudentProgress;
      reset({
        data,
        currentLesson: detailScheduleInstance.data.currentLesson,
      });
    }
  }, [detailStudentProgress]);

  const onSubmit = async (values: IResponseStudentProgressInstance) => {
    if (!id) return;
    if (detailScheduleInstance?.data?.currentLesson !== values?.currentLesson) {
      await editScheduleInstance({
        currentLesson: values?.currentLesson,
      });
    }
    await teacherReview(values);
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Spin
        spinning={loadingReview || isLoadingDetail || isLoadingScheduleInstance}
        fullscreen
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card variant="elevated" className="p-4 mb-4">
          <Heading
            size="md"
            mb={6}
            color={useColorModeValue("navy.700", "white")}
          >
            Thông tin chung
          </Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <GridItem colSpan={1}>
              <Controller
                control={control}
                name={"currentLesson"}
                render={({ field: { ref, ...restField }, fieldState }) => {
                  return (
                    <FormControl isInvalid={!!fieldState?.error}>
                      <FormLabel>Bài học hôm nay</FormLabel>
                      <Input
                        backgroundColor={"white"}
                        {...restField}
                        placeholder="Nhập ..."
                      />
                      <FormErrorMessage>
                        {fieldState?.error?.message}
                      </FormErrorMessage>
                    </FormControl>
                  );
                }}
              />
            </GridItem>
          </Grid>
        </Card>

        <Card variant="elevated" className="p-4 ">
          <Heading
            size="md"
            mb={6}
            color={useColorModeValue("navy.700", "white")}
          >
            Nhận xét học sinh
          </Heading>
          {/* reder list comments */}
          {fields.map((item, index) => {
            return (
              <Grid
                key={item.id}
                className="bg-[#F4F7FE] p-2 pb-4 lg:pb-2  rounded-md mb-4 border border-[#dbe7fd]"
                templateColumns="repeat(24, 1fr)"
                gap={2}
              >
                <GridItem colSpan={24}>
                  <Flex minWidth="max-content" alignItems="center" gap="2">
                    <Avatar name={item?.studentName} />
                    <Heading as="h3" size="md">
                      {item?.studentName}
                    </Heading>
                  </Flex>
                  <Divider className="mt-1" />
                </GridItem>
                <GridItem colSpan={{ base: 24, xl: 6 }}>
                  <Controller
                    control={control}
                    name={`data.${index}.status`}
                    render={({
                      field: { ref, value, onChange },
                      fieldState,
                    }) => (
                      <FormControl isRequired isInvalid={!!fieldState?.error}>
                        <FormLabel>Trạng thái</FormLabel>
                        <SelectRemote
                          placeholder="Chọn trạng thái"
                          value={value}
                          onChange={onChange}
                          getOptions={() => fetchStatusStudentProgress()}
                          className={"bg-white"}
                        />
                        <FormErrorMessage>
                          {fieldState?.error?.message}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  />
                </GridItem>
                <GridItem colSpan={{ base: 24, xl: 6 }}>
                  <Controller
                    control={control}
                    name={`data.${index}.teacherReview`}
                    render={({ field: { ref, ...restField }, fieldState }) => {
                      return (
                        <FormControl isRequired isInvalid={!!fieldState?.error}>
                          <FormLabel>Nhận xét buổi học</FormLabel>
                          <Input
                            backgroundColor={"white"}
                            {...restField}
                            placeholder="Nhập nhận xét ..."
                          />
                          <FormErrorMessage>
                            {fieldState?.error?.message}
                          </FormErrorMessage>
                        </FormControl>
                      );
                    }}
                  />
                </GridItem>
                <GridItem colSpan={{ base: 24, xl: 6 }}>
                  <Controller
                    control={control}
                    name={`data.${index}.result`}
                    render={({ field: { ref, ...restField }, fieldState }) => {
                      return (
                        <FormControl isRequired isInvalid={!!fieldState?.error}>
                          <FormLabel>Kết quả học tập</FormLabel>
                          <Input
                            backgroundColor={"white"}
                            {...restField}
                            placeholder="Nhập kết quả ..."
                          />
                          <FormErrorMessage>
                            {fieldState?.error?.message}
                          </FormErrorMessage>
                        </FormControl>
                      );
                    }}
                  />
                </GridItem>
                <GridItem colSpan={{ base: 24, xl: 6 }}>
                  <Controller
                    control={control}
                    name={`data.${index}.processPercent`}
                    render={({ field, fieldState }) => {
                      return (
                        <FormControl isRequired isInvalid={!!fieldState?.error}>
                          <FormLabel>Tiến độ hoàn thành</FormLabel>
                          <SliderThumbWithTooltip
                            value={field.value}
                            onChange={field.onChange}
                          />
                          <FormErrorMessage>
                            {fieldState?.error?.message}
                          </FormErrorMessage>
                        </FormControl>
                      );
                    }}
                  />
                </GridItem>
              </Grid>
            );
          })}
        </Card>
        <Button
          width={{ base: "100%", lg: "max-content" }}
          float={"right"}
          my={4}
          variant="brand"
          type="submit"
        >
          Lưu dữ liệu
        </Button>
      </form>
    </Box>
  );
}
