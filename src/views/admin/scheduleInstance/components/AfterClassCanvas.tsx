import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  Image,
  Flex,
  Spacer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
} from "@chakra-ui/react";
import { toBlob, toPng } from "html-to-image";
import kienThucImg from "assets/img/classManage/kienthuc.png";
import baiHocImg from "assets/img/classManage/baihoctiep.png";
import logoITS from "assets/img/layout/logoITS.png";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { MdFacebook, MdPhone, MdPublic } from "react-icons/md";
import Card from "components/card/Card";
import {
  IAfterClass,
  IFormAfterClass,
} from "types/class-management/after-class.type";
import { toast } from "react-toastify";
import dayjs from "dayjs";

interface IPropsAfterClassCanvas {
  data: IAfterClass;
  onClose: () => void;
}
interface AfterClassCanvasRef {
  exportAfterClass: () => void;
  shareImage: () => void;
}
export const AfterClassCanvas = forwardRef<
  AfterClassCanvasRef,
  IPropsAfterClassCanvas
>(({ data, onClose }, ref) => {
  const afrerClassRef = useRef(null);
  const exportDivAsPng = () => {
    const div = afrerClassRef.current;
    toPng(div, { cacheBust: true, quality: 1 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "after-class.png";
        link.href = dataUrl;
        link.click();
        onClose();
        toast.success("Tải after-class thành công");
      })
      .catch((err) => {
        toast.error("Tải after-class thất bại");
        onClose();
      });
  };

  const handleShareImage = () => {
    const div = afrerClassRef.current;
    toBlob(div)
      .then(async (blob) => {
        const shareData = {
          files: [
            new File([blob], "afterClass.png", {
              type: "image/png",
            }),
          ],
          title: "Gửi After Class",
          text: "images",
        };
        const isCanShare = navigator?.canShare(shareData);
        if (isCanShare) {
          await navigator.share(shareData);
        } else toast.error("Trình duyệt của bạn không hỗ trợ chức năng này");
      })
      .catch((err) => {
        toast.error("Trình duyệt của bạn không hỗ trợ chức năng này");
      });
  };

  useImperativeHandle(ref, () => ({
    exportAfterClass() {
      exportDivAsPng();
    },
    shareImage() {
      handleShareImage();
    },
  }));

  // downloadImage(afrerClassRef.current);
  return (
    <Box overflow={{ base: "scroll", xl: "hidden" }}>
      <Card
        borderRadius={0}
        ref={afrerClassRef}
        minWidth={{ base: "1024px", xl: "100%" }}
      >
        {/* heading */}
        <Flex alignItems="center" h={"50px"}>
          <Image h="56px" w="100px" src={logoITS} />
          <Spacer />
          <Heading
            size={"lg"}
            fontSize={{ base: "24px", md: "40px", lg: "24px" }}
          >
            After Class
          </Heading>
          <Spacer />
          <Box>
            <Text>
              Date: <span className="font-bold">{data.date}</span>
            </Text>
            <Text>
              Teacher: <span className="font-bold">{data.teacherName}</span>
            </Text>
          </Box>
        </Flex>
        <Grid mt={4} templateColumns="repeat(4, 1fr)" gap={4}>
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
                  <Image h="60px" w="60px" src={kienThucImg} />
                  <Box ml={4}>
                    <Heading as="h4" size="md">
                      Kiến Thức Đạt Được
                    </Heading>
                    <Text>{data.currentLesson}</Text>
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
                  <Image h="60px" w="60px" src={baiHocImg} />
                  <Box ml={4}>
                    <Heading as="h4" size="md">
                      Bài Học Tiếp Theo
                    </Heading>
                    <Text>{data.nextLesson}</Text>
                  </Box>
                </Flex>
              </GridItem>
            </Grid>

            {/* Table */}
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th
                    color={"white"}
                    width={"20%"}
                    textAlign="center"
                    backgroundColor={"red.400"}
                  >
                    Học Sinh
                  </Th>
                  <Th
                    color={"white"}
                    width={"25%"}
                    textAlign="center"
                    backgroundColor={"green.400"}
                  >
                    Nhận xét buổi học
                  </Th>
                  <Th
                    color={"white"}
                    width={"25%"}
                    textAlign="center"
                    backgroundColor={"green.900"}
                  >
                    Kết quả học tập
                  </Th>
                  <Th
                    color={"white"}
                    width={"30%"}
                    textAlign="center"
                    backgroundColor={"orange.400"}
                  >
                    Tiến độ hoàn thành
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.studentProgress.map((studentProgress, index) => {
                  return (
                    <Tr key={index}>
                      <Td>
                        <p>{studentProgress.studentName}</p>
                      </Td>
                      <Td>
                        <p>
                          {studentProgress.status === "disable" ? (
                            <span className="text-red-400">Nghỉ học</span>
                          ) : (
                            studentProgress.teacherReview
                          )}
                        </p>
                      </Td>
                      <Td>
                        <p>
                          {studentProgress.status !== "disable" &&
                            studentProgress.result}
                        </p>
                      </Td>
                      <Td>
                        {/* <Text
                          fontWeight={"bold"}
                        >{`${studentProgress.processPercent} %`}</Text> */}
                        <div className="w-full p-1 bg-[#efe6da] rounded-full flex flex-col-reverse shadow-2xl border border-dotted border-[#eacea9]">
                          <Box
                            height={`80%`}
                            className="bg-[#f59010] w-full rounded-full"
                          ></Box>
                        </div>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </GridItem>
          {/* <GridItem
            w="100%"
            minHeight={"300px"}
            className="flex items-center flex-col "
          >
            <Text fontWeight={"bold"}>{`${data.averageScoreProgress} %`}</Text>
            <div className="w-12 p-1 h-full bg-[#efe6da] rounded-full flex flex-col-reverse shadow-2xl border border-dotted border-[#eacea9]">
              <Box
                height={`${data.averageScoreProgress}%`}
                className="bg-[#f59010] w-full rounded-full"
              ></Box>
            </div>
            <Text color={"#f59010"} fontWeight={"bold"}>
              Tiến độ hoàn thành lộ trình
            </Text>
          </GridItem> */}
        </Grid>
        {/* Footer */}
        <Grid mt={7} templateColumns="repeat(3, 1fr)">
          <Flex alignItems={"center"} className="h-6 ">
            <MdPhone fontSize={"24px"} />
            <Text className="" ml={2}>
              0986884289
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
