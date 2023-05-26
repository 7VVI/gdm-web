declare namespace API {

    /**
     * 通用返回类
     */
    type BaseResponse<T> = {
        code: number;
        data: T;
        message: string;
        description: string;
    };

    interface VerificationCode{
        imgBase64:string;
        uuid:string
    }

    /**
     * 后端权限类型
     */
    type Permissions={
        value?:number;
        name?:string;
    }



    /**
     * 后端菜单类型
     */
    interface Menu {
        //菜单唯一id
        menuId: number;
        //菜单标题
        title: string;
        //上级菜单ID
        pid: number;
        //路由
        path: string;
        //组件名称
        name: string;
        //组件
        component:string;
        // 菜单图标
        icon?: string;
        // 图标颜色
        iconColor?: string;
        //是否隐藏
        hidden: boolean;
        //创建者
        createBy?: string;
        //更新者
        updateBy?: string;
        //创建时间
        createTime?: string;
        //更新时间
        updateTime?: string;
        //子菜单
        children?: Menu[]
    }

    /**
     * 前端菜单
     */
    interface MenuItem {
        menuId: number;
        pid: number;
        path: string;
        name: string;
        component:string;
        title: string;
        icon?: string;
        iconColor?: string;
        meta?: {
            hidden: boolean | null;
        };
        children?: MenuItem[]
    }

    /**
     * 路由信息
     */
    interface Router {
        path: string;
        name: string;
        component: any;
        meta?: {
            hidden: boolean | null;
        };
        children?: Router[]
    }

    /**
     * 注册类型
     */
    type RegistryParam={
        checkPassword: string;
        email: string;
        gender: number;
        mobile: string;
        name: string;
        password: string;
        username: string
    }

    /**
     * 用户信息
     */
    type User={
        username?:string;
        roles?:string;
        name?:string;
        gender?:number ;
        sex?:string;
        mobile?:string;
        email?:string;
        type?:number;
        professional?:string;
    }

    /**
     * 用户类型
     */
    type UserType={
        code:number;
        name:string;
    }
}