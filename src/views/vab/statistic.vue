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
 * @Descripttion: 统计数值组件演示
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年6月23日10:28:17
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<el-main>
		<el-alert title="一个非常简单的组件, 目的就是省去重复写样式, 支持千分符/前后缀等." type="success" style="margin-bottom:20px;"></el-alert>
		<el-row :gutter="15">
			<el-col :lg="8">
				<el-card shadow="never">
					<sc-statistic title="Title" value="112893" description="Description" tips="Tips" groupSeparator></sc-statistic>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never">
					<sc-statistic title="今日净利润" value="112893.00" prefix="¥" groupSeparator>
						<sc-trend v-model="trendValue1"></sc-trend>
					</sc-statistic>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never">
					<sc-statistic title="留言" value="112893" suffix="条" groupSeparator>
						<sc-trend v-model="trendValue2"></sc-trend>
					</sc-statistic>
				</el-card>
			</el-col>
		</el-row>
	</el-main>
</template>

<script>
	export default {
		name: 'statistic',
		data() {
			return {
				trendValue1: 7.7,
				trendValue2: -18.9
			}
		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style scoped>
	.el-card {margin-bottom: 15px;}
	.up {color: #F56C6C;margin-left: 5px;}
	.down {color: #67C23A;margin-left: 5px;}
</style>
