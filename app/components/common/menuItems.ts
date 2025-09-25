export type MenuItem = {
  title: string;
  url: string;
  children?: MenuItem[]; // Make 'children' optional
};
export const menuItems: MenuItem[] = [
    {
      title:"About",
    url: "",
    children:[
      {
        title:"About Us",
        url:"/about-us"
      },
      {
        title:"Our Team",
        url:"/our-team"
      },
      // {
      //   title:"Our Testimonials",
      //   url:"/"
      // }
    ]
    },
    {
      title:"Products",
      url:"#",
        children:[
        {
          title:"Indoor Lighting",
          url:"/products"
        },
        {
          title:"Outdoor Lighting",
          url:"/products"
        },
        {
          title:"Industrial Lighting",
          url:"/products"
        }
      ]
    },
    {
      title:"Services",
      url: "",
      children:[
        {
          title:"Microlights House of Design",
          url:"/microlights-house-of-design"
        },
        {
          title:"Project Management",
          url:"/project-management"
        }
      ]

    },
    {
      title:"Projects",
      url:"/projects",
    },
    {
      title:"Sustainability",
      url:"/sustainability",
    },
    {
      title:"Blog",
      url:"/blog",
    },
  ]