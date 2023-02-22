<template>
	<el-dialog title='租户权限设置' v-model="visible" :width="500" destroy-on-close @close="$emit('closed')">
		<template #default>
			<el-container>
				<el-tabs v-model="activeName" style="width: 100%;">
					 <el-tab-pane label="菜单权限" name="menu">
							<div class="treeMain">
								<el-container>
									<el-main>
										<el-tree
											ref="menuTree"
											:data="menuList"
											show-checkbox
											:default-checked-keys="selectMenuList"
											node-key="id"
											highlight-current
											:props="defaultProps"
										/>
									</el-main>
								</el-container>
							</div>
						</el-tab-pane>
						<el-tab-pane label="应用权限" name="application">
							<div class="treeMain">
								<el-container>
									<el-header>
									</el-header>
									<el-main>
									</el-main>
									<el-footer>
									</el-footer>
								</el-container>
							</div>
						</el-tab-pane>
						<el-tab-pane label="字典权限" name="dict">
							<div class="treeMain">
								<el-container>
									<el-header>
									</el-header>
									<el-main>
									</el-main>
									<el-footer>
									</el-footer>
								</el-container>
							</div>
						</el-tab-pane>
				 </el-tabs>
			</el-container>
		</template>
		<template #footer>
			<el-button @click="visible=false" >取 消</el-button>
			<el-button type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
		</template>
	</el-dialog>
</template>

<script>
export default{
	emits: ['success', 'closed'],
	data(){
		return {
			visible: false,
			isSaveing: false,
			activeName: 'menu',
			tenantId: null,
			defaultProps: {
				label: (data) => {
					return data.name
				}
			},
			menuList: [],
			selectMenuList: [],
		}
	},
	async created(){
	},
	watch: {
		menuFilterText(){
			this.getMenu()
			//this.$refs.menuTree.filter(this.menuFilterText)
		}
	},
	methods: {
		//加载菜单树数据
		async getMenu(params){
			var res = await this.$API.system_menu.menu.list.get(params)
			if(res.code === '10000') {
				this.menuList = res.data
			}
		},
		open(){
			this.visible=true
			return this
		},
		async refreshResource(row){
			this.tenantId = row.id
			const roleMenuIdsRes = await this.$API.system_tenant.tenant.tenantMenu.get(row.id)
			if(roleMenuIdsRes.code === '10000'){
				this.selectMenuList = roleMenuIdsRes.data
			}
			this.getMenu()
		},
		async submit(){
			if(this.tenantId){
				this.isSaveing = true
				await this.saveTenantMenu()
				this.isSaveing = false
				ElMessage.success('保存成功！')
				this.visible = false;
				this.$emit('success')
			}else{
				ElMessage.warning('数据加载中，请稍后重试或重新加载！')
			}
		},
		async saveTenantMenu(){
			return await this.$API.system_tenant.tenant.putTenantMenu.put(this.tenantId, this.$refs.menuTree.getCheckedKeys());
		}
	}
}
</script>

<style scoped>
	.treeMain {height:320px;overflow: auto;border: 1px solid #dcdfe6;margin-bottom: 10px;}
</style>
