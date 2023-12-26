import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createMonthlyIncome,
  editMonthlyIncome,
  getDetailMonthlyIncome,
  getMonthlyIncomes,
  deleteMonthlyIncome,
} from "api/monthly-income.api";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  IFilterMonthlyIncome,
  IFormMonthlyIncome,
} from "types/finance/monthly-income.type";

export const useGetMonthlyIncomes = (params: IFilterMonthlyIncome) => {
  return useQuery({
    queryKey: ["monthly", params],
    queryFn: async () => {
      try {
        return await getMonthlyIncomes(params);
      } catch (error) {}
    },
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

export const useCreateMonthlyIncome = () => {
  const history = useHistory();
  return useMutation({
    mutationFn: async (payload: IFormMonthlyIncome) => {
      return await createMonthlyIncome(payload);
    },
    onSuccess() {
      history?.push(`/admin/finance/monthly`);
      toast.success("Dữ liệu của bạn đã được lưu");
    },
    onError() {
      toast.error("Lỗi hệ thống");
    },
  });
};

export const useEditMonthlyIncome = (id: string) => {
  const history = useHistory();
  return useMutation({
    mutationFn: async (payload: IFormMonthlyIncome) => {
      return await editMonthlyIncome(payload, id);
    },
    onSuccess() {
      history?.push(`/admin/finance/monthly`);
      toast.success("Dữ liệu của bạn đã được cập nhật");
    },
    onError() {
      toast.error("Lỗi hệ thống");
    },
  });
};

export const useGetDetailMonthlyIncome = (id: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ["detail-monthly", id],
    queryFn: async () => {
      try {
        return await getDetailMonthlyIncome(id);
      } catch (error) {}
    },
    refetchOnWindowFocus: false,
    enabled: enabled,
  });
};

export const useDeleteMonthlyIncome = () => {
  const history = useHistory();
  return useMutation({
    mutationFn: async (id: number) => {
      return await deleteMonthlyIncome(id);
    },
    onSuccess() {
      history?.push(`/admin/finance/monthly`);
      toast.success("Dữ liệu của bạn đã được xoá");
    },
    onError() {
      toast.error("Lỗi hệ thống");
    },
  });
};
