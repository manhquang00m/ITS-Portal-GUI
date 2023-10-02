// Chakra imports
import {
  Box,
  Grid,
  GridItem,
  Heading,
  StackDivider,
  Text,
  Stack,
  Image,
  Flex,
  Spacer,
  Progress,
} from "@chakra-ui/react";
// Custom components
import Banner from "views/admin/profile/components/Banner";
import General from "views/admin/profile/components/General";
import Notifications from "views/admin/profile/components/Notifications";
import Projects from "views/admin/profile/components/Projects";
import Storage from "views/admin/profile/components/Storage";
import Upload from "views/admin/profile/components/Upload";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import Card from "components/card/Card";
import { useForm, Controller } from "react-hook-form";

import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import kienThucImg from 'assets/img/classManage/kienthuc.png';
import baiHocImg from 'assets/img/classManage/baihoctiep.png';


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

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem w="100%">
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
            </form>
          </Card>
        </GridItem>
        <GridItem w="100%" >
          <Card>
            {/* heading */}
            <Flex alignItems='center' h={'50px'}>
              <Image h='40px' w='175px' src='https://cdn0257.cdn4s.com/media/logo-02%20(1)-01.png' alt='logo' />
              <Spacer />
              <Heading>After Class</Heading>
              <Spacer />
              <Box>
                <Text>Date: 02/12/2023</Text>
                <Text>Teacher: Vu Manh Quang</Text>
              </Box>
            </Flex>
            <Grid mt={4} templateColumns='repeat(5, 1fr)' gap={4}>
              <GridItem colSpan={4} w='100%' >
                <Grid templateColumns='repeat(2, 1fr)' gap={4}>
                  <GridItem w='100%' >
                    <Flex minHeight={'100%'} alignItems={'center'} bg='#f4f4f4' p={4} borderRadius={'xl'}>
                      <Image h='60px' w='60px' src={kienThucImg} alt='logo' />
                      <Box ml={4}>
                        <Heading as='h4' size='md'>
                          Kiến Thức Đạt Được
                        </Heading>
                        <Text>Khái niệm về Class, lập trình hướng đối tượng,lập trình hướng đối tượng</Text>
                      </Box>
                    </Flex>
                  </GridItem>
                  <GridItem w='100%' >
                    <Flex minHeight={'100%'} alignItems={'center'} bg='#f4f4f4' p={4} borderRadius={'xl'}>
                      <Image h='60px' w='60px' src={baiHocImg} alt='logo' />
                      <Box ml={4}>
                        <Heading as='h4' size='md'>
                          Bài Học Tiếp Theo
                        </Heading>
                        <Text>Khái niệm về Class</Text>
                      </Box>
                    </Flex>
                  </GridItem>
                </Grid>

                {/* Table */}

              </GridItem>
              <GridItem w='100%' className="flex items-center">
                <Progress w='100%' height='48px' value={60} className="-rotate-90" />
              </GridItem>
            </Grid>
            <Box>

            </Box>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
}
