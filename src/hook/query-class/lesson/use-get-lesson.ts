import { useMutation, useQuery } from "@tanstack/react-query";
import { createLesson, editLesson, getDetailLesson, getLessons } from "api/lesson.api";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { IFilterLesson, IFormLesson } from "types/class-management/lesson.type";


export const useGetLessons = (params: IFilterLesson) => {
    return useQuery({
        queryKey: ['lesson', params],
        queryFn: async () => {
            try {
                return await getLessons(params)
            } catch (error) { }
        },
        refetchOnWindowFocus: false,
        retry: 2,
    });
}

export const useCreateLesson = () => {
    const history = useHistory()
    return useMutation({
        mutationFn: async (payload: IFormLesson) => {
            return await createLesson(payload)
        },
        onSuccess() {
            history?.push(`/admin/class/lesson`)
            toast.success("Dữ liệu của bạn đã được lưu");
        },
        onError() {
            toast.error("Lỗi hệ thống");
        },
    })
}

export const useEditLesson = (id: string) => {
    const history = useHistory()
    return useMutation({
        mutationFn: async (payload: IFormLesson) => {
            return await editLesson(payload, id)
        },
        onSuccess() {
            history?.push(`/admin/class/lesson`)
            toast.success("Dữ liệu của bạn đã được cập nhật");
        },
        onError() {
            toast.error("Lỗi hệ thống");
        },
    })
}

export const useGetDetailLesson = (id: string, enabled?: boolean) => {
    return useQuery({
        queryKey: ['detail-lesson', id],
        queryFn: async () => {
            try {
                return await getDetailLesson(id)
            } catch (error) { }
        },
        refetchOnWindowFocus: false,
        enabled: enabled
    });
}