import clientRoutes from './clientRoutes'

const _ServerRouteConfig = {
    home: {//主页
        renderRule: true,
        renderTemplate: [
            (url, params, state) =>
                new Promise((res, rej) => {
                    res({
                        title: '首页',
                        keywords: '首页测试',
                    })
                })
        ]
    }
}

const routes = clientRoutes.map(route => {
    const id = route.id, server = _ServerRouteConfig[id];
    return server ? {
        id: route.id,
        url: route.url,
        component: route.component,
        renderRule: server.renderRule,
        renderActions: server.renderActions,
        renderTemplate: server.renderTemplate
    } : route;
});

export default routes