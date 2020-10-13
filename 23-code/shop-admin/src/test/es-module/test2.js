// 导入默认导出的模块
// 简洁写法
import name1 from './test1'
// 完整写法
import * as test1 from './test1'


// 导入分别导出的模块
import {name,f1} from './test1'


// 导入统一导出的模块
import {name2,name3} from './test1'


// 导入所有模块



console.log(name1)
console.log(test1)
console.log(name)
console.log(f1)
console.log(name2,name3)