<template>
  <el-form inline :model="form">
    <!--一级分类-->
    <el-form-item label="一级分类">
      <!--下拉框select的value属性中最终存储的应该是某个option中的value属性值-->
      <el-select
        v-model="form.category1Id"
        placeholder="请选择"
        @change="changeCategory1"
      >
        <el-option
          :label="c1.name"
          :value="c1.id"
          v-for="c1 in category1List"
          :key="c1.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <!--二级分类-->
    <el-form-item label="二级分类">
      <!--下拉框select的value属性中最终存储的应该是某个option中的value属性值-->
      <el-select
        v-model="form.category2Id"
        placeholder="请选择"
        @change="changeCategory2"
      >
        <el-option
          :label="c2.name"
          :value="c2.id"
          v-for="c2 in category2List"
          :key="c2.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <!--三级分类-->
    <el-form-item label="三级分类">
      <!--下拉框select的value属性中最终存储的应该是某个option中的value属性值-->
      <el-select
        v-model="form.category3Id"
        placeholder="请选择"
        @change="changeCategory3"
      >
        <el-option
          :label="c3.name"
          :value="c3.id"
          v-for="c3 in category3List"
          :key="c3.id"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'CategorySelector',
  data() {
    return {
      form: {
        category1Id: '', // 一级分类的id
        category2Id: '', // 二级分类的id
        category3Id: '', // 三级分类的id
      },
      category1List: [], // 一级分类的信息数据
      category2List: [], // 二级分类的信息数据
      category3List: [], // 三级分类的信息数据
    }
  },
  // 界面加载后的生命周期回调中获取一级分类的信息数据
  mounted() {
    // 获取一级分类的信息
    this.getCategory1List()
  },
  methods: {
    // 获取一级分类的信息
    async getCategory1List() {
      // 调用api接口函数
      const result = await this.$API.category.getCategorys1()
      // 判断是否成功
      if (result.code === 200) {
        this.category1List = result.data
      }
    },
    // 一级分类的选中内容改变后的回调
    async changeCategory1(category1Id) {
      // 重置二级分类和三级分类的id及对应的数组数据
      this.form.category2Id = null
      this.form.category3Id = null
      this.category2List = []
      this.category3List = []
      // 先分发一次父级组件的自定义事件,把一级分类的id及级别传递过去
      this.$emit('changeCategory', { categoryId: category1Id, level: 1 })
      // 调用api接口函数
      const result = await this.$API.category.getCategorys2(category1Id)
      // 判断是否成功
      if (result.code === 200) {
        this.category2List = result.data
      }
    },
    // 二级分类的选中内容改变后的回调
    async changeCategory2(category2Id) {
      // 重置三级分类的id及对应的数组数据
      this.form.category3Id = null
      this.category3List = []

      // 先分发一次父级组件的自定义事件,把二级分类的id及级别传递过去
      this.$emit('changeCategory', { categoryId: category2Id, level: 2 })
      // 调用api接口函数
      const result = await this.$API.category.getCategorys3(category2Id)
      // 判断是否成功
      if (result.code === 200) {
        this.category3List = result.data
      }
    },
    changeCategory3(category3Id) {
      // 先分发一次父级组件的自定义事件,把三级分类的id及级别传递过去
      this.$emit('changeCategory', { categoryId: category3Id, level: 3 })
    },
  },
}
</script>
<style>
</style>