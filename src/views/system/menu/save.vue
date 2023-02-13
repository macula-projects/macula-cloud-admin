<template>
	<el-row :gutter="40">
		<el-col v-if="!form.id">
			<el-empty description="请选择左侧菜单后操作" :image-size="100"></el-empty>
		</el-col>
		<template v-else>
			<el-col :lg="12">
				<h2>{{form.meta.title || "新增菜单"}}</h2>
				<el-form :model="form" :rules="rules" ref="dialogForm" label-width="80px" label-position="left">
					<el-form-item label="显示名称" prop="meta.title">
						<el-input v-model="form.meta.title" clearable placeholder="菜单显示名字"></el-input>
					</el-form-item>
					<el-form-item label="上级菜单" prop="parentId">
						<el-cascader v-model="form.parentId" :options="menuOptions" :props="menuProps" :show-all-levels="false" placeholder="顶级菜单" clearable disabled></el-cascader>
					</el-form-item>
					<el-form-item label="类型" prop="meta.type">
						<el-radio-group v-model="form.meta.type">
							<el-radio-button :disabled="!isCatalog" label="CATALOG">目录</el-radio-button>
							<el-radio-button :disabled="isButton" label="MENU">菜单</el-radio-button>
							<el-radio-button :disabled="isButton" label="EXTLINK">外链</el-radio-button>
							<el-radio-button :disabled="isButton" label="IFRAME">Iframe</el-radio-button>
							<el-radio-button :disabled="isCatalog" label="BUTTON">按钮</el-radio-button>
						</el-radio-group>
						<div class="el-form-item-msg">菜单、Iframe和外链是同级显示</div>
					</el-form-item>
					<el-form-item label="权限标识" prop="perm" v-if="form.meta.type === 'BUTTON'">
						<el-input v-model="form.perm" clearable placeholder="按钮权限标识"></el-input>
						<div class="el-form-item-msg">目录、菜单、Iframe或外链等不需要权限标识</div>
					</el-form-item>
					<el-form-item label="菜单图标" prop="meta.icon" v-if="form.meta.type !== 'BUTTON'">
						<sc-icon-select v-model="form.meta.icon" clearable></sc-icon-select>
					</el-form-item>
					<el-form-item label="路由地址" prop="path" v-if="form.meta.type !== 'BUTTON'">
						<el-input v-model="form.path" clearable placeholder=""></el-input>
					</el-form-item>
					<el-form-item label="重定向" prop="redirect" v-if="form.meta.type === 'MENU'">
						<el-input v-model="form.redirect" clearable placeholder=""></el-input>
					</el-form-item>
					<el-form-item label="视图" prop="component" v-if="form.meta.type === 'MENU'">
						<el-input v-model="form.component" clearable placeholder="">
							<template #prepend>views/</template>
						</el-input>
						<div class="el-form-item-msg">如父节点、链接或Iframe等没有视图的菜单不需要填写</div>
					</el-form-item>
					<el-form-item label="排序" prop="sort" v-if="form.meta.type !== 'BUTTON'">
						<el-input-number v-model="form.sort" controls-position="right" size="large"/>
						<div class="el-form-item-msg">菜单排序越小越前</div>
					</el-form-item>
					<el-form-item label="是否显示" prop="meta.visible" v-if="form.meta.type !== 'BUTTON'">
						<el-checkbox v-model="form.meta.visible">显示菜单</el-checkbox>
					</el-form-item>
					<el-form-item label="标签" prop="tag" v-if="form.meta.type !== 'BUTTON'">
						<el-input v-model="form.meta.tag" clearable placeholder=""></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="save" :loading="loading">保 存</el-button>
					</el-form-item>
				</el-form>

			</el-col>
			<el-col :lg="12" class="apilist">
				<h2>接口权限</h2>
				<sc-form-table v-model="form.apiList" :addTemplate="apiListAddTemplate" placeholder="暂无匹配接口权限">
					<el-table-column prop="code" label="标识" width="150">
						<template #default="scope">
							<el-input v-model="scope.row.code" placeholder="请输入内容"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="url" label="Api url">
						<template #default="scope">
							<el-input v-model="scope.row.url" placeholder="请输入内容"></el-input>
						</template>
					</el-table-column>
				</sc-form-table>
			</el-col>
		</template>
	</el-row>

</template>

<script>
	export default {
		props: {
			menu: { type: Object, default: () => {} },
		},
		data(){
			let that = this;
			return {
				form: {
					id: "",
					parentId: "",
					perm: "",
					path: "",
					component: "",
					redirect: "",
					meta:{
						title: "",
						icon: "",
						active: "",
						color: "",
						type: "MENU",
						fullpage: false,
						tag: "",
					},
					apiList: []
				},
				menuOptions: [],
				menuProps: {
					value: 'id',
					label: 'title',
					checkStrictly: true
				},
				predefineColors: [
					'#ff4500',
					'#ff8c00',
					'#ffd700',
					'#67C23A',
					'#00ced1',
					'#409EFF',
					'#c71585'
				],
				rules: {
					meta: {
						title: [{required: true, message: '名称不能为空', trigger: 'blur'}]
					},
					sort: [{required: false}],
					path: [{required: true, message: '路径不能为空',trigger: 'blur'}]
				},
				apiListAddTemplate: {
					code: "",
					url: ""
				},
				loading: false,
				isButton: false,
				isCatalog: false
			}
		},
		watch: {
			menu: {
				handler(){
					this.menuOptions = this.treeToMap(this.menu)
				},
				deep: true
			}
		},
		mounted() {

		},
		methods: {
			//简单化菜单
			treeToMap(tree){
				const map = []
				tree.forEach(item => {
					var obj = {
						id: item.id,
						parentId: item.parentId,
						title: item.meta.title,
						children: item.children&&item.children.length>0 ? this.treeToMap(item.children) : null
					}
					map.push(obj)
				})
				return map
			},
			//处理保存的菜单数据
			handlerMenu(form){
				if(form.meta.type === 'BUTTON'){
					form.meta.visible = true
					form.meta.tag = ''
					form.path = ''
					form.redirect = ''
					form.meta.icon = ''
				} else {
					form.perm = ''
				}
			},
			//保存
			async save(){
				var valid = await this.$refs.dialogForm.validate(valid => valid);
				if(!valid) {
					return
				}
				this.loading = true
				this.handlerMenu(this.form)
				var res = await this.$API.system_menu.menu.add.post(this.form)
				this.loading = false
				if(res.code === "10000"){
					if (this.form.apiList) {
						this.form.apiList.forEach(apiList => {
							var key = `${apiList.code}_${apiList.url}`
							if (!apiList.id && res.data.apiList[key]) {
								apiList.id = res.data.apiList[key].id
							}
						})
					}
					ElMessage.success("保存成功")
				}else{
					ElMessage.warning(res.message)
				}
			},
			//表单注入数据
			setData(data, pid){
				this.form = data
				this.form.apiList = data.apiList || []
				this.form.parentId = pid
				if(data.meta){
					this.isCatalog = data.meta.type === 'CATALOG'
					this.isButton = data.meta.type === 'BUTTON'
				}
			}
		}
	}
</script>

<style scoped>
	h2 {font-size: 17px;color: #3c4a54;padding:0 0 30px 0;}
	.apilist {border-left: 1px solid #eee;}

	[data-theme="dark"] h2 {color: #fff;}
	[data-theme="dark"] .apilist {border-color: #434343;}
</style>
