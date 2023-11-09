import { useMutation, useQuery } from "@tanstack/react-query";
import { createTeacher, getTeachers } from "api/teacher.api";
import { toast } from "react-toastify";
import { IFilterTeacher, IFormTeacher } from "types/class-management/teacher.type";

export const useGetTeachers = (params: IFilterTeacher) => {
    return useQuery({
        queryKey: ['teacher'],
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
    return useMutation({
        mutationFn: async (payload: IFormTeacher) => {
            return await createTeacher(payload)
        },
        onSuccess() {
            toast.success("Dữ liệu của bạn đã được lưu");
        },
    })
}