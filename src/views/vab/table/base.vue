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
	<el-container>
		<el-header>
			<div class="left-panel">
				<el-button type="primary" icon="el-icon-plus"></el-button>
				<el-button type="danger" plain icon="el-icon-delete"></el-button>
			</div>
		</el-header>
		<el-main class="nopadding">
			<scTable ref="table" :apiObj="list.apiObj" row-key="id" stripe>
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column label="姓名" prop="name" width="150"></el-table-column>
				<el-table-column label="性别" prop="sex" width="150" :filters="sexFilters" :filter-method="filterHandler">
					<template #default="scope">
						<el-tag v-if="scope.row.sex=='男'">{{scope.row.sex}}</el-tag>
						<el-tag v-if="scope.row.sex=='女'" type="success">{{scope.row.sex}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="邮箱" prop="email" width="250"></el-table-column>
				<el-table-column label="评分" prop="num" width="150" sortable></el-table-column>
				<el-table-column label="进度" prop="progress" width="250" sortable>
					<template #default="scope">
						<el-progress :percentage="scope.row.progress" />
					</template>
				</el-table-column>
				<el-table-column label="注册时间" prop="datetime" width="150" sortable></el-table-column>
			</scTable>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		name: 'tableBase',
		data() {
			return {
				sexFilters: [
					{text: '男', value: '男'},
					{text: '女', value: '女'}
				],
				list: {
					apiObj: this.$API.demo.list
				}
			}
		},
		methods: {
			filterHandler(value, row, column){
				const property = column['property']
				return row[property] === value
			}
		}
	}
</script>

<style>
</style>
