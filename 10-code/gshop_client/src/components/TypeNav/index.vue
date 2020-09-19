<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="hideFirst" @mouseenter="showFirst">
        <h2 class="all">全部商品分类</h2>
        <div class="sort" @click="toSearch" v-if="isShowFirst">
          <div class="all-sort-list2">
            <div
              class="item"
              v-for="(c1,index) in baseCategoryList"
              :key="c1.categoryId"
              :class="{item_on:currentIndex===index}"
              @mouseenter="showSubCategory(index)"
            >
              <h3>
                <a
                  href="javascript:;"
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                >{{c1.categoryName}}</a>
                <!-- <a href="javascript:;" @click="toSearch(c1.categoryName,c1.categoryId)">{{c1.categoryName}}</a> -->
                <!-- <router-link
                  :to="{path:'/search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId}}"
                >{{c1.categoryName}}</router-link>-->
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl class="fore" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                    <dt>
                      <!-- <a href="javascript:;">{{c2.categoryName}}</a> -->
                      <a
                        href="javascript:;"
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                      >{{c2.categoryName}}</a>
                      <!-- <router-link
                        :to="{path:'/search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId}}"
                      >{{c2.categoryName}}</router-link>-->
                    </dt>
                    <dd>
                      <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                        <!-- <a href="javascript:;">{{c3.categoryName}}</a> -->
                        <a
                          href="javascript:;"
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                        >{{c3.categoryName}}</a>
                        <!-- <router-link
                          :to="{path:'/search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId}}"
                        >{{c3.categoryName}}</router-link>-->
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
<script>
// 引入Vuex中的辅助函数
import { mapState } from 'vuex'
// 引入lodash,按需引入
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  // 状态数据
  data() {
    return {
      currentIndex: -2, // 用来存储鼠标进入某一项的时候的索引
      isShowFirst: true, // 默认的是true,菜单是显示的
    }
  },
  // 计算属性
  computed: {
    // 通过Vuex的辅助函数来获取home模块中的状态数据
    ...mapState({
      baseCategoryList: (state) => state.home.baseCategoryList,
    }),
  },
  // 方法
  methods: {
    // 鼠标进入事件
    showSubCategory: throttle(function (index) {
      // 鼠标进入的时候把当前的这个项的索引保存起来
      if (this.currentIndex !== -2) {
        this.currentIndex = index
      }
    }, 200),

    // 点击外层的div标签,实现路由跳转
    toSearch(e) {
      // 事件委托
      // console.dir(e.target)
      const nodeTarget = e.target
      if (nodeTarget.nodeName === 'A') {
        // 此时是a标签
        // console.log(nodeTarget.dataset)
        // 解构,获取分类的名字和对应的id值
        const {
          categoryname,
          category1id,
          category2id,
          category3id,
        } = nodeTarget.dataset
        const query = {
          categoryName: categoryname,
        }
        // 判断
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }
        // 路由跳转
        this.$router.push({ path: '/search', query })
        // 隐藏高亮显示的效果
        this.currentIndex = -2
        // 坑
      }
    },
    // 鼠标进入
    showFirst() {
      this.isShowFirst = true
      this.currentIndex = -1
    },
    // 鼠标离开
    hideFirst() {
      this.currentIndex = -2
      if (this.$route.path !== '/') {
        this.isShowFirst = false
      }
    },
  },
  // 该组件加载完毕的时候里面的菜单是否隐藏取决于当前的地址(路由地址/路径)
  mounted() {
    if (this.$route.path !== '/') {
      // 如果不是首页,那么菜单就要隐藏
      this.isShowFirst = false
    }
  },
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;
    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }
    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }
    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            a {
              color: #333;
            }
          }
          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;
            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;
              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;
                &.fore {
                  border-top: 0;
                }
                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }
                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;
                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          &.item_on {
            background-color: #02a774;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>