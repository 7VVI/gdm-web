declare namespace API {
    //日志类型
    type Log = {
        records:LogData[];
        total:number;
        size:number;
        current:number;
        pages:number;
    }

    type LogData={
        id: number;
        level: string;
        businessType: string;
        requestMethod; string;
        operName: stringg;
        operUrl: string;
        operIp: string;
        operTime: string;
        exceptionDetail?: string;
    }

    type LogQueryParam = {
        "level"?:number;
        "businessType"?: number;
        "requestMethod"?: string;
        "operName"?: string;
        "operUrl"?: string;
        "operIp"?: string;
        "operTime"?: number;
        "exceptionDetail"?: string;
        "current"?: number;
        "pageSize"?: number;
        "sortField"?: number;
        "sortOrder"?:string;
    }
}