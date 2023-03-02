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
 * @Descripttion: 右键简单组件演示文件
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年7月22日16:31:14
 * @LastEditors:
 * @LastEditTime:
-->

<template>
	<el-main>
		<el-row :gutter="15">
			<el-col :lg="12">
				<el-card shadow="never">
					<el-alert title="试试右键表格行看看. 支持多级菜单, 动态菜单等等等..." type="success" style="margin-bottom:20px;"></el-alert>
					<el-table ref="table" :data="tableData" highlight-current-row @row-contextmenu="rowContextmenu">
						<el-table-column type="expand">
							<template #default="props">
								<el-empty :description="props.row.id + ' 自定义扩展行'" :image-size="60"></el-empty>
							</template>
						</el-table-column>
						<el-table-column prop="id" label="ID" width="50"></el-table-column>
						<el-table-column prop="name" label="NAME" width="220"></el-table-column>
						<el-table-column prop="date" label="DATE"></el-table-column>
						<el-table-column prop="state" label="STATE"></el-table-column>
					</el-table>
				</el-card>
			</el-col>
			<el-col :lg="12">
				<el-card shadow="never" @contextmenu.prevent="openMenu">
					<div style="height:500px;display: flex;flex-direction: column;align-items: center;justify-content: center;color: #999;">
						试试看在上下左右四个角落右键，看看边缘位置修正效果
					</div>
				</el-card>
			</el-col>
		</el-row>
	</el-main>

	<sc-contextmenu ref="contextmenu" @command="handleCommand" @visible-change="visibleChange">
		<sc-contextmenu-item command="a" title="返回(B)" suffix="Alt+←"></sc-contextmenu-item>
		<sc-contextmenu-item command="b" title="重新加载(R)" suffix="Ctrl+R" icon="el-icon-refresh"></sc-contextmenu-item>
		<sc-contextmenu-item title="切换兼容性模式" divided>
			<sc-contextmenu-item command="c1" title="二级菜单1"></sc-contextmenu-item>
			<sc-contextmenu-item title="二级菜单2">
				<sc-contextmenu-item command="c2-1" title="三级菜单1"></sc-contextmenu-item>
				<sc-contextmenu-item command="c2-2" title="三级菜单2"></sc-contextmenu-item>
				<sc-contextmenu-item command="c2-3" title="三级菜单3"></sc-contextmenu-item>
			</sc-contextmenu-item>
			<sc-contextmenu-item command="c3" title="二级菜单3"></sc-contextmenu-item>
		</sc-contextmenu-item>
		<sc-contextmenu-item  command="d" title="属性(P)" divided :disabled="row&&row.state==0"></sc-contextmenu-item>
		<sc-contextmenu-item  command="e" title="设置state=1" v-if="row&&row.state==0"></sc-contextmenu-item>
	</sc-contextmenu>

</template>

<script>
	export default {
		name: 'contextmenu',
		data() {
			return {
				row: null,
				tableData: [
					{
						id: '1',
						name: 'Sakuya',
						date: '2021-10-10',
						state: 1
					},
					{
						id: '2',
						name: 'Lolowan(此行右键属性禁用)',
						date: '2021-10-09',
						state: 0
					},
					{
						id: '3',
						name: 'Ali',
						date: '2021-10-08',
						state: 1
					}
				]
			}
		},
		mounted() {

		},
		methods: {
			rowContextmenu(row, column, event){
				this.row = row
				this.$refs.table.setCurrentRow(row);
				this.$refs.contextmenu.openMenu(event)
			},
			openMenu(e){
				this.row = null
				this.$refs.contextmenu.openMenu(e)
			},
			handleCommand(command){
				ElMessage('click on item ' + command)
				if(command == 'e'){
					this.row.state = 1
				}
			},
			visibleChange(visible){
				if(!visible){
					this.$refs.table.setCurrentRow();
				}
			}
		}
	}
</script>

<style scoped>
</style>
