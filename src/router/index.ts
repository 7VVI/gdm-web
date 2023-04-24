import {createRouter, createWebHistory} from 'vue-router'


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

export default router
