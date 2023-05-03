declare namespace API {

    type Announcement = {
        key:number;
        id: number;
        title: string,
        content: string,
        username: string,
        createTime: string
    }[]

    type AnnouncementAddParam = {
        content: string|undefined,
        title: string|undefined
    }
}