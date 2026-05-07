export type Home = {
        _id: string;
        banners: {
            title: string;
            subTitle: string;
            image: string
            bannerAltTag: string
        }[];
        industries:{
            title: string;
            items:[{
                title: string,
                logo: string,
                logoAlt: string,
                image: string,
                imageAlt: string,
            }]
        }
        years: number;
        projects: number;
        clients: number;
        process: {
            title: string;
        }[];
        testimonials: {
            _id: string;
            content: string;
            name: string;
            company: string;
        }[];
        aboutTitle: string;
        aboutDescription: string;
        aboutImage: string;
        aboutImageAltTag: string
    }
