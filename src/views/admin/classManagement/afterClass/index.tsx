// Chakra imports
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  Image,
  Flex,
  Spacer,
  Progress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Center,
  SimpleGrid,
  Stack,
  StackDivider,
  Divider,
} from "@chakra-ui/react";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import Card from "components/card/Card";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import html2canvas from "html2canvas";

import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import kienThucImg from "assets/img/classManage/kienthuc.png";
import baiHocImg from "assets/img/classManage/baihoctiep.png";
import logoITS from "assets/img/layout/logoITS.png";
import { toPng } from 'html-to-image';


import { useEffect, useRef } from "react";
import { MdDeleteOutline, MdOutlineNoteAdd, MdPhone, MdPublic } from "react-icons/md";
export default function AfterClass() {
  const schema = yup.object({
    teacher: yup.string().required("Đây là trường hợp bắt buộc !"),
    date: yup.string(),
    comments: yup.array()
  });
  const { handleSubmit, control } = useForm({
    defaultValues: {
      teacher: undefined,
      date: undefined,
    },
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "comments"
  });

  useEffect(() => {
    append({
      student: undefined,
      comment: undefined,
      result: undefined
    })
  }, [])

  const onSubmit = async (values: any) => {
    console.log("Form: ", values);
  };
  const afrerClassRef = useRef(null);
  const exportDivAsPng = () => {
    const div = afrerClassRef.current;

    toPng(div, { cacheBust: true, })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'my-image-name.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem colSpan={{ base: 2, "2xl": 2 }} w="100%">
          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <SimpleGrid columns={{ base: 1, "2xl": 2 }} spacing={4}>
                <Card variant="elevated" className="p-3 border">
                  <Heading size='md' mb={3}>Thông tin chung</Heading>
                  <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={2}>
                    <Controller
                      control={control}
                      name="teacher"
                      render={({ field: { ref, ...restField }, fieldState }) => {
                        return (
                          <FormControl isInvalid={!!fieldState?.error}>
                            <FormLabel >Tên giáo viên</FormLabel>
                            <Input {...restField} placeholder="Nhập tên ..." />
                            <FormErrorMessage>
                              {fieldState?.error?.message}
                            </FormErrorMessage>
                          </FormControl>
                        );
                      }}
                    />
                    <Controller
                      control={control}
                      name="date"
                      render={({ field: { ref, ...restField }, fieldState }) => {
                        return (
                          <FormControl isInvalid={!!fieldState?.error}>
                            <FormLabel>Ngày dạy</FormLabel>
                            <Input type={'date'} {...restField} placeholder="Chọn ngày ..." />
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
                <Card variant="elevated" className="p-3 border">
                  <Heading size='md' mb={3}>Nhận xét học sinh</Heading>
                  {/* reder list comments */}
                  {fields.map((item, index) => {
                    return <Grid key={item.id} className="bg-[#f8f8f8] p-2 rounded-md mb-4" templateColumns='repeat(24, 1fr)' gap={2}>
                      <GridItem colSpan={{ base: 24, xl: 7 }}>
                        <Controller
                          control={control}
                          name={`comments.${index}.student`}
                          render={({ field: { ref, ...restField }, fieldState }) => {
                            return (
                              <FormControl isInvalid={!!fieldState?.error}>
                                <FormLabel >Học sinh {`(${index + 1})`}</FormLabel>
                                <Input backgroundColor={"white"} {...restField} placeholder="Nhập tên học sinh ..." />
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
                          name="teacher"
                          render={({ field: { ref, ...restField }, fieldState }) => {
                            return (
                              <FormControl isInvalid={!!fieldState?.error}>
                                <FormLabel htmlFor="teacher">Nhận xét buổi học</FormLabel>
                                <Input backgroundColor={"white"} {...restField} placeholder="Nhập nhận xét ..." />
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
                          name="teacher"
                          render={({ field: { ref, ...restField }, fieldState }) => {
                            return (
                              <FormControl isInvalid={!!fieldState?.error}>
                                <FormLabel htmlFor="teacher">Kết quả học tập</FormLabel>
                                <Input backgroundColor={"white"} {...restField} placeholder="Nhập tên ..." />
                                <FormErrorMessage>
                                  {fieldState?.error?.message}
                                </FormErrorMessage>
                              </FormControl>
                            );
                          }}
                        />
                      </GridItem>
                      <GridItem className="flex items-end justify-center" colSpan={{ base: 24, xl: 3 }}>
                        <Button className="bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white" w={"100%"} onClick={() => remove(index)} rightIcon={<MdDeleteOutline />}>
                          Xóa
                        </Button>
                      </GridItem>
                    </Grid>
                  })}

                  <Button variant="outline" rightIcon={<MdOutlineNoteAdd />} w={{ base: "100%", xl: "160px" }} mt={2} colorScheme="blue" onClick={() => {
                    append({
                      student: undefined,
                      comment: undefined,
                      result: undefined
                    })
                  }}>
                    Thêm học sinh
                  </Button>
                </Card>
              </SimpleGrid>
              <Button mt={4} colorScheme="teal" type="submit">
                Submit
              </Button>
              <Button
                onClick={exportDivAsPng}
                mt={4}
                ml={4}
                colorScheme="facebook"
              >
                Download Image
              </Button>
            </form>
          </Card>
        </GridItem>

        {/* img after class */}
        <GridItem overflow={{ base: 'scroll', xl: "hidden" }} colSpan={{ base: 2, "2xl": 2 }} >
          <Card ref={afrerClassRef} minWidth={{ base: "1024px", "2xl": "100%" }}>
            {/* heading */}
            <Flex alignItems="center" h={"50px"}>
              <Image h="40px" w="130px" src={logoITS} alt="logo" />
              <Spacer />
              <Heading
                size={"lg"}
                fontSize={{ base: "24px", md: "40px", lg: "24px" }}
              >
                After Class
              </Heading>
              <Spacer />
              <Box>
                <Text>Date: 02/12/2023</Text>
                <Text>Teacher: Vu Manh Quang</Text>
              </Box>
            </Flex>
            <Grid mt={4} templateColumns="repeat(5, 1fr)" gap={4}>
              <GridItem colSpan={4} w="100%">
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <GridItem w="100%">
                    <Flex
                      minHeight={"100%"}
                      alignItems={"start"}
                      bg="#f4f4f4"
                      p={3}
                      borderTopRadius={"xl"}
                    >
                      <Image h="60px" w="60px" src={kienThucImg} alt="logo" />
                      <Box ml={4}>
                        <Heading as="h4" size="md">
                          Kiến Thức Đạt Được
                        </Heading>
                        <Text>
                          Khái niệm về Class, lập trình hướng đối tượng,lập
                          trình hướng đối tượng
                        </Text>
                      </Box>
                    </Flex>
                  </GridItem>
                  <GridItem w="100%">
                    <Flex
                      minHeight={"100%"}
                      alignItems={"start"}
                      bg="#f4f4f4"
                      p={3}
                      borderTopRadius={"xl"}
                    >
                      <Image h="60px" w="60px" src={baiHocImg} alt="logo" />
                      <Box ml={4}>
                        <Heading as="h4" size="md">
                          Bài Học Tiếp Theo
                        </Heading>
                        <Text>Khái niệm về Class</Text>
                      </Box>
                    </Flex>
                  </GridItem>
                </Grid>

                {/* Table */}
                <TableContainer>
                  <Table variant="striped">
                    <Thead>
                      <Tr>
                        <Th
                          color={"white"}
                          textAlign="center"
                          backgroundColor={"red.400"}
                        >
                          Học Sinh
                        </Th>
                        <Th
                          color={"white"}
                          textAlign="center"
                          backgroundColor={"green.400"}
                        >
                          Nhận xét buổi học
                        </Th>
                        <Th
                          color={"white"}
                          textAlign="center"
                          backgroundColor={"green.900"}
                        >
                          Kết quả học tập
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>inches</Td>
                        <Td>millimetres (mm)</Td>
                        <Td>25.4</Td>
                      </Tr>
                      <Tr>
                        <Td>feet</Td>
                        <Td>centimetres (cm)</Td>
                        <Td>30.48</Td>
                      </Tr>
                      <Tr>
                        <Td>yards</Td>
                        <Td>metres (m)</Td>
                        <Td>0.91444</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </GridItem>
              <GridItem w="100%" className="flex items-center">
                <Progress
                  colorScheme={"orange"}
                  w="100%"
                  height="48px"
                  value={60}
                  className="-rotate-90"
                />
              </GridItem>
            </Grid>
            {/* Footer */}
            <Grid mt={4} templateColumns="repeat(3, 1fr)">
              <Box className="h-6 grid grid-cols-12">
                <MdPhone fontSize={"24px"} />
                <Text className=" col-span-10" ml={2}>0929424056</Text>
              </Box>
              <Center>
                <Box className="h-6 grid grid-cols-12">
                  <MdPublic fontSize={"24px"} />
                  <Text className=" col-span-10" ml={2}>www.its.edu.vn</Text>
                </Box>
              </Center>
              <Flex alignItems={"center"} className="h-6" justifyContent={"end"}>
                <MdPublic fontSize={"24px"} />
                <Text className="" ml={2}>ITS Academy Viet Nam</Text>
              </Flex>
            </Grid>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
}
