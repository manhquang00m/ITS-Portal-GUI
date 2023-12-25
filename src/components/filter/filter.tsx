import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  SimpleGrid,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Flex,
  Button,
} from "@chakra-ui/react";
import SelectRemote from "components/fields/SelectRemote";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { IFilter } from "./types";

export default function Filter({
  rightButton,
  searchParams,
  filterItems,
  handleSearch,
  initialValue,
}: IFilter) {
  const { handleSubmit, control, getValues, reset } = useForm({
    defaultValues: searchParams,
  });
  const onSubmit = (values: any) => {
    handleSearch(values);
  };

  const clearFilter = () => {
    reset(initialValue);
    handleSearch(getValues());
  };

  const renderFilterList = useMemo(
    () =>
      filterItems.map((item, index) => {
        return (
          <Controller
            key={index}
            control={control}
            name={item?.controlName}
            render={({ field: { ref, ...restField }, fieldState }) => (
              <FormControl isInvalid={!!fieldState?.error}>
                <FormLabel>{item?.label}</FormLabel>
                {item?.type === "inputText" && (
                  <Input {...restField} placeholder={item?.placeHolder} />
                )}
                {item?.type === "selectRemote" && (
                  <SelectRemote
                    getOptions={item?.getOptions}
                    placeholder={item?.placeHolder}
                    value={restField?.value}
                    onChange={restField?.onChange}
                  />
                )}
                <FormErrorMessage>
                  {fieldState?.error?.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
        );
      }),
    []
  );

  return (
    <Accordion allowToggle>
      <AccordionItem border={0} backgroundColor={"white"} borderRadius={"12px"}>
        <AccordionButton _focus={{ outline: "none" }} borderTopRadius={"12px"}>
          <Box fontWeight={"bold"} as="span" flex="1" textAlign="left">
            Bộ Lọc
          </Box>
          {rightButton}
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4} borderTop={"1px"} borderColor={"#e9e9e9"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid columns={{ base: 1, xl: 3, "2xl": 4 }} spacing={4}>
              {renderFilterList}
            </SimpleGrid>
            <Flex mt={"12px"} justifyContent={"end"}>
              <Button variant={"outline"} onClick={clearFilter}>
                Xóa lựa chọn
              </Button>
              <Button ml={"8px"} variant={"brandOutline"} type="submit">
                Tìm kiếm
              </Button>
            </Flex>
          </form>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
