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
	<el-main>
		<el-row :gutter="15">
			<el-col :lg="8">
				<el-card shadow="never" header="常用">
					<sc-qr-code text="scui"></sc-qr-code>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never" header="带Logo">
					<sc-qr-code text="scui" logo="img/logo.png"></sc-qr-code>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never" header="自定义颜色大小">
					<sc-qr-code text="scui" :size="100" colorDark="#088200" colorLight="#fff"></sc-qr-code>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never" header="动态">
					<sc-qr-code :text="qrcode"></sc-qr-code>
					<el-input v-model="qrcode" placeholder="Please input"  style="margin-top: 20px;"/>
				</el-card>
			</el-col>
		</el-row>
	</el-main>
</template>

<script>
	export default {
		name: 'qrcode',
		data() {
			return {
				qrcode: "scui"
			}
		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style>
</style>
