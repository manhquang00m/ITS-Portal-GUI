import { useMutation, useQuery } from "@tanstack/react-query";
import { createCourse, editCourse, getCourses, getDetailCourse } from "api/course.api";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { IFilterCourse, IFormCourse } from "types/class-management/course.type";

export const useGetCourse = (params: IFilterCourse) => {
    return useQuery({
        queryKey: ['Courses', params],
        queryFn: async () => {
            try {
                return await getCourses(params)
            } catch (error) { }
        },
        refetchOnWindowFocus: false,
        retry: 2,
    });
}

export const useCreateCourse = () => {
    const history = useHistory()
    return useMutation({
        mutationFn: async (payload: IFormCourse) => {
            return await createCourse(payload)
        },
        onSuccess() {
            history?.push(`/admin/class/course`)
            toast.success("Dữ liệu của bạn đã được lưu");
        },
        onError() {
            toast.error("Lỗi hệ thống");
        },
    })
}

export const useEditCourse = (id: string) => {
    const history = useHistory()
    return useMutation({
        mutationFn: async (payload: IFormCourse) => {
            return await editCourse(payload, id)
        },
        onSuccess() {
            history?.push(`/admin/class/course`)
            toast.success("Dữ liệu của bạn đã được cập nhật");
        },
        onError() {
            toast.error("Lỗi hệ thống");
        },
    })
}

export const useGetDetailCourse= (id: string, enabled?: boolean) => {
    return useQuery({
        queryKey: ['detail-course', id],
        queryFn: async () => {
            try {
                return await getDetailCourse(id)
            } catch (error) { }
        },
        refetchOnWindowFocus: false,
        enabled: enabled
    });
}