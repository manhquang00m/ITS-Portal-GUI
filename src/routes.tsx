import { Icon } from "@chakra-ui/react";
import {
  MdHome,
  MdSchool,
  MdLock,
  MdOutlineCalendarMonth,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import AfterClass from "views/admin/classManagement/afterClass";
import DataTables from "views/admin/dataTables";
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
import ViewDetailScheduleConfig from "views/admin/classManagement/schedule-config/detail/view/view-detail-teacher";
import ViewDetailScheduleInstance from "views/admin/scheduleInstance/detail/view/view-detail-schedule-instance";
import CreateEditScheduleInstance from "views/admin/scheduleInstance/detail/create-edit/create-edit-schedule-instance";
import { ListScheduleInstance } from "views/admin/scheduleInstance/list/list-sechedule-instance";
import TeacherReview from "views/admin/classManagement/schedule-config/detail/review/teacher-review";

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
    component: NFTMarketplace,
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
            name: "Tạo giảng viên",
          },
          {
            path: "/edit/:id",
            component: CreateEditTeacher,
            name: "Chỉnh sửa giảng viên",
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
  // {
  // 	name: 'NFT Marketplace',
  // 	layout: '/admin',
  // 	path: '/nft',
  // 	icon: <Icon as={MdOutlineShoppingCart} width='20px' height='20px' color='inherit' />,
  // 	component: NFTMarketplace,
  // 	secondary: true
  // },
  // {
  // 	name: 'Data Tables',
  // 	layout: '/admin',
  // 	icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
  // 	path: '/data-tables',
  // 	component: DataTables
  // },
  // {
  // 	name: 'Quản lý lớp học',
  // 	layout: '/admin',
  // 	path: '/profile/detail',
  // 	icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
  // 	component: Profile
  // },
  // {
  // 	name: 'Profile',
  // 	layout: '/admin',
  // 	path: '/profile/detail',
  // 	icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
  // 	hidden: true,
  // 	component: Profile
  // },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    hidden: true,
    component: SignInCentered,
  },
  // {
  // 	name: 'RTL Admin',
  // 	layout: '/rtl',
  // 	path: '/rtl-default',
  // 	icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  // 	component: RTL
  // }
];

export default routes;
