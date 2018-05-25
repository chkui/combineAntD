/**
 * Created by chkui on 2017/6/9.
 * 路由配置表
 */
const routes = require('./url').routes

//解决服务器端没有ensure方法的问题，直接用源生的require替换
if (typeof require.ensure !== 'function') {
    require.ensure = function (dependencies, callback) {
        callback(require)
    }
}

//陆游
//纯静态开发页面
//表单页面
//表单页面分为3个状态,通过URL来标记
//  view
//  new
//  edit
//

//列表页面
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
    url: routes.list.match,
    component: (call) => {
        require.ensure([], require => {
            call(require("../src/page/list"))
        }, 'form')
    }
}, {
    id: "formView",
    url: routes.formView.match,
    component: (call) => {
        require.ensure([], require => {
            call(require("../src/page/form"))
        }, 'formView')
    }
}, {
    id: "formNew",
    url: routes.formNew.match,
    component: (call) => {
        require.ensure([], require => {
            call(require("../src/page/form"))
        }, 'formNew')
    }
}, {
    id: "formEdit",
    url: routes.formEdit.match,
    component: (call) => {
        require.ensure([], require => {
            call(require("../src/page/form"))
        }, 'formEdit')
    }
}];