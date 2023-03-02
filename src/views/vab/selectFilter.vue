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

<template>
	<el-main>
		<el-card shadow="never" header="分类筛选器">
			<sc-select-filter :data="data" :selected-values="selectedValues" :label-width="80" @on-change="change"></sc-select-filter>
		</el-card>
		<el-card shadow="never" header="返回值" style="margin-top: 15px;">
			<pre>{{ filterData }}</pre>
		</el-card>
	</el-main>
</template>

<script>
	export default {
		name: 'selectFilter',
		data() {
			return {
				data: [
					{
						title: "状态(单)",
						key: "state",
						options: [
							{
								label: "全部",
								value: ""
							},
							{
								label: "待审核",
								value: "1",
								icon: "el-icon-flag"
							},
							{
								label: "已退回",
								value: "2",
								icon: "el-icon-bottom-left"
							},
							{
								label: "已关闭",
								value: "3",
								icon: "el-icon-circle-close"
							},
							{
								label: "已完成",
								value: "4",
								icon: "el-icon-checked"
							}
						]
					},
					{
						title: "类型(多)",
						key: "type",
						multiple: true,
						options: [
							{
								label: "全部",
								value: ""
							},
							{
								label: "请假申请",
								value: "1"
							},
							{
								label: "加班申请",
								value: "2"
							}
						]
					}
				],
				selectedValues: {
					state: [""],
					type: [""]
				},
				filterData: {}
			}
		},
		mounted() {

		},
		methods: {
			change(selected){
				this.filterData = selected
			}
		}
	}
</script>

<style>
</style>
