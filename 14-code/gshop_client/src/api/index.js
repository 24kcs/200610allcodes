// 封装每个接口的api函数
import ajax from './ajax'
import ajaxMock from './ajaxMock'
// 获取首页的三级分类信息的api接口函数
export const reqBaseCategoryList = () => ajax.get(`/product/getBaseCategoryList`)
// 设置mock的相关的api接口函数
export const reqBanners = () => ajaxMock.get('/banners')
export const reqFloors = () => ajaxMock.get('/floors')
// 获取商品信息数据对象
export const reqProductList = (searchParams) => ajax.post(`/list`, searchParams)

// 根据skuId获取商品的信息对象数据
export const reqDetailInfo = (skuId) => ajax.get(`/item/${skuId}`)

// 根据商品的skuId和数量skuNum添加购物车的api接口函数
export const reqAddToCart = (skuId, skuNum) => ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)
