import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { Table } from "antd";
import Filter from "components/filter/filter";
import DeleteModal from "components/modal/modalDelete/modalDelete";
import {
  useDeleteCost,
  useGetCosts,
} from "hook/query-finance/cost/use-get-cost";
import { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { IFilterCost } from "types/finance/cost.type";
import { clearParamsObject } from "utils/helper";
import { columns, filterItems } from "./config";

export function ListCost() {
  const [filter, setFilter] = useState<IFilterCost>({ page: 1, limit: 10, status: "active" });
  const { data, isLoading, refetch } = useGetCosts(filter);
  const history = useHistory();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const { mutateAsync: mutateDelete } = useDeleteCost();
  const [idDelete, setIdDelete] = useState(undefined);
  const handleDelete = async () => {
    await mutateDelete(idDelete, { onSuccess: () => refetch() });
  };
  const initialValue = {
    name: "",
    level: "",
    status: ""
  };
  const addCost = () => {
    history.push("/admin/finance/cost/create");
  };

  const onChangePagination = (page: number, pageSize: number) => {
    setFilter({
      ...filter,
      page: pageSize !== filter?.limit ? 1 : page,
      limit: pageSize,
    });
  };

  const handleSearch = (values: IFilterCost) => {
    const clearValues = clearParamsObject(values);
    setFilter({
      page: 1,
      limit: 10,
      ...clearValues,
    });
  };
  const rightButton = useMemo(
    () => (
      <Button onClick={addCost} float={"right"} variant="brand">
        Tạo chi phí
      </Button>
    ),
    [addCost]
  );

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "70px" }}>
      <Filter
        filterItems={filterItems}
        handleSearch={handleSearch}
        rightButton={rightButton}
        searchParams={filter}
        initialValue={initialValue}
      />
      <Table
        scroll={{ x: 800, y: 450 }}
        loading={isLoading}
        className="mt-2"
        columns={columns(setIdDelete,onOpenDelete)}
        dataSource={data?.data?.list}
        rowKey="teacherId"
        pagination={{
          pageSizeOptions: [5, 10, 20, 50],
          showSizeChanger: true,
          total: data?.data?.totalElements,
          onChange: onChangePagination,
          current: filter?.page,
          pageSize: filter?.limit,
        }}
      />
      <DeleteModal
        callback={handleDelete}
        id={idDelete}
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
      />
    </Box>
  );
}
