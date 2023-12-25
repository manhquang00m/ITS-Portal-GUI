import { useGetClass } from "hook/query-class/class/use-query-class";
import { useGetCourse } from "hook/query-class/course/use-query-course";
import { useGetScheduleConfig } from "hook/query-class/schedule-config/use-schedule-config";
import { useGetTeachers } from "hook/query-class/teacher/use-get-teachers";
import { useMemo } from "react";

export const useGetOptionsCourse = () => {
    const { data: listCourse } = useGetCourse({ page: 1, limit: 100 });
    const optionCourse = useMemo(() => {
        if (!listCourse?.data?.list?.length) return []
        return listCourse?.data?.list.map((course) => {
            return {
                value: course?.courseId?.toString(),
                name: `${course?.name} - ${course?.code}`,
            }
        })
    }, [listCourse])
    return optionCourse;
}

export const useGetOptionsClass = () => {
    const { data: listClass } = useGetClass({ page: 1, limit: 100 });
    const optionClass = useMemo(() => {
        if (!listClass?.data?.list?.length) return []
        return listClass?.data?.list.map((classItem) => {
            return {
                value: classItem?.classId?.toString(),
                name: `${classItem?.name}`,
            }
        })
    }, [listClass])
    return optionClass;
}

export const useGetOptionsTeacher = () => {
    const { data: listTeacher } = useGetTeachers({ page: 1, limit: 100 });
    const optionTeacher = useMemo(() => {
        if (!listTeacher?.data?.list?.length) return []
        return listTeacher?.data?.list.map((teacher) => {
            return {
                value: teacher?.teacherId?.toString(),
                name: `${teacher?.name}`,
            }
        })
    }, [listTeacher])
    return optionTeacher;
}

export const useGetOptionsScheduleConfig = () => {
    const { data: listSchedule } = useGetScheduleConfig({ page: 1, limit: 100 });
    const optionSchedule = useMemo(() => {
        if (!listSchedule?.data?.list?.length) return []
        return listSchedule?.data?.list.map((schedule) => {
            return {
                value: schedule?.scheduleConfigId?.toString(),
                name: `${schedule?.scheduleConfigId}`,
            }
        })
    }, [listSchedule])
    return optionSchedule;
}