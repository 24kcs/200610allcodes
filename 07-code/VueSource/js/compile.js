// 模版解析构造函数
// el-----选择器, vm---->vm实例对象
function Compile(el, vm) {
    // 保存当前的vm实例对象到$vm属性中
    this.$vm = vm;
    // 根据el中存储的'#app'来获取html中的div容器对象
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    // 判断$el中存储的div对象是否存在
    if (this.$el) {
        // 创建文档碎片对象(虚拟DOM),并且把id为app的div容器中所有的子节点全都放进来
        this.$fragment = this.node2Fragment(this.$el);

        // 模版解析的操作
        this.init();



        // 把解析后的文档碎片对象重新放在div容器中(id为app的div)
        this.$el.appendChild(this.$fragment);
    }
}

Compile.prototype = {
    constructor: Compile,
    node2Fragment: function(el) {
        // el ---->div容器
        // 创建文档碎片对象
        var fragment = document.createDocumentFragment(),
            child;

        // 把div容器中的子节点一个一个的(遍历)添加到文档碎片对象中
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        // 返回文档碎片对象
        return fragment;
    },
    // 解析模版的操作
    init: function() {
        // 真正进行模版解析的方法,传入了当前的文档碎片对象
        this.compileElement(this.$fragment);
    },
    // 模版解析操作,el-------->就是文档碎片对象
    compileElement: function(el) {
        // 获取文档碎片对象中所有的子节点
        var childNodes = el.childNodes,
        // 把当前的编译的实例对象保存到me变量中
            me = this;
        // 遍历文档碎片对象中的每个子节点
        [].slice.call(childNodes).forEach(function(node) {
            // node ------>每个子节点
            // 获取当前的这个节点的文本内容
            var text = node.textContent;
            // 插值的正则的表达式
            var reg = /\{\{(.*)\}\}/;
            // 判断当前的这个节点是不是一个标签
            if (me.isElementNode(node)) {
                // 只有node这个节点是标签
                me.compile(node);

                // node是文本节点,并且和插值语法的正则是匹配的
            } else if (me.isTextNode(node) && reg.test(text)) {
                // node----->{{msg}}
                // RegExp.$1.trim()-----> 'msg'
                me.compileText(node, RegExp.$1.trim());
            }

            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });
    },

    compile: function(node) {
        // node----button按钮
        // 获取这个按钮上的所有的属性  v-on:click
        var nodeAttrs = node.attributes,
            me = this;
        // 遍历所有的属性
        [].slice.call(nodeAttrs).forEach(function(attr) {
            // 获取属性的名字
            // attrName----->'v-on:click'
            var attrName = attr.name;
            // 判断该属性是不是指令
            if (me.isDirective(attrName)) {
                // 获取该属性的值  showName
                var exp = attr.value;
                // 干掉v-
                // dir---->on:click
                var dir = attrName.substring(2);
                // 该指令是不是事件指令
                if (me.isEventDirective(dir)) {
                    // node----button,me-$vm---->vm，exp----->showName,dir----->on:click
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                    // 普通指令
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }
                // 移除该标签上所有的属性(事件指令或者是普通指令的属性)
                node.removeAttribute(attrName);
            }
        });
    },
    // 解析文本的操作
    // node----->'{{msg}}'
    // exp----->msg
    compileText: function(node, exp) {
        // node----'{{msg}}'  exp----->msg
        // this.$vm----->vm
        compileUtil.text(node, this.$vm, exp);
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    // 处理{{msg}}----v-text
    // node----->'{{msg}}'
    // vm---->vm
    // exp---->msg
    text: function(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },
    // v-html
    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },
    // v-model
    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },
    // v-class
    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    bind: function(node, vm, exp, dir) {
        // node---->'{{msg}}'
        // vm----->vm
        // exp----->msg
        // dir----->'text'
        // var updaterFn = updater['textUpdater'];
        // 获取updater对象中的textUpdater方法(本质是函数)
        var updaterFn = updater[dir + 'Updater'];
        // 判断该方法是否存在,并且调用
        // node---->'{{msg}}'
        // this._getVMVal(vm, exp)----->msg的属性值---->'绣花枕头'
        // 调用textUpdater('{{msg}}','绣花枕头')方法
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));

        // 监视对象
        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 为标签绑定事件
    eventHandler: function(node, vm, exp, dir) {
        // node----button,vm,exp---->showName,dir---->on:click
        // eventType--->click
        var eventType = dir.split(':')[1],
        // vm中是不是有methods对象,如果有这个对象通过vm.methods['showName']---->回调函数showName
        // fn---->showName回调
            fn = vm.$options.methods && vm.$options.methods[exp];
        // 判断click存在不(事件类型是否存在),showName是否存在
        if (eventType && fn) {
            // button按钮绑定click事件,对应的是showName回调
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },
    // 根据vm对象获取_data中的某个属性值
    // vm----->vm
    // exp------>msg
    _getVMVal: function(vm, exp) {
        // 先保存vm对象
        var val = vm;
        // 干掉表达式中的   点  ,获取数组
        exp = exp.split('.');
        // 遍历数组中的每个属性
        exp.forEach(function(k) {
            // val = vm['msg']---->val = vm.msg
            // 通过vm['msg']--->获取msg属性的值
            val = val[k];
        });
        // 返回msg属性值
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


var updater = {
    // 把插值表达式这个文本节点进行替换
    // node------->'{{msg}}'
    // value------>'绣花枕头'
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};