// 导入默认导出的模块
// 简洁写法
import xxx from './test1'
// 完整写法
import {default as xxx2} from './test1'

// 导入分别导出的模块
import {num1,f1} from './test1'

// 导入统一导出的模块
import {name1,name2,name3,name4} from './test1'

// 导入所有模块
import * as test1 from './test1'

console.log(xxx)
console.log(xxx2)
console.log(num1,f1)
console.log(name1,name2,name3,name4)
console.log(test1)
