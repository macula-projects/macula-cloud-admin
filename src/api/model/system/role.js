import config from "@/config"
import http from "@/utils/request"

export default {
	role: {
		list: {
			url: `${config.SYSTEM_API_URL}/api/v1/roles/pages`,
			name: '获取角色分布列表',
			get: async function(param){
				return await http.get(this.url, param)
			}
		},
		post: {
			url: `${config.SYSTEM_API_URL}/api/v1/roles`,
			name: '添加角色',
			post: async function(data){
				return await http.post(this.url, data)
			}
		},
		del: {
			url: `${config.SYSTEM_API_URL}/api/v1/roles`,
			name: '删除角色',
			delete: async function(ids){
				return await http.delete(`${this.url}/${ids}`)
			}
		},
		options: {
			url: `${config.SYSTEM_API_URL}/api/v1/roles/options`,
			name: "获取角色下拉选项",
			get: async function(){
				var res = await http.get(this.url);
				return res;
			}
		},
		validtorRoleCode: {
			url: `${config.SYSTEM_API_URL}/api/v1/roles/validtor/code`,
			name: '角色编码值合法性验证',
			get: async function(params){
				return await http.get(this.url, params)
			}
		},
		validtorRoleName: {
			url: `${config.SYSTEM_API_URL}/api/v1/roles/validtor/name`,
			name: '角色名字值合法性验证',
			get: async function(params){
				return await http.get(this.url, params)
			}
		},
		optionsByDataScope: {
			url: `${config.SYSTEM_API_URL}/api/v1/roles/optionsByDataScope`,
			name: '获取角色数据权限下拉选项',
			get: async function(){
				return await http.get(this.url)
			}
		}
	}
}