declare namespace API {


    /**
     * 系负责人需要审核的题目数据类型
     */
    type DesignProjectAuditFlow={
        key:number;
        id:number;
        title:string;
        teacherName:string;
        studentNum:number;
        direction:string;
        major:number;
        studentType:number;
        departmentAuditResult:string;
        departmentAuditUserName:string;
        departmentAuditTime:string;
        departmentAuditOpinion:string;
    }[]
}