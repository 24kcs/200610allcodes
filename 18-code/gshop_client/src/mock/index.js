// 引入Mock
import Mock from 'mockjs'
// 引入模版数据
import banners from './banners.json'
// 引入模版数据
import floors from './floors.json'
// 根据指定的地址生成随机的数据
Mock.mock('/mock/banners',{code:200,message:'成功',data:banners})
Mock.mock('/mock/floors',{code:200,message:'成功',data:floors})
