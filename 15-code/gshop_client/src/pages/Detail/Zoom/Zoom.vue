<template>
  <div class="spec-preview">
    <img :src="imgUrl" />
    <div class="event" ref="event" @mousemove="handleMove"></div>
    <div class="big">
      <img :src="bigImgUrl" ref="bigImg" />
    </div>
    <!--遮挡层-->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'Zoom',
  props: {
    imgUrl: String,
    bigImgUrl: String,
  },
  mounted() {
    // 获取当前的遮挡层的宽度---该数据获取一次即可
    this.maskWidth = this.$refs.event.clientWidth / 2
  },
  methods: {
    // 鼠标移动事件
    handleMove(e) {
      // 获取鼠标移动的横纵坐标
      const { offsetX, offsetY } = e
      // 获取遮挡层的宽度
      const maskWidth = this.maskWidth // 200
      // 获取遮挡层的对象
      const maskDiv = this.$refs.mask
      // 获取大图
      const bigImg = this.$refs.bigImg
      let left = 0 // 横坐标
      let top = 0 // 纵坐标
      // 计算的鼠标在遮挡层中间位置
      left = offsetX - maskWidth / 2
      top = offsetY - maskWidth / 2
      // 限定
      left = left < 0 ? 0 : left > maskWidth ? maskWidth : left
      top = top < 0 ? 0 : top > maskWidth ? maskWidth : top

      // 设置遮挡层的移动的位置
      maskDiv.style.left = left + 'px'
      maskDiv.style.top = top + 'px'

      // 设置大图的移动
      bigImg.style.left = -left * 2 + 'px'
      bigImg.style.top = -top * 2 + 'px'
    },
  },
}
</script>

<style lang="less">
.spec-preview {
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #ccc;
    overflow: hidden;
    z-index: 998;
    display: none;
    background-color: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>