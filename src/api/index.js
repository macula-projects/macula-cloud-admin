/**
 * @description 自动import导入所有 api 模块
 */

const files = import.meta.globEager('./model/*.js')
const modules = {}
Object.keys(files).forEach(key => {
	modules[key.replace(/^\.\/model\/(.*)\.js$/g, '$1')] = files[key].default
})

export default modules
