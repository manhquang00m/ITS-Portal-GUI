import { Grid, GridItem, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import { IListItem } from "types/base/base-api.type"

export interface IPropsDisplayListItem {
    data: IListItem
}

export default function DisplayListItemDetail({ data }: IPropsDisplayListItem) {
    return (
        <Grid
            templateColumns="repeat(4, 1fr)"
            gap={4}
        >
            <GridItem colSpan={1}  >
                <Heading as="h3" size="lg">
                    {data?.heading}
                </Heading>
            </GridItem>
            <GridItem colSpan={3}  >
                <SimpleGrid columns={3} spacing={4}>
                    {
                        data?.list?.map((item) => {
                            return <>
                                <Stack spacing={2}>
                                    <Text fontWeight={"medium"} fontSize="lg">{item?.title}</Text>
                                    {
                                        typeof item?.title === 'string' || typeof item?.children === 'number' || !item?.children ? <Text fontSize="lg">{item?.children || '-'}</Text> : item?.children
                                    }
                                </Stack>
                            </>
                        })
                    }
                </SimpleGrid>
            </GridItem>
        </Grid>
    )
}
