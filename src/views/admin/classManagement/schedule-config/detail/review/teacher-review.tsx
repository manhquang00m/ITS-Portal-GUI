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
} from "@chakra-ui/react";
import { Spin } from "antd";
import Card from "components/card/Card";
import SelectComp from "components/fields/SelectField";
import {
  useGetStudentProgress,
  useTeacherReview,
} from "hook/query/schedule-instance/use-schedule-instance";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  IResponseStudentProgressInstance,
  IStudentProgressInstance,
} from "types/class-management/after-class.type";
import { optionsStatusStudent } from "../../../../scheduleInstance/detail/create-edit/config";

export default function TeacherReview() {
  const { handleSubmit, control, getValues, reset } =
    useForm<IResponseStudentProgressInstance>({
      defaultValues: {
        data: undefined,
      },
      // resolver: yupResolver(schema),
    });
  const { id }: { id: string } = useParams();
  const { fields, append, remove } = useFieldArray({
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
    console.log(values)
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
                className="bg-[#F4F7FE] p-2 rounded-md mb-4"
                templateColumns="repeat(24, 1fr)"
                gap={2}
              >
                <GridItem colSpan={{ base: 24, xl: 6 }}>
                  <Controller
                    control={control}
                    name={`data.${index}.studentName`}
                    render={({ field: { ref, ...restField }, fieldState }) => {
                      return (
                        <FormControl isInvalid={!!fieldState?.error}>
                          <FormLabel>Học sinh {`(${index + 1})`}</FormLabel>
                          <Input
                            disabled
                            backgroundColor={"white"}
                            {...restField}
                            placeholder="Nhập tên học sinh ..."
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
                          className= {"bg-white"}
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
                        <FormControl isInvalid={!!fieldState?.error}>
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
                        <FormControl isInvalid={!!fieldState?.error}>
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
