<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!--分类信息的名字-->
            <li class="with-x" v-if="options.categoryName">
              {{options.categoryName}}
              <i @click="removeCategory">×</i>
            </li>
            <!--搜索的关键字-->
            <li class="with-x" v-if="options.keyword">
              {{options.keyword}}
              <i @click="removeKeyword">×</i>
            </li>
            <!--品牌的名字-->
            <li class="with-x" v-if="options.trademark">
              {{options.trademark}}
              <i @click="removeTrademark">×</i>
            </li>
            <!--平台属性数据的展示-->
            <li class="with-x" v-for="(prop,index) in options.props" :key="prop">
              {{prop}}
              <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector :setTrademark="setTrademark" :addProps="addProps" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- <li :class="{active:options.order.indexOf('1')===0}"> -->

                <li :class="{active:isActive('1')}" @click="setOrder('1')">
                  <a href="javascript:;">综合{{getOrderText('1')}}</a>
                </li>
                <li>
                  <a href="javascript:;">销量</a>
                </li>
                <li>
                  <a href="javascript:;">新品</a>
                </li>
                <li>
                  <a href="javascript:;">评价</a>
                </li>
                <li :class="{active:isActive('2')}" @click="setOrder('2')">
                  <a href="javascript:;">价格{{getOrderText('2')}}</a>
                </li>
                <!-- <li>
                  <a href="#">价格⬇⬆</a>
                </li>-->
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods,index) in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="javascript:;">
                      <img :src="goods.defaultImg" />
                    </a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a href="javascript:;" :title="goods.title">{{goods.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">
                      已有
                      <span>2000</span>人评价
                    </i>
                  </div>
                  <div class="operate">
                    <a href="javascript:;" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- <div class="fr page"> -->
            <!---分页-->
            <Pagination :pageConfig="{total:productList.total,pageNo:options.pageNo,pageSize:options.pageSize,showPageNo:5}" @changeCurrentPage="changeCurrentPage" />
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入了显示:品牌和平台属性的组件
import SearchSelector from './SearchSelector/SearchSelector'
// 引入vuex的辅助函数
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'Search',
  // 注册组件
  components: {
    SearchSelector,
  },
  // 数据对象
  data() {
    return {
      options: {
        category1Id: '', // 一级分类的id
        category2Id: '', // 二级分类的id
        category3Id: '', // 三级分类的id
        categoryName: '', // 分类的名字
        props: [], // ['2218:6.75-6.84英寸:屏幕尺寸']--->['平台属性的id:属性值:属性名字']
        // trademark: '', // 品牌的名字  '品牌的id:品牌的名字'
        order: '1:desc', // 排序的方式 1--->排序的标识,desc--->排序的方式 ,1--综合,2---价格 ,desc---降序,asc---升序
        pageNo: 1, // 默认获取的是第一页的数据
        pageSize: 2, // 默认每页3条数据
        keyword: '', // 搜索关键字
      },
    }
  },
  computed: {
    // 获取商品信息数据对象----将来要用的
    ...mapState({
      productList: (state) => state.search.productList,
    }),
    // 获取当前这一页的产品信息数据
    ...mapGetters(['goodsList']),
  },
  watch: {
    // 监视路由信息对象
    $route(to, from) {
      // to 目标路由的信息对象
      // from 从哪里来的路由信息对象
      // console.log(from)
      // console.log(to)
      const { query, params } = to
      const options = {
        ...this.options,
        category1Id: '', // 重置数据
        category2Id: '', // 重置数据
        category3Id: '', // 重置数据
        categoryName: '', // 重置数据
        ...query,
        ...params,
      }
      // 重新更新参数数据
      this.options = options
      // 分发action
      this.getProductList()
    },
  },
  // 组件渲染后的生命周期回调----直接获取商品信息对象数据
  mounted() {
    // 从路由信息对象中获取相关的参数数据:query,params
    const { query, params } = this.$route
    // 定义了一个对象,把所有的参数解构出来放在这个对象
    const options = {
      ...this.options,
      ...query,
      ...params,
    }
    // 重新更新参数数据
    this.options = options
    // 分发action
    this.getProductList()
  },
  methods: {
    // 获取商品信息数据对象
    getProductList() {
      // 分发的action
      this.$store.dispatch('getProductList', this.options)
    },
    // 移除分类信息的名字
    removeCategory() {
      // 清理一级/二级/三级分类的id及名字
      this.options.category1Id = ''
      this.options.category2Id = ''
      this.options.category3Id = ''
      this.options.categoryName = ''
      // this.getProductList()// 重新数据  数据确实重新获取,但是路由地址没有清理
      // console.log(this.$route.params)
      // 路由的跳转
      this.$router.replace(this.$route.path)
    },
    // 移除搜索关键字
    removeKeyword() {
      this.options.keyword = ''
      // 路由跳转
      this.$router.replace({ path: '/search', query: this.$route.query })
      // 干掉Header组件中的文本框中的数据
      this.$bus.$emit('removeKeyword')
    },
    // 更新品牌的参数数据
    setTrademark(tmId, tmName) {
      // 这种方式添加的属性属于非响应式属性数据,
      // 响应式数据:在data中定义的数据,该数据如果发生了变化,页面会自动的渲染
      // this.options.trademark = `${tmId}:${tmName}`
      // 向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。
      this.$set(this.options,'trademark',`${tmId}:${tmName}`)
      // console.log(this.options.trademark)
      // 重新发送请求,获取商品信息数据
      this.getProductList()
    },
    // 移除品牌的名字
    removeTrademark() {
      // 是把数据清空,并不是删除
      // this.options.trademark = ''
      // 这种方式不是移除响应式数据的操作
      // delete this.options.trademark

      // 删除对象的 property。如果对象是响应式的，确保删除能触发更新视图
      this.$delete(this.options,'trademark')
      // 重新发送请求,获取商品信息数据
      this.getProductList()
    },
    // 更新平台属性数组的数据
    addProps(propId, propVal, propName) {
      // 拼接平台属性的值
      const prop = `${propId}:${propVal}:${propName}`
      // 判断该数组中这个数据是否存在,不存在则添加
      if (this.options.props.indexOf(prop) === -1) {
        this.options.props.push(prop)
        // 重新获取数据
        this.getProductList()
      }
    },
    // 移除平台属性数据
    removeProp(index) {
      this.options.props.splice(index, 1)
    },
    // 设置排序的选项的类样式
    isActive(flag) {
      return this.options.order.indexOf(flag) === 0
    },
    // 改变排序的方式,或者是排序的类型
    setOrder(flag) {
      // 获取排序的标识和排序方式
      let [orderFlag, orderType] = this.options.order.split(':')
      // 判断排序的标识是否一致
      if (orderFlag === flag) {
        orderType = orderType === 'desc' ? 'asc' : 'desc'
      } else {
        orderFlag = flag // 标识已经改变
        orderType = 'desc' // 默认是降序
      }
      // 更新参数数据
      this.options.order = orderFlag + ':' + orderType
      // 重新获取数据
      this.getProductList()
    },
    // 显示箭头
    getOrderText(flag) {
      // 获取排序的标识和排序方式
      let [orderFlag, orderType] = this.options.order.split(':')
      // 判断标识是否一致
      if (orderFlag === flag) {
        return orderType === 'desc' ? '⬇' : '⬆'
      } else {
        return ''
      }
    },
    // 自定义事件-传递给子级的分页组件的
    changeCurrentPage(pageNo){
      this.options.pageNo= pageNo
      this.getProductList()
    }
  },
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>