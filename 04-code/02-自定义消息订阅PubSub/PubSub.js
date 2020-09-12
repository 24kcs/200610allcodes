/**
 * 
 * PubSub---消息订阅对象
 * PubSub.subscribe('消息名字',回调函数)----订阅消息
 * PubSub.publish('消息名字',参数数据)----发布消息
 * PubSub.publishSync('消息名字',参数数据)---发布消息
 * PubSub.unsubscribe(标识/消息名字/不传)---取消订阅
 *
 * PubSub---消息订阅对象
 * PubSub.subscribe(msg,subscriber)----订阅消息
 * PubSub.publish(msg,data)----发布消息
 * PubSub.publishSync(msg,data)---发布消息
 * PubSub.unsubscribe(token/msg/不传)---取消订阅
 * 
 * msg----->消息名字------->事件类型/事件名字
 * subscriber----回调函数---->事件监听/事件回调
 * data----参数
 * token---标识
 * 
 * 
 * 
 * 订阅消息
 * PubSub.subscribe('add',f1)
 * PubSub.subscribe('add',f2)
 * PubSub.subscribe('del',f3)
 * 
 * 大容器:存储的是消息名字及对应的对象容器(标识和回调以键值对的方式进行存储)
 * {'add':{token1:f1,token2:f2}}
 * 
 * 
 * 
 * 
 */

; (function (window) {
  // 定义消息订阅对象
  const PubSub = {};
  // 大容器:存储消息名字及对应的对象容器(对象容器中存储的是标识和回调)
  let subscriberContainer = {};
  let id = 0; // 用来制作token标识的
  // 消息订阅
  // 大容器: {'add':{token1:f1}}
  // PubSub.subscribe('add',f2)
  PubSub.subscribe = function (msg, subscriber) {
    // 根据消息名字获取对应的小容器对象
    let subscribers = subscriberContainer[msg];
    // 判断该小容器对象是否存在
    if (!subscribers) {
      // 创建小容器
      subscribers = {};
      // 大容器:  {'add':{token1:f1}}
      subscriberContainer[msg] = subscribers
    }
    // 制作token标识
    let token = 'id_' + ++id;
    // 把token和对应的回调以键值对的方式存储到小容器对象中
    subscribers[token] = subscriber
    // 返回当前的这个消息对应的回调函数的token标识
    return token;
  };

  // 异步发布消息
  PubSub.publish = function (msg, data) {
    // 根据传入进来的消息名字,获取对应的小容器对象
    let subscribers = subscriberContainer[msg];
    setTimeout(() => {
      // 判断该小容器是否存在
      if (subscribers) {
        // 对象转数组
        Object.values(subscribers).forEach(subscriber => {
          // 调用
          subscriber(data);
        });
      }
    }, 1000);
  };
  // 同步发布消息
  // 大容器: {'add':{token1:f1,token2:f2}}
  PubSub.publishSync = function (msg, data) {
    // 根据传入进来的消息名字,获取对应的小容器对象
    let subscribers = subscriberContainer[msg];
    // 判断该小容器是否存在
    if (subscribers) {
      // 对象转数组
      Object.values(subscribers).forEach(subscriber => {
        // 调用
        subscriber(data);
      });
    }

  };
  // 取消订阅
  PubSub.unsubscribe = function (token) {
    // 判断是否传入标识
    if (typeof token === 'undefined') {
      subscriberContainer = {};
    } else if (token.indexOf('id_') !== -1) { // 判断标识是否是id_开头的

      // 大容器: {'add':{token1:f1,token2:f2},'del':{token3:f3}}
      // 对象转数组
      // [{token1:f1,token2:f2},{token3:f3}]
      let subscribers = Object.values(subscriberContainer).find(subscribers => subscribers[token]);
      subscribers && delete subscribers[token];
    } else { // 判断标识是不是消息的名字
      subscriberContainer[token] = {}
      // 或者删除
      // delete subscriberContainer[token]
    }

  };

  // 暴露出去
  window.PubSub = PubSub;
})(window);