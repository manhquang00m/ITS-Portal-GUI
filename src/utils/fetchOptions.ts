import { getStatusCost } from "api/cost.api";
import { getCourses, getStatusCourse } from "api/course.api";
import { getStatusDailyIncome } from "api/daily-income.api";
import { getStatusLesson } from "api/lesson.api";
import { getClass, getLevelClass, getStatusClass } from "api/manage-class.api";
import { getStatusMonthlyIncome } from "api/monthly-income.api";
import { getStatusScheduleConfig } from "api/schedule-config.api";
import {
  getScheduleInstances,
  getStatusScheduleInstance,
  getStatusStudentProgress,
} from "api/schedule-instance.api";
import { getStatusStudent } from "api/student.api";
import {
  getLevelTeacher,
  getRoleTeacher,
  getStatusTeacher,
  getTeachers,
} from "api/teacher.api";
import { IOptionSelectComp } from "components/fields/SelectField";

export const fetchStatusStudentProgress = async (): Promise<
  IOptionSelectComp[]
> => {
  const data = await getStatusStudentProgress();
  return data?.map((item) => ({
    value: item.value,
    name: item.description,
  }));
};

export const fetchStatusScheduleInstance = async (): Promise<
  IOptionSelectComp[]
> => {
  const data = await getStatusScheduleInstance();
  return data?.map((item) => ({
    value: item.value,
    name: item.description,
  }));
};

export const fetchStatusTeacher = async (): Promise<IOptionSelectComp[]> => {
  const data = await getStatusTeacher();
  return data?.map((item) => ({
    value: item.value,
    name: item.description,
  }));
};

export const fetchRoleTeacher = async (): Promise<IOptionSelectComp[]> => {
  const data = await getRoleTeacher();
  return data?.map((item) => ({
    value: item.value,
    name: item.description,
  }));
};

export const fetchTeacherLevel = async (): Promise<IOptionSelectComp[]> => {
  const data = await getLevelTeacher();
  return data?.map((item) => ({
    value: item.value,
    name: item.description,
  }));
};

export const fetchStatusStudent = async (): Promise<IOptionSelectComp[]> => {
  const data = await getStatusStudent();
  return data?.map((item) => ({
    value: item.value,
    name: item.description,
  }));
};

export const fetchStatusScheduleConfig = async (): Promise<
  IOptionSelectComp[]
> => {
  const data = await getStatusScheduleConfig();
  return data?.map((item) => ({
    value: item.value,
    name: item.description,
  }));
};

export const fetchStatusMonthlyIncome = async (): Promise<
  IOptionSelectComp[]
> => {
  const data = await getStatusMonthlyIncome();
  return data?.map((item) => ({
    value: item.value,
    name: item.description,
  }));
};

export const fetchStatusLesson = async (): Promise<IOptionSelectComp[]> => {
  const data = await getStatusLesson();
  return data?.map((item) => ({
    value: item.value,
    name: item.description,
  }));
};

export const fetchStatusDailyIncome = async (): Promise<
  IOptionSelectComp[]
> => {
  const data = await getStatusDailyIncome();
  return data?.map((item) => ({
    value: item.value,
    name: item.description,
  }));
};

export const fetchStatusCourse = async (): Promise<IOptionSelectComp[]> => {
  const data = await getStatusCourse();
  return data?.map((item) => ({
    value: item.value,
    name: item.description,
  }));
};

export const fetchStatusCost = async (): Promise<IOptionSelectComp[]> => {
  const data = await getStatusCost();
  return data?.map((item) => ({
    value: item.value,
    name: item.description,
  }));
};

export const fetchStatusClass = async (): Promise<IOptionSelectComp[]> => {
  const data = await getStatusClass();
  return data?.map((item) => ({
    value: item.value,
    name: item.description,
  }));
};

export const fetchLevelClass = async (): Promise<IOptionSelectComp[]> => {
  const data = await getLevelClass();
  return data?.map((item) => ({
    value: item.value,
    name: item.description,
  }));
};

export const fetchClass = async (
  onlyActive: boolean
): Promise<IOptionSelectComp[]> => {
  const response = await getClass({
    limit: 1000,
    page: 1,
    status: onlyActive ? "active" : "",
  });
  return response?.data?.list.map((item) => ({
    value: item?.classId,
    name: item?.name,
  }));
};

export const fetchTeacher = async (
  onlyActive: boolean
): Promise<IOptionSelectComp[]> => {
  const response = await getTeachers({
    limit: 1000,
    page: 1,
    status: onlyActive ? "active" : "",
  });
  return response?.data?.list.map((item) => ({
    value: item?.teacherId,
    name: item?.name,
  }));
};

export const fetchScheduleInstance = async (
  onlyActive: boolean
): Promise<IOptionSelectComp[]> => {
  const response = await getScheduleInstances({
    limit: 1000,
    page: 1,
    status: onlyActive ? "active" : "",
  });
  return response?.data?.list.map((item) => ({
    value: item?.scheduleInstanceId,
    name: `${item?.date}`,
  }));
};

export const fetchCourse = async (
  onlyActive: boolean
): Promise<IOptionSelectComp[]> => {
  const response = await getCourses({
    limit: 1000,
    page: 1,
    status: onlyActive ? "active" : "",
  });
  return response?.data?.list.map((item) => ({
    value: item?.courseId,
    name: item?.name,
  }));
};
