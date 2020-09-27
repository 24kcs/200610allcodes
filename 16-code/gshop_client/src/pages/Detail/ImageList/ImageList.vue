<template>
  <div class="swiper-container" ref="sw4">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(skuImg,index) in skuImageList" :key="skuImg.id">
        <img :src="skuImg.imgUrl" :class="{active:currentIndex===index}" @click="changeCurrentIndex(index)" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
// 引入swiper对象
import Swiper from 'swiper'
// 引入vuex中的辅助函数
import {mapGetters} from 'vuex'
export default {
  name: 'ImageList',
  data () {
    return {
      currentIndex:0 // 存储某个图片的索引的  
    }
  },
  // 计算属性
  computed: {
    // 获取vuex中的计算属性中的轮播图图片数组
    ...mapGetters(['skuImageList'])
  },
   watch: {
    skuImageList: {
      // 该回调将会在侦听开始之后被立即调用
      handler: function () {
        // 判断
        if(this.skuImageList.length===0)return
        // console.log('watch....执行了....', this.carouselList.length)
        // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.sw4, {
            slidesPerView:5, // 每一屏中显示图片的数量
            slidesPerGroup:2, // 每次移动的图片的数量
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })
      },
      immediate: true,
    },
  },
  // 方法
  methods: {
    changeCurrentIndex(index){
      // 修改当前图片的选中的索引
      this.currentIndex = index
      // 分发父级组件的事件
      this.$emit('changeCurrentIndex' ,index)
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>