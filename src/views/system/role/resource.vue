<template>
	<el-dialog title='角色权限设置' v-model="visible" :width="500" destroy-on-close :before-close="updateValidtor" @close="$emit('closed')">
		<template #default>
			<el-container>
				<el-tabs v-model="activeName" style="width: 100%;">
					 <el-tab-pane label="菜单权限" name="menu">
							<div class="treeMain">
								<el-container>
									<el-main>
										<el-input v-model="menuFilterText" placeholder="输入关键字进行过滤" />
										<el-tree
											ref="menuTree"
											:data="menuList"
											show-checkbox
											default-expand-all
											:default-checked-keys="selectMenuList"
											node-key="id"
											highlight-current
											check-strictly
											:props="defaultProps"
											:filter-node-method="menuFilterNode"
											@check-change="nodeCheck"
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
						<el-tab-pane label="权限列表" name="permission">
						</el-tab-pane>
						<!-- <el-tab-pane label="数据权限" name="dataScope">
							<div class="treeMain">
								<el-container>
									<el-main>
										<el-form label-width="100px" label-position="left">
											<el-form-item label="规则类型">
												<el-select v-model="dataScope" placeholder="请选择">
													<el-option v-for="(item, index) in dataScopeEnum" :key="index" :label="item.label" :value="item.value"  ></el-option>
												</el-select>
											</el-form-item>
											<el-form-item label="选择部门" v-show="dataScope=='CUSTOM_DEPT'">
												<div class="treeMain" style="width: 100%; height: 170px;">
													<el-tree ref="dept" node-key="id" :data="deptList" :props="deptProps" show-checkbox></el-tree>
												</div>
											</el-form-item>
											<el-form-item label="规则值" v-show="dataScope=='CUSTOM'">
												<el-input v-model="dataScopeCustom" clearable type="textarea" :rows="6" placeholder="请输入自定义规则代码"></el-input>
											</el-form-item>
										</el-form>
									</el-main>
								</el-container>
							</div>
						</el-tab-pane> -->
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
			update: false,
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
			deptList: [],
			deptProps: {
				label: (data) => {
					return data.name
				}
			},
			dataScope: null,
			selectMenuList: [],
			roleId: null,
			menuTreeLoading: false,
			menuTreeNodeMap: {}
		}
	},
	async created(){
		const deptData = await this.$API.system_dept.dept.list.get()
		this.deptList = deptData.data
	},
	watch: {
		async menuFilterText(val){
			if(this.menuCurPage === 1){
				await this.getMenu({keywords: this.menuFilterText, pageNum: this.menuCurPage, pageSize: this.menuPageSize})
				this.$refs.menuTree.filter(this.menuFilterText);
			}else{
				this.menuCurPage = 1
			}
		},
		async menuCurPage(val){
			await this.getMenu({keywords: this.menuFilterText, pageNum: this.menuCurPage, pageSize: this.menuPageSize})
			this.$refs.menuTree.filter(this.menuFilterText);
		},
		async menuPageSize(val){
			if(this.menuCurPage === 1){
				await this.getMenu({keywords: this.menuFilterText, pageNum: this.menuCurPage, pageSize: this.menuPageSize})
				this.$refs.menuTree.filter(this.menuFilterText);
			}else{
				this.menuCurPage = 1
			}
		}
	},
	methods: {
		//加载树数据
		async getMenu(params){
			this.menuloading = true
			var res = await this.$API.system_menu.menu.pages.get(params);
			this.menuloading = false
			if(res.code === '10000') {
				this.menuList = res.data.records;
				this.menuCurPage = res.data.current
				this.menuPageSize = res.data.size
				this.menuTotal = res.data.total
			}
		},
		//树过滤
		menuFilterNode(value, data, node){
			if(!this.menuTreeLoading){
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
			await this.getMenu({pageNum: this.menuCurPage, pageSize: this.menuPageSize})
			this.$refs.menuTree.filter()
			this.menuTreeLoading = true
			const roleMenuIdsRes = await this.$API.system_role.role.getRoleMenuIds.get(this.roleId)
			if(roleMenuIdsRes.code === '10000'){
				this.selectMenuList = roleMenuIdsRes.data
			}
		},
		updateValidtor(done){
			if(this.update){
				ElMessageBox.confirm('权限信息已变更，退出保存不更新！')
				.then(() => {
					done()
				})
				.catch(() => {
					// catch error
				})
			}
			done()
		},
		async submit(){
			if(this.roleId){
				this.isSaveing = true
				this.selectMenuList.length = 0
				this.$refs.menuTree.getCheckedNodes(false,true).forEach(item => this.selectMenuList.push(item.id))
				const putRes = await this.$API.system_role.role.updateRoleMenus.put(this.roleId, this.selectMenuList)
				this.isSaveing = false
				if(putRes.code === '10000'){
					ElMessage.success('保存成功！')
					this.visible = false;
					this.$emit('success')
					return
				}
				ElMessage.error(`保存失败，${putRes.msg}`)
			}else{
				ElMessage.warning('数据加载中，请稍后重试或重新加载！')
			}
		}
	}
}
</script>

<style scoped>
	.treeMain {height:280px;overflow: auto;border: 1px solid #dcdfe6;margin-bottom: 10px;}
</style>
