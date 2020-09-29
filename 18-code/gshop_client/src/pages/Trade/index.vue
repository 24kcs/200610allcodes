<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div
        class="address clearFix"
        v-for="(addr, index) in tradeInfo.userAddressList"
        :key="addr.id"
      >
        <span
          class="username"
          :class="{ selected: selectedAddress === addr }"
          >{{ addr.consignee }}</span
        >
        <p @click="selectedAddress = addr">
          <span class="s1">{{ addr.userAddress }}</span>
          <span class="s2">{{ addr.phoneNum }}</span>
          <span class="s3" v-if="addr.isDefault === '1'">默认地址</span>
        </p>
      </div>

      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left: 5px">货到付款</span>
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul
          class="list clearFix"
          v-for="(goods, index) in tradeInfo.detailArrayList"
          :key="goods.skuId"
        >
          <li>
            <img :src="goods.imgUrl" alt="" />
          </li>
          <li>
            <p>
              {{ goods.skuName }}
            </p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥{{ goods.orderPrice }}</h3>
          </li>
          <li>X{{ goods.skuNum }}</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>

        <textarea
          placeholder="建议留言前先与商家沟通确认"
          class="remarks-cont"
          v-model="orderComment"
        ></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b
            ><i>{{ tradeInfo.totalNum }}</i
            >件商品，总商品金额</b
          >
          <span>¥{{ tradeInfo.totalAmount }}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">
        应付金额:　<span>¥{{ tradeInfo.totalAmount }}</span>
      </div>
      <div class="receiveInfo">
        寄送至:
        <span>{{ selectedAddress.userAddress }}</span>
        收货人：<span>{{ selectedAddress.consignee }}</span>
        <span>{{ selectedAddress.phoneNum }}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <!-- <router-link class="subBtn" to="/pay">提交订单</router-link> -->
      <a href="javascript:;" class="subBtn" @click="pay">提交订单</a>
    </div>
  </div>
</template>

<script>
// 引入vuex的辅助函数
import { mapState } from 'vuex'
export default {
  name: 'Trade',
  data() {
    return {
      selectedAddress: {}, // 用来存储选中的收件人的用户信息地址对象
      orderComment: '老板,受不了啦,快点发货,等不急啦', // 订单的备注
    }
  },
  // 计算属性
  computed: {
    ...mapState({
      tradeInfo: (state) => state.order.tradeInfo,
    }),
  },
  // 监视
  watch: {
    // 监视的是收件人信息数组
    'tradeInfo.userAddressList': function (value) {
      // value---数组:userAddressList
      // 从数组中找isDefault属性是'1'的对象
      const defaultAddr = value.find((addr) => addr.isDefault === '1')
      // 判断该对象是否存在
      if (defaultAddr) {
        // 保存起来
        this.selectedAddress = defaultAddr
      }
    },
  },
  // 组件渲染后的生命周期回调钩子
  mounted() {
    // 获取当前的订单信息数据
    this.$store.dispatch('getTradeInfo')
  },
  methods: {
    // 支付操作
    pay() {
      // 调用提交订单的接口 reqSubmitOrder ,传入参数,先收集参数数据
      // 收集的是:订单的编号,和商品列表数据
      const { tradeNo, detailArrayList } = this.tradeInfo
      // 收集 : 收件人名字,电话,地址
      const { consignee, phoneNum, userAddress } = this.selectedAddress
      const orderInfo = {
        // 收件人
        consignee,
        // 收件人的电话
        consigneeTel: phoneNum,
        // 收件人地址
        deliveryAddress: userAddress,
        // 支付方式:默认是在线支付
        paymentWay: 'ONLINE',
        // 订单的备注
        orderComment: this.orderComment,
        // 订单中的商品列表数据
        orderDetailList: detailArrayList,
      }
      this.$API
        .reqSubmitOrder(tradeNo, orderInfo)
        .then((result) => {
          // 接口调用成功,路由跳转,并传参,query的方式传参,学个新知识
          // 订单提交成功后,返回来的数据是订单的id
          const orderId = result.data
          this.$router.push({path:'/pay',query:{orderId}})
        })
        .catch((error) => {
          alert(error.message)
        })
    },
  },
}
</script>

<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
      }

      .username::after {
        content: '';
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #e1251b;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;
        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;
      padding: 15px;
      margin: 2px auto 0;

      h5 {
        line-height: 50px;
      }
      .list {
        display: flex;
        justify-content: space-between;
        background: #feedef;
        margin: 5px 0;
        li {
          line-height: 30px;
          img {
            width: 100px;
            height: 100px;
          }

          p {
            margin-bottom: 20px;
          }

          h4 {
            color: #c81623;
            font-weight: 400;
          }

          h3 {
            color: #e12228;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;

    ul {
      width: 220px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;

        i {
          color: red;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #999;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px '微软雅黑';
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;
    }
  }
}
</style>