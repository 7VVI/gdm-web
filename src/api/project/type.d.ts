declare namespace API {

    /**
     * 学生选题记录添加参数
     */
    type projectParam={
        endDate: string;
        startDate: string;
        status: number;
        studentId:number;
        topicId: number
    }

    type Topic={
        id: number;
        departmentAuditResult: string;
        departmentAuditUserName: string;
        schoolAuditUserName: string;
        schoolAuditTime: string;
        schoolAuditResult: string;
        state: number;
        departmentAuditTime: string;
        title: string;
        schoolAuditUserOpinion: string;
        departmentAuditOpinion: string;
        teacherName: string
    }

    type NoAnswer={
        key:number;
        id: number;
        title: string;
        status: number;
        startDate: string;
        endDate: string;
        studentName: string;
        teacherName: string;
        direction: string;
        major:number;
        studentType: number
    }[]
}