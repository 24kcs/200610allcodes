// 监视对象的构造函数
function Watcher(vm, expOrFn, cb) {
    this.cb = cb; // 回调函数
    this.vm = vm; // vm实例对象
    this.expOrFn = expOrFn; //表达式
    this.depIds = {}; // 存储depId的键值对对象
    // 判断当前的表达式是不是一个函数
    if (typeof expOrFn === 'function') {
        this.getter = expOrFn;
    } else {
        // expOrFn.trim()----'msg'
        // 传入表达式,并返回一个回调函数(回调函数内部需要一个对象,并且遍历表达式,返回某个值)
        this.getter = this.parseGetter(expOrFn.trim());
    }
    // 监视对象调用get方法的返回值给了value属性
    // 这个value中存储的是表达式的值
    this.value = this.get();
}
// 监视对象的原型对象
Watcher.prototype = {
    // 构造器
    constructor: Watcher,
    // 是更新
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
        // 1. 每次调用run()的时候会触发相应属性的getter
        // getter里面会触发dep.depend()，继而触发这里的addDep
        // 2. 假如相应属性的dep.id已经在当前watcher的depIds里，说明不是一个新的属性，仅仅是改变了其值而已
        // 则不需要将当前watcher添加到该属性的dep里
        // 3. 假如相应属性是新的属性，则将当前watcher添加到新属性的dep里
        // 如通过 vm.child = {name: 'a'} 改变了 child.name 的值，child.name 就是个新属性
        // 则需要将当前watcher(child.name)加入到新的 child.name 的dep里
        // 因为此时 child.name 是个新值，之前的 setter、dep 都已经失效，如果不把 watcher 加入到新的 child.name 的dep中
        // 通过 child.name = xxx 赋值的时候，对应的 watcher 就收不到通知，等于失效了
        // 4. 每个子属性的watcher在添加到子属性的dep的同时，也会添加到父属性的dep
        // 监听子属性的同时监听父属性的变更，这样，父属性改变时，子属性的watcher也能收到通知进行update
        // 这一步是在 this.get() --> this.getVMVal() 里面完成，forEach时会从父级开始取值，间接调用了它的getter
        // 触发了addDep(), 在整个forEach过程，当前wacher都会加入到每个父级过程属性的dep
        // 例如：当前watcher的是'child.child.name', 那么child, child.child, child.child.name这三个属性的dep都会加入当前watcher
        if (!this.depIds.hasOwnProperty(dep.id)) {
            dep.addSub(this);
            this.depIds[dep.id] = dep;
        }
    },
    get: function() {
        // 把当前的监视的实例对象传到了Dep的target属性中
        Dep.target = this;
        // 调用下面的闭包中的回调函数,返回值给value属性
        // this.vm改变this的对象
        // this.vm传入函数所需要的参数
        var value = this.getter.call(this.vm, this.vm);
        Dep.target = null;
        return value;
    },

    parseGetter: function(exp) {
        if (/[^\w.$]/.test(exp)) return; 

        var exps = exp.split('.');

        return function(obj) {
            // 循环遍历exps数组中的每个表达式---msg
            for (var i = 0, len = exps.length; i < len; i++) {
                // 是否传入对象---vm
                if (!obj) return;
                // obj=vm[exps[0]]---->obj=vm['msg']
                // obj=vm.msg
                // obj最终存储的是表达式的值
                obj = obj[exps[i]];
            }
            // 返回该表达式的值
            return obj;
        }
    }
};