<template>
  <!--分页组件,有数据才能使用,没有数据,也不能报错-->
  <div class="pagination" v-if="pageConfig.total > 0">
    <!--上一页-->
    <button
      :disabled="currentPage === 1"
      @click="changeCurrentPage(currentPage - 1)"
    >
      上一页
    </button>
    <!--第一页-->
    <button v-if="startEnd.start > 1" @click="changeCurrentPage(1)">1</button>
    <!--第一个省略号-->
    <button disabled v-if="startEnd.start > 2">...</button>
    <!--连续页码-->
    <button
      v-if="no >= startEnd.start"
      v-for="no in startEnd.end"
      :key="no"
      @click="changeCurrentPage(no)"
      :class="{ active: currentPage === no }"
    >
      {{ no }}
    </button>
    <!--第二个省略号-->
    <button disabled v-if="startEnd.end < totalPage - 1">...</button>
    <!--最后一页-->
    <button
      v-if="startEnd.end < totalPage"
      @click="changeCurrentPage(totalPage)"
    >
      {{ totalPage }}
    </button>
    <!--下一页-->
    <button
      :disabled="currentPage === totalPage"
      @click="changeCurrentPage(currentPage + 1)"
    >
      下一页
    </button>
    <!--共多少条-->
    <button disabled style="margin-left: 30px">
      共{{ pageConfig.total }}条
    </button>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    pageConfig: {
      type: Object, // 限制传入的数据的类型
      // 设置默认的值,官方写法是:回调函数
      // default: ()=>({
      //   // 都属于专门的配置关于分页的数据
      //   total: 0, // 总条数
      //   pageNo: 1, // 默认的第一页
      //   pageSize: 5, // 每页显示的条数
      //   showPageNo: 5, // 连续的页码数
      // }),
      // 自己的写法
      default: {
        // 都属于专门的配置关于分页的数据
        total: 0, // 总条数
        pageNo: 1, // 默认的第一页
        pageSize: 5, // 每页显示的条数
        showPageNo: 5, // 连续的页码数
      },
    },
  },
  watch: {
    // 监视的是传入进来的页码值,如果变化了,立刻更新当前的页码
    'pageConfig.pageNo'(val) {
      // 立刻更新当前的页码
      this.currentPage = val
    },
  },
  data() {
    return {
      // 选中的页码(页码会随时变化)
      currentPage: this.pageConfig.pageNo,
    }
  },
  computed: {
    // 计算总的页码数(根据总的条数和每页显示的条数来计算)
    totalPage() {
      // 获取总条数和每页的条数数据
      const { total, pageSize } = this.pageConfig
      // 判断
      if (total < 0 || pageSize < 0) return
      // 计算总的页码数
      return Math.ceil(total / pageSize)
    },
    // 计算连续页码的开始页码和结束页码
    startEnd() {
      // 获取当前页码和连续页码,还有总页码
      const {
        currentPage,
        totalPage,
        pageConfig: { showPageNo },
      } = this
      // 开始页码
      let start = 0
      // 结束页码
      let end = 0
      // 计算开始页码 = 当前页码- 向下取整(连续页码/2)
      start = currentPage - Math.floor(showPageNo / 2)
      // 限定开始页码
      if (start < 1) {
        start = 1
      }
      // 计算结束页码 = 当前页码 + 向下取整(连续页码/2)
      // end = currentPage + Math.floor(showPageNo / 2)
      // 计算结束页码 = 开始页码 + 连续页码 -1
      end = start + showPageNo - 1
      // 限定结束页码
      if (end > totalPage) {
        end = totalPage
        // 修正一下开始页码
        start = totalPage - showPageNo + 1
        // 再次限定开始页码
        if (start < 1) {
          start = 1
        }
      }
      return { start, end }
    },
  },
  methods: {
    // 改变当前选中的页码
    changeCurrentPage(pageNo) {
      // 更新当前的页码
      this.currentPage = pageNo
      // 通知父级组件,页码改变了,父级组件立刻重新根据新的页码获取新的数据
      this.$emit('changeCurrentPage', pageNo)
    },
  },
}

// var obj ={
//   car:{
//     name
//   }
// }
// const {car:{name}} = obj
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
