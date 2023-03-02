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
	upload: {
		url: `${config.API_URL}/upload`,
		name: "文件上传",
		post: async function(data, config={}){
			return await http.post(this.url, data, config);
		}
	},
	uploadFile: {
		url: `${config.API_URL}/uploadFile`,
		name: "附件上传",
		post: async function(data, config={}){
			return await http.post(this.url, data, config);
		}
	},
	exportFile: {
		url: `${config.API_URL}/fileExport`,
		name: "导出附件",
		get: async function(data, config={}){
			return await http.get(this.url, data, config);
		}
	},
	importFile: {
		url: `${config.API_URL}/fileImport`,
		name: "导入附件",
		post: async function(data, config={}){
			return await http.post(this.url, data, config);
		}
	},
	file: {
		menu: {
			url: `${config.API_URL}/file/menu`,
			name: "获取文件分类",
			get: async function(){
				return await http.get(this.url);
			}
		},
		list: {
			url: `${config.API_URL}/file/list`,
			name: "获取文件列表",
			get: async function(params){
				return await http.get(this.url, params);
			}
		}
	}
}
