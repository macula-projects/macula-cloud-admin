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
				<el-input v-model="form.supervisor" clearable></el-input>
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
				supervisor: "",
				description: ""
			},
			//验证规则
			rules: {
				name: [
					{required: true, message: '租户名称不能为空', trigger: 'blur'}
				],
				code: [
					{required: true, message: '租户编码不能为空', trigger: 'blur'}
				]
			}
		}
	},
	mounted() {
	
	},
	methods: {
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
					var res = {}
					if(this.mode === 'add'){
						res = await this.$API.system_tenant.tenant.add.post(this.form);
					} else {
						res = await this.$API.system_tenant.tenant.edit.put(this.form.id, this.form);
					}
					this.isSaveing = false;
					if(res.code == "10000"){
						this.$emit('success', this.form, this.mode)
						this.visible = false;
						ElMessage.success("操作成功")
					}else{
						ElMessageBox.alert(res.message, "提示", {type: 'error'})
					}
				}
			})
		},
		//表单注入数据
		setData(data){
			this.form.id = data.id
			this.form.name = data.name
			this.form.code = data.code
			this.form.supervisor = data.supervisor
			this.form.description = data.description
		}
	}
}
</script>

<style>
</style>
