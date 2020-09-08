; (function (window) {
	const MyPlugin = {};
	MyPlugin.install = function (Vue, options) {
		// 1. 添加全局方法或 property
		Vue.myGlobalMethod = function () {
			console.log('当前插件的全局方法')
		}
	
		// 2. 添加全局资源
		Vue.directive('my-directive', {
			bind (el, binding, vnode, oldVnode) {
				el.textContent = binding.value+'自己开发的插件'
			}
		})
	
		// 4. 添加实例方法
		Vue.prototype.$myMethod = function (methodOptions) {
			// 逻辑...
			console.log('当前插件的实例方法')
		}
	}
	window.MyPlugin = MyPlugin;
})(window);
