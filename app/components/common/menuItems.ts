export type MenuItem = {
  title: string;
  url: string;
  children?: MenuItem[]; // Make 'children' optional
};
export const menuItems: MenuItem[] = [
    {
      title:"About",
      url:"/about-us",
    },
    {
      title:"Products",
      url:"/products"
     /*  children:[
        {
          title:"Product 1",
          url:"#"
        }
      ] */
    },
    {
      title:"Services",
      url:"/services",
    },
    {
      title:"Industries",
      url:"/industries",
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
      title:"Blogs",
      url:"/blogs",
    },
  ]