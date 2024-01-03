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
import { SliderThumbWithTooltip } from "components/slider/SliderThumbWithTooltip";
import {
  useGetStudentProgress,
  useTeacherReview,
} from "hook/query-class/schedule-instance/use-schedule-instance";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  IResponseStudentProgressInstance,
} from "types/class-management/after-class.type";
import { optionsStatusStudent } from "../../../../scheduleInstance/detail/create-edit/config";

export default function TeacherReview() {
  const { handleSubmit, control, setValue, reset } =
    useForm<IResponseStudentProgressInstance>({
      defaultValues: {
        data: undefined,
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
  const { data: detailStudentProgress, isFetching: isLoadingDetail } =
    useGetStudentProgress(id, !!id);

  useEffect(() => {
    if (detailStudentProgress) {
      const { data } = detailStudentProgress;
      reset({ data });
    }
  }, [detailStudentProgress]);

  const onSubmit = async (values: IResponseStudentProgressInstance) => {
    if (id) {
      await teacherReview(values);
      return;
    }
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Spin spinning={loadingReview || isLoadingDetail} fullscreen />
      <form onSubmit={handleSubmit(onSubmit)}>
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
                        <SelectComp
                          options={optionsStatusStudent}
                          value={value}
                          onChange={onChange}
                          placeholder="Chọn trạng thái"
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
