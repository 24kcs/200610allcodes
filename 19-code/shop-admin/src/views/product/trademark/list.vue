<template>
  <div>
    <!--添加按钮-->
    <el-button type="primary" icon="el-icon-plus" style="margin-bottom:20px">添加</el-button>
    <!--表格,stripe斑马纹的效果设置-->
    <el-table :data="trademarks" stripe style="width: 100%" border>
      <el-table-column type="index" label="序号" width="80px" align="center"> </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" > </el-table-column>
      <el-table-column prop="tmLogo" label="品牌LOGO" > </el-table-column>
      <el-table-column label="操作"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'TrademarkList',
  data() {
    return {
      page: 1, // 默认是第一页
      limit: 3, // 默认是每页3条
      total: 0, // 总条数数据
      trademarks: [], // 用来存储获取到的品牌信息数据列表

    }
  },
  mounted() {
    // 测试接口
    // const result = await this.$API.trademark.getTrademarks()
    // console.log(result)
    // 调用方法,获取品牌信息数据
    this.getTrademarkList()
  },
  methods: {
    // 根据页码和每页的条数来获取品牌的信息数据
    async getTrademarkList() {
      // 调用api接口函数,保存数据
      const result = await this.$API.trademark.getTrademarkList(
        this.page,
        this.limit
      )
      if (result.code === 200) {
        // 解构出总条数和品牌的数组数据
        const { total, records } = result.data
        // 更新数据
        this.total = total
        this.trademarks = records
      } else {
        // 失败了
        this.$message.error('获取品牌列表失败')
      }
    },
  },
}
</script>
<style>
</style>