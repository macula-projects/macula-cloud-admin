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
	<el-main style="padding:0 20px;">
		<el-card shadow="never">
			<el-descriptions title="Table row data" :column="2" border>
				<el-descriptions-item v-for=" (val, key) in data" :key="key" :label="key" width="150px">{{val}}</el-descriptions-item>
			</el-descriptions>
		</el-card>
	</el-main>
</template>

<script>
	export default {
		data() {
			return {
				data: {
					id: ""
				}
			}
		},
		mounted() {

		},
		methods: {
			//注入数据
			setData(data){
				this.data = data
			}
		}
	}
</script>

<style>
</style>
