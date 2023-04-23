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


    /**
     * 后端菜单类型
     */
    interface Menu {
        //菜单唯一id
        menuId: number,
        //菜单顺序
        menuOrder: number,
        //子菜单数目
        subCount: number,
        //菜单类型 0无子菜单  1有子菜单
        type: number,
        //菜单标题
        title: string,
        //上级菜单ID
        pid: number,
        //路由
        path: string,
        //组件
        component: string,
        //组件名称
        name: string,
        // 菜单图标
        icon?: string;
        // 图标颜色
        iconColor?: string;
        //是否隐藏
        hidden: boolean,
        //创建者
        createBy?: string,
        //更新者
        updateBy?: string,
        //创建时间
        createTime?: string,
        //更新时间
        updateTime?: string,
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
        menuOrder: number;
        subCount: number;
        title: string;
        component: string;
        icon?: string;
        iconColor?: string;
        meta?: {
            hidden: boolean | null;
            type: number;
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
            type: number;
        };
        children?: Router[]
    }

}