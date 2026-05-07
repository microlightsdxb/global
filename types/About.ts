export type About = {
    _id: string;
    banner:string;
    bannerAltTag:string;
    introTitle: string;
    introDescription: string;
    introImage: string;
    introImageAltTag:string;
    sectionTwoImage: string;
    sectionTwoImageAltTag:string;
    mission:{description:string,icon:string,altTag:string};
    vision:{description:string,icon:string,altTag:string};
    values:{description:string,icon:string,altTag:string};
    whyTitle: string;
    whyItems: {
      _id: string;
      icon: string;
      iconAltTag:string;
      title: string;
      description: string;
      bottomIcon: string;
    }[];
}