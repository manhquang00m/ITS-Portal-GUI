import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getClass,
  createClass,
  editClass,
  getDetailClass,
  deleteClass,
} from "api/manage-class.api";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { IFilterClass, IFormClass } from "types/class-management/class.type";

export const useGetClass = (params: IFilterClass) => {
  return useQuery({
    queryKey: ["class", params],
    queryFn: async () => {
      try {
        return await getClass(params);
      } catch (error) {}
    },
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

export const useCreateClass = () => {
  const history = useHistory();
  return useMutation({
    mutationFn: async (payload: IFormClass) => {
      return await createClass(payload);
    },
    onSuccess() {
      history?.push(`/admin/class/zoom`);
      toast.success("Dữ liệu của bạn đã được lưu");
    },
    onError() {
      toast.error("Lỗi hệ thống");
    },
  });
};

export const useEditClass = (id: string) => {
  const history = useHistory();
  return useMutation({
    mutationFn: async (payload: IFormClass) => {
      return await editClass(payload, id);
    },
    onSuccess() {
      history?.push(`/admin/class/zoom`);
      toast.success("Dữ liệu của bạn đã được cập nhật");
    },
    onError() {
      toast.error("Lỗi hệ thống");
    },
  });
};

export const useDeleteClass = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteClass(id);
    },
    onSuccess() {
      toast.success("Dữ liệu của bạn đã được xoá");
    },
    onError() {
      toast.error("Lỗi hệ thống");
    },
  });
};

export const useGetDetailClass = (id: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ["detail-class", id],
    queryFn: async () => {
      try {
        return await getDetailClass(id);
      } catch (error) {}
    },
    refetchOnWindowFocus: false,
    enabled: enabled,
  });
};
