<!--
  - Copyright (c) 2023 Macula
  -   macula.dev, China
  -
  - Licensed under the Apache License, Version 2.0 (the "License");
  - you may not use this file except in compliance with the License.
  - You may obtain a copy of the License at
  -
  -    http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  -->

<template>
	<sc-page-header :title="id?'编辑':'新增'" description="可用于非常复杂的表单提交，如一些较为简单的表单提交应使用dialog或者drawer更合适" icon="el-icon-burger"></sc-page-header>

	<el-main>
		<el-alert title="注意: 因为keep-alive只接受组件name,导致多路由共用组件时,关闭或刷新一个标签导致其他同一组件的页面缓存失效,后续还在寻找完美的解决方案.建议在列表页使用dialog或者drawer形式" type="error" style="margin-bottom: 15px;"></el-alert>
		<el-card shadow="never">
			<el-form ref="form" label-width="100px">
				<el-form-item label="id">
					<el-input v-model="id"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">保存</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</el-main>
</template>

<script>
	import { mapActions } from 'pinia'
	import { useViewTagsStore } from '@/stores/viewTags'

	export default {
		name: 'listCrud-detail',
		data() {
			return {
				id: this.$route.query.id,
				input: ""
			}
		},
		created() {

		},
		mounted() {
			//修改tab名称
			this.updateViewTagsTitle(this.id?`CURD编辑ID:${this.id}`:"CURD新增")
		},
		methods: {
			...mapActions(useViewTagsStore, ['updateViewTagsTitle'])
		}
	}
</script>

<style>
</style>
