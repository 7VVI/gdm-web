import request from "@/utils/request";

export function scoreAdd(data:any) {
    return request<API.BaseResponse<any>>({
        url: '/scoreManage/add',
        method: 'post',
        data
    });
}