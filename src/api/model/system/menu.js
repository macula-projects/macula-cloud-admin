import config from "@/config"
import http from "@/utils/request"

export default {
	menu: {
		myMenus: {
			url: `${config.SYSTEM_API_URL}/api/v1/menus/my`,
			name: "获取我的菜单",
			get: async function(){
				return await http.get(this.url);
			}
		},
		list: {
			url: `${config.SYSTEM_API_URL}/api/v1/menus`,
			name: "获取菜单",
			get: async function(){
				return await http.get(this.url);
			}
		},
		add: {
			url: `${config.SYSTEM_API_URL}/api/v1/menus/add`,
			name: "更新添加菜单",
			post: async function(data = {}){
				return await http.post(this.url, data)
			}
		}
	}
}
