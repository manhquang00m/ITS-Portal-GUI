import { getClass } from "api/manage-class.api";
import { getStatusScheduleInstance } from "api/schedule-instance.api";
import { getTeachers } from "api/teacher.api";
import { IOptionSelectComp } from "components/fields/SelectField";

export const fetchStatusScheduleInstance = async (): Promise<
  IOptionSelectComp[]
> => {
  const data = await getStatusScheduleInstance();
  return data?.map((item) => ({
    value: item.value,
    name: item.description,
  }));
};

export const fetchClass = async (): Promise<IOptionSelectComp[]> => {
  const response = await getClass({ limit: 1000, page: 1 });
  return response?.data?.list.map((item) => ({
    value: item?.classId,
    name: item?.name,
  }));
};

export const fetchTeacher = async (): Promise<IOptionSelectComp[]> => {
  const response = await getTeachers({ limit: 1000, page: 1 });
  return response?.data?.list.map((item) => ({
    value: item?.teacherId,
    name: item?.name,
  }));
};
