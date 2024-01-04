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

const routes: RoutesType[] = [
  {
    name: "Trang chủ",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  {
    name: "Lịch dạy",
    layout: "/admin",
    path: "/schedule-instance",
    icon: (
      <Icon
        as={MdOutlineCalendarMonth}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    secondary: true,
    component: ListScheduleInstance,
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
    name: "Quản lý lớp học",
    layout: "/admin",
    path: "/class",
    icon: <Icon as={MdSchool} width="20px" height="20px" color="inherit" />,
    children: [
      // {
      // 	path: "/after-class",
      // 	component: AfterClass,
      // 	name: "After Class",
      // 	children: [
      // 		{
      // 			path: "/detail",
      // 			component: DataTables,
      // 			name: "xem chi tiet",
      // 		},
      // 	],
      // },
      {
        path: "/teacher",
        component: ListTeacher,
        name: "Giáo viên",
        children: [
          {
            path: "/detail/:id",
            component: ViewDetailTeacher,
            name: "Xem chi tiết",
          },
          {
            path: "/create",
            component: CreateEditTeacher,
            name: "Thêm giáo viên",
          },
          {
            path: "/edit/:id",
            component: CreateEditTeacher,
            name: "Chỉnh sửa giáo viên",
          },
        ],
      },
      {
        path: "/student",
        component: ListStudent,
        name: "Học sinh",
        children: [
          {
            path: "/detail/:id",
            component: ViewDetailStudent,
            name: "Xem chi tiết",
          },
          {
            path: "/create",
            component: CreateEditStudent,
            name: "Thêm học sinh",
          },
          {
            path: "/edit/:id",
            component: CreateEditStudent,
            name: "Chỉnh sửa học sinh",
          },
        ],
      },
      {
        path: "/zoom",
        component: ListClass,
        name: "Lớp học",
        children: [
          {
            path: "/detail/:id",
            component: ViewDetailClass,
            name: "Xem chi tiết",
          },
          {
            path: "/create",
            component: CreateEditClass,
            name: "Tạo lớp học",
          },
          {
            path: "/edit/:id",
            component: CreateEditClass,
            name: "Chỉnh sửa lớp học",
          },
        ],
      },
      {
        path: "/course",
        component: ListCourse,
        name: "Khoá học",
        children: [
          {
            path: "/detail/:id",
            component: ViewDetailCourse,
            name: "Xem chi tiết",
          },
          {
            path: "/create",
            component: CreateEditCourse,
            name: "Tạo khoá học",
          },
          {
            path: "/edit/:id",
            component: CreateEditCourse,
            name: "Chỉnh sửa khoá học",
          },
        ],
      },
      {
        path: "/lesson",
        component: ListLesson,
        name: "Bài giảng",
        children: [
          {
            path: "/detail/:id",
            component: ViewDetailLesson,
            name: "Xem chi tiết",
          },
          {
            path: "/create",
            component: CreateEditLesson,
            name: "Tạo bài giảng",
          },
          {
            path: "/edit/:id",
            component: CreateEditLesson,
            name: "Chỉnh sửa bài giảng",
          },
        ],
      },
      {
        path: "/schedule-config",
        component: ListScheduleConfig,
        name: "Cài đặt lịch dạy",
        children: [
          {
            path: "/detail/:id",
            component: ViewDetailScheduleConfig,
            name: "Xem chi tiết",
          },
          {
            path: "/create",
            component: CreateEditScheduleConfig,
            name: "Tạo lịch dạy",
          },
          {
            path: "/edit/:id",
            component: CreateEditScheduleConfig,
            name: "Chỉnh sửa lịch dạy",
          },
        ],
      },
    ],
  },
  {
    name: "Quản lý tài chính",
    layout: "/admin",
    path: "/finance",
    icon: <Icon as={MdOutlineMonetizationOn} width="20px" height="20px" color="inherit" />,
    children: [
      {
        path: "/cost",
        component: ListCost,
        name: "Chi phí",
        children: [
          {
            path: "/detail/:id",
            component: ViewDetailCost,
            name: "Xem chi tiết",
          },
          {
            path: "/create",
            component: CreateEditCost,
            name: "Tạo chi phí",
          },
          {
            path: "/edit/:id",
            component: CreateEditCost,
            name: "Chỉnh sửa chi phí",
          },
        ],
      },
      {
        path: "/daily",
        component: ListDailyIncome,
        name: "Doanh thu theo ngày",
        children: [
          {
            path: "/detail/:id",
            component: ViewDetailDailyIncome,
            name: "Xem chi tiết",
          },
          {
            path: "/create",
            component: CreateEditDailyIncome,
            name: "Tạo doanh thu theo ngày",
          },
          {
            path: "/edit/:id",
            component: CreateEditDailyIncome,
            name: "Chỉnh sửa doanh thu theo ngày",
          },
        ],
      },
      {
        path: "/monthly",
        component: ListMonthlyIncome,
        name: "Doanh thu theo tháng",
        children: [
          {
            path: "/detail/:id",
            component: ViewDetailMonthlyIncome,
            name: "Xem chi tiết",
          },
          {
            path: "/create",
            component: CreateEditMonthlyIncome,
            name: "Tạo doanh thu theo tháng",
          },
          {
            path: "/edit/:id",
            component: CreateEditMonthlyIncome,
            name: "Chỉnh sửa doanh thu theo tháng",
          },
        ],
      },
    ]

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
