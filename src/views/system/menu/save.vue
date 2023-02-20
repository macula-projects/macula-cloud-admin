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
					<el-form-item label="路由地址" prop="path" v-if="form.meta.type !== 'BUTTON' && form.meta.type !== 'CATALOG'">
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
				<el-form>
					<sc-form-table v-model="form.apiList" :addTemplate="apiListAddTemplate" placeholder="暂无匹配接口权限">
						<el-table-column prop="code" label="标识" width="150">
							<template #default="scope">
								<el-popover :visible="scope.row.codeVisible" placement="bottom" popper-style="padding: 0px;">
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
								<el-popover :visible="scope.row.urlVisible" placement="bottom" popper-style="padding: 0px;">
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
				</el-form>
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
					url: "",
					method: "GET"
				},
				loading: false,
				isButton: false,
				isCatalog: false,
				methodOptions: [],
				apiListValidtor: true,
				apiListValidObj:{},
				apiListValidObjLoading: true
			}
		},
		watch: {
			menu: {
				handler(){
					this.menuOptions = this.treeToMap(this.menu)
				},
				deep: true
			},
			'form.apiList': {
				handler(newV, oldV){
					if(newV && this.apiListValidObjLoading){
						this.apiListValidObjLoading = false
						this.apiListValidtor=true
						newV.forEach(api=> {
							let key = api.code +":"+api.url+":"+api.method
							this.apiListValidObj[key] = false
							api['codeVisible'] = !this.validtorApiCode(api.code, api)
							api['urlVisible'] = !this.validtorApiUrl(api.url, api)
							if(api['codeVisible'] || api['urlVisible']) {
								this.apiListValidtor = false
							} 
						})
					}
				},
				deep: true
			},
			apiListValidObj: {
				handler(newV, oldV){
					if(JSON.stringify(newV) === '{}'){
						this.apiListValidObjLoading = true
						return
					}
					let comple = true
					for (let key in newV) {
					 if(!newV[key]){
						 comple =false
					 } 
					}
					if(comple){
						this.apiListValidObj={}
						this.apiListValidObjLoading = true
					}
				},
				deep: true
			}
		},
		async created() {
			const methodOptionRes = await this.$API.system_menu.menu.methodOption.get()
			if(methodOptionRes.code === '10000'){
				this.methodOptions = methodOptionRes.data
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
				} else if(form.meta.type === 'CATALOG'){
					form.path = '/'
					form.perm = ''
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
				if(!this.apiListValidtor){
					ElMessage.error('接口权限数据错误，请完善后点击保存！')
					return
				}
				this.loading = true
				this.handlerMenu(this.form)
				var res = await this.$API.system_menu.menu.add.post(this.form)
				this.loading = false
				this.apiListValidObj={}
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
			},
			//验证是否能修复个别情况api权限列表鼠标hover显示红块问题
			initApiList(apiList){
				if(apiList) apiList.forEach(item=>{item['codeVisible']=false; item['urlVisible']=false;})
			},
			validtorApiCode(code, apiData){
				if(code.trim().length === 0){
					apiData['codeErrMsg'] = '标识不能为空'
					return false
				}
				const reg = /^([\u4e00-\u9fa5]|[a-z]|[A-Z]|[0-9]|[_]|[\.])*$/
				if(!reg.test(code)){
					apiData['codeErrMsg'] = '标识含非法字符'
					return false
				}
				return true
			},
			validtorApiUrl(url, apiData){
				let key = apiData.code +":"+apiData.url+":"+apiData.method
				if(url.trim().length === 0){
					apiData['urlErrMsg'] = 'url不能为空'
					this.apiListValidObj[key] = true
					return false
				}
				const reg = /^(\/[a-zA-Z0-9_#?&*]*)+$/
				if(!reg.test(url)){
					apiData['urlErrMsg'] = 'url含非法字符'
					this.apiListValidObj[key] = true
					return false
				}
				this.$API.system_permission.permission.validtorUrlPerm
				.get({id: apiData.id, url: apiData.url, method: apiData.method})
				.then(res=>{
					if(res.code === '10000' && res.data){
						apiData['urlVisible'] = false
						this.apiListValidObj[key] = true
						return
					}
					apiData['urlErrMsg'] = 'url与请求方式已存在'
					apiData['urlVisible'] = true
					this.apiListValidObj[key] = true
					this.apiListValidtor = false
				}).catch(err=>{
					ElMessage.wran('验证apiUrl路径验证器请求异常')
					apiData['urlVisible'] = false
					this.apiListValidObj[key] = true
				})
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
