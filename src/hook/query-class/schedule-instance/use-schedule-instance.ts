import { useMutation, useQuery } from "@tanstack/react-query";
import { getPools } from "api/pools.api";
import {
  createScheduleInstance,
  deleteScheduleInstance,
  editScheduleInstance,
  getAfterClass,
  getDetailScheduleInstance,
  getScheduleInstances,
  getStudentProgress,
  teacherReview,
} from "api/schedule-instance.api";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  IResponseStudentProgressInstance,
  IStudentProgressInstance,
} from "types/class-management/after-class.type";
import { IFilterPools } from "types/class-management/pool.type";
import {
  IFilterScheduleInstance,
  IFormScheduleInstance,
} from "types/class-management/schedule-instance.type";

export const useGetScheduleInstance = (params: IFilterScheduleInstance) => {
  return useQuery({
    queryKey: ["schedule-instance-list", params],
    queryFn: async () => {
      try {
        return await getScheduleInstances(params);
      } catch (error) {}
    },
    refetchOnWindowFocus: false,
    retry: 2,
  });
};
export const useGetPools = (params: IFilterPools) => {
  return useQuery({
    queryKey: ["pools", params],
    queryFn: async () => {
      try {
        return await getPools(params);
      } catch (error) {}
    },
    refetchOnWindowFocus: false,
    retry: 2,
  });
};
export const useGetAfterClass = (id: number, enabled: boolean) => {
  return useQuery({
    queryKey: ["generate-after-class", id],
    queryFn: async () => {
      try {
        return await getAfterClass(id);
      } catch (error) {}
    },
    refetchOnWindowFocus: false,
    retry: 2,
    enabled,
  });
};
export const useCreateScheduleInstance = () => {
  const history = useHistory();
  return useMutation({
    mutationFn: async (payload: IFormScheduleInstance) => {
      return await createScheduleInstance(payload);
    },
    onSuccess() {
      history?.push(`/admin/schedule-instance`);
      toast.success("Dữ liệu của bạn đã được lưu");
    },
    onError() {
      toast.error("Lỗi hệ thống");
    },
  });
};

export const useEditScheduleInstance = (id: string) => {
  const history = useHistory();
  return useMutation({
    mutationFn: async (payload: IFormScheduleInstance) => {
      return await editScheduleInstance(payload, id);
    },
    // onSuccess() {
    //   history?.push(`/admin/schedule-instance`);
    //   toast.success("Dữ liệu của bạn đã được cập nhật");
    // },
    // onError() {
    //   toast.error("Lỗi hệ thống");
    // },
  });
};

export const useGetDetailScheduleInstance = (id: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ["detail-schedule-instance", id],
    queryFn: async () => {
      try {
        return await getDetailScheduleInstance(id);
      } catch (error) {}
    },
    refetchOnWindowFocus: false,
    enabled: enabled,
  });
};

export const useGetStudentProgress = (id: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ["detail-student-progress", id],
    queryFn: async () => {
      try {
        return await getStudentProgress(id);
      } catch (error) {}
    },
    refetchOnWindowFocus: false,
    enabled: enabled,
  });
};

export const useTeacherReview = (id: string) => {
  const history = useHistory();
  return useMutation({
    mutationFn: async (payload: IResponseStudentProgressInstance) => {
      return await teacherReview(payload.data, id);
    },
    onSuccess() {
      history?.push(`/admin/schedule-instance`);
      toast.success("Nhận xét của bạn đã được lưu");
    },
    onError() {
      toast.error("Lỗi hệ thống");
    },
  });
};

export const useDeleteScheduleInstance = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteScheduleInstance(id);
    },
    onSuccess() {
      toast.success("Dữ liệu của bạn đã được xoá");
    },
    onError() {
      toast.error("Lỗi hệ thống");
    },
  });
};
