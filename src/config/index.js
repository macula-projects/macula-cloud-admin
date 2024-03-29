/*
 * Copyright (c) 2023 Macula
 *   macula.dev, China
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const DEFAULT_CONFIG = {
    //标题
    APP_NAME: import.meta.env.VITE_APP_TITLE,

    //首页地址
    DASHBOARD_URL: "/dashboard",

    //版本号
    APP_VER: "1.6.9",

    //内核版本号
    CORE_VER: "1.6.9",

    //接口地址
    API_URL: import.meta.env.NODE_ENV === 'development' && import.meta.env.VITE_APP_PROXY === 'true' ? "/api" : import.meta.env.VITE_APP_API_BASEURL,

    // IAM的地址
    IAM_URL: import.meta.env.VITE_APP_IAM_URL,
    
    //请求超时
    TIMEOUT: 10000,

    //TokenName
    TOKEN_NAME: "Authorization",

    //TenantId
    TENANT_ID: "tenantId",

	//Token前缀，注意最后有个空格，如不需要需设置空字符串
	TOKEN_PREFIX: "Bearer ",

	//追加其他头
	HEADERS: {},

	//请求是否开启缓存
	REQUEST_CACHE: false,

	//布局 默认：default | 通栏：header | 经典：menu | 功能坞：dock
	//dock将关闭标签和面包屑栏
	LAYOUT: 'default',

	//菜单是否折叠
	MENU_IS_COLLAPSE: false,

	//菜单是否启用手风琴效果
	MENU_UNIQUE_OPENED: false,

	//是否开启多标签
	LAYOUT_TAGS: true,

	//语言
	LANG: 'zh-cn',

    //主题颜色
    COLOR: '',

    //是否加密localStorage, 为空不加密，可填写AES(模式ECB,移位Pkcs7)加密
    LS_ENCRYPTION: '',

    //localStorageAES加密秘钥，位数建议填写8的倍数
    LS_ENCRYPTION_key: '2XNN4K8LC0ELVWN4',

    MODEL: {
        system: 'system',
        oss: 'oss',

    },

    //控制台首页默认布局
    DEFAULT_GRID: {
        //默认分栏数量和宽度 例如 [24] [18,6] [8,8,8] [6,12,6]
        layout: [12, 6, 6],
        //小组件分布，com取值:views/home/components 文件名
        copmsList: [
            ['welcome'],
            ['about', 'ver'],
            ['time', 'progress']
		]
	}
}

//合并业务配置
import MY_CONFIG from "./myConfig"
Object.assign(DEFAULT_CONFIG, MY_CONFIG)

// 如果生产模式，就合并动态的APP_CONFIG
// public/config.js
if(process.env.NODE_ENV === 'production'){
	Object.assign(DEFAULT_CONFIG, APP_CONFIG)
}

export default DEFAULT_CONFIG
