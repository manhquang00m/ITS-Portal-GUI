import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { MdEdit } from "react-icons/md";
import { useHistory } from "react-router-dom";

interface PropsDisplayHeadingDetail {
  id?: number;
  updated_at?: string;
  url_edit: string;
}

export default function DisplayHeadingDetail({
  id,
  updated_at,
  url_edit,
}: PropsDisplayHeadingDetail) {
  const history = useHistory();
  const linkToEdit = () => {
    history?.push(`${url_edit}`);
  };
  return (
    <Card
      variant="elevated"
      px={{ base: "16px", xl: "32px" }}
      className="py-10 mb-8"
      backgroundImage={"linear-gradient(to bottom, #7551FF,#3311DB)"}
    >
      <Flex>
        <Box w="500px">
          <Heading color={"white"} as="h2" fontSize={{ base: "24px" }}>
            Mã giảng viên #{id}
          </Heading>
          <Text
            marginTop={"8px"}
            fontSize={{ base: "md", xl: "lg" }}
            color={"white"}
          >
            Ngày cập nhật: {updated_at || "-"}
          </Text>
        </Box>
        <Spacer />
        <Center w="124px">
          <Button
            variant={"unstyled"}
            width={"160px"}
            onClick={linkToEdit}
            color={"white"}
            rightIcon={<MdEdit />}
            background={
              "linear-gradient(to top, rgb(250, 112, 154) 0%, rgb(254, 225, 64) 92.27%)"
            }
          >
            Chỉnh sửa
          </Button>
        </Center>
      </Flex>
    </Card>
  );
}
