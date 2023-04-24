import {defineStore} from 'pinia'
import type {RouteRecordRaw} from "vue-router";
import {HttpManager} from "@/api/system";
import menu from "@/utils/MenuUtils"

export const menuStore = defineStore('sideMenu', {
    state: () => {
        return {
            menu: new Array<API.MenuItem>(),
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
            let menuInfo=await  HttpManager.getMenu();
            console.log(menuInfo.data)
            const{processMenuItems}=menu()
            if (menuInfo?.code === 200 && menuInfo.data) {
                // console.log(JSON.stringify(menu))
                this.menu = processMenuItems(menuInfo.data);
            } else {
                console.log("获取菜单信息失败")
            }
        }
    }
})


