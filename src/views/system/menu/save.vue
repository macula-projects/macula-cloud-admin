<template>
	<el-row :gutter="40">
		<el-col v-if="!form.id">
			<el-empty description="请选择左侧菜单后操作" :image-size="100"></el-empty>
		</el-col>
		<template v-else>
			<el-col :lg="12">
				<h2>{{form.name || "新增菜单"}}</h2>
				<el-form :model="form" :rules="rules" ref="dialogForm" label-width="80px" label-position="left">
					<el-form-item label="显示名称" prop="name">
						<el-input v-model="form.name" clearable placeholder="菜单显示名字"></el-input>
					</el-form-item>
					<el-form-item label="上级菜单" prop="parentId">
						<el-cascader v-model="form.parentId" :options="menuOptions" :props="menuProps" :show-all-levels="false" placeholder="顶级菜单" clearable disabled></el-cascader>
					</el-form-item>
					<el-form-item label="类型" prop="type">
						<el-radio-group v-model="form.type">
							<el-radio-button :disabled="!isCatalog" label="CATALOG">目录</el-radio-button>
							<el-radio-button :disabled="isButton || onlyCatalog" label="MENU">菜单</el-radio-button>
							<el-radio-button :disabled="isButton || onlyCatalog" label="LINK">外链</el-radio-button>
							<el-radio-button :disabled="isButton || onlyCatalog" label="IFRAME">Iframe</el-radio-button>
							<el-radio-button :disabled="isCatalog" label="BUTTON">按钮</el-radio-button>
						</el-radio-group>
						<div class="el-form-item-msg">菜单、Iframe和外链是同级显示</div>
					</el-form-item>
					<el-form-item label="权限标识" prop="perm" v-if="form.type === 'BUTTON'">
						<el-input v-model="form.perm" clearable placeholder="按钮权限标识"></el-input>
						<div class="el-form-item-msg">目录、菜单、Iframe或外链等不需要权限标识</div>
					</el-form-item>
					<el-form-item label="菜单图标" prop="meta.icon" v-if="form.type !== 'BUTTON'">
						<sc-icon-select v-model="form.icon" clearable></sc-icon-select>
					</el-form-item>
					<el-form-item label="路由地址" prop="path" v-if="form.type !== 'BUTTON'">
						<el-input v-model="form.path" clearable placeholder=""></el-input>
						<div class="el-form-item-msg">目录路由必须以/开头</div>
					</el-form-item>
					<el-form-item label="重定向" prop="redirect" v-if="form.type === 'MENU'">
						<el-input v-model="form.redirect" clearable placeholder=""></el-input>
					</el-form-item>
					<el-form-item label="视图" prop="component" v-if="form.type === 'MENU'">
						<el-input v-model="form.component" clearable placeholder="">
							<template #prepend>views/</template>
						</el-input>
						<div class="el-form-item-msg">如父节点、链接或Iframe等没有视图的菜单不需要填写</div>
					</el-form-item>
					<el-form-item label="排序" prop="sort" v-if="form.type !== 'BUTTON'">
						<el-input-number v-model="form.sort" controls-position="right" size="large"/>
						<div class="el-form-item-msg">菜单排序越小越前</div>
					</el-form-item>
					<el-form-item label="是否显示" prop="meta.visible" v-if="form.type !== 'BUTTON'">
						<el-checkbox v-model="form.visible" :true-label="1" :false-label="0">显示菜单</el-checkbox>
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
							<el-popover :visible="scope.row.codeErrMsgVisible" placement="bottom" popper-style="padding: 0px;">
								<el-tag
										class="mx-1"
										type="danger"
										style="width: 100%;"
									>
										{{ scope.row.codeErrMsg }}
									</el-tag>
								<template #reference>
									<el-input ref="apiListCodeRef"  v-model="scope.row.code" placeholder="请输入内容"></el-input>
								</template>
							</el-popover>
						</template>
					</el-table-column>
					<el-table-column prop="url" label="Api url">
						<template #default="scope">
							<el-popover :visible="scope.row.urlErrMsgVisible" placement="bottom" popper-style="padding: 0px;">
								<el-tag
										class="mx-1"
										type="danger"
										style="width: 100%;"
									>
										{{ scope.row.urlErrMsg }}
									</el-tag>
								<template #reference>
									<el-input ref="apiListUrlRef" v-model="scope.row.url" placeholder="请输入内容"></el-input>
								</template>
							</el-popover>
						</template>
					</el-table-column>
					<el-table-column prop="method" label="请求方式">
						<template #default="scope">
							<el-select v-model="scope.row.method">
								<el-option v-for="(item, index) in methodOptions" :key="index" :label="item.label" :value="item.value"></el-option>
							</el-select>
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
					name: "",
					path: "",
					component: "",
					type: "MENU",
					icon: '',
					visible: 1,
					sort: 0,
					perm: '',
					redirect: '',
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
					name: [{required: true, message: '名称不能为空', trigger: 'blur'}],
					sort: [{required: false}],
					path: [{required: true, message: '路径不能为空',trigger: 'blur'}]
				},
				apiListAddTemplate: {
					id: "",
					code: "",
					url: "",
					method: "GET",
					urlErrMsgVisible: false,
					codeErrMsgVisible: false
				},
				loading: false,
				isButton: false,
				isCatalog: false,
				onlyCatalog: false,
				methodOptions: [],
				apiListValidtor: true,
				apiListValidObj:{}
			}
		},
		watch: {
			menu: {
				handler(){
					this.menuOptions = this.treeToMap(this.menu)
				},
				deep: true
			},
			'form.path': {
				handler(){
					this.form.routePath = this.form.path
				}
			}
		},
		async created() {
			const methodOptionRes = await this.$API.system_menu.menu.methodOption.get()
			if(methodOptionRes.success){
				this.methodOptions = methodOptionRes.data
			}
		},
		mounted() {

		},
		methods: {
			async validApiUrlParam(){
				this.apiListValidObj={}
				this.apiListValidtor = true
				let requestValidApi = this.form.apiList.filter(api=>{
					let key = api.id+"::"+api.code +":"+api.url+":"+api.method
					if(this.apiListValidObj[key] && !this.apiListValidObj[key]['data'].id && !api.id){
						api['urlVisible'] = true
						api['urlErrMsg'] = 'url与请求方式已存在'
						this.apiListValidtor = false
						return false
					}
					this.apiListValidObj[key] = {data: api}
					let apiCodeFlag = this.validtorApiCode(api.code, api)
					let apiUrlFlag = this.validtorApiUrl(api.url, api)
					if(!apiCodeFlag || !apiUrlFlag){
						this.apiListValidtor = false
					}
					return apiUrlFlag
				})
				if(requestValidApi.length>0){
					await this.handlerRequestApiUrlValid(requestValidApi)
				}
			},
			async handlerRequestApiUrlValid(requestValidApi){
				let validOptionsRes = await this.$API.system_permission.permission.validtorUrlPerm.post(requestValidApi)
				if(validOptionsRes.success){
					validOptionsRes.data.forEach(item=>{
						this.apiListValidObj[item.label]['data']['urlErrMsg'] = item.value ? '' : 'url与请求方式已存在'
						this.apiListValidObj[item.label]['data']['urlVisible'] = !item.value
						if(!item.value){
							this.apiListValidtor = false
						}
					})
				} else {
					ElMessage.error('权限路径验证失败，请刷新重试！')
				}
			},
			//简单化菜单
			treeToMap(tree){
				const map = []
				tree.forEach(item => {
					var obj = {
						id: item.id,
						parentId: item.parentId,
						title: item.name,
						children: item.children&&item.children.length>0 ? this.treeToMap(item.children) : null
					}
					map.push(obj)
				})
				return map
			},
			//处理保存的菜单数据
			handlerMenu(form){
				// VO对象是form对象差距补偿
				form.routePath = form.path
				if(form.type === 'BUTTON'){
					form.visible = 1
					form.path = ''
					form.redirect = ''
					form.icon = ''
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
				await this.validApiUrlParam()
				if(!this.apiListValidtor){
					ElMessage.error('接口权限数据错误，请完善后点击保存！')
					this.loading = false
					return
				}
				var res = await this.$API.system_menu.menu.update.put(this.form.id, this.form)
				if(!res.success){
					ElMessageBox.alert(res.cause || res.msg, "提示", {type: 'error'})
					return
				}
				ElMessage.success('保存成功！')
				this.loading = false
				this.loadPermissionList(this.form)
			},
			//表单注入数据
			setData(data, pid){
				this.form = data
				data.createTime = null
				this.form.path = data.routePath
				this.form.parentId = pid
				this.isCatalog = data.type === 'CATALOG'
				this.isButton = data.type === 'BUTTON'
				this.onlyCatalog = data.type === 'CATALOG' && data.children && data.children.length !== 0
				this.loadPermissionList(data)
			},
			async loadPermissionList(menuData){
				if(!menuData.id){
					this.form.apiList = []
					return
				}
				let permListRes = await this.$API.system_permission.permission.list.get({menuId: menuData.id})
				if(permListRes.success){
					this.form.apiList = permListRes.data.map(item=>({
						id: item.id,
						code: item.name,
						url: item.urlPerm.split(":")[1],
						method: item.urlPerm.split(":")[0],
						codeErrMsgVisible: false,
						urlErrMsgVisible: false
					}))
					return
				}
				ElMessage.error('加载菜单权限列表失败！请重试！')
			},
			validtorApiCode(code, apiData){
				if(code.trim().length === 0){
					apiData['codeErrMsg'] = '标识不能为空'
					apiData['codeVisible'] = true
					return false
				}
				const reg = /^([\u4e00-\u9fa5]|[a-z]|[A-Z]|[0-9]|[_]|[\.])*$/
				if(!reg.test(code)){
					apiData['codeErrMsg'] = '标识含非法字符'
					apiData['codeVisible'] = true
					return false
				}
				apiData['codeVisible'] = false
				return true
			},
			validtorApiUrl(url, apiData){
				if(url.trim().length === 0){
					apiData['urlErrMsg'] = 'url不能为空'
					apiData['urlVisible'] = true
					return false
				}
				const reg = /^(\/[a-zA-Z0-9_#?&*]*)+$/
				if(!reg.test(url)){
					apiData['urlErrMsg'] = 'url含非法字符'
					apiData['urlVisible'] = true
					return false
				}
				apiData['urlVisible'] = false
				return true
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
