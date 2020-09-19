// 封装每个接口的api函数
import ajax from './ajax'
import ajaxMock from './ajaxMock'
// 获取首页的三级分类信息的api接口函数
export const reqBaseCategoryList = () => ajax.get(`/product/getBaseCategoryList`)
// 设置mock的相关的api接口函数
export const reqBanners = () => ajaxMock.get('/banners')
export const reqFloors = () => ajaxMock.get('/floors')