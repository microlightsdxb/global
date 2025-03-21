export type MenuItem = {
  title: string;
  url: string;
  children?: MenuItem[]; // Make 'children' optional
};
export const menuItems: MenuItem[] = [
    {
      title:"About",
      url:"#",
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
      url:"#",
    },
    {
      title:"Industries",
      url:"#",
    },
    {
      title:"Projects",
      url:"#",
    },
    {
      title:"Sustainability",
      url:"#",
    },
    {
      title:"Blogs",
      url:"#",
    },
  ]