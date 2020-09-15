// 构造函数,options是对象
function MVVM(options) {
    // 把options对象保存到当前的MVVM的实例对象的属性$options中,如果options对象没有值,则把一个空对象给属性$options
    this.$options = options || {};
    // data是变量,_data是属性,所以,外部不可能通过vm.data来访问data对象中的属性
    var data = this._data = this.$options.data;
    // 把当前的MVVM的实例对象保存到变量me中
    var me = this;
    // 实现数据代理
    Object.keys(data).forEach(function(key) {
        // 真正实现数据代理的代码---方法调用
        me._proxyData(key);
    });

    // 初始化计算属性
    this._initComputed();
    // 数据劫持
    observe(data, this);
    // 模版解析:html的容器中的整个的html模版中的js代码的解析(插值,指令)
    // 创建模版解析的实例对象,并传入id选择器: '#app' 和vm实例对象
    this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
    constructor: MVVM,
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },

    // 最终的真正的实现数据代理的代码
    _proxyData: function(key, setter, getter) {
        // 此时key 是 'msg'
        // 把当前的this---->vm---->保存me变量中
        var me = this;
        setter = setter || 
        // 把data对象中的每个属性--->'msg',添加到vm对象中,从而实现数据代理
        Object.defineProperty(me, key, {
            configurable: false, // 不能被删除
            enumerable: true, // 可以被枚举(遍历)
            // 当外部通过vm.msg或者vm['msg']来获取该属性值的时候,就会自动的进入get中
            get: function proxyGetter() {
                return me._data[key];
            },
            // 网外部通过vm.msg='xxx'或者vm['msg']='xxx'的时候来设置该属性的值,就会自动进入到set中
            set: function proxySetter(newVal) {
                me._data[key] = newVal;
            }
        });
    },

    _initComputed: function() {
        var me = this;
        var computed = this.$options.computed;
        if (typeof computed === 'object') {
            Object.keys(computed).forEach(function(key) {
                Object.defineProperty(me, key, {
                    get: typeof computed[key] === 'function' 
                            ? computed[key] 
                            : computed[key].get,
                    set: function() {}
                });
            });
        }
    }
};