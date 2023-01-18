import config from "@/config"

//系统路由
const routes = [
	{
		name: "layout",
		path: "/",
		component: () => import(/* webpackChunkName: "layout" */ '@/layout'),
		redirect: config.DASHBOARD_URL || '/dashboard',
		children: []
	},
	{
		path: "/login",
		component: () => import(/* webpackChunkName: "login" */ '@/views/common/login'),
		meta: {
			title: "登录"
		}
	},
	{
		path: "/user_register",
		component: () => import(/* webpackChunkName: "userRegister" */ '@/views/common/login/userRegister'),
		meta: {
			title: "注册"
		}
	},
	{
		path: "/reset_password",
		component: () => import(/* webpackChunkName: "resetPassword" */ '@/views/common/login/resetPassword'),
		meta: {
			title: "重置密码"
		}
	}
]

export default routes;
