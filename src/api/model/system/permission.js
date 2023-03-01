import config from '@/config'
import http from '@/utils/request'
export default {
	permission: {
		validtorUrlPerm: {
			url: `${config.SYSTEM_API_URL}/api/v1/permissions/validtor/urlPerm`,
			name: '接口权限路径验证器',
			post: async function(data){
				return await http.post(this.url, data)
			}
		},
		list: {
			url: `${config.SYSTEM_API_URL}/api/v1/permissions`,
			name: '权限列表',
			get: async function(params){
				return await http.get(this.url, params);
			}
		},
		del: {
			url: `${config.SYSTEM_API_URL}/api/v1/permissions`,
			name: '删除权限',
			delete: async function(ids, params){
				return await http.delete(`${this.url}/${ids}`, params)
			}
		},
		add: {
			url: `${config.SYSTEM_API_URL}/api/v1/permissions`,
			name: '添加权限',
			post: async function(data){
				return await http.post(this.url, data)
			}
		}
	}
}