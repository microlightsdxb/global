export type About = {
    _id: string;
    banner:string;
    introTitle: string;
    introDescription: string;
    introImage: string;
    sectionTwoImage: string;
    mission:{description:string,icon:string};
    vision:{description:string,icon:string};
    values:{description:string,icon:string};
    whyItems: {
      _id: string;
      icon: string;
      title: string;
      description: string;
      bottomIcon: string;
    }[];
}