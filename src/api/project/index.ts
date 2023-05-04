import request from "@/utils/request";

/**
 * 学生可选题目查询
 * @param data
 */
export function projectListAll(data:any) {
    return request<API.BaseResponse<API.Topic>>({
        url: '/topicSelectionManage/beApproved',
        method: 'post',
        data
    });
}

/**
 * 学生选题
 * @param data
 */
export function projectAdd(data:any) {
    return request<API.BaseResponse<any>>({
        url: '/projectManage/studentTopicSelection',
        method: 'post',
        data
    });
}

/**
 * 查询所有申请免答的学生
 * @param data
 */
export function noAnswerListAll(data:any) {
    return request<API.BaseResponse<any>>({
        url: '/projectManage/noAnswerListAll',
        method: 'post',
        data
    });
}

/**
 * 免答申请审核
 * @param data
 */
export function noAnswerAdd(data:any) {
    return request<API.BaseResponse<any>>({
        url: '/projectManage/noAnswerAdd',
        method: 'post',
        data
    });
}

/**
 * 查询所有毕设的完成清空
 * @param data
 */
export function projectState() {
    return request<API.BaseResponse<any>>({
        url: '/projectManage/projectState',
        method: 'get',
    });
}

/**
 * 获取登录用户的毕设
 */
export function currentProject() {
    return request<API.BaseResponse<API.currentProject>>({
        url: '/projectManage/getCurrentUserProject',
        method: 'get',
    });
}

/**
 * 学生进度更新
 * @param data
 */
export function statusUpdate(data:any) {
    return request<API.BaseResponse<any>>({
        url: '/projectManage/studentTopicSelectionUpdate',
        method: 'post',
        data
    });
}