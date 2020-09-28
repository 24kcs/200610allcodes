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
// 获取购物车中商品信息列表数据
export const reqShopCartList = () => ajax.get(`/cart/cartList`)
// 根据skuId删除购物车中的某个商品数据
export const reqDeleteCartItem = (skuId) => ajax.delete(`/cart/deleteCart/${skuId}`)
// 根据购物项的skuId和是否选中,切换购物项的选中状态
// 切换购物项的选中状态
export const reqCheckCartItem = (skuId, isChecked) => ajax.get(`/cart/checkCart/${skuId}/${isChecked}`)

// 登录api接口
export const reqLogin = (mobile, password) => ajax.post(`/user/passport/login`, { mobile, password })
// 注册接口
export const reqRegister = (userInfo) => ajax.post(`/user/passport/register`, userInfo)
// 退出接口
export const reqLogout = () => ajax.get(`/user/passport/logout`)