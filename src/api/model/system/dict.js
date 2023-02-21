import config from "@/config"
import http from "@/utils/request"

export default {
	dict: {
		typeList: {
			url: `${config.SYSTEM_API_URL}/api/v1/dict/types/pages`,
			name: "字典类型分页列表",
			get: async function(params){
				return await http.get(this.url, params);
			}
		},
		getItems: {
			url: `${config.SYSTEM_API_URL}/api/v1/dict/types`,
			name: "获取字典类型的数据项",
			get: async function(params){
				return await http.get(`${this.url}/${params.code}/items`);
			}
		},
		itemsList: {
			url: `${config.SYSTEM_API_URL}/api/v1/dict/items/pages`,
			name: "字典数据分页列表",
			get: async function(params){
				return await http.get(this.url, params);
			}
		},
		addType: {
			url: `${config.SYSTEM_API_URL}/api/v1/dict/types`,
			name: "字典数据分页列表",
			post: async function(data={}){
				return await http.post(this.url, data);
			}
		},
		editType: {
			url: `${config.SYSTEM_API_URL}/api/v1/dict/types`,
			name: "修改字典类型",
			put: async function(id, data={}){
				return await http.put(`${this.url}/${id}`, data);
			}
		},
		delType: {
			url: `${config.SYSTEM_API_URL}/api/v1/dict/types`,
			name: "修改字典类型",
			delete: async function(id){
				return await http.delete(`${this.url}/${id}`);
			}
		}
	},
}
