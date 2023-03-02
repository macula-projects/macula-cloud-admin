/*
 * Copyright (c) 2023 Macula
 *   macula.dev, China
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import config from "@/config"
import http from "@/utils/request"

export default {
	ver: {
		url: `${config.API_URL}/demo/ver`,
		name: "获取最新版本号",
		get: async function(params){
			return await http.get(this.url, params);
		}
	},
	post: {
		url: `${config.API_URL}/demo/post`,
		name: "分页列表",
		post: async function(data){
			return await http.post(this.url, data, {
				headers: {
					//'response-status': 401
				}
			});
		}
	},
	page: {
		url: `${config.API_URL}/demo/page`,
		name: "分页列表",
		get: async function(params){
			return await http.get(this.url, params);
		}
	},
	list: {
		url: `${config.API_URL}/demo/list`,
		name: "数据列表",
		get: async function(params){
			return await http.get(this.url, params);
		}
	},
	menu: {
		url: `${config.API_URL}/demo/menu`,
		name: "普通用户菜单",
		get: async function(){
			return await http.get(this.url);
		}
	},
	status: {
		url: `${config.API_URL}/demo/status`,
		name: "模拟无权限",
		get: async function(code){
			return await http.get(this.url, {}, {
				headers: {
					"response-status": code
				}
			});
		}
	}
}
