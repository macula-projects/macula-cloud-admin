<!--
  - Copyright (c) 2023 Macula
  -   macula.dev, China
  -
  - Licensed under the Apache License, Version 2.0 (the "License");
  - you may not use this file except in compliance with the License.
  - You may obtain a copy of the License at
  -
  -    http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  -->

<!--
 * @Descripttion: 字典选择器组件演示
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年8月3日15:51:20
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<el-main>
		<el-alert title="封装el-select支持异步获取数据,以及根据字典名获取数据,继承el-select全部的属性和事件" type="success" style="margin-bottom:20px;"></el-alert>

		<el-row :gutter="15">
			<el-col :lg="12">
				<el-card shadow="never" header="异步单选">
					<sc-select v-model="value" :apiObj="$API.system.dic.get" clearable filterable style="width: 100%;"></sc-select>
				</el-card>
			</el-col>
			<el-col :lg="12">
				<el-card shadow="never" header="异步多选">
					<sc-select v-model="value2" :apiObj="$API.system.dic.get" clearable filterable multiple style="width: 100%;"></sc-select>
				</el-card>
			</el-col>
			<el-col :lg="12">
				<el-card shadow="never" header="字典选择器">
					<sc-select v-model="value3" dic="notice" clearable filterable style="width: 100%;"></sc-select>
				</el-card>
			</el-col>
			<el-col :lg="12">
				<el-card shadow="never" header="自定义模板">
					<sc-select v-model="value4" dic="notice" clearable filterable placeholder="自定义placeholder" style="width: 100%;">
						<template #option="{data}">
							<span style="float: left">{{ data.label }}</span>
							<span style="float: right; color: #999; font-size: 13px">{{ data.value }}</span>
						</template>
					</sc-select>
				</el-card>
			</el-col>
		</el-row>
	</el-main>
</template>

<script>
	export default {
		name: 'scselect',
		data() {
			return {
				value: '3',
				value2: ['1', '3'],
				value3: '',
				value4: ''
			}
		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style>
</style>
