import { useMutation, useQuery } from "@tanstack/react-query";
import { createScheduleConfig, deleteScheduleConfig, editScheduleConfig, getDetailScheduleConfig, getScheduleConfigs } from "api/schedule-config.api";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { IFilterScheduleConfig, IFormScheduleConfig } from "types/class-management/schedule-config.type";

export const useGetScheduleConfig = (params: IFilterScheduleConfig) => {
    return useQuery({
        queryKey: ['schedule-config-list', params],
        queryFn: async () => {
            try {
                return await getScheduleConfigs(params)
            } catch (error) { }
        },
        refetchOnWindowFocus: false,
        retry: 2,
    });
}

export const useCreateScheduleConfig = () => {
    const history = useHistory()
    return useMutation({
        mutationFn: async (payload: IFormScheduleConfig) => {
            return await createScheduleConfig(payload)
        },
        onSuccess() {
            history?.push(`/admin/class/schedule-config`)
            toast.success("Dữ liệu của bạn đã được lưu");
        },
        onError() {
            toast.error("Lỗi hệ thống");
        },
    })
}

export const useEditScheduleConfig = (id: string) => {
    const history = useHistory()
    return useMutation({
        mutationFn: async (payload: IFormScheduleConfig) => {
            return await editScheduleConfig(payload, id)
        },
        onSuccess() {
            history?.push(`/admin/class/schedule-config`)
            toast.success("Dữ liệu của bạn đã được cập nhật");
        },
        onError() {
            toast.error("Lỗi hệ thống");
        },
    })
}

export const useGetDetailScheduleConfig = (id: string, enabled?: boolean) => {
    return useQuery({
        queryKey: ['detail-schedule-config', id],
        queryFn: async () => {
            try {
                return await getDetailScheduleConfig(id)
            } catch (error) { }
        },
        refetchOnWindowFocus: false,
        enabled: enabled
    });
}

export const useDeleteScheduleConfig = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        return await deleteScheduleConfig(id);
      },
      onSuccess() {
        toast.success("Dữ liệu của bạn đã được xoá");
      },
      onError() {
        toast.error("Lỗi hệ thống");
      },
    });
  };