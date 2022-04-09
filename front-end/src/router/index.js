import Vue from "vue"
import VueRouter from 'vue-router'
//整个网站的前端路由,里面包含每个文件的路径，这是整个网页的地图,包括子路径
Vue.use(VueRouter)

export default new VueRouter({
    routes: [{
            name: "index",
            path: "/",
            component: resolve => require(["../components/web/home/"], resolve),
            redirect: "/home",
            children: [{
                    name: "home",
                    path: "/home",
                    component: resolve => require(["../components/web/home/home"], resolve),
                },
                {
                    name: "commodity",
                    path: "/commodity",
                    component: resolve => require(["../components/web/commodity/commodity"], resolve),
                },
                {
                    name: "history",
                    path: "/history",
                    component: resolve => require(["../components/web/history"], resolve),
                },
                {
                    name: "help",
                    path: "/help",
                    component: resolve => require(["../components/web/help"], resolve),
                },
                {
                    name: "shoppingCart",
                    path: "/shoppingCart",
                    component: resolve => require(["../components/web/shoppingCart"], resolve),
                },
                {
                    name: "userOrder",
                    path: "/userOrder",
                    component: resolve => require(["../components/web/userOrder"], resolve),
                }
            ]
        },
        {
            name: "backstage",
            path: "/backstage",
            component: resolve => require(["../components/backstage/home/index"], resolve),
            redirect: "/backstage/tq",
            children: [{
                    path: "/backstage/addCommodity",
                    component: resolve => require(["../components/backstage/addCommodity"], resolve),
                },
                {
                    path: "/backstage/adminUser",
                    component: resolve => require(["../components/backstage/adminUser"], resolve),
                },
                {
                    path: "/backstage/adminOrder",
                    component: resolve => require(["../components/backstage/adminOrder"], resolve),
                },
                {
                    path: "/backstage/adminCommodity",
                    component: resolve => require(["../components/backstage/adminCommodity"], resolve),
                },
                {
                    path: "/backstage/tq",
                    component: resolve => require(["../components/backstage/home/tq"], resolve),
                },
                {
                    path: "/backstage/help",
                    component: resolve => require(["../components/backstage/help"], resolve),
                },
            ]
        }

    ]
})