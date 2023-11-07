import { useQuery } from "@tanstack/react-query";
import { getTeachers } from "api/teacher.api";
import { IFilterTeacher } from "types/class-management/teacher.type";

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