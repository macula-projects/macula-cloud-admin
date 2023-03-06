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

//表格选择器配置

export default {
	pageSize: 20,						//表格每一页条数
	parseData: function (res) {
		return {
			data: res.data,
			rows: res.data.records,		//rows: res.data.rows, 分析行数据字段结构
			total: res.data.total,		//分析总数字段结构
			msg: res.message,			//分析描述字段结构
			code: res.code				//分析状态字段结构
		}
	},
	request: {
		page: 'page',					//规定当前分页字段
		pageSize: 'pageSize',			//规定一页条数字段
		keyword: 'keyword'				//规定搜索字段
	},
	props: {
		label: 'label',					//映射label显示字段
		value: 'value',					//映射value值字段
	}
}
