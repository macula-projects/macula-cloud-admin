<template>
	<el-container>
		<!-- <el-aside width="220px">
			<el-tree ref="category" class="menu" node-key="label" :data="category" :default-expanded-keys="['系统日志']" current-node-key="系统日志" :highlight-current="true" :expand-on-click-node="false">
			</el-tree>
		</el-aside> -->
		<el-container>
			<el-main class="nopadding">
				<el-container>
					<el-header>
						<div class="left-panel">
							<el-date-picker v-model="search.date" type="datetimerange" value-format="YYYY-MM-DD"
							range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
						</div>
						<div class="right-panel">
							<div class="right-panel-search">
								<el-input v-model="search.keywords" placeholder="操作人 / 请求路径 / 操作方法名称" clearable></el-input>
								<el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
							</div>
						</div>
					</el-header>
					<!-- <el-header style="height:150px;">
						<scEcharts height="100%" :option="logsChartOption"></scEcharts>
					</el-header> -->
					<el-main class="nopadding">
						<scTable ref="table" :apiObj="apiObj" stripe highlightCurrentRow @row-click="rowClick">
							<!-- <el-table-column label="级别" prop="level" width="60">
								<template #default="scope">
									<el-icon v-if="scope.row.level=='error'" style="color: #F56C6C;"><el-icon-circle-close-filled /></el-icon>
									<el-icon v-if="scope.row.level=='warn'" style="color: #E6A23C;"><el-icon-warning-filled /></el-icon>
									<el-icon v-if="scope.row.level=='info'" style="color: #409EFF;"><el-icon-info-filled /></el-icon>
								</template>
							</el-table-column> -->
	
							<el-table-column label="操作名称" prop="opTitle" width="150"></el-table-column>
							<el-table-column label="请求接口" prop="opUrl" width="150"></el-table-column>
							<el-table-column label="请求方法" prop="opRequestMethod" width="150"></el-table-column>
							<el-table-column label="用户" prop="opName" width="150"></el-table-column>
							<el-table-column label="客户端IP" prop="opIp" width="150"></el-table-column>
							<el-table-column label="日志时间" prop="createTime" width="170"></el-table-column>
							<el-table-column label="响应结果" prop="jsonResult" width="170"  :show-overflow-tooltip="true" min-width="150"></el-table-column>
							<el-table-column label="异常信息" prop="errorMsg" width="170" :show-overflow-tooltip='true'></el-table-column>

						</scTable>
					</el-main>
				</el-container>
			</el-main>
		</el-container>
	</el-container>

	<el-drawer v-model="infoDrawer" title="日志详情" :size="600" destroy-on-close>
		<info ref="info"></info>
	</el-drawer>
</template>

<script>
	// import info from './info'

	export default {
		name: 'log',
		// components: {
		// 	info,
		// },
		data() {
			return {
				infoDrawer: false,
				logsChartOption: {
					color: ['#409eff','#e6a23c','#f56c6c'],
					grid: {
						top: '0px',
						left: '10px',
						right: '10px',
						bottom: '0px'
					},
					tooltip: {
						trigger: 'axis'
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['2021-07-01', '2021-07-02', '2021-07-03', '2021-07-04', '2021-07-05', '2021-07-06', '2021-07-07', '2021-07-08', '2021-07-09', '2021-07-10', '2021-07-11', '2021-07-12', '2021-07-13', '2021-07-14', '2021-07-15']
					},
					yAxis: {
						show: false,
						type: 'value'
					},
					series: [{
						data: [120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130, 70, 110],
						type: 'bar',
						stack: 'log',
						barWidth: '15px'
					},
					{
						data: [15, 26, 7, 12, 13, 9, 21, 15, 26, 7, 12, 13, 9, 21, 12, 3],
						type: 'bar',
						stack: 'log',
						barWidth: '15px'
					},
					{
						data: [0, 0, 0, 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						type: 'bar',
						stack: 'log',
						barWidth: '15px'
					}]
				},
				category: [
					{
						label: '系统日志',
						children: [
							{label: 'debug'},
							{label: 'info'},
							{label: 'warn'},
							{label: 'error'},
							{label: 'fatal'}
						]
					},
					{
						label: '应用日志',
						children: [
							{label: 'selfHelp'},
							{label: 'WechatApp'}
						]
					}
				],
				date: [],
				apiObj: this.$API.system_log.log.list,
				search: {
					keywords: null,
					date: null
				}, 
				searchParam: {
					keywords: null,
					beginDate: null,
					EndDate: null,
				}
			}
		},
		methods: {
			upsearch(){
				if (this.search.date != null) {
					this.searchParam.beginDate = this.search.date[0]
					this.searchParam.EndDate = this.search.date[1]
					this.searchParam.keywords = this.search.keywords
				}
				console.log('searchParam', this.searchParam)
				this.$refs.table.upData(this.searchParam)
			},
			rowClick(row){
				this.infoDrawer = true
				this.$nextTick(() => {
					this.$refs.info.setData(row)
				})
			}
		}
	}
</script>

<style>
</style>