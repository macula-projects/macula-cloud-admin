<template>
	<el-container>
			<el-header>
				<div style="width: 100%">
					<el-row :gutter="20">
						<el-col :span="10">
							<div class="mt-4">
								<el-input
									v-model="keyWord"
									placeholder="Please input"
									class="input-with-select"
									style="max-width: 500px;"
								>
									<template #prepend>
										<el-select v-model="tenantId" placeholder="Select" style="width: 115px">
											<el-option label="system" value="1" />
										</el-select>
									</template>
									<template #append>
										<el-button @click="searchRole">
											<el-icon><el-icon-search /></el-icon>
										</el-button>
									</template>
								</el-input>
							</div>
						</el-col>
						<el-col :span="2">
							<el-button @click="add" v-auth="'role::add'">添加</el-button>
						</el-col>
					</el-row>
				</div>
			</el-header>
		<el-main>
			<scTable ref="table" :apiObj="list.apiObj" row-key="id" stripe>
				<!-- <el-table-column type="selection" width="50"></el-table-column> -->
				<el-table-column label="角色名称" prop="name" width="150"></el-table-column>
				<el-table-column label="角色编码" prop="code" width="150"></el-table-column>
				<el-table-column label="排序" prop="sort" width="250"></el-table-column>
				<el-table-column label="状态" prop="status" width="150">
					<template #default="scope">
						<el-switch :value="String(scope.row.status)" disabled active-value="1" inactive-value="0" />
					</template>
				</el-table-column>
				<el-table-column label="数据权限" prop="dataScope" width="150" sortable></el-table-column>
				<el-table-column label="操作" fixed="right" align="right" width="160">
					<template #default="scope">
						<el-button-group>
							<el-button text type="primary" size="small">资源分配</el-button>
							<el-button text type="primary" size="small" @click="edit(scope.row, scope.$index)">编辑</el-button>
							<el-button text type="primary" size="small" @click="del(scope.row, scope.$index)">删除</el-button>
						</el-button-group>
					</template>
				</el-table-column>
			</scTable>
		</el-main>
	</el-container>
	<save-dialog v-if="dialog.save" ref="saveDialog" @success="handleSaveSuccess" @closed="dialog.save=false"></save-dialog>
</template>

<script>
import saveDialog from './save'
export default{
	name: 'role',
	data () {
		return {
			dialog: {
				save: false
			},
			spaceSize: 10,
			tenantId: '1',
			keyWord: '',
			list: {
				apiObj: this.$API.system_role.role.list
			}
		}
	},
	components: {
		saveDialog
	},
	methods: {
		searchRole(){
			this.$refs.table.upData({keywords: this.keyWord})
		},
		add(){
			this.dialog.save=true
			this.$nextTick(()=>{
				this.$refs.saveDialog.open()
			})
		},
		edit(row){
			this.dialog.save=true
			this.$nextTick(()=>{
				this.$refs.saveDialog.open("edit").setData(row)
			})
		},
		async del(row){
			console.log(this.$API.system_role.role)
			var res = await this.$API.system_role.role.del.delete(row.id)
			if(res.code == "10000"){
				this.$refs.table.refresh()
				ElMessage.success("删除成功")
			}else{
				ElMessageBox.alert(res.message, "提示", {type: 'error'})
			}
		},
		//本地更新数据
		handleSaveSuccess(data, mode){
			this.$refs.table.refresh()
		}
	}
}
</script>

<style>
</style>
