<template>
	<el-container>
		<el-container>
			<el-header>
				<div class="left-panel">
					<el-button type="primary" icon="el-icon-plus" @click="add"></el-button>
				</div>
				<div class="right-panel">
					<div class="right-panel-search">
						<el-input v-model="search.keywords" placeholder="应用名称 / 应用编码" clearable></el-input>
						<el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
					</div>
				</div>
			</el-header>
			<el-main class="nopadding">
				<scTable ref="table" :apiObj="apiObj" stripe remoteSort remoteFilter>
					<el-table-column label="应用名称" prop="applicationName" width="150" sortable='custom'></el-table-column>
					<el-table-column label="应用编码" prop="code" width="150" sortable='custom'></el-table-column>
					<el-table-column label="负责人" prop="manager" width="150" sortable='custom'></el-table-column>
					<el-table-column label="联系方式" prop="mobile" width="150" sortable='custom'></el-table-column>
					<el-table-column label="创建时间" prop="createTime" width="170" sortable='custom'></el-table-column>
					<el-table-column label="操作" fixed="right" align="right" width="200">
						<template #default="scope">
							<el-button-group>
								<el-button text type="primary" size="small" @click="table_show(scope.row, scope.$index)">添加维护人</el-button>
								<el-button text type="primary" size="small" @click="table_edit(scope.row, scope.$index)">编辑</el-button>
								<el-popconfirm title="确定删除吗？" @confirm="table_del(scope.row, scope.$index)">
									<template #reference>
										<el-button text type="primary" size="small">删除</el-button>
									</template>
								</el-popconfirm>
							</el-button-group>
						</template>
					</el-table-column>
				</scTable>
			</el-main>
		</el-container>
	</el-container>

	<save-dialog v-if="dialog.save" ref="saveDialog" @success="handleSuccess" @closed="dialog.save=false"></save-dialog>
	<list-dialog v-if="dialog.list" ref="listDialog" @success="handleSuccess" @closed="dialog.list=false"></list-dialog>

</template>

<script>
	import saveDialog from './save'
	import listDialog from './addMaintainer'

	export default {
		name: 'application',
		components: {
			saveDialog,
			listDialog
		},
		data() {
			return {
				dialog: {
					save: false,
					list: false
				},
				showGrouploading: false,
				groupFilterText: '',
				group: [],
				apiObj: this.$API.system_application.application.list,
				selection: [],
				search: {
					keywords: null,
				}
			}
		},
		methods: {
			//添加
			add(){
				this.dialog.save = true
				this.$nextTick(() => {
					this.$refs.saveDialog.open()
				})
			},
			//编辑
			table_edit(row){
				this.dialog.save = true
				this.$nextTick(() => {
					this.$refs.saveDialog.open('edit').setData(row)
				})
			},
			//查看
			table_show(row){
				this.dialog.list = true
				this.$nextTick(() => {
					this.$refs.listDialog.open(row)
				})
			},
			//删除
			async table_del(row, index){
				var reqData = row.id
				var res = await this.$API.system_application.application.del.delete(reqData);
				if(res.code == 10000){
					//这里选择刷新整个表格 OR 插入/编辑现有表格数据
					// this.$refs.table.tableData.splice(index, 1);
					this.$refs.table.refresh()
					ElMessage.success("删除成功")
				}else{
					ElMessageBox.alert(res.message, "提示", {type: 'error'})
				}
			},
			//搜索
			upsearch(){
				this.$refs.table.upData(this.search)
			},
			//本地更新数据
			handleSuccess(data, mode){
				if(mode=='add'){
					this.$refs.table.refresh()
				}else if(mode=='edit'){
					this.$refs.table.refresh()
				}
			},			
		}
	}
</script>

<style>
</style>
