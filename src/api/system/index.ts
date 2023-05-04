import request from "@/utils/request";
import LoginParams = API.LoginParams
import BaseResponse = API.BaseResponse;

const HttpManager = {

    /**
     * 用户登录
     * @param body
     */
    login(body: LoginParams){
        return request<BaseResponse<Record<string, string>>>({
            url: "/user/baseLogin",
            data: body,
            method: "post"
        })
    },

    /**
     * 获取菜单信息
     */
    getMenu(data: any) {
        return request<BaseResponse<any>>({
            url: "/menuManage/pageList",
            method: "post",
            data
        })
    },

    /**
     * 获取后端角色信息
     */
    getPermissions(){
        return request<BaseResponse<Permissions>>({
            url: "/user/getPermissions",
            method: "get",
        })
    },

    /**
     * 新增菜单
     */
    addMenu(data:any){
        return request<BaseResponse<any>>({
            url: "/menuManage/add",
            method: "post",
            data
        })
    },

    /**
     * 菜单删除
     * @param ids
     */
    deleteMenu(ids:string){
        return request<BaseResponse<any>>({
            url: "/menuManage/delete",
            method: "get",
            params: {ids},
        })
    },

    /**
     * 验证码获取
     */
    getVerifyCoe(): Promise<BaseResponse<API.VerificationCode>> {
        return request({
            url: "user/imgVerifyCode",
            method: "get"
        })
    },

    /**
     * 获取登录的用户
     * @param ids
     */
    getCurrentUser(){
        return request<BaseResponse<any>>({
            url: "/user/getCurrentUser",
            method: "get",
        })
    },

}

export {HttpManager}