import request from "@/utils/request";
import TopicSelection = API.TopicSelection;
import BaseResponse = API.BaseResponse;


/**
 * 查询专业
 */
export function getMajor() {
    return request<BaseResponse<API.Major>>({
        url: '/topicSelectionManage/getMajor',
        method: 'get',
    });
}

/**
 * 获取学生类型
 */
export function getStudentType() {
    return request<BaseResponse<API.Major>>({
        url: '/topicSelectionManage/getStudentType',
        method: 'get',
    });
}

/**
 * 获取学生类型
 */
export function addTopicSelection(data:any) {
    return request<BaseResponse<any>>({
        url: '/topicSelectionManage/add',
        method: 'post',
        data
    });
}

/**
 * 获取学生可选题目
 * @param data
 */
export function topicSelectionListAll(data:any) {
    return request<API.BaseResponse<TopicSelection[]>>({
        url: '/topicSelectionManage/listAll',
        method: 'post',
        data
    });
}

export function topicSelectionDelete(ids:any) {
    return request<API.BaseResponse<any>>({
        url: '/topicSelectionManage/delete',
        method: 'get',
        params:ids,
    });
}

export function projectListAll(data:any) {
    return request<API.BaseResponse<API.ProjectVo>>({
        url: '/projectManage/studentTopicSelectionProcess',
        method: 'post',
        data
    });
}