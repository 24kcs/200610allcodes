<template>
  <div>
    <!-- 商品分类导航 -->
    <TypeNav />
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <TodayRecommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <Floor />
    <!--楼层-->
    <Floor />
    <!--商标-->
    <Brand />
  </div>
</template>
<script>
// 引入ListContainer组件
import ListContainer from './ListContainer'
// 引入TodayRecommend组件
import TodayRecommend from './TodayRecommend'
// 引入Rank组件
import Rank from './Rank'
// 引入Like组件
import Like from './Like'
// 引入Floor组件
import Floor from './Floor'
// 引入Brand组件
import Brand from './Brand'
// import {reqBanners,reqFloors} from '@/api'
export default {
  name: 'Home',
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    // const result1 = await reqBanners()
    // const result2 = await reqFloors()
    // console.log(result1)
    // console.log(result2)
    this.$store.dispatch('getBanners')
    this.$store.dispatch('getFloors')
  },
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
</style>