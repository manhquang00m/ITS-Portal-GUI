import { IResponseListCommon } from "types/base/base-api.type";

export interface IFormAfterClass {
  teacher?: string;
  date?: string;
  comments?: {
    student: string;
    comment: string;
    result: string;
  }[];
  knowledge?: string;
  next_lecture?: string;
  progress?: number;
}

export interface IStudentProgress {
  studentName: string;
  currentProcess: number;
  teacherReview: string;
  checkIn: string;
  checkOut: string;
  status: string;
  result: string;
  processPercent: number;                
}

export interface IAfterClass {
  date: string;
  teacherName: string;
  currentLesson: string;
  nextLesson: string;
  averageScoreProgress: number;
  studentProgress: IStudentProgress[];
}

export interface IResponseAfterClass extends IResponseListCommon {
  data: IAfterClass;
}

export interface IStudentProgressInstance extends IStudentProgress {
  classStudentId: number;
}

export interface IResponseStudentProgressInstance {
  data: IStudentProgressInstance[];
}
