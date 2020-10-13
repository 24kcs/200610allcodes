<template>
  <div>
    <!--上面的卡片-->
    <el-card style="margin-bottom: 20px">
      <!--使用下拉框的公共组件-->
      <CategorySelector ref="cs" @changeCategory="changeCategory" />
    </el-card>

    <!--下面的部分-->
    <el-card>
      <div v-show="isShowUpdateAttr">
        <!--按钮-->
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttr"
          :disabled="!category3Id"
          >添加属性</el-button
        >
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
              <el-popconfirm
                :title="`确定要删除 ${row.attrName} 吗`"
                @onConfirm="deleteAttr(row.id)"
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
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addAttrValue"
            :disabled="!formAttr.attrName.trim()"
            >添加属性值</el-button
          >
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
              <el-input
                v-if="row.edit"
                type="text"
                placeholder="请输入属性值"
                v-model="row.valueName"
                size="mini"
                :ref="$index"
                @blur="toView(row)"
                @keyup.enter.native="toView(row)"
              ></el-input>
              <span
                v-else
                @click="toEdit(row)"
                style="display: inline-block; width: 100%"
                >{{ row.valueName }}</span
              >
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
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="!isSaveValid"
          >保存</el-button
        >
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
  // 计算属性
  computed: {
    isSaveValid() {
      // return this.formAttr.attrName.trim()&&this.formAttr.attrValueList.length>0
      // 平台属性的名字必须有值,并且属性值最少有一个,那么,保存按钮可以使用才是正确的效果
      return (
        this.formAttr.attrName.trim() &&
        this.formAttr.attrValueList.some((item) => !!item.valueName.trim())
      )
    },
  },
  // 监视
  watch: {
    isShowUpdateAttr(val) {
      // 设置CategorySelector子级组件中的三个下拉框是否禁用
      this.$refs.cs.isDisabled = !val
    },
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
    // 添加属性值的操作
    addAttrValue() {
      // console.log(this.formAttr)
      // 向数组中添加一个对象数据
      this.formAttr.attrValueList.push({
        // 调用的接口中本身存在的属性
        valueName: '', // 属性值
        attrId: this.formAttr.id, // 当前的这个平台属性的id值
        // 接口中根据就没有这个属性,当前的属性值对象中,就不存在这个属性,是为了实现查看模式或者编辑模式,自己手动添加的属性(将来调用接口把当前数据真正存储到后台的时候,该属性是需要被删除的)
        edit: true, // 编辑模式和查看模式的标识
      })
      // 设置最后一个文本框有焦点
      this.$nextTick(() => {
        this.$refs[this.formAttr.attrValueList.length - 1].focus()
      })
    },

    // 进入查看模式
    toView(item) {
      // 判断当前的属性值对象中的值是否存在
      if (item.valueName) {
        item.edit = false
      }
    },
    // 进入编辑模式
    toEdit(item) {
      // 此时就可以实现编辑了
      // item对象是响应式的对象,但是此时对象后面的添加的edit属性是非响应式的属性,既然如此:该属性值发生变化,界面是不会重新渲染的
      // item.edit = true
      // 判断当前的对象中是否真的拥有这个属性,如果没有则添加一个响应式的属性,如果有则直接改变该属性的值
      if (!item.hasOwnProperty('edit')) {
        // 没有,则添加响应式的属性
        this.$set(item, 'edit', true)
      } else {
        // 有,则直接改值
        item.edit = true
      }
    },
    // 修改(添加)平台属性值操作的方法
    async addOrUpdateAttr() {
      // 干掉没用的属性数据,过滤一些无用的数据
      // this.formAttr.attrValueList.forEach(item=>{
      //   delete item.edit
      // })
      this.formAttr.attrValueList = this.formAttr.attrValueList.filter(
        (item) => {
          delete item.edit
          return item.valueName.trim()
        }
      )
      // 调用接口
      const result = await this.$API.attr.saveOrUpdateAttr(this.formAttr)
      // 判断成功还是失败
      if (result.code === 200) {
        // 提示信息
        this.$message.success(`修改成功`)
        // 关闭当前的界面
        this.isShowUpdateAttr = true
        // 重新获取数据
        this.getAttrList()
      } else {
        // 提示信息
        this.$message.error(`修改失败`)
      }
    },
    // 添加平台属性操作
    addAttr() {
      // 添加平台属性
      this.formAttr = {
        attrName: '', // 平台属性的名字
        attrValueList: [], // 平台属性值数组
        categoryId: this.category3Id, // 当前的三级分类的id
        categoryLevel: 3, // 分类的级别
      }
      // 显示添加(修改)平台属性的界面
      this.isShowUpdateAttr = false
    },
    // 点击删除平台属性按钮,实现删除平台属性的操作
    async deleteAttr(id) {
      // 调用接口
      const result = await this.$API.attr.deleteAttrById(id)
      // 判断
      if (result.code === 200) {
        // 提示信息
        this.$message.success('删除成功')
        // 重新获取平台属性数据
        this.getAttrList()
      } else {
        // 提示信息
        this.$message.error('删除失败')
      }
    },
  },
}
</script>
<style scoped>
</style>