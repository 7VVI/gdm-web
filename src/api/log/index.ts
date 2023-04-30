import  request  from '@/utils/request';

/**
 * @description 分页查询日志
 */
export function getLogPageList(data:API.LogQueryParam) {
    return request<API.BaseResponse<API.Log>>({
        url: 'logManage/pageList',
        method: 'post',
        data
    });
}