// 封装每个接口的api函数
import ajax from './ajax'
// 获取首页的三级分类信息的api接口函数
export const reqBaseCategoryList = () => ajax.get(`/product/getBaseCategoryList`)