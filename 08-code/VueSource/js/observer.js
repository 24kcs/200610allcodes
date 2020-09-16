// 劫持数据的构造函数,data---传入进来的vm中的data对象(复杂类型---引用类型,传递的是地址)
function Observer(data) {
    // 先把data对象保存在自己的data属性中
    this.data = data;
    // 开始进行劫持操作,传入data对象
    this.walk(data);
}

Observer.prototype = {
    constructor: Observer,
    // data就是vm中的data
    walk: function(data) {
        // 保存当前的劫持实例对象
        var me = this;
        // 遍历vm中的data中的每个属性,msg
        Object.keys(data).forEach(function(key) {
            // key---->msg
            // data['msg']---->'要活着'
            me.convert(key, data[key]);
        });
    },
    convert: function(key, val) {
        // this.data---->劫持对象中的data属性
        // key-----msg
        // val -----'要活着'
        this.defineReactive(this.data, key, val);
    },
    // data----->this.data
    // key-----msg
    // val -----'要活着'
    defineReactive: function(data, key, val) {
        // 创建一个依赖对象
        var dep = new Dep();
        // 如果val的数据还是一个对象,那么就继续劫持
        var childObj = observe(val);
        // 把vm中的data中的每个属性添加到this.data(劫持对象中的data属性中)
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            // 如果外部是vm.msg或者是vm['msg']来获取这个属性值的时候,就会进入到vm中的数据代理中的get方法中,同时也会进入这个get方法
            get: function() {
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
             // 如果外部是vm.msg=值或者是vm['msg']=值,来设置这个属性值的时候,就会进入到vm中的数据代理中的set方法中,同时也会进入这个set方法
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通知订阅者
                dep.notify();
            }
        });
    }
};
// 准备开始数据劫持
function observe(value, vm) {
    // 如果value不是对象,则直接出去
    if (!value || typeof value !== 'object') {
        return;
    }
    // value是对象的数据的时候开始创建劫持对象,并且传入value数据
    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
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
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};

Dep.target = null;