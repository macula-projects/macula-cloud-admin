import config from "@/config"
import http from "@/utils/request"

export default {
	menu: {
		myMenus: {
			url: `${config.SYSTEM_API_URL}/api/v1/menus/my`,
			name: "获取我的菜单",
			get: async function(){
				return await http.get(this.url)
			}
		},
		pages: {
			url: `${config.SYSTEM_API_URL}/api/v1/menus/pages`,
			name: "获取菜单",
			get: async function(params){
				return await http.get(this.url, params)
			}
		},
		add:{
			url: `${config.SYSTEM_API_URL}/api/v1/menus`,
			name: '添加菜单',
			post: async function(data){
				return await http.post(this.url, data)
			}
		},
		del: {
			url: `${config.SYSTEM_API_URL}/api/v1/menus`,
			name: '删除菜单',
			delete: async function(ids, params){
					return await http.delete(`${this.url}/${ids}`, params)
			}
		},
		methodOption: {
			url: `${config.SYSTEM_API_URL}/api/v1/menus/methodOption`,
			name: '获取请求方法下拉列表',
			get: async function(){
				return await http.get(this.url)
			}
		},
		list: {
			url: `${config.SYSTEM_API_URL}/api/v1/menus`,
			name: '获取菜单列表',
			get: async function(params){
				return await http.get(this.url, params)
			}
		},
		routes: {
			url: `${config.SYSTEM_API_URL}/api/v1/menus/routes`,
			name: '路由列表',
			get: async function(params){
				return await http.get(this.url, params)
			}
		}
	}
}
