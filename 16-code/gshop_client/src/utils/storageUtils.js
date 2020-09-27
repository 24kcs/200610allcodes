// 暴露出去一个函数(作用:用来产生用户的临时凭证id)
// 引入UUID
import UUID from 'uuidjs'
export function getUUID(){
  // 定义一个变量用来存储uuid
  // 先从浏览器的缓存中读取用户的临时凭证
  let uuid = localStorage.getItem('UUID_KEY')
  // 判断是否存在
  if(!uuid){
    // 产生临时用户凭证id
    uuid = UUID.generate()
    // 向浏览器中存储用户的临时凭证
    localStorage.setItem('UUID_KEY',uuid)
  }
  // 返回用户的临时凭证id
  return uuid
}