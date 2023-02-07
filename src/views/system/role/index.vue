<template>
	<el-container>
			<el-header>
				<div style="width: 100%;display: block;">
					<el-row gutter="20">
						<el-col span="10">
							<el-input
								v-model="keyWord"
								placeholder="Please input"
								class="input-with-select"
								style="max-width: 500px;"
							>
								<template #prepend>
									<el-select v-model="tenantId" placeholder="Select" style="width: 115px">
										<el-option label="System" value="1" />
									</el-select>
								</template>
								<template #append>
									<el-button @click="searchRole">
										<el-icon class="el-icon--right"><el-icon-search /></el-icon>
									</el-button>
								</template>
							</el-input>
						</el-col>
						<el-col span="2">
							<el-button v-auth="'role::add'">添加</el-button>
						</el-col>
					</el-row>
				</div>
			</el-header>
		<el-main>
				

			
		</el-main>
	</el-container>
</template>

<script>
import { Search } from '@element-plus/icons-vue'
export default{
	name: 'role',
	data () {
		return {
			spaceSize: 10,
			tenantId: '1',
			keyWord: ''
		}
	},
	methods: {
		searchRole(){
			console.log('search', this.tenantId)
		},
		add(){
			console.log('add')
		}
	}
}
</script>

<style>
</style>
