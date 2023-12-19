import { useMutation, useQuery } from "@tanstack/react-query";
import { createStudent, editStudent, getDetailStudent, getStudents } from "api/student.api";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { IFilterStudent, IFormStudent } from "types/class-management/student.type";


export const useGetStudents = (params: IFilterStudent) => {
    return useQuery({
        queryKey: ['teacher', params],
        queryFn: async () => {
            try {
                return await getStudents(params)
            } catch (error) { }
        },
        refetchOnWindowFocus: false,
        retry: 2,
    });
}

export const useCreateStudent = () => {
    const history = useHistory()
    return useMutation({
        mutationFn: async (payload: IFormStudent) => {
            return await createStudent(payload)
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

export const useEditStudent = (id: string) => {
    const history = useHistory()
    return useMutation({
        mutationFn: async (payload: IFormStudent) => {
            return await editStudent(payload, id)
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

export const useGetDetailStudent = (id: string, enabled?: boolean) => {
    return useQuery({
        queryKey: ['detail-teacher', id],
        queryFn: async () => {
            try {
                return await getDetailStudent(id)
            } catch (error) { }
        },
        refetchOnWindowFocus: false,
        enabled: enabled
    });
}