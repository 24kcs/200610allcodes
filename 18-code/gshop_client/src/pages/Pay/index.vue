<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info"
            >订单提交成功，请您及时付款，以便尽快为您发货~~</span
          >
        </h4>
        <div class="paymark">
          <span class="fl"
            >请您在提交订单<em class="orange time">4小时</em
            >之内完成支付，超时订单会自动取消。订单号：<em>{{
              payInfo.orderId
            }}</em></span
          >
          <span class="fr"
            ><em class="lead">应付金额：</em
            ><em class="orange money">￥{{ payInfo.totalFee }}</em></span
          >
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>
          支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）
        </h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg" /></li>
            <li><img src="./images/pay3.jpg" /></li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg" /></li>
              <li><img src="./images/pay11.jpg" /></li>
              <li><img src="./images/pay12.jpg" /></li>
              <li><img src="./images/pay13.jpg" /></li>
              <li><img src="./images/pay14.jpg" /></li>
              <li><img src="./images/pay15.jpg" /></li>
              <li><img src="./images/pay16.jpg" /></li>
              <li><img src="./images/pay17.jpg" /></li>
              <li><img src="./images/pay18.jpg" /></li>
              <li><img src="./images/pay19.jpg" /></li>
              <li><img src="./images/pay20.jpg" /></li>
              <li><img src="./images/pay21.jpg" /></li>
              <li><img src="./images/pay22.jpg" /></li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <!-- <router-link class="btn" to="/paysuccess">立即支付</router-link> -->
          <a href="javascript:;" class="btn" @click="pay">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="javascript:;">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入vuex的辅助函数
import { mapState } from 'vuex'
// 引入QRCode
import QRCode from 'qrcode'
export default {
  name: 'Pay',
  props: ['orderId'],
  computed: {
    ...mapState({
      payInfo: (state) => state.order.payInfo,
    }),
  },
  mounted() {
    // 先获取路由跳转的时候传入进来的query的参数是orderId

    // 换一个方式获取orderId(路由的参数)
    // const orderId = this.$route.query.orderId
    // 分发action
    this.$store.dispatch('getPayInfo', this.orderId)
  },
  methods: {
    pay() {
      // 进行支付操作
      // 参数: 给个地址----->产生一个图片的地址
      // console.log(this.payInfo) // codeUrl---->微信支付的地址
      QRCode.toDataURL(this.payInfo.codeUrl)
        .then((imgUrl) => {
          // 该对话框返回的是一个promise对象
          this.$alert(`<img src="${imgUrl}" />`, '请使用微信扫码支付', {
            dangerouslyUseHTMLString: true, // 是否将第一个参数的内容以html的代码进行解析
            showClose: false, // 是否先右上角的关闭x
            showCancelButton: true, // 是否显示取消按钮
            showConfirmButton: true, // 是否显示确定按钮
            cancelButtonText: '支付中遇到了问题', // 取消按钮中的文本内容
            confirmButtonText: '我已成功支付', // 确定按钮中的文本内容
            center: true, // 是否在中间显示
          })
            .then(() => {
              // 清理定时器
              clearInterval(this.timeId)
              // 关闭当前对话框
              this.$msgbox.close()
              // 提示信息
              this.$message.success('恭喜您支付成功啦,啦啦啦!')
              // 路由跳转
              this.$router.push('/paysuccess')
            })
            .catch((error) => {
              this.$message.warning('请迅速联系前台的妹妹,帮您搞定哦,亲~~~')
            })

          // 调用api接口函数,检测支付的状态
          this.timeId = setInterval(() => {
            this.$API
              .reqPayStatus(this.orderId)
              .then((result) => {
                // 是否支付成功
                if (result.code === 200) {
                  // 清理定时器
                  clearInterval(this.timeId)
                  // 关闭当前对话框
                  this.$msgbox.close()
                  // 提示信息
                  this.$message.success('恭喜您支付成功啦,啦啦啦!')
                  // 路由跳转
                  this.$router.push('/paysuccess')
                }
              })
              .catch((error) => {
                // 清理定时器
                clearInterval(this.timeId)
                this.$message.error(error.message || '支付失败')
              })
          }, 2000)
        })
        .catch((error) => {
          this.$message.error('支付二维码生成失败')
          // this.$message({
          //   type:'error',
          //   message:'错误了'
          // })

          // // 对象的配置写法/直接调用type属性
          // this.$message({
          //   message: '恭喜你，这是一条成功消息',
          //   type: 'success',
          // })
          // this.$message.success('成功了')
        })
    },
  },
}
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px '微软雅黑';
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>