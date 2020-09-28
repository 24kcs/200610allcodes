<template>
  <div class="order-content">
    <div class="title">
      <h3>我的订单</h3>
    </div>
    <div class="chosetype">
      <table>
        <thead>
          <tr>
            <th width="29%">商品</th>
            <th width="31%">订单详情</th>
            <th width="13%">收货人</th>
            <th>金额</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="orders">
      <!--订单-->
      <table class="order-item" v-for="(item, index) in orders" :key="item.id">
        <thead>
          <tr>
            <th colspan="5">
              <span class="ordertitle"
                >{{ item.createTime }}　订单编号：{{ item.outTradeNo }}
                <span class="pull-right delete"
                  ><img src="./images/delete.png" /></span
              ></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(goods, index) in item.orderDetailList" :key="goods.id">
            <td width="60%">
              <div class="typographic">
                <img :src="goods.imgUrl" />
                <a href="javascript:;" class="block-text"
                  >{{ goods.skuName }}--{{ goods.orderPrice }}元</a
                >
                <span>x{{ goods.skuNum }}</span>
                <a href="javascript:;" class="service">售后申请</a>
              </div>
            </td>
            <!--让里面的td产生的个数进行一个限制.使用div可以实现最终的效果,但是影响结构样式,-->
            <template v-if="index === 0">
              <td
                :rowspan="item.orderDetailList.length"
                width="8%"
                class="center"
              >
                {{ item.consignee }}
              </td>
              <td
                :rowspan="item.orderDetailList.length"
                width="13%"
                class="center"
              >
                <ul class="unstyled">
                  <li>总金额¥{{ item.totalAmount }}</li>
                  <li>
                    {{ item.paymentWay === 'ONLINE' ? '在线支付' : '货到付款' }}
                  </li>
                </ul>
              </td>
              <td
                :rowspan="item.orderDetailList.length"
                width="8%"
                class="center"
              >
                <a href="javascript:;" class="btn"
                  >{{ item.orderStatus === 'UNPAID' ? '未支付' : '已完成' }}
                </a>
              </td>
              <td
                :rowspan="item.orderDetailList.length"
                width="13%"
                class="center"
              >
                <ul class="unstyled">
                  <li>
                    <a href="javascript:;">评价|晒单</a>
                  </li>
                </ul>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <!--分页-->
    <Pagination
      :pageConfig="{ total, pageNo, pageSize: limit, showPageNo: 5 }"
      @changeCurrentPage="getMyOrderList"
    />
  </div>
</template>
<script>
export default {
  name: 'MyOrder',
  data() {
    return {
      pageNo: 1, // 默认第一页
      limit: 10, // 每页的条数
      total: 0, // 总条数数据
      orders: [], // 用来存储当前的每页的订单信息数据的
    }
  },
  // 界面渲染后
  mounted() {
    this.getMyOrderList()
  },
  methods: {
    // 获取订单信息数据列表
    async getMyOrderList(pageNo=1) {
      this.pageNo = pageNo
      // 调用api接口函数,发送请求
      const result = await this.$API.reqOrderList(this.pageNo, this.limit)
      if (result.code === 200) {
        // 获取里面的总条数数据,还有当前这一页的数组(每个订单信息数据对象)
        const { records, total } = result.data
        // 更新数据
        this.total = total
        this.orders = records
        console.log(this.orders)
      }
    },
  },
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.order-content {
  margin: 0 20px;
  color: #666;

  //标题
  .title {
    margin-bottom: 22px;
    border: 1px solid #ddd;

    h3 {
      padding: 12px 10px;
      font-size: 15px;
      background-color: #f1f1f1;
    }
  }

  //表头
  .chosetype {
    margin-bottom: 15px;
    color: #666;

    table {
      border: 1px solid #e6e6e6;
      border-collapse: separate;
      border-radius: 2px;
      width: 100%;
      max-width: 100%;
      border-spacing: 0;

      th {
        padding: 6px 8px;
        color: #666;
        font-weight: 700;
        vertical-align: bottom;
        background-color: #f4f4f4;
        line-height: 18px;
        border-bottom: 1px solid #e6e6e6;
        font-size: 12px;
        text-align: left;
      }
    }
  }

  // 表单内容
  .orders {
    font-size: 12px;

    a {
      &:hover {
        color: #4cb9fc;
      }
    }

    table {
      border: 1px solid #e6e6e6;
      border-collapse: collapse;
      border-radius: 2px;
      width: 100%;
      margin-bottom: 18px;
      max-width: 100%;

      th {
        padding: 6px 8px;
        line-height: 18px;
        text-align: left;
        vertical-align: bottom;
        background-color: #f4f4f4;
        font-size: 12px;
        color: #666;

        .pull-right {
          float: right;
          cursor: pointer;

          img {
            margin-right: 10px;
            vertical-align: middle;
          }
        }
      }

      td {
        font-size: 12px;
        color: #666;
        padding: 6px 8px;
        line-height: 18px;
        text-align: left;
        vertical-align: middle;
        border: 1px solid #e6e6e6;

        &.center {
          text-align: center;
        }

        .typographic {
          img {
            float: left;
            margin-right: 10px;
            width: 100px;
            height: 100px;
          }

          a {
            float: left;
            min-width: 80px;
            max-width: 250px;
            color: #e1251b;

            &.service {
              color: #666;
            }
          }

          span {
            float: left;
            min-width: 80px;
            max-width: 250px;
            text-align: center;
          }
        }
      }
    }
  }

  // 分页
}
</style>