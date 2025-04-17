export type Home = {
        _id: string;
        banners: {
            title: string;
            subTitle: string;
            image: string
        }[];
        years: number;
        projects: number;
        clients: number;
        process: {
            title: string;
        }[];
        testimonials: {
            id: number;
            content: string;
            name: string;
            company: string;
        }[];
        aboutTitle: string;
        aboutDescription: string;
        aboutImage: string;
    }
