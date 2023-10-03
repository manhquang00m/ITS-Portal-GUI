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
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Center,
} from "@chakra-ui/react";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import Card from "components/card/Card";
import { useForm, Controller } from "react-hook-form";
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

import { MdFacebook, MdPhone, MdPublic } from "react-icons/md";
import { useRef } from "react";

export default function AfterClass() {
  const schema = yup.object({
    teacher: yup.string().required("Đây là trường hợp bắt buộc !"),
  });
  const { handleSubmit, control } = useForm({
    defaultValues: {
      teacher: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: any) => {
    console.log("Form: ", values);
  };
  const afrerClassRef = useRef(null);
  const exportDivAsPng = () => {
    const div = afrerClassRef.current;
    html2canvas(div, {
      scale: 3,
    })
      .then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png", 1.0);
        link.download = "exported-image.png";
        link.click();
      })
      .catch((error) => {
        console.error("Error exporting div as PNG:", error);
      });
  };
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem colSpan={{ base: 2, "2xl": 1 }} w="100%">
          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                name="teacher"
                render={({ field: { ref, ...restField }, fieldState }) => {
                  return (
                    <FormControl isInvalid={!!fieldState?.error}>
                      <FormLabel htmlFor="teacher">Tên giáo viên</FormLabel>
                      <Input {...restField} placeholder="Nhập tên ..." />
                      <FormErrorMessage>
                        {fieldState?.error?.message}
                      </FormErrorMessage>
                    </FormControl>
                  );
                }}
              />
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
        <GridItem ref={afrerClassRef} colSpan={{ base: 2, "2xl": 1 }} w="100%">
          <Card>
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
                <span>
                  <MdPhone fontSize={"24px"} />
                </span>
                <Text className=" col-span-10" ml={2}>0929424056</Text>
              </Box>
              <Center>
                <Box className="h-6 grid grid-cols-12">
                  <span>
                    <MdPublic fontSize={"24px"} />
                  </span>
                  <Text className=" col-span-10" ml={2}>www.its.edu.vn</Text>
                </Box>
              </Center>
              <Box className="h-6 grid grid-cols-12" justifyContent={"end"}>
                <span>
                  <MdFacebook fontSize={"24px"} />
                </span>
                <Text className=" col-span-10" ml={2}>ITS Academy Viet Nam</Text>
              </Box>
            </Grid>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
}
