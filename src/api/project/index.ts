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

export function noAnswerListAll(data:any) {
    return request<API.BaseResponse<any>>({
        url: '/projectManage/noAnswerListAll',
        method: 'post',
        data
    });
}

export function noAnswerAdd(data:any) {
    return request<API.BaseResponse<any>>({
        url: '/projectManage/noAnswerAdd',
        method: 'post',
        data
    });
}