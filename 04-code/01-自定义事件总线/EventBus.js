/**
 * 
 * 自己定义事件总线,通过该事件总线对象调用相关的方法实现绑定事件/解绑事件/分发事件的相关方法
 * EventBus---->事件总线对象
 * 事件类型/事件名字
 * 事件监听/该事件对应的回调函数
 * EventBus.$on('事件的类型',事件监听)
 * EventBus.$emit('事件的类型',参数数据)
 * EventBus.$off('事件的类型') 解绑所有的事件
 * 
 * eventName----事件类型----事件名字
 * listener-----事件监听----事件对应的回调函数
 * data------事件分发的时候所需要的参数数据
 * --------------------
 * EventBus.$on(eventName,listener)----绑定事件----存储事件名字和回调函数
 * EventBus.$emit(eventName,data)-----分发事件-----根据事件名字找到对应的回调函数并调用及传参
 * EventBus.$off(eventName)-----解绑事件---删除
 * 
 * 例子:
 * EventBus.$on('add',f1)---绑定事件
 * EventBus.$on('add',f2)----绑定事件
 * EventBus.$on('del',f3)----绑定事件
 * 需要一个大的容器来存储事件类型及对应的回调函数---对象,每个事件中如果有多个的回调函数,那么就用数组来存储
 * 对象容器------->{'add':[f1,f2],'del':[f3]}
 * 
 * 
 * 
 * 
 * 
 */

; (function (window) {
  // 定义事件总线对象
  const EventBus = {};
  // 大的容器对象--->来存储事件类型及对应的回调函数
  // {'add':[f1,f2],'del':[f3],'say':[]---小容器}
  let listenerContainer = {}; // 大容器
  // 绑定事件的方法
  // EventBus.$on('add',f1)
  EventBus.$on = function (eventName, listener) {
    // 根据事件名字在大的容器对象中找对应的数组(用来存储该事件对应的回调函数数组)
    let listeners = listenerContainer[eventName];
    // 判断存储回调函数的小容器是否存在
    if (!listeners) {
      // 创建小容器
      listeners = [];
      // 把事件类型及对应的回调函数数组,以键值对的方式存储到大的容器中
      listenerContainer[eventName] = listeners
    }
    listeners.push(listener)
  };

  // 分发事件的方法
  //  {'add':[f1,f2]}
  EventBus.$emit = function (eventName, data) {
    // 根据事件名字在大的容器对象中找对应的数组(用来存储该事件对应的回调函数数组)
    let listeners = listenerContainer[eventName];
    // 判断该数组是否存在,并且数组中是否有数据
    if (listeners && listeners.length) {
      // 遍历数组中的每个函数,调用并传入参数
      listeners.forEach(listener => {
        listener(data)
      })
    }
  };
  // 解绑事件的方法
  EventBus.$off = function (eventName) {
    // 没传
    if (typeof eventName === 'undefined') {
      listenerContainer = {}
    } else {
      // 传了
      // listenerContainer[eventName]=[]
      // 或者
      delete listenerContainer[eventName]
    }
  };
  // 暴露该对象给window
  window.EventBus = EventBus;
})(window);