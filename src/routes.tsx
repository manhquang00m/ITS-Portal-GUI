import { Icon } from "@chakra-ui/react";
import {
  MdHome,
  MdSchool,
  MdLock,
  MdOutlineCalendarMonth,
  MdOutlineMonetizationOn,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
// Auth Imports
import SignInCentered from "views/auth/signIn";
import { ListTeacher } from "views/admin/classManagement/teacher/list/list-teacher";
import CreateEditTeacher from "views/admin/classManagement/teacher/detail/create-edit/create-edit-teacher";
import ViewDetailTeacher from "views/admin/classManagement/teacher/detail/view/view-detail-teacher";
import { ListClass } from "views/admin/classManagement/class/list/list-class";
import { ListCourse } from "views/admin/classManagement/course/list/list-course";
import CreateEditCourse from "views/admin/classManagement/course/detail/create-edit/create-edit-course";
import ViewDetailCourse from "views/admin/classManagement/course/detail/view/view-detail-course";
import CreateEditClass from "views/admin/classManagement/class/detail/create-edit/create-edit-class";
import ViewDetailClass from "views/admin/classManagement/class/detail/view/view-detail-class";
import { ListScheduleConfig } from "views/admin/classManagement/schedule-config/list/list-sechedule-config";
import CreateEditScheduleConfig from "views/admin/classManagement/schedule-config/detail/create-edit/create-edit-schedule-config";
import ViewDetailScheduleConfig from "views/admin/classManagement/schedule-config/detail/view/view-detail-schedule-config";
import CreateEditScheduleInstance from "views/admin/scheduleInstance/detail/create-edit/create-edit-schedule-instance";
import { ListScheduleInstance } from "views/admin/scheduleInstance/list/list-sechedule-instance";
import TeacherReview from "views/admin/scheduleInstance/detail/review/teacher-review";
import { ListStudent } from "views/admin/classManagement/student/list/list-student";
import ViewDetailStudent from "views/admin/classManagement/student/detail/view/view-detail-student";
import CreateEditStudent from "views/admin/classManagement/student/detail/create-edit/create-edit-student";
import { ListCost } from "views/admin/finance/cost/list/list-cost";
import CreateEditCost from "views/admin/finance/cost/detail/create-edit/create-edit-cost";
import ViewDetailCost from "views/admin/finance/cost/detail/view/view-detail-cost";
import { ListMonthlyIncome } from "views/admin/finance/monthly-income/list/list-monthly-income";
import ViewDetailMonthlyIncome from "views/admin/finance/monthly-income/detail/view/view-detail-monthly-income";
import CreateEditMonthlyIncome from "views/admin/finance/monthly-income/detail/create-edit/create-edit-monthly-income";
import { ListDailyIncome } from "views/admin/finance/daily-income/list/list-daily-income";
import ViewDetailDailyIncome from "views/admin/finance/daily-income/detail/view/view-detail-daily-income";
import CreateEditDailyIncome from "views/admin/finance/daily-income/detail/create-edit/create-edit-daily-income";
import { ListLesson } from "views/admin/classManagement/lesson/list/list-lesson";
import ViewDetailLesson from "views/admin/classManagement/lesson/detail/view/view-detail-lesson";
import CreateEditLesson from "views/admin/classManagement/lesson/detail/create-edit/create-edit-lesson";
import { ListPools } from "views/admin/pools/list/list-pool";

const routes: RoutesType[] = [
  {
    name: "Trang chủ",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  {
    name: "Pools",
    layout: "/admin",
    path: "/pools",
    icon: (
      <Icon
        as={MdOutlineCalendarMonth}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    secondary: true,
    component: ListPools,
    children: [
      {
        path: "/edit/:id",
        component: CreateEditScheduleInstance,
        name: "Chỉnh sửa lịch dạy",
      },
      {
        path: "/review/:id",
        component: TeacherReview,
        name: "Nhận xét học sinh",
      },
    ],
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    hidden: true,
    component: SignInCentered,
  },
];

export default routes;
