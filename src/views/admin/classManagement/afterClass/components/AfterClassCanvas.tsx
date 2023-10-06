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
  TableContainer,
  Center,
} from "@chakra-ui/react";
import { toPng } from "html-to-image";
import kienThucImg from "assets/img/classManage/kienthuc.png";
import baiHocImg from "assets/img/classManage/baihoctiep.png";
import logoITS from "assets/img/layout/logoITS.png";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { MdFacebook, MdPhone, MdPublic } from "react-icons/md";
import Card from "components/card/Card";
import { IFormAfterClass } from "types/class-management/after-class.type";

interface IPropsAfterClassCanvas {
  data: IFormAfterClass;
}
interface AfterClassCanvasRef {
  exportAfterClass: () => void;
}
export const AfterClassCanvas = forwardRef<
  AfterClassCanvasRef,
  IPropsAfterClassCanvas
>((props, ref) => {
  //   console.log("Child", props?.data);
  console.log("Child", props.data);
  const afrerClassRef = useRef(null);

  const exportDivAsPng = () => {
    const div = afrerClassRef.current;
    toPng(div, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useImperativeHandle(ref, () => ({
    exportAfterClass() {
      exportDivAsPng();
    },
  }));
  // downloadImage(afrerClassRef.current);
  return (
    <Box overflow={{ base: "scroll", xl: "hidden" }}>
      <Card
        borderRadius={0}
        ref={afrerClassRef}
        minWidth={{ base: "1024px", "2xl": "100%" }}
      >
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
                      Khái niệm về Class, lập trình hướng đối tượng,lập trình
                      hướng đối tượng
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
        <Grid mt={7} templateColumns="repeat(3, 1fr)">
          <Flex alignItems={"center"} className="h-6 ">
            <MdPhone fontSize={"24px"} />
            <Text className="" ml={2}>
              0929424056
            </Text>
          </Flex>
          <Center>
            <Flex alignItems={"center"} className="h-6 ">
              <MdPublic fontSize={"24px"} />
              <Text className="" ml={2}>
                www.its.edu.vn
              </Text>
            </Flex>
          </Center>
          <Flex alignItems={"center"} className="h-6" justifyContent={"end"}>
            <MdFacebook fontSize={"24px"} />
            <Text className="" ml={2}>
              ITS Academy Viet Nam
            </Text>
          </Flex>
        </Grid>
      </Card>
    </Box>
  );
});
