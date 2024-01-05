import { useMutation, useQuery } from "@tanstack/react-query";
import { createCost, editCost, getDetailCost, getCosts, deleteCost } from "api/cost.api";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { IFilterCost, IFormCost } from "types/finance/cost.type";

export const useGetCosts = (params: IFilterCost) => {
  return useQuery({
    queryKey: ["cost", params],
    queryFn: async () => {
      try {
        return await getCosts(params);
      } catch (error) { }
    },
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

export const useCreateCost = () => {
  const history = useHistory();
  return useMutation({
    mutationFn: async (payload: IFormCost) => {
      return await createCost(payload);
    },
    onSuccess() {
      history?.push(`/admin/finance/cost`);
      toast.success("Dữ liệu của bạn đã được lưu");
    },
    onError() {
      toast.error("Lỗi hệ thống");
    },
  });
};

export const useEditCost = (id: string) => {
  const history = useHistory();
  return useMutation({
    mutationFn: async (payload: IFormCost) => {
      return await editCost(payload, id);
    },
    onSuccess() {
      history?.push(`/admin/finance/cost`);
      toast.success("Dữ liệu của bạn đã được cập nhật");
    },
    onError() {
      toast.error("Lỗi hệ thống");
    },
  });
};

export const useGetDetailCost = (id: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ["detail-cost", id],
    queryFn: async () => {
      try {
        return await getDetailCost(id);
      } catch (error) { }
    },
    refetchOnWindowFocus: false,
    enabled: enabled,
  });
};

export const useDeleteCost = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteCost(id);
    },
    onSuccess() {
      toast.success("Dữ liệu của bạn đã được xoá");
    },
    onError() {
      toast.error("Lỗi hệ thống");
    },
  });
};