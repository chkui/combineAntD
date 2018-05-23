/**
 * Created by chkui on 2017/6/9.
 * 路由配置表
 */
//解决服务器端没有ensure方法的问题，直接用源生的require替换
if (typeof require.ensure !== 'function') {
    require.ensure = function (dependencies, callback) {
        callback(require)
    }
}

//路由配置
export default [{//首页
    id: "home",
    url: "/",
    component: (call) => {
        require.ensure([], require => {
            call(require("../src/page/home"))
        }, 'home')
    }
}, {
    id: "list",
    url: "/list/:formId",
    component: (call) => {
        require.ensure([], require => {
            call(require("../src/page/list"))
        }, 'form')
    }
}, {
    id: "form",
    url: "/form/:formId/:bussId",
    component: (call) => {
        require.ensure([], require => {
            call(require("../src/page/form"))
        }, 'form')
    }
}, {
    id: "singleForm",
    url: "/form/:singleFormId",
    component: (call) => {
        require.ensure([], require => {
            call(require("../src/page/form"))
        }, 'singleForm')
    }
}];