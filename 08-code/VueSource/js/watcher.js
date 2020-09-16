// 监视数据的构造函数
// vm---MVVM的实例对象
// expOrFn-----msg或者是一个回调函数
// cb----回调函数
function Watcher(vm, expOrFn, cb) {
    // 保存传入进来的回调函数
    this.cb = cb;
    // 保存vm
    this.vm = vm;
    // 保存msg
    this.expOrFn = expOrFn;
    // 创建了一个空对象(键和值的关系)
    this.depIds = {};
    // 判断当前的表达式是不是一个函数
    if (typeof expOrFn === 'function') {
        // 如果是函数,则把函数保存在getter属性中
        this.getter = expOrFn;
    } else {
        // 把一个函数保存在getter属性中
        this.getter = this.parseGetter(expOrFn.trim());
    }
    // 获取某个值存储到value属性中.......
    this.value = this.get();
}

Watcher.prototype = {
    constructor: Watcher,
    update: function() {
        this.run();
    },
    run: function() {
        var value = this.get();
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    addDep: function(dep) {
        if (!this.depIds.hasOwnProperty(dep.id)) {
            // 把watcher放在dep中
            dep.addSub(this);
            // 把depId和dep对象 以键值对保存在watcher中
            this.depIds[dep.id] = dep;
        }
    },
    get: function() {
        // this----->监视对象
        // 保存到Dep的target属性中
        Dep.target = this;
        var value = this.getter.call(this.vm, this.vm);
        Dep.target = null;
        return value;
    },

    parseGetter: function(exp) {
        if (/[^\w.$]/.test(exp)) return; 

        var exps = exp.split('.');

        return function(obj) {
            // 遍历exps数组
            for (var i = 0, len = exps.length; i < len; i++) {
                if (!obj) return;
                // obj[exps[0]]----->obj['msg']--->vm['msg']
                obj = obj[exps[i]];
            }
            // 当前的msg属性值被返回了
            return obj;
        }
    }
};