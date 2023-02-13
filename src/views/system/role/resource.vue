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
											node-key="id"
											highlight-current
											:props="defaultProps"
											:filter-node-method="menuFilterNode"
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
						<el-tab-pane label="数据权限" name="dataScope">
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
			dataScope: null
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
		open(){
			this.visible=true
			return this
		},
		refreshResource(row){
			this.dataScope = row.dataScope
			this.getMenu({pageNum: this.menuCurPage, pageSize: this.menuPageSize})
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
		submit(){
			console.log('保存成功', this.$refs.menuTree.getCheckedNodes())
			this.$emit('success')
		}
	}
}
</script>

<style scoped>
	.el-dialog__body{
		padding: 0px 20px;
	}
	.treeMain {height:280px;overflow: auto;border: 1px solid #dcdfe6;margin-bottom: 10px;}
</style>
