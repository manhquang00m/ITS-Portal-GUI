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
import { optionRole, optionWeekDay } from "./config";
import SelectComp from "components/fields/SelectField";
import {
  useCreateScheduleConfig,
  useEditScheduleConfig,
  useGetDetailScheduleConfig,
} from "hook/query-class/schedule-config/use-schedule-config";
import { IFormScheduleConfig } from "types/class-management/schedule-config.type";
import {
  useGetOptionsClass,
  useGetOptionsCourse,
  useGetOptionsTeacher,
} from "hook/data-list/use-get-options";
import { useEffect } from "react";
import SelectRemote from "components/fields/SelectRemote";
import { fetchRoleTeacher } from "utils/fetchOptions";

export default function CreateEditScheduleConfig() {
  const { handleSubmit, control, getValues, reset } =
    useForm<IFormScheduleConfig>({
      defaultValues: {
        classId: undefined,
        teacherId: undefined,
        weekDay: undefined,
        time: undefined,
        teacherRole: undefined,
      },
      // resolver: yupResolver(schema),
    });
  const optionClass = useGetOptionsClass();
  const optionTeacher = useGetOptionsTeacher();

  const { id }: { id: string } = useParams();
  const { mutate: createScheduleConfig, isLoading: loadingCreate } =
    useCreateScheduleConfig();
  const { mutate: editScheduleConfig, isLoading: loadingEdit } =
    useEditScheduleConfig(id);
  const { data: detailScheduleConfig, isFetching: isLoadingDetail } =
    useGetDetailScheduleConfig(id, !!id);

  useEffect(() => {
    if (detailScheduleConfig) {
      const { classId, teacherId, weekDay, time, teacherRole } =
        detailScheduleConfig.data;
      reset({ classId, teacherId, weekDay, time, teacherRole });
    }
  }, [detailScheduleConfig]);

  const onSubmit = async (values: IFormScheduleConfig) => {
    if (id) {
      await editScheduleConfig(values);
      return;
    }
    await createScheduleConfig(values);
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
            Cài đặt lịch dạy
          </Heading>
          <SimpleGrid columns={{ base: 1, "2xl": 2 }} spacing={4}>
            <Controller
              control={control}
              name="classId"
              render={({ field: { onChange, value }, fieldState }) => (
                <FormControl isRequired isInvalid={!!fieldState?.error}>
                  <FormLabel>Lớp học</FormLabel>
                  <SelectComp
                    options={optionClass}
                    value={value}
                    onChange={onChange}
                    placeholder="Chọn lớp học"
                  />
                  <FormErrorMessage>
                    {fieldState?.error?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="teacherId"
              render={({ field: { onChange, value }, fieldState }) => (
                <FormControl isRequired isInvalid={!!fieldState?.error}>
                  <FormLabel>Giáo viên</FormLabel>
                  <SelectComp
                    options={optionTeacher}
                    value={value}
                    onChange={onChange}
                    placeholder="Chọn giáo viên"
                  />
                  <FormErrorMessage>
                    {fieldState?.error?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="teacherRole"
              render={({ field: { onChange, value }, fieldState }) => (
                <FormControl isRequired isInvalid={!!fieldState?.error}>
                  <FormLabel>Vai trò giáo viên</FormLabel>
                  <SelectRemote
                    placeholder="Chọn giá trị"
                    value={value}
                    onChange={onChange}
                    getOptions={() => fetchRoleTeacher()}
                  />
                  <FormErrorMessage>
                    {fieldState?.error?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="weekDay"
              render={({ field: { onChange, value }, fieldState }) => (
                <FormControl isRequired isInvalid={!!fieldState?.error}>
                  <FormLabel>Ngày trong tuần</FormLabel>
                  <SelectComp
                    options={optionWeekDay}
                    value={value}
                    onChange={onChange}
                    placeholder="Chọn thứ"
                  />
                  <FormErrorMessage>
                    {fieldState?.error?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="time"
              render={({ field: { ref, ...restField }, fieldState }) => (
                <FormControl isRequired isInvalid={!!fieldState?.error}>
                  <FormLabel>Thời gian dạy</FormLabel>
                  <Input
                    type={"time"}
                    {...restField}
                    placeholder="Chọn thời gian"
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
