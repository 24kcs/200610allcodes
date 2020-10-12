<template>
  <div>
    <!--上面的卡片-->
    <el-card style="margin-bottom: 20px">
      <!--使用下拉框的公共组件-->
      <CategorySelector ref="cs" @changeCategory="changeCategory" />
    </el-card>
    <el-card>
        <el-button
          type="primary"
          icon="el-icon-plus"
          >添加SPU</el-button
        >
      <!--表格-->
      <el-table :data="spuInfoList" style="width: 100%" border>
        <el-table-column type="index" label="序号" width="80px" align="center">
        </el-table-column>
        <el-table-column prop="spuName" label="SPU名称"> </el-table-column>
        <el-table-column prop="description" label="SPU描述"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row, $index }">
            <HintButton
              title="添加SKU"
              type="primary"
              icon="el-icon-plus"
              size="mini"
            />
            <HintButton
              title="修改SPU"
              type="primary"
              icon="el-icon-edit"
              size="mini"
            />
            <HintButton
              title="查看SKU"
              type="info"
              icon="el-icon-info"
              size="mini"
            />
            <HintButton
              title="删除"
              type="danger"
              icon="el-icon-delete"
              size="mini"
            />
          </template>
        </el-table-column>
      </el-table>

      
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getSpuInfoList"
      :current-page="page"
      :page-sizes="[3, 6, 9, 12]"
      :page-size="limit"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="total"
      style="margin-top: 20px; text-align: center"
      background
    >
    </el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'SpuList',
  data() {
    return {
      category1Id: '', // 一级分类的id
      category2Id: '', // 二级分类的id
      category3Id: '', // 三级分类的id
      page: 1, // 默认页码1
      limit: 3, // 默认每页的条数
      total: 0, // 总条数
      spuInfoList: [], // spu的列表数据
    }
  },
  methods: {
    // 获取spu信息数据
    async getSpuInfoList(page = 1) {
      this.page = page
      const { limit, category3Id } = this
      // 异步请求
      const result = await this.$API.spu.getSpuInfoList(
        page,
        limit,
        category3Id
      )
      if (result.code === 200) {
        // 更新数据
        // console.log(result)
        const { records, total } = result.data
        // 更新数据
        this.total = total
        this.spuInfoList = records
      }
    },
    // 自定义事件
    changeCategory({ categoryId, level }) {
      // 判断级别
      if (level === 1) {
        this.category1Id = categoryId
        // 重置数据
        this.category2Id = null
        this.category3Id = null
        this.total = 0
        this.spuInfoList = []
      } else if (level === 2) {
        this.category2Id = categoryId
        // 重置数据
        this.category3Id = null
        this.total = 0
        this.spuInfoList = []
      } else if (level === 3) {
        this.category3Id = categoryId
        // 获取当前的spu信息数据
        this.getSpuInfoList()
      }
    },
    // 分页
     handleSizeChange(val) {
      // 更新每页条数的数据
      this.limit = val
      // 重新获取数据
      this.getSpuInfoList()
    },
  },
}
</script>
<style>
</style>