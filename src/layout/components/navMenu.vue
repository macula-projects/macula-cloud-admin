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
	<div v-if="navMenus.length<=0" style="padding:20px;">
		<el-alert title="无子集菜单" center type="info" :closable="false"></el-alert>
	</div>
	<template v-for="navMenu in navMenus" v-bind:key="navMenu">
		<el-menu-item v-if="!hasChildren(navMenu)" :index="navMenu.path">
			<a v-if="navMenu.meta&&navMenu.meta.type=='LINK'" :href="navMenu.path" target="_blank" @click.stop='()=>{}'></a>
			<el-icon v-if="navMenu.meta&&navMenu.meta.icon"><component :is="navMenu.meta.icon || 'el-icon-menu'"/></el-icon>
			<template #title>
				<span>{{navMenu.meta.title}}</span>
				<span v-if="navMenu.meta.tag" class="menu-tag">{{navMenu.meta.tag}}</span>
			</template>
		</el-menu-item>
		<el-sub-menu v-else :index="navMenu.path">
			<template #title>
				<el-icon v-if="navMenu.meta&&navMenu.meta.icon"><component :is="navMenu.meta.icon || 'el-icon-menu'"/></el-icon>
				<span>{{navMenu.meta.title}}</span>
				<span v-if="navMenu.meta.tag" class="menu-tag">{{navMenu.meta.tag}}</span>
			</template>
			<NavMenu :navMenus="navMenu.children"></NavMenu>
		</el-sub-menu>
	</template>
</template>

<script>
export default {
  name: 'NavMenu',
  props: ['navMenus'],
  data() {
    return {}
  },
  methods: {
    hasChildren(item) {
      return item.children && !item.children.every(item => item.meta.hidden)
    }
  }
}
</script>
