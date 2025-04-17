export type Service = {
    name:string,
    pageHeading:string,
    pageBanner:string,
    introTitle:string,
    introDescription:string,
    introImage:string,
    method:{
        name:string,
        items:{
            title:string,
            description:string,
            image:string,
            animImage:string
        }[]
    }
}
