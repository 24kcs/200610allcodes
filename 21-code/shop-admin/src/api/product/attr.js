// 封装平台属性相关的api接口函数
// 引入二次封装的axios
import request from '@/utils/request'
// 当前这里的api接口函数中前面的相同的地址
const API_NAME = '/admin/product'

export default {
  // 根据一级/二级/三级分类的id获取对应的平台属性数据
  getAttrList (category1Id, category2Id, category3Id) {
    return request.get(`${API_NAME}/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)
  },
  // 根据平台属性的id删除对应的平台属性数据
  deleteAttrById (attrId) {
    return request.delete(`${API_NAME}/deleteAttr/${attrId}`)
  },
  // 根据平台属性的id获取对应的所有的平台属性值数据
  getAttrValueList (attrId) {
    return request.get(`${API_NAME}/getAttrValueList/${attrId}`)
  },
  // 增加或者修改平台属性数据
  saveOrUpdateAttr (attr) {
    return request.post(`${API_NAME}/saveAttrInfo`, attr)
  }
}