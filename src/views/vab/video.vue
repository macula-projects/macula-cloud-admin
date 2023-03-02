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
		<el-alert title="播放器使用来自西瓜视频的西瓜播放器xgplayer" type="success" style="margin-bottom:20px;"></el-alert>
		<el-row :gutter="15">
			<el-col :lg="12">
				<el-card shadow="never" header="MP4点播">
					<sc-video :src="playUrl" :options="options"></sc-video>
				</el-card>
			</el-col>
			<el-col :lg="12">
				<el-card shadow="never" header="HlS(m3u8)直播">
					<el-row :gutter="1">
						<el-col :span="12">
							<sc-video :src="liveUrl" isLive :options="{volume: 0}"></sc-video>
						</el-col>
						<el-col :span="12">
							<sc-video :src="liveUrl_2" isLive :options="{volume: 0}"></sc-video>
						</el-col>
					</el-row>
					<el-row :gutter="1" style="margin-top: 1px;">
						<el-col :span="12">
							<sc-video :src="liveUrl_3" isLive :options="{volume: 0}"></sc-video>
						</el-col>
						<el-col :span="12">
							<sc-video :src="liveUrl_4" isLive :options="{volume: 0}"></sc-video>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>
	</el-main>
</template>

<script>
	export default {
		name: 'scvideox',
		data() {
			return {
				playUrl: "https://fastly.jsdelivr.net/gh/scuiadmin/CDN/video/scui-player-demo-720.mp4",
				options: {
					poster: "https://fastly.jsdelivr.net/gh/scuiadmin/CDN/video/scui-player-demo-1080_Moment.jpg",
					pip: true
				},
				liveUrl: "http://local.live.jxtvcn.com.cn/live-jxtv/tv_jxtv1.m3u8",
				liveUrl_2: "http://local.live.jxtvcn.com.cn/live-jxtv/tv_jxtv6.m3u8",
				liveUrl_3: "http://local.live.jxtvcn.com.cn/live-jxtv/tv_jxtv7.m3u8",
				liveUrl_4: "http://local.live.jxtvcn.com.cn/live-jxtv/tv_jxtv8.m3u8",
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
