// Chakra imports
import {
  Box,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

// Assets
import Card from "components/card/Card";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useRef } from "react";
import { MdDeleteOutline, MdOutlineNoteAdd } from "react-icons/md";
import { IFormAfterClass } from "types/class-management/after-class.type";
import { AfterClassCanvas } from "./components/AfterClassCanvas";
import { SliderThumbWithTooltip } from "components/slider/SliderThumbWithTooltip";

interface AfterClassCanvasRef {
  exportAfterClass: () => void;
  shareImage: () => void;
}
export default function AfterClass() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const childRef = useRef<AfterClassCanvasRef>(null);

  const schema = yup
    .object()
    .shape({
      teacher: yup.string().required("Đây là trường thông tin bắt buộc !"),
      date: yup.string().required("Đây là trường thông tin bắt buộc !"),
      progress: yup.number().required("Đây là trường thông tin bắt buộc !"),
      comments: yup.array(),
      knowledge: yup.string().required("Đây là trường thông tin bắt buộc !"),
      next_lecture: yup.string().required("Đây là trường thông tin bắt buộc !"),
    })
    .required();
  const { handleSubmit, control, getValues, watch } = useForm<IFormAfterClass>({
    defaultValues: {
      teacher: undefined,
      date: undefined,
      comments: undefined,
      knowledge: undefined,
      next_lecture: undefined,
      progress: undefined,
    },
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "comments",
  });

  useEffect(() => {
    append({
      student: undefined,
      comment: undefined,
      result: undefined,
    });
  }, []);

  const onSubmit = async (values: any) => {
    onOpen();
  };

  const handleButtonClick = () => {
    if (childRef.current) {
      childRef.current.exportAfterClass();
    }
  };

  const handleShareImage = () => {
    if (childRef.current) {
      childRef.current.shareImage();
    }
  };

  console.log(watch("progress"))
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem colSpan={{ base: 2, "2xl": 2 }} w="100%">
          <form onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid columns={{ base: 1, "2xl": 2 }} spacing={4}>
              <Card variant="elevated" className="p-4 pb-6">
                <Heading size="md" mb={3}>
                  Thông tin chung
                </Heading>
                <SimpleGrid columns={{ base: 1, xl: 2, "2xl": 1 }} spacing={2}>
                  <Controller
                    control={control}
                    name="teacher"
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
                    name="date"
                    render={({ field: { ref, ...restField }, fieldState }) => (
                      <FormControl isRequired isInvalid={!!fieldState?.error}>
                        <FormLabel>Ngày dạy</FormLabel>
                        <Input
                          type={"date"}
                          {...restField}
                          placeholder="Chọn ngày ..."
                        />
                        <FormErrorMessage>
                          {fieldState?.error?.message}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  />
                  <Controller
                    control={control}
                    name="knowledge"
                    render={({ field: { ref, ...restField }, fieldState }) => {
                      return (
                        <FormControl isRequired isInvalid={!!fieldState?.error}>
                          <FormLabel>Kiến thức đạt được</FormLabel>
                          <Input {...restField} placeholder="Nhập..." />
                          <FormErrorMessage>
                            {fieldState?.error?.message}
                          </FormErrorMessage>
                        </FormControl>
                      );
                    }}
                  />
                  <Controller
                    control={control}
                    name="next_lecture"
                    render={({ field: { ref, ...restField }, fieldState }) => {
                      return (
                        <FormControl isRequired isInvalid={!!fieldState?.error}>
                          <FormLabel>Bài học tiếp theo</FormLabel>
                          <Input {...restField} placeholder="Nhập..." />
                          <FormErrorMessage>
                            {fieldState?.error?.message}
                          </FormErrorMessage>
                        </FormControl>
                      );
                    }}
                  />
                  <Controller
                    control={control}
                    name="progress"
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
                </SimpleGrid>
              </Card>

              {/* Nhan xet */}
              <Card variant="elevated" className="p-4">
                <Heading size="md" mb={3}>
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
                      <GridItem colSpan={{ base: 24, xl: 7 }}>
                        <Controller
                          control={control}
                          name={`comments.${index}.student`}
                          render={({
                            field: { ref, ...restField },
                            fieldState,
                          }) => {
                            return (
                              <FormControl isInvalid={!!fieldState?.error}>
                                <FormLabel>
                                  Học sinh {`(${index + 1})`}
                                </FormLabel>
                                <Input
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
                      <GridItem colSpan={{ base: 24, xl: 7 }}>
                        <Controller
                          control={control}
                          name={`comments.${index}.comment`}
                          render={({
                            field: { ref, ...restField },
                            fieldState,
                          }) => {
                            return (
                              <FormControl isInvalid={!!fieldState?.error}>
                                <FormLabel htmlFor="teacher">
                                  Nhận xét buổi học
                                </FormLabel>
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
                      <GridItem colSpan={{ base: 24, xl: 7 }}>
                        <Controller
                          control={control}
                          name={`comments.${index}.result`}
                          render={({
                            field: { ref, ...restField },
                            fieldState,
                          }) => {
                            return (
                              <FormControl isInvalid={!!fieldState?.error}>
                                <FormLabel>Kết quả học tập</FormLabel>
                                <Input
                                  backgroundColor={"white"}
                                  {...restField}
                                  placeholder="Nhập tên ..."
                                />
                                <FormErrorMessage>
                                  {fieldState?.error?.message}
                                </FormErrorMessage>
                              </FormControl>
                            );
                          }}
                        />
                      </GridItem>
                      <GridItem
                        className="flex items-end justify-center"
                        colSpan={{ base: 24, xl: 3 }}
                      >
                        <Button
                          className="bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                          w={"100%"}
                          onClick={() => remove(index)}
                          // rightIcon={}
                        >
                          Xoá
                          <MdDeleteOutline fontWeight={"medium"} />
                        </Button>
                      </GridItem>
                    </Grid>
                  );
                })}

                <Button
                  variant="ghost"
                  rightIcon={<MdOutlineNoteAdd />}
                  w={{ base: "100%", xl: "160px" }}
                  colorScheme="blue"
                  onClick={() => {
                    append({
                      student: undefined,
                      comment: undefined,
                      result: undefined,
                    });
                  }}
                >
                  Thêm học sinh
                </Button>
              </Card>
            </SimpleGrid>
            <Button mt={4} variant="brand" type="submit">
              Tạo after class
            </Button>
            <Button onClick={onOpen} mt={4} ml={4} colorScheme="facebook">
              Open
            </Button>
          </form>
        </GridItem>
        {/* img after class */}
      </Grid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay p={4} />
        <ModalContent p={4} minWidth={"80%"}>
          <ModalHeader paddingBottom={0}>Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AfterClassCanvas
              data={getValues()}
              onClose={onClose}
              ref={childRef}
            ></AfterClassCanvas>
          </ModalBody>
          <ModalFooter>
            <Button mx={3} variant="brandOutline" onClick={handleShareImage}>
              Chia sẻ
            </Button>
            <Button onClick={handleButtonClick} variant="brand">
              Tải ảnh xuống
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
