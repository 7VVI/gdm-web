import {defineStore} from 'pinia'
import type {RouteRecordRaw} from "vue-router";


export const menuStore = defineStore('sideMenu', {
    state: () => {
        return {
            menu:Object,
            routes: [] as Array<RouteRecordRaw>,
        }
    },
    getters: {
        getRoute:state => state.routes
    },
    // 持久化
    persist: {
        key: "menu-store",
        storage: window.localStorage,
        beforeRestore: (context) => {
            console.log("load userStore data start");
        },
        afterRestore: (context) => {
            console.log("load userStore data end");
        },
    },
    actions: {
        async getMenu() {
        }
    }
})


