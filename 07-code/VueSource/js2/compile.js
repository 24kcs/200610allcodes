// 实现编译操作的构造函数,el--->#app,vm就是Vue的实例对象
function Compile (el, vm) {
    // 把vm实例对象存储到$vm属性中
    this.$vm = vm;
    // 根据#app选择器获取容器对象div,并存储到$el中
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    // 判断$el---div容器 是否存在
    if (this.$el) {
        // 把当前的div容器中所有的节点全部的放在文档碎片对象中
        this.$fragment = this.node2Fragment(this.$el);
        // 模版初始化的操作
        this.init();
        // 把文档碎片对象重新放在div这容器中
        this.$el.appendChild(this.$fragment);
    }
}
// 编译对象的原型对象
Compile.prototype = {
    constructor: Compile,
    node2Fragment: function (el) { // el---div
        // 首先创建文档碎片对象
        var fragment = document.createDocumentFragment(),
            child;

        // 通过循环遍历的方式,把div中所有的节点,一个一个的添加到文档碎片对象中
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        // 返回文档碎片对象
        return fragment;
    },
    // 初始化html模版操作
    init: function () {
        // 编译元素的方法,并传入文档碎片对象
        this.compileElement(this.$fragment);
    },

    compileElement: function (el) {
        // el------文档碎片对象,把文档碎片对象中所有的节点获取到
        var childNodes = el.childNodes,
            me = this; // 把this编译对象存放在me变量中
        // 把伪数组转成真数组(所有的节点)遍历,每个子节点都要进行遍历
        [].slice.call(childNodes).forEach(function (node) {
            // node---就是每个节点
            // 获取节点的文本内容
            var text = node.textContent;
            // 插值语法的对应的正则表达式-----{{msg}}---/\{\{(.*)\}\}/
            var reg = /\{\{(.*)\}\}/;
            // 判断当前的节点是不是标签节点
            if (me.isElementNode(node)) {
                // 编译标签节点------暂时没有分析
                me.compile(node);

                // 当前的这个节点是不是文本节点,并且这个文本节点和上面的正则是否匹配
            } else if (me.isTextNode(node) && reg.test(text)) {
                // node---{{msg}}  RegExp.$1.trim()----msg表达式
                me.compileText(node, RegExp.$1.trim());
            }
            // 当前的这个节点有没有子节点,并且子节点的个数大于0--------
            if (node.childNodes && node.childNodes.length) {
                // 递归操作,如果节点中还有子节点,就递归操作,继续遍历节点
                me.compileElement(node);
            }
        });
    },

    // 如果当前的节点是标签的时候,就会进入这个方法
    // node---标签节点----button按钮
    compile: function (node) {
        /// 获取button标签中所有的属性
        //  <button v-on:click="showName">按钮</button>
        // nodeAttrs----数组--->存储了按钮标签里所有的属性:v-on:click="showName"
        var nodeAttrs = node.attributes,
            me = this; // this--->编译的实例对象存储到了me中
        // nodeAttrs---伪数组,是不能直接调用数组中的forEach方法的,
        // 遍历所有的属性
        [].slice.call(nodeAttrs).forEach(function (attr) {
            // attr--->v-on:click="showName"
            // attrName--->v-on:click
            // 获取属性的名字
            var attrName = attr.name;
            // 判断当前的这个属性是不是一个指令
            if (me.isDirective(attrName)) {
                // 获取这个属性的值---showName
                // exp---就叫表达式---->这个表达式中是showName 
                var exp = attr.value;
                // dir---就叫指令--->dir中存储的是,attrName---->v-on:click
                // dir--->on:click
                var dir = attrName.substring(2);
                // 判断当前的指令是不是一个事件指令
                // exp----->showName
                // dir----->on:click
                if (me.isEventDirective(dir)) {
                    // 代码能够执行到这里,说明,此时dir就是一个事件指令
                    // node---当前的节点---button按钮
                    // me.$vm---->vm对象
                    // exp----showName
                    // dir---->on:click
                    // 为标签节点,绑定对应的事件,并让事件指向对应的回调函数
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                    // 普通指令
                } else {
                    // 普通指令会进入到这里来
                    // dir---->text
                    // compileUtil['text'](p,vm,'content')
                    // compileUtil.text(p,vn,'content')
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }
                // 把按钮上原来的属性和值直接删除,这样按钮也有事件了,并且标签上也干净了
                node.removeAttribute(attrName);
            }
        });
    },
    // 编译插值---node---{{msg}}  exp---msg
    compileText: function (node, exp) {
        // 调用编译工具方法,把{{msg}}和vm实例对象,还有msg一起传进去
        compileUtil.text(node, this.$vm, exp);
    },
    // 判断当前的属性是不是一个指令
    // attr:   v-on:click
    isDirective: function (attr) {
        // 如果字符串是以v-开头的,那么返回true,就意味着当前的这个属性是一个指令属性
        return attr.indexOf('v-') == 0;
    },
    // 判断当前的指令是不是一个事件指令
    isEventDirective: function (dir) {
        // dir---->on:click
        return dir.indexOf('on') === 0;
    },
    // 是一个方法,用来判断当前的节点是不是标签节点
    isElementNode: function (node) {
        return node.nodeType == 1;
    },
    // 是一个方法,用来判断当前的节点是不是文本节点
    isTextNode: function (node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    //  node---{{msg}}   vm实例对象   exp-----msg
    // v-text
    text: function (node, vm, exp) {
        // bind方法----node--->p,vm,exp--->content,'text'
        this.bind(node, vm, exp, 'text');
    },
    // node---p,vm,exp---content
    // v-html
    html: function (node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },
    // v-model
    model: function (node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function (e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },
    // v-class 指令进来
    class: function (node, vm, exp) {
        // node----p ,vm,exp--->classA
        this.bind(node, vm, exp, 'class');
    },
    // 绑定的方法 node---{{msg}},vm实例对象,exp---msg ,dir---'text'
    bind: function (node, vm, exp, dir) {
        // 获取updater['textUpdater']
        // updaterFn----->updater.textUpdater方法
        // updater['classUpdater']
        var updaterFn = updater[dir + 'Updater'];
        // updater.textUpdater方法是否存在,并调用
        // updater.textUpdater({{msg}},this._getVMVal(vm, 'msg'))
        // updater.textUpdater('{{msg}}','abc')

        // v-class的指令进入到这行代码,是这样的
        //  this._getVMVal(vm, exp) 根据vm对象找classA属性的值---->cls
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));

        // 监视对象----暂时不说----和劫持一起说
        // vm,exp--表达式,第三个参数是一个回调函数
        new Watcher(vm, exp, function (value, oldValue) {
            // 修改数据的时候,原来的值和现在的值是不同的
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件处理
    // node---当前的节点---button按钮
    // me.$vm---->vm对象
    // exp----showName
    // dir---->on:click
    eventHandler: function (node, vm, exp, dir) {
        // 把on:click 中的: 干掉了,并且要click存储到eventType中
        var eventType = dir.split(':')[1],
        // vm中的methods对象是否存在,并且,vm.methods['showName']--->showName函数拿出来了
        // fn---->showName函数
            fn = vm.$options.methods && vm.$options.methods[exp];
        // 判断click是否存在并且, showName函数是否存在
        if (eventType && fn) {
            // node---button按钮,
            // 为button绑定了clicke事件,并且该事件所指向的回调函数就是showName
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal: function (vm, exp) {
        // vm----vm实例对象,exp----msg
        // val--->vm对象
        var val = vm;
        // msg表达式中的.切割掉,形成一个数组
        // exp----['msg']
        exp = exp.split('.');
        // 遍历数组--->k----->msg属性
        exp.forEach(function (k) {
            // val= vm['msg']----->val=vm.msg的值
            // val='abc'
            val = val[k];
        });
        return val; // 'abc'
    },

    _setVMVal: function (vm, exp, value) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function (k, i) {
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
    // node----{{msg}}  value----'abc'
    textUpdater: function (node, value) {
        // textContent='abc'
        // p.textContent=<a href="http://www.baidu.com">百度</a>
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    // v-html这种指令最终会调用的方法
    htmlUpdater: function (node, value) {
        // node---p 标签, value---->content---属性的值
        // p.innerHTML=<a href="http://www.baidu.com">百度</a>
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },
    // v-class这种指令最终调用的方法
    classUpdater: function (node, value, oldValue) {
        // node---p,value--->cls,oldValue---->class="cls2"----""--->空字符串
        // className中存储的是p.className的类样式的名字cls2
        // className是个空字符串
        var className = node.className;
        // className---->空字符串
        className = className.replace(oldValue, '').replace(/\s$/, '');
        // 如果p标签原来有类样式的名字cls2 ,那么现在有来了一个新的类样式名字cls
        // spance--->' '
        // 目前因为p标签原来没有类样式名字,所以,space--->''
        var space = className && String(value) ? ' ' : '';
        // 把p标签的className='cls2'+' '+'cls'
        // 现在className--->''
        // space---->''
        // p.className='cls'
        node.className = className + space + value;
    },

    modelUpdater: function (node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};