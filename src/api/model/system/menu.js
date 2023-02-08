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
		add: {
			url: `${config.SYSTEM_API_URL}/api/v1/menus/add`,
			name: "更新添加菜单",
			post: async function(data = {}){
				return await http.post(this.url, data)
			}
		},
		del: {
			url: `${config.SYSTEM_API_URL}/api/v1/menus/delete`,
			name: "删除菜单",
			delete: async function(param = {}) {
				return await http.delete(this.url, param)
			}
		}
	}
}
