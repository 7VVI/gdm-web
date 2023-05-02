declare namespace API {

    /**
     * 后端专业数据格式
     */
    type Major={
        name:string;
        code:number;
    }

    /**
     * 后端学生类型数据格式
     */
    type Major={
        name:string;
        code:number;
    }

    /**
     * 后端学生可选题目
     */
    type TopicSelection={
        key:string|number;
        id: number;
        title:string;
        teacherName: string;
        major:number;
        studentType: number;
        studentNum:number;
        createTime: string;
        direction: string;
    }

    type ProjectVo={
        id: number;
        title: string;
        status: number;
        startDate: string;
        endDate: string;
        studentName: string;
        teacherName:string;
    }

}