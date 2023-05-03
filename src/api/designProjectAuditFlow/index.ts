import request from "@/utils/request";

export function getDepartmentAudit(data:any) {
    return request<API.BaseResponse<any>>({
        url: '/designManage/departmentAudit',
        method: 'post',
        data
    });
}

export function getSchoolAudit(data:any) {
    return request<API.BaseResponse<any>>({
        url: '/designManage/schoolAudit',
        method: 'post',
        data
    });
}

/**
 * 系负责人审核记录请求
 * @param data
 */
export function departmentAudit(data:any) {
    return request<API.BaseResponse<any>>({
        url: '/designManage/departmentAuditAdd',
        method: 'post',
        data
    });
}

/**
 * 院负责人审核记录请求
 * @param data
 */
export function schoolAudit(data:any) {
    return request<API.BaseResponse<any>>({
        url: '/designManage/schoolAuditAdd',
        method: 'post',
        data
    });
}