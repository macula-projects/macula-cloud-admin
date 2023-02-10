<template>
	<el-dialog :title="titleMap[mode]" v-model="visible" :width="500" destroy-on-close @closed="$emit('closed')">
		<el-form :model="form" :rules="rules" :disabled="mode=='show'" ref="dialogForm" label-width="100px" label-position="left">
			<el-form-item label="应用名称" prop="applicationName">
				<el-input v-model="form.applicationName" clearable></el-input>
			</el-form-item>
			<el-form-item label="应用编码" prop="code">
				<el-input v-model="form.code"  clearable></el-input>
			</el-form-item>
			<el-form-item label="负责人" prop="manager">
				<el-input v-model="form.manager"  clearable></el-input>
			</el-form-item>
			<el-form-item label="联系方式" prop="mobile">
				<el-input v-model="form.mobile"  clearable></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible=false" >取 消</el-button>
			<el-button v-if="mode!='show'" type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
		</template>
	</el-dialog>
</template>


<script>
	export default {
		emits: ['success', 'closed'],
		data() {
			return {
				mode: "add",
				titleMap: {
					add: '新增应用',
					edit: '编辑应用'
				},
				visible: false,
				isSaveing: false,
				//表单数据
				form: {
					id:"",
					applicationName: "",
					code: "",
					manager: "",
					mobile:""
				},
				//验证规则
				rules: {
					applicationName: [
						{required: true, message: '请输入应用名称'}
					],
					code: [
						{required: true, message: '请输入应用编码'}
					],
					manager: [
						{required: true, message: '请输入负责人'}
					],
					mobile: [
						{required: true, message: '请输入联系方式'}
					]
				},
				
			}
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
						if (this.mode == 'add') {
							// 调用相关接口
							var res = await this.$API.system_application.application.add.post(this.form);
						} else {
							var res = await this.$API.system_application.application.edit.put(this.form, this.form.id);
						}
						this.isSaveing = false;
						if(res.code == 10000){
							this.$emit('success', this.form, this.mode)
							this.visible = false;
							ElMessage.success("操作成功")
						}else{
							ElMessageBox.alert(res.message, "提示", {type: 'error'})
						}
					}else{
						return false;
					}
				})
			},
			//表单注入数据
			setData(data){
				this.form.id = data.id
				this.form.applicationName = data.applicationName
				this.form.code = data.code
				this.form.manager = data.manager
				this.form.mobile = data.mobile
				//可以和上面一样单个注入，也可以像下面一样直接合并进去
				//Object.assign(this.form, data)
			}
		}
	}
</script>

<style>
</style>
