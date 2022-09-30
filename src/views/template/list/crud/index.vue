<template>
	<el-container>
		<el-header>
			<div class="left-panel">
				<el-button type="primary" icon="el-icon-plus" @click="add">弹窗新增</el-button>
				<el-button type="primary" icon="el-icon-plus" @click="addPage">页面新增</el-button>
				<el-button type="danger" plain icon="el-icon-delete" :disabled="selection.length==0" @click="batch_del">删除</el-button>
			</div>
			<div class="right-panel">
				<div class="right-panel-search">
					<el-input v-model="search.keyword" placeholder="关键词" clearable></el-input>
					<el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
					<scFilterBar filterName="filterName" :options="options" @filterChange="change">
						<template #default="{filterLength, openFilter}">
							<el-badge :value="filterLength" type="danger" :hidden="filterLength<=0">
								<el-button icon="el-icon-filter" @click="openFilter"></el-button>
							</el-badge>
						</template>
					</scFilterBar>
				</div>
			</div>
		</el-header>
		<el-main class="nopadding">
			<scTable ref="table" :apiObj="list.apiObj" row-key="id" @selection-change="selectionChange" stripe>
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column label="姓名" prop="name" width="180"></el-table-column>
				<el-table-column label="性别" prop="sex" width="150"></el-table-column>
				<el-table-column label="邮箱" prop="email" width="250"></el-table-column>
				<el-table-column label="状态" prop="boolean" width="60">
					<template #default="scope">
						<sc-status-indicator v-if="scope.row.boolean" type="success"></sc-status-indicator>
						<sc-status-indicator v-if="!scope.row.boolean" pulse type="danger"></sc-status-indicator>
					</template>
				</el-table-column>
				<el-table-column label="评分" prop="num" width="150"></el-table-column>
				<el-table-column label="操作" fixed="right" align="right" width="300">
					<template #default="scope">
						<el-button plain size="small" @click="table_show(scope.row)">查看</el-button>
						<el-button type="primary" plain size="small" @click="table_edit(scope.row)">编辑</el-button>
						<el-button type="primary" plain size="small" @click="table_edit_page(scope.row)">页面编辑</el-button>
						<el-popconfirm title="确定删除吗？" @confirm="table_del(scope.row, scope.$index)">
							<template #reference>
								<el-button plain type="danger" size="small">删除</el-button>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</scTable>
		</el-main>
	</el-container>

	<save-dialog v-if="dialog.save" ref="saveDialog" @success="handleSaveSuccess" @closed="dialog.save=false"></save-dialog>

	<el-drawer v-model="dialog.info" :size="800" title="详细" custom-class="drawerBG" direction="rtl" destroy-on-close>
		<info ref="infoDialog"></info>
	</el-drawer>

</template>

<script>
	import saveDialog from './save'
	import info from './info'

	export default {
		name: 'listCrud',
		components: {
			saveDialog,
			info
		},
		data() {
			return {
				dialog:{
					save: false,
					info: false
				},
				list: {
					apiObj: this.$API.demo.list
				},
				selection: [],
				search: {
					keyword: ""
				},
				filterData : {},
				defaultFilter : [],
				options: [
					{
						label: '订单号',
						value: 'id',
						type: 'text',
						selected: true,
						placeholder: '请输入订单号'
					},
					{
						label: '类型',
						value: 'type',
						type: 'select',
						operator: '=',
						selected: true,
						placeholder: '请选择类型',
						extend: {
							data:[
								{
									label: "选项1",
									value: "1"
								},
								{
									label: "选项2",
									value: "2"
								}
							]
						}
					},
					{
						label: '类型(多选)',
						value: 'type2',
						type: 'select',
						operator: '=',
						placeholder: '请选择类型',
						extend: {
							multiple: true,
							data:[
								{
									label: "选项1",
									value: "1"
								},
								{
									label: "选项2",
									value: "2"
								}
							]
						}
					},
					{
						label: '通知(异步)',
						value: 'noticeType',
						type: 'select',
						operator: '=',
						placeholder: '请选择通知类型',
						extend: {
							request: async () => {
								var list = await this.$API.system.dic.get.get()
								return list.data.map(item => {
									return {
										label: item.label,
										value: item.value
									}
								})
							}
						}
					},
					{
						label: '通知(远程搜索)',
						value: 'noticeType2',
						type: 'select',
						operator: '=',
						placeholder: '请输入关键词后检索',
						extend: {
							remote: true,
							request: async (query) => {
								var data = {
									keyword: query,
								}
								var list = await this.$API.system.dic.get.get(data)
								return list.data.map(item => {
									return {
										label: item.label,
										value: item.value
									}
								})
							}
						}
					},
					{
						label: '关键词(标签)',
						value: 'tags',
						type: 'tags',
						operator: 'include',
						operators: [
							{
								label: '包含',
								value: 'include',
							},
							{
								label: '不包含',
								value: 'notinclude',
							}
						]
					},
					{
						label: '开关',
						value: 'switch',
						type: 'switch',
						operator: '='
					},
					{
						label: '日期单选',
						value: 'date',
						type: 'date',
						operator: '=',
						operators: [
							{
								label: '等于',
								value: '=',
							},
							{
								label: '不等于',
								value: '!=',
							}
						]
					},
					{
						label: '日期范围',
						value: 'date2',
						type: 'daterange'
					}
				]
			}
		},
		mounted() {

		},
		methods: {
			//窗口新增
			add(){
				this.dialog.save = true
				this.$nextTick(() => {
					this.$refs.saveDialog.open()
				})
			},
			//窗口编辑
			table_edit(row){
				this.dialog.save = true
				this.$nextTick(() => {
					this.$refs.saveDialog.open('edit').setData(row)
				})
			},
			//页面新增
			addPage(){
				this.$router.push({
					path: '/template/list/crud/detail',
				})
			},
			//页面编辑
			table_edit_page(row){
				this.$router.push({
					path: '/template/list/crud/detail',
					query: {
						id: row.id
					}
				})
			},
			//查看
			table_show(row){
				this.dialog.info = true
				this.$nextTick(() => {
					this.$refs.infoDialog.setData(row)
				})
			},
			//删除明细
			async table_del(row, index){
				var reqData = {id: row.id}
				var res = await this.$API.demo.post.post(reqData);
				if(res.code == 200){
					this.$refs.table.removeIndex(index)
					ElMessage.success("删除成功")
				}else{
					ElMessageBox.alert(res.message, "提示", {type: 'error'})
				}
			},
			//批量删除
			async batch_del(){
				var confirmRes = await ElMessageBox.confirm(`确定删除选中的 ${this.selection.length} 项吗？`, '提示', {
					type: 'warning',
					confirmButtonText: '删除',
					confirmButtonClass: 'el-button--danger'
				}).catch(() => {})

				if(!confirmRes){
					return false
				}

				var ids = this.selection.map(v => v.id)
				this.$refs.table.removeKeys(ids)
				ElMessage.success("操作成功")

			},
			//表格选择后回调事件
			selectionChange(selection){
				this.selection = selection
			},
			//本地更新数据
			handleSaveSuccess(data, mode){
				//为了减少网络请求，直接变更表格内存数据
				if(mode=='add'){
					this.$refs.table.unshiftRow(data)
				}else if(mode=='edit'){
					this.$refs.table.updateKey(data)
				}

				//当然也可以暴力的直接刷新表格
				// this.$refs.table.refresh()
			},
			//搜索
			upsearch(){
				this.$refs.table.upData(this.search)
			},
			change(data){
				this.filterData = data;
			}
		}
	}
</script>

<style>
</style>
