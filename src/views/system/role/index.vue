<template>
	<el-container>
			<el-header>
				<div style="width: 100%">
					<el-row :gutter="20">
						<el-col :span="5">
							<div class="mt-4">
								<el-input
									v-model="keyWord"
									placeholder="输入角色名称或角色编码进行过滤"
									class="input-with-select"
								>
								</el-input>
							</div>
						</el-col>
						<el-col :span="2" :offset="17" style="text-align: right;">
								<el-button @click="add" type="primary" v-auth="'role::add'">添加</el-button>
						</el-col>
					</el-row>
				</div>
			</el-header>
		<el-main>
			<scTable ref="table" :apiObj="apiObj" row-key="id" stripe>
				<el-table-column label="#" type="index" width="50"></el-table-column>
				<el-table-column label="角色名称" prop="name" width="250"></el-table-column>
				<el-table-column label="角色编码" prop="code" width="250"></el-table-column>
				<el-table-column label="排序" prop="sort" width="120" sortable></el-table-column>
				<el-table-column label="状态" prop="status" width="120">
					<template #default="scope">
						<el-switch :model-value="String(scope.row.status)" disabled active-value="1" inactive-value="0" />
					</template>
				</el-table-column>
				<el-table-column label="数据权限" prop="dataScope" width="250">
					<template #default="scope">
						{{ dataScopeEnumValue[scope.row.dataScope] }}
					</template>
				</el-table-column>
				<el-table-column label="操作" fixed="right" align="right" width="250">
					<template #default="scope">
						<el-button-group>
							<el-button text type="primary" size="small">资源分配</el-button>
							<el-button text type="primary" size="small" @click="edit(scope.row, scope.$index)">编辑</el-button>
							<el-popconfirm title="确定删除吗？" @confirm="del(scope.row, scope.$index)">
								<template #reference>
									<el-button text type="danger" size="small">删除</el-button>
								</template>
							</el-popconfirm>
						</el-button-group>
					</template>
				</el-table-column>
			</scTable>
		</el-main>
	</el-container>
	<save-dialog v-if="dialog.save" ref="saveDialog" @success="handleSaveSuccess" @closed="dialog.save=false" :dataScopeEnum="dataScopeEnum"></save-dialog>
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
			keyWord: '',
			apiObj: this.$API.system_role.role.list,
			dataScopeEnum: [],
			dataScopeEnumValue: {}
		}
	},
	components: {
		saveDialog
	},
	watch: {
		keyWord(){
			this.searchRole()
		}
	},
	async created(){
		let dataScopeRes = await this.$API.system_role.role.optionsByDataScope.get()
		if(dataScopeRes.code === '10000'){
			this.dataScopeEnum = dataScopeRes.data
			this.handlerDataScopeEnum()
		}
	},
	methods: {
		handlerDataScopeEnum(){
			this.dataScopeEnum.forEach((item) => {
				this.dataScopeEnumValue[item.value] = item.label
			})
		},
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
