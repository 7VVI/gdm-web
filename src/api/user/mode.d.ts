declare namespace API {
    /** 登录参数 */
    type LoginParams = {
        randomKey: string;
        password: string;
        username: string;
        verifyCode: string;
    };

    /** 获取验证码参数 */
    type CaptchaParams = {
        length?: number;
    };

    /** 获取验证码结果 */
    type CaptchaResult = {
        img: string;
        id: string;
    };
}
