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

    type
}