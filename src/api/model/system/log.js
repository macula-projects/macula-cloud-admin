import config from "@/config"
import http from "@/utils/request"

export default {
	log: {
		list: {
			url: `${config.SYSTEM_API_URL}/api/v1/audit/log/page`,
			name: "日志列表",
			get: async function(params){
				console.log('param', params)
				return await http.get(this.url, params);
			}
		}
	},
}
