import request from "@/utils/request";
import Announcement = API.Announcement;

/**
 * 获取所有公告
 * @param data
 */
export function getAnnouncement(data:any) {
    return request<API.BaseResponse<Announcement>>({
        url: '/announcementManage/listAll',
        method: 'post',
        data
    });
}

/**
 * 系统公告添加
 * @param data
 */
export function announcementAdd(data:any) {
    return request<API.BaseResponse<number>>({
        url: '/announcementManage/add',
        method: 'post',
        data
    });
}

/**
 * 公告更新
 * @param data
 */
export function announcementUpdate(data:any) {
    return request<API.BaseResponse<number>>({
        url: '/announcementManage/update',
        method: 'post',
        data
    });
}


export function announcementDelete(ids:string) {
    return request<API.BaseResponse<number>>({
        url: '/announcementManage/delete',
        method: 'get',
        params:{ids}
    });
}


export function announcementNow() {
    return request<API.BaseResponse<any>>({
        url: '/announcementManage/one',
        method: 'get',
    });
}