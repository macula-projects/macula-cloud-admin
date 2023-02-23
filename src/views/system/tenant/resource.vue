<template>
	<el-dialog title='租户权限设置' v-model="visible" :width="500" destroy-on-close @close="$emit('closed')">
		<template #default>
			<el-container>
				<el-tabs v-model="activeName" style="width: 100%;">
					 <el-tab-pane label="菜单权限" name="menu">
							<div class="treeMain">
								<el-container>
									<el-tree
										ref="menuTree"
										:data="menuList"
										show-checkbox
										:default-checked-keys="selectMenuList"
										node-key="id"
										highlight-current
										:props="defaultProps"
									/>
								</el-container>
							</div>
						</el-tab-pane>
						<el-tab-pane label="应用权限" name="application">
							<div class="treeMain">
								<el-container>
									<el-table
										ref="applicationTableRef"
										:data="applicationTableData"
										border
										style="width: 100%"
										row-key="id"
									>
										<el-table-column type="selection" width="35" />
										<el-table-column label="#" type="index" width="35"></el-table-column>
										<el-table-column property="applicationName" label="应用名称" width="170" show-overflow-tooltip />
										<el-table-column property="code" label="应用编码" show-overflow-tooltip />
									</el-table>
								</el-container>
							</div>
						</el-tab-pane>
						<el-tab-pane label="字典权限" name="dict">
							<div class="treeMain">
								<el-container>
									<el-container>
										<el-table
											ref="dictTableRef"
											:data="dictTypeTableData"
											border
											style="width: 100%"
											row-key="id"
										>
											<el-table-column type="selection" width="35" />
											<el-table-column label="#" type="index" width="35"></el-table-column>
											<el-table-column property="name" label="名称" width="170" show-overflow-tooltip />
											<el-table-column property="code" label="编码/键值" show-overflow-tooltip>
												<template #default="scope">{{scope.row.value ? scope.row.value : scope.row.code}}</template>
											</el-table-column>
										</el-table>
									</el-container>
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
			tenantCode: null,
			defaultProps: {
				label: (data) => {
					return data.name
				}
			},
			menuList: [],
			selectMenuList: [],
			applicationTableData: [],
			applicationTableDataMap: {},
			selectApplicationList: [],
			dictTypeTableData:[],
			dictTypeTableMap: {},
			selectDictTypeList: [],
			dictItemTableMap: {},
			selectDictItemList: []
		}
	},
	async created(){
	},
	watch: {
		
	},
	methods: {
		//加载菜单树数据
		async getMenu(params){
			var res = await this.$API.system_menu.menu.list.get(params)
			if(res.code === '10000') {
				this.menuList = res.data
			}
		},
		async getApplicationList(params){
			var res = await this.$API.system_application.application.list.get(params)
			if(res.code === '10000'){
				this.applicationTableData = res.data
				this.applicationTableDataMap = {}
				this.applicationTableData.forEach(item => {
					this.applicationTableDataMap[item.id] = item
				})
				this.$nextTick(()=>{
					this.selectApplicationList.forEach(item=>{
						if(this.applicationTableDataMap[item]){
							this.$refs.applicationTableRef.toggleRowSelection(this.applicationTableDataMap[item], true)
						}
					})
				})
			}
		},
		async getDictTypeList(params){
			var res = await this.$API.system_dict.dict.typeList.get(params)
			let tempData = []
			if(res.code === '10000'){
				tempData = res.data
				this.dictTypeTableMap = {}
				for(let i=0; i< tempData.length; i++){
					let item = tempData[i]
					this.dictTypeTableMap[item.id] = item
					await this.getDictItemList(item)
				}
				this.dictTypeTableData = tempData
			}
			this.$nextTick(()=>{
				this.selectDictTypeList.forEach(item=>{
					if(this.dictTypeTableMap[item]){
						this.$refs.dictTableRef.toggleRowSelection(this.dictTypeTableMap[item], true)
					}
				})
			})
			this.$nextTick(()=>{
				this.selectDictItemList.forEach(item=>{
					if(this.dictItemTableMap['item_'+item]){
						this.$refs.dictTableRef.toggleRowSelection(this.dictItemTableMap['item_'+item], true)
					}
				})
			})
		},
		async getDictItemList(dictType){
			var res = await this.$API.system_dict.dict.itemsList.get({typeCode: dictType.code})
			if(res.code === '10000'){
				let tmpData = res.data
				tmpData.forEach(item => {
					item.id = 'item_'+item.id
					this.dictItemTableMap[item.id] = item
				})
				dictType['children'] = tmpData
			}
		},
		open(){
			this.visible=true
			return this
		},
		async refreshResource(row){
			this.tenantId = row.id
			this.tenantCode = row.code
			const menuIdsRes = await this.$API.system_tenant.tenant.tenantMenu.get(row.id)
			if(menuIdsRes.code === '10000'){
				this.selectMenuList = menuIdsRes.data
			}
			this.getMenu()
			const applicationIdsRes = await this.$API.system_tenant.tenant.tenantApplication.get(row.id)
			if(applicationIdsRes.code === '10000'){
				this.selectApplicationList = applicationIdsRes.data
			}
			this.getApplicationList()
			const dictTypeIdsRes = await this.$API.system_tenant.tenant.tenantDict.get(row.id, {type: 0})
			if(dictTypeIdsRes.code === '10000'){
				this.selectDictTypeList = dictTypeIdsRes.data
			}
			const dictItemIdsRes = await this.$API.system_tenant.tenant.tenantDict.get(row.id, {type: 1})
			if(dictItemIdsRes.code === '10000'){
				this.selectDictItemList = dictItemIdsRes.data
			}
			this.getDictTypeList()
		},
		async submit(){
			if(this.tenantId){
				this.isSaveing = true
				await this.saveTenantMenu()
				await this.saveTenantApplication()
				await this.saveTenantDict()
				this.isSaveing = false
				ElMessage.success('保存成功！')
				this.visible = false;
				this.$emit('success')
			}else{
				ElMessage.warning('数据加载中，请稍后重试或重新加载！')
			}
		},
		async saveTenantMenu(){
			return await this.$API.system_tenant.tenant.putTenantMenu.put(this.tenantId, this.$refs.menuTree.getCheckedKeys(), this.tenantCode);
		},
		async saveTenantApplication(){
			return await this.$API.system_tenant.tenant.putTenantApplication.put(this.tenantId, this.$refs.applicationTableRef.getSelectionRows().map(item=>item.id), this.tenantCode);
		},
		async saveTenantDict(){
			let dictTypeIds = []
			let dictItemIds = []
			this.$refs.dictTableRef.getSelectionRows().forEach(item=>{
				if(typeof(item.id) ==='string' && item.id.indexOf('item_') === 0){
					dictItemIds.push(item.id.substr('item_'.length))
					return
				}
				dictTypeIds.push(item.id)
			})
			return await this.$API.system_tenant.tenant.putTenantDict.put(this.tenantId, {dictTypeIds: dictTypeIds, dictItemIds: dictItemIds}, this.tenantCode);
		}
	}
}
</script>

<style scoped>
	.treeMain {height:320px;overflow: auto;border: 1px solid #dcdfe6;margin-bottom: 10px;}
</style>
