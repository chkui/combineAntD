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
            call(require("../src/home"))
        }, 'home')
    }
},{
    id: "form",
    url: "/form",
    component: (call) => {
        require.ensure([], require => {
            call(require("../src/page/form"))
        }, 'form')
    }
}];