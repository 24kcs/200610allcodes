<template>
  <div class="swiper-container" id="swL" ref="sw">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel,index) in carouselList" :key="carousel.id">
        <img :src="carousel.imgUrl" alt />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>
<script>
// 引入swiper对象
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props: {
    carouselList: Array,
  },
  mounted() {
    // console.log('mounted....执行了.....', this.carouselList.length)
  },
  watch: {
    carouselList: {
      // 该回调将会在侦听开始之后被立即调用
      handler: function () {
        // 判断
        if(this.carouselList.length===0)return
        // console.log('watch....执行了....', this.carouselList.length)
        // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.sw, {
            loop: true, // 循环模式选项
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
}
/*
  1. mounted生命周期回调---组件渲染完毕才执行----执行了3次
     第一次加载的时候是在ListContainer组件中 使用的该组件, 传入的数组的数据是4个
     第二次和第三次加载的时候在Floor组件中 使用的该组件, 传入的数组的数据是 3个 3个
     通过分析: mounted中如果输出 接收到的数组的数据是: 4 3 3
     通过浏览器控制台输出的结果来查看: 0 3 3
     究竟是分析有问题,还是浏览器的控制台输出有问题?
     通过查看页面,大轮播确实是4个图片在进行切换,所以,4是没问题的
     分析没有错误,浏览器执行也没有错误.
     到底是哪里出了问题?

    在ListContainer组件中:
      使用Carousel组件的时候,在该组件中通过强制数据绑定的指令动态的传入数据的方式,数据有或无都不会影响组件的渲染

    在Floor组件中:
      使用Carousel组件的时候,在该组件中通过强制数据绑定的指令动态的传入数据的方式,数据有或无都不会影响组件的渲染

    在Home组件中:
      直接使用了ListContainer组件,该组件可以正常的渲染
      直接使用了Floor组件,该组件中使用了v-for指令,该组件是否能够正常的渲染,要看v-for指令遍历的数组是否有数据
      当一个组件中使用了v-for指令遍历的时候,如果条件不满足,该组件是不会被渲染的

    Home组件在进行渲染的时候,内部使用了很多的子级组件,父子组件渲染的时候,先渲染子级组件,再渲染父级组件,
    此时,子级组件ListContainer正常的渲染,但是内部还有一个Carousel组件,该组件需要传递一个数组数据carouseList,但是该数据无值,且不影响该组件正常的渲染,所以,Carousel组件正常的渲染,里面的mounted方法中的代码执行了,里面的数组的长度就是0
      为什么此时没有数据,因为分发action,发送异步请求的代码在Home的mounted中执行,而如果Home组件没有渲染完毕,那么里面的异步请求也不会执行,就在内部的子级组件渲染完毕的那一刻,开始发送请求,但是大轮播图组件已经渲染完毕了,异步请求结束,有了数据就会自动的传入到Carousel组件中,内部watch监视到了数据的变化,然后执行内部的代码,开始创建Swiper对象,所以,就可以看到大轮播图的效果了

      Carousel组件,mounted一次----0,watch一次-----4


    同上,Home组件内部的Floor组件,如果要渲染,说明,v-for指令的条件肯定是满足了,但是,第一次渲染Floor组件的时候,由于此时Home组件内部的mounted没有执行,就没有发送异步请求,floors数组就没有数据,因为没有数据,所以Floor组件不会被渲染,所以,内部的Carousel组件也没有渲染,
    这个时候,Home组件已经渲染完毕,mounted回调函数中的代码就执行了,内部异步请求也就开始了,瞬间,数据被请求回来了,有了数据,就说明floors数组有了数据,Floor组件可以被遍历循环渲染,而且也向Floor组件中传递了floor对象,因此也向内部的Carousel组件传递了数组数据(<Carousel :carouselList="floor.carouselList" />)
    所以,Carousel组件内部接收到了传递进来的数组数据(Floor组件中用了两次的Carousel),所以,该组件渲染完毕后,内部的数组的数据是有值的,而数组中的数据是3个,两次使用Carousel组件,所以,mounted中出现了 3,3
    此时,已经解释完毕了, 0 ,3 ,3 而且还有0如何变成的4


    大轮播图最开始传入的数据是0,后来异步请求成功,数据获取到了,数组的数据是4个,再次传入到Carousel组件中,数据由0变成了4,数据有了变化,watch就执行,所以,0------>4 Swiper对象成功创建

    小轮播图一开始因为没有数据,所以,没有渲染,后来异步请求成功了,有了数据,直接渲染,最开始传入的数据是3,
    一共两次,每次传入的数据都是3,数据从来就没有变化过,所以,watch就没有执行,所以,浏览器中的watch就执行一次(属于大轮播图的)

    解决:因为一开始Carousel组件在渲染的时候,内部的数据是0,后来数据变化,watch就会立刻执行
    小轮播图一开始Carousel组件在渲染的时候,内部的数据是3,数据没有变化,watch就没有执行
    解决的方式:让watch最开始执行一次即可



















*/
</script>
