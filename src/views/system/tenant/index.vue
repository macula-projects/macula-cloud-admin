<template>
	<el-container>
		<el-header>
			<div style="width: 100%">
				<el-row :gutter="20">
					<el-col :span="5">
						<div class="mt-4">
							<el-input
								v-model="keyWord"
								placeholder="输入租户名称或租户编码进行过滤"
								class="input-with-select"
							>
							</el-input>
						</div>
					</el-col>
					<el-col :span="2" style="text-align: right;">
							<el-button @click="add" type="primary">添加</el-button>
					</el-col>
				</el-row>
			</div>
		</el-header>
		<el-main>
			<scTable ref="table" :apiObj="apiObj" row-key="id" stripe>
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column label="#" type="index" width="50"></el-table-column>
				<el-table-column label="租户名称" prop="name" width="250"></el-table-column>
				<el-table-column label="租户编码" prop="code" width="250"></el-table-column>
				<el-table-column label="负责人" prop="supervisor" width="120"></el-table-column>
				<el-table-column label="描述" prop="description" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" fixed="right" align="right" width="250">
					<template #default="scope">
						<el-button-group>
							<el-button text type="primary" size="small" @click="resource(scope.row)">资源分配</el-button>
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
</template>

<script>
export default{
	name: 'tenant',
	data(){
		let that =this
		return{
			keyWord: '',
			apiObj: this.$API.system_tenant.tenant.pages
		}
	},
	methods: {
		add(){
			
		},
		resource(row){
			
		},
		edit(row, index){
			
		},
		del(row, index){
			
		}
	}
}
</script>

<style>
</style>
