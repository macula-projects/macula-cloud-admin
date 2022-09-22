import config from "@/config";
import { defineStore } from "pinia";

export const useGlobalStore = defineStore({
	id: 'global',
	state: () => ({
		//移动端布局
		ismobile: false,
		//布局
		layout: config.LAYOUT,
		//菜单是否折叠 toggle
		menuIsCollapse: config.MENU_IS_COLLAPSE,
		//多标签栏
		layoutTags: config.LAYOUT_TAGS,
		//主题
		theme: config.THEME,
	}),
	actions: {
		setIsMobile(flag) {
			this.ismobile = flag
		},
		toggleMenuIsCollapse(){
			this.menuIsCollapse = !this.menuIsCollapse
		},
		toggleLayoutTags(){
			this.layoutTags = !this.layoutTags
		}
	}
});
