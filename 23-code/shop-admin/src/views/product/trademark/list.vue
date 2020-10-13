<template>
  <div>
    <!--添加按钮-->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin-bottom: 20px"
      @click="ShowAddTrademark"
      >添加</el-button
    >
    <!--表格,stripe斑马纹的效果设置-->
    <el-table
      :data="trademarks"
      stripe
      style="width: 100%"
      border
      v-loading="loading"
    >
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称"> </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO">
        <template slot-scope="scope">
          <img :src="scope.row.logoUrl" alt="" width="100" height="60" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <!--scope 是一个对象,
          row的属性:当前这一行的对象
          $index的属性:索引
        -->
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-edit"
            @click="ShowUpdateTrademark(scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deleteTrademark(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!--分页组件的使用,
    组件中可以使用自定义事件,标签中不能使用自定义事件
    
      @size-change="handleSizeChange"    改变当前页中 每页显示的条数
      @current-change="handleCurrentChange"  改变的页码
      :current-page="currentPage4" 默认显示的是第一页
      :page-sizes="[100, 200, 300, 400]"  可以设置每页中显示多少条数据
      :page-size="100"  设置每页默认显示几条数据
      layout="total, sizes, prev, pager, next, jumper"
      :total="400" 总条数
    
    -->

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getTrademarkList"
      :current-page="page"
      :page-sizes="[3, 6, 9, 12]"
      :page-size="limit"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="total"
      style="margin-top: 20px; text-align: center"
      background
    >
    </el-pagination>

    <!--添加/修改品牌的对话框-->
    <!-- <el-dialog
      title="添加品牌"
      :visible="dialogFormTrademark"
      :before-close="() => (dialogFormTrademark = false)"
    > -->
      <el-dialog
      title="添加品牌"
      :visible.sync="dialogFormTrademark"
    >
      <!--form表单-->
      <el-form :model="form" style="width: 80%" :rules="rules" ref="ruleForm">
        <!--表单项:表单的组件标签都会放在一个单独的表单项-->
        <el-form-item
          label="品牌名称"
          :label-width="formLabelWidth"
          prop="tmName"
        >
          <el-input
            v-model="form.tmName"
            autocomplete="off"
            placeholder="请输入品牌的名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="品牌LOGO"
          :label-width="formLabelWidth"
          prop="logoUrl"
        >
          <!--图片
          
          action: 用来放置上传图片的地址的
          
          -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <!--上传成功了,就显示出来-->
            <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过2M
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormTrademark = false">取 消</el-button>
        <el-button type="primary" @click="addorUpdateTrademark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
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
      dialogFormTrademark: false, // 用来设置对话框是否显示的
      form: {
        tmName: '', // 品牌的名称
        logoUrl: '', // 用来保存上传的图片的地址
      },
      formLabelWidth: '100px',
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'change',
          },
        ],
        logoUrl: [
          {
            required: true,
            message: '请上传品牌的图片LOGO',
            trigger: 'change',
          },
        ],
      },
      loading: false, // 是否有加载的效果,默认没有效果
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
    async getTrademarkList(page = 1) {
      this.page = page
      // 显示加载的效果
      this.loading = true
      // 调用api接口函数,保存数据
      const result = await this.$API.trademark.getTrademarkList(
        this.page,
        this.limit
      )
      // 关闭加载的效果
      this.loading = false
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
    }, // end
    // 分页组件的回调函数

    handleSizeChange(val) {
      // 更新每页条数的数据
      this.limit = val
      // 重新获取数据
      this.getTrademarkList()
    },
    // handleCurrentChange(val) {
    //   // 更新页码
    //   this.page = val
    //   // 重新获取数据
    //   this.getTrademarkList()
    // },

    // end 分页的回调

    // 上传图片的回调函数
    // 上传图片成功了的回调函数
    handleAvatarSuccess(res, file) {
      // 更新图片的地址
      this.form.logoUrl = res.data
      this.$refs.ruleForm.clearValidate('logoUrl')
    },
    // 上传图片的限制的回调函数
    beforeAvatarUpload(file) {
      // 设置图片的类型
      // const isJPG = file.type === 'image/jpeg'||file.type==='image/png'
      // 当前限制的图片类型中是否包含上传图片的类型
      const isJPG = ['image/jpeg', 'image/png'].includes(file.type)
      // 限制图片的大小的
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }, // end

    // 点击确定按钮,实现添加品牌/修改的操作
    addorUpdateTrademark() {
      // 表单验证的操作(有些表单,需要点击按钮的时候才进行验证)
      // 获取当前的表单的对象,调用对应的方法,进行表单的验证
      this.$refs.ruleForm.validate(async (valid) => {
        // 整个(所有的)表单验证是否通过
        if (valid) {
          // 获取form对象
          const { form } = this
          let result
          // 判断当前的form对象中是否存在id的数据
          if (form.id) {
            // 当前点击确定按钮是修改品牌的操作
            result = await this.$API.trademark.updateTrademark(this.form)
          } else {
            // 当前点击确定按钮是添加品牌的操作
            result = await this.$API.trademark.addTrademark(this.form)
          }
          // 判断是否成功
          if (result.code === 200) {
            // 成功,提示消息,坑
            this.$message.success(`${form.id ? '修改' : '添加'}品牌成功`)
            // 关闭当前对话框
            this.dialogFormTrademark = false
            // 重新获取数据,如果是修改操作,那么应该是重新获取当前页的数据,否则是添加,添加就获取第一页的数据
            this.getTrademarkList(form.id ? this.page : 1)
          } else {
            // 失败,提示消息,坑
            this.$message.error(`${form.id ? '修改' : '添加'}品牌失败`)
          }
        }
      })
    },
    // 点击添加按钮,显示对话框,同时清空之前的数据
    ShowAddTrademark() {
      this.form = {
        tmName: '', // 清空名字
        logoUrl: '', // 清空图片
      }
      // 显示对话框
      this.dialogFormTrademark = true
      // 清理所有的表单验证的提示信息
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
    },

    // 点击修改按钮,显示对话框
    ShowUpdateTrademark(trademark) {
      // 显示对话框
      this.dialogFormTrademark = true
      // 把这一行的品牌信息对象给form对象
      this.form = { ...trademark }
    },
    // 删除操作
    deleteTrademark(trademark) {
      // 弹出对话框的操作
      this.$confirm(`您确定要删除 ${trademark.tmName} 品牌 吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          // 此时点击的是确定
          // 调用api接口函数,进行删除操作,同时传入品牌的id
          const result = await this.$API.trademark.deleteTrademarkById(
            trademark.id
          )
          // 判断是否成功
          if (result.code === 200) {
            // 提示信息
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            // 重新获取数据
            this.getTrademarkList(this.trademarks.length===1?this.page-1:this.page)
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!',
            })
          }
        })
        .catch(() => {
          // 此时点击的是取消
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
  },
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>