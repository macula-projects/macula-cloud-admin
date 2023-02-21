<template>
	<el-dialog title='角色权限设置' v-model="visible" :width="500" destroy-on-close @close="$emit('closed')">
		<template #default>
			<el-container>
				<el-tabs v-model="activeName" style="width: 100%;">
					 <el-tab-pane label="菜单权限" name="menu">
							<div class="treeMain">
								<el-container>
									<el-header>
										<el-input v-model="menuFilterText" placeholder="输入关键字进行过滤" />
									</el-header>
									<el-main>
										<el-tree
											ref="menuTree"
											:data="menuList"
											show-checkbox
											:default-checked-keys="selectMenuList"
											:default-expanded-keys="selectMenuList"
											node-key="id"
											highlight-current
											check-strictly
											:props="defaultProps"
											:filter-node-method="menuFilterNode"
											@check-change="nodeCheck"
											@check="menuUpdateFlag=true"
										/>
									</el-main>
									<el-footer>
										<el-pagination
											v-model:current-page="menuCurPage"
											v-model:page-size="menuPageSize"
											:page-sizes="[5, 10, 20, 30, 50, 100]"
											small
											background
											layout="total, sizes, prev, pager, next"
											:total="menuTotal"
										/>
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
export default {
	emits: ['success', 'closed'],
	props: {
		dataScopeEnum: {type: Array, default: []}
	},
	data(){
		return {
			visible: false,
			isSaveing: false,
			activeName: 'menu',
			menuFilterText: '',
			defaultProps: {
				label: (data) => {
					return data.meta.title
				}
			},
			menuList: [],
			menuTotal: 0,
			menuCurPage: 1,
			menuPageSize: 10,
			dataScopeCustom: '',
			dataScope: null,
			selectMenuList: [],
			roleId: null,
			menuTreeLoading: false,
			menuTreeNodeMap: {},
			curPageMenuIds: [],
			menuUpdateFlag: false
		}
	},
	async created(){
		
	},
	watch: {
		async menuFilterText(val){
			if(this.menuCurPage === 1){
				await this.getMenu({keywords: this.menuFilterText, pageNum: this.menuCurPage, pageSize: this.menuPageSize})
			}else{
				this.menuCurPage = 1
			}
		},
		async menuCurPage(val){
			await this.getMenu({keywords: this.menuFilterText, pageNum: this.menuCurPage, pageSize: this.menuPageSize})
		},
		async menuPageSize(val){
			if(this.menuCurPage === 1){
				await this.getMenu({keywords: this.menuFilterText, pageNum: this.menuCurPage, pageSize: this.menuPageSize})
			}else{
				this.menuCurPage = 1
			}
		}
	},
	methods: {
		loadingPageMenuIds(data){
			this.curPageMenuIds=[]
			this.loopLoadPageMenuIds(data)
		},
		loopLoadPageMenuIds(data){
			data.forEach(item=>{
				this.curPageMenuIds.push(item.id)
				if(item.children && item.children.length>0){
					this.loopLoadPageMenuIds(item.children)
				}
			})
		},
		//加载菜单树数据
		async getMenu(params){
			this.menuloading = true
			var res = await this.$API.system_menu.menu.pages.get(params)
			this.menuloading = false
			if(res.code === '10000') {
				this.menuList = res.data.records
				this.loadingPageMenuIds(this.menuList)
				this.menuCurPage = res.data.current
				this.menuPageSize = res.data.size
				this.menuTotal = res.data.total
				this.$nextTick(()=>{
					this.$refs.menuTree.filter(this.menuFilterText)
				})
			}
		},
		//树过滤
		menuFilterNode(value, data, node){
			if(!this.menuTreeNodeMap[data.id]){
				this.menuTreeNodeMap[data.id] = {
					'cur': node,
					'parent': this.getParentNode(data),
					'children': this.getChildNode(node)
				}
			}
			if (!value) {
				return true;
			}
			var targetText = data.meta.title
			var filter = targetText.indexOf(value) !== -1
			if(filter && node.childNodes){
				node.childNodes.forEach(tempNode => {
					tempNode.data.filter=true
				})
			}
			var parentFilter = data.filter
			data.filter = false
			return filter || parentFilter;
		},
		getParentNode(data){
			let parentNodes = []
			this.loopLoadParentNode(data, parentNodes)
			return parentNodes
		},
		loopLoadParentNode(data, parentNodes){
			if(data.parentId && this.menuTreeNodeMap[data.parentId]){
				let parentNode = this.menuTreeNodeMap[data.parentId]['cur']
				this.loopLoadParentNode(parentNode.data, parentNodes)
				parentNodes.push(parentNode)
			}
		},
		getChildNode(node){
			let childrenNodes = []
			this.loopLoadChildNode(childrenNodes, node)
			return childrenNodes
		},
		loopLoadChildNode(childrenNodes, node){
			if(node && node.childNodes.length>0){
				node.childNodes.forEach(tmpNode=>{
					this.loopLoadChildNode(childrenNodes, tmpNode)
					childrenNodes.push(tmpNode)
				})
			}
		},
		nodeCheck(data, curNodeState){
			if(curNodeState){
				this.menuTreeNodeMap[data.id]['parent'].forEach(parentNode=>this.$refs.menuTree.setChecked(parentNode.data, curNodeState))
			}else{
				this.menuTreeNodeMap[data.id]['children'].forEach(childrenNode=>this.$refs.menuTree.setChecked(childrenNode.data, curNodeState))
			}
		},
		open(){
			this.visible=true
			return this
		},
		async refreshResource(row){
			this.roleId = row.id
			this.dataScope = row.dataScope
			const roleMenuIdsRes = await this.$API.system_role.role.getRoleMenuIds.get(this.roleId)
			if(roleMenuIdsRes.code === '10000'){
				this.selectMenuList = roleMenuIdsRes.data
			}
			this.getMenu({pageNum: this.menuCurPage, pageSize: this.menuPageSize})
		},
		async submit(){
			if(this.roleId){
				this.isSaveing = true
				await this.updateMenuIds()
				this.isSaveing = false
				ElMessage.success('保存成功！')
				this.visible = false;
				this.$emit('success')
			}else{
				ElMessage.warning('数据加载中，请稍后重试或重新加载！')
			}
		},
		async updateMenuIds(){
			this.selectMenuList.length = 0
			this.$refs.menuTree.getCheckedNodes(false,true).forEach(item => this.selectMenuList.push(item.id))
			const putMenusRes = await this.$API.system_role.role.updateRoleMenus.put(this.roleId, {curPage: this.curPageMenuIds, curSel: this.selectMenuList})
			if(putMenusRes.code === '10000'){
				return
			}
			
		}
	}
}
</script>

<style scoped>
	.treeMain {height:320px;overflow: auto;border: 1px solid #dcdfe6;margin-bottom: 10px;}
</style>
