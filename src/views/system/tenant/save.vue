<template>
	<el-dialog :title="titleMap[mode]" v-model="visible" :width="500" destroy-on-close @closed="$emit('closed')">
		<el-form :model="form" :rules="rules" :disabled="mode=='show'" ref="dialogForm" label-width="100px" label-position="left">
			<el-form-item label="角色名称" prop="name">
				<el-input v-model="form.name" clearable></el-input>
			</el-form-item>
			<el-form-item label="角色编码" prop="code">
				<el-input v-model="form.code" clearable></el-input>
			</el-form-item>
			<el-form-item label="数据权限" prop="dataScope">
				<el-select v-model="form.dataScope" placeholder="请选择角色数据权限">
					<el-option v-for="(item, index) in dataScopeEnum" :key="index" :label="item.label" :value="item.value"  ></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="排序" prop="sort">
				<el-input-number v-model="form.sort" controls-position="right"></el-input-number>
				<div class="el-form-item-msg">角色排序越小越前</div>
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-switch v-model="form.status" active-value="1" inactive-value="0"></el-switch>
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
	name: 'tenant_save',
	data(){
		return{
			
		}
	},
	methods:{
		
	}
}
</script>

<style>
</style>
