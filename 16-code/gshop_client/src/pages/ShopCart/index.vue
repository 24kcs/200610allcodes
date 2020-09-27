<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(item, index) in shopList" :key="item.id">
          <!--是否选中-->
          <li class="cart-list-con1">
            <!--填坑-->
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked"
              @change="checkCartItem(item)"
            />
          </li>
          <!--图片-->
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">
              {{ item.skuName }}
            </div>
          </li>
          <!--无用-->
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <!--价格-->
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <!--数量操作-->
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeCount2(item, -1)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="item.skuNum"
              @change="
                changeCount2(item, $event.target.value * 1 - item.skuNum)
              "
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeCount2(item, 1)"
              >+</a
            >
          </li>
          <!--总价-->
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuPrice * item.skuNum }}</span>
          </li>
          <!--删除-->
          <li class="cart-list-con7">
            <a
              href="javascript:;"
              class="sindelet"
              @click="deleteCartItem(item.skuId)"
              >删除</a
            >
            <br />
            <a href="javascript:;">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!--全选/全不选-->
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isCheckAll"
          @change="checkCartItems"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteCartItems">删除选中的商品</a>
        <a href="javascript:;">移到我的关注</a>
        <a href="javascript:;">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ totalCount }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="javascript:;">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入vuex的辅助函数
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'ShopCart',
  computed: {
    // 获取vuex中购物车模块中的购物车的商品信息数据数组
    ...mapState({
      shopList: (state) => state.shopcart.shopList,
    }),
    // 获取vuex中购物车模块中的计算属性数据:总数量,总价格,是否全选
    ...mapGetters([
      'totalCount',
      'totalPrice',
      'isCheckAll',
      'selectedCartItems',
    ]),
  },
  // 界面渲染的生命周期回调
  mounted() {
    // 获取购物车中的商品信息数据
    this.getShopCartList()
  },
  methods: {
    // 获取购物车数据
    getShopCartList() {
      // 分发action
      this.$store.dispatch('getShopList')
    },
    // 删除操作
    async deleteCartItem(skuId) {
      // 弹出对话框
      if (window.confirm('您确定要删除吗?')) {
        // 分发action
        const errorMsg = await this.$store.dispatch('deleteCartItem1', skuId)
        if (!errorMsg) {
          // 成功了
          this.getShopCartList()
        } else {
          // 失败了
          alert(errorMsg)
        }
      }
    },
    // 删除所有选中的购物项
    deleteCartItems() {
      // 获取所有选中的购物项
      const { selectedCartItems } = this
      // 如果该数组中的数据是没有的,那么也没有必要删除
      if (selectedCartItems.length === 0) return
      // 弹框
      if (window.confirm('您确定要删除所有选中的购物项吗')) {
        // 定义一个存储promise对象的数组
        const promises = []
        // 遍历数组,一个一个的删除
        selectedCartItems.forEach((item) => {
          // 分发action,删除每一个购物项操作
          const promise = this.$store.dispatch('deleteCartItem2', item.skuId)
          promises.push(promise)
        })
        // 统一的处理promise
        Promise.all(promises).then(
          () => {
            // 成功了,重新获取购物车中的数据
            this.getShopCartList()
          },
          (error) => {
            // 失败了
            alert(error.message)
          }
        )
      }
    },

    // 设置购物项商品的选中状态(切换选中状态)
    checkCartItem(item) {
      // console.log(item.isChecked)
      //const { skuId } = item
      const isChecked = item.isChecked === 1 ? 0 : 1
      // 分发action
      this.$store
        .dispatch('checkCartItem1', { skuId: item.skuId, isChecked })
        .then(
          (values) => {
            // 成功了,重新获取购物车中的数据
            this.getShopCartList()
          },
          (error) => {
            // 失败了
            alert(error.message)
          }
        )
    },

    // 切换全选/全不选中的操作
    async checkCartItems(e) {
      // 获取当前复选框的选中状态
      const isChecked = e.target.checked * 1
      // const promises = []
      // 遍历购物车中所有的购物项,统一修改选中状态
      // this.shopList.forEach((item) => {
      //   // 分发action
      //   const promise = this.$store.dispatch('checkCartItem1', {
      //     skuId: item.skuId,
      //     isChecked,
      //   })
      //   // 放在promises数组中
      //   promises.push(promise)
      // })
      // 使用reduce
      // const promises = this.shopList.reduce((pre, item) => {
      //   const promise = this.$store.dispatch('checkCartItem1', {
      //     skuId: item.skuId,
      //     isChecked,
      //   })
      //   pre.push(promise)
      //   return pre
      // }, [])
      // 使用map
      const promises = this.shopList.map((item) => {
        return this.$store.dispatch('checkCartItem1', {
          skuId: item.skuId,
          isChecked,
        })
      })
      // 统一处理
      try {
        await Promise.all(promises)
        // 成功了,重新获取数据
        this.getShopCartList()
      } catch (error) {
        alert(error.message)
      }
    },

    // 修改商品购物项的数量
    async changeCount(item, changeNum) {
      // 获取skuId
      const { skuId } = item
      // 判断当前商品的数量和传入进来的修改的数量相加,要大于0
      if (item.skuNum + changeNum > 0) {
        // 分发action
        const errorMsg = await this.$store.dispatch('addToCart2', {
          skuId,
          skuNum: changeNum,
        })
        if (!errorMsg) {
          // 成功了
          this.getShopCartList()
        } else {
          // 失败了
          alert(errorMsg)
        }
      }
    },
    changeCount2(item, changeNum) {
      // 获取skuId
      const { skuId } = item
      // 判断当前商品的数量和传入进来的修改的数量相加,要大于0
      if (item.skuNum + changeNum > 0) {
        // 分发action
        this.$store.dispatch('addToCart3', {
          skuId,
          skuNum: changeNum,
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>