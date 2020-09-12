export default {
  // 获取缓存数据
  get(){
    return JSON.parse(window.localStorage.getItem('todos_key')||'[]')
  },
  // 设置缓存数据
  set(val){
    window.localStorage.setItem('todos_key',JSON.stringify(val))
  }
}