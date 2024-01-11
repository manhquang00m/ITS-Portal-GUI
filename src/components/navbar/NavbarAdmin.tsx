/* eslint-disable */
// Chakra Imports
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useEffect, useMemo } from "react";
import AdminNavbarLinks from "components/navbar/NavbarLinksAdmin";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

export default function AdminNavbar(props: {
  secondary: boolean;
  message: string | boolean;
  brandText: string;
  fixed: boolean;
  breadCrumb: BreadcrumbType[];
  onOpen: (...args: any[]) => any;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", changeNavbar);

    return () => {
      window.removeEventListener("scroll", changeNavbar);
    };
  });

  const { secondary, brandText, breadCrumb } = props;

  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  let mainText = useColorModeValue("navy.700", "white");
  let secondaryText = useColorModeValue("gray.700", "white");
  let navbarPosition = "fixed" as const;
  let navbarFilter = "none";
  let navbarBackdrop = "blur(20px)";
  let navbarShadow = "none";
  let navbarBg = useColorModeValue(
    "rgba(244, 247, 254, 0.2)",
    "rgba(11,20,55,0.5)"
  );
  let navbarBorder = "transparent";
  let secondaryMargin = "0px";
  let paddingX = "15px";
  let gap = "0px";
  const changeNavbar = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const backLink: string = useMemo(() => {
    if (breadCrumb[0]?.secondary && breadCrumb?.length === 2) {
      return `/admin${breadCrumb[0].path}`;
    }
    if (!breadCrumb[0]?.secondary && breadCrumb?.length === 3) {
      return `/admin${breadCrumb[0].path}${breadCrumb[1].path}`;
    }
    return null;
  }, [breadCrumb]);
  return (
    <Box
      position={navbarPosition}
      boxShadow={navbarShadow}
      bg={navbarBg}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      backgroundPosition="center"
      backgroundSize="cover"
      borderRadius="16px"
      borderWidth="1.5px"
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: "center" }}
      display={secondary ? "block" : "flex"}
      minH="75px"
      justifyContent={{ xl: "center" }}
      lineHeight="25.6px"
      mx="auto"
      mt={secondaryMargin}
      pb="8px"
      right={{ base: "12px", md: "30px", lg: "20px" }}
      px={{
        sm: paddingX,
        md: "10px",
      }}
      pr={{
        xl: 0,
      }}
      ps={{
        xl: "12px",
      }}
      pt="8px"
      top={{ base: "12px", md: "16px", xl: "2px" }}
      w={{
        base: "calc(100vw - 6%)",
        md: "calc(100vw - 8%)",
        lg: "calc(100vw - 6%)",
        xl: "calc(100vw - 320px)",
      }}
    >
      <Flex
        w="100%"
        flexDirection={{
          sm: "column",
          md: "row",
        }}
        alignItems={{ xl: "center" }}
        mb={gap}
      >
        <Box mb={{ sm: "8px", md: "0px" }}>
          <Breadcrumb>
            {breadCrumb.map((item: BreadcrumbType, index: number) => {
              const to = breadCrumb
                .slice(0, index + 1)
                .map((crumb) => crumb.path)
                .join("/")
                .replace(/\/+/g, "/");
              console.log(item);
              return (
                <BreadcrumbItem fontSize="sm" key={index}>
                  <BreadcrumbLink
                    as={Link}
                    to={index !== 0 && `/admin${to}`}
                    color={secondaryText}
                  >
                    {item.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              );
            })}
          </Breadcrumb>
          {/* Here we create navbar brand, based on route name */}
          <Flex alignItems={"center"}>
            {backLink && (
              <ChakraLink marginRight={"4px"} as={ReactRouterLink} to={backLink} fontSize={"20px"}>
                <MdArrowBack />
              </ChakraLink>
            )}
            <Text
              color={mainText}
              bg="inherit"
              borderRadius="inherit"
              fontWeight="bold"
              fontSize="30px"
              _hover={{ color: { mainText } }}
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              {brandText}
            </Text>
          </Flex>
        </Box>
        <Box ms="auto" w={{ sm: "100%", md: "unset" }}>
          <AdminNavbarLinks
            onOpen={props.onOpen}
            secondary={props.secondary}
            fixed={props.fixed}
          />
        </Box>
      </Flex>
    </Box>
  );
}
