import {markRaw} from 'vue';
const resultComps = {}
const files = import.meta.globEager('./*.vue')
Object.keys(files).forEach(fileName => {
	let comp = files[fileName]
	resultComps[fileName.replace(/^\.\/(.*)\.\w+$/, '$1')] = comp.default
})
export default markRaw(resultComps)
