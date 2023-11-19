import { useMutation, useQuery } from "@tanstack/react-query";
import { createScheduleInstance, editScheduleInstance, getDetailScheduleInstance, getScheduleInstances } from "api/schedule-config.api copy";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { IFilterScheduleInstance, IFormScheduleInstance } from "types/class-management/schedule-instance.type";

export const useGetScheduleInstance = (params: IFilterScheduleInstance) => {
    return useQuery({
        queryKey: ['schedule-instance-list', params],
        queryFn: async () => {
            try {
                return await getScheduleInstances(params)
            } catch (error) { }
        },
        refetchOnWindowFocus: false,
        retry: 2,
    });
}

export const useCreateScheduleInstance = () => {
    const history = useHistory()
    return useMutation({
        mutationFn: async (payload: IFormScheduleInstance) => {
            return await createScheduleInstance(payload)
        },
        onSuccess() {
            history?.push(`/admin/schedule-instance`)
            toast.success("Dữ liệu của bạn đã được lưu");
        },
        onError() {
            toast.error("Lỗi hệ thống");
        },
    })
}

export const useEditScheduleInstance = (id: string) => {
    const history = useHistory()
    return useMutation({
        mutationFn: async (payload: IFormScheduleInstance) => {
            return await editScheduleInstance(payload, id)
        },
        onSuccess() {
            history?.push(`/admin/schedule-instance`)
            toast.success("Dữ liệu của bạn đã được cập nhật");
        },
        onError() {
            toast.error("Lỗi hệ thống");
        },
    })
}

export const useGetDetailScheduleInstance = (id: string, enabled?: boolean) => {
    return useQuery({
        queryKey: ['detail-schedule-instance', id],
        queryFn: async () => {
            try {
                return await getDetailScheduleInstance(id)
            } catch (error) { }
        },
        refetchOnWindowFocus: false,
        enabled: enabled
    });
}