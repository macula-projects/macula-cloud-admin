<template>
	<el-dialog :title="titleMap[mode]" v-model="visible" :width="500" destroy-on-close @closed="$emit('closed')">
		<el-form :model="form" :rules="rules" :disabled="mode=='show'" ref="dialogForm" label-width="100px" label-position="left">
			<el-form-item label="租户名称" prop="name">
				<el-input v-model="form.name" clearable></el-input>
			</el-form-item>
			<el-form-item label="租户编码" prop="code">
				<el-input v-model="form.code" clearable></el-input>
			</el-form-item>
			<el-form-item label="负责人" prop="supervisor">
				<sc-table-select v-model="form.supervisor" :apiObj="apiObj" :table-width="450" multiple clearable collapse-tags collapse-tags-tooltip :props="props" :params="params">
					<template #header="{form, submit}">
						<el-form :inline="true" :model="form">
							<el-form-item>
								<el-input v-model="form.keywords" placeholder="用户名称" clearable></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="submit">查询</el-button>
							</el-form-item>
						</el-form>
					</template>
					<!-- <el-table-column prop="id" label="ID" width="180"></el-table-column> -->
					<el-table-column label="#" type="index" width="50"></el-table-column>
					<el-table-column prop="username" label="用户名" width="150"></el-table-column>
					<el-table-column prop="nickname" label="真实名字"></el-table-column>
				</sc-table-select>
			</el-form-item>
			<el-form-item label="描述" prop="description">
				<el-input type="textarea" v-model="form.description" clearable></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible=false" >取 消</el-button>
			<el-button v-if="mode!='show'" type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
		</template>
	</el-dialog>
</template>

<script>
export default{
	emits: ['success', 'closed'],
	name: 'tenant_save',
	data(){
		return {
			mode: "add",
			titleMap: {
				add: '新增',
				edit: '编辑',
				show: '查看'
			},
			visible: false,
			isSaveing: false,
			//表单数据
			form: {
				id:"",
				name: "",
				code: "",
				supervisor: [],
				description: ""
			},
			props: {
				label: 'username',
				value: 'id',
				keyword: "keywords"
			},
			apiObj: this.$API.system_user.user.list,
			params: {deleted: 0},
			//验证规则
			rules: {
				name: [
					{required: true, message: '租户名称不能为空', trigger: 'blur'}
				],
				code: [
					{required: true, message: '租户编码不能为空', trigger: 'blur'}
				],
				supervisor: [
					{required: true, message: '租户负责人不能为空', trigger: 'blur'}
				]
			}
		}
	},
	mounted() {
	
	},
	methods: {
		//保存的负责人只需要传递id属性
		handlerSupervisor(reqForm){
			if(reqForm.supervisor){
				reqForm.supervisor = reqForm.supervisor.map(item=>item.id)
			}
		},
		//显示
		open(mode='add'){
			this.mode = mode;
			this.visible = true;
			return this
		},
		//表单提交方法
		submit(){
			this.$refs.dialogForm.validate(async (valid) => {
				if (valid) {
					this.isSaveing = true;
					let reqForm = JSON.parse(JSON.stringify(this.form))
					this.handlerSupervisor(reqForm)
					var res = {}
					if(this.mode === 'add'){
						res = await this.$API.system_tenant.tenant.add.post(reqForm);
					} else {
						res = await this.$API.system_tenant.tenant.edit.put(reqForm.id, reqForm);
					}
					this.isSaveing = false;
					if(res.success){
						this.$emit('success', this.form, this.mode)
						this.visible = false;
						ElMessage.success("操作成功")
					}else{
						ElMessageBox.alert(res.cause || res.msg, "提示", {type: 'error'})
					}
				}
			})
		},
		//表单注入数据
		setData(data){
			this.form.id = data.id
			this.form.name = data.name
			this.form.code = data.code
			this.form.supervisor = data.supervisor;
			this.form.description = data.description
		}
	}
}
</script>

<style>
</style>
