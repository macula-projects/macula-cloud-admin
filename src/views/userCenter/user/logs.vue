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
	<el-card shadow="never" header="近7天操作记录">
		<scTable ref="table" :data="data" height="auto" paginationLayout="total, prev, pager, next" hideDo>
			<el-table-column label="序号" type="index"></el-table-column>
			<el-table-column label="业务名称" prop="title" min-width="240"></el-table-column>
			<el-table-column label="IP" prop="ip" width="150"></el-table-column>
			<el-table-column label="结果" prop="code" width="150">
				<el-tag type="success">成功</el-tag>
			</el-table-column>
			<el-table-column label="操作时间" prop="time" width="150"></el-table-column>
		</scTable>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				data: [
					{
						title: "修改用户 lolowan",
						ip: "211.187.11.18",
						code: "成功",
						time: "2022-10-10 08:41:17"
					},
					{
						title: "用户登录",
						ip: "211.187.11.18",
						code: "成功",
						time: "2022-10-10 08:21:51"
					}
				]
			}
		}
	}
</script>

<style>
</style>
