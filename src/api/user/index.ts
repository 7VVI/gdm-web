import BaseResponse = API.BaseResponse;
import  request  from '@/utils/request';

/**
 * @description 获取验证码
 */
export function getImageCaptcha() {
    return request({
        url: 'captcha/img',
        method: 'get',
    });
}
