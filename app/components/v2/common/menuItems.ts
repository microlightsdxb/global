export type MenuItem = {
  title: string;
  url: string;
  children?: MenuItem[];
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
          url:"/lighting-products"
        },
        {
          title:"Outdoor Lighting",
          url:"/lighting-products"
        },
        {
          title:"Industrial Lighting",
          url:"/lighting-products"
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
      title:"Industries",
      url:"#", // TODO: set the Industries page URL
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
      title:"Case Studies",
      url:"#", // TODO: set the Case Studies page URL
    },
    {
      title:"Blogs",
      url:"/blog",
    },
  ]