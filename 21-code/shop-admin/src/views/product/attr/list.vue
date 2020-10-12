<template>
  <div>
    <!--上面的卡片-->
    <el-card style="margin-bottom: 20px">
      <!--使用下拉框的公共组件-->
      <CategorySelector @changeCategory="changeCategory" />
    </el-card>

    <!--下面的部分-->
    <el-card>
      <div v-show="isShowUpdateAttr">
        <!--按钮-->
        <el-button type="primary" icon="el-icon-plus">添加属性</el-button>
        <!--表格-->
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150px">
          </el-table-column>
          <el-table-column prop="attrValueList" label="属性值列表">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="info"
                v-for="(item, index) in row.attrValueList"
                :key="item.id"
                >{{ item.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template slot-scope="{ row, $index }">
              <HintButton
                title="修改"
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showUpdateAttr(row)"
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
      </div>
      <div v-show="!isShowUpdateAttr">
        <!--表单的标签-->
        <el-form inline :model="formAttr">
          <el-form-item label="属性名">
            <el-input
              v-model="formAttr.attrName"
              placeholder="请输入属性名"
            ></el-input>
          </el-form-item>
        </el-form>
        <!--两个按钮-->
        <div style="margin-bottom: 20px">
          <el-button type="primary" icon="el-icon-plus">添加属性值</el-button>
          <el-button @click="isShowUpdateAttr = true">取消</el-button>
        </div>
        <!--表格-->
        <el-table
          :data="formAttr.attrValueList"
          style="width: 100%; margin-bottom: 20px"
          border
        >
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="valueName" label="属性值名称">
            <template slot-scope="{ row, $index }">
              <!-- <el-input></el-input> -->
              <span>{{ row.valueName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定要删除 ${row.valueName} 吗`"
                @onConfirm="deleteValue($index)"
              >
                <HintButton
                  title="删除"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="isShowUpdateAttr = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
// 按需引入
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'AttrList',
  data() {
    return {
      category1Id: '', // 一级分类的id
      category2Id: '', // 二级分类的id
      category3Id: '', // 三级分类的id
      attrList: [], // 用来存储分类信息对应的平台属性数据
      isShowUpdateAttr: true, // 默认展示平台属性数据界面,否则展示的是修改(添加)平台属性的界面
      // 暂且是用来存储要修改的平台属性对象
      formAttr: {
        attrName: '', // 属性的名字
        attrValueList: [], // 属性值数组
      },
    }
  },
  methods: {
    // 获取分类信息对应的平台属性数据
    async getAttrList() {
      // 调用接口
      const result = await this.$API.attr.getAttrList(
        this.category1Id,
        this.category2Id,
        this.category3Id
      )
      // 判断是否成功
      if (result.code === 200) {
        // 更新数据
        this.attrList = result.data
      }
    },
    // 子级组件中三个级别分类信息选中后,分发该事件,及执行对应的这个回调函数,传递分类的id
    changeCategory({ categoryId, level }) {
      // 判断当前的级别是1,还是2,还是3,级别不同,存储不同的分类的id,只有三级分类的时候,调用接口,发送请求,获取平台属性数据
      if (level === 3) {
        // 需要保存三级分类的id
        this.category3Id = categoryId
        // 调用接口
        this.getAttrList()
      } else if (level === 1) {
        // 重置二级分类和三级分类的id及平台属性数组
        this.category2Id = null
        this.category3Id = null
        this.attrList = []
        // 需要保存一级分类的id
        this.category1Id = categoryId
      } else if (level === 2) {
        // 重置三级分类的id及平台属性数组
        this.category3Id = null
        this.attrList = []
        // 需要保存二级分类的id
        this.category2Id = categoryId
      }
    },
    // 点击修改按钮,切换修改平台属性的界面
    showUpdateAttr(attr) {
      // 切换界面
      this.isShowUpdateAttr = false
      // 传递数据
      // 两个对象的地址指向的是相同的,所以,其中一个对象的数据发生变化,另一个也会变化
      // this.formAttr = attr
      // 浅拷贝
      // this.formAttr = { ...attr }
      // 深拷贝
      this.formAttr = cloneDeep(attr)

    },
    // 删除某个平台属性值 对象
    deleteValue(index) {
      this.formAttr.attrValueList.splice(index, 1)
    },
  },
}
</script>
<style scoped>
</style>