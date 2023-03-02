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
	<el-card shadow="never" header="事务待办">
		<el-form ref="form" label-width="180px" label-position="left" style="margin-top:20px;">
			<el-form-item label="有新的待办">
				<el-checkbox v-model="form.new">短信推送</el-checkbox>
				<el-checkbox v-model="form.new_wx">微信推送</el-checkbox>
			</el-form-item>
			<el-form-item label="待办有效时剩24小时">
				<el-checkbox v-model="form.timeout">短信推送</el-checkbox>
				<el-checkbox v-model="form.timeout_wx">微信推送</el-checkbox>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					new: true,
					timeout: true
				}
			}
		}
	}
</script>

<style>
</style>
