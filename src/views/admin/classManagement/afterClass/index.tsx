// Chakra imports
import {
  Box,
  Grid,
  GridItem,
  Heading,
  StackDivider,
  Text,
  Stack,
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
import MiniCalendar from "components/calendar/MiniCalendar";

export default function AfterClass() {
  const schema = yup.object({
    name: yup.string().required("heloo"),
  });
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
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
                name="name"
                render={({ field: { ref, ...restField }, fieldState }) => {
                  return (
                    <FormControl isInvalid={!!fieldState?.error}>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Input {...restField} id="name" placeholder="name" />
                      <FormErrorMessage>
                        {fieldState?.error?.message}
                      </FormErrorMessage>
                    </FormControl>
                  );
                }}
              />
              <MiniCalendar h="100%" minW="100%" selectRange={false} />

              <Button mt={4} colorScheme="teal" type="submit">
                Submit
              </Button>
            </form>
          </Card>
        </GridItem>
        <GridItem w="100%" bg="blue.500">
          sdsdsdsdsd
        </GridItem>
      </Grid>
    </Box>
  );
}
