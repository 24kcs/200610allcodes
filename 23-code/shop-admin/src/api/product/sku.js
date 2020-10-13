// 引入二次封装的axios
import request from '@/utils/request'
// 当前这里的api接口函数中前面的相同的地址
const API_NAME = '/admin/product'

export default {
  // 下架
  cancelSale (skuId) {
    return request.get(`${API_NAME}/cancelSale/${skuId}`)
  },
  // 上架
  onSale (skuId) {
    return request.get(`${API_NAME}/onSale/${skuId}`)
  },
  // 根据skuId删除对应的skuInfo对象数据
  deleteSkuById (skuId) {
    return request.delete(`${API_NAME}/deleteSku/${skuId}`)
  },
  // 根据spuId查找对应的sku列表信息数据
  getSkuInfoListBySpuId (spuId) {
    return request.get(`${API_NAME}/findBySpuId/${spuId}`)
  },
  // 根据skuId获取对应的skuInfo信息数据对象
  getSkuInfoById (skuId) {
    return request.get(`${API_NAME}/getSkuById/${skuId}`)
  },
  // 根据页码和每页的条数获取对应的skuInfo列表信息数据
  getSkuInfoList (page, limit) {
    return request.get(`${API_NAME}/list/${page}/${limit}`)
  },
  // 添加或者是修改skuInfo对象信息数据
  addOrUpdateSkuInfo (skuInfo) {
    return request.post(`${API_NAME}/${skuInfo.id ? 'update' : 'save'}SkuInfo`, skuInfo)
  },
  // 根据spuId获取对应的图片列表信息数据数组
  getSpuImageList (spuId) {
    return request.get(`${API_NAME}/spuImageList/${spuId}`)
  },
  // 根据spuId获取对应的销售属性数据数组
  getSpuSaleAttrList (spuId) {
    return request.get(`${API_NAME}/spuSaleAttrList/${spuId}`)
  }
}