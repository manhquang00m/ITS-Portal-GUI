import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createDailyIncome,
  editDailyIncome,
  getDetailDailyIncome,
  getDailyIncomes,
  deleteDailyIncome,
} from "api/daily-income.api";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  IFilterDailyIncome,
  IFormDailyIncome,
} from "types/finance/daily-income.type";

export const useGetDailyIncomes = (params: IFilterDailyIncome) => {
  return useQuery({
    queryKey: ["daily", params],
    queryFn: async () => {
      try {
        return await getDailyIncomes(params);
      } catch (error) {}
    },
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

export const useCreateDailyIncome = () => {
  const history = useHistory();
  return useMutation({
    mutationFn: async (payload: IFormDailyIncome) => {
      return await createDailyIncome(payload);
    },
    onSuccess() {
      history?.push(`/admin/finance/daily`);
      toast.success("Dữ liệu của bạn đã được lưu");
    },
    onError() {
      toast.error("Lỗi hệ thống");
    },
  });
};

export const useEditDailyIncome = (id: string) => {
  const history = useHistory();
  return useMutation({
    mutationFn: async (payload: IFormDailyIncome) => {
      return await editDailyIncome(payload, id);
    },
    onSuccess() {
      history?.push(`/admin/finance/daily`);
      toast.success("Dữ liệu của bạn đã được cập nhật");
    },
    onError() {
      toast.error("Lỗi hệ thống");
    },
  });
};

export const useGetDetailDailyIncome = (id: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ["detail-daily", id],
    queryFn: async () => {
      try {
        return await getDetailDailyIncome(id);
      } catch (error) {}
    },
    refetchOnWindowFocus: false,
    enabled: enabled,
  });
};

export const useDeleteDailyIncome = () => {
  const history = useHistory();
  return useMutation({
    mutationFn: async (id: number) => {
      return await deleteDailyIncome(id);
    },
    onSuccess() {
      history?.push(`/admin/finance/daily`);
      toast.success("Dữ liệu của bạn đã được xoá");
    },
    onError() {
      toast.error("Lỗi hệ thống");
    },
  });
};
