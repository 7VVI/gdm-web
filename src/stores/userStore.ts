import {defineStore} from 'pinia'

export const userStore = defineStore('user', {
    state: () => {
        return {
          token:String
        }
    },
    getters: {
        getRoute:state => state.token
    },
    // 持久化
    persist: {
        key: "user-store",
        storage: window.localStorage,
        beforeRestore: (context) => {
            console.log("load userStore data start");
        },
        afterRestore: (context) => {
            console.log("load userStore data end");
        },
    },
    actions: {

    }
})


