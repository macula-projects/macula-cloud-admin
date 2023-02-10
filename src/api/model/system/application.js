import config from "@/config"
import http from "@/utils/request"

export default {
	application: {
		list: {
			url: `${config.SYSTEM_API_URL}/api/v1/app`,
			name: "应用列表",
			get: async function(params){
				return await http.get(this.url, params);
			}
		},
		add: {
			url: `${config.SYSTEM_API_URL}/api/v1/app`,
			name: "添加应用",
			post: async function(data = {}){
				return await http.post(this.url, data)
			}
		},
		del: {
			url: `${config.SYSTEM_API_URL}/api/v1/app`,
			name: "删除应用",
			delete: async function(data = {}){
				var reqUrl = this.url + '/' + data
				return await http.delete(reqUrl, data)
			}
		},
	},
}
