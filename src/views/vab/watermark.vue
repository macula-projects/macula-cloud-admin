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
		<el-card shadow="never">
			<sc-water-mark ref="wm" text="欢迎体验SCUI" subtext="admin@scui.com">
				<el-table :data="tableData" border stripe style="width: 100%">
					<el-table-column prop="date" label="Date" width="180" />
					<el-table-column prop="name" label="Name" width="180" />
					<el-table-column prop="address" label="Address" />
				</el-table>
			</sc-water-mark>
		</el-card>
		<el-card shadow="never" style="margin-top: 15px;">
			<el-button type="primary" @click="create">创建水印</el-button>
			<el-button type="primary" @click="clear">移除水印</el-button>
		</el-card>
	</el-main>
</template>

<script>
	export default {
		name: 'watermark',
		data() {
			return {
				tableData: [
					{
						date: '2016-05-03',
						name: 'Tom',
						address: 'No. 189, Grove St, Los Angeles',
					},
					{
						date: '2016-05-02',
						name: 'Tom',
						address: 'No. 189, Grove St, Los Angeles',
					},
					{
						date: '2016-05-04',
						name: 'Tom',
						address: 'No. 189, Grove St, Los Angeles',
					},
					{
						date: '2016-05-01',
						name: 'Tom',
						address: 'No. 189, Grove St, Los Angeles',
					},
				]
			}
		},
		mounted() {

		},
		methods: {
			create(){
				this.$refs.wm.create()
			},
			clear(){
				this.$refs.wm.clear()
			}
		}
	}
</script>

<style>
</style>
