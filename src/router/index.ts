import {createRouter, createWebHistory} from 'vue-router'
import {start, close} from "@/utils/nprogress";
import {menuStore} from "@/stores/menuStore";
import menu from "@/utils/MenuUtils"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "/login"
        },
        {
            path: "/login",
            name: "Login",
            component: () => import("@/views/userPage/LoginPage.vue"),
        },
        {
            path: "/layout",
            name: "Layout",
            component: () => import("@/layout/Layout.vue"),
        },
        {
            path: "/registry",
            name: "Registry",
            component: () => import("@/views/userPage/Registry.vue"),
        },
        {
            path: '/404',
            name: "404",
            component: () => import("@/views/features/404.vue")
        }
    ]
})

let flag = true;

router.beforeEach(async (to, from, next) => {
        start();
        const store = menuStore();
        if (to.name == "login") {
            next({ name: 'login' });
        } else {
            if (flag) {
                const{generateRoutes}=menu()
                let rt = generateRoutes(store.menu)
                console.log(rt)
                await rt.forEach(item => {
                    router.addRoute("Layout", item)
                });
                flag = false;
                next({
                    ...to, // next({ ...to })的目的,是保证路由添加完了再进入页面 (可以理解为重进一次)
                    replace: true, // 重进一次, 不保留重复历史
                })
            } else {
                next();
            }
        }
    }
)
;

router.afterEach(() => {
    // 在即将进入新的页面组件前，关闭掉进度条
    close();
})


export default router
