<template>
  <el-form v-show="visible" label-width="100px">
    <!--SPU名称-->
    <el-form-item label="SPU名称">
      <el-input
        type="text"
        placeholder="请输入SPU名称"
        v-model="spuInfo.spuName"
      ></el-input>
    </el-form-item>
    <!--SPU品牌-->
    <el-form-item label="品牌">
      <el-select v-model="spuInfo.tmId">
        <el-option
          :label="tm.tmName"
          :value="tm.id"
          v-for="(tm, index) in trademarkList"
          :key="tm.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <!--SPU描述-->
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        rows="4"
        placeholder="请输入描述信息"
        v-model="spuInfo.description"
      ></el-input>
    </el-form-item>
    <!--SPU图片-->
    <el-form-item label="SPU图片">
      <el-upload
        action="/dev-api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :file-list="spuImageList"
        :before-upload="beforeAvatarUpload"
        multiple
      >
        <i class="el-icon-plus"></i>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过2M
        </div>
      </el-upload>

      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-form-item>
    <!--销售属性-->
    <el-form-item label="销售属性">
      <el-select
        v-model="attrId"
        :placeholder="`${
          unSelectedSaleAttrList.length > 0
            ? `还有${unSelectedSaleAttrList.length}个可以选择`
            : '没有啦'
        }`"
      >
        <el-option
          :label="attr.name"
          :value="attr.id"
          v-for="(attr, index) in unSelectedSaleAttrList"
          :key="attr.id"
        ></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>
      <!--表格-->
      <el-table
        :data="spuInfo.spuSaleAttrList"
        style="width: 100%; margin-top: 20px"
        border
      >
        <el-table-column type="index" label="序号" width="80px" align="center">
        </el-table-column>
        <!--prop中绑定的是每一行对象中的某个属性-->
        <el-table-column prop="saleAttrName" label="属性名" width="150px">
        </el-table-column>
        <el-table-column label="属性值名称列表">
          <template slot-scope="{ row, $index }">
            <el-tag
              :key="value.id"
              v-for="value in row.spuSaleAttrValueList"
              closable
              :disable-transitions="false"
              @close="handleClose(value)"
            >
              {{ value.saleAttrValueName }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="row.edit"
              v-model="row.saleAttrValueName"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput(row)"
              >+ 添加</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="{ row, $index }">
             <el-popconfirm
                :title="`确定要删除 ${row.saleAttrName} 吗`"
                @onConfirm="deleteAttrValue($index)"
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
    </el-form-item>
    <!--两个按钮-->
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="back">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'SpuForm',
  // 接收父级组件传递过来的数据
  props: ['visible'],
  data() {
    return {
      spuId: '', // spu的id值
      spuInfo: {
        spuName: '', // spu的名字
        description: '', // spu描述信息
        category3Id: '', // 三级分类id的信息数据
        tmId: '', // 品牌的id
        spuSaleAttrList: [], // 销售属性信息数组
        spuImageList: [], // 图片数组信息数据
      }, // spuInfo对象
      trademarkList: [], // 品牌信息数据
      spuImageList: [], // 图片信息数据
      saleAttrList: [], // 销售属性数据
      // 上传图片的组件所需要的两个属性
      dialogImageUrl: '', // 显示大图的地址
      dialogVisible: false, // 是否显示大图(预览大图效果)
      attrId: '', // 用来存储选中的某个平台属性的id值
      // 当前动态编辑的tag组件中要使用的两个属性
      inputVisible: false,
      inputValue: '',
    }
  },
  // 计算属性
  computed: {
    // 没有被选择的销售属性数据
    unSelectedSaleAttrList() {
      // 获取所有的销售属性,还要获取当前的spuInfo对象中已经存在的销售属性
      const {
        saleAttrList,
        spuInfo: { spuSaleAttrList },
      } = this
      return saleAttrList.filter(
        (sa) => !spuSaleAttrList.some((ssa) => ssa.saleAttrName === sa.name)
      )
    },
  },
  methods: {
    // 初始化数据的方法
    initUpdateData(spuId) {
      // 保存spuId
      this.spuId = spuId
      // 根据spuId获取spuInfo对象信息
      this.getSpuInfo()
      // 根据spuId获取当前的spuInfo对象中的所有的图片信息数据数组
      this.getSpuImageList()
      // 获取所有的品牌信息数据数组
      this.getTrademarkList()
      // 获取所有的销售属性数据数组
      this.getSpuSaleAttrList()
    },
    // 根据spuId获取spuInfo对象信息
    async getSpuInfo() {
      const result = await this.$API.spu.getSpuInfoById(this.spuId)
      // 更新数据
      this.spuInfo = result.data
    },
    // 根据spuId获取当前的spuInfo对象中的所有的图片信息数据数组
    async getSpuImageList() {
      const result = await this.$API.sku.getSpuImageList(this.spuId)
      // 更新数据
      const spuImageList = result.data
      // 遍历当前数组,为当前数组中的每个对象添加name和url属性(为什么?因为upload组件要想显示图片,必须使用name和url属性)
      spuImageList.forEach((item) => {
        item.name = item.imgName
        item.url = item.imgUrl
      })
      this.spuImageList = spuImageList
    },
    // 获取所有的品牌信息数据数组
    async getTrademarkList() {
      const result = await this.$API.trademark.getTrademarkList()
      // 更新数据
      this.trademarkList = result.data
    },
    // 获取所有的销售属性数据数组
    async getSpuSaleAttrList() {
      const result = await this.$API.spu.getBaseSaleAttrList()
      // 更新数据
      this.saleAttrList = result.data
    },

    // 移除某个预览的图片的时候,立刻更新当前的图片数组数据
    handleRemove(file, fileList) {
      // 更新图片数组
      this.spuImageList = fileList
    },
    // 图片有放大镜的效果
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 图片上传成功之后立刻更新当前的图片数组数据
    handleSuccess(res, file, fileList) {
      this.spuImageList = fileList
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

    // 点击删除按钮,干掉当前这一行的销售属性对象数据
    deleteAttrValue(index){
      this.spuInfo.spuSaleAttrList.splice(index,1)
    },
    // 销售属性值所需要的回调函数===============================

    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput(attr) {
      // 要进入到编辑模式
      // 因为attr是销售属性对象,edit这个属性是后添加的,不是响应式的属性数据,所以,直接修改true或者false,是不是让界面渲染的
      // attr.edit = true
      if(!attr.hasOwnProperty('edit')){
        // 添加这个响应式属性
        this.$set(attr,'edit',true)
      }else{
        attr.edit= true
      }
      this.$nextTick((_) => {
        // 获取焦点
        // this.$refs.saveTagInput.$refs.input.focus()
        this.$refs.saveTagInput.focus()
      })
    },

    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },

    // 取消按钮
    back() {
      // 隐藏当前的界面
      // this.visible = false
      this.$emit('update:visible', false)
    },
  },
}
</script>
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>