; (function (window) {
	// 定义一个对象,该对象内部有相关的方法或者属性,这个对象就是当前的插件对象
	const MyPlugin = {};
	MyPlugin.install = function () {
		// 1. 添加全局方法或 property
		Vue.myGlobalMethod = function () {
			// 逻辑...
			console.log('这个是全局的方法')
		}

		// 2. 添加全局资源
		Vue.directive('my-directive', {
			bind (el, binding, vnode, oldVnode) {
				el.innerHTML = binding.value + '这是我的自定义的指令'
			}
		})


		// 3. 添加实例方法
		Vue.prototype.$myMethod = function (methodOptions) {
			// 逻辑...
			console.log('这个是实例的方法')
		}

	}


	// 暴露出去
	window.MyPlugin = MyPlugin
})(window);