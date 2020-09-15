function Observer(data) {
    // 存储vm中的data对象,指向了相同的地址
    this.data = data;
    // 开始执行,传入了vm中的data
    this.walk(data);
}
// 劫持对象的原型对象
Observer.prototype = {
    // 构造器
    constructor: Observer,
    // 开始执行的一个方法
    walk: function(data) {
        // 保存当前的劫持的实例对象到me中
        var me = this;
        // 获取到data对象中所有的属性名字,并遍历,key---msg
        Object.keys(data).forEach(function(key) {
            // key---msg,data[key]---vm对象中data对象中的msg值
            me.convert(key, data[key]);
        });
    },
    convert: function(key, val) {
        // this.data----当前劫持对象的data,不是vm的data
        // key---msg  val----'哈哈'
        this.defineReactive(this.data, key, val);
    },

    defineReactive: function(data, key, val) {
        //data是劫持对象的data,key---msg,val---'哈哈'
        // 只要vm中的data有一个属性,就会创建一个dep对象
        var dep = new Dep();
        var childObj = observe(val);
        // 为劫持对象中data添加属性,并且重写get和set
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                // newVal---是一个新的数据值
                // 判断新值和原来的中是不是形同的
                if (newVal === val) {
                    return;
                }
                // 把新的数据值存储到val变量中
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通知订阅者---找到当前的dep对象中subs数组里面的watcher对象
                dep.notify();
            }
        });
    }
};
// 劫持的作用,把vm中的data传进来,vm对象也传进来
function observe(value, vm) {
    // 如果value---data--不是一个对象,那么直接返回,什么也不做
    if (!value || typeof value !== 'object') {
        return;
    }
    // 当前的value里面存储的是一个对象
    // 创建了一个劫持的实例对象对象,并传入了一个对象
    return new Observer(value);
};


var uid = 0;

function Dep() {
    // 当前的dep实例对象有自己的id值,同时还有自己的一个subs属性(是一个数组)
    this.id = uid++;
    this.subs = []; // subscribe
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },

    depend: function() {
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        // this.subs是一个数组,里面可能会存储多个的watcher对象,所以,要进行遍历
        // sub是一个watcher对象
        this.subs.forEach(function(sub) {
            // 调用watcher对象的update方法------->更新操作的方法
            sub.update();
        });
    }
};

Dep.target = null;