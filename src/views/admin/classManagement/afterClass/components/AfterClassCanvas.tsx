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
  Alert,
  AlertIcon,
  Center,
} from "@chakra-ui/react";
import { toBlob, toPng } from "html-to-image";
import kienThucImg from "assets/img/classManage/kienthuc.png";
import baiHocImg from "assets/img/classManage/baihoctiep.png";
import logoITS from "assets/img/layout/logoITS.png";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { MdFacebook, MdPhone, MdPublic } from "react-icons/md";
import Card from "components/card/Card";
import { IFormAfterClass } from "types/class-management/after-class.type";
import { toast } from 'react-toastify';
import { async } from "q";

interface IPropsAfterClassCanvas {
  data: IFormAfterClass;
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
  //   console.log("Child", props?.data);
  const afrerClassRef = useRef(null);
  const exportDivAsPng = () => {
    const div = afrerClassRef.current;
    toPng(div, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "after-class.png";
        link.href = dataUrl;
        link.click();
        onClose();
        toast.success("Tải after-class thành công")
      })
      .catch((err) => {
        toast.error("Tải after-class thất bại")
        onClose();
      });
  };

  // const navigateShare = () => {

  // }

  const handleShareImage = () => {
    const div = afrerClassRef.current;
    toBlob(div).then(async (blob) => {
      const shareData = {
        files: [
          new File([blob], 'afterClass.png', {
            type: 'image/png',
          }),
        ],
        title: "Gửi After Class",
        text: "images",
      }
      if (navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else toast.error("Trình duyệt của bạn không hỗ trợ chức năng này")
    }).catch((err) => {
      console.error(err)
    })

  }

  useImperativeHandle(ref, () => ({
    exportAfterClass() {
      exportDivAsPng();
    },
    shareImage() {
      handleShareImage();
    }
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
            <Text>Date: {data.date}</Text>
            <Text>Teacher: {data.teacher}</Text>
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
                    <Text>{data.knowledge}</Text>
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
                    <Text>{data.next_lecture}</Text>
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
                    width={"40%"}
                    textAlign="center"
                    backgroundColor={"green.400"}
                  >
                    Nhận xét buổi học
                  </Th>
                  <Th
                    color={"white"}
                    width={"40%"}
                    textAlign="center"
                    backgroundColor={"green.900"}
                  >
                    Kết quả học tập
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.comments.map((comment, index) => {
                  return (
                    <Tr key={index}>
                      <Td>
                        <p>{comment.student}</p>
                      </Td>
                      <Td>
                        <p>{comment.comment}</p>
                      </Td>
                      <Td>
                        <p>{comment.result}</p>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
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
