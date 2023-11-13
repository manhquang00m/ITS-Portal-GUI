import { Icon } from '@chakra-ui/react';
import { MdHome, MdSchool, MdLock } from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import AfterClass from 'views/admin/classManagement/afterClass';
import DataTables from 'views/admin/dataTables';
// Auth Imports
import SignInCentered from 'views/auth/signIn';
import { ListTeacher } from 'views/admin/classManagement/teacher/list/list-teacher';
import CreateEditTeacher from 'views/admin/classManagement/teacher/detail/create-edit/create-edit-teacher';
import ViewDetailTeacher from 'views/admin/classManagement/teacher/detail/view/view-detail-teacher';

const routes: RoutesType[] = [
	{
		name: 'Trang chủ',
		layout: '/admin',
		path: '/default',
		icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
		component: MainDashboard
	},
	{
		name: 'Quản lý lớp học',
		layout: '/admin',
		path: '/class',
		icon: <Icon as={MdSchool} width='20px' height='20px' color='inherit' />,
		component: NFTMarketplace,
		children: [
			{
				path: '/after-class',
				component: AfterClass,
				name: 'After Class',
				children: [
					{
						path: '/detail',
						component: DataTables,
						name: 'xem chi tiet',
					},
				]
			},
			{
				path: '/teacher',
				component: ListTeacher,
				name: 'Giáo viên',
				children: [
					{
						path: '/detail/:id',
						component: ViewDetailTeacher,
						name: 'Xem chi tiết',
					},
					{
						path: '/create',
						component: CreateEditTeacher,
						name: 'Tạo giảng viên',
					},
					{
						path: '/edit/:id',
						component: CreateEditTeacher,
						name: 'Chỉnh sửa giảng viên',
					},
				]
			},
		]
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
		name: 'Sign In',
		layout: '/auth',
		path: '/sign-in',
		icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
		hidden: true,
		component: SignInCentered
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
