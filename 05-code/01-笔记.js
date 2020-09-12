/**
 * 
 * 前端的框架一共有三个:
 * 1.AngularJS(2009年)----Misko Hevery(米斯科·赫维尔)--目前由谷歌维护
 * 2.Vue(2014年2月)------尤雨溪------目前github----171k
 * 3.React(2013年发布)----facebook----目前github---->154k
 *  Vue和React的分量(看github的搜索)
 * 1)	借鉴angular的模板和数据绑定技术
 * 2)	借鉴react的组件化和虚拟DOM技术
 * 1. Vue是什么？
 *  Vue是一个渐进式的JavaScript框架
 *  渐进式的解释: 所谓的渐进式,就是Vue本身实现的功能是有限的,但是相关的插件有很多,只要安装或者引入使用即可完成更多的功能
 *  举例: 一台拖拉机的功能是有限的,但是它有很多的工具(翻地的工具,拉货的车厢,载人的车斗)
 *        拖拉机就是Vue,其他的工具就是插件或者相关的包
 * 
 * 
 * Vue.js 不支持 IE8 及其以下版本，因为 Vue.js 使用的 ECMAScript 5 特性在 IE8 无法模拟。Vue.js 支持所有兼容 ECMAScript 5 的浏览器
 * 
 * 2. Vue的使用三种方式:
 *  1) 通过CDN在线引入----第一个文件演示
 *  2) 通过本地引入vue.js的方式---脚手架之前演示
 *  3) 通过下载脚手架的方式(脚手架2要熟练使用,脚手架3/4要熟练使用)----重点
 * 3. Vue的基本语法:
 *  1) 模版语法: 就是html的模版中使用vue的相关的语法(插值,强制数据绑定指令,双向数据绑定指令,事件绑定指令)
 *  2) 条件渲染指令:v-if(v-else,v-else-if),v-show
 *    v-if和v-show的相同点:都可以控制标签的显示/隐藏,里面所用表达式是布尔类型
 *    v-if和v-show的不同点:v-if对应的标签在DOM树可能存在/不存在,v-show控制的标签的style(display是不是none)
 *  3) 强制数据绑定指令: v-bind,控制任何的一个标签中的任意的一个属性的值是动态的(简写  :属性名字="表达式")
 *  4) 绑定事件指令:v-on,为标签绑定事件的,简写  @事件名字="回调函数"
 *  5) 列表渲染指令:v-for,遍历数组,遍历对象,注:遍历数据的时候,最好要在后面动态的绑定key属性,用来提升虚拟DOM渲染的
 *  6) 双向数据绑定指令在表单中使用(v-model指令(value属性配合input事件))
 *  7) Vue中标签样式操作的两种方式:    style 和  class 
 * 4. Vue的面试题
 *  1) 请说说你对Vue的理解(请说说你对Vue的看法)
 *  2) Vue的优点
 *      1)	借鉴angular的模板和数据绑定技术
 *      2)	借鉴react的组件化和虚拟DOM技术
 *  3) 请说出Vue中常见的7个指令
 *  4) 双向数据绑定和双向数据流的理解(双向数据流在Vue课程结束后,面试精讲中进行讲解)
 *  5) 说说你对MVVM模式的理解(如果学过后台,可以顺便提一下MVC)
 *    MVVM:M--->Model,v--->view(DOM视图),vm--->Vue的实例(监听DOM和数据绑定操作)
 * 如果数据变化了,视图就会改变,改变视图,数据也会变化,就通过Vue来连接这种关系，也是一种方式,也是一种模式,MVVM模式
 *    MVC:M是指业务模型，V是指用户界面，C则是控制器，使用MVC的目的是将M和V的实现代码分离，从而使同一个程序可以使用不同的表现形式
 * 
 * 如何在Vue中获取DOM元素?
 * $refs
 *  6) 组件化的理解(需要解析什么是组件,什么是组件化)
 *    组件:具有特定功能效果的集合
 * Vue中绑定事件的对应的回调函数中的事件参数对象如何传递,可以在通过v-on指令绑定事件的时候,对应的回调函数内部使用$event即可传入到回调函数内部
 * 事件修饰符:
 * .prevent:阻止浏览器的默认行为
 * .stop:阻止事件冒泡
 * 按键修饰符:
 * .enter-----.13  按下回车键
 * 生命周期:当Vue的实例对象创建开始到该对象被销毁的过程中,在某一个时刻或者某个特殊的情况下,某些回调函数会自动的被调用
 * 11个回调函数---回调钩子
 * 数据初始化之前和之后
 * 界面渲染之前和之后
 * 界面更新之前和之后
 * 销毁之前和之后
 * 缓存组件的切换-------
 * 子孙组件报错的时候
 * 
 * 过渡和动画:
 * transition的标签 设置name属性
 * .名字-enter
 * .名字-enter-active
 * .名字-enter-to
 * .名字-leave
 * .名字-leave-active
 * .名字-leave-to
 * 
 * Vue中的过滤器目前需要自己定义
 * Vue.filter('过滤器的名字',回调函数)
 * Vue中的指令分为:内置指令和自定义指令
 * 指令:全局指令和局部指令
 * 全局指令的定义方式
 * Vue.directive('不带v-开头的指令名字',回调函数(el,binding))
 * el----使用该指令的标签对象,bingding数据的对象.value获取该标签中使用指令的时候的表达式
 * 局部指令的定义方式
 * directives:{
 *   '不带v-开头的指令的名字'(el,binding){}
 * }
 * 
 * Vue中的插件,如果要自己定义一个插件,那么插件最终也会暴露出来一个对象
 * 在定义插件的时候,需要为对象添加一个install的方法
 * 插件对象内部所有的方法或者属性或者插件的指令都要在install方法中定义
 * 在使用插件的时候,首先需要Vue.use(插件对象),然后才可以真正的时候插件
 * 如果定义插件的时候,没有使用install的方法,Vue.use()也是无效果
 * 
 * 关于key:尽可能使用不会变化的数据作为key的值来使用,一般推荐使用id
 * 如果遍历的数据,仅仅是展示,而没有其他的操作,可以使用index
 * 
 * 计算属性:computed,
 * 监视:watch,
 * 
 * cmd命令窗口中
 * node -v 版本
 * npm -v 版本
 * https://github.com/vuejs/vue-cli/tree/v2#vue-cli--
 * 安装脚手架的命令工具
 * npm install -g vue-cli
 * vue -V 版本
 * 
 * 以上 都是在cmd中执行的
 * 找到一个合适的目录中,打开命令窗口,进行下载操作
 * 下载脚手架对应的vue的项目(模版)
 * vue init webpack 项目名字
 * 
 * npm run dev  运行项目
 * 
 * npm run build 打包项目---将来在公司中开发完毕项目后,需要上线的时候,你的同事找你要的打包文件
 * 
 * serve dist 运行打包文件
 * 
 * 
 * 项目模版中的源码的分析及部分代码的设置操作
 * 
 * 自己实现源码
 * 
 * todoList案例
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */



 /**
  * 
  * 1.app目录中
  * 
  * build目录：webpack的相关配置,
  * webpack.base.conf.js文件第25行代码,可以修改程序主入口目录路径
  * 
  * config目录中index.js文件中第18行代码,autoOpenBrowser: true,如果为true,则表示项目启动的时候会在浏览器中自动的打开
  * 
  * node_modules目录:依赖包目录
  * static目录:该项目所需要的一些静态资源的目录(css/图片)
  * .babelrc:babel的配置文件,如果今天的例子完毕后,演示mint-ui的时候进行配置
  * .eslintignore 文件,可以做eslint的配置(够狠)
  * .eslintrc.js文件,可以做eslint的配置(够麻烦)
  *   eslint语法检查也可以通过注释的方式进行设置
  * .gitignore文件,用来配置git上传的
  * index.html是程序的主要的html文件,内部必然有id为app的div,最终整个项目中所有的组件都会放到div容器中,在页面中展示出来
  * 
  * src目录:程序的主入口目录
  * .vue文件,是组件文件,一个这样的文件,就是封装了一个组件
  * src目录中的assets目录:全部组件/部分组件所需的公共资源(css或者图片)
  * components目录:存放的是所有的普通组件文件
  * 
  * 
  * 脚手架的下载:
  * 版本2: npm install vue-cli -g 
  * 版本3/4:
  * 
  * 下载项目模版: vue init webpack 项目名
  * 运行项目: npm run dev
  * 打包项目: npm run build 产生对应的dist目录
  * 运行打包项目: serve dist 
  * 
  * 组件:具有特定功能效果的集合/包含了html+css+js
  * 组件化:项目开发的时候以多个组件进行开发,就形成了组件化
  * 
  * 组件的关系:父子关系(直接/间接),兄弟关系
  * 组件和组件之间有的时候需要传递数据,为了方便操作
  * 组件的通信:组件和组件之间有的时候需要传递数据
  * 组件通信的方式:
  * props:父子组件之间进行通信(传递的是属性,属性中存储的值可以是:对象/函数/数组/...任意类型)
  * props在接收父级组件传递的数据的书写方式不同:
  *   props:[]
  *   props:{}
  *   props:{
  *     数据:{
  *        type:类型,
  *        required:布尔类型
  *     }
  *   }
  * 父子组件传递数据可以采用函数属性的方式:属性中存储的是函数
  * 
  * 组件可以进行拆分:可以按照布局进行拆分,也可以按照功能进行拆分,并命名
  * 组件的名字:一般都是以首字母大写命名
  * 组件在时候的时候,需要先引入,然后注册,之后使用
  * 组件使用:可以按照标签的方式进行书写
  * 如果组件只有一个单词命名,那么首字母是大写的,在使用的时候,可以全都是小写的方式以标签的形式进行使用,但是,一般是不太推荐的,如:
  * Hello组件,使用: <Hello/>推荐    <hello/>不太推荐, <Hello></Hello> 如果需要在组件内书写其他内容
  * 有的时候为了组件明确其含义,组件名字也可能是多个单词的组合,如:
  * HelloWorld组件, 使用<HelloWorld/> 或者<hello-world/>
  * 
  * 脚手架中的static目录存放的是index.html中所需的静态的资源(图片/css/图标字体)
  * 
  * 
  * todoList案例----组件通信的不同的方式
  * props: 父子组件通信
  * 自定义事件:父子组件通信
  * 事件总线($bus):任意组件通信
  * 消息订阅(PubSub):任意组件通信,PubSub属于一个单独的插件(别人封装好的js库),不属于Vue
  * 插槽:相当于占位(挖坑)----填坑
  * Vuex(Vue中非常重点的)
  * 
  * 后台还有高级组件通信方式
  * 
  * 
  * 自定义事件总线的原理
  * 自定义消息订阅的原理
  * Vue中如何实现异步操作及相关的案例
  * vue-resource
  * axios
  * vue-router---路由(SPA)
  * 
  * 
  * 复习:
  * 组件之间通信的方式:---以下都属于最基本的通信方式---面试题
  * 1.props:父子组件之间通信,通过强制绑定数据的指令,设置动态的属性,内部可以存储相关的数据
  *   <Header :addTodo="addTodo" /> Header组件内部通过props的方式进行接收
  *   props:[]
  *   props:{}
  *   props:{
  *     数据:{
  *       type:类型,
  *       required:是否是必须传的
  *     }
  *   }
  * 2.自定义事件:在组件上使用v-on绑定事件的指令的方式向这个子级组件内部传入一个自定义的事件
  *   该子级组件内部,需要通过组件对象.$emit('自定义事件',参数),从而实现父子组件之间通信
  * 3.事件总线:任意组件之间通信,首先在Vue的prototype属性上添加一个属性,内部存储的是Vue的实例对象,任何的一个组件都直接/间接的继承自Vue,组件也是一个对象,组件对象可以使用Vue原型(prototype)上的属性或者方法
  * 4.PubSub消息订阅:一个插件,可以实现任意组件的通信,不属于Vue
  * 
  * 5.插槽:占位,在某个组件中进行占位,在需要该组件的时候,向所占的位置,传入相关的html内容,也可以传递数据,组件之间的通信,父子组件之间通信
  * 插槽:普通插槽,具名插槽(命名插槽),作用域插槽
  * 普通插槽没有名字,直接使用---暂且没有讲
  * 具名插槽有名字
  * 作用域插槽通过slot-scope进行使用(v-slot)---暂且没有讲
  * 6.Vuex
  * 总结:无论是事件总线还是消息订阅(PubSub),在绑定事件或者说订阅消息之后,在组件即将要销毁之前,最好可以解绑事件或者取消消息订阅
  * 
  * 
  * 
  * 
  * 在Vue中如何异步请求操作
  * 1. 使用vue-resource插件,需要先安装,引入引入插件,并声明使用插件
  * npm install vue-resource 
  * main.js中引入VueResource
  * import VueResource from 'vue-resource'
  * Vue.use(VueResource)
  * 此时在组件对象中,通过this.$http.方法名字(地址) 即可发送异步请求
  * 
  * 2.使用插件axios,---推荐
  * 
  * 
  * 
  * 
  * 今天内容:
  * 1.element-ui(mint-ui)的简单的配置及使用演示一下
  * 2.Vue中如何异步请求操作及相关的例子
  * 3.vue-router(简单也很复杂)
  * 4.Vuex
  * 
  * 
  * 
  * vue-router 路由器:路由的管理工具
  * 路由:指的是一种映射关系,地址和组件的关系
  * 组件:具有特定功能效果的集合(html+css+js)
  * 组件:普通的组件和路由组件--------
  * 路由组件:普通组件通过注册和某个地址发生了关系,此时该组件就是路由组件
  * 地址:路由地址---->路由链接地址
  * 
  * 要想使用路由,必须要先注册路由,然后通过声明式路由或者编程式路由实现单页面应用
  * 声明式路由:路由链接(地址)和路由视图(展示某个组件内容的)组成
  * 编程式路由:通过js代码的方式来实现地址和组件的效果展示
  * 
  * 普通的组件一般放在components目录中
  * 如果当前的组件是路由组件,一般推荐放在pages目录中(上班后看老大)
  * 
  * 
  * 路由的使用步骤:
  * 
  * 1. 安装路由器插件
  * npm install vue-router
  * 2. 引入路由器对象并实例化,而且需要在实例化的Vue中进行路由器的注册
  * 一般情况路由器的实例化和暴露会放在一个单独的目录中router目录,内部有一个index.js文件(名字可改)
  * 
  * 
  * 
  * 路由视图可以传递数据
  * 
  * 
  * 
  * 
  * 
  * 
  * 
  * 
  */