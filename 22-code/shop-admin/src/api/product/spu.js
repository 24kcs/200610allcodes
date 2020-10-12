// 引入二次封装的axios
import request from '@/utils/request'
// 当前这里的api接口函数中前面的相同的地址
const API_NAME = '/admin/product'

export default {
  // 获取所有的销售属性数据,没有参数
  getBaseSaleAttrList () {
    return request.get(`${API_NAME}/baseSaleAttrList`)
  },
  // 根据spuId删除对应的spuInfo对象数据
  deleteSpuById (spuId) {
    return request.delete(`${API_NAME}/deleteSpu/${spuId}`)
  },
  // 根据spuId获取对应的spuInfo对象数据
  getSpuInfoById (spuId) {
    return request.get(`${API_NAME}/getSpuById/${spuId}`)
  },
  // 增加或修改spuInfo信息对象数据
  saveOrUpdateSpuInfo (spuInfo) {
    return request.post(`${API_NAME}/${spuInfo.id ? 'update' : 'save'}SpuInfo`, spuInfo)
  },
  // 根据页码及每页的条数和三级分类的id获取对应页码中的条数的spu信息数据
  getSpuInfoList (page, limit, category3Id) {
    return request.get(`${API_NAME}/${page}/${limit}`, { params: { category3Id } })
  }
}


// GET /admin/product/{page}/{limit}