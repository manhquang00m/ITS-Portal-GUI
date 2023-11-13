import { useMutation, useQuery } from "@tanstack/react-query";
import { createTeacher, editTeacher, getDetailTeacher, getTeachers } from "api/teacher.api";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { IFilterTeacher, IFormTeacher } from "types/class-management/teacher.type";


export const useGetTeachers = (params: IFilterTeacher) => {
    return useQuery({
        queryKey: ['teacher', params],
        queryFn: async () => {
            try {
                return await getTeachers(params)
            } catch (error) { }
        },
        refetchOnWindowFocus: false,
        retry: 2,
    });
}

export const useCreateTeacher = () => {
    const history = useHistory()
    return useMutation({
        mutationFn: async (payload: IFormTeacher) => {
            return await createTeacher(payload)
        },
        onSuccess() {
            history?.push(`/admin/class/teacher`)
            toast.success("Dữ liệu của bạn đã được lưu");
        },
        onError() {
            toast.error("Lỗi hệ thống");
        },
    })
}

export const useEditTeacher = (id: string) => {
    const history = useHistory()
    return useMutation({
        mutationFn: async (payload: IFormTeacher) => {
            return await editTeacher(payload, id)
        },
        onSuccess() {
            history?.push(`/admin/class/teacher`)
            toast.success("Dữ liệu của bạn đã được cập nhật");
        },
        onError() {
            toast.error("Lỗi hệ thống");
        },
    })
}

export const useGetDetailTeacher = (id: string, enabled?: boolean) => {
    return useQuery({
        queryKey: ['detail-teacher', id],
        queryFn: async () => {
            try {
                return await getDetailTeacher(id)
            } catch (error) { }
        },
        refetchOnWindowFocus: false,
        enabled: enabled
    });
}